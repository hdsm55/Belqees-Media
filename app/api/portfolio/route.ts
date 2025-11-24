import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAuth } from '@/lib/auth/session';
import { z } from 'zod';

const portfolioSchema = z.object({
    slug: z.string().min(1),
    title: z.string().min(1),
    description: z.string().optional(),
    images: z.any().optional(),
    videos: z.any().optional(),
    category: z.string().optional(),
    published: z.boolean().default(false),
});

export async function GET() {
    try {
        const portfolio = await prisma.portfolio.findMany({
            orderBy: { createdAt: 'desc' },
        });
        return NextResponse.json(portfolio);
    } catch (error) {
        console.error('Error fetching portfolio:', error);
        return NextResponse.json(
            { error: 'حدث خطأ أثناء جلب الأعمال' },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    try {
        await requireAuth();
        const body = await request.json();
        const data = portfolioSchema.parse(body);

        const item = await prisma.portfolio.create({ data });
        return NextResponse.json(item, { status: 201 });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { error: error.errors[0].message },
                { status: 400 }
            );
        }
        console.error('Error creating portfolio item:', error);
        return NextResponse.json(
            { error: 'حدث خطأ أثناء إنشاء العمل' },
            { status: 500 }
        );
    }
}

