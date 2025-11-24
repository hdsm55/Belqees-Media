# دليل سريع: قاعدة البيانات - Belqees Media

## 🎯 باختصار

المشروع يحتاج **PostgreSQL** من **Supabase**.

---

## ✅ الخطوات السريعة (5 دقائق)

### 1. إنشاء حساب Supabase
- اذهب إلى [supabase.com](https://supabase.com)
- سجل بحساب GitHub أو Email

### 2. إنشاء مشروع جديد
- اضغط **"New Project"**
- اختر اسم: `Belqees Media`
- اختر كلمة مرور قوية (احفظها!)
- اختر المنطقة: Middle East
- اضغط **"Create"**

### 3. الحصول على المعلومات

#### من Settings → API:
- **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
- **anon public** key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- **service_role** key → `SUPABASE_SERVICE_ROLE_KEY`

#### من Settings → Database:
- **Connection string** → `DATABASE_URL`
- استبدل `[YOUR-PASSWORD]` بكلمة المرور

### 4. إضافة المعلومات في `.env.local`

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@db.xxxxx.supabase.co:5432/postgres?schema=public
```

### 5. تشغيل Migrations

```bash
npm run db:generate
npm run db:migrate
```

---

## 🎉 انتهى!

الآن قاعدة البيانات جاهزة.

---

**للتفاصيل الكاملة**: راجع [DATABASE_SETUP.md](./DATABASE_SETUP.md)

