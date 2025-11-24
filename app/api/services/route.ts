import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAuth } from '@/lib/auth/session';
import { z } from 'zod';

const serviceSchema = z.object({
    slug: z.string().min(1),
    title: z.string().min(1),
    description: z.string().optional(),
    icon: z.string().optional(),
    image: z.string().optional(),
    content: z.any().optional(),
    published: z.boolean().default(false),
});

export async function GET() {
    try {
        const services = await prisma.service.findMany({
            orderBy: { createdAt: 'desc' },
        });
        return NextResponse.json(services);
    } catch (error) {
        console.error('Error fetching services:', error);
        return NextResponse.json(
            { error: 'حدث خطأ أثناء جلب الخدمات' },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    try {
        await requireAuth();
        const body = await request.json();
        const data = serviceSchema.parse(body);

        const service = await prisma.service.create({ data });
        return NextResponse.json(service, { status: 201 });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { error: error.errors[0].message },
                { status: 400 }
            );
        }
        console.error('Error creating service:', error);
        return NextResponse.json(
            { error: 'حدث خطأ أثناء إنشاء الخدمة' },
            { status: 500 }
        );
    }
}

