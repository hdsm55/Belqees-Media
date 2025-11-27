# إصلاح مشكلة قاعدة البيانات

## المشكلة
العمود `supabaseUserId` غير موجود في جدول `users` في قاعدة البيانات.

## الحل

قم بتنفيذ الأوامر التالية في Terminal:

```bash
# 1. الانتقال إلى مجلد المشروع
cd "E:\Downloads\قناة بلقيس\Belqees Media (web)\Belqees-Media"

# 2. تطبيق التغييرات على قاعدة البيانات
npx prisma db push

# 3. إعادة توليد Prisma Client
npx prisma generate
```

أو يمكنك استخدام الأوامر من package.json:

```bash
npm run db:generate
npx prisma db push
```

## شرح الأوامر

- `prisma db push`: يطبق التغييرات من schema.prisma مباشرة على قاعدة البيانات (بدون إنشاء migration)
- `prisma generate`: يعيد توليد Prisma Client مع التغييرات الجديدة

## بعد تنفيذ الأوامر

1. أعد تشغيل خادم التطوير (`npm run dev`)
2. جرب إنشاء حساب جديد مرة أخرى

