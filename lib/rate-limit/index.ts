/**
 * Rate Limiting Middleware
 * نظام احترافي لتحديد معدل الطلبات
 */

import { NextRequest, NextResponse } from 'next/server';
import { getRateLimitType, RATE_LIMIT_CONFIGS, RateLimitConfig } from './config';
import { createRateLimiter } from './store';
import { getCurrentUser } from '@/lib/auth/session';
import { logger } from '@/lib/utils/logger';

/**
 * الحصول على معرف فريد للعميل (IP أو User ID)
 */
async function getIdentifier(
    request: NextRequest
): Promise<string> {
    // محاولة الحصول على User ID إذا كان مسجل دخول
    try {
        const user = await getCurrentUser();
        if (user) {
            return `user:${user.id}`;
        }
    } catch (error) {
        // إذا فشل، نستخدم IP
    }

    // استخدام IP Address كمعرف
    const forwarded = request.headers.get('x-forwarded-for');
    const ip = forwarded
        ? forwarded.split(',')[0].trim()
        : request.headers.get('x-real-ip') ||
        request.ip ||
        'unknown';

    return `ip:${ip}`;
}

/**
 * إضافة Rate Limit Headers للاستجابة
 */
function addRateLimitHeaders(
    response: NextResponse,
    limit: number,
    remaining: number,
    reset: number
): void {
    response.headers.set('X-RateLimit-Limit', limit.toString());
    response.headers.set('X-RateLimit-Remaining', remaining.toString());
    response.headers.set('X-RateLimit-Reset', new Date(reset).toISOString());
    response.headers.set('Retry-After', Math.ceil((reset - Date.now()) / 1000).toString());
}

/**
 * Rate Limiting Middleware
 * يمكن استخدامه كـ wrapper function أو middleware
 *
 * @returns object يحتوي على response (null إذا كان مسموح، أو NextResponse مع 429) و result (معلومات rate limit)
 */
export async function rateLimit(
    request: NextRequest,
    config?: RateLimitConfig
): Promise<{ response: NextResponse | null; result: any; addHeaders: (response: NextResponse) => Promise<void> }> {
    try {
        const pathname = new URL(request.url).pathname;
        const method = request.method;

        // تحديد نوع Rate Limit
        const rateLimitType = getRateLimitType(pathname, method);
        const rateLimitConfig = config || RATE_LIMIT_CONFIGS[rateLimitType];

        // إنشاء Rate Limiter
        const limiter = createRateLimiter(
            rateLimitConfig.limit,
            rateLimitConfig.window
        );

        // الحصول على معرف العميل
        const identifier = await getIdentifier(request);

        // التحقق من Rate Limit
        const result = await limiter.limit(identifier);

        // إنشاء الاستجابة
        const response = result.success
            ? null // null يعني أن الطلب مسموح، يمكن المتابعة
            : NextResponse.json(
                {
                    error: rateLimitConfig.message || 'تم تجاوز الحد المسموح من الطلبات',
                    retryAfter: Math.ceil(result.resetAfter || rateLimitConfig.window),
                },
                { status: 429 }
            );

        // إضافة Headers في حالة تجاوز الحد
        if (response) {
            addRateLimitHeaders(
                response,
                result.limit,
                result.remaining,
                result.reset
            );
        }

        // Logging في حالة تجاوز الحد
        if (!result.success) {
            logger.warn(
                `Rate limit exceeded: ${identifier} - ${method} ${pathname} - Limit: ${result.limit}/${rateLimitConfig.window}s`
            );
        }

        // Helper function لإضافة headers للاستجابة الناجحة
        const addHeaders = async (response: NextResponse) => {
            if (result) {
                addRateLimitHeaders(
                    response,
                    result.limit,
                    result.remaining,
                    result.reset
                );
            }
        };

        return { response, result, addHeaders };
    } catch (error) {
        // في حالة حدوث خطأ، نسمح بالطلب (fail open)
        // لتجنب تعطيل الخدمة
        logger.error('Rate limit error:', error);
        return {
            response: null,
            result: null,
            addHeaders: async () => { } // No-op function
        };
    }
}

/**
 * Helper function لإضافة Rate Limit Headers للاستجابة الناجحة
 */
export async function addRateLimitHeadersToResponse(
    request: NextRequest,
    response: NextResponse,
    config?: RateLimitConfig
): Promise<void> {
    try {
        const pathname = new URL(request.url).pathname;
        const method = request.method;
        const rateLimitType = getRateLimitType(pathname, method);
        const rateLimitConfig = config || RATE_LIMIT_CONFIGS[rateLimitType];
        const limiter = createRateLimiter(
            rateLimitConfig.limit,
            rateLimitConfig.window
        );
        const identifier = await getIdentifier(request);
        const result = await limiter.limit(identifier);

        addRateLimitHeaders(
            response,
            result.limit,
            result.remaining,
            result.reset
        );
    } catch (error) {
        // تجاهل الأخطاء في إضافة Headers
    }
}

/**
 * Rate Limit Wrapper للـ API Routes
 * استخدام: export const GET = withRateLimit(async (req) => { ... })
 */
export function withRateLimit<T extends any[]>(
    handler: (request: NextRequest, ...args: T) => Promise<NextResponse>,
    config?: RateLimitConfig
) {
    return async (request: NextRequest, ...args: T): Promise<NextResponse> => {
        // التحقق من Rate Limit
        const { response: rateLimitResponse } = await rateLimit(request, config);
        if (rateLimitResponse) {
            return rateLimitResponse;
        }

        // تنفيذ الـ handler الأصلي
        const response = await handler(request, ...args);

        // إضافة Rate Limit Headers للاستجابة الناجحة
        await addRateLimitHeadersToResponse(request, response, config);

        return response;
    };
}

/**
 * Export configs للاستخدام المباشر
 */
export { RATE_LIMIT_CONFIGS, getRateLimitType };
export type { RateLimitConfig };

