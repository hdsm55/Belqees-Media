import { NextRequest, NextResponse } from 'next/server';
import { eventService } from '@/lib/services/event.service';
import { withErrorHandler } from '@/lib/errors';

export const GET = withErrorHandler(async (
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  const { id } = await params;
  const event = await eventService.getEventById(id);

  return NextResponse.json({
    success: true,
    data: event,
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
