# 🔧 إصلاح مشكلة قاعدة البيانات

## المشكلة
عند محاولة إنشاء حساب جديد، يظهر الخطأ التالي:
```
The column `users.supabaseUserId` does not exist in the current database.
```

## الحل السريع

قم بتنفيذ الأوامر التالية في Terminal (في مجلد المشروع):

### الطريقة 1: استخدام Prisma DB Push (الأسرع)

```bash
npx prisma db push
npx prisma generate
```

### الطريقة 2: استخدام Migration

```bash
npx prisma migrate dev --name add_supabase_user_id
npx prisma generate
```

### الطريقة 3: استخدام npm scripts

```bash
npm run db:generate
npx prisma db push
```

## شرح الأوامر

- **`prisma db push`**: يطبق التغييرات من `schema.prisma` مباشرة على قاعدة البيانات (أسرع طريقة)
- **`prisma migrate dev`**: ينشئ migration ويطبقها على قاعدة البيانات (أفضل للمشاريع الكبيرة)
- **`prisma generate`**: يعيد توليد Prisma Client مع التغييرات الجديدة

## بعد تنفيذ الأوامر

1. ✅ أعد تشغيل خادم التطوير:
   ```bash
   npm run dev
   ```

2. ✅ جرب إنشاء حساب جديد مرة أخرى من:
   ```
   http://localhost:3000/register
   ```

## التحقق من الإصلاح

بعد تنفيذ الأوامر، يمكنك التحقق من أن العمود تم إضافته:

```bash
npx prisma studio
```

ثم افتح جدول `users` وتحقق من وجود عمود `supabaseUserId`.

## ملاحظات مهمة

- ⚠️ إذا كنت تستخدم Supabase، تأكد من أن `DATABASE_URL` في `.env.local` صحيح
- ⚠️ تأكد من أن قاعدة البيانات متصلة وتعمل
- ⚠️ إذا كان لديك بيانات مهمة، احفظها قبل تنفيذ الأوامر

---

**إذا استمرت المشكلة**: تحقق من ملف `.env.local` وتأكد من أن `DATABASE_URL` صحيح.

