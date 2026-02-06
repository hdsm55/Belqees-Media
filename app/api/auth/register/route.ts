import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { z } from 'zod';
import { rateLimit } from '@/lib/rate-limit';
import { withErrorHandler } from '@/lib/errors';

const registerSchema = z.object({
    email: z.string().email('البريد الإلكتروني غير صحيح'),
    password: z.string().min(6, 'كلمة المرور يجب أن تكون 6 أحرف على الأقل'),
    name: z.string().min(2, 'الاسم يجب أن يكون حرفين على الأقل').optional(),
});

export const POST = withErrorHandler(async (request: NextRequest) => {
    // Rate limiting
    const { response: rateLimitResponse } = await rateLimit(request);
    if (rateLimitResponse) return rateLimitResponse;

    const body = await request.json();
    const { email, password, name } = registerSchema.parse(body);

    const supabase = await createClient();

    // إنشاء حساب في Supabase
    const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                name: name || email.split('@')[0],
                role: 'VIEWER',
            },
        },
    });

    if (authError || !authData.user) {
        throw new Error(authError?.message || 'حدث خطأ أثناء إنشاء الحساب');
    }

    return NextResponse.json({
        success: true,
        data: {
            user: {
                id: authData.user.id,
                email: authData.user.email,
                role: 'VIEWER',
            },
        },
        message: 'تم إنشاء الحساب بنجاح',
    }, { status: 201 });
});
