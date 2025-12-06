import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAuth } from '@/lib/auth/session';
import { z } from 'zod';
import { rateLimit } from '@/lib/rate-limit';
import { withErrorHandler } from '@/lib/errors';
import { withCache, invalidateCacheByTags } from '@/lib/cache/middleware';
import { withCSRFProtection } from '@/lib/csrf/middleware';

const eventSchema = z.object({
    slug: z.string().min(1),
    title: z.string().min(1),
    description: z.string().optional(),
    date: z.string().or(z.date()),
    time: z.string().optional(),
    location: z.string().optional(),
    image: z.string().optional(),
    registrations: z.any().optional(),
    published: z.boolean().default(false),
});

export const GET = withCache(
    withErrorHandler(async (request: NextRequest) => {
        // Rate limiting
        const { response: rateLimitResponse } = await rateLimit(request);
        if (rateLimitResponse) return rateLimitResponse;

        const { searchParams } = new URL(request.url);
        const published = searchParams.get('published');
        const limit = searchParams.get('limit');

        const where: any = {};

        // Filter by published status (default: only published)
        if (published === 'all') {
            // Show all (for admin) - skip cache for admin requests
        } else {
            where.published = true;
        }

        const events = await prisma.event.findMany({
            where,
            orderBy: { date: 'desc' },
            take: limit ? parseInt(limit) : undefined,
        });

        return NextResponse.json({
            success: true,
            data: events,
        });
    }),
    {
        type: 'events',
        skip: (request: NextRequest) => {
            const url = new URL(request.url);
            return url.searchParams.get('published') === 'all'; // Skip cache for admin
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
        const data = eventSchema.parse(body);

        const event = await prisma.event.create({ data });

        // Invalidate cache
        await invalidateCacheByTags(['events', 'public']);

        return NextResponse.json({
            success: true,
            data: event,
            message: 'تم إنشاء الفعالية بنجاح',
        }, { status: 201 });
    }),
    {
        excludePaths: [], // Protect all POST requests
    }
);

