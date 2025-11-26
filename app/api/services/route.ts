import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAuth } from '@/lib/auth/session';
import { z } from 'zod';
import { rateLimit } from '@/lib/rate-limit';
import { withErrorHandler } from '@/lib/errors';
import { withCache, invalidateCacheByTags } from '@/lib/cache/middleware';

const serviceSchema = z.object({
    slug: z.string().min(1),
    title: z.string().min(1),
    description: z.string().optional(),
    icon: z.string().optional(),
    image: z.string().optional(),
    content: z.any().optional(),
    published: z.boolean().default(false),
});

export const GET = withCache(
    withErrorHandler(async (request: NextRequest) => {
        // Rate limiting
        const { response: rateLimitResponse } = await rateLimit(request);
        if (rateLimitResponse) return rateLimitResponse;

        const { searchParams } = new URL(request.url);
        const published = searchParams.get('published');

        const where: any = {};

        // Filter by published status (default: only published)
        if (published === 'all') {
            // Show all (for admin)
        } else {
            where.published = true;
        }

        const services = await prisma.service.findMany({
            where,
            orderBy: { createdAt: 'desc' },
        });

        return NextResponse.json({
            success: true,
            data: services,
        });
    }),
    {
        type: 'services',
        skip: (request: NextRequest) => {
            const url = new URL(request.url);
            return url.searchParams.get('published') === 'all';
        }
    }
);

export const POST = withErrorHandler(async (request: NextRequest) => {
    // Rate limiting
    const { response: rateLimitResponse } = await rateLimit(request);
    if (rateLimitResponse) return rateLimitResponse;

    await requireAuth();
    const body = await request.json();
    const data = serviceSchema.parse(body);

    const service = await prisma.service.create({ data });

    // Invalidate cache
    await invalidateCacheByTags(['services', 'public']);

    return NextResponse.json({
        success: true,
        data: service,
        message: 'تم إنشاء الخدمة بنجاح',
    }, { status: 201 });
});

