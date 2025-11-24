# 🎨 الهوية البصرية - Belqees Media

**تاريخ التطبيق**: 2024-11-24

---

## 🎨 الألوان

### الألوان الأساسية:
- **الخلفية**: أبيض `#FFFFFF`
- **النص**: أسود `#000000` / رمادي داكن `#333333`
- **اللون الثانوي**: أحمر `#D90000`

### استخدام الألوان في Tailwind:
```typescript
// Primary (أحمر)
primary: '#D90000'
primary-600: '#b30000'

// Dark (أسود)
dark: '#000000'
dark-light: '#333333'
```

---

## 🔤 الخطوط

### العربية:
- **Cairo** (الافتراضي)
- **Tajawal** (بديل)

### الإنجليزية:
- **Poppins** (الافتراضي)
- **Roboto** (بديل)

### التطبيق:
- RTL (العربية): Cairo
- LTR (الإنجليزية): Poppins

---

## 🏷️ الشعار

### التصميم:
- رمز "b" أنيق باللون الأسود
- جزء مميز باللون الأحمر (نقطة صغيرة)

### الاستخدام:
```tsx
<div className="flex items-center gap-2">
  <div className="relative">
    <span className="text-3xl font-bold text-dark">b</span>
    <span className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full"></span>
  </div>
  <span className="text-xl font-bold text-dark">Belqees Media</span>
</div>
```

---

## 📐 التصميم العام

### المبادئ:
- ✅ تصميم نظيف واحترافي
- ✅ يعتمد على المساحات البيضاء
- ✅ تخطيط شبكي (Grid Layout) واضح
- ✅ استخدام Flexbox و CSS Grid

### المسافات:
- Sections: `py-16` أو `py-20`
- Container: `container mx-auto px-4`
- Gaps: `gap-6` أو `gap-8`

---

## 📄 الصفحات

### 1. الصفحة الرئيسية (Home):
- ✅ Hero Section مع فيديو/صورة
- ✅ من نحن (About Snippet)
- ✅ الخدمات (Services Overview)
- ✅ الشركاء (Partners)
- ✅ Footer

### 2. من نحن (About):
- ✅ مقدمة تفصيلية
- ✅ معلومات عن قناة بلقيس
- ✅ أنظمة البث والإعلام
- ✅ معرض الصور

### 3. الخدمات (Services):
- ✅ البث المباشر
- ✅ إنتاج الفعاليات المباشرة
- ✅ الإنتاج الإعلامي
- ✅ تصميم وإعداد الاستوديوهات
- ✅ الاستشارات التقنية
- ✅ التدريب والتطوير

### 4. الفعاليات (Events):
- ✅ عرض الفعاليات
- ✅ أمثلة من المشاريع

### 5. اتصل بنا (Contact):
- ✅ نموذج اتصال
- ✅ معلومات الاتصال:
  - Email: Contact@belqeesmedia.com
  - Phone: +90 (212) 412 20 60
  - Phone: +90 (850) 811 33 66
- ✅ روابط التواصل الاجتماعي

---

## 🎯 العناصر التفاعلية

### Navigation:
- ✅ Sticky Navigation (ثابت عند التمرير)
- ✅ Hover Effects على الروابط
- ✅ Mobile Menu

### Buttons:
- ✅ Primary: أحمر `#D90000`
- ✅ Secondary: أسود `#000000`
- ✅ Outline: حدود حمراء
- ✅ Ghost: نص أحمر

### Forms:
- ✅ Input Fields مع تصميم نظيف
- ✅ Focus States باللون الأحمر
- ✅ Error States

---

## 📱 Responsive Design

### Breakpoints:
- Mobile: `< 768px`
- Tablet: `768px - 1024px`
- Desktop: `> 1024px`

### المبادئ:
- ✅ Mobile-first approach
- ✅ Grid Layout متجاوب
- ✅ Typography متجاوب
- ✅ Images متجاوبة

---

## ✅ الملفات المحدثة

1. ✅ `tailwind.config.ts` - الألوان والخطوط
2. ✅ `app/globals.css` - CSS Variables
3. ✅ `app/layout.tsx` - الخطوط
4. ✅ `components/organisms/Header.tsx` - الشعار والتصميم
5. ✅ `components/organisms/Footer.tsx` - معلومات الاتصال
6. ✅ `components/blocks/HeroBlock.tsx` - Hero Section
7. ✅ `components/atoms/Button.tsx` - الألوان الجديدة
8. ✅ `app/(main)/page.tsx` - الصفحة الرئيسية
9. ✅ `app/(main)/about/page.tsx` - صفحة من نحن
10. ✅ `app/(main)/services/page.tsx` - صفحة الخدمات
11. ✅ `app/(main)/events/page.tsx` - صفحة الفعاليات
12. ✅ `app/(main)/contact/page.tsx` - صفحة الاتصال

---

## 🎨 المكونات الجديدة

### HeroBlock:
- يدعم فيديو/صورة خلفية
- نص أبيض على خلفية داكنة
- CTA Button باللون الأحمر

### Header:
- شعار "b" مع نقطة حمراء
- Navigation نظيف
- Sticky عند التمرير

### Footer:
- معلومات الاتصال الكاملة
- روابط التواصل الاجتماعي
- تصميم داكن احترافي

---

**تم تطبيق الهوية البصرية بنجاح!** ✅

