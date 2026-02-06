import { NextRequest, NextResponse } from 'next/server';
import { createRouteClient } from '@/lib/supabase/route-client';
import { z } from 'zod';
import { rateLimit } from '@/lib/rate-limit';
import { withErrorHandler, InvalidCredentialsError } from '@/lib/errors';

const loginSchema = z.object({
    email: z.string().email('البريد الإلكتروني غير صحيح'),
    password: z.string().min(6, 'كلمة المرور يجب أن تكون 6 أحرف على الأقل'),
});

export const POST = withErrorHandler(async (request: NextRequest) => {
    // Rate limiting
    const { response: rateLimitResponse } = await rateLimit(request);
    if (rateLimitResponse) return rateLimitResponse;

    const body = await request.json();
    const { email, password } = loginSchema.parse(body);

    const { supabase, withSupabaseCookies } = createRouteClient(request);

    // تسجيل الدخول في Supabase
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (authError || !authData.user) {
        throw new InvalidCredentialsError();
    }

    const response = NextResponse.json({
        success: true,
        data: {
            user: {
                id: authData.user.id,
                email: authData.user.email,
                role: (authData.user.app_metadata?.role as any) || 'VIEWER',
            },
            session: authData.session,
        },
    });

    // دمج الكوكيز التي عيّنها Supabase في الرد النهائي
    return withSupabaseCookies(response);
});
