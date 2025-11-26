/**
 * Rate Limiting Configuration
 * معدلات مختلفة حسب نوع الـ endpoint
 */

export interface RateLimitConfig {
    /** عدد الطلبات المسموحة */
    limit: number;
    /** الفترة الزمنية بالثواني */
    window: number;
    /** رسالة الخطأ عند تجاوز الحد */
    message?: string;
}

/**
 * معدلات Rate Limiting حسب نوع الـ endpoint
 */
export const RATE_LIMIT_CONFIGS = {
    // Public GET requests (قراءة البيانات العامة)
    public: {
        limit: 100,
        window: 60, // 100 requests per minute
        message: 'تم تجاوز الحد المسموح من الطلبات. يرجى المحاولة لاحقاً.',
    },

    // Authentication endpoints (تسجيل الدخول والتسجيل)
    auth: {
        limit: 5,
        window: 60, // 5 requests per minute
        message: 'تم تجاوز عدد محاولات تسجيل الدخول. يرجى المحاولة بعد دقيقة.',
    },

    // Contact form (نموذج الاتصال)
    contact: {
        limit: 3,
        window: 3600, // 3 requests per hour
        message: 'يمكنك إرسال 3 رسائل فقط في الساعة. يرجى المحاولة لاحقاً.',
    },

    // Authenticated POST/PUT/DELETE (عمليات التعديل)
    authenticated: {
        limit: 30,
        window: 60, // 30 requests per minute
        message: 'تم تجاوز الحد المسموح من الطلبات. يرجى المحاولة لاحقاً.',
    },

    // Admin operations (عمليات الإدارة)
    admin: {
        limit: 50,
        window: 60, // 50 requests per minute
        message: 'تم تجاوز الحد المسموح من الطلبات الإدارية.',
    },

    // Strict rate limit (للمناطق الحساسة)
    strict: {
        limit: 10,
        window: 60, // 10 requests per minute
        message: 'تم تجاوز الحد المسموح. يرجى المحاولة بعد دقيقة.',
    },
} as const;

/**
 * تحديد نوع Rate Limit حسب مسار الـ API
 */
export function getRateLimitType(
    pathname: string,
    method: string
): keyof typeof RATE_LIMIT_CONFIGS {
    // Auth endpoints
    if (pathname.includes('/api/auth/login') || pathname.includes('/api/auth/register')) {
        return 'auth';
    }

    // Contact form
    if (pathname.includes('/api/contact') && method === 'POST') {
        return 'contact';
    }

    // Admin operations (require authentication)
    if (pathname.includes('/api/') && ['POST', 'PUT', 'DELETE', 'PATCH'].includes(method)) {
        return 'authenticated';
    }

    // Public GET requests
    if (method === 'GET') {
        return 'public';
    }

    // Default to strict
    return 'strict';
}

