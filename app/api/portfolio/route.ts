import { NextRequest, NextResponse } from 'next/server';
import { portfolioService } from '@/lib/services/portfolio.service';
import { withErrorHandler } from '@/lib/errors';
import { withCache } from '@/lib/cache/middleware';

export const GET = withCache(
    withErrorHandler(async (request: NextRequest) => {
        const { searchParams } = new URL(request.url);
        const category = searchParams.get('category') || undefined;
        const published = searchParams.get('published');
        const limit = searchParams.get('limit');
        const offset = searchParams.get('offset');

        const filters = {
            category,
            published: published === 'all' ? undefined : true,
            limit: limit ? parseInt(limit) : 12,
            offset: offset ? parseInt(offset) : 0,
        };

        const { portfolio, total } = await portfolioService.getAllPortfolio(filters);

        return NextResponse.json({
            success: true,
            data: portfolio,
            total,
            pagination: {
                total,
                limit: filters.limit,
                offset: filters.offset,
            },
        });
    }),
    {
        type: 'portfolio'
    }
);

export const POST = withErrorHandler(async (request: NextRequest) => {
    return NextResponse.json({
        success: false,
        message: 'Management features are disabled in static mode',
    }, { status: 403 });
});
