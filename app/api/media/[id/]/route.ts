import { NextRequest, NextResponse } from 'next/server';
import { withErrorHandler } from '@/lib/errors';

export const DELETE = withErrorHandler(async (request: NextRequest) => {
    return NextResponse.json({
        success: false,
        message: 'Static mode',
    }, { status: 403 });
});

export const GET = withErrorHandler(async (request: NextRequest) => {
    return NextResponse.json({
        success: false,
        message: 'File not found',
    }, { status: 404 });
});
