import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const registerSchema = z.object({
    email: z.string().email('البريد الإلكتروني غير صحيح'),
    password: z.string().min(6, 'كلمة المرور يجب أن تكون 6 أحرف على الأقل'),
    name: z.string().min(2, 'الاسم يجب أن يكون حرفين على الأقل').optional(),
});

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { email, password, name } = registerSchema.parse(body);

        const supabase = await createClient();

        // التحقق من وجود المستخدم
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return NextResponse.json(
                { error: 'البريد الإلكتروني مستخدم بالفعل' },
                { status: 400 }
            );
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
            return NextResponse.json(
                { error: authError?.message || 'حدث خطأ أثناء إنشاء الحساب' },
                { status: 400 }
            );
        }

        // إنشاء مستخدم في قاعدة البيانات
        const user = await prisma.user.create({
            data: {
                email: authData.user.email!,
                supabaseUserId: authData.user.id,
                role: 'VIEWER', // الدور الافتراضي
            },
        });

        return NextResponse.json({
            user: {
                id: user.id,
                email: user.email,
                role: user.role,
            },
            message: 'تم إنشاء الحساب بنجاح',
        }, { status: 201 });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { error: error.errors[0].message },
                { status: 400 }
            );
        }

        console.error('Register error:', error);
        return NextResponse.json(
            { error: 'حدث خطأ أثناء إنشاء الحساب' },
            { status: 500 }
        );
    }
}

