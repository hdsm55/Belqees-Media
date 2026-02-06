import { NextRequest, NextResponse } from 'next/server';
import { blogPosts } from '@/data/blog';
import { withErrorHandler } from '@/lib/errors';
import { withCache } from '@/lib/cache/middleware';

export const GET = withCache(
  withErrorHandler(async (request: NextRequest) => {
    return NextResponse.json({
      success: true,
      data: blogPosts,
    });
  }),
  { type: 'blog' }
);

export const POST = withErrorHandler(async (request: NextRequest) => {
  return NextResponse.json({
    success: false,
    message: 'Post features are disabled in static mode',
  }, { status: 403 });
});
