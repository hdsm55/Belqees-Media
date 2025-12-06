import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAuth } from '@/lib/auth/session';
import { z } from 'zod';
import { rateLimit } from '@/lib/rate-limit';
import { invalidateCacheByTags } from '@/lib/cache/middleware';
import { withCSRFProtection } from '@/lib/csrf/middleware';
import { withErrorHandler } from '@/lib/errors';

// Force dynamic rendering for API routes
export const dynamic = 'force-dynamic';

const updatePortfolioSchema = z.object({
    slug: z.string().min(1).optional(),
    title: z.string().min(1).optional(),
    description: z.string().optional(),
    images: z.any().optional(),
    videos: z.any().optional(),
    category: z.string().optional(),
    published: z.boolean().optional(),
});

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    // Rate limiting
    const { response: rateLimitResponse } = await rateLimit(request);
    if (rateLimitResponse) return rateLimitResponse;

    try {
        const { id } = await params;

        // Try to find by ID first, then by slug
        let item = await prisma.portfolio.findUnique({
            where: { id },
        });

        if (!item) {
            item = await prisma.portfolio.findUnique({
                where: { slug: id },
            });
        }

        if (!item) {
            return NextResponse.json(
                { success: false, error: 'العمل غير موجود' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            data: item,
        });
    } catch (error) {
        console.error('Error fetching portfolio item:', error);
        return NextResponse.json(
            { success: false, error: 'حدث خطأ أثناء جلب العمل' },
            { status: 500 }
        );
    }
}

export const PUT = withCSRFProtection(
  withErrorHandler(async (
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
  ) => {
    // Rate limiting
    const { response: rateLimitResponse } = await rateLimit(request);
    if (rateLimitResponse) return rateLimitResponse;

    await requireAuth();
    const { id } = await params;
    const body = await request.json();
    const data = updatePortfolioSchema.parse(body);

    const item = await prisma.portfolio.update({
        where: { id },
        data,
    });

    // Invalidate cache
    await invalidateCacheByTags(['portfolio', 'public']);

    return NextResponse.json({
        success: true,
        data: item,
        message: 'تم تحديث العمل بنجاح',
    });
  })
);

export const PATCH = withCSRFProtection(
  withErrorHandler(async (
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
  ) => {
    // Rate limiting
    const { response: rateLimitResponse } = await rateLimit(request);
    if (rateLimitResponse) return rateLimitResponse;

    await requireAuth();
    const { id } = await params;
    const body = await request.json();
    const data = updatePortfolioSchema.parse(body);

    const item = await prisma.portfolio.update({
        where: { id },
        data,
    });

    // Invalidate cache
    await invalidateCacheByTags(['portfolio', 'public']);

    return NextResponse.json({
        success: true,
        data: item,
        message: 'تم تحديث العمل بنجاح',
    });
  })
);

export const DELETE = withCSRFProtection(
  withErrorHandler(async (
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
  ) => {
    // Rate limiting
    const { response: rateLimitResponse } = await rateLimit(request);
    if (rateLimitResponse) return rateLimitResponse;

    await requireAuth();
    const { id } = await params;
    await prisma.portfolio.delete({
        where: { id },
    });

    // Invalidate cache
    await invalidateCacheByTags(['portfolio', 'public']);

    return NextResponse.json({
        success: true,
        message: 'تم حذف العمل بنجاح',
    });
  })
);

