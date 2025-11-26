# Caching System - دليل شامل

## نظرة عامة

تم إضافة نظام Caching احترافي ومركزي لتحسين الأداء وتقليل استدعاءات قاعدة البيانات.

## المميزات الرئيسية

- ✅ **Memory Store** للـ development (لا يحتاج إعداد)
- ✅ **Redis Store** للإنتاج (اختياري لكن موصى به)
- ✅ **TTL قابل للتخصيص** حسب نوع البيانات
- ✅ **Cache Invalidation** بالـ Tags
- ✅ **Cache Headers** تلقائياً
- ✅ **Cache Middleware** للـ API routes

## Cache Configurations

| النوع | TTL | Revalidate | الاستخدام |
|------|-----|------------|----------|
| `public` | 1 hour | 5 minutes | بيانات عامة |
| `portfolio` | 30 minutes | 10 minutes | الأعمال |
| `services` | 30 minutes | 10 minutes | الخدمات |
| `events` | 15 minutes | 5 minutes | الفعاليات |
| `blog` | 30 minutes | 10 minutes | المدونة |
| `pages` | 1 hour | 15 minutes | الصفحات |

## الاستخدام

### الطريقة الموصى بها: withCache

```typescript
import { withCache } from '@/lib/cache/middleware';

export const GET = withCache(
  withErrorHandler(async (request: NextRequest) => {
    const data = await fetchData();
    return NextResponse.json({ success: true, data });
  }),
  { type: 'portfolio' }
);
```

### Skip Cache Conditionally

```typescript
export const GET = withCache(
  withErrorHandler(async (request: NextRequest) => {
    // Handler code
  }),
  {
    type: 'events',
    skip: (request) => {
      const url = new URL(request.url);
      return url.searchParams.get('published') === 'all';
    }
  }
);
```

## Cache Invalidation

### Tag-based Invalidation

```typescript
import { invalidateCacheByTags } from '@/lib/cache/middleware';

// بعد إنشاء/تحديث/حذف
await invalidateCacheByTags(['portfolio', 'public']);
```

## Cache Headers

النظام يضيف تلقائياً:

- `Cache-Control`: `public, max-age={ttl}, stale-while-revalidate={revalidate}`
- `X-Cache-Status`: `HIT` أو `MISS`
- `X-Cache-TTL`: TTL بالثواني

## الإعداد

### Development

لا يحتاج إعداد - يعمل تلقائياً.

### Production (Redis)

```env
UPSTASH_REDIS_REST_URL=https://your-redis-url.upstash.io
UPSTASH_REDIS_REST_TOKEN=your-redis-token
```

## الملفات المحدثة

تم تطبيق Caching على:
- ✅ `/api/events` (GET)
- ✅ `/api/services` (GET)
- ✅ `/api/portfolio` (GET)
- ✅ `/api/blog` (GET)

## Best Practices

1. ✅ استخدم `withCache` للـ GET requests
2. ✅ استخدم Cache Invalidation عند التعديل
3. ✅ Skip cache للـ admin requests
4. ✅ استخدم TTL مناسب حسب نوع البيانات

