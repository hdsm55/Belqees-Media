# Belqees Media - Frontend

واجهة المستخدم للمنصة الرقمية بلقيس ميديا، مبنية على React + TypeScript + Tailwind CSS.

## 🚀 البدء السريع

```bash
# تثبيت dependencies
npm install

# تشغيل في وضع التطوير
npm run dev

# بناء للإنتاج
npm run build

# معاينة البناء
npm run preview
```

## 📁 هيكل المشروع

```
src/
├── components/          # المكونات القابلة لإعادة الاستخدام
│   ├── atoms/          # المكونات الأساسية
│   ├── molecules/      # المكونات المركبة
│   ├── organisms/      # المكونات المعقدة
│   └── blocks/         # Blocks الخاصة بالصفحات
├── pages/              # صفحات الموقع
├── layouts/            # التخطيطات
├── hooks/              # Custom Hooks
├── store/              # State Management (Zustand)
├── services/           # API Services
├── utils/              # Utilities
├── styles/             # Global Styles
├── locales/            # ملفات الترجمة
│   ├── ar/
│   ├── en/
│   └── tr/
└── types/              # TypeScript Types
```

## 🛠️ التقنيات

- **React 18+** مع TypeScript
- **Tailwind CSS 3+** للتصميم
- **GSAP** للحركات السينمائية
- **Framer Motion** للحركات التفاعلية
- **Lenis** للتمرير السلس
- **React Router v6** للتنقل
- **i18next** لدعم متعدد اللغات
- **Zustand** لإدارة الحالة
- **Vite** كأداة البناء

## 🌐 دعم متعدد اللغات

المشروع يدعم ثلاث لغات:
- العربية (ar) - الافتراضية
- الإنجليزية (en)
- التركية (tr)

## 📝 Scripts

- `npm run dev` - تشغيل في وضع التطوير
- `npm run build` - بناء للإنتاج
- `npm run preview` - معاينة البناء
- `npm run lint` - فحص الكود
- `npm run format` - تنسيق الكود

