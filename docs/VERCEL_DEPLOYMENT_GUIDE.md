# 🚀 دليل النشر على Vercel - Belqees Media

**تاريخ:** 2024
**الحالة:** ✅ جاهز للنشر

---

## ✅ التحقق من الجاهزية

### 1. البناء (Build)
- ✅ **نجح بدون أخطاء**
- ✅ جميع الملفات جاهزة
- ✅ TypeScript compilation نجح

### 2. الإعدادات
- ✅ `next.config.js` - مُعد بشكل صحيح
- ✅ `package.json` - يحتوي على جميع scripts المطلوبة
- ✅ `output: 'standalone'` - جاهز للنشر

### 3. الأمان
- ✅ CSRF Protection
- ✅ XSS Protection (Content Sanitization)
- ✅ Rate Limiting
- ✅ Security Headers

---

## 📋 متطلبات النشر

### 1. حساب Vercel
- إنشاء حساب على [vercel.com](https://vercel.com)
- ربط حساب GitHub/GitLab/Bitbucket

### 2. متغيرات البيئة (Environment Variables)

يجب إضافة المتغيرات التالية في Vercel Dashboard:

#### متغيرات Supabase (مطلوبة)
```
NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key
```

#### متغيرات قاعدة البيانات (مطلوبة)
```
DATABASE_URL=postgresql://postgres.xxx:password@aws-1-ap-south-1.pooler.supabase.com:6543/postgres?pgbouncer=true&sslmode=require
```

**⚠️ مهم:** استخدم **Session Pooler** (port 6543) وليس Direct Connection (port 5432)

#### متغيرات Next.js (مطلوبة)
```
NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app
```

#### متغيرات اختيارية
```
NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET=media
```

#### متغيرات Upstash Redis (اختيارية - للـ Rate Limiting)
إذا كنت تستخدم Upstash Redis للـ Rate Limiting:
```
UPSTASH_REDIS_REST_URL=your-upstash-redis-url
UPSTASH_REDIS_REST_TOKEN=your-upstash-redis-token
```

**ملاحظة:** إذا لم تضيف Upstash Redis، سيستخدم النظام Memory Store (يعمل بشكل جيد لكن لا يعمل عبر multiple instances).

---

## 🚀 خطوات النشر

### الطريقة 1: النشر من GitHub (موصى به)

1. **دفع الكود إلى GitHub**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **ربط المشروع في Vercel**
   - اذهب إلى [vercel.com/new](https://vercel.com/new)
   - اختر "Import Git Repository"
   - اختر مستودع GitHub الخاص بك
   - اضغط "Import"

3. **إعداد المشروع**
   - **Framework Preset:** Next.js (سيتم اكتشافه تلقائياً)
   - **Root Directory:** `./` (افتراضي)
   - **Build Command:** `npm run build` (افتراضي)
   - **Output Directory:** `.next` (افتراضي)
   - **Install Command:** `npm install` (افتراضي)

4. **إضافة متغيرات البيئة**
   - اضغط "Environment Variables"
   - أضف جميع المتغيرات المذكورة أعلاه
   - تأكد من إضافة نفس المتغيرات لـ:
     - Production
     - Preview
     - Development (اختياري)

5. **النشر**
   - اضغط "Deploy"
   - انتظر حتى يكتمل البناء
   - ✅ الموقع جاهز!

---

### الطريقة 2: النشر باستخدام Vercel CLI

1. **تثبيت Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **تسجيل الدخول**
   ```bash
   vercel login
   ```

3. **النشر**
   ```bash
   vercel
   ```

4. **إضافة متغيرات البيئة**
   ```bash
   vercel env add NEXT_PUBLIC_SUPABASE_URL
   vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
   vercel env add SUPABASE_SERVICE_ROLE_KEY
   vercel env add DATABASE_URL
   vercel env add NEXT_PUBLIC_APP_URL
   ```

5. **النشر للإنتاج**
   ```bash
   vercel --prod
   ```

---

## 🔧 إعدادات إضافية

### 1. Build Command
في Vercel Dashboard → Settings → Build & Development Settings:
```
Build Command: npm run build
```

### 2. Install Command
```
Install Command: npm install
```

### 3. Node.js Version
تأكد من أن Node.js version >= 18.0.0:
- في `package.json`:
  ```json
  "engines": {
    "node": ">=18.0.0",
    "npm": ">=9.0.0"
  }
  ```

### 4. Prisma Generate
Vercel سيقوم تلقائياً بتشغيل `prisma generate` أثناء البناء إذا كان Prisma موجوداً.

---

## 🗄️ إعداد قاعدة البيانات

### قبل النشر:
1. **تأكد من أن Migrations جاهزة**
   ```bash
   npm run db:migrate
   ```

2. **تأكد من أن Prisma Client محدث**
   ```bash
   npm run db:generate
   ```

### في Vercel:
- Vercel سيقوم تلقائياً بتشغيل `prisma generate` أثناء البناء
- **لا حاجة** لتشغيل migrations في Vercel (يجب أن تكون قاعدة البيانات جاهزة)

---

## ✅ التحقق بعد النشر

### 1. اختبار الصفحة الرئيسية
- افتح `https://your-domain.vercel.app`
- تأكد من أن الصفحة تعمل

### 2. اختبار API Routes
- افتح `https://your-domain.vercel.app/api/health`
- يجب أن ترى: `{"success":true,"data":{"status":"ok",...}}`

### 3. اختبار قاعدة البيانات
- افتح `https://your-domain.vercel.app/api/test-db` (إذا كان موجوداً)
- أو جرب أي صفحة تستخدم قاعدة البيانات

### 4. اختبار لوحة التحكم
- افتح `https://your-domain.vercel.app/dashboard`
- تأكد من أن Authentication يعمل

---

## 🐛 حل المشاكل الشائعة

### 1. خطأ: "Database connection failed"
**الحل:**
- تأكد من أن `DATABASE_URL` يستخدم Session Pooler (port 6543)
- تأكد من أن `pgbouncer=true&sslmode=require` موجود في الـ URL

### 2. خطأ: "Prisma Client not generated"
**الحل:**
- أضف `prisma generate` في Build Command:
  ```
  Build Command: npm run db:generate && npm run build
  ```

### 3. خطأ: "Environment variable not found"
**الحل:**
- تأكد من إضافة جميع المتغيرات في Vercel Dashboard
- تأكد من أن المتغيرات مضافة لـ Production environment

### 4. خطأ: "Rate limit error"
**الحل:**
- إذا كنت تستخدم Upstash Redis، تأكد من إضافة:
  - `UPSTASH_REDIS_REST_URL`
  - `UPSTASH_REDIS_REST_TOKEN`
- إذا لم تضيفها، سيستخدم Memory Store (يعمل لكن لا يعمل عبر multiple instances)

---

## 📊 مراقبة الأداء

### 1. Vercel Analytics
- تفعيل Vercel Analytics من Dashboard
- مراقبة الأداء والأخطاء

### 2. Logs
- عرض Logs من Vercel Dashboard → Deployments → [Deployment] → Logs

### 3. Real User Monitoring
- استخدام Vercel Speed Insights
- مراقبة Core Web Vitals

---

## 🔒 الأمان

### 1. Environment Variables
- ✅ لا تضع secrets في الكود
- ✅ استخدم Vercel Environment Variables فقط

### 2. Security Headers
- ✅ موجودة في `next.config.js`
- ✅ X-Frame-Options, X-Content-Type-Options, etc.

### 3. CSRF Protection
- ✅ موجود في جميع API routes

### 4. XSS Protection
- ✅ Content Sanitization موجود

---

## 📝 Checklist قبل النشر

- [ ] جميع متغيرات البيئة مضافة في Vercel
- [ ] `DATABASE_URL` يستخدم Session Pooler (port 6543)
- [ ] `NEXT_PUBLIC_APP_URL` محدث لـ Production URL
- [ ] قاعدة البيانات جاهزة و migrations منفذة
- [ ] Prisma Client محدث (`npm run db:generate`)
- [ ] البناء نجح محلياً (`npm run build`)
- [ ] اختبار الموقع محلياً (`npm run start`)
- [ ] الكود موجود في GitHub/GitLab/Bitbucket

---

## 🎯 بعد النشر

### 1. تحديث Domain
- إذا كان لديك domain مخصص:
  - اذهب إلى Vercel Dashboard → Settings → Domains
  - أضف domain الخاص بك
  - اتبع التعليمات لإعداد DNS

### 2. SSL Certificate
- Vercel يوفر SSL تلقائياً
- لا حاجة لإعداد SSL يدوياً

### 3. Custom Domain
- إضافة custom domain من Vercel Dashboard
- تحديث `NEXT_PUBLIC_APP_URL` في Environment Variables

---

## 📚 موارد إضافية

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Prisma Deployment](https://www.prisma.io/docs/guides/deployment)

---

## ✅ الخلاصة

**الموقع جاهز للنشر على Vercel!**

**الخطوات السريعة:**
1. ✅ الكود جاهز
2. ✅ البناء نجح
3. ⏭️ إضافة متغيرات البيئة في Vercel
4. ⏭️ النشر من GitHub أو CLI
5. ⏭️ اختبار الموقع

---

**آخر تحديث:** 2024
**الحالة:** ✅ جاهز للنشر


