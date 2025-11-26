# Rate Limiting System

نظام احترافي لتحديد معدل الطلبات (Rate Limiting) للـ API في مشروع Belqees Media.

## المميزات

- ✅ دعم متعدد للـ Storage (Memory للـ development، Redis للإنتاج)
- ✅ معدلات مختلفة حسب نوع الـ endpoint
- ✅ دعم IP-based و User-based rate limiting
- ✅ إضافة Rate Limit Headers تلقائياً
- ✅ Logging للأحداث المهمة
- ✅ Fail-open strategy (لا يعطل الخدمة في حالة الخطأ)

## التثبيت

```bash
npm install @upstash/ratelimit @upstash/redis
```

## الإعداد

### للـ Development (Memory Store)

لا يحتاج إعداد إضافي - يعمل تلقائياً باستخدام Memory Store.

### للإنتاج (Redis - اختياري)

أضف متغيرات البيئة التالية في `.env`:

```env
UPSTASH_REDIS_REST_URL=https://your-redis-url.upstash.io
UPSTASH_REDIS_REST_TOKEN=your-redis-token
```

يمكنك الحصول على Redis مجاناً من [Upstash](https://upstash.com/).

## معدلات Rate Limiting

| النوع | الحد | الفترة | الاستخدام |
|------|------|--------|----------|
| `public` | 100 | 60 ثانية | GET requests العامة |
| `auth` | 5 | 60 ثانية | تسجيل الدخول والتسجيل |
| `contact` | 3 | 3600 ثانية (ساعة) | نموذج الاتصال |
| `authenticated` | 30 | 60 ثانية | POST/PUT/DELETE (مصادق) |
| `admin` | 50 | 60 ثانية | عمليات الإدارة |
| `strict` | 10 | 60 ثانية | المناطق الحساسة |

## الاستخدام

### الطريقة الأساسية

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { rateLimit } from '@/lib/rate-limit';

export async function GET(request: NextRequest) {
  // Rate limiting
  const { response: rateLimitResponse, addHeaders } = await rateLimit(request);
  if (rateLimitResponse) return rateLimitResponse;

  // كود الـ handler
  const data = await fetchData();
  const response = NextResponse.json(data);

  // إضافة Rate Limit Headers للاستجابة
  await addHeaders(response);

  return response;
}
```

### استخدام معدل مخصص

```typescript
import { rateLimit, RATE_LIMIT_CONFIGS } from '@/lib/rate-limit';

export async function POST(request: NextRequest) {
  // استخدام معدل مخصص
  const { response: rateLimitResponse } = await rateLimit(
    request,
    { limit: 10, window: 300 } // 10 requests per 5 minutes
  );
  if (rateLimitResponse) return rateLimitResponse;

  // ...
}
```

### استخدام Wrapper Function

```typescript
import { withRateLimit } from '@/lib/rate-limit';

export const GET = withRateLimit(async (request: NextRequest) => {
  const data = await fetchData();
  return NextResponse.json(data);
});
```

## Rate Limit Headers

النظام يضيف تلقائياً الـ headers التالية للاستجابات:

- `X-RateLimit-Limit`: الحد الأقصى للطلبات
- `X-RateLimit-Remaining`: عدد الطلبات المتبقية
- `X-RateLimit-Reset`: وقت إعادة تعيين العداد (ISO string)
- `Retry-After`: عدد الثواني قبل إعادة المحاولة

## التعرف على العميل

النظام يستخدم:
1. **User ID** إذا كان المستخدم مسجل دخول
2. **IP Address** إذا لم يكن مسجل دخول

## الأمان

- Fail-open strategy: في حالة حدوث خطأ، يتم السماح بالطلب لتجنب تعطيل الخدمة
- Logging: يتم تسجيل جميع محاولات تجاوز الحد
- Memory cleanup: تنظيف تلقائي للبيانات المنتهية الصلاحية

## التخصيص

يمكنك تخصيص معدلات Rate Limiting في `lib/rate-limit/config.ts`:

```typescript
export const RATE_LIMIT_CONFIGS = {
  public: {
    limit: 100,
    window: 60,
    message: 'رسالة الخطأ المخصصة',
  },
  // ...
};
```

## ملاحظات

- في حالة عدم توفر Redis، يتم استخدام Memory Store تلقائياً
- Memory Store مناسب للـ development فقط
- للإنتاج، يُنصح بشدة باستخدام Redis
- النظام يدعم Sliding Window algorithm

