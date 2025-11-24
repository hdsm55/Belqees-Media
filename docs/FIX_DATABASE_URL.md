# 🔧 إصلاح خطأ الاتصال بقاعدة البيانات

## ❌ الخطأ

```
Can't reach database server at `host:5432`
Please make sure your database server is running at `host:5432`.
```

## 🔍 السبب

هذا الخطأ يعني أن `DATABASE_URL` في `.env.local` إما:
- غير موجود
- غير صحيح
- يحتوي على قيم placeholder (مثل `host`, `password`)

---

## ✅ الحل

### الخطوة 1: التحقق من `.env.local`

افتح ملف `.env.local` في الجذر وتأكد من وجود:

```env
DATABASE_URL=postgresql://postgres:[YOUR-PASSWORD]@db.xxxxx.supabase.co:5432/postgres
```

### الخطوة 2: الحصول على DATABASE_URL الصحيح

1. اذهب إلى [Supabase Dashboard](https://app.supabase.com)
2. اختر مشروعك
3. اذهب إلى **Settings** → **Database**
4. في قسم **Connection string**، اختر **Session mode**
5. انسخ **Connection string**
6. استبدل `[YOUR-PASSWORD]` بكلمة مرور قاعدة البيانات

### الخطوة 3: مثال على DATABASE_URL الصحيح

```env
DATABASE_URL=postgresql://postgres.megkmakosbklvknhplcg:Alialialj.55.66@aws-1-ap-south-1.pooler.supabase.com:5432/postgres
```

**ملاحظة**: استخدم **Connection Pooling** (pooler) وليس Direct connection.

---

## 📋 التحقق من .env.local

تأكد من أن ملف `.env.local` يحتوي على:

```env
# Database (من Settings → Database في Supabase)
DATABASE_URL=postgresql://postgres:[PASSWORD]@db.xxxxx.supabase.co:5432/postgres

# Supabase (من Settings → API في Supabase)
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
```

---

## 🔍 التحقق من الاتصال

بعد إصلاح `DATABASE_URL`، جرب:

```bash
npm run db:verify
```

إذا نجح الأمر = الاتصال صحيح ✅

---

## ⚠️ ملاحظات مهمة

1. **استخدم Connection Pooling**: في Supabase، اختر **Session mode** من Connection Pooling
2. **لا تستخدم Direct connection**: قد لا يعمل في بعض الحالات
3. **تأكد من كلمة المرور**: يجب أن تكون كلمة مرور قاعدة البيانات الصحيحة

---

**جاهز!** 🚀

