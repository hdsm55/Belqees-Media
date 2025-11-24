# إعداد ملف البيئة - Belqees Media

> **ملاحظة**: للحصول على معلومات Supabase وكيفية إنشاء قاعدة البيانات، راجع [DATABASE_SETUP.md](./DATABASE_SETUP.md)

## 📝 خطوات إعداد .env.local

### 1. نسخ ملف المثال

```bash
cp env.example .env.local
```

### 2. إضافة معلومات Supabase

افتح ملف `.env.local` وأضف:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here

# Database (من Supabase)
DATABASE_URL=postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres?schema=public

# Next.js
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Optional: File Upload
NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET=media
```

### 3. الحصول على معلومات Supabase

1. اذهب إلى [Supabase Dashboard](https://app.supabase.com)
2. اختر مشروعك
3. اذهب إلى **Settings** → **API**
4. انسخ:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role** key → `SUPABASE_SERVICE_ROLE_KEY`

5. اذهب إلى **Settings** → **Database**
6. انسخ **Connection string** → `DATABASE_URL`
   - استبدل `[YOUR-PASSWORD]` بكلمة مرور قاعدة البيانات
   - استبدل `[YOUR-PROJECT-REF]` بمعرف المشروع

### 4. التحقق من الإعداد

بعد إعداد `.env.local`، قم بتشغيل:

```bash
# توليد Prisma Client
npm run db:generate

# تشغيل Migrations
npm run db:migrate
```

### 5. تشغيل المشروع

```bash
npm run dev
```

---

## ⚠️ ملاحظات مهمة:

1. **لا تشارك ملف `.env.local`** في Git (موجود في `.gitignore`)
2. **DATABASE_URL** يجب أن يحتوي على كلمة المرور الصحيحة
3. تأكد من أن Supabase Project يعمل
4. إذا كان Supabase يطلب SSL، أضف `&sslmode=require` في نهاية DATABASE_URL

---

## 🔍 التحقق من الاتصال

بعد الإعداد، يمكنك التحقق:

```bash
# Health Check
curl http://localhost:3000/api/health

# Prisma Studio (لإدارة قاعدة البيانات)
npm run db:studio
```

---

**جاهز!** 🚀

