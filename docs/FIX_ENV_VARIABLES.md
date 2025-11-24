# 🔧 إصلاح مشكلة متغيرات البيئة

## ❌ المشكلة

عند تشغيل `npm run db:reset` أو `npm run db:verify`، قد تظهر رسالة خطأ:

```
Error: Environment variable not found: DATABASE_URL.
```

## ✅ الحل

تم إصلاح السكريبتات لتحميل `.env.local` تلقائياً باستخدام `dotenv`.

### الخطوات:

1. **تأكد من وجود `.env.local`** في الجذر:
   ```bash
   # يجب أن يحتوي على:
   DATABASE_URL=postgresql://...
   NEXT_PUBLIC_SUPABASE_URL=https://...
   NEXT_PUBLIC_SUPABASE_ANON_KEY=...
   ```

2. **تأكد من تثبيت `dotenv`**:
   ```bash
   npm install -D dotenv
   ```

3. **أعد المحاولة**:
   ```bash
   npm run db:reset
   ```

---

## 🔍 التحقق من .env.local

تأكد من أن ملف `.env.local` موجود ويحتوي على:

```env
# Database
DATABASE_URL=postgresql://postgres:[PASSWORD]@db.xxxxx.supabase.co:5432/postgres

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
```

---

## ✅ بعد الإصلاح

السكريبتات الآن تحمل `.env.local` تلقائياً، لذا يجب أن تعمل بدون مشاكل.

---

**جاهز!** 🚀

