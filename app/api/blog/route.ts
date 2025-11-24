import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAuth } from '@/lib/auth/session';
import { z } from 'zod';

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

export async function GET() {
  try {
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
    return NextResponse.json(posts);
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return NextResponse.json(
      { error: 'حدث خطأ أثناء جلب المدونات' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
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

    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      );
    }
    console.error('Error creating blog post:', error);
    return NextResponse.json(
      { error: 'حدث خطأ أثناء إنشاء المدونة' },
      { status: 500 }
    );
  }
}

