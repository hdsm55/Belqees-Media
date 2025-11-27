# 🔧 إصلاح مشكلة الاتصال بقاعدة البيانات

## المشكلة الحالية
```
Can't reach database server at `db.megkmakosbklvknhplcg.supabase.co:5432`
```

## ✅ الحل: استخدام Session Pooler

Supabase عادة يطلب استخدام **Session Pooler** بدلاً من Direct Connection.

### الخطوة 1: الحصول على Connection String الصحيح

1. اذهب إلى [Supabase Dashboard](https://app.supabase.com)
2. اختر مشروعك (`megkmakosbklvknhplcg`)
3. اذهب إلى **Settings** → **Database**
4. في قسم **Connection string**:
   - اختر **"Session pooler"** (ليس Direct connection)
   - اختر **"URI"** في Type
   - انسخ الرابط

### الخطوة 2: الرابط يجب أن يبدو هكذا:

```
postgresql://postgres.megkmakosbklvknhplcg:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres?pgbouncer=true
```

**ملاحظات مهمة:**
- ✅ يحتوي على `pooler` في العنوان (ليس `db`)
- ✅ المنفذ هو `6543` (ليس 5432)
- ✅ يحتوي على `pgbouncer=true`
- ✅ يبدأ بـ `postgres.megkmakosbklvknhplcg` (مع نقطة بعد postgres)

### الخطوة 3: تحديث .env.local

افتح ملف `.env.local` واستبدل `DATABASE_URL` بالرابط الجديد:

```env
DATABASE_URL=postgresql://postgres.megkmakosbklvknhplcg:[YOUR-PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres?pgbouncer=true&sslmode=require
```

**مهم:** استبدل:
- `[YOUR-PASSWORD]` → كلمة مرور قاعدة البيانات
- `[REGION]` → المنطقة (مثل: `me-south-1` أو `eu-west-1`)

### الخطوة 4: مثال كامل

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://megkmakosbklvknhplcg.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here

# Database (Session Pooler)
DATABASE_URL=postgresql://postgres.megkmakosbklvknhplcg:YourPassword123@aws-0-me-south-1.pooler.supabase.com:6543/postgres?pgbouncer=true&sslmode=require

# Next.js
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### الخطوة 5: اختبار الاتصال

بعد تحديث `.env.local`:

1. احفظ الملف
2. أعد تشغيل الخادم:
   ```bash
   npm run dev
   ```
3. افتح في المتصفح:
   ```
   http://localhost:3000/api/test-db
   ```

يجب أن ترى:
```json
{
  "success": true,
  "message": "الاتصال بقاعدة البيانات نجح!",
  ...
}
```

---

## 🔄 حلول بديلة

### إذا لم يعمل Session Pooler:

#### الحل البديل 1: Direct Connection مع SSL

```env
DATABASE_URL=postgresql://postgres:[PASSWORD]@db.megkmakosbklvknhplcg.supabase.co:5432/postgres?schema=public&sslmode=require
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

### 4. المنطقة (Region)
- تأكد من أن `[REGION]` في الرابط صحيح
- يمكنك العثور عليه في Supabase Dashboard → Settings → General

---

## ✅ بعد الإصلاح

بعد تحديث `DATABASE_URL` مع Session Pooler:

1. ✅ احفظ الملف
2. ✅ أعد تشغيل الخادم
3. ✅ جرب `http://localhost:3000/api/test-db`
4. ✅ إذا نجح، شغل: `npx prisma db push`

---

**الخلاصة:** استخدم **Session Pooler** من Supabase Dashboard - هذا هو الحل الأفضل! 🚀

