# دليل الإعداد الكامل - Belqees Media

## 📋 المتطلبات الأساسية

- Node.js >= 18.0.0
- npm >= 9.0.0
- حساب Supabase

## 🚀 خطوات الإعداد

### 1. تثبيت Dependencies

```bash
npm install
```

### 2. إعداد Supabase

1. أنشئ مشروع جديد في [Supabase](https://app.supabase.com)
2. احصل على معلومات المشروع (راجع [ENV_SETUP.md](./ENV_SETUP.md))

### 3. إعداد ملف البيئة

```bash
cp env.example .env.local
```

قم بتعديل `.env.local` وأضف معلومات Supabase.

### 4. إعداد قاعدة البيانات

```bash
# توليد Prisma Client
npm run db:generate

# تشغيل Migrations
npm run db:migrate
```

### 5. تشغيل المشروع

```bash
npm run dev
```

---

## 📁 هيكل المشروع

```
belqees-media/
├── app/              # Next.js App Router
│   ├── (main)/      # Main Routes
│   ├── api/         # API Routes
│   └── layout.tsx   # Root Layout
├── components/       # React Components
├── lib/             # Utilities
├── prisma/          # Database Schema
└── ...
```

---

## 🛠️ الأوامر المتاحة

- `npm run dev` - تشغيل المشروع
- `npm run build` - بناء المشروع
- `npm run start` - تشغيل بعد البناء
- `npm run db:generate` - توليد Prisma Client
- `npm run db:migrate` - تشغيل Migrations
- `npm run db:studio` - فتح Prisma Studio
- `npm run lint` - فحص الكود

---

**للبدء السريع**: راجع [QUICK_START.md](./QUICK_START.md)

