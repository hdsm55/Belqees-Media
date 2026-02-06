import { NextRequest, NextResponse } from 'next/server';
import { pages as staticPages } from '@/data/pages';
import { withErrorHandler } from '@/lib/errors';

export const GET = withErrorHandler(async (
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  const { id } = await params;
  const page = staticPages.find(p => p.id === id || p.slug === id);

  if (!page) {
    return NextResponse.json(
      { success: false, error: 'الصفحة غير موجودة' },
      { status: 404 }
    );
  }

  return NextResponse.json({
    success: true,
    data: page,
  });
});

export const PUT = withErrorHandler(async (request: NextRequest) => {
  return NextResponse.json({ success: false, message: 'Static mode' }, { status: 403 });
});

export const PATCH = withErrorHandler(async (request: NextRequest) => {
  return NextResponse.json({ success: false, message: 'Static mode' }, { status: 403 });
});

export const DELETE = withErrorHandler(async (request: NextRequest) => {
  return NextResponse.json({ success: false, message: 'Static mode' }, { status: 403 });
});
