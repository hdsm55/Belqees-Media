# دليل عرض الأيقونة - AdvertisingIcon

## 📋 نظرة عامة

الأيقونة `AdvertisingIcon` (مكبر الصوت مع النقطة الحمراء المتوهجة) تستخدم في المشروع مع تأثيرات CSS خاصة.

## 🎨 كيف تظهر الأيقونة

### 1. البنية الأساسية

الأيقونة موجودة في: `components/icons/CustomIcons.tsx`

```tsx
<AdvertisingIcon
  className="w-full h-full"
  stroke="currentColor"
  redDotColor="#FC473C"
  aria-hidden="true"
/>
```

### 2. التأثيرات CSS

#### أ. النقطة الحمراء المتوهجة (Red Dot Glow)

في `app/globals.css`، هناك animation خاصة للنقطة الحمراء:

```css
/* Recording Dot Animation for SVG elements */
@keyframes recordingPulseSvg {
  0%, 100% {
    opacity: 1;
    filter: drop-shadow(0 0 4px rgba(217, 0, 0, 0.8))
            drop-shadow(0 0 8px rgba(217, 0, 0, 0.4));
  }
  50% {
    opacity: 0.7;
    filter: drop-shadow(0 0 6px rgba(217, 0, 0, 1))
            drop-shadow(0 0 12px rgba(217, 0, 0, 0.6));
  }
}

.recording-dot,
[class*="recording-dot"] {
  animation: recordingPulseSvg 1.5s ease-in-out infinite;
}
```

#### ب. خصائص النقطة الحمراء

- **اللون**: `#FC473C` (أحمر فاتح)
- **الموقع**: على يسار مكبر الصوت (في SVG: `cx="6" cy="22.5"`)
- **الحجم**: دائرة بنصف قطر `6`
- **التأثير**: لمعة نابضة مستمرة (pulsing glow)

### 3. الاستخدام في الصفحة

الأيقونة تستخدم في `HomePageContent.tsx` داخل `ServiceCard`:

```tsx
<ServiceCard
  title={t('services.advertising.title')}
  description={t('services.advertising.description')}
  icon={
    <AdvertisingIcon
      className="w-full h-full"
      stroke="currentColor"
      redDotColor="#FC473C"
      aria-hidden="true"
    />
  }
/>
```

## 🎯 التأثيرات المرئية

### 1. النقطة الحمراء
- ✅ تلمع بشكل مستمر (pulsing animation)
- ✅ لها ظل متوهج أحمر
- ✅ تتغير شدة اللمعان بين 50% و 100%
- ✅ Animation duration: 1.5 ثانية
- ✅ Animation timing: ease-in-out
- ✅ Animation iteration: infinite (مستمرة)

### 2. مكبر الصوت
- ✅ خطوط سوداء (stroke)
- ✅ تصميم بسيط وحديث
- ✅ متجاوب مع حجم الحاوية

## 🔧 التخصيص

### تغيير لون النقطة

```tsx
<AdvertisingIcon
  redDotColor="#FF0000" // لون مختلف
  // ...
/>
```

### تعطيل التأثير

لتعطيل تأثير اللمعان، يمكن إضافة CSS:

```css
.recording-dot {
  animation: none !important;
}
```

### تغيير سرعة اللمعان

```css
.recording-dot {
  animation-duration: 2s; /* أبطأ */
  /* أو */
  animation-duration: 0.5s; /* أسرع */
}
```

## 📱 التوافق

- ✅ يعمل على جميع المتصفحات الحديثة
- ✅ متجاوب مع جميع أحجام الشاشات
- ✅ يدعم Dark Mode
- ✅ يدعم RTL (العربية)

## 🎨 الألوان المستخدمة

- **النقطة الحمراء**: `#FC473C`
- **الظل المتوهج**: `rgba(217, 0, 0, 0.4-0.8)`
- **مكبر الصوت**: `currentColor` (يتكيف مع لون النص)

## 📝 ملاحظات

1. النقطة الحمراء لها class `recording-dot` في SVG
2. التأثير يعمل تلقائياً عند تحميل الصفحة
3. يمكن تخصيص الألوان والسرعة حسب الحاجة
4. التأثير محسّن للأداء باستخدام CSS animations

---

**آخر تحديث**: {{ date }}

