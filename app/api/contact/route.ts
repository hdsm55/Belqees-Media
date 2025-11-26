import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { contactSchema } from '@/lib/validations/contact';
import { rateLimit } from '@/lib/rate-limit';
import { withErrorHandler, ValidationError } from '@/lib/errors';

export const POST = withErrorHandler(async (request: NextRequest) => {
  // Rate limiting (خاص بنموذج الاتصال - 3 requests/hour)
  const { response: rateLimitResponse } = await rateLimit(request);
  if (rateLimitResponse) return rateLimitResponse;

  const body = await request.json();

  // Validate with Zod
  const result = contactSchema.safeParse(body);

  if (!result.success) {
    throw new ValidationError('خطأ في التحقق من البيانات', result.error.errors);
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
      success: true,
      message: 'تم إرسال الرسالة بنجاح',
      data: contactMessage,
    },
    { status: 201 }
  );
});

export const GET = withErrorHandler(async (request: NextRequest) => {
  // Rate limiting
  const { response: rateLimitResponse } = await rateLimit(request);
  if (rateLimitResponse) return rateLimitResponse;

  const messages = await prisma.contactMessage.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return NextResponse.json({
    success: true,
    data: messages,
  });
});
