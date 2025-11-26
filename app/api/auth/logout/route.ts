import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { rateLimit } from '@/lib/rate-limit';
import { withErrorHandler } from '@/lib/errors';

export const POST = withErrorHandler(async (request: NextRequest) => {
    // Rate limiting
    const { response: rateLimitResponse } = await rateLimit(request);
    if (rateLimitResponse) return rateLimitResponse;

    const supabase = await createClient();
    const { error } = await supabase.auth.signOut();

    if (error) {
        throw new Error('حدث خطأ أثناء تسجيل الخروج');
    }

    return NextResponse.json({
        success: true,
        message: 'تم تسجيل الخروج بنجاح',
    });
});

