# 🔧 إصلاح مشكلة الاتصال بقاعدة البيانات

## المشكلة
```
Can't reach database server at `db.xymwwvdgfhmegzupcteo.supabase.co:5432`
```

## الحلول الممكنة

### الحل 1: استخدام Session Pooler (الأكثر شيوعاً)

Supabase عادة يطلب استخدام **Session pooler** بدلاً من Direct connection.

1. اذهب إلى Supabase Dashboard → Settings → Database
2. اختر **"Connection string"** → **"Session pooler"**
3. انسخ الرابط الجديد (يجب أن يحتوي على `pooler` في العنوان)
4. استبدل `DATABASE_URL` في `.env.local`

**مثال:**
```env
DATABASE_URL=postgresql://postgres.[PROJECT-REF]:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres?pgbouncer=true
```

### الحل 2: إضافة SSL

أضف `&sslmode=require` في نهاية DATABASE_URL:

```env
DATABASE_URL=postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres?schema=public&sslmode=require
```

### الحل 3: التحقق من Supabase Project

1. اذهب إلى [Supabase Dashboard](https://app.supabase.com)
2. تأكد من أن المشروع **نشط** (ليس paused)
3. إذا كان paused، اضغط على **"Resume"** أو **"Restore"**

### الحل 4: التحقق من كلمة المرور

1. اذهب إلى Supabase Dashboard → Settings → Database
2. اضغط على **"Reset database password"**
3. انسخ كلمة المرور الجديدة
4. استبدلها في `DATABASE_URL`

### الحل 5: استخدام IPv4

إذا رأيت تحذير "Not IP" في Supabase:
1. اضغط على زر **"IPv4"**
2. انسخ Connection String الجديد
3. استبدله في `.env.local`

---

## 🔍 التحقق من DATABASE_URL الحالي

افتح `.env.local` وتحقق من أن `DATABASE_URL` يبدو هكذا:

**لـ Direct Connection:**
```env
DATABASE_URL=postgresql://postgres:[PASSWORD]@db.xymwwvdgfhmegzupcteo.supabase.co:5432/postgres?schema=public&sslmode=require
```

**لـ Session Pooler (الموصى به):**
```env
DATABASE_URL=postgresql://postgres.xymwwvdgfhmegzupcteo:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres?pgbouncer=true&sslmode=require
```

---

## ✅ بعد التعديل

1. احفظ ملف `.env.local`
2. جرب مرة أخرى:
   ```bash
   npm run db:check
   ```

---

## 💡 نصيحة

**استخدم Session Pooler** - هذا هو الخيار الأفضل لمعظم الحالات وهو ما يوصي به Supabase.

