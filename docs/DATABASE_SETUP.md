# إعداد قاعدة البيانات - Belqees Media

## 📊 نوع قاعدة البيانات

المشروع يستخدم **PostgreSQL** من **Supabase**.

### لماذا Supabase؟
- ✅ قاعدة بيانات PostgreSQL كاملة
- ✅ واجهة إدارة سهلة
- ✅ مجاني للبدء
- ✅ متكامل مع Next.js
- ✅ Authentication مدمج
- ✅ Storage للملفات

---

## 🚀 خطوات الحصول على قاعدة البيانات

### الخطوة 1: إنشاء حساب Supabase

1. اذهب إلى [Supabase.com](https://supabase.com)
2. اضغط على **"Start your project"** أو **"Sign Up"**
3. سجل بحساب GitHub أو Email

### الخطوة 2: إنشاء مشروع جديد

1. بعد تسجيل الدخول، اضغط على **"New Project"**
2. املأ المعلومات:
   - **Name**: Belqees Media (أو أي اسم)
   - **Database Password**: اختر كلمة مرور قوية (احفظها!)
   - **Region**: اختر أقرب منطقة (مثلاً: Middle East)
3. اضغط على **"Create new project"**
4. انتظر حتى يكتمل الإعداد (2-3 دقائق)

### الخطوة 3: الحصول على معلومات الاتصال

بعد إنشاء المشروع:

#### أ) معلومات API:

1. اذهب إلى **Settings** (⚙️) في القائمة الجانبية
2. اختر **API**
3. ستجد:
   - **Project URL**: مثل `https://xxxxx.supabase.co`
   - **anon public** key: مفتاح طويل
   - **service_role** key: مفتاح طويل (احفظه سراً!)

#### ب) معلومات قاعدة البيانات:

1. اذهب إلى **Settings** → **Database**
2. ابحث عن **Connection string**
3. اختر **URI** أو **Connection pooling**
4. ستجد رابط مثل:
   ```
   postgresql://postgres:[YOUR-PASSWORD]@db.xxxxx.supabase.co:5432/postgres
   ```

---

## 📝 إعداد ملف .env.local

### 1. نسخ ملف المثال:

```bash
cp env.example .env.local
```

### 2. فتح ملف `.env.local` وإضافة المعلومات:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Database (من Supabase)
DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@db.xxxxx.supabase.co:5432/postgres?schema=public

# Next.js
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Optional: File Upload
NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET=media
```

### 3. استبدال القيم:

- `xxxxx` → معرف مشروعك من Supabase
- `YOUR_PASSWORD` → كلمة المرور التي اخترتها عند إنشاء المشروع
- `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` → المفاتيح الحقيقية من Supabase

---

## 🔧 إعداد قاعدة البيانات في المشروع

### 1. توليد Prisma Client:

```bash
npm run db:generate
```

### 2. تشغيل Migrations (إنشاء الجداول):

```bash
npm run db:migrate
```

هذا الأمر سينشئ جميع الجداول المطلوبة في قاعدة البيانات.

---

## 📊 الجداول التي سيتم إنشاؤها

بعد تشغيل `npm run db:migrate`، سيتم إنشاء:

- ✅ `users` - المستخدمون
- ✅ `pages` - الصفحات
- ✅ `services` - الخدمات
- ✅ `portfolio` - الأعمال
- ✅ `events` - الفعاليات
- ✅ `blog_posts` - المدونة
- ✅ `categories` - التصنيفات
- ✅ `tags` - الوسوم
- ✅ `media` - الملفات
- ✅ `translations` - الترجمات
- ✅ `contact_messages` - رسائل التواصل

---

## ✅ التحقق من الإعداد

### 1. فتح Prisma Studio (واجهة إدارة قاعدة البيانات):

```bash
npm run db:studio
```

سيتم فتح متصفح على `http://localhost:5555` حيث يمكنك:
- عرض الجداول
- إضافة/تعديل/حذف البيانات
- استكشاف العلاقات

### 2. اختبار الاتصال:

```bash
# Health Check
curl http://localhost:3000/api/health
```

---

## 🔐 الأمان

### ⚠️ مهم جداً:

1. **لا تشارك** ملف `.env.local` في Git
2. **لا تشارك** `SUPABASE_SERVICE_ROLE_KEY` مع أحد
3. **احفظ** كلمة مرور قاعدة البيانات في مكان آمن

---

## 📚 موارد إضافية

- [Supabase Documentation](https://supabase.com/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)

---

## 🆘 حل المشاكل

### خطأ: Can't reach database server

**الحل:**
1. تأكد من أن Supabase Project يعمل
2. تأكد من `DATABASE_URL` صحيح
3. تأكد من كلمة المرور صحيحة

### خطأ: Invalid connection string

**الحل:**
- تأكد من أن `DATABASE_URL` يبدأ بـ `postgresql://`
- تأكد من استبدال `[YOUR-PASSWORD]` بكلمة المرور الحقيقية

### خطأ: Migration failed

**الحل:**
- تأكد من أن قاعدة البيانات فارغة (أو احذف الجداول القديمة)
- تأكد من أن `DATABASE_URL` صحيح

---

**جاهز!** 🚀

بعد إعداد قاعدة البيانات، يمكنك البدء في استخدام المشروع.

