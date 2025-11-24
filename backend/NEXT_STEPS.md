# الخطوات التالية - Belqees Media Backend

## ✅ الحالة الحالية

- ✅ الاتصال بقاعدة البيانات Supabase يعمل بشكل صحيح
- ⚠️  الجداول غير موجودة بعد (هذا طبيعي)

## 🚀 الخطوة التالية: تشغيل Migration

الآن يجب إنشاء الجداول في قاعدة البيانات باستخدام Prisma Migration.

### الطريقة 1: استخدام npm script (مستحسن)

من مجلد `backend` في Git Bash:

```bash
npm run db:migrate
```

### الطريقة 2: استخدام npx مباشرة

```bash
npx prisma migrate dev --name init
```

### ماذا سيحدث؟

1. Prisma سيقوم بإنشاء ملف Migration
2. سيتم إنشاء جميع الجداول في قاعدة البيانات:
   - `users` - المستخدمون
   - `pages` - الصفحات
   - `services` - الخدمات
   - `portfolio` - الأعمال
   - `events` - الفعاليات
   - `blog_posts` - المقالات
   - `categories` - التصنيفات
   - `tags` - الوسوم
   - `media` - الملفات
   - `translations` - الترجمات
   - `contact_messages` - رسائل التواصل

3. سيتم إنشاء مجلد `prisma/migrations` مع ملفات Migration

### بعد Migration

بعد نجاح Migration، يمكنك:

1. **التحقق مرة أخرى:**
   ```bash
   npm run db:check
   ```
   يجب أن ترى الجداول الآن!

2. **فتح Prisma Studio** (لإدارة قاعدة البيانات):
   ```bash
   npm run db:studio
   ```
   سيفتح المتصفح على http://localhost:5555

3. **تشغيل Backend:**
   ```bash
   npm run dev
   ```

---

## 🔍 التحقق من النجاح

بعد Migration، عند تشغيل `npm run db:check` يجب أن ترى:

```
✅ الاتصال بقاعدة البيانات نجح!
📊 الجداول الموجودة:
[ { table_name: 'users' }, { table_name: 'pages' }, ... ]
👥 عدد المستخدمين: 0
✅ كل شيء يعمل بشكل صحيح!
```

---

## ❌ حل المشاكل

### مشكلة: "Migration failed"

**الحل**:
1. تأكد من أن قاعدة البيانات فارغة (لا توجد جداول)
2. تحقق من صحة Prisma Schema
3. حاول مرة أخرى

### مشكلة: "Schema already exists"

**الحل**:
- إذا كانت هناك جداول موجودة، يمكنك:
  - حذفها من Supabase Dashboard
  - أو استخدام `prisma migrate reset` (سيحذف جميع البيانات!)

---

## 📝 ملاحظات

- Migration سينشئ ملفات في `prisma/migrations/` - لا تحذفها!
- يمكنك رؤية جميع الجداول في Supabase Dashboard → Table Editor
- للبيئة الإنتاجية، استخدم `prisma migrate deploy` بدلاً من `migrate dev`

---

**جاهز؟** قم بتشغيل `npm run db:migrate` الآن! 🚀

