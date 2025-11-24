require('./load-env');
const { execSync } = require('child_process');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log('⚠️  تحذير: هذا السكريبت سيقوم بـ:');
console.log('   1. حذف جميع الجداول من قاعدة البيانات');
console.log('   2. حذف جميع البيانات');
console.log('   3. إعادة إنشاء الجداول من Schema الحالي');
console.log('   4. تشغيل جميع Migrations من جديد\n');

rl.question('هل أنت متأكد أنك تريد المتابعة؟ (اكتب "نعم" للمتابعة): ', (answer) => {
  if (answer.trim().toLowerCase() !== 'نعم' && answer.trim().toLowerCase() !== 'yes') {
    console.log('❌ تم الإلغاء.');
    rl.close();
    process.exit(0);
  }

  console.log('\n🔄 بدء إعادة تعيين قاعدة البيانات...\n');

  try {
    // 1. توليد Prisma Client
    console.log('1️⃣ توليد Prisma Client...');
    execSync('npx prisma generate', { stdio: 'inherit' });
    console.log('✅ تم توليد Prisma Client\n');

    // 2. إعادة تعيين قاعدة البيانات
    console.log('2️⃣ إعادة تعيين قاعدة البيانات (حذف وإعادة إنشاء)...');
    execSync('npx prisma migrate reset --force', { stdio: 'inherit' });
    console.log('✅ تم إعادة تعيين قاعدة البيانات\n');

    // 3. التحقق من الجداول
    console.log('3️⃣ التحقق من الجداول...');
    execSync('npx prisma db pull', { stdio: 'inherit' });
    console.log('✅ تم التحقق من الجداول\n');

    console.log('✅ تم إعادة تعيين قاعدة البيانات بنجاح!');
    console.log('\n📊 الجداول المتوقعة:');
    console.log('   - users (المستخدمين)');
    console.log('   - pages (الصفحات)');
    console.log('   - services (الخدمات)');
    console.log('   - portfolio (الأعمال)');
    console.log('   - events (الفعاليات)');
    console.log('   - blog_posts (المدونات)');
    console.log('   - categories (الفئات)');
    console.log('   - tags (الوسوم)');
    console.log('   - media (الملفات)');
    console.log('   - translations (الترجمات)');
    console.log('   - contact_messages (الرسائل)');
    console.log('\n💡 يمكنك الآن فتح Prisma Studio للتحقق:');
    console.log('   npm run db:studio');

  } catch (error) {
    console.error('\n❌ خطأ في إعادة تعيين قاعدة البيانات:');
    console.error(error.message);
    process.exit(1);
  }

  rl.close();
});

