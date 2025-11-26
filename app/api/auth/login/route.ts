import { NextRequest, NextResponse } from 'next/server';
import { createRouteClient } from '@/lib/supabase/route-client';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';
import { rateLimit } from '@/lib/rate-limit';
import { withErrorHandler, InvalidCredentialsError } from '@/lib/errors';

const loginSchema = z.object({
    email: z.string().email('البريد الإلكتروني غير صحيح'),
    password: z.string().min(6, 'كلمة المرور يجب أن تكون 6 أحرف على الأقل'),
});

export const POST = withErrorHandler(async (request: NextRequest) => {
    // Rate limiting (خاص بتسجيل الدخول - 5 requests/minute)
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

    // ملاحظة: مع createRouteClient، Supabase سيقوم بضبط الكوكيز عبر setAll تلقائيًا
    // ولا حاجة لاستدعاء setSession يدويًا هنا.

    // البحث عن المستخدم في قاعدة البيانات أو إنشاؤه
    let user = await prisma.user.findUnique({
        where: { supabaseUserId: authData.user.id },
    });

    if (!user) {
        // إنشاء مستخدم جديد في قاعدة البيانات
        user = await prisma.user.create({
            data: {
                email: authData.user.email!,
                supabaseUserId: authData.user.id,
                role: 'VIEWER', // الدور الافتراضي
            },
        });
    }

    const response = NextResponse.json({
        success: true,
        data: {
            user: {
                id: user.id,
                email: user.email,
                role: user.role,
            },
            session: authData.session,
        },
    });

    // دمج الكوكيز التي عيّنها Supabase في الرد النهائي
    return withSupabaseCookies(response);
});

