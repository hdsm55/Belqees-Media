# دليل الإعداد والتشغيل - Belqees Media

دليل شامل لإعداد وتشغيل مشروع بلقيس ميديا خطوة بخطوة.

## 📋 المتطلبات الأساسية

قبل البدء، تأكد من تثبيت:

- **Node.js** >= 18.0.0
- **npm** >= 9.0.0
- **PostgreSQL** >= 14.0
- **Git** (اختياري)

## 🚀 خطوات الإعداد

### 1. تثبيت Dependencies

```bash
# من المجلد الرئيسي
npm run install:all

# أو تثبيت كل مشروع على حدة:
cd frontend && npm install
cd ../backend && npm install
cd ../dashboard && npm install
```

### 2. إعداد قاعدة البيانات

#### أ. إنشاء قاعدة بيانات PostgreSQL

```sql
CREATE DATABASE belqees_media;
```

#### ب. إعداد ملف البيئة للـ Backend

```bash
cd backend
cp env.example .env
```

قم بتعديل ملف `.env` وإضافة معلومات قاعدة البيانات:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/belqees_media?schema=public"
JWT_SECRET="your-super-secret-jwt-key"
JWT_REFRESH_SECRET="your-super-secret-refresh-key"
```

#### ج. تشغيل Migrations

```bash
cd backend
npm run db:generate
npm run db:migrate
```

### 3. إعداد ملفات البيئة للـ Frontend و Dashboard

```bash
# Frontend
cd frontend
# إنشاء ملف .env (اختياري)
echo "VITE_API_URL=http://localhost:3000/api" > .env

# Dashboard
cd ../dashboard
# إنشاء ملف .env (اختياري)
echo "VITE_API_URL=http://localhost:3000/api" > .env
```

### 4. تشغيل المشروع

#### الطريقة الأولى: تشغيل جميع المشاريع معاً

```bash
# من المجلد الرئيسي
npm run dev
```

#### الطريقة الثانية: تشغيل كل مشروع على حدة

```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev

# Terminal 3 - Dashboard
cd dashboard
npm run dev
```

### 5. الوصول إلى المشروع

بعد التشغيل، يمكنك الوصول إلى:

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3000/api
- **Dashboard**: http://localhost:5174
- **Health Check**: http://localhost:3000/health
- **Prisma Studio** (لإدارة قاعدة البيانات): `cd backend && npm run db:studio`

## 🔧 إعدادات إضافية

### Prisma Studio

لإدارة قاعدة البيانات بشكل مرئي:

```bash
cd backend
npm run db:studio
```

سيفتح المتصفح على http://localhost:5555

### بناء المشروع للإنتاج

```bash
# بناء جميع المشاريع
npm run build

# أو بناء كل مشروع على حدة:
cd frontend && npm run build
cd ../backend && npm run build
cd ../dashboard && npm run build
```

## 🐛 حل المشاكل الشائعة

### مشكلة: خطأ في الاتصال بقاعدة البيانات

**الحل**: تأكد من:
1. تشغيل PostgreSQL
2. صحة معلومات الاتصال في ملف `.env`
3. وجود قاعدة البيانات `belqees_media`

### مشكلة: Port already in use

**الحل**: قم بتغيير المنفذ في:
- Frontend: `vite.config.ts` → `server.port`
- Backend: `.env` → `PORT`
- Dashboard: `vite.config.ts` → `server.port`

### مشكلة: Module not found

**الحل**: قم بتشغيل:
```bash
npm run install:all
```

## 📚 الخطوات التالية

بعد إتمام الإعداد:

1. ✅ راجع [PRD.md](./PRD.md) لفهم البنية المعمارية
2. ✅ ابدأ ببناء API Endpoints في Backend
3. ✅ ابدأ ببناء Components في Frontend
4. ✅ ابدأ ببناء Dashboard Pages

## 🔐 إنشاء مستخدم Admin

بعد إعداد قاعدة البيانات، يمكنك إنشاء مستخدم Admin من خلال:

1. استخدام Prisma Studio
2. أو إنشاء Seed Script (سيتم إضافته لاحقاً)

## 📝 ملاحظات

- في وضع التطوير، سيتم إعادة تحميل الكود تلقائياً عند التعديل
- تأكد من تشغيل Backend قبل Frontend و Dashboard
- استخدم `.env.example` كمرجع لإعدادات البيئة

---

**تم البناء بواسطة**: فريق تطوير بلقيس ميديا

