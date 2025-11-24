# 🔑 إعداد متغيرات Supabase في .env.local

## 📋 المتغيرات المطلوبة

حسب إعدادات Supabase لـ Next.js App Router، تحتاج إلى إضافة هذه المتغيرات في ملف `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

---

## 🎯 أين تجد هذه القيم في Supabase؟

### الخطوة 1: اذهب إلى Supabase Dashboard
1. افتح [app.supabase.com](https://app.supabase.com)
2. سجل الدخول إلى حسابك
3. اختر مشروعك

### الخطوة 2: الحصول على Project URL
1. اذهب إلى **Settings** (الإعدادات) في القائمة الجانبية
2. اضغط على **API**
3. في قسم **Project URL**، ستجد رابط مثل:
   ```
   https://xxxxx.supabase.co
   ```
4. **انسخ هذا الرابط** → هذا هو `NEXT_PUBLIC_SUPABASE_URL`

### الخطوة 3: الحصول على Anon Key
1. في نفس صفحة **Settings → API**
2. في قسم **Project API keys**
3. ابحث عن **`anon` `public`** key
4. **انسخ المفتاح** → هذا هو `NEXT_PUBLIC_SUPABASE_ANON_KEY`

---

## 📝 مثال على .env.local

```env
# Supabase (من Settings → API)
NEXT_PUBLIC_SUPABASE_URL=https://megkmakosbklvknhplcg.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1lZ2ttYWtvc2JrbHZrbmhwbGNnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM5NjIzNzYsImV4cCI6MjA3OTUzODM3Nn0.TGa2uwPTDhD80uYSNYWALRl7axLo-fAX0LxtGTAi1c8

# Database (من Settings → Database)
DATABASE_URL=postgresql://postgres:[YOUR-PASSWORD]@db.megkmakosbklvknhplcg.supabase.co:5432/postgres?schema=public

# Service Role Key (اختياري - للعمليات الإدارية)
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here

# Next.js
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## ⚠️ ملاحظات مهمة

1. **لا تشارك ملف `.env.local`** - موجود في `.gitignore`
2. **`NEXT_PUBLIC_`** - هذه البادئة ضرورية لأن Next.js يحتاجها للوصول من Client
3. **Anon Key** - آمن للاستخدام في Client (يحتوي على Row Level Security)
4. **Service Role Key** - **لا تستخدمه في Client** - فقط في Server/API Routes

---

## ✅ التحقق من الإعداد

بعد إضافة المتغيرات:

1. **أعد تشغيل Next.js**:
   ```bash
   # أوقف السيرفر (Ctrl+C)
   npm run dev
   ```

2. **تحقق من Health Check**:
   ```bash
   curl http://localhost:3000/api/health
   ```

3. **تحقق من Console** - لا يجب أن ترى أخطاء Supabase

---

## 🔍 استكشاف الأخطاء

### خطأ: "Missing Supabase environment variables"
- تأكد من أن `.env.local` موجود في الجذر
- تأكد من أن المتغيرات تبدأ بـ `NEXT_PUBLIC_`
- أعد تشغيل Next.js بعد إضافة المتغيرات

### خطأ: "Invalid supabaseUrl"
- تأكد من أن URL يبدأ بـ `https://`
- تأكد من أن URL ينتهي بـ `.supabase.co`
- لا تضيف `/` في النهاية

### خطأ: "Invalid API key"
- تأكد من نسخ المفتاح كاملاً
- تأكد من عدم وجود مسافات إضافية
- استخدم `anon public` key وليس `service_role` key في Client

---

## 📸 دليل بصري

في Supabase Dashboard:

```
Settings → API
├── Project URL: https://xxxxx.supabase.co  ← NEXT_PUBLIC_SUPABASE_URL
└── Project API keys
    ├── anon public: eyJhbGc...  ← NEXT_PUBLIC_SUPABASE_ANON_KEY
    └── service_role: eyJhbGc...  ← SUPABASE_SERVICE_ROLE_KEY (Server only)
```

---

**جاهز!** 🚀

بعد إضافة هذه المتغيرات، سيعمل Supabase بشكل صحيح.

