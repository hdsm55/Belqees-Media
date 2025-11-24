# Belqees Media - Backend API

Backend API Headless مبني على Node.js + Express + Prisma + PostgreSQL.

## 🚀 البدء السريع

### المتطلبات
- Node.js >= 18.0.0
- PostgreSQL >= 14.0

### التثبيت

```bash
# تثبيت dependencies
npm install

# إعداد ملف البيئة
cp .env.example .env
# قم بتعديل .env وإضافة معلومات قاعدة البيانات

# توليد Prisma Client
npm run db:generate

# تشغيل Migrations
npm run db:migrate

# تشغيل في وضع التطوير
npm run dev

# بناء للإنتاج
npm run build

# تشغيل الإنتاج
npm start
```

## 📁 هيكل المشروع

```
src/
├── controllers/      # Controllers
├── models/          # Database Models (Prisma)
├── routes/          # API Routes
├── middleware/      # Custom Middleware
├── services/        # Business Logic
├── utils/           # Utilities
├── validators/      # Validation Schemas (Zod)
├── config/          # Configuration
└── types/           # TypeScript Types
```

## 🔐 Authentication

يستخدم Backend JWT للتوثيق:
- Access Token (قصير المدى)
- Refresh Token (طويل المدى)

## 📚 API Endpoints

### Authentication
- `POST /api/auth/login` - تسجيل الدخول
- `POST /api/auth/register` - تسجيل حساب جديد
- `POST /api/auth/refresh` - تحديث Token
- `GET /api/auth/me` - معلومات المستخدم الحالي

### Pages
- `GET /api/pages` - قائمة الصفحات
- `GET /api/pages/:id` - صفحة واحدة
- `POST /api/pages` - إنشاء صفحة
- `PUT /api/pages/:id` - تحديث صفحة
- `DELETE /api/pages/:id` - حذف صفحة

### Services
- `GET /api/services` - قائمة الخدمات
- `GET /api/services/:id` - خدمة واحدة
- `POST /api/services` - إنشاء خدمة
- `PUT /api/services/:id` - تحديث خدمة
- `DELETE /api/services/:id` - حذف خدمة

## 🛠️ التقنيات

- **Node.js 18+** مع TypeScript
- **Express.js** كإطار عمل
- **Prisma** كـ ORM
- **PostgreSQL** كقاعدة بيانات
- **JWT** للتوثيق
- **Zod** للتحقق من البيانات
- **Helmet** للأمان
- **CORS** لإدارة Cross-Origin

## 🔒 الأمان

- JWT Authentication
- Password Hashing (bcrypt)
- Rate Limiting
- Input Validation
- SQL Injection Prevention (Prisma)
- XSS Protection (Helmet)

## 📝 Scripts

- `npm run dev` - تشغيل في وضع التطوير
- `npm run build` - بناء للإنتاج
- `npm start` - تشغيل الإنتاج
- `npm run db:generate` - توليد Prisma Client
- `npm run db:migrate` - تشغيل Migrations
- `npm run db:studio` - فتح Prisma Studio
- `npm run lint` - فحص الكود
- `npm run format` - تنسيق الكود

