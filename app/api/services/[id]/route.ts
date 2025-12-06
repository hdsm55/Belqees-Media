import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAuth } from '@/lib/auth/session';
import { z } from 'zod';
import { rateLimit } from '@/lib/rate-limit';
import { withErrorHandler, NotFoundError } from '@/lib/errors';
import { invalidateCacheByTags } from '@/lib/cache/middleware';
import { withCSRFProtection } from '@/lib/csrf/middleware';

// Force dynamic rendering for API routes
export const dynamic = 'force-dynamic';

const updateServiceSchema = z.object({
    slug: z.string().min(1).optional(),
    title: z.string().min(1).optional(),
    description: z.string().optional(),
    icon: z.string().optional(),
    image: z.string().optional(),
    content: z.any().optional(),
    published: z.boolean().optional(),
});

export const GET = withErrorHandler(async (
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) => {
    // Rate limiting
    const { response: rateLimitResponse } = await rateLimit(request);
    if (rateLimitResponse) return rateLimitResponse;

    const { id } = await params;
    const service = await prisma.service.findUnique({
        where: { id },
    });

    if (!service) {
        throw new NotFoundError('الخدمة');
    }

    return NextResponse.json({
        success: true,
        data: service,
    });
});

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
    const data = updateServiceSchema.parse(body);

    const service = await prisma.service.update({
        where: { id },
        data,
    });

    // Invalidate cache
    await invalidateCacheByTags(['services', 'public']);

    return NextResponse.json({
        success: true,
        data: service,
        message: 'تم تحديث الخدمة بنجاح',
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
    const data = updateServiceSchema.parse(body);

    const service = await prisma.service.update({
        where: { id },
        data,
    });

    // Invalidate cache
    await invalidateCacheByTags(['services', 'public']);

    return NextResponse.json({
        success: true,
        data: service,
        message: 'تم تحديث الخدمة بنجاح',
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

    await prisma.service.delete({
        where: { id },
    });

    // Invalidate cache
    await invalidateCacheByTags(['services', 'public']);

    return NextResponse.json({
        success: true,
        message: 'تم حذف الخدمة بنجاح',
    });
  })
);

