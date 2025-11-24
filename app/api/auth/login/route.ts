import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const loginSchema = z.object({
    email: z.string().email('البريد الإلكتروني غير صحيح'),
    password: z.string().min(6, 'كلمة المرور يجب أن تكون 6 أحرف على الأقل'),
});

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { email, password } = loginSchema.parse(body);

        const supabase = await createClient();

        // تسجيل الدخول في Supabase
        const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (authError || !authData.user) {
            return NextResponse.json(
                { error: 'البريد الإلكتروني أو كلمة المرور غير صحيحة' },
                { status: 401 }
            );
        }

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

        return NextResponse.json({
            user: {
                id: user.id,
                email: user.email,
                role: user.role,
            },
            session: authData.session,
        });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { error: error.errors[0].message },
                { status: 400 }
            );
        }

        console.error('Login error:', error);
        return NextResponse.json(
            { error: 'حدث خطأ أثناء تسجيل الدخول' },
            { status: 500 }
        );
    }
}

