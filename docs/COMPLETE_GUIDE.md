# 📖 دليل شامل - Belqees Media v2.0

**تاريخ**: 2024-11-24
**النسخة**: v2.0.0

---

## 📚 الفهرس

1. [نظرة عامة](#نظرة-عامة)
2. [التحسينات المكتملة](#التحسينات-المكتملة)
3. [الأقسام والملفات](#الأقسام-والملفات)
4. [كيفية الاستخدام](#كيفية-الاستخدام)
5. [أمثلة عملية](#أمثلة-عملية)
6. [الخطوات التالية](#الخطوات-التالية)

---

## 🎯 نظرة عامة

تم تطبيق **16 تحسين** في النسخة 2.0:

### المرحلة 1: التحسينات السريعة (8 تحسينات) ✅
1. Error Boundaries
2. Loading States
3. Metadata API
4. Form Validation
5. Sitemap & Robots.txt
6. Structured Data
7. Accessibility
8. Image Optimization (جاهز)

### المرحلة 2: GSAP & Lenis (8 تحسينات) ✅
1. GSAP Context Setup
2. Lenis Smooth Scroll
3. GSAP & Lenis Integration
4. ScrollReveal Component
5. PageTransition Component
6. Parallax Component
7. ParallaxBackground Component
8. Lenis Provider

---

## ✅ التحسينات المكتملة

### 1. Error Boundaries 🛡️

**الموقع**: `app/error.tsx`, `app/not-found.tsx`

**الوظيفة**:
- التقاط الأخطاء تلقائياً
- عرض صفحة خطأ احترافية
- إمكانية إعادة المحاولة

**متى يظهر**:
- عند حدوث خطأ في أي صفحة → `error.tsx`
- عند زيارة صفحة غير موجودة → `not-found.tsx`

---

### 2. Loading States ⏳

**الموقع**: `app/loading.tsx`, `components/ui/LoadingSkeleton.tsx`

**الوظيفة**:
- Loading Spinner للصفحات
- Skeleton Loading للمحتوى

**الاستخدام**:
```tsx
// تلقائي في Next.js
// عند الانتقال بين الصفحات → loading.tsx

// يدوياً
<LoadingSkeleton variant="text" />
<CardSkeleton />
```

---

### 3. Metadata API 🔍

**الموقع**: جميع صفحات `app/(main)/`

**الوظيفة**:
- Meta Tags لكل صفحة
- Open Graph Tags
- Twitter Cards
- Canonical URLs

**الفائدة**:
- SEO محسّن
- مشاركة أفضل على Social Media

---

### 4. Form Validation ✅

**الموقع**: `lib/validations/contact.ts`

**الوظيفة**:
- Client-side Validation
- Server-side Validation
- رسائل خطأ واضحة

**الاستخدام**:
```tsx
// تلقائي في Contact Form
// Zod Schema يتحقق من:
// - الاسم: 2 أحرف على الأقل
// - البريد: صيغة صحيحة
// - الرسالة: 10 أحرف على الأقل
```

---

### 5. Sitemap & Robots.txt 🤖

**الموقع**: `app/sitemap.ts`, `app/robots.ts`

**الوظيفة**:
- Sitemap.xml تلقائي
- Robots.txt تلقائي

**الفائدة**:
- فهرسة أفضل في Google
- تحكم في ما يتم فهرسته

---

### 6. Structured Data 📊

**الموقع**: `components/StructuredData.tsx`

**الوظيفة**:
- بيانات منظمة لـ Google
- Organization Schema

**الفائدة**:
- Rich Results في Google
- معلومات الشركة في نتائج البحث

---

### 7. Accessibility ♿

**الموقع**: جميع Components

**الوظيفة**:
- ARIA Labels
- Keyboard Navigation
- Screen Reader Support

**الفائدة**:
- قابل للوصول للجميع
- متوافق مع المعايير

---

### 8. GSAP Context Setup 🎨

**الموقع**: `lib/animations/gsap.ts`

**الوظيفة**:
- إدارة GSAP Animations
- Timeline Management
- Animation Presets

**الاستخدام**:
```tsx
const ctx = createGSAPContext();
ctx.to(element, { opacity: 1, y: 0 });
```

---

### 9. Lenis Smooth Scroll 📜

**الموقع**: `lib/animations/lenis.ts`

**الوظيفة**:
- Smooth Scroll احترافي
- Auto-scroll on route change
- Scroll Utilities

**الاستخدام**:
```tsx
const lenis = useLenis();
scrollToElement(lenis, '#section');
```

---

### 10. GSAP & Lenis Integration 🔗

**الموقع**: `lib/animations/integration.ts`

**الوظيفة**:
- ربط GSAP ScrollTrigger مع Lenis
- Auto-refresh on scroll

**الفائدة**:
- Animations تعمل مع Smooth Scroll
- أداء أفضل

---

### 11. ScrollReveal Component 🎭

**الموقع**: `components/animations/ScrollReveal.tsx`

**الوظيفة**:
- عرض العناصر عند Scroll
- 6 أنواع حركات
- Stagger Effects

**الاستخدام**:
```tsx
<ScrollReveal animation="fadeInUp" stagger={0.1}>
  <div>Content</div>
</ScrollReveal>
```

---

### 12. PageTransition Component 🔄

**الموقع**: `components/animations/PageTransition.tsx`

**الوظيفة**:
- انتقالات سلسة بين الصفحات
- Fade & Slide Effects

**الاستخدام**:
```tsx
// تلقائي في Layout
<PageTransition>
  {children}
</PageTransition>
```

---

### 13. Parallax Component 🌊

**الموقع**: `components/animations/Parallax.tsx`

**الوظيفة**:
- تأثير Parallax للعناصر
- Configurable Speed

**الاستخدام**:
```tsx
<Parallax speed={0.5} direction="up">
  <div>Content</div>
</Parallax>
```

---

### 14. ParallaxBackground Component 🖼️

**الموقع**: `components/animations/ParallaxBackground.tsx`

**الوظيفة**:
- تأثير Parallax للخلفيات

**الاستخدام**:
```tsx
<ParallaxBackground speed={0.3}>
  <div className="bg-cover" style={{ backgroundImage: 'url(/bg.jpg)' }} />
</ParallaxBackground>
```

---

### 15. Lenis Provider 🔌

**الموقع**: `components/providers/LenisProvider.tsx`

**الوظيفة**:
- Provider عالمي لـ Lenis
- Integration مع GSAP

**الاستخدام**:
```tsx
// في app/layout.tsx
<LenisProvider>
  {children}
</LenisProvider>
```

---

## 📁 الأقسام والملفات

### lib/animations/
```
lib/animations/
├── gsap.ts          # GSAP Context Manager
├── lenis.ts         # Lenis Setup & Hooks
└── integration.ts   # GSAP & Lenis Integration
```

**الوظيفة**: Utilities للـ Animations

---

### components/animations/
```
components/animations/
├── ScrollReveal.tsx        # Scroll Animations
├── PageTransition.tsx      # Page Transitions
├── Parallax.tsx            # Element Parallax
└── ParallaxBackground.tsx # Background Parallax
```

**الوظيفة**: Animation Components جاهزة للاستخدام

---

### components/providers/
```
components/providers/
└── LenisProvider.tsx  # Global Lenis Provider
```

**الوظيفة**: Provider لإدارة Lenis عالمياً

---

### components/ui/
```
components/ui/
└── LoadingSkeleton.tsx  # Skeleton Components
```

**الوظيفة**: Loading States Components

---

### app/
```
app/
├── error.tsx          # Error Boundary
├── not-found.tsx      # 404 Page
├── loading.tsx        # Loading State
├── sitemap.ts         # Sitemap
└── robots.ts          # Robots.txt
```

**الوظيفة**: Special Pages & Files

---

## 🎯 كيفية الاستخدام

### 1. استخدام ScrollReveal

```tsx
import ScrollReveal from '@/components/animations/ScrollReveal';

// عنصر واحد
<ScrollReveal animation="fadeInUp">
  <h2>Title</h2>
</ScrollReveal>

// عناصر متعددة
<ScrollReveal animation="scaleIn" stagger={0.1}>
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</ScrollReveal>
```

---

### 2. استخدام Parallax

```tsx
import Parallax from '@/components/animations/Parallax';

<Parallax speed={0.5} direction="up">
  <img src="/image.jpg" />
</Parallax>
```

---

### 3. استخدام ParallaxBackground

```tsx
import ParallaxBackground from '@/components/animations/ParallaxBackground';

<section className="relative">
  <ParallaxBackground speed={0.3}>
    <div className="absolute inset-0 bg-cover" style={{ backgroundImage: 'url(/bg.jpg)' }} />
  </ParallaxBackground>
  <div className="relative z-10">
    <h1>Content</h1>
  </div>
</section>
```

---

### 4. استخدام Lenis Utilities

```tsx
'use client';

import { useLenis } from '@/lib/animations/lenis';
import { scrollToElement, scrollToTop } from '@/lib/animations/lenis';

function MyComponent() {
  const lenis = useLenis();

  const handleClick = () => {
    scrollToElement(lenis, '#section', { offset: -100 });
  };

  return <button onClick={handleClick}>Scroll</button>;
}
```

---

## 🎨 أمثلة عملية

### Example 1: Home Page Structure

```tsx
<>
  {/* Hero - GSAP Animations تلقائية */}
  <HeroBlock title="..." />

  {/* About - ScrollReveal */}
  <ScrollReveal animation="fadeInUp">
    <section>About</section>
  </ScrollReveal>

  {/* Services - ScrollReveal with Stagger */}
  <ScrollReveal animation="fadeInUp">
    <section>
      <ScrollReveal animation="scaleIn" stagger={0.1}>
        {services.map(service => (
          <ServiceCard key={service.id} />
        ))}
      </ScrollReveal>
    </section>
  </ScrollReveal>
</>
```

---

### Example 2: Page with Parallax

```tsx
<section className="relative min-h-screen">
  {/* Parallax Background */}
  <ParallaxBackground speed={0.3}>
    <div className="absolute inset-0 bg-cover" style={{ backgroundImage: 'url(/hero.jpg)' }} />
  </ParallaxBackground>

  {/* Content */}
  <div className="relative z-10">
    <ScrollReveal animation="fadeInUp">
      <h1>Title</h1>
    </ScrollReveal>
  </div>
</section>
```

---

### Example 3: Services Grid

```tsx
<ScrollReveal animation="fadeInUp" delay={0.2}>
  <section>
    <h2>Services</h2>
    <ScrollReveal animation="scaleIn" stagger={0.1}>
      <div className="grid grid-cols-3 gap-4">
        {services.map(service => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
    </ScrollReveal>
  </section>
</ScrollReveal>
```

---

## 📊 الإحصائيات

### الملفات:
- ✅ **16 ملف جديد**
- ✅ **14 ملف محدث**

### المكونات:
- ✅ **6 Animation Components**
- ✅ **1 Provider Component**
- ✅ **3 Utility Files**
- ✅ **2 Error Pages**
- ✅ **1 Loading Component**
- ✅ **1 Skeleton Component**
- ✅ **1 Structured Data Component**

---

## 🚀 الخطوات التالية

### المرحلة 3: Dashboard Pages
- إدارة الصفحات
- إدارة الخدمات
- إدارة Portfolio
- إدارة الفعاليات
- إدارة المدونة
- Media Library

### المرحلة 4: Multi-language Support
- next-intl Setup
- Translation Files
- Language Switcher

### المرحلة 5: Performance Optimization
- Image Optimization
- Code Splitting
- Font Optimization

---

**تم الشرح بنجاح!** ✅


