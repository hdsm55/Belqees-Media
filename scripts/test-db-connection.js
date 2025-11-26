/**
 * Script للتحقق من الاتصال بقاعدة البيانات
 * Usage: node scripts/test-db-connection.js
 */

require('dotenv').config({ path: '.env.local' });

async function testConnection() {
  console.log('🔍 التحقق من الاتصال بقاعدة البيانات...\n');

  // 1. التحقق من وجود DATABASE_URL
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    console.error('❌ خطأ: DATABASE_URL غير موجود في .env.local');
    console.log('\n📝 يرجى إضافة السطر التالي إلى ملف .env.local:');
    console.log('DATABASE_URL=postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres?schema=public\n');
    process.exit(1);
  }

  console.log('✅ DATABASE_URL موجود');

  // إخفاء كلمة المرور في العرض
  const maskedUrl = databaseUrl.replace(/:[^:@]+@/, ':****@');
  console.log(`📍 Connection String: ${maskedUrl}\n`);

  // 2. محاولة الاتصال باستخدام Prisma
  try {
    console.log('🔄 محاولة الاتصال بقاعدة البيانات...');

    const { PrismaClient } = require('@prisma/client');
    const prisma = new PrismaClient();

    // اختبار بسيط
    await prisma.$connect();
    console.log('✅ الاتصال نجح!\n');

    // محاولة استعلام بسيط
    console.log('🔄 اختبار استعلام بسيط...');
    const result = await prisma.$queryRaw`SELECT 1 as test`;
    console.log('✅ الاستعلام نجح!\n');

    // التحقق من الجداول
    console.log('🔄 التحقق من الجداول...');
    const tables = await prisma.$queryRaw`
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public'
      ORDER BY table_name
    `;

    console.log(`✅ تم العثور على ${tables.length} جدول:`);
    tables.forEach((table, index) => {
      console.log(`   ${index + 1}. ${table.table_name}`);
    });

    // التحقق من جدول users
    console.log('\n🔄 التحقق من جدول users...');
    const userCount = await prisma.user.count();
    console.log(`✅ جدول users موجود ويحتوي على ${userCount} مستخدم\n`);

    // التحقق من عمود supabaseUserId
    console.log('🔄 التحقق من عمود supabaseUserId...');
    try {
      const testUser = await prisma.user.findFirst({
        select: { id: true, email: true, supabaseUserId: true }
      });
      console.log('✅ عمود supabaseUserId موجود!\n');
    } catch (error) {
      if (error.message.includes('supabaseUserId')) {
        console.log('❌ عمود supabaseUserId غير موجود في قاعدة البيانات');
        console.log('📝 يجب تشغيل: npx prisma db push\n');
      } else {
        throw error;
      }
    }

    await prisma.$disconnect();
    console.log('✅ تم إغلاق الاتصال بنجاح\n');
    console.log('🎉 كل شيء يعمل بشكل صحيح!\n');

  } catch (error) {
    console.error('\n❌ خطأ في الاتصال:\n');
    console.error(error.message);

    if (error.message.includes('P1001')) {
      console.log('\n💡 الحل: تحقق من:');
      console.log('   1. أن DATABASE_URL صحيح');
      console.log('   2. أن كلمة المرور صحيحة');
      console.log('   3. أن Supabase Project يعمل');
    } else if (error.message.includes('P1000')) {
      console.log('\n💡 الحل: تحقق من:');
      console.log('   1. أن قاعدة البيانات موجودة');
      console.log('   2. أن الصلاحيات صحيحة');
    } else if (error.message.includes('supabaseUserId')) {
      console.log('\n💡 الحل:');
      console.log('   يجب تشغيل: npx prisma db push');
    } else {
      console.log('\n💡 تحقق من:');
      console.log('   1. أن Prisma Client محدث: npx prisma generate');
      console.log('   2. أن Schema صحيح: prisma/schema.prisma');
    }

    process.exit(1);
  }
}

// تشغيل الاختبار
testConnection().catch((error) => {
  console.error('خطأ غير متوقع:', error);
  process.exit(1);
});

