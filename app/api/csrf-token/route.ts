/**
 * CSRF Token API Endpoint
 * API endpoint للحصول على CSRF token
 */

import { NextRequest, NextResponse } from 'next/server';
import { getCSRFToken } from '@/lib/csrf/token';
import { rateLimit } from '@/lib/rate-limit';
import { withErrorHandler } from '@/lib/errors';

// Force dynamic rendering (uses cookies)
export const dynamic = 'force-dynamic';

export const GET = withErrorHandler(async (request: NextRequest) => {
  // Rate limiting
  const { response: rateLimitResponse } = await rateLimit(request);
  if (rateLimitResponse) return rateLimitResponse;

  try {
    const token = await getCSRFToken();

    return NextResponse.json({
      success: true,
      token,
    });
  } catch (error) {
    console.error('Error generating CSRF token:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to generate CSRF token',
      },
      { status: 500 }
    );
  }
});

