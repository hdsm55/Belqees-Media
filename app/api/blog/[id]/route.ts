import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAuth } from '@/lib/auth/session';
import { z } from 'zod';

const updateBlogPostSchema = z.object({
  slug: z.string().min(1).optional(),
  title: z.string().min(1).optional(),
  excerpt: z.string().optional(),
  content: z.string().optional(),
  featuredImage: z.string().optional(),
  categoryId: z.string().optional().nullable(),
  published: z.boolean().optional(),
  publishedAt: z.string().or(z.date()).optional().nullable(),
});

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const post = await prisma.blogPost.findUnique({
      where: { id },
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
    });

    if (!post) {
      return NextResponse.json(
        { error: 'المدونة غير موجودة' },
        { status: 404 }
      );
    }

    return NextResponse.json(post);
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return NextResponse.json(
      { error: 'حدث خطأ أثناء جلب المدونة' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAuth();
    const { id } = await params;
    const body = await request.json();
    const data = updateBlogPostSchema.parse(body);

    const post = await prisma.blogPost.update({
      where: { id },
      data,
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

    return NextResponse.json(post);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      );
    }
    console.error('Error updating blog post:', error);
    return NextResponse.json(
      { error: 'حدث خطأ أثناء تحديث المدونة' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAuth();
    const { id } = await params;
    await prisma.blogPost.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'تم حذف المدونة بنجاح' });
  } catch (error) {
    console.error('Error deleting blog post:', error);
    return NextResponse.json(
      { error: 'حدث خطأ أثناء حذف المدونة' },
      { status: 500 }
    );
  }
}

