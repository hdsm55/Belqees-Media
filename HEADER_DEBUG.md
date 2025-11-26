# دليل فحص مشكلة الهيدر (Header)

## الملفات المتعلقة بالهيدر:

### 1. مكون الهيدر الرئيسي:
📁 `components/organisms/Header.tsx`
- السطر 20-34: العنصر `<header>` مع الـ styles
- السطر 21: `className` يحتوي على `z-[99999]` و `sticky top-0`
- السطر 22-33: `style` object مع `zIndex: 99999` و `position: 'sticky'`

### 2. Layout الذي يستخدم الهيدر:
📁 `app/(main)/layout.tsx`
- السطر 12: `<Header />` - هنا يتم استدعاء الهيدر
- السطر 11: `<div className="min-h-screen flex flex-col relative">` - الـ wrapper
- السطر 13: `<main>` مع `zIndex: 1` - يجب أن يكون أقل من الهيدر

### 3. CSS العام:
📁 `app/globals.css`
- السطور 58-72: قواعد CSS للهيدر مع `!important`
- السطور 79-88: قواعد إضافية لـ `body > div > header`
- السطور 90-95: قواعد لمنع الأقسام من تغطية الهيدر

### 4. Hero Section (قد يغطي الهيدر):
📁 `components/blocks/HeroBlock.tsx`
- السطر 152: `<section className="hero-section ..." style={{ zIndex: 0 }}>`
- يجب أن يكون `zIndex: 0` أو أقل من الهيدر

### 5. Page Transition (قد يؤثر):
📁 `components/animations/PageTransition.tsx`
- يستخدم Framer Motion
- قد يؤثر على الـ stacking context

---

## خطوات الفحص:

### 1. فحص في المتصفح (Browser DevTools):
```javascript
// افتح Console في المتصفح وجرب:
document.querySelector('header')
// يجب أن يعيد العنصر

// تحقق من الـ styles المطبقة:
window.getComputedStyle(document.querySelector('header'))
// ابحث عن: position, zIndex, display, visibility, opacity

// تحقق من العناصر التي قد تغطي الهيدر:
document.querySelector('header').getBoundingClientRect()
// ثم قارن مع:
document.querySelector('.hero-section').getBoundingClientRect()
```

### 2. فحص في الكود:

#### أ) تأكد أن الهيدر مستورد بشكل صحيح:
- `app/(main)/layout.tsx` السطر 1: `import Header from '@/components/organisms/Header';`
- `app/(main)/layout.tsx` السطر 12: `<Header />`

#### ب) تأكد من الـ z-index:
- الهيدر: `z-index: 99999` أو `z-[99999]`
- Hero Section: `z-index: 0` أو أقل
- Main: `z-index: 1`

#### ج) تأكد من الـ position:
- الهيدر: `position: sticky` أو `position: fixed`
- Hero Section: `position: relative`

#### د) تأكد من عدم وجود `overflow: hidden` على الـ parent:
- تحقق من `app/(main)/layout.tsx`
- تحقق من `app/layout.tsx`

---

## حلول محتملة:

### الحل 1: تغيير position من sticky إلى fixed
في `components/organisms/Header.tsx`:
```tsx
style={{
  position: 'fixed', // بدلاً من 'sticky'
  top: 0,
  // ... باقي الـ styles
}}
```

ثم أضف `padding-top` للـ main content:
في `app/(main)/layout.tsx`:
```tsx
<main className="flex-1 relative pt-16 md:pt-20" style={{ zIndex: 1 }}>
```

### الحل 2: إزالة PageTransition مؤقتاً
في `app/(main)/layout.tsx`:
```tsx
<main className="flex-1 relative" style={{ zIndex: 1 }}>
  {children} {/* بدلاً من <PageTransition>{children}</PageTransition> */}
</main>
```

### الحل 3: إضافة wrapper للهيدر
في `app/(main)/layout.tsx`:
```tsx
<div className="fixed top-0 left-0 right-0 z-[99999]">
  <Header />
</div>
<main className="flex-1 relative pt-16 md:pt-20" style={{ zIndex: 1 }}>
```

---

## نقاط مهمة للفحص:

1. ✅ هل الهيدر موجود في DOM؟ (استخدم DevTools)
2. ✅ هل الـ styles مطبقة بشكل صحيح؟
3. ✅ هل هناك عنصر آخر يغطي الهيدر؟
4. ✅ هل الـ z-index صحيح؟
5. ✅ هل الـ position صحيح؟
6. ✅ هل هناك `overflow: hidden` يخفي الهيدر؟
7. ✅ هل PageTransition يؤثر على الـ stacking context؟

---

## ملفات إضافية للفحص:

- `app/layout.tsx` - الـ root layout
- `tailwind.config.ts` - إعدادات Tailwind
- أي ملف CSS إضافي قد يؤثر

