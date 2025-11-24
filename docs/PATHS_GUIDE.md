# دليل المسارات - Belqees Media

## 📁 المسارات المهمة

### 1. ملف البيئة (.env.local)

**المسار:** في **الجذر** مباشرة

```
belqees-media/
├── .env.local          ← هنا (في الجذر)
├── env.example         ← ملف المثال
├── package.json
└── ...
```

**كيفية الإنشاء:**
```bash
# من الجذر
cp env.example .env.local
```

---

### 2. ملفات قاعدة البيانات

#### Prisma Schema:
**المسار:** `prisma/schema.prisma`

```
belqees-media/
└── prisma/
    └── schema.prisma   ← هنا
```

#### Prisma Migrations:
**المسار:** `prisma/migrations/` (سيتم إنشاؤها تلقائياً)

```
belqees-media/
└── prisma/
    └── migrations/    ← هنا (بعد npm run db:migrate)
        └── ...
```

---

### 3. ملفات Supabase

#### Client (للمتصفح):
**المسار:** `lib/supabase/client.ts`

#### Server (للخادم):
**المسار:** `lib/supabase/server.ts`

```
belqees-media/
└── lib/
    └── supabase/
        ├── client.ts   ← للمتصفح
        └── server.ts   ← للخادم
```

---

### 4. ملفات المشروع الرئيسية

```
belqees-media/                    ← الجذر (هنا تعمل npm run dev)
├── .env.local                    ← ملف البيئة (هنا)
├── package.json                  ← Dependencies (هنا)
├── next.config.js                ← إعدادات Next.js (هنا)
├── tsconfig.json                 ← إعدادات TypeScript (هنا)
│
├── app/                          ← Next.js App Router
│   ├── layout.tsx               ← Root Layout
│   ├── page.tsx                 ← Root Page
│   ├── (main)/                  ← Main Routes
│   │   ├── layout.tsx
│   │   ├── page.tsx             ← Home Page
│   │   ├── about/
│   │   └── contact/
│   └── api/                     ← API Routes
│
├── components/                   ← React Components
├── lib/                          ← Utilities
├── prisma/                       ← Database Schema
└── docs/                         ← التوثيق
```

---

## 🎯 المسارات المهمة للعمل اليومي

### 1. تشغيل المشروع:
```bash
# من الجذر
cd "E:\Downloads\قناة بلقيس\Belqees Media (web)\Belqees-Media"
npm run dev
```

### 2. ملف البيئة:
```
E:\Downloads\قناة بلقيس\Belqees Media (web)\Belqees-Media\.env.local
```

### 3. Prisma Schema:
```
E:\Downloads\قناة بلقيس\Belqees Media (web)\Belqees-Media\prisma\schema.prisma
```

### 4. الصفحة الرئيسية:
```
E:\Downloads\قناة بلقيس\Belqees Media (web)\Belqees-Media\app\(main)\page.tsx
```

---

## 📝 ملاحظات مهمة

### ✅ صحيح:
- `.env.local` في **الجذر**
- `npm run dev` من **الجذر**
- جميع الأوامر من **الجذر**

### ❌ خطأ:
- `.env.local` في `app/`
- `npm run dev` من `app/`
- العمل من `app/` بدلاً من الجذر

---

## 🔍 كيفية التحقق من المسار

### في Terminal:
```bash
# عرض المسار الحالي
pwd

# يجب أن يكون:
# E:\Downloads\قناة بلقيس\Belqees Media (web)\Belqees-Media
```

### في PowerShell:
```powershell
# عرض المسار الحالي
Get-Location

# يجب أن يكون:
# E:\Downloads\قناة بلقيس\Belqees Media (web)\Belqees-Media
```

---

## 📚 المسارات في ملف .env.local

عند إعداد `.env.local`، المسارات المهمة:

```env
# Supabase URL (من Supabase Dashboard)
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co

# Database URL (من Supabase Dashboard → Settings → Database)
DATABASE_URL=postgresql://postgres:PASSWORD@db.xxxxx.supabase.co:5432/postgres?schema=public
```

---

**جميع المسارات من الجذر!** ✅

