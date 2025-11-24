# PRD - Belqees Media (Next.js Version)

## 🎯 البنية الجديدة

تم الانتقال إلى **Next.js 14** كمنصة متكاملة تجمع بين:
- Frontend (React Server Components)
- Backend (API Routes)
- Database (Supabase)
- Authentication (Supabase Auth)

## ✨ المميزات الرئيسية

### 1. Next.js App Router
- React Server Components (RSC) للأداء العالي
- Server-Side Rendering (SSR)
- Static Site Generation (SSG)
- Incremental Static Regeneration (ISR)
- API Routes مدمجة

### 2. Supabase Integration
- Database (PostgreSQL)
- Authentication (Email/Password, OAuth)
- Storage (للملفات)
- Real-time (اختياري)

### 3. Cinematic UI/UX
- Framer Motion للحركات التفاعلية
- GSAP للحركات السينمائية المعقدة
- Lenis للتمرير السلس
- Tailwind CSS للتصميم

### 4. SEO Optimized
- Server-Side Rendering
- Meta Tags ديناميكية
- Sitemap تلقائي
- Structured Data

### 5. Multi-language Support
- العربية (ar) - الافتراضية
- الإنجليزية (en)
- التركية (tr)
- RTL Support

## 📁 البنية المعمارية

```
belqees-media/
├── app/                    # Next.js App Router
│   ├── (main)/            # Main Routes Group
│   ├── api/               # API Routes
│   └── layout.tsx         # Root Layout
├── components/            # React Components
├── lib/                   # Utilities
├── prisma/                # Database Schema
└── types/                 # TypeScript Types
```

## 🔐 Authentication Flow

1. **Supabase Auth** للتوثيق
2. **Prisma** لتخزين معلومات إضافية (Role, etc.)
3. **Middleware** لإدارة Sessions
4. **Server Components** للوصول الآمن للبيانات

## 📚 API Routes Structure

جميع API Routes في `app/api/`:

### Authentication
- `POST /api/auth/login` - تسجيل الدخول
- `POST /api/auth/register` - تسجيل حساب جديد
- `POST /api/auth/logout` - تسجيل الخروج
- `GET /api/auth/me` - معلومات المستخدم

### Content Management
- `GET/POST/PUT/DELETE /api/pages` - إدارة الصفحات
- `GET/POST/PUT/DELETE /api/services` - إدارة الخدمات
- `GET/POST/PUT/DELETE /api/portfolio` - إدارة الأعمال
- `GET/POST/PUT/DELETE /api/events` - إدارة الفعاليات
- `GET/POST/PUT/DELETE /api/blog` - إدارة المدونة
- `POST /api/media/upload` - رفع الملفات
- `POST /api/contact` - إرسال رسالة

## 🎨 Component Architecture

### Atomic Design Pattern
- **Atoms**: أزرار، حقول إدخال، أيقونات
- **Molecules**: نماذج، بطاقات بسيطة
- **Organisms**: قوائم، أقسام كاملة
- **Blocks**: Hero, Services, Portfolio, etc.

### Server vs Client Components
- **Server Components**: للبيانات والـ SEO
- **Client Components**: للتفاعل والحركات

## ⚡ Performance Optimizations

1. **React Server Components**: تقليل JavaScript في Client
2. **Image Optimization**: Next.js Image Component
3. **Code Splitting**: تلقائي مع App Router
4. **Caching**: Next.js Caching Strategies
5. **Lazy Loading**: للصور والمكونات

## 🚀 Deployment

- **Vercel**: مستحسن (متكامل مع Next.js)
- **Netlify**: بديل جيد
- **Self-hosted**: Docker + Node.js

---

**تم البناء بواسطة**: فريق تطوير بلقيس ميديا
**التاريخ**: 2024-11-24

