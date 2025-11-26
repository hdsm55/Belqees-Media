import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';
import { rateLimit } from '@/lib/rate-limit';
import { withErrorHandler, EmailAlreadyExistsError } from '@/lib/errors';

const registerSchema = z.object({
    email: z.string().email('البريد الإلكتروني غير صحيح'),
    password: z.string().min(6, 'كلمة المرور يجب أن تكون 6 أحرف على الأقل'),
    name: z.string().min(2, 'الاسم يجب أن يكون حرفين على الأقل').optional(),
});

export const POST = withErrorHandler(async (request: NextRequest) => {
    // Rate limiting (خاص بالتسجيل - 5 requests/minute)
    const { response: rateLimitResponse } = await rateLimit(request);
    if (rateLimitResponse) return rateLimitResponse;

    const body = await request.json();
    const { email, password, name } = registerSchema.parse(body);

    const supabase = await createClient();

    // التحقق من وجود المستخدم
    const existingUser = await prisma.user.findUnique({
        where: { email },
    });

    if (existingUser) {
        throw new EmailAlreadyExistsError();
    }

    // إنشاء حساب في Supabase
    const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                name: name || email.split('@')[0],
            },
        },
    });

    if (authError || !authData.user) {
        throw new Error(authError?.message || 'حدث خطأ أثناء إنشاء الحساب');
    }

    // إنشاء مستخدم في قاعدة البيانات
    let user;
    try {
        // محاولة إنشاء المستخدم مع supabaseUserId
        user = await prisma.user.create({
            data: {
                email: authData.user.email!,
                supabaseUserId: authData.user.id,
                role: 'VIEWER', // الدور الافتراضي
            },
        });
    } catch (error: any) {
        // إذا كان العمود supabaseUserId غير موجود، أنشئ المستخدم بدونه
        if (
            error.message?.includes('supabaseUserId') ||
            error.message?.includes('Unknown column') ||
            error.message?.includes('does not exist') ||
            error.code === 'P2003' ||
            (error instanceof Error && error.message.includes('supabaseUserId'))
        ) {
            // إنشاء المستخدم بدون supabaseUserId (سيتم إضافته لاحقاً)
            user = await prisma.user.create({
                data: {
                    email: authData.user.email!,
                    role: 'VIEWER', // الدور الافتراضي
                },
            });
            // ملاحظة: بعد إضافة العمود، يمكن تحديث المستخدم لاحقاً
        } else {
            throw error;
        }
    }

    return NextResponse.json({
        success: true,
        data: {
            user: {
                id: user.id,
                email: user.email,
                role: user.role,
            },
        },
        message: 'تم إنشاء الحساب بنجاح',
    }, { status: 201 });
});

