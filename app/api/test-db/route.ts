import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    // اختبار الاتصال
    await prisma.$connect();

    // اختبار استعلام بسيط
    const result = await prisma.$queryRaw`SELECT 1 as test`;

    // التحقق من الجداول
    const tables = await prisma.$queryRaw`
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public'
      ORDER BY table_name
    `;

    // التحقق من جدول users
    let userCount = 0;
    let hasSupabaseUserId = false;

    try {
      userCount = await prisma.user.count();
      const testUser = await prisma.user.findFirst({
        select: { supabaseUserId: true }
      });
      hasSupabaseUserId = true;
    } catch (error: any) {
      if (error.message?.includes('supabaseUserId')) {
        hasSupabaseUserId = false;
      }
    }

    await prisma.$disconnect();

    return NextResponse.json({
      success: true,
      message: 'الاتصال بقاعدة البيانات نجح!',
      data: {
        connection: '✅ متصل',
        query: '✅ يعمل',
        tables: (tables as any[]).map(t => t.table_name),
        users: {
          count: userCount,
          hasSupabaseUserId,
        },
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: 'فشل الاتصال بقاعدة البيانات',
        error: error.message,
        details: {
          code: error.code,
          meta: error.meta,
        },
      },
      { status: 500 }
    );
  }
}

