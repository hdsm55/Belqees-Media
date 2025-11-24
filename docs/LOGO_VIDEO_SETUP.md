# 🎨 إعداد الشعار والفيديو - Belqees Media

**تاريخ**: 2024-11-24

---

## 📁 المسارات والأسماء المطلوبة

### 1. الشعار (Logo) 🎨

**المسار**: `public/images/logo.png`

**الاسم**: `logo.png`

**الأحجام الموصى بها**:
- **Logo في Header**: 120x48px (أو نسبة 2.5:1)
- **Favicon**: 32x32px أو 64x64px (سيتم تحويله تلقائياً)
- **Apple Touch Icon**: 180x180px

**الخطوات**:
1. ضع ملف الشعار في: `public/images/logo.png`
2. إذا كان الشعار بأحجام مختلفة، يمكنك:
   - `logo.png` - للاستخدام العام
   - `logo-icon.png` - للـ favicon (32x32 أو 64x64)
   - `logo-apple.png` - لـ Apple Touch Icon (180x180)

---

### 2. الفيديو الترحيبي (Hero Video) 🎬

**المسار**: `public/videos/hero-video.mp4`

**الاسم**: `hero-video.mp4`

**المواصفات الموصى بها**:
- **الصيغة**: MP4 (H.264)
- **الحجم**: أقل من 5MB للأداء الأفضل
- **المدة**: 15-30 ثانية (لأنه متكرر)
- **الدقة**: 1920x1080 (Full HD) أو أقل
- **الصوت**: صامت (Muted) - إعلان صامت

**الخطوات**:
1. ضع ملف الفيديو في: `public/videos/hero-video.mp4`
2. يمكنك أيضاً إضافة نسخة WebM: `public/videos/hero-video.webm` (اختياري)

---

## 🎯 الخيارات المتاحة

### الخيار 1: فيديو محلي (موصى به) ✅

**المزايا**:
- ✅ أداء أفضل
- ✅ تحكم كامل
- ✅ لا يعتمد على YouTube
- ✅ يعمل بدون إنترنت

**المسار**: `public/videos/hero-video.mp4`

**الاستخدام**:
```tsx
<HeroBlock
  title="Belqees Media"
  backgroundVideo="/videos/hero-video.mp4"
  videoLoop={true}
  videoMuted={true}
/>
```

---

### الخيار 2: YouTube Video

**المزايا**:
- ✅ لا يحتاج مساحة تخزين
- ✅ سهولة التحديث
- ⚠️ يعتمد على YouTube
- ⚠️ قد يكون أبطأ

**الاستخدام**:
```tsx
<HeroBlock
  title="Belqees Media"
  youtubeVideoId="YOUR_VIDEO_ID"
  videoLoop={true}
  videoMuted={true}
/>
```

**كيفية الحصول على Video ID**:
- من رابط YouTube: `https://www.youtube.com/watch?v=VIDEO_ID`
- Video ID هو الجزء بعد `v=`

---

## 📝 الملفات المطلوبة

### هيكل المجلدات:
```
public/
├── images/
│   └── logo.png          # الشعار الرئيسي
│   └── logo-icon.png     # Favicon (اختياري)
│   └── logo-apple.png    # Apple Touch Icon (اختياري)
└── videos/
    └── hero-video.mp4     # الفيديو الترحيبي
    └── hero-video.webm    # نسخة WebM (اختياري)
```

---

## 🔧 التحديثات المطبقة

### 1. Header Component ✅
- ✅ استخدام الشعار من `/images/logo.png`
- ✅ Responsive (يخفي النص على Mobile)
- ✅ Alt text للـ accessibility

### 2. Layout (Favicon) ✅
- ✅ Favicon من `/images/logo.png`
- ✅ Apple Touch Icon
- ✅ Shortcut Icon

### 3. HeroBlock Component ✅
- ✅ دعم الفيديو المحلي (`backgroundVideo`)
- ✅ دعم YouTube (`youtubeVideoId`)
- ✅ خيارات Loop & Muted
- ✅ Fallback للصورة

---

## 🎬 كيفية الاستخدام

### في Home Page:

```tsx
// مع فيديو محلي
<HeroBlock
  title="Belqees Media"
  subtitle="شركة إنتاج إعلامي متكاملة الخدمات"
  description="..."
  backgroundVideo="/videos/hero-video.mp4"
  videoLoop={true}
  videoMuted={true}
/>

// أو مع YouTube
<HeroBlock
  title="Belqees Media"
  subtitle="شركة إنتاج إعلامي متكاملة الخدمات"
  description="..."
  youtubeVideoId="YOUR_VIDEO_ID"
  videoLoop={true}
  videoMuted={true}
/>
```

---

## 📋 قائمة المهام

### يجب عليك:

1. ✅ **الشعار**:
   - [ ] ضع `logo.png` في `public/images/logo.png`
   - [ ] (اختياري) `logo-icon.png` للـ favicon
   - [ ] (اختياري) `logo-apple.png` لـ Apple

2. ✅ **الفيديو**:
   - [ ] ضع `hero-video.mp4` في `public/videos/hero-video.mp4`
   - [ ] (اختياري) `hero-video.webm` للدعم الأفضل

3. ✅ **التحديث**:
   - [ ] تحديث `app/(main)/page.tsx` لاستخدام الفيديو

---

## 💡 نصائح

### للشعار:
- استخدم PNG مع خلفية شفافة
- احفظ بأعلى جودة
- تأكد من الوضوح في الأحجام الصغيرة

### للفيديو:
- استخدم أدوات ضغط الفيديو لتقليل الحجم
- تأكد من أن الفيديو صامت (Muted)
- استخدم دقة مناسبة (Full HD كافٍ)
- مدة 15-30 ثانية مثالية للـ loop

---

## 🚀 بعد إضافة الملفات

بعد وضع الملفات في المسارات المحددة:
1. الشعار سيظهر تلقائياً في Header
2. Favicon سيظهر في تبويبة المتصفح
3. يمكنك استخدام الفيديو في HeroBlock

---

**جاهز للاستخدام!** ✅

