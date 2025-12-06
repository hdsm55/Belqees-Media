import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAuth } from '@/lib/auth/session';
import { z } from 'zod';
import { rateLimit } from '@/lib/rate-limit';
import { withErrorHandler } from '@/lib/errors';
import { withCache, invalidateCacheByTags } from '@/lib/cache/middleware';
import { withCSRFProtection } from '@/lib/csrf/middleware';

const portfolioSchema = z.object({
    slug: z.string().min(1),
    title: z.string().min(1),
    description: z.string().optional(),
    images: z.any().optional(),
    videos: z.any().optional(),
    category: z.string().optional(),
    published: z.boolean().default(false),
});

export const GET = withCache(
    withErrorHandler(async (request: NextRequest) => {
        // Rate limiting
        const { response: rateLimitResponse } = await rateLimit(request);
        if (rateLimitResponse) return rateLimitResponse;

        const { searchParams } = new URL(request.url);
        const category = searchParams.get('category');
        const published = searchParams.get('published');
        const limit = searchParams.get('limit');
        const offset = searchParams.get('offset');

        const where: any = {};

        // Filter by published status (default: only published)
        if (published === 'all') {
            // Show all (for admin)
        } else {
            where.published = true;
        }

        // Filter by category
        if (category) {
            where.category = category;
        }

        const portfolio = await prisma.portfolio.findMany({
            where,
            orderBy: { createdAt: 'desc' },
            take: limit ? parseInt(limit) : undefined,
            skip: offset ? parseInt(offset) : undefined,
        });

        const total = await prisma.portfolio.count({ where });

        return NextResponse.json({
            success: true,
            data: portfolio,
            pagination: {
                total,
                limit: limit ? parseInt(limit) : null,
                offset: offset ? parseInt(offset) : null,
            },
        });
    }),
    {
        type: 'portfolio',
        skip: (request: NextRequest) => {
            const url = new URL(request.url);
            return url.searchParams.get('published') === 'all';
        }
    }
);

export const POST = withCSRFProtection(
    withErrorHandler(async (request: NextRequest) => {
        // Rate limiting
        const { response: rateLimitResponse } = await rateLimit(request);
        if (rateLimitResponse) return rateLimitResponse;

        await requireAuth();
        const body = await request.json();
        const data = portfolioSchema.parse(body);

        const item = await prisma.portfolio.create({ data });

        // Invalidate cache
        await invalidateCacheByTags(['portfolio', 'public']);

        return NextResponse.json({
            success: true,
            data: item,
            message: 'تم إنشاء العمل بنجاح',
        }, { status: 201 });
    })
);

