# Belqees Media - منصة رقمية متكاملة

منصة رقمية حديثة ومتطورة لموقع بلقيس ميديا، مبنية على منهجية Modular Architecture تجعل التخصيص والتطوير والتحديث المستقبلي سهلاً جداً.

## 🏗️ البنية المعمارية

المشروع يتكون من ثلاثة أجزاء رئيسية:

- **Frontend**: واجهة المستخدم المبنية على React + TypeScript + Tailwind CSS
- **Backend**: API Headless مبني على Node.js + Express + Prisma
- **Dashboard**: لوحة تحكم CMS مخصصة لإدارة المحتوى

## 🚀 البدء السريع

### المتطلبات الأساسية

- Node.js >= 18.0.0
- npm >= 9.0.0
- PostgreSQL >= 14.0

### التثبيت

```bash
# تثبيت جميع dependencies
npm run install:all

# إعداد قاعدة البيانات
cd backend
npx prisma generate
npx prisma migrate dev

# تشغيل المشروع في وضع التطوير
npm run dev
```

### الوصول إلى المشروع

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3000/api
- **Dashboard**: http://localhost:5174

## 📁 هيكل المشروع

```
belqees-media/
├── frontend/          # واجهة المستخدم
├── backend/           # API Backend
├── dashboard/         # لوحة التحكم
├── PRD.md            # وثيقة متطلبات المشروع
└── README.md         # هذا الملف
```

## 🛠️ التقنيات المستخدمة

### Frontend
- React 18+ (TypeScript)
- Tailwind CSS 3+
- GSAP + Framer Motion + Lenis
- React Router v6
- i18next (دعم متعدد اللغات)
- Zustand (State Management)
- Vite

### Backend
- Node.js 18+
- Express.js
- Prisma ORM
- PostgreSQL
- JWT Authentication
- Zod Validation

### Dashboard
- React 18+ (TypeScript)
- shadcn/ui
- React Query
- React Hook Form
- Tiptap (Rich Text Editor)

## 📝 الميزات

- ✅ Modular Architecture (بنية معمارية مرنة)
- ✅ Component-Based Design (تصميم قائم على المكونات)
- ✅ Headless CMS (نظام إدارة محتوى منفصل)
- ✅ Multi-language Support (دعم متعدد اللغات: عربي، إنجليزي، تركي)
- ✅ Cinematic Animations (حركات سينمائية احترافية)
- ✅ Responsive Design (تصميم متجاوب)
- ✅ SEO Optimized (محسّن لمحركات البحث)

## 🔐 الأمان

- JWT Authentication
- Role-Based Access Control (RBAC)
- Input Validation
- SQL Injection Prevention
- XSS Protection
- Rate Limiting

## 📚 التوثيق

- [PRD.md](./PRD.md) - وثيقة متطلبات المشروع الكاملة
- [API Documentation](./backend/README.md) - توثيق API
- [Frontend Guide](./frontend/README.md) - دليل Frontend
- [Dashboard Guide](./dashboard/README.md) - دليل Dashboard

## 🤝 المساهمة

يرجى قراءة [PRD.md](./PRD.md) لفهم البنية المعمارية والمبادئ المتبعة قبل البدء في التطوير.

## 📄 الترخيص

هذا المشروع خاص بموقع بلقيس ميديا.

---

**تم البناء بواسطة**: فريق تطوير بلقيس ميديا
**التاريخ**: 2024

