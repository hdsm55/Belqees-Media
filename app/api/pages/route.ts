import { NextRequest, NextResponse } from 'next/server';
import { pages as staticPages } from '@/data/pages';
import { withErrorHandler } from '@/lib/errors';

export const GET = withErrorHandler(async (request: NextRequest) => {
  return NextResponse.json({
    success: true,
    data: staticPages,
  });
});

export const POST = withErrorHandler(async (request: NextRequest) => {
  return NextResponse.json({
    success: false,
    message: 'Static mode',
  }, { status: 403 });
});
