import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAuth } from '@/lib/auth/session';
import { z } from 'zod';
import { rateLimit } from '@/lib/rate-limit';
import { withErrorHandler } from '@/lib/errors';
import { withCache, invalidateCacheByTags } from '@/lib/cache/middleware';

const blogPostSchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  excerpt: z.string().optional(),
  content: z.string().min(1),
  featuredImage: z.string().optional(),
  categoryId: z.string().optional(),
  published: z.boolean().default(false),
  publishedAt: z.string().or(z.date()).optional().nullable(),
});

export const GET = withCache(
  withErrorHandler(async (request: NextRequest) => {
    // Rate limiting
    const { response: rateLimitResponse } = await rateLimit(request);
    if (rateLimitResponse) return rateLimitResponse;

    const posts = await prisma.blogPost.findMany({
      include: {
        author: {
          select: {
            id: true,
            email: true,
          },
        },
        category: true,
        tags: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({
      success: true,
      data: posts,
    });
  }),
  { type: 'blog' }
);

export const POST = withErrorHandler(async (request: NextRequest) => {
  // Rate limiting
  const { response: rateLimitResponse } = await rateLimit(request);
  if (rateLimitResponse) return rateLimitResponse;

  const user = await requireAuth();
  const body = await request.json();
  const data = blogPostSchema.parse(body);

  const post = await prisma.blogPost.create({
    data: {
      ...data,
      authorId: user.id,
    },
    include: {
      author: {
        select: {
          id: true,
          email: true,
        },
      },
      category: true,
    },
  });

  // Invalidate cache
  await invalidateCacheByTags(['blog', 'public']);

  return NextResponse.json({
    success: true,
    data: post,
    message: 'تم إنشاء المدونة بنجاح',
  }, { status: 201 });
});

