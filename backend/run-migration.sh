#!/bin/bash

# Script لتشغيل Prisma Migration
# استخدم: bash run-migration.sh

echo "🚀 بدء تشغيل Migration..."

# التحقق من وجود ملف .env
if [ ! -f .env ]; then
    echo "❌ ملف .env غير موجود!"
    echo "📝 قم بنسخ env.example إلى .env وتعديله:"
    echo "   cp env.example .env"
    exit 1
fi

# تشغيل Migration
echo "📦 تشغيل Prisma Migration..."
npx prisma migrate dev --name init

if [ $? -eq 0 ]; then
    echo "✅ Migration تم بنجاح!"
    echo ""
    echo "💡 يمكنك الآن:"
    echo "   - تشغيل Backend: npm run dev"
    echo "   - فتح Prisma Studio: npm run db:studio"
else
    echo "❌ فشل Migration. تحقق من:"
    echo "   1. تشغيل PostgreSQL"
    echo "   2. صحة معلومات DATABASE_URL في .env"
    echo "   3. وجود قاعدة البيانات belqees_media"
fi

