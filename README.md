# Belqees Media - منصة رقمية متكاملة

منصة رقمية حديثة ومتطورة لموقع بلقيس ميديا، مبنية على **Next.js 14** مع App Router و Supabase.

## 🏗️ البنية المعمارية

المشروع مبني على **Next.js 14** كمنصة متكاملة:

- **Next.js App Router**: Frontend + Backend في مكان واحد
- **React Server Components**: للأداء العالي والـ SEO
- **Supabase**: قاعدة البيانات والمصادقة
- **Prisma**: ORM للوصول للبيانات
- **Tailwind CSS**: للتصميم
- **Framer Motion + GSAP**: للحركات السينمائية

## 🚀 البدء السريع

### المتطلبات الأساسية

- Node.js >= 18.0.0
- npm >= 9.0.0
- حساب Supabase

### التثبيت

```bash
# تثبيت جميع dependencies
npm install

# إعداد ملف البيئة
cp env.example .env.local
# قم بتعديل .env.local وإضافة معلومات Supabase

# إعداد قاعدة البيانات
npm run db:generate
npm run db:migrate

# تشغيل المشروع في وضع التطوير
npm run dev
```

### الوصول إلى المشروع

- **Next.js App**: http://localhost:3000
- **API Routes**: http://localhost:3000/api

## 📁 هيكل المشروع

```
belqees-media/
├── app/              # Next.js App Router (Pages & API Routes)
├── components/        # React Components
├── lib/              # Utilities & Configs
├── locales/          # Translations (AR, EN, TR)
├── prisma/           # Database Schema
├── types/            # TypeScript Types
└── utils/            # Helper Functions
```

## 🛠️ التقنيات المستخدمة

### Next.js Stack
- **Next.js 14** مع App Router
- **React 18+** (TypeScript)
- **React Server Components** (RSC)
- **Tailwind CSS 3+**
- **Framer Motion** + **GSAP** + **Lenis**
- **Prisma ORM**
- **Supabase** (Database + Auth + Storage)

### الميزات
- Server-Side Rendering (SSR)
- Static Site Generation (SSG)
- Incremental Static Regeneration (ISR)
- API Routes مدمجة
- SEO Optimized
- Multi-language Support (AR, EN, TR)

## 📝 الميزات

- ✅ Modular Architecture (بنية معمارية مرنة)
- ✅ Component-Based Design (تصميم قائم على المكونات)
- ✅ Server Components (مكونات الخادم)
- ✅ Multi-language Support (دعم متعدد اللغات: عربي، إنجليزي، تركي)
- ✅ Cinematic Animations (حركات سينمائية احترافية)
- ✅ Responsive Design (تصميم متجاوب)
- ✅ SEO Optimized (محسّن لمحركات البحث)

## 🔐 الأمان

- Supabase Authentication
- Role-Based Access Control (RBAC)
- Input Validation (Zod)
- Rate Limiting
- XSS Protection

## 📚 التوثيق

جميع ملفات التوثيق موجودة في مجلد [docs/](./docs/):

- [QUICK_START.md](./docs/QUICK_START.md) - دليل البدء السريع
- [ENV_SETUP.md](./docs/ENV_SETUP.md) - دليل إعداد ملف البيئة
- [NEXTJS_SETUP.md](./docs/NEXTJS_SETUP.md) - دليل الإعداد الكامل
- [PRD_NEXTJS.md](./docs/PRD_NEXTJS.md) - وثيقة متطلبات المشروع
- [PROJECT_STATUS.md](./docs/PROJECT_STATUS.md) - حالة المشروع

## 🤝 المساهمة

يرجى قراءة [docs/PRD_NEXTJS.md](./docs/PRD_NEXTJS.md) لفهم البنية المعمارية والمبادئ المتبعة قبل البدء في التطوير.

## 📄 الترخيص

هذا المشروع خاص بموقع بلقيس ميديا.

---

**تم البناء بواسطة**: فريق تطوير بلقيس ميديا
**التاريخ**: 2024
# Belqees-Media
# Belqees-Media
