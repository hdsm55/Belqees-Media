import { NextRequest, NextResponse } from 'next/server';
import { withErrorHandler } from '@/lib/errors';

export const POST = withErrorHandler(async (request: NextRequest) => {
    return NextResponse.json({
        success: false,
        message: 'Upload features are disabled in static mode',
    }, { status: 403 });
});
