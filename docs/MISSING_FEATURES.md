# النواقص والميزات المطلوبة - Belqees Media

## 📋 نظرة عامة

هذا المستند يوضح جميع النواقص والميزات المطلوبة في المشروع الحالي. تم تصنيفها حسب الأولوية والأهمية.

---

## 🔴 أولوية عالية (Critical)

### 1. صفحة Portfolio
**الحالة**: ❌ غير موجودة
**الأهمية**: عالية جداً
**الوصف**:
- لا توجد صفحة `/portfolio` رغم وجود رابط في الصفحة الرئيسية
- البيانات hardcoded في `HomePageContent.tsx`
- يوجد API route و schema في Prisma لكن لا يوجد صفحة

**المطلوب**:
- [ ] إنشاء صفحة `app/(main)/portfolio/page.tsx`
- [ ] ربط البيانات من API بدلاً من hardcoded
- [ ] إضافة صفحة تفاصيل `app/(main)/portfolio/[slug]/page.tsx`
- [ ] إضافة filtering و sorting
- [ ] إضافة pagination

---

### 2. ربط البيانات من API
**الحالة**: ⚠️ جزئي
**الأهمية**: عالية جداً
**الوصف**:
- البيانات في `HomePageContent.tsx` hardcoded:
  - المشاريع (Portfolio items)
  - العملاء (Clients)
  - الإحصائيات (Stats)
- يوجد API routes لكن لا يتم استخدامها

**المطلوب**:
- [ ] ربط Portfolio من API
- [ ] ربط Clients من API
- [ ] ربط Stats من API (أو إبقاؤها static إذا كانت ثابتة)
- [ ] إضافة loading states
- [ ] إضافة error handling

---

### 3. صفحة Blog/News
**الحالة**: ❌ غير موجودة
**الأهمية**: عالية
**الوصف**:
- يوجد schema في Prisma (`BlogPost`, `Category`, `Tag`)
- يوجد API routes (`/api/blog`)
- لكن لا توجد صفحات frontend

**المطلوب**:
- [ ] إنشاء صفحة `app/(main)/blog/page.tsx`
- [ ] إنشاء صفحة تفاصيل `app/(main)/blog/[slug]/page.tsx`
- [ ] إضافة categories و tags
- [ ] إضافة search functionality
- [ ] إضافة pagination

---

### 4. Manifest.json للـ PWA
**الحالة**: ❌ غير موجود
**الأهمية**: متوسطة-عالية
**الوصف**:
- الموقع يحتاج manifest.json للعمل كـ Progressive Web App
- تم الإشارة إليه في `app/layout.tsx` لكن الملف غير موجود

**المطلوب**:
- [ ] إنشاء `app/manifest.ts` أو `public/manifest.json`
- [ ] إضافة icons بجميع الأحجام
- [ ] إضافة theme colors
- [ ] إضافة display mode

---

### 5. Email Service Integration
**الحالة**: ❌ غير موجود
**الأهمية**: عالية
**الوصف**:
- Contact form يحفظ في قاعدة البيانات فقط
- لا يتم إرسال إيميل للمستخدم أو للإدارة

**المطلوب**:
- [ ] إضافة خدمة إيميل (Resend, SendGrid, أو Supabase Email)
- [ ] إرسال confirmation email للمستخدم
- [ ] إرسال notification email للإدارة
- [ ] إضافة email templates

---

## 🟡 أولوية متوسطة (Important)

### 6. Analytics & Tracking
**الحالة**: ❌ غير موجود
**الأهمية**: متوسطة
**الوصف**:
- لا يوجد Google Analytics
- لا يوجد أي tracking للأداء أو السلوك

**المطلوب**:
- [ ] إضافة Google Analytics 4
- [ ] إضافة event tracking
- [ ] إضافة conversion tracking
- [ ] إضافة privacy-compliant tracking

---

### 7. Error Tracking
**الحالة**: ❌ غير موجود
**الأهمية**: متوسطة
**الوصف**:
- لا يوجد Sentry أو أي error tracking service
- الأخطاء تُسجل في console فقط

**المطلوب**:
- [ ] إضافة Sentry أو similar service
- [ ] تتبع الأخطاء في production
- [ ] إشعارات للأخطاء الحرجة
- [ ] Error boundaries محسّنة

---

### 8. Rate Limiting
**الحالة**: ❌ غير موجود
**الأهمية**: متوسطة-عالية
**الوصف**:
- API routes لا تحتوي على rate limiting
- قد يكون هناك خطر من abuse

**المطلوب**:
- [ ] إضافة rate limiting للـ API routes
- [ ] خاصة لـ contact form
- [ ] إضافة middleware للـ rate limiting
- [ ] إضافة Redis للـ rate limiting (اختياري)

---

### 9. Social Media Links
**الحالة**: ⚠️ موجودة لكن فارغة
**الأهمية**: متوسطة
**الوصف**:
- الروابط في contact page تستخدم `href="#"`
- الروابط موجودة في metadata لكن غير مفعلة

**المطلوب**:
- [ ] إضافة روابط حقيقية لوسائل التواصل
- [ ] إضافة icons محسّنة
- [ ] إضافة hover effects
- [ ] إضافة في Footer أيضاً

---

### 10. Search Functionality
**الحالة**: ❌ غير موجود
**الأهمية**: متوسطة
**الوصف**:
- لا يوجد بحث في الموقع
- مهم للـ blog و portfolio

**المطلوب**:
- [ ] إضافة search bar في Header
- [ ] بحث في Blog posts
- [ ] بحث في Portfolio
- [ ] بحث في Services
- [ ] إضافة search results page

---

### 11. Image Optimization
**الحالة**: ⚠️ جزئي
**الأهمية**: متوسطة
**الوصف**:
- بعض الصور لا تستخدم Next.js Image
- Events page يستخدم `<img>` عادي

**المطلوب**:
- [ ] تحويل جميع الصور إلى Next.js Image
- [ ] إضافة blur placeholders
- [ ] تحسين lazy loading

---

### 12. Loading States
**الحالة**: ⚠️ جزئي
**الأهمية**: متوسطة
**الوصف**:
- بعض الصفحات تفتقد loading states
- لا توجد skeletons في بعض الأماكن

**المطلوب**:
- [ ] إضافة loading states لجميع الصفحات
- [ ] إضافة skeletons للـ portfolio
- [ ] إضافة skeletons للـ blog
- [ ] تحسين loading experience

---

## 🟢 أولوية منخفضة (Nice to Have)

### 13. Tests
**الحالة**: ❌ غير موجود
**الأهمية**: منخفضة-متوسطة
**الوصف**:
- لا يوجد أي tests
- لا يوجد unit tests أو integration tests

**المطلوب**:
- [ ] إضافة Jest و React Testing Library
- [ ] Unit tests للمكونات
- [ ] Integration tests للـ API routes
- [ ] E2E tests (اختياري)

---

### 14. CI/CD Pipeline
**الحالة**: ❌ غير موجود
**الأهمية**: منخفضة-متوسطة
**الوصف**:
- لا يوجد GitHub Actions
- لا يوجد automated deployment

**المطلوب**:
- [ ] إضافة GitHub Actions workflow
- [ ] Automated testing
- [ ] Automated deployment
- [ ] Build verification

---

### 15. Filtering & Sorting
**الحالة**: ❌ غير موجود
**الأهمية**: منخفضة
**الوصف**:
- لا يوجد filtering في Portfolio
- لا يوجد sorting في Events

**المطلوب**:
- [ ] إضافة filters للـ Portfolio (by category)
- [ ] إضافة sorting (by date, name)
- [ ] إضافة filters للـ Events
- [ ] UI محسّن للـ filters

---

### 16. Pagination
**الحالة**: ❌ غير موجود
**الأهمية**: منخفضة
**الوصف**:
- لا يوجد pagination في أي صفحة
- مهم عندما تكثر البيانات

**المطلوب**:
- [ ] إضافة pagination للـ Portfolio
- [ ] إضافة pagination للـ Blog
- [ ] إضافة pagination للـ Events
- [ ] Infinite scroll (اختياري)

---

### 17. Meta Tags Optimization
**الحالة**: ⚠️ جزئي
**الأهمية**: منخفضة
**الوصف**:
- بعض الصفحات تفتقد meta tags محسّنة
- Events و Services تحتاج تحسين

**المطلوب**:
- [ ] تحسين meta tags في جميع الصفحات
- [ ] إضافة Open Graph images
- [ ] إضافة Twitter Cards
- [ ] Dynamic meta tags

---

### 18. 404 Page Enhancement
**الحالة**: ⚠️ موجود لكن بسيط
**الأهمية**: منخفضة
**الوصف**:
- صفحة 404 موجودة لكن قد تحتاج تحسين

**المطلوب**:
- [ ] تحسين تصميم 404 page
- [ ] إضافة روابط مفيدة
- [ ] إضافة search functionality

---

### 19. Environment Variables Documentation
**الحالة**: ⚠️ موجود لكن يحتاج تحسين
**الأهمية**: منخفضة
**الوصف**:
- `env.example` موجود لكن يحتاج توثيق أفضل

**المطلوب**:
- [ ] إضافة comments في env.example
- [ ] توثيق كل متغير
- [ ] إضافة قيم default
- [ ] إضافة validation

---

### 20. Performance Monitoring
**الحالة**: ❌ غير موجود
**الأهمية**: منخفضة
**الوصف**:
- لا يوجد monitoring للأداء
- لا يوجد Core Web Vitals tracking

**المطلوب**:
- [ ] إضافة Web Vitals tracking
- [ ] Performance monitoring
- [ ] Real User Monitoring (RUM)

---

## 📊 ملخص الأولويات

### يجب إنجازها فوراً (Critical)
1. ✅ صفحة Portfolio
2. ✅ ربط البيانات من API
3. ✅ صفحة Blog/News
4. ✅ Manifest.json
5. ✅ Email Service

### يجب إنجازها قريباً (Important)
6. Analytics & Tracking
7. Error Tracking
8. Rate Limiting
9. Social Media Links
10. Search Functionality

### يمكن تأجيلها (Nice to Have)
11-20. جميع الميزات الأخرى

---

## 🎯 خطة التنفيذ المقترحة

### المرحلة 1 (أسبوع 1-2)
- [ ] صفحة Portfolio
- [ ] ربط البيانات من API
- [ ] Manifest.json

### المرحلة 2 (أسبوع 3-4)
- [ ] صفحة Blog/News
- [ ] Email Service
- [ ] Social Media Links

### المرحلة 3 (أسبوع 5-6)
- [ ] Analytics & Tracking
- [ ] Error Tracking
- [ ] Rate Limiting

### المرحلة 4 (أسبوع 7+)
- [ ] Search Functionality
- [ ] Tests
- [ ] CI/CD
- [ ] باقي الميزات

---

**تاريخ الإنشاء**: $(date)
**آخر تحديث**: $(date)

