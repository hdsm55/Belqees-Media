# دليل تشغيل Migrations

بعد إعداد ملف `.env` بشكل صحيح، قم بتشغيل الأوامر التالية:

## الخطوات:

### 1. التأكد من ملف .env

تأكد من أن ملف `.env` في مجلد `backend` يحتوي على:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/belqees_media?schema=public"
```

**ملاحظة**: استبدل:
- `username` باسم مستخدم PostgreSQL الخاص بك
- `password` بكلمة مرور PostgreSQL
- `localhost:5432` بعنوان و port قاعدة البيانات (إذا كان مختلفاً)
- `belqees_media` باسم قاعدة البيانات (يجب أن تكون موجودة مسبقاً)

### 2. إنشاء قاعدة البيانات (إذا لم تكن موجودة)

افتح PostgreSQL و قم بتشغيل:

```sql
CREATE DATABASE belqees_media;
```

### 3. تشغيل Migration

من مجلد `backend`، قم بتشغيل:

```bash
npm run db:migrate
```

أو مباشرة:

```bash
npx prisma migrate dev --name init
```

### 4. التحقق من النجاح

إذا نجح الأمر، سترى رسالة مثل:

```
✔ Migration applied successfully
```

### 5. (اختياري) فتح Prisma Studio

لإدارة قاعدة البيانات بشكل مرئي:

```bash
npm run db:studio
```

سيفتح المتصفح على http://localhost:5555

---

## حل المشاكل

### خطأ: "Can't reach database server"

**الحل**: تأكد من:
1. تشغيل PostgreSQL
2. صحة معلومات الاتصال في `.env`
3. إمكانية الوصول إلى قاعدة البيانات

### خطأ: "Database does not exist"

**الحل**: قم بإنشاء قاعدة البيانات أولاً:

```sql
CREATE DATABASE belqees_media;
```

### خطأ: "Migration failed"

**الحل**:
1. تحقق من صحة Prisma Schema
2. تأكد من أن قاعدة البيانات فارغة (أو احذف الجداول الموجودة)
3. حاول مرة أخرى

---

**ملاحظة**: إذا كنت تستخدم Git Bash أو Terminal آخر، قد تحتاج إلى استخدام مسار مختلف.

