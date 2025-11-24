# إصلاح مشكلة التثبيت - Belqees Media

## ⚠️ المشكلة

عند تشغيل `npm run dev` من الجذر، يظهر الخطأ:
```
'next' is not recognized as an internal or external command
```

## ✅ الحل

### السبب:
- `node_modules` في الجذر لم يكن يحتوي على جميع الـ dependencies
- أو تم التثبيت في مجلد خاطئ

### الحل:

```bash
# 1. حذف node_modules و package-lock.json
Remove-Item -Recurse -Force node_modules
Remove-Item -Force package-lock.json

# 2. إعادة التثبيت
npm install
```

أو تثبيت الـ dependencies يدوياً:

```bash
# Dependencies
npm install next react react-dom @supabase/supabase-js @supabase/ssr @prisma/client prisma framer-motion gsap lenis zod clsx tailwind-merge lucide-react --save

# Dev Dependencies
npm install @types/node @types/react @types/react-dom typescript autoprefixer postcss tailwindcss eslint eslint-config-next prettier --save-dev
```

---

## ✅ التحقق

بعد التثبيت، تحقق:

```bash
# التحقق من وجود next
if (Test-Path "node_modules\next") { Write-Host "SUCCESS" }

# تشغيل المشروع
npm run dev
```

---

## 📝 ملاحظات

1. **تأكد من أنك في الجذر** وليس في `app/`
2. **تأكد من وجود `package.json`** في الجذر
3. **بعد التثبيت**، يجب أن يكون `node_modules` يحتوي على مئات الحزم

---

**تم الإصلاح!** ✅

