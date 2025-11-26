# 🔧 خطوات إصلاح مشكلة الاتصال

## المشكلة الحالية
```
Can't reach database server at `db.xymwwvdgfhmegzupcteo.supabase.co:5432`
```

## ✅ الحل الأفضل: استخدام Session Pooler

### الخطوة 1: الحصول على Connection String الصحيح

1. اذهب إلى [Supabase Dashboard](https://app.supabase.com)
2. اختر مشروعك
3. اذهب إلى **Settings** → **Database**
4. في قسم **Connection string**:
   - اختر **"Session pooler"** (ليس Direct connection)
   - اختر **"URI"** في Type
   - انسخ الرابط

### الخطوة 2: الرابط يجب أن يبدو هكذا:

```
postgresql://postgres.xymwwvdgfhmegzupcteo:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres?pgbouncer=true
```

**ملاحظات:**
- يحتوي على `pooler` في العنوان
- المنفذ هو `6543` (ليس 5432)
- يحتوي على `pgbouncer=true`

### الخطوة 3: تحديث .env.local

افتح ملف `.env.local` واستبدل `DATABASE_URL` بالرابط الجديد:

```env
DATABASE_URL=postgresql://postgres.xymwwvdgfhmegzupcteo:[YOUR-PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres?pgbouncer=true&sslmode=require
```

**مهم:** استبدل:
- `[YOUR-PASSWORD]` → كلمة مرور قاعدة البيانات
- `[REGION]` → المنطقة (مثل: `me-south-1` أو `eu-west-1`)

### الخطوة 4: اختبار الاتصال

```bash
npm run db:check
```

---

## 🔄 حلول بديلة

### إذا لم يعمل Session Pooler:

#### الحل البديل 1: Direct Connection مع SSL

```env
DATABASE_URL=postgresql://postgres:[PASSWORD]@db.xymwwvdgfhmegzupcteo.supabase.co:5432/postgres?schema=public&sslmode=require
```

#### الحل البديل 2: Transaction Pooler

من Supabase Dashboard:
- اختر **"Transaction pooler"**
- انسخ الرابط
- استخدمه في `.env.local`

---

## ⚠️ مشاكل شائعة

### 1. المشروع Paused
- اذهب إلى Supabase Dashboard
- إذا كان المشروع paused، اضغط **"Resume"**

### 2. كلمة المرور خاطئة
- اذهب إلى Settings → Database
- اضغط **"Reset database password"**
- انسخ كلمة المرور الجديدة

### 3. Firewall
- تأكد من أن Firewall يسمح بالاتصال
- جرب من شبكة أخرى

---

## ✅ بعد الإصلاح

بعد تحديث `DATABASE_URL`:

1. احفظ الملف
2. جرب:
   ```bash
   npm run db:check
   ```

يجب أن ترى:
```
✅ الاتصال نجح!
```

---

**الخلاصة:** استخدم **Session Pooler** من Supabase Dashboard - هذا هو الحل الأفضل! 🚀

