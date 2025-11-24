@echo off
REM Script لتشغيل Prisma Migration على Windows
REM استخدم: run-migration.bat

echo 🚀 بدء تشغيل Migration...

REM التحقق من وجود ملف .env
if not exist .env (
    echo ❌ ملف .env غير موجود!
    echo 📝 قم بنسخ env.example إلى .env وتعديله:
    echo    copy env.example .env
    pause
    exit /b 1
)

REM تشغيل Migration
echo 📦 تشغيل Prisma Migration...
call npx prisma migrate dev --name init

if %errorlevel% equ 0 (
    echo ✅ Migration تم بنجاح!
    echo.
    echo 💡 يمكنك الآن:
    echo    - تشغيل Backend: npm run dev
    echo    - فتح Prisma Studio: npm run db:studio
) else (
    echo ❌ فشل Migration. تحقق من:
    echo    1. تشغيل PostgreSQL
    echo    2. صحة معلومات DATABASE_URL في .env
    echo    3. وجود قاعدة البيانات belqees_media
)

pause

