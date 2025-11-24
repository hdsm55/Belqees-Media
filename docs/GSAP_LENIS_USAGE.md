# 📖 دليل استخدام GSAP & Lenis - Belqees Media

**تاريخ**: 2024-11-24

---

## 🎯 المكونات المتاحة

### 1. ScrollReveal Component

**الاستخدام**:
```tsx
import ScrollReveal from '@/components/animations/ScrollReveal';

<ScrollReveal animation="fadeInUp" delay={0.2} stagger={0.1}>
  <div>Content</div>
</ScrollReveal>
```

**الخصائص**:
- `animation`: نوع الحركة (`fadeIn`, `fadeInUp`, `fadeInDown`, `scaleIn`, `slideInLeft`, `slideInRight`)
- `delay`: تأخير الحركة (بالثواني)
- `duration`: مدة الحركة (بالثواني)
- `stagger`: التأخير بين العناصر المتعددة (بالثواني)
- `once`: تشغيل الحركة مرة واحدة فقط (افتراضي: `true`)
- `className`: CSS classes إضافية

**أمثلة**:
```tsx
// Fade in animation
<ScrollReveal animation="fadeInUp">
  <h2>Title</h2>
</ScrollReveal>

// Stagger animation for multiple items
<ScrollReveal animation="scaleIn" stagger={0.1}>
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</ScrollReveal>
```

---

### 2. Parallax Component

**الاستخدام**:
```tsx
import Parallax from '@/components/animations/Parallax';

<Parallax speed={0.5} direction="up">
  <div>Content</div>
</Parallax>
```

**الخصائص**:
- `speed`: سرعة الحركة (0.1 - 1.0)
- `direction`: اتجاه الحركة (`up` | `down`)
- `className`: CSS classes إضافية

**أمثلة**:
```tsx
// Slow parallax up
<Parallax speed={0.3} direction="up">
  <img src="/image.jpg" />
</Parallax>

// Fast parallax down
<Parallax speed={0.7} direction="down">
  <div>Content</div>
</Parallax>
```

---

### 3. ParallaxBackground Component

**الاستخدام**:
```tsx
import ParallaxBackground from '@/components/animations/ParallaxBackground';

<ParallaxBackground speed={0.3}>
  <div className="background-image">Background</div>
</ParallaxBackground>
```

**الخصائص**:
- `speed`: سرعة الحركة (0.1 - 1.0)
- `className`: CSS classes إضافية

**أمثلة**:
```tsx
<ParallaxBackground speed={0.3}>
  <div
    className="absolute inset-0 bg-cover bg-center"
    style={{ backgroundImage: 'url(/hero.jpg)' }}
  />
</ParallaxBackground>
```

---

### 4. PageTransition Component

**الاستخدام**:
```tsx
import PageTransition from '@/components/animations/PageTransition';

<PageTransition>
  {children}
</PageTransition>
```

**الخصائص**:
- `children`: محتوى الصفحة

**ملاحظة**: يتم استخدامه في Layout تلقائياً

---

## 🛠️ Utilities

### useLenis Hook

**الاستخدام**:
```tsx
'use client';

import { useLenis } from '@/lib/animations/lenis';
import { scrollToElement, scrollToTop } from '@/lib/animations/lenis';

function MyComponent() {
  const lenis = useLenis();

  const handleClick = () => {
    scrollToElement(lenis, '#section', { offset: -100 });
    // أو
    scrollToTop(lenis);
  };

  return <button onClick={handleClick}>Scroll</button>;
}
```

---

### GSAP Context

**الاستخدام**:
```tsx
'use client';

import { createGSAPContext, animations } from '@/lib/animations/gsap';
import { useEffect, useRef } from 'react';

function MyComponent() {
  const ref = useRef<HTMLDivElement>(null);
  const ctx = createGSAPContext();

  useEffect(() => {
    if (ref.current) {
      ctx.from(ref.current, animations.fadeInUp);
    }

    return () => ctx.cleanup();
  }, []);

  return <div ref={ref}>Content</div>;
}
```

---

## 📝 أمثلة عملية

### Example 1: Hero Section with Parallax
```tsx
<section className="relative min-h-screen">
  <ParallaxBackground speed={0.3}>
    <div className="absolute inset-0 bg-cover" style={{ backgroundImage: 'url(/hero.jpg)' }} />
  </ParallaxBackground>

  <div className="relative z-10">
    <h1>Title</h1>
  </div>
</section>
```

### Example 2: Services Grid with Stagger
```tsx
<ScrollReveal animation="scaleIn" stagger={0.1}>
  <div className="grid grid-cols-3 gap-4">
    {services.map((service) => (
      <div key={service.id}>{service.name}</div>
    ))}
  </div>
</ScrollReveal>
```

### Example 3: Custom GSAP Animation
```tsx
'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

function CustomAnimation() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    gsap.fromTo(
      ref.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 80%',
        },
      }
    );
  }, []);

  return <div ref={ref}>Content</div>;
}
```

---

## ⚙️ الإعدادات

### Lenis Config
```typescript
// في lib/animations/lenis.ts
export const lenisConfig = {
  duration: 1.2,
  easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,
  wheelMultiplier: 1,
};
```

### ScrollTrigger Config
```typescript
// في lib/animations/gsap.ts
export const scrollTriggerConfig = {
  start: 'top 80%',
  end: 'bottom 20%',
  toggleActions: 'play none none reverse',
};
```

---

## 🎨 Animation Presets

### المتاحة في `lib/animations/gsap.ts`:
- `fadeIn` - Fade in
- `fadeInUp` - Fade in from bottom
- `fadeInDown` - Fade in from top
- `scaleIn` - Scale in
- `slideInLeft` - Slide from left
- `slideInRight` - Slide from right

---

## 💡 نصائح

1. **استخدم `once={true}`** للعناصر التي تظهر مرة واحدة فقط
2. **استخدم `stagger`** للعناصر المتعددة لتأثير أفضل
3. **استخدم `ParallaxBackground`** للخلفيات فقط
4. **استخدم `Parallax`** للعناصر الفردية
5. **اختبر على Mobile** - بعض Animations قد تحتاج تعديل

---

## 🐛 Troubleshooting

### المشكلة: Animations لا تعمل
- ✅ تأكد من أن LenisProvider موجود في Layout
- ✅ تأكد من أن GSAP plugins مسجلة
- ✅ تحقق من Console للأخطاء

### المشكلة: ScrollTrigger لا يعمل
- ✅ تأكد من Integration بين GSAP & Lenis
- ✅ تحقق من أن Lenis يعمل بشكل صحيح
- ✅ استخدم `ScrollTrigger.refresh()` بعد تغييرات DOM

---

**جاهز للاستخدام!** 🚀


