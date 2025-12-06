import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAuth } from '@/lib/auth/session';
import { rateLimit } from '@/lib/rate-limit';
import { withErrorHandler } from '@/lib/errors';
import { createClient } from '@/lib/supabase/server';
import { z } from 'zod';

const mediaSchema = z.object({
    filename: z.string().min(1),
    url: z.string().url(),
    type: z.string(),
    size: z.number(),
});

export const GET = withErrorHandler(async (request: NextRequest) => {
    const { response: rateLimitResponse } = await rateLimit(request);
    if (rateLimitResponse) return rateLimitResponse;

    await requireAuth();

    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    const limit = searchParams.get('limit');
    const offset = searchParams.get('offset');

    const where: any = {};
    if (type) {
        where.type = type.startsWith('image') ? { startsWith: 'image' } : type;
    }

    const media = await prisma.media.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        take: limit ? parseInt(limit) : undefined,
        skip: offset ? parseInt(offset) : undefined,
        include: {
            uploader: {
                select: {
                    id: true,
                    email: true,
                },
            },
        },
    });

    const total = await prisma.media.count({ where });

    return NextResponse.json({
        success: true,
        data: media,
        total,
    });
});

export const POST = withErrorHandler(async (request: NextRequest) => {
    const { response: rateLimitResponse } = await rateLimit(request);
    if (rateLimitResponse) return rateLimitResponse;

    const user = await requireAuth();
    const body = await request.json();
    const data = mediaSchema.parse(body);

    const media = await prisma.media.create({
        data: {
            ...data,
            uploadedBy: user.id,
        },
        include: {
            uploader: {
                select: {
                    id: true,
                    email: true,
                },
            },
        },
    });

    return NextResponse.json(
        {
            success: true,
            data: media,
            message: 'تم رفع الملف بنجاح',
        },
        { status: 201 }
    );
});

