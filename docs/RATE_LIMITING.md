# Rate Limiting System - دليل الاستخدام

## نظرة عامة

تم إضافة نظام Rate Limiting احترافي لحماية API من الهجمات والاستخدام المفرط. النظام يدعم:

- ✅ Memory Store للـ development (لا يحتاج إعداد)
- ✅ Redis Store للإنتاج (اختياري لكن موصى به)
- ✅ معدلات مختلفة حسب نوع الـ endpoint
- ✅ Rate Limit Headers تلقائياً
- ✅ Logging للأحداث المهمة

## التثبيت

```bash
npm install @upstash/ratelimit @upstash/redis
```

## الإعداد

### للـ Development

لا يحتاج إعداد إضافي - يعمل تلقائياً باستخدام Memory Store.

### للإنتاج (Redis - موصى به)

1. قم بإنشاء حساب مجاني على [Upstash](https://upstash.com/)
2. أنشئ Redis Database
3. أضف متغيرات البيئة في `.env.local`:

```env
UPSTASH_REDIS_REST_URL=https://your-redis-url.upstash.io
UPSTASH_REDIS_REST_TOKEN=your-redis-token
```

## معدلات Rate Limiting

| النوع | الحد | الفترة | الاستخدام |
|------|------|--------|----------|
| `public` | 100 | 60 ثانية | GET requests العامة |
| `auth` | 5 | 60 ثانية | تسجيل الدخول والتسجيل |
| `contact` | 3 | 3600 ثانية | نموذج الاتصال |
| `authenticated` | 30 | 60 ثانية | POST/PUT/DELETE (مصادق) |
| `admin` | 50 | 60 ثانية | عمليات الإدارة |
| `strict` | 10 | 60 ثانية | المناطق الحساسة |

## الاستخدام

تم تطبيق Rate Limiting على جميع API routes تلقائياً. لا حاجة لإجراء أي تغييرات إضافية.

### مثال على الاستخدام المباشر

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

  // إضافة Rate Limit Headers
  await addHeaders(response);

  return response;
}
```

## Rate Limit Headers

النظام يضيف تلقائياً الـ headers التالية:

- `X-RateLimit-Limit`: الحد الأقصى للطلبات
- `X-RateLimit-Remaining`: عدد الطلبات المتبقية
- `X-RateLimit-Reset`: وقت إعادة تعيين العداد
- `Retry-After`: عدد الثواني قبل إعادة المحاولة

## التعرف على العميل

- **User ID** إذا كان المستخدم مسجل دخول
- **IP Address** إذا لم يكن مسجل دخول

## الأمان

- **Fail-open strategy**: في حالة حدوث خطأ، يتم السماح بالطلب
- **Logging**: تسجيل جميع محاولات تجاوز الحد
- **Memory cleanup**: تنظيف تلقائي للبيانات المنتهية الصلاحية

## التخصيص

يمكنك تخصيص معدلات Rate Limiting في `lib/rate-limit/config.ts`.

## ملاحظات

- Memory Store مناسب للـ development فقط
- للإنتاج، يُنصح بشدة باستخدام Redis
- النظام يدعم Sliding Window algorithm

## الملفات

- `lib/rate-limit/config.ts` - إعدادات Rate Limiting
- `lib/rate-limit/store.ts` - Memory/Redis Store
- `lib/rate-limit/index.ts` - Main Rate Limiting Logic
- `lib/rate-limit/README.md` - توثيق تفصيلي

