import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function checkConnection() {
  try {
    console.log('🔍 فحص الاتصال بقاعدة البيانات...\n');

    // 1. التحقق من الاتصال
    console.log('1️⃣ التحقق من الاتصال...');
    await prisma.$connect();
    console.log('✅ الاتصال نجح!\n');

    // 2. التحقق من الجداول
    console.log('2️⃣ التحقق من الجداول...');

    // محاولة قراءة من كل جدول
    const tables = {
      users: async () => await prisma.user.count(),
      pages: async () => await prisma.page.count(),
      services: async () => await prisma.service.count(),
      portfolio: async () => await prisma.portfolio.count(),
      events: async () => await prisma.event.count(),
      blogPosts: async () => await prisma.blogPost.count(),
      categories: async () => await prisma.category.count(),
      tags: async () => await prisma.tag.count(),
      media: async () => await prisma.media.count(),
      translations: async () => await prisma.translation.count(),
      contactMessages: async () => await prisma.contactMessage.count(),
    };

    const results: Record<string, number> = {};

    for (const [tableName, countFn] of Object.entries(tables)) {
      try {
        const count = await countFn();
        results[tableName] = count;
        console.log(`   ✅ ${tableName}: ${count} سجل`);
      } catch (error: any) {
        if (error.message?.includes('does not exist')) {
          console.log(`   ⚠️  ${tableName}: الجدول غير موجود (يحتاج Migration)`);
        } else {
          console.log(`   ❌ ${tableName}: خطأ - ${error.message}`);
        }
      }
    }


    // 3. معلومات قاعدة البيانات
    console.log('\n3️⃣ معلومات قاعدة البيانات...');
    const dbInfo = await prisma.$queryRaw`SELECT version() as version`;


  } catch (error: any) {
    console.error('\n❌ خطأ في الاتصال بقاعدة البيانات:');
    console.error('   الرسالة:', error.message);

    if (error.message?.includes('P1001')) {
      console.error('\n💡 الحلول المقترحة:');
      console.error('   1. تأكد من أن DATABASE_URL صحيح في .env.local');
      console.error('   2. تأكد من أن Supabase Project يعمل');
      console.error('   3. تأكد من أن كلمة المرور صحيحة');
      console.error('   4. تأكد من أن Firewall يسمح بالاتصال');
    } else if (error.message?.includes('does not exist')) {
      console.error('\n💡 يبدو أن الجداول غير موجودة. قم بتشغيل:');
      console.error('   npm run db:migrate');
    }

    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

checkConnection();

