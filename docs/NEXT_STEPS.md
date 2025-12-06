# 🚀 الخطوات القادمة - خطة العمل

**تاريخ التحديث:** 2024
**الحالة:** جاهز للتنفيذ
**الأولوية:** مرتبة حسب الأهمية

---

## ✅ ما تم إنجازه حتى الآن

1. ✅ **تحسين الأداء:** تحويل Client Components إلى Server Components
   - Events Page
   - Services Page
   - Home Page
   - إنشاء Service Layer

2. ✅ **CSRF Protection:** نظام حماية شامل
   - CSRF tokens
   - Middleware protection
   - Dashboard integration

---

## 🔴 الخطوات التالية - الأولوية العاجلة

### 1. Content Sanitization (XSS Protection) ⚠️ أمان حرج

**المشكلة:**
- استخدام `dangerouslySetInnerHTML` بدون sanitization
- محتوى المدونات والصفحات عرضة لـ XSS attacks
- لا يوجد تنظيف للمحتوى قبل العرض

**الحل:**
```typescript
// إضافة DOMPurify لتنظيف HTML
import DOMPurify from 'isomorphic-dompurify';

export function sanitizeHtml(html: string): string {
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'u', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'ul', 'ol', 'li', 'a', 'img'],
    ALLOWED_ATTR: ['href', 'src', 'alt', 'title', 'class'],
  });
}
```

**الملفات المتأثرة:**
- `app/(main)/pages/[slug]/page.tsx` - استخدام `dangerouslySetInnerHTML`
- `app/api/blog/route.ts` - تنظيف محتوى المدونات
- `app/api/pages/route.ts` - تنظيف محتوى الصفحات
- جميع endpoints التي تقبل HTML content

**الوقت المقدر:** 0.5 يوم
**التأثير:** ⭐⭐⭐⭐⭐ (أمان حرج)

---

### 2. تحسين استعلامات قاعدة البيانات

**المشكلة:**
- بعض الاستعلامات تجلب جميع الحقول حتى لو لم نكن نحتاجها
- عدم استخدام `select` بشكل فعال
- استعلامات N+1 محتملة

**الحل:**
```typescript
// ❌ قبل
const events = await prisma.event.findMany();

// ✅ بعد
const events = await prisma.event.findMany({
  select: {
    id: true,
    slug: true,
    title: true,
    date: true,
    image: true,
    published: true,
    // فقط ما نحتاجه
  },
  where: { published: true },
  orderBy: { date: 'desc' },
});
```

**الملفات المتأثرة:**
- `lib/services/event.service.ts`
- `lib/services/service.service.ts`
- `lib/services/portfolio.service.ts`
- جميع API routes

**الوقت المقدر:** 0.5 يوم
**التأثير:** ⭐⭐⭐ (تحسين الأداء)

---

### 3. إضافة Pagination للـ API Endpoints

**المشكلة:**
- بعض endpoints تجلب جميع البيانات دفعة واحدة
- قد يسبب مشاكل في الأداء مع البيانات الكبيرة
- لا يوجد pagination في بعض الـ routes

**الحل:**
```typescript
export const GET = async (request: NextRequest) => {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '10');
  const skip = (page - 1) * limit;

  const [data, total] = await Promise.all([
    prisma.event.findMany({ skip, take: limit }),
    prisma.event.count(),
  ]);

  return NextResponse.json({
    data,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  });
};
```

**الملفات المتأثرة:**
- `app/api/blog/route.ts`
- `app/api/events/route.ts`
- `app/api/portfolio/route.ts`
- `app/api/services/route.ts`

**الوقت المقدر:** 1 يوم
**التأثير:** ⭐⭐⭐⭐ (تحسين الأداء)

---

### 4. تحويل Portfolio Page إلى Server Component

**المشكلة:**
- Portfolio Page لا يزال Client Component
- يحتاج pagination معقد
- يجلب البيانات من Client

**الحل:**
- تحويل إلى Server Component
- إضافة pagination server-side
- استخدام ISR

**الوقت المقدر:** 1 يوم
**التأثير:** ⭐⭐⭐⭐ (تحسين الأداء والـ SEO)

---

## 🟡 الأولوية المهمة (Medium Priority)

### 5. تحسين معالجة الأخطاء في Client Components

**المشكلة:**
- عدم وجود error states في Client Components
- عدم وجود retry mechanisms
- رسائل خطأ غير واضحة

**الحل:**
- إنشاء custom hook `useApiData`
- إضافة error boundaries
- إضافة retry logic

**الوقت المقدر:** 1 يوم
**التأثير:** ⭐⭐⭐⭐ (تحسين تجربة المستخدم)

---

### 6. إضافة Input Validation الشامل

**المشكلة:**
- بعض الـ forms لا تحتوي على validation كافية
- عدم وجود validation على Server-side في بعض الأماكن

**الحل:**
- استخدام Zod schemas في جميع الـ forms
- إضافة Server-side validation
- رسائل خطأ واضحة

**الوقت المقدر:** 1 يوم
**التأثير:** ⭐⭐⭐ (تحسين الأمان والموثوقية)

---

### 7. تحسين Error Boundaries

**المشكلة:**
- Error boundaries بسيطة
- لا توجد error boundaries في بعض الأماكن المهمة

**الحل:**
- إضافة error boundaries شاملة
- تحسين رسائل الخطأ
- إضافة retry mechanisms

**الوقت المقدر:** 0.5 يوم
**التأثير:** ⭐⭐⭐ (تحسين تجربة المستخدم)

---

## 🟢 التحسينات الإضافية (Low Priority)

### 8. إضافة Unit Tests

**الملفات المطلوبة:**
- Tests للـ services
- Tests للـ API routes
- Tests للـ components

**الوقت المقدر:** 2-3 أيام
**التأثير:** ⭐⭐⭐ (تحسين جودة الكود)

---

### 9. تحسين Type Safety

**المشكلة:**
- بعض الأماكن تستخدم `any`
- عدم وجود types لبعض API responses

**الحل:**
- إزالة جميع `any` types
- إضافة types لجميع API responses
- تحسين TypeScript strictness

**الوقت المقدر:** 1 يوم
**التأثير:** ⭐⭐⭐ (تحسين جودة الكود)

---

### 10. إضافة Documentation

**المطلوب:**
- JSDoc comments للـ functions المهمة
- README files للـ modules
- API documentation

**الوقت المقدر:** 1-2 أيام
**التأثير:** ⭐⭐ (تحسين Developer Experience)

---

## 📊 خطة التنفيذ المقترحة

### الأسبوع الأول (أولوية عاجلة)

**اليوم 1-2:**
1. ✅ Content Sanitization (0.5 يوم)
2. ✅ تحسين استعلامات قاعدة البيانات (0.5 يوم)
3. ✅ إضافة Pagination (1 يوم)

**اليوم 3-4:**
4. ✅ تحويل Portfolio Page (1 يوم)
5. ✅ تحسين Error Handling (1 يوم)

---

### الأسبوع الثاني (أولوية مهمة)

**اليوم 5-7:**
6. ✅ Input Validation الشامل (1 يوم)
7. ✅ تحسين Error Boundaries (0.5 يوم)
8. ✅ Type Safety improvements (1 يوم)

---

### الأسبوع الثالث (تحسينات إضافية)

**اليوم 8-10:**
9. ✅ Unit Tests (2-3 أيام)
10. ✅ Documentation (1-2 أيام)

---

## 🎯 التوصية

**ابدأ بـ:**
1. **Content Sanitization** - أمان حرج (0.5 يوم)
2. **تحسين استعلامات قاعدة البيانات** - تحسين أداء سريع (0.5 يوم)
3. **إضافة Pagination** - تحسين أداء مهم (1 يوم)

**هذه الثلاثة تحسينات:**
- ✅ تأثير عالي
- ✅ وقت تنفيذ قصير (2 أيام)
- ✅ تحسينات أمنية وأداء مهمة

---

## 📝 ملاحظات

- جميع التحسينات المكتملة تم توثيقها في `docs/`
- يمكن تنفيذ التحسينات بشكل متوازي حسب الأولوية
- يفضل اختبار كل تحسين قبل الانتقال للآخر

---

**آخر تحديث:** 2024
**الحالة:** جاهز للتنفيذ
