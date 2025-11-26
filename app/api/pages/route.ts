import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAuth } from '@/lib/auth/session';
import { rateLimit } from '@/lib/rate-limit';
import { withErrorHandler } from '@/lib/errors';
import { invalidateCacheByTags } from '@/lib/cache/middleware';

export const GET = withErrorHandler(async (request: NextRequest) => {
  // Rate limiting
  const { response: rateLimitResponse } = await rateLimit(request);
  if (rateLimitResponse) return rateLimitResponse;

  await requireAuth(); // Require authentication
  const pages = await prisma.page.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return NextResponse.json({
    success: true,
    data: pages,
  });
});

export const POST = withErrorHandler(async (request: NextRequest) => {
  // Rate limiting
  const { response: rateLimitResponse } = await rateLimit(request);
  if (rateLimitResponse) return rateLimitResponse;

  await requireAuth();
  const body = await request.json();

  const page = await prisma.page.create({
    data: body,
  });

  // Invalidate cache
  await invalidateCacheByTags(['pages', 'public']);

  return NextResponse.json({
    success: true,
    data: page,
    message: 'تم إنشاء الصفحة بنجاح',
  }, { status: 201 });
});
