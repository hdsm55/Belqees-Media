# 📝 دليل إعداد .env.local - Belqees Media

## 🎯 المتغيرات المطلوبة من Supabase

حسب الصورة التي أرسلتها، تحتاج إلى إضافة هذه المتغيرات في ملف `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://megkmakosbklvknhplcg.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1lZ2ttYWtvc2JrbHZrbmhwbGNnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM5NjIzNzYsImV4cCI6MjA3OTUzODM3Nn0.TGa2uwPTDhD80uYSNYWALRl7axLo-fAX0LxtGTAi1c8
```

---

## 📍 أين تجد هذه القيم في Supabase Dashboard؟

### 1. NEXT_PUBLIC_SUPABASE_URL
- اذهب إلى **Settings** → **API**
- في قسم **Project URL**
- انسخ الرابط الكامل (مثل: `https://megkmakosbklvknhplcg.supabase.co`)

### 2. NEXT_PUBLIC_SUPABASE_ANON_KEY
- في نفس صفحة **Settings** → **API**
- في قسم **Project API keys**
- ابحث عن **`anon` `public`** key
- انسخ المفتاح الكامل (يبدأ بـ `eyJhbGc...`)

---

## 📝 ملف .env.local الكامل

افتح ملف `.env.local` في الجذر وأضف:

```env
# Supabase (من Settings → API في Supabase Dashboard)
NEXT_PUBLIC_SUPABASE_URL=https://megkmakosbklvknhplcg.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1lZ2ttYWtvc2JrbHZrbmhwbGNnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM5NjIzNzYsImV4cCI6MjA3OTUzODM3Nn0.TGa2uwPTDhD80uYSNYWALRl7axLo-fAX0LxtGTAi1c8

# Database (من Settings → Database في Supabase Dashboard)
# استبدل [YOUR-PASSWORD] بكلمة مرور قاعدة البيانات
DATABASE_URL=postgresql://postgres:[YOUR-PASSWORD]@db.megkmakosbklvknhplcg.supabase.co:5432/postgres?schema=public

# Service Role Key (اختياري - للعمليات الإدارية)
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here

# Next.js
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Optional: File Upload
NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET=media
```

---

## ⚠️ ملاحظات مهمة

1. **الملف موجود في**: الجذر (نفس مستوى `package.json`)
2. **اسم الملف**: `.env.local` (بالضبط)
3. **لا تشاركه**: الملف موجود في `.gitignore`
4. **أعد التشغيل**: بعد إضافة المتغيرات، أعد تشغيل `npm run dev`

---

## ✅ التحقق

بعد إضافة المتغيرات:

```bash
# أوقف السيرفر (Ctrl+C)
# ثم أعد التشغيل
npm run dev
```

إذا لم تظهر أخطاء Supabase، فالإعداد صحيح! ✅

---

**للتفاصيل الكاملة**: راجع [SUPABASE_ENV_SETUP.md](./SUPABASE_ENV_SETUP.md)

