import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { contactSchema } from '@/lib/validations/contact';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate with Zod
    const result = contactSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          error: 'Validation failed',
          details: result.error.errors.map(err => ({
            field: err.path[0],
            message: err.message,
          })),
        },
        { status: 400 }
      );
    }

    const { name, email, message, subject } = result.data;

    const contactMessage = await prisma.contactMessage.create({
      data: {
        name,
        email,
        message,
        subject: subject || null,
      },
    });

    return NextResponse.json(
      {
        status: 'success',
        message: 'تم إرسال الرسالة بنجاح',
        data: contactMessage,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating contact message:', error);
    return NextResponse.json(
      {
        status: 'error',
        error: 'Failed to create contact message',
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const messages = await prisma.contactMessage.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(messages);
  } catch (error) {
    console.error('Error fetching contact messages:', error);
    return NextResponse.json(
      { error: 'Failed to fetch contact messages' },
      { status: 500 }
    );
  }
}
