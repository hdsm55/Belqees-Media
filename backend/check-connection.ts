import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function checkConnection() {
  try {
    console.log('🔍 التحقق من الاتصال بقاعدة البيانات...\n');

    // محاولة الاتصال
    await prisma.$connect();
    console.log('✅ الاتصال بقاعدة البيانات نجح!\n');

    // التحقق من الجداول
    const tables = await prisma.$queryRaw`
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public'
    `;

    console.log('📊 الجداول الموجودة:');
    if (Array.isArray(tables) && tables.length > 0) {
      console.log(tables);
      console.log('\n');

      // اختبار بسيط فقط إذا كانت الجداول موجودة
      try {
        const userCount = await prisma.user.count();
        console.log(`👥 عدد المستخدمين: ${userCount}`);
      } catch (error) {
        console.log('⚠️  الجداول غير موجودة بعد');
      }

      console.log('\n✅ كل شيء يعمل بشكل صحيح!');
    } else {
      console.log('⚠️  لا توجد جداول في قاعدة البيانات');
      console.log('\n💡 يجب تشغيل Migration لإنشاء الجداول:');
      console.log('   npm run db:migrate');
      console.log('   أو');
      console.log('   npx prisma migrate dev --name init');
    }

  } catch (error) {
    console.error('❌ خطأ في الاتصال بقاعدة البيانات:');
    console.error(error);
    console.log('\n💡 تحقق من:');
    console.log('   1. صحة DATABASE_URL في ملف .env');
    console.log('   2. أن Supabase يعمل');
    console.log('   3. أن الاتصال بالإنترنت متاح');
  } finally {
    await prisma.$disconnect();
  }
}

checkConnection();

