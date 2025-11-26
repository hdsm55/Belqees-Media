# 📝 قالب ملف .env.local

## المتغيرات المطلوبة

يجب أن يحتوي ملف `.env.local` على:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://megkmakosbklvknhplcg.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here

# Database (Session Pooler - الموصى به)
DATABASE_URL=postgresql://postgres.megkmakosbklvknhplcg:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres?pgbouncer=true&sslmode=require

# Next.js
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Optional: File Upload
NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET=media
```

## 🔍 التحقق من DATABASE_URL

### ✅ صحيح (Session Pooler):
```env
DATABASE_URL=postgresql://postgres.megkmakosbklvknhplcg:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres?pgbouncer=true&sslmode=require
```

**المميزات:**
- ✅ يحتوي على `pooler` في العنوان
- ✅ المنفذ `6543`
- ✅ يحتوي على `pgbouncer=true`
- ✅ يبدأ بـ `postgres.megkmakosbklvknhplcg` (مع نقطة)

### ❌ خاطئ (Direct Connection):
```env
DATABASE_URL=postgresql://postgres:[PASSWORD]@db.megkmakosbklvknhplcg.supabase.co:5432/postgres?schema=public
```

**المشاكل:**
- ❌ لا يحتوي على `pooler`
- ❌ المنفذ `5432` (قد لا يعمل)
- ❌ يبدأ بـ `postgres:` (بدون نقطة)

## 🔧 كيفية الحصول على DATABASE_URL الصحيح

1. اذهب إلى [Supabase Dashboard](https://app.supabase.com)
2. اختر مشروعك (`megkmakosbklvknhplcg`)
3. اذهب إلى **Settings** → **Database**
4. في قسم **Connection string**:
   - اختر **"Session pooler"** (ليس Direct connection)
   - اختر **"URI"** في Type
   - انسخ الرابط
5. استبدل `[PASSWORD]` بكلمة مرور قاعدة البيانات
6. استبدل `[REGION]` بالمنطقة (مثل: `me-south-1`)

## ✅ بعد التحديث

1. احفظ ملف `.env.local`
2. أعد تشغيل الخادم:
   ```bash
   npm run dev
   ```
3. جرب:
   ```
   http://localhost:3000/api/test-db
   ```

---

**أرسل محتوى `.env.local` (أو على الأقل سطر DATABASE_URL) لأتحقق منه!** 🔍

