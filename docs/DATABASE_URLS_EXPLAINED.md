# 🔗 شرح روابط قاعدة البيانات - Belqees Media

## 📊 الفرق بين الرابطين

المشروع يستخدم **رابطين مختلفين** لقاعدة البيانات، كل واحد له استخدام مختلف:

---

## 1️⃣ NEXT_PUBLIC_SUPABASE_URL + NEXT_PUBLIC_SUPABASE_ANON_KEY

### 📍 من أين؟
- **المصدر**: Supabase Dashboard → **Settings** → **API**
- **Project URL**: `https://megkmakosbklvknhplcg.supabase.co`
- **anon public key**: المفتاح الطويل الذي يبدأ بـ `eyJhbGc...`

### 🎯 الاستخدام
هذا الرابط يستخدم للوصول إلى **Supabase API** (ليس قاعدة البيانات مباشرة):

#### أ) في Client Components (المتصفح)
```typescript
// lib/supabase/client.ts
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,  // ← هنا
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY  // ← هنا
);
```

**الاستخدامات:**
- ✅ Authentication (تسجيل الدخول/الخروج)
- ✅ Real-time Subscriptions
- ✅ Storage (رفع الملفات)
- ✅ Row Level Security (RLS) - الأمان على مستوى الصفوف

#### ب) في Server Components
```typescript
// lib/supabase/server.ts
import { createServerClient } from '@supabase/ssr';

const supabase = createServerClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,  // ← هنا
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY  // ← هنا
);
```

**الاستخدامات:**
- ✅ Server-side Authentication
- ✅ Session Management
- ✅ Protected Routes

### 🔒 الأمان
- **`NEXT_PUBLIC_`** - يعني أن هذه القيم **مرئية في المتصفح**
- **Anon Key** - آمن للاستخدام في Client (يحتوي على Row Level Security)
- **لا يمكن استخدامه** للوصول المباشر إلى قاعدة البيانات

---

## 2️⃣ DATABASE_URL

### 📍 من أين؟
- **المصدر**: Supabase Dashboard → **Settings** → **Database**
- **Connection string**: `postgresql://postgres:[PASSWORD]@db.xxxxx.supabase.co:5432/postgres`

### 🎯 الاستخدام
هذا الرابط يستخدم للوصول **المباشر** إلى قاعدة البيانات PostgreSQL:

```typescript
// lib/prisma.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,  // ← هنا
    },
  },
});
```

**الاستخدامات:**
- ✅ Prisma ORM - للوصول إلى قاعدة البيانات
- ✅ Database Migrations
- ✅ Direct SQL Queries (إذا لزم الأمر)
- ✅ Database Schema Management

### 🔒 الأمان
- **ليس `NEXT_PUBLIC_`** - يعني أن هذه القيمة **مخفية** (Server-only)
- **يحتوي على كلمة المرور** - حساس جداً!
- **لا تشاركه أبداً** - موجود في `.gitignore`

---

## 📊 جدول المقارنة

| الميزة | NEXT_PUBLIC_SUPABASE_URL | DATABASE_URL |
|--------|-------------------------|--------------|
| **المصدر** | Settings → API | Settings → Database |
| **النوع** | Supabase API URL | PostgreSQL Connection String |
| **الاستخدام** | Supabase Client/Server | Prisma ORM |
| **الظهور** | مرئي في Client | Server-only |
| **الأمان** | Anon Key (آمن) | يحتوي على Password |
| **الوظيفة** | Authentication, Storage, RLS | Database Queries, Migrations |

---

## 🎯 متى تستخدم كل واحد؟

### استخدم `NEXT_PUBLIC_SUPABASE_URL` عندما:
- ✅ تريد تسجيل الدخول/الخروج
- ✅ تريد رفع ملفات
- ✅ تريد Real-time Updates
- ✅ تريد استخدام Row Level Security
- ✅ تريد الوصول من Client Components

### استخدم `DATABASE_URL` عندما:
- ✅ تريد قراءة/كتابة البيانات مباشرة
- ✅ تريد استخدام Prisma ORM
- ✅ تريد تشغيل Migrations
- ✅ تريد عمليات معقدة على قاعدة البيانات
- ✅ تريد الوصول من Server Components فقط

---

## 📝 مثال عملي

### مثال 1: تسجيل الدخول (يستخدم Supabase URL)
```typescript
// Client Component
'use client';
import { supabase } from '@/lib/supabase/client';

async function login(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  // يستخدم NEXT_PUBLIC_SUPABASE_URL + ANON_KEY
}
```

### مثال 2: قراءة البيانات (يستخدم DATABASE_URL)
```typescript
// Server Component
import { prisma } from '@/lib/prisma';

async function getPages() {
  const pages = await prisma.page.findMany();
  // يستخدم DATABASE_URL
  return pages;
}
```

---

## 🔍 أين تجد كل رابط في Supabase؟

### 1. NEXT_PUBLIC_SUPABASE_URL + ANON_KEY
```
Supabase Dashboard
└── Settings
    └── API
        ├── Project URL ← NEXT_PUBLIC_SUPABASE_URL
        └── Project API keys
            └── anon public ← NEXT_PUBLIC_SUPABASE_ANON_KEY
```

### 2. DATABASE_URL
```
Supabase Dashboard
└── Settings
    └── Database
        └── Connection string ← DATABASE_URL
            └── Connection pooling (اختر "Session" mode)
```

---

## ⚠️ ملاحظات مهمة

1. **لا تخلط بينهما**:
   - `NEXT_PUBLIC_SUPABASE_URL` → للـ Supabase API
   - `DATABASE_URL` → للـ PostgreSQL مباشرة

2. **الأمان**:
   - `NEXT_PUBLIC_SUPABASE_URL` + `ANON_KEY` → آمن في Client
   - `DATABASE_URL` → **مخفي** في Server فقط

3. **الاستخدام**:
   - Supabase URL → Authentication, Storage, Real-time
   - DATABASE_URL → Database Queries, Migrations

---

## ✅ الخلاصة

- **`NEXT_PUBLIC_SUPABASE_URL`**: للوصول إلى Supabase API (Authentication, Storage)
- **`DATABASE_URL`**: للوصول المباشر إلى PostgreSQL (Prisma, Migrations)

**كلاهما ضروري** للمشروع! 🚀

