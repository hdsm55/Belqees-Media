import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAuth } from '@/lib/auth/session';
import { z } from 'zod';
import { rateLimit } from '@/lib/rate-limit';
import { withErrorHandler, NotFoundError, ErrorCode } from '@/lib/errors';

const updateEventSchema = z.object({
  slug: z.string().min(1).optional(),
  title: z.string().min(1).optional(),
  description: z.string().optional(),
  date: z.string().or(z.date()).optional(),
  time: z.string().optional(),
  location: z.string().optional(),
  image: z.string().optional(),
  registrations: z.any().optional(),
  published: z.boolean().optional(),
});

export const GET = withErrorHandler(async (
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  // Rate limiting
  const { response: rateLimitResponse } = await rateLimit(request);
  if (rateLimitResponse) return rateLimitResponse;

  const { id } = await params;
  const event = await prisma.event.findUnique({
    where: { id },
  });

  if (!event) {
    throw new NotFoundError('الفعالية');
  }

  return NextResponse.json({
    success: true,
    data: event,
  });
});

export const PUT = withErrorHandler(async (
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  // Rate limiting
  const { response: rateLimitResponse } = await rateLimit(request);
  if (rateLimitResponse) return rateLimitResponse;

  await requireAuth();
  const { id } = await params;
  const body = await request.json();
  const data = updateEventSchema.parse(body);

  const event = await prisma.event.update({
    where: { id },
    data,
  });

  return NextResponse.json({
    success: true,
    data: event,
    message: 'تم تحديث الفعالية بنجاح',
  });
});

export const DELETE = withErrorHandler(async (
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  // Rate limiting
  const { response: rateLimitResponse } = await rateLimit(request);
  if (rateLimitResponse) return rateLimitResponse;

  await requireAuth();
  const { id } = await params;
  await prisma.event.delete({
    where: { id },
  });

  return NextResponse.json({
    success: true,
    message: 'تم حذف الفعالية بنجاح',
  });
});

