import { NextRequest, NextResponse } from 'next/server';
import { portfolioService } from '@/lib/services/portfolio.service';
import { withErrorHandler } from '@/lib/errors';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  return withErrorHandler(async () => {
    const { id } = await params;

    try {
      // Try by ID or Slug
      let item;
      try {
        item = await portfolioService.getPortfolioById(id);
      } catch {
        item = await portfolioService.getPortfolioBySlug(id);
      }

      return NextResponse.json({
        success: true,
        data: item,
      });
    } catch (error) {
      return NextResponse.json(
        { success: false, error: 'العمل غير موجود' },
        { status: 404 }
      );
    }
  })(request);
}

export const PUT = withErrorHandler(async (request: NextRequest) => {
  return NextResponse.json({ success: false, message: 'Static mode' }, { status: 403 });
});

export const PATCH = withErrorHandler(async (request: NextRequest) => {
  return NextResponse.json({ success: false, message: 'Static mode' }, { status: 403 });
});

export const DELETE = withErrorHandler(async (request: NextRequest) => {
  return NextResponse.json({ success: false, message: 'Static mode' }, { status: 403 });
});
