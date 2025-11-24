const { PrismaClient } = require('@prisma/client');

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

    const tables = [
      { name: 'users', fn: () => prisma.user.count() },
      { name: 'pages', fn: () => prisma.page.count() },
      { name: 'services', fn: () => prisma.service.count() },
      { name: 'portfolio', fn: () => prisma.portfolio.count() },
      { name: 'events', fn: () => prisma.event.count() },
      { name: 'blogPosts', fn: () => prisma.blogPost.count() },
      { name: 'categories', fn: () => prisma.category.count() },
      { name: 'tags', fn: () => prisma.tag.count() },
      { name: 'media', fn: () => prisma.media.count() },
      { name: 'translations', fn: () => prisma.translation.count() },
      { name: 'contactMessages', fn: () => prisma.contactMessage.count() },
    ];

    const results = {};
    let successCount = 0;
    let totalRecords = 0;

    for (const table of tables) {
      try {
        const count = await table.fn();
        results[table.name] = count;
        totalRecords += count;
        successCount++;
        console.log(`   ✅ ${table.name}: ${count} سجل`);
      } catch (error) {
        if (error.message?.includes('does not exist') || error.message?.includes('Unknown table')) {
          console.log(`   ⚠️  ${table.name}: الجدول غير موجود (يحتاج Migration)`);
        } else {
          console.log(`   ❌ ${table.name}: خطأ - ${error.message}`);
        }
      }
    }

    console.log('\n📊 ملخص:');
    console.log(`   - الجداول المتصلة: ${successCount}/${tables.length}`);
    console.log(`   - إجمالي السجلات: ${totalRecords}`);

    console.log('\n✅ فحص قاعدة البيانات اكتمل بنجاح!');

    if (successCount < tables.length) {
      console.log('\n💡 ملاحظة: بعض الجداول غير موجودة. قم بتشغيل:');
      console.log('   npm run db:migrate');
    }

  } catch (error) {
    console.error('\n❌ خطأ في الاتصال بقاعدة البيانات:');
    console.error('   الرسالة:', error.message);

    if (error.message?.includes('P1001') || error.message?.includes('Can\'t reach database')) {
      console.error('\n💡 الحلول المقترحة:');
      console.error('   1. تأكد من أن DATABASE_URL صحيح في .env.local');
      console.error('   2. تأكد من أن Supabase Project يعمل');
      console.error('   3. تأكد من أن كلمة المرور صحيحة');
      console.error('   4. تأكد من أن Firewall يسمح بالاتصال');
    } else if (error.message?.includes('P1000') || error.message?.includes('Authentication failed')) {
      console.error('\n💡 خطأ في المصادقة:');
      console.error('   1. تأكد من أن كلمة المرور في DATABASE_URL صحيحة');
      console.error('   2. تأكد من أن المستخدم (postgres) موجود');
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

