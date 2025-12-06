# 🔒 CSRF Protection Implementation

**تاريخ الإنجاز:** 2024
**الحالة:** ✅ مكتمل
**الأولوية:** 🔴 عاجل

---

## 📊 ملخص التنفيذ

تم إضافة نظام حماية CSRF (Cross-Site Request Forgery) شامل للمشروع لحماية جميع API routes من هجمات CSRF.

---

## 🎯 ما تم إنجازه

### 1. ✅ إنشاء CSRF Token System

**الملفات المُنشأة:**
- `lib/csrf/token.ts` - توليد والتحقق من CSRF tokens
- `lib/csrf/middleware.ts` - CSRF protection middleware
- `lib/csrf/index.ts` - تصدير موحد

**المميزات:**
- ✅ توليد tokens آمنة باستخدام `crypto.randomBytes`
- ✅ تخزين tokens في HTTP-only cookies
- ✅ التحقق من tokens باستخدام constant-time comparison (لمنع timing attacks)
- ✅ دعم استخراج tokens من headers أو body

---

### 2. ✅ CSRF Protection Middleware

**الوظائف:**
- `withCSRFProtection` - Wrapper لحماية API routes
- `validateCSRFRequest` - دالة مستقلة للتحقق

**المميزات:**
- ✅ حماية تلقائية لـ POST, PUT, PATCH, DELETE
- ✅ إمكانية استثناء paths محددة
- ✅ رسائل خطأ واضحة

---

### 3. ✅ React Hook للـ CSRF Token

**الملفات المُنشأة:**
- `hooks/useCSRF.ts` - React hook للحصول على CSRF token
- `components/csrf/CSRFTokenInput.tsx` - Component لإضافة token للـ forms

**الاستخدام:**
```tsx
import { useCSRF } from '@/hooks/useCSRF';
import { CSRFTokenInput } from '@/components/csrf/CSRFTokenInput';

function MyForm() {
  const { token, loading } = useCSRF();

  return (
    <form>
      <CSRFTokenInput />
      {/* باقي الحقول */}
    </form>
  );
}
```

---

### 4. ✅ تحديث API Routes

**الـ Routes المُحدثة:**
- ✅ `app/api/events/route.ts` - POST
- ✅ `app/api/events/[id]/route.ts` - PUT, PATCH, DELETE
- ✅ `app/api/services/route.ts` - POST
- ✅ `app/api/services/[id]/route.ts` - PUT, PATCH, DELETE
- ✅ `app/api/portfolio/route.ts` - POST
- ✅ `app/api/portfolio/[id]/route.ts` - PUT, PATCH, DELETE
- ✅ `app/api/contact/route.ts` - POST

**الطريقة:**
```typescript
import { withCSRFProtection } from '@/lib/csrf/middleware';

export const POST = withCSRFProtection(
  withErrorHandler(async (request: NextRequest) => {
    // Handler logic
  })
);
```

---

### 5. ✅ تحديث Dashboard Hooks

**الملفات المُحدثة:**
- `lib/dashboard/hooks.ts` - إضافة CSRF token تلقائياً لجميع الطلبات

**المميزات:**
- ✅ إضافة CSRF token تلقائياً في `create`, `update`, `remove`
- ✅ إرسال token في header (`X-CSRF-Token`) و body (`_csrf`)
- ✅ لا حاجة لتعديل الكود الموجود

---

### 6. ✅ CSRF Token API Endpoint

**الملفات المُنشأة:**
- `app/api/csrf-token/route.ts` - API endpoint للحصول على CSRF token

**الاستخدام:**
```typescript
const response = await fetch('/api/csrf-token');
const { token } = await response.json();
```

---

## 🔧 كيفية الاستخدام

### في API Routes

```typescript
import { withCSRFProtection } from '@/lib/csrf/middleware';

export const POST = withCSRFProtection(
  withErrorHandler(async (request: NextRequest) => {
    // Your handler
  }),
  {
    excludePaths: ['/api/public'], // Optional: exclude specific paths
  }
);
```

### في React Components

```tsx
import { useCSRF } from '@/hooks/useCSRF';
import { CSRFTokenInput } from '@/components/csrf/CSRFTokenInput';

function ContactForm() {
  const { token, loading } = useCSRF();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);

    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'X-CSRF-Token': token }),
      },
      body: JSON.stringify({
        name: formData.get('name'),
        email: formData.get('email'),
        message: formData.get('message'),
        ...(token && { _csrf: token }),
      }),
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <CSRFTokenInput />
      {/* باقي الحقول */}
    </form>
  );
}
```

### في Dashboard (استخدام useCrud)

```typescript
// useCrud يضيف CSRF token تلقائياً
const { create, update, remove } = useCrud({
  endpoint: '/api/events',
});

// لا حاجة لإضافة token يدوياً
await create({ title: 'Event', date: '2024-01-01' });
```

---

## 🔒 الأمان

### المميزات الأمنية:

1. **HTTP-Only Cookies:**
   - ✅ Tokens محفوظة في HTTP-only cookies (لا يمكن الوصول إليها من JavaScript)
   - ✅ Secure flag في production
   - ✅ SameSite=strict

2. **Constant-Time Comparison:**
   - ✅ استخدام `crypto.timingSafeEqual` لمنع timing attacks

3. **Token Rotation:**
   - ✅ Tokens جديدة يتم توليدها تلقائياً عند الحاجة
   - ✅ Max age: 24 hours

4. **Dual Validation:**
   - ✅ التحقق من token في cookie و request
   - ✅ دعم إرسال token في header أو body

---

## 📝 ملاحظات مهمة

1. **GET Requests:**
   - GET requests لا تحتاج CSRF protection (لا تغير state)

2. **Public APIs:**
   - يمكن استثناء APIs عامة من CSRF protection باستخدام `excludePaths`

3. **Testing:**
   - في development، يمكن تعطيل CSRF protection مؤقتاً للاختبار

4. **Error Handling:**
   - عند فشل التحقق، يتم إرجاع 403 Forbidden مع رسالة واضحة

---

## ✅ التحقق من النجاح

### اختبار CSRF Protection:

```bash
# 1. جلب CSRF token
curl http://localhost:3000/api/csrf-token

# 2. محاولة POST بدون token (يجب أن يفشل)
curl -X POST http://localhost:3000/api/events \
  -H "Content-Type: application/json" \
  -d '{"title":"Test"}'

# 3. POST مع token (يجب أن ينجح)
curl -X POST http://localhost:3000/api/events \
  -H "Content-Type: application/json" \
  -H "X-CSRF-Token: YOUR_TOKEN" \
  -H "Cookie: csrf-token=YOUR_TOKEN" \
  -d '{"title":"Test","_csrf":"YOUR_TOKEN"}'
```

---

## 🚀 الخطوات التالية

1. ⏳ إضافة CSRF tokens للـ forms في Dashboard
2. ⏳ إضافة CSRF tokens لنموذج الاتصال
3. ⏳ اختبار شامل لجميع الـ endpoints

---

## 📚 المراجع

- [OWASP CSRF Prevention](https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html)
- [Next.js Security Best Practices](https://nextjs.org/docs/app/building-your-application/configuring/security-headers)

---

**آخر تحديث:** 2024
**الحالة:** ✅ مكتمل

