import { NextRequest, NextResponse } from 'next/server';
import { rateLimit } from '@/lib/rate-limit';
import { withErrorHandler } from '@/lib/errors';

// Force dynamic rendering (uses request.url)
export const dynamic = 'force-dynamic';

export const GET = withErrorHandler(async (request: NextRequest) => {
  // Rate limiting (معدل أعلى للـ health check)
  const { response: rateLimitResponse } = await rateLimit(request);
  if (rateLimitResponse) return rateLimitResponse;

  return NextResponse.json({
    success: true,
    data: {
      status: 'ok',
      timestamp: new Date().toISOString(),
      service: 'Belqees Media API',
    },
  });
});
