import { NextRequest, NextResponse } from 'next/server';
import { blogPosts } from '@/data/blog';
import { withErrorHandler } from '@/lib/errors';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  return withErrorHandler(async () => {
    const { id } = await params;
    const post = blogPosts.find(p => p.id === id || p.slug === id);

    if (!post) {
      return NextResponse.json(
        { success: false, error: 'المدونة غير موجودة' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: post,
    });
  })(request);
}

export async function PUT(request: NextRequest) {
  return NextResponse.json({ success: false, message: 'Static mode' }, { status: 403 });
}

export async function PATCH(request: NextRequest) {
  return NextResponse.json({ success: false, message: 'Static mode' }, { status: 403 });
}

export async function DELETE(request: NextRequest) {
  return NextResponse.json({ success: false, message: 'Static mode' }, { status: 403 });
}
