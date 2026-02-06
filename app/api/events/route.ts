import { NextRequest, NextResponse } from 'next/server';
import { eventService } from '@/lib/services/event.service';
import { withErrorHandler } from '@/lib/errors';
import { withCache } from '@/lib/cache/middleware';

export const GET = withCache(
    withErrorHandler(async (request: NextRequest) => {
        const { searchParams } = new URL(request.url);
        const limit = searchParams.get('limit');

        const events = await eventService.getPublishedEvents(limit ? parseInt(limit) : undefined);

        return NextResponse.json({
            success: true,
            data: events,
        });
    }),
    {
        type: 'events'
    }
);

export const POST = withErrorHandler(async (request: NextRequest) => {
    return NextResponse.json({
        success: false,
        message: 'Management features are disabled in static mode',
    }, { status: 403 });
});
