import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAuth } from '@/lib/auth/session';
import { z } from 'zod';

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

export async function GET() {
    try {
        const events = await prisma.event.findMany({
            orderBy: { date: 'desc' },
        });
        return NextResponse.json(events);
    } catch (error) {
        console.error('Error fetching events:', error);
        return NextResponse.json(
            { error: 'حدث خطأ أثناء جلب الفعاليات' },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    try {
        await requireAuth();
        const body = await request.json();
        const data = eventSchema.parse(body);

        const event = await prisma.event.create({ data });
        return NextResponse.json(event, { status: 201 });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { error: error.errors[0].message },
                { status: 400 }
            );
        }
        console.error('Error creating event:', error);
        return NextResponse.json(
            { error: 'حدث خطأ أثناء إنشاء الفعالية' },
            { status: 500 }
        );
    }
}

