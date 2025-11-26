import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAuth } from '@/lib/auth/session';
import { rateLimit } from '@/lib/rate-limit';
import { withErrorHandler, NotFoundError } from '@/lib/errors';
import { invalidateCacheByTags } from '@/lib/cache/middleware';

export const GET = withErrorHandler(async (
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  // Rate limiting
  const { response: rateLimitResponse } = await rateLimit(request);
  if (rateLimitResponse) return rateLimitResponse;

  await requireAuth();
  const { id } = await params;
  const page = await prisma.page.findUnique({
    where: { id },
  });

  if (!page) {
    throw new NotFoundError('الصفحة');
  }

  return NextResponse.json({
    success: true,
    data: page,
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

  const page = await prisma.page.update({
    where: { id },
    data: body,
  });

  // Invalidate cache
  await invalidateCacheByTags(['pages', 'public']);

  return NextResponse.json({
    success: true,
    data: page,
    message: 'تم تحديث الصفحة بنجاح',
  });
});

export const PATCH = withErrorHandler(async (
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  // Rate limiting
  const { response: rateLimitResponse } = await rateLimit(request);
  if (rateLimitResponse) return rateLimitResponse;

  await requireAuth();
  const { id } = await params;
  const body = await request.json();

  const page = await prisma.page.update({
    where: { id },
    data: body,
  });

  // Invalidate cache
  await invalidateCacheByTags(['pages', 'public']);

  return NextResponse.json({
    success: true,
    data: page,
    message: 'تم تحديث الصفحة بنجاح',
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

  await prisma.page.delete({
    where: { id },
  });

  // Invalidate cache
  await invalidateCacheByTags(['pages', 'public']);

  return NextResponse.json({
    success: true,
    message: 'تم حذف الصفحة بنجاح',
  });
});
