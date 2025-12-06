import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAuth } from '@/lib/auth/session';
import { rateLimit } from '@/lib/rate-limit';
import { withErrorHandler } from '@/lib/errors';
import { createClient } from '@/lib/supabase/server';

export const DELETE = withErrorHandler(async (
    request: NextRequest,
    { params }: { params: { id: string } }
) => {
    const { response: rateLimitResponse } = await rateLimit(request);
    if (rateLimitResponse) return rateLimitResponse;

    await requireAuth();

    const media = await prisma.media.findUnique({
        where: { id: params.id },
    });

    if (!media) {
        return NextResponse.json(
            { success: false, message: 'الملف غير موجود' },
            { status: 404 }
        );
    }

    try {
        // Delete from Supabase Storage
        const supabase = await createClient();
        const filePath = media.url.split('/').slice(-2).join('/'); // Extract path from URL
        await supabase.storage.from('media').remove([filePath]);

        // Delete from database
        await prisma.media.delete({
            where: { id: params.id },
        });

        return NextResponse.json({
            success: true,
            message: 'تم حذف الملف بنجاح',
        });
    } catch (error: any) {
        return NextResponse.json(
            {
                success: false,
                message: error.message || 'حدث خطأ أثناء حذف الملف',
            },
            { status: 500 }
        );
    }
});

export const GET = withErrorHandler(async (
    request: NextRequest,
    { params }: { params: { id: string } }
) => {
    const { response: rateLimitResponse } = await rateLimit(request);
    if (rateLimitResponse) return rateLimitResponse;

    await requireAuth();

    const media = await prisma.media.findUnique({
        where: { id: params.id },
        include: {
            uploader: {
                select: {
                    id: true,
                    email: true,
                },
            },
        },
    });

    if (!media) {
        return NextResponse.json(
            { success: false, message: 'الملف غير موجود' },
            { status: 404 }
        );
    }

    return NextResponse.json({
        success: true,
        data: media,
    });
});

