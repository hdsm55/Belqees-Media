import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAuth } from '@/lib/auth/session';
import { z } from 'zod';

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
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const item = await prisma.portfolio.findUnique({
            where: { id },
        });

        if (!item) {
            return NextResponse.json(
                { error: 'العمل غير موجود' },
                { status: 404 }
            );
        }

        return NextResponse.json(item);
    } catch (error) {
        console.error('Error fetching portfolio item:', error);
        return NextResponse.json(
            { error: 'حدث خطأ أثناء جلب العمل' },
            { status: 500 }
        );
    }
}

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await requireAuth();
        const { id } = await params;
        const body = await request.json();
        const data = updatePortfolioSchema.parse(body);

        const item = await prisma.portfolio.update({
            where: { id },
            data,
        });

        return NextResponse.json(item);
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { error: error.errors[0].message },
                { status: 400 }
            );
        }
        console.error('Error updating portfolio item:', error);
        return NextResponse.json(
            { error: 'حدث خطأ أثناء تحديث العمل' },
            { status: 500 }
        );
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await requireAuth();
        const { id } = await params;
        await prisma.portfolio.delete({
            where: { id },
        });

        return NextResponse.json({ message: 'تم حذف العمل بنجاح' });
    } catch (error) {
        console.error('Error deleting portfolio item:', error);
        return NextResponse.json(
            { error: 'حدث خطأ أثناء حذف العمل' },
            { status: 500 }
        );
    }
}

