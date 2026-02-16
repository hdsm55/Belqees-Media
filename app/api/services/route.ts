import { NextRequest, NextResponse } from 'next/server';
import { serviceService } from '@/lib/services/service.service';
import { withErrorHandler } from '@/lib/errors';
import { withCache } from '@/lib/cache/middleware';
import { createAdminClient } from '@/lib/supabase/server';

export const GET = withCache(
    withErrorHandler(async (request: NextRequest) => {
        const { searchParams } = new URL(request.url);
        const limit = searchParams.get('limit');

        const services = await serviceService.getPublishedServices(limit ? parseInt(limit) : undefined);

        return NextResponse.json({
            success: true,
            data: services,
        });
    }),
    {
        type: 'services'
    }
);

export const POST = withErrorHandler(async (request: NextRequest) => {
    const body = await request.json();
    const supabase = createAdminClient();

    const { data, error } = await supabase
        .from('services')
        .insert([body])
        .select();

    if (error) throw error;

    return NextResponse.json({
        success: true,
        data: data[0],
    });
});
