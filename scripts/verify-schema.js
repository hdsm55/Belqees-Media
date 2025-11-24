require('./load-env');
const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

// الجداول المتوقعة من Schema
const expectedTables = [
  { model: 'User', table: 'users' },
  { model: 'Page', table: 'pages' },
  { model: 'Service', table: 'services' },
  { model: 'Portfolio', table: 'portfolio' },
  { model: 'Event', table: 'events' },
  { model: 'BlogPost', table: 'blog_posts' },
  { model: 'Category', table: 'categories' },
  { model: 'Tag', table: 'tags' },
  { model: 'Media', table: 'media' },
  { model: 'Translation', table: 'translations' },
  { model: 'ContactMessage', table: 'contact_messages' },
];

async function verifySchema() {
  try {
    console.log('🔍 التحقق من تطابق قاعدة البيانات مع Schema...\n');

    // قراءة Schema
    const schemaPath = path.join(__dirname, '..', 'prisma', 'schema.prisma');
    const schemaContent = fs.readFileSync(schemaPath, 'utf-8');

    console.log('1️⃣ التحقق من الاتصال...');
    await prisma.$connect();
    console.log('✅ الاتصال نجح\n');

    console.log('2️⃣ التحقق من الجداول...\n');

    const results = {
      found: [],
      missing: [],
      errors: [],
    };

    for (const { model, table } of expectedTables) {
      try {
        // محاولة الوصول إلى الجدول - Prisma يستخدم camelCase للأسماء
        const modelName = model.charAt(0).toLowerCase() + model.slice(1);
        const count = await prisma[modelName].count();
        results.found.push({ model, table, count });
        console.log(`   ✅ ${model} (${table}): ${count} سجل`);
      } catch (error) {
        if (error.message?.includes('does not exist') || error.message?.includes('Unknown table') || error.message?.includes('not found')) {
          results.missing.push({ model, table });
          console.log(`   ❌ ${model} (${table}): الجدول غير موجود`);
        } else {
          results.errors.push({ model, table, error: error.message });
          console.log(`   ⚠️  ${model} (${table}): خطأ - ${error.message}`);
        }
      }
    }

    console.log('\n📊 ملخص التحقق:');
    console.log(`   ✅ الجداول الموجودة: ${results.found.length}/${expectedTables.length}`);
    console.log(`   ❌ الجداول المفقودة: ${results.missing.length}`);
    console.log(`   ⚠️  الأخطاء: ${results.errors.length}`);

    if (results.missing.length > 0) {
      console.log('\n❌ بعض الجداول مفقودة!');
      console.log('💡 قم بتشغيل: npm run db:reset');
      process.exit(1);
    }

    if (results.errors.length > 0) {
      console.log('\n⚠️  بعض الأخطاء موجودة!');
      console.log('💡 قم بتشغيل: npm run db:reset');
      process.exit(1);
    }

    console.log('\n✅ جميع الجداول موجودة وتتطابق مع Schema!');
    console.log('\n📋 الجداول الموجودة:');
    results.found.forEach(({ model, table, count }) => {
      console.log(`   - ${model} (${table}): ${count} سجل`);
    });

  } catch (error) {
    console.error('\n❌ خطأ في التحقق:');
    console.error(error.message);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

verifySchema();

