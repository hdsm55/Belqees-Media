# Product Requirements Document (PRD)
## موقع بلقيس ميديا - منصة رقمية متكاملة

---

## 1. نظرة عامة على المشروع

### 1.1 الهدف
بناء منصة رقمية متكاملة لموقع بلقيس ميديا باستخدام منهجية حديثة تجعل التخصيص والتطوير والتحديث المستقبلي سهلاً جداً دون الحاجة لإعادة البرمجة من الصفر.

### 1.2 الرؤية
تحويل الموقع من مجرد Frontend بسيط إلى منصة رقمية قابلة للتخصيص المستمر، تمتلك:
- واجهة قوية ومرنة
- عناصر قابلة لإعادة الاستخدام
- لوحة إدارة متطورة
- نظام Backend منفصل ومرن
- سهولة التطوير على المدى القصير والطويل

### 1.3 القيمة المضافة
- **مرونة عالية**: إمكانية تعديل التصميم والمحتوى دون لمس الكود الأساسي
- **قابلية التوسع**: إضافة ميزات جديدة دون كسر النظام الحالي
- **تجربة مستخدم احترافية**: تصميم سينمائي عالي المستوى
- **إدارة سهلة**: لوحة تحكم متكاملة لإدارة جميع المحتويات
- **دعم متعدد اللغات**: دعم كامل للعربية والإنجليزية والتركية

---

## 2. المتطلبات التقنية

### 2.1 البنية المعمارية (Architecture)

#### 2.1.1 Frontend Stack
- **Framework**: React 18+ (مع TypeScript)
- **Styling**: Tailwind CSS 3+
- **Animation Libraries**:
  - GSAP (GreenSock Animation Platform) للحركات السينمائية المعقدة
  - Framer Motion للحركات التفاعلية
  - Lenis للتمرير السلس (Smooth Scroll)
- **State Management**: Zustand أو Redux Toolkit
- **Routing**: React Router v6
- **Internationalization**: i18next + react-i18next
- **Build Tool**: Vite
- **Code Quality**: ESLint + Prettier

#### 2.1.2 Backend Stack
- **Runtime**: Node.js 18+
- **Framework**: Express.js
- **Database**:
  - PostgreSQL (للمحتوى المنظم)
  - MongoDB (للمحتوى الديناميكي - اختياري)
- **ORM/ODM**: Prisma (لـ PostgreSQL)
- **Authentication**: JWT + bcrypt
- **API**: RESTful API (جاهز للتوسع إلى GraphQL لاحقاً)
- **File Storage**: AWS S3 أو Cloudinary (للصور والملفات)
- **Validation**: Zod أو Joi

#### 2.1.3 CMS/Dashboard Stack
- **Framework**: React (نفس Frontend)
- **UI Components**:
  - shadcn/ui أو Ant Design
  - React Hook Form
  - React Query (TanStack Query) لإدارة البيانات
- **Rich Text Editor**: Lexical أو Tiptap
- **File Upload**: React Dropzone
- **Charts**: Recharts (لإحصائيات لوحة التحكم)

### 2.2 المبادئ المعمارية

#### 2.2.1 Modular Architecture
- كل جزء من الموقع عبارة عن **Block/Component** مستقل
- كل Block له:
  - Component خاص به
  - Schema للبيانات
  - Styles منفصلة
  - Logic منفصل
- إمكانية تفعيل/تعطيل Blocks دون تأثير على النظام

#### 2.2.2 Component-Based Architecture
- **Atomic Design Pattern**:
  - Atoms (أزرار، حقول إدخال)
  - Molecules (نماذج، بطاقات بسيطة)
  - Organisms (قوائم، أقسام كاملة)
  - Templates (صفحات)
  - Pages (صفحات مكتملة)

#### 2.2.3 Separation of Concerns
- **فصل كامل بين البيانات والعرض**:
  - Backend API يوفر البيانات فقط (JSON)
  - Frontend يعرض البيانات فقط
  - تغيير التصميم لا يتطلب تعديل Backend
  - تغيير البيانات لا يتطلب تعديل Frontend

#### 2.2.4 Headless Architecture
- Backend يوفر API فقط (لا يوجد Views)
- Frontend مستقل تماماً عن Backend
- إمكانية استبدال Frontend أو Backend دون تأثير على الآخر

---

## 3. الوظائف والميزات (Features)

### 3.1 الواجهة الأمامية (Frontend)

#### 3.1.1 الصفحات الأساسية
- **الصفحة الرئيسية (Homepage)**
  - Hero Section مع فيديو/صورة خلفية
  - قسم "من نحن" (About Us)
  - قسم الخدمات (Services)
  - قسم الأعمال/المشاريع (Portfolio/Projects)
  - قسم الفعاليات (Events)
  - قسم الأخبار/المدونة (News/Blog)
  - قسم التواصل (Contact)
  - Footer شامل

- **صفحة من نحن (About)**
  - قصة الشركة
  - الفريق
  - الإنجازات
  - الشهادات

- **صفحة الخدمات (Services)**
  - قائمة جميع الخدمات
  - صفحة تفاصيل لكل خدمة
  - نموذج طلب خدمة

- **صفحة الأعمال/المشاريع (Portfolio)**
  - معرض المشاريع مع فلاتر
  - صفحة تفاصيل لكل مشروع
  - معرض صور/فيديوهات

- **صفحة الفعاليات (Events)**
  - قائمة الفعاليات القادمة
  - قائمة الفعاليات السابقة
  - صفحة تفاصيل كل فعالية
  - نموذج التسجيل في الفعالية

- **صفحة الأخبار/المدونة (Blog)**
  - قائمة المقالات
  - صفحة تفاصيل المقال
  - نظام التصنيفات والوسوم
  - البحث في المقالات

- **صفحة التواصل (Contact)**
  - نموذج التواصل
  - معلومات التواصل (عنوان، هاتف، بريد)
  - خريطة (Google Maps)

#### 3.1.2 الميزات التفاعلية
- **حركات سينمائية**:
  - Scroll Animations (GSAP ScrollTrigger)
  - Page Transitions (Framer Motion)
  - Smooth Scrolling (Lenis)
  - Parallax Effects
  - Loading Animations

- **تجربة المستخدم**:
  - Dark/Light Mode (اختياري)
  - Responsive Design (Mobile, Tablet, Desktop)
  - Lazy Loading للصور
  - Infinite Scroll (للمقالات/المشاريع)
  - Search Functionality
  - Filtering & Sorting

### 3.2 لوحة التحكم (Dashboard/CMS)

#### 3.2.1 إدارة المحتوى
- **إدارة الصفحات**:
  - إنشاء/تعديل/حذف الصفحات
  - إدارة Blocks في كل صفحة
  - Preview قبل النشر
  - إدارة SEO (Meta Tags, Open Graph)

- **إدارة الخدمات**:
  - CRUD للخدمات
  - إدارة الصور والأيقونات
  - إدارة المحتوى متعدد اللغات

- **إدارة الأعمال/المشاريع**:
  - CRUD للمشاريع
  - إدارة معرض الصور/الفيديوهات
  - إدارة التصنيفات

- **إدارة الفعاليات**:
  - CRUD للفعاليات
  - إدارة التواريخ والأوقات
  - إدارة التسجيلات

- **إدارة المدونة**:
  - محرر نصوص غني (Rich Text Editor)
  - إدارة التصنيفات والوسوم
  - إدارة الصور المضمنة
  - جدولة النشر

#### 3.2.2 إدارة اللغات
- **إدارة المحتوى متعدد اللغات**:
  - إضافة/تعديل المحتوى لكل لغة
  - ترجمة تلقائية (اختياري - باستخدام API)
  - إدارة الترجمات يدوياً
  - Preview لكل لغة

#### 3.2.3 إدارة الملفات
- **Media Library**:
  - رفع الصور والفيديوهات
  - إدارة الملفات
  - تحسين الصور تلقائياً
  - CDN Integration

#### 3.2.4 إدارة المستخدمين
- **نظام الصلاحيات**:
  - Admin (صلاحيات كاملة)
  - Editor (تعديل المحتوى فقط)
  - Contributor (إضافة محتوى فقط)
  - Viewer (عرض فقط)

#### 3.2.5 الإحصائيات والتحليلات
- **لوحة تحكم إحصائية**:
  - عدد الزوار
  - الصفحات الأكثر زيارة
  - مصادر الزيارات
  - إحصائيات المحتوى

### 3.3 Backend API

#### 3.3.1 Endpoints الأساسية

**المصادقة (Authentication)**
```
POST /api/auth/login
POST /api/auth/register
POST /api/auth/logout
POST /api/auth/refresh
GET  /api/auth/me
```

**الصفحات (Pages)**
```
GET    /api/pages
GET    /api/pages/:id
POST   /api/pages
PUT    /api/pages/:id
DELETE /api/pages/:id
```

**الخدمات (Services)**
```
GET    /api/services
GET    /api/services/:id
POST   /api/services
PUT    /api/services/:id
DELETE /api/services/:id
```

**الأعمال/المشاريع (Portfolio)**
```
GET    /api/portfolio
GET    /api/portfolio/:id
POST   /api/portfolio
PUT    /api/portfolio/:id
DELETE /api/portfolio/:id
```

**الفعاليات (Events)**
```
GET    /api/events
GET    /api/events/:id
POST   /api/events
PUT    /api/events/:id
DELETE /api/events/:id
POST   /api/events/:id/register
```

**المدونة (Blog)**
```
GET    /api/blog
GET    /api/blog/:id
POST   /api/blog
PUT    /api/blog/:id
DELETE /api/blog/:id
GET    /api/blog/categories
GET    /api/blog/tags
```

**اللغات (Languages)**
```
GET    /api/languages
GET    /api/content/:type/:id/:lang
PUT    /api/content/:type/:id/:lang
```

**الملفات (Media)**
```
POST   /api/media/upload
GET    /api/media
DELETE /api/media/:id
```

**التواصل (Contact)**
```
POST   /api/contact
GET    /api/contact/messages
```

---

## 4. هيكل المشروع (Project Structure)

### 4.1 Frontend Structure
```
frontend/
├── src/
│   ├── components/          # المكونات القابلة لإعادة الاستخدام
│   │   ├── atoms/           # المكونات الأساسية (أزرار، حقول)
│   │   ├── molecules/      # المكونات المركبة (نماذج، بطاقات)
│   │   ├── organisms/      # المكونات المعقدة (قوائم، أقسام)
│   │   └── blocks/         # Blocks الخاصة بالصفحات
│   ├── pages/              # صفحات الموقع
│   ├── layouts/            # التخطيطات (Layouts)
│   ├── hooks/              # Custom Hooks
│   ├── store/              # State Management
│   ├── services/           # API Services
│   ├── utils/              # Utilities
│   ├── styles/             # Global Styles
│   ├── locales/            # ملفات الترجمة
│   │   ├── ar/
│   │   ├── en/
│   │   └── tr/
│   └── types/              # TypeScript Types
├── public/
└── package.json
```

### 4.2 Backend Structure
```
backend/
├── src/
│   ├── controllers/        # Controllers
│   ├── models/            # Database Models (Prisma)
│   ├── routes/            # API Routes
│   ├── middleware/        # Custom Middleware
│   ├── services/          # Business Logic
│   ├── utils/             # Utilities
│   ├── validators/        # Validation Schemas
│   ├── config/            # Configuration
│   └── types/             # TypeScript Types
├── prisma/
│   └── schema.prisma      # Database Schema
└── package.json
```

### 4.3 Dashboard Structure
```
dashboard/
├── src/
│   ├── components/        # Dashboard Components
│   ├── pages/             # Dashboard Pages
│   ├── layouts/           # Dashboard Layouts
│   ├── hooks/             # Custom Hooks
│   ├── services/          # API Services
│   ├── store/             # State Management
│   └── utils/             # Utilities
└── package.json
```

---

## 5. قاعدة البيانات (Database Schema)

### 5.1 الجداول الأساسية

**Users** (المستخدمون)
- id, email, password, role, createdAt, updatedAt

**Pages** (الصفحات)
- id, slug, title, content (JSON), blocks (JSON), seo, published, createdAt, updatedAt

**Services** (الخدمات)
- id, slug, title, description, icon, image, content (JSON), published, createdAt, updatedAt

**Portfolio** (الأعمال)
- id, slug, title, description, images (JSON), videos (JSON), category, published, createdAt, updatedAt

**Events** (الفعاليات)
- id, slug, title, description, date, time, location, image, registrations, published, createdAt, updatedAt

**Blog Posts** (المقالات)
- id, slug, title, excerpt, content, featuredImage, categoryId, authorId, published, publishedAt, createdAt, updatedAt

**Categories** (التصنيفات)
- id, slug, name, description

**Tags** (الوسوم)
- id, slug, name

**Media** (الملفات)
- id, filename, url, type, size, uploadedBy, createdAt

**Translations** (الترجمات)
- id, entityType, entityId, language, field, value

**Contact Messages** (رسائل التواصل)
- id, name, email, subject, message, read, createdAt

---

## 6. دعم متعدد اللغات (i18n)

### 6.1 اللغات المدعومة
- العربية (ar) - اللغة الافتراضية
- الإنجليزية (en)
- التركية (tr)

### 6.2 آلية العمل
- استخدام i18next + react-i18next
- ملفات ترجمة منفصلة لكل لغة
- تبديل اللغة ديناميكياً
- حفظ اختيار اللغة في LocalStorage
- دعم RTL للعربية
- ترجمة جميع النصوص: القوائم، الأزرار، الرسائل، المحتوى

### 6.3 هيكل ملفات الترجمة
```
locales/
├── ar/
│   ├── common.json
│   ├── navigation.json
│   ├── pages.json
│   └── messages.json
├── en/
│   └── (نفس الهيكل)
└── tr/
    └── (نفس الهيكل)
```

---

## 7. التصميم والحركات (Design & Animations)

### 7.1 مبادئ التصميم
- **Modern & Clean**: تصميم عصري ونظيف
- **Cinematic**: حركات سينمائية احترافية
- **Responsive**: متجاوب مع جميع الأجهزة
- **Accessible**: قابل للوصول (WCAG 2.1)
- **Performance**: أداء عالي وسريع

### 7.2 استخدام GSAP
- ScrollTrigger للحركات عند التمرير
- Timeline للحركات المعقدة
- Text Animations
- Parallax Effects
- Page Transitions

### 7.3 استخدام Framer Motion
- Component Animations
- Page Transitions
- Hover Effects
- Loading States

### 7.4 استخدام Lenis
- Smooth Scrolling
- Custom Scroll Behavior
- Scroll Performance Optimization

---

## 8. الأمان (Security)

### 8.1 Authentication & Authorization
- JWT Tokens
- Refresh Tokens
- Role-Based Access Control (RBAC)
- Password Hashing (bcrypt)

### 8.2 API Security
- Rate Limiting
- CORS Configuration
- Input Validation
- SQL Injection Prevention (Prisma)
- XSS Protection

### 8.3 Frontend Security
- Environment Variables
- Secure API Calls
- Content Security Policy (CSP)

---

## 9. الأداء (Performance)

### 9.1 Frontend Optimization
- Code Splitting
- Lazy Loading
- Image Optimization
- Bundle Size Optimization
- Caching Strategy

### 9.2 Backend Optimization
- Database Indexing
- Query Optimization
- Caching (Redis - اختياري)
- API Response Compression

### 9.3 Monitoring
- Error Tracking (Sentry)
- Performance Monitoring
- Analytics Integration

---

## 10. قابلية التوسع (Scalability)

### 10.1 الميزات المستقبلية القابلة للإضافة
- **نظام الحجز (Booking System)**
  - حجز الخدمات
  - إدارة المواعيد
  - إشعارات

- **معرض الفيديوهات (Video Gallery)**
  - رفع وإدارة الفيديوهات
  - تشغيل الفيديوهات
  - إحصائيات المشاهدة

- **نظام التدريب (Training System)**
  - دورات تدريبية
  - تسجيل الطلاب
  - شهادات

- **CRM Integration**
  - إدارة العملاء
  - متابعة المبيعات
  - تقارير

- **E-commerce** (اختياري)
  - منتجات
  - سلة التسوق
  - الدفع

### 10.2 البنية القابلة للتوسع
- **Microservices Ready**: إمكانية تقسيم Backend إلى خدمات منفصلة
- **Plugin System**: نظام إضافات للميزات الجديدة
- **API Versioning**: دعم إصدارات متعددة من API
- **Database Sharding**: إمكانية تقسيم قاعدة البيانات

---

## 11. خطة التنفيذ (Implementation Plan)

### 11.1 المرحلة 1: الإعداد والبنية الأساسية (2-3 أسابيع)
- [ ] إعداد المشروع (Frontend, Backend, Dashboard)
- [ ] إعداد قاعدة البيانات والـ Schema
- [ ] إعداد نظام المصادقة
- [ ] إعداد نظام الترجمة (i18n)
- [ ] إعداد Tailwind و GSAP و Framer Motion

### 11.2 المرحلة 2: Backend API (3-4 أسابيع)
- [ ] بناء جميع API Endpoints
- [ ] إعداد نظام إدارة الملفات
- [ ] إعداد نظام الصلاحيات
- [ ] اختبار API

### 11.3 المرحلة 3: Dashboard/CMS (4-5 أسابيع)
- [ ] بناء لوحة التحكم
- [ ] إدارة الصفحات والمحتوى
- [ ] إدارة الخدمات والأعمال
- [ ] إدارة الفعاليات والمدونة
- [ ] إدارة اللغات
- [ ] Media Library

### 11.4 المرحلة 4: Frontend (5-6 أسابيع)
- [ ] بناء المكونات الأساسية (Atoms, Molecules, Organisms)
- [ ] بناء Blocks للصفحات
- [ ] بناء جميع الصفحات
- [ ] إضافة الحركات والأنيميشن
- [ ] إضافة Responsive Design
- [ ] اختبار تجربة المستخدم

### 11.5 المرحلة 5: التكامل والاختبار (2-3 أسابيع)
- [ ] ربط Frontend مع Backend
- [ ] اختبار شامل
- [ ] تحسين الأداء
- [ ] إصلاح الأخطاء
- [ ] اختبار الأمان

### 11.6 المرحلة 6: النشر والتدريب (1-2 أسابيع)
- [ ] نشر الموقع
- [ ] إعداد البيئة الإنتاجية
- [ ] تدريب الفريق على استخدام Dashboard
- [ ] توثيق المشروع

---

## 12. المعايير والجودة (Standards & Quality)

### 12.1 Code Standards
- TypeScript Strict Mode
- ESLint + Prettier
- Consistent Naming Conventions
- Code Comments (JSDoc)
- Git Commit Conventions

### 12.2 Testing
- Unit Tests (Jest)
- Integration Tests
- E2E Tests (Playwright أو Cypress)
- API Tests

### 12.3 Documentation
- README للمشروع
- API Documentation (Swagger/OpenAPI)
- Component Documentation (Storybook - اختياري)
- User Guide للـ Dashboard

---

## 13. الأدوات والتقنيات الإضافية

### 13.1 Development Tools
- Git & GitHub/GitLab
- Docker (للتطوير المحلي)
- Postman (لاختبار API)
- VS Code Extensions

### 13.2 Deployment
- Frontend: Vercel أو Netlify
- Backend: AWS, DigitalOcean, أو Railway
- Database: Managed PostgreSQL (AWS RDS أو Supabase)
- CDN: Cloudflare

### 13.3 CI/CD
- GitHub Actions
- Automated Testing
- Automated Deployment
- Environment Management

---

## 14. المخاطر والتحديات (Risks & Challenges)

### 14.1 المخاطر التقنية
- **تعقيد الحركات السينمائية**: قد تؤثر على الأداء
  - *الحل*: استخدام Lazy Loading و Optimization

- **إدارة المحتوى متعدد اللغات**: قد يكون معقداً
  - *الحل*: بنية واضحة وواجهة سهلة

- **قابلية التوسع**: إضافة ميزات جديدة قد تكسر النظام
  - *الحل*: Modular Architecture و Plugin System

### 14.2 المخاطر الزمنية
- **الجدول الزمني**: قد يستغرق وقتاً أطول من المتوقع
  - *الحل*: تقسيم المهام و الأولويات

---

## 15. النجاح والمعايير (Success Criteria)

### 15.1 المعايير الفنية
- ✅ جميع الصفحات تعمل بشكل صحيح
- ✅ Dashboard كامل الوظائف
- ✅ API مستقر وسريع
- ✅ دعم كامل للغات الثلاث
- ✅ تصميم متجاوب على جميع الأجهزة
- ✅ أداء عالي (Lighthouse Score > 90)

### 15.2 معايير المستخدم
- ✅ تجربة مستخدم سلسة واحترافية
- ✅ سهولة استخدام Dashboard
- ✅ سرعة تحميل الصفحات (< 3 ثواني)
- ✅ حركات سينمائية سلسة

### 15.3 معايير التطوير
- ✅ كود نظيف ومنظم
- ✅ توثيق شامل
- ✅ قابلية الصيانة والتطوير
- ✅ إمكانية إضافة ميزات جديدة بسهولة

---

## 16. الخلاصة

هذا المشروع يهدف إلى بناء منصة رقمية متكاملة لموقع بلقيس ميديا باستخدام أحدث التقنيات وأفضل الممارسات، مع التركيز على:

1. **المرونة**: Modular Architecture يسمح بالتعديل والتطوير بسهولة
2. **القابلية للتوسع**: بنية تسمح بإضافة ميزات جديدة دون كسر النظام
3. **التجربة الاحترافية**: تصميم سينمائي وحركات سلسة
4. **سهولة الإدارة**: Dashboard متكامل لإدارة جميع المحتويات
5. **الدعم متعدد اللغات**: دعم كامل للعربية والإنجليزية والتركية

---

## 17. الملاحق (Appendices)

### 17.1 المصطلحات
- **Headless**: Backend يوفر API فقط بدون Views
- **Modular Architecture**: بنية معمارية تعتمد على وحدات مستقلة
- **Component-Based**: بناء يعتمد على المكونات القابلة لإعادة الاستخدام
- **Block**: وحدة مستقلة من المحتوى (مثل Hero Section, Services List)
- **CMS**: Content Management System (نظام إدارة المحتوى)

### 17.2 المراجع
- React Documentation
- Tailwind CSS Documentation
- GSAP Documentation
- Framer Motion Documentation
- Prisma Documentation
- Express.js Documentation

---

**تاريخ الإنشاء**: [تاريخ اليوم]
**الإصدار**: 1.0
**الحالة**: مسودة أولية

