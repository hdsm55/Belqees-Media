import { NextRequest, NextResponse } from 'next/server';
import { eventService } from '@/lib/services/event.service';
import { withErrorHandler } from '@/lib/errors';
import { withCache } from '@/lib/cache/middleware';
import { createAdminClient } from '@/lib/supabase/server';

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
    const body = await request.json();
    const supabase = createAdminClient();

    const { data, error } = await supabase
        .from('events')
        .insert([body])
        .select();

    if (error) throw error;

    return NextResponse.json({
        success: true,
        data: data[0],
    });
});
