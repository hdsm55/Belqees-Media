# 🔑 كيفية الحصول على مفاتيح Supabase

## 📍 الخطوات التفصيلية

### 1. اذهب إلى Supabase Dashboard
- افتح [app.supabase.com](https://app.supabase.com)
- سجل الدخول
- اختر مشروعك

### 2. الحصول على Project URL و Anon Key

1. **من القائمة الجانبية**، اضغط على **Settings** (الإعدادات)
2. **من القائمة الفرعية**، اضغط على **API**

### 3. في صفحة API ستجد:

#### أ) Project URL
- في قسم **Project URL**
- ستجد رابط مثل: `https://megkmakosbklvknhplcg.supabase.co`
- **انسخ هذا الرابط** → هذا هو `NEXT_PUBLIC_SUPABASE_URL`

#### ب) Anon Public Key
- في قسم **Project API keys**
- ابحث عن **`anon` `public`** key
- المفتاح يبدأ بـ `eyJhbGc...` وطويل جداً
- **انسخ المفتاح الكامل** → هذا هو `NEXT_PUBLIC_SUPABASE_ANON_KEY`

---

## 📝 مثال من الصورة التي أرسلتها

حسب الصورة، القيم هي:

```env
NEXT_PUBLIC_SUPABASE_URL=https://megkmakosbklvknhplcg.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1lZ2ttYWtvc2JrbHZrbmhwbGNnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM5NjIzNzYsImV4cCI6MjA3OTUzODM3Nn0.TGa2uwPTDhD80uYSNYWALRl7axLo-fAX0LxtGTAi1c8
```

---

## ✅ بعد الحصول على القيم

1. **افتح ملف `.env.local`** في الجذر
2. **استبدل** `your-supabase-project-url` بـ Project URL
3. **استبدل** `your-supabase-anon-key` بـ Anon Key
4. **احفظ الملف**
5. **أعد تشغيل** `npm run dev`

---

## 🎯 الموقع في Supabase Dashboard

```
Supabase Dashboard
└── Settings (الإعدادات)
    └── API
        ├── Project URL ← NEXT_PUBLIC_SUPABASE_URL
        └── Project API keys
            └── anon public ← NEXT_PUBLIC_SUPABASE_ANON_KEY
```

---

**جاهز!** 🚀

