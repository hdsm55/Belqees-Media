import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAuth } from '@/lib/auth/session';
import { z } from 'zod';

const updateServiceSchema = z.object({
    slug: z.string().min(1).optional(),
    title: z.string().min(1).optional(),
    description: z.string().optional(),
    icon: z.string().optional(),
    image: z.string().optional(),
    content: z.any().optional(),
    published: z.boolean().optional(),
});

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const service = await prisma.service.findUnique({
            where: { id },
        });

        if (!service) {
            return NextResponse.json(
                { error: 'الخدمة غير موجودة' },
                { status: 404 }
            );
        }

        return NextResponse.json(service);
    } catch (error) {
        console.error('Error fetching service:', error);
        return NextResponse.json(
            { error: 'حدث خطأ أثناء جلب الخدمة' },
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
        const data = updateServiceSchema.parse(body);

        const service = await prisma.service.update({
            where: { id },
            data,
        });

        return NextResponse.json(service);
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { error: error.errors[0].message },
                { status: 400 }
            );
        }
        console.error('Error updating service:', error);
        return NextResponse.json(
            { error: 'حدث خطأ أثناء تحديث الخدمة' },
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
        await prisma.service.delete({
            where: { id },
        });

        return NextResponse.json({ message: 'تم حذف الخدمة بنجاح' });
    } catch (error) {
        console.error('Error deleting service:', error);
        return NextResponse.json(
            { error: 'حدث خطأ أثناء حذف الخدمة' },
            { status: 500 }
        );
    }
}

