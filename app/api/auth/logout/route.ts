import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST() {
    try {
        const supabase = await createClient();
        const { error } = await supabase.auth.signOut();

        if (error) {
            return NextResponse.json(
                { error: 'حدث خطأ أثناء تسجيل الخروج' },
                { status: 500 }
            );
        }

        return NextResponse.json({ message: 'تم تسجيل الخروج بنجاح' });
    } catch (error) {
        console.error('Logout error:', error);
        return NextResponse.json(
            { error: 'حدث خطأ أثناء تسجيل الخروج' },
            { status: 500 }
        );
    }
}

