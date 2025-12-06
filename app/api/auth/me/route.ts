import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth/session';
import { rateLimit } from '@/lib/rate-limit';
import { withErrorHandler, UnauthorizedError } from '@/lib/errors';

// Force dynamic rendering (uses cookies/auth)
export const dynamic = 'force-dynamic';

export const GET = withErrorHandler(async (request: NextRequest) => {
    // Rate limiting
    const { response: rateLimitResponse } = await rateLimit(request);
    if (rateLimitResponse) return rateLimitResponse;

    const user = await getCurrentUser();

    if (!user) {
        throw new UnauthorizedError();
    }

    return NextResponse.json({
        success: true,
        data: { user },
    });
});

