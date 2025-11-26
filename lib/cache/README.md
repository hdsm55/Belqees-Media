# Caching System - نظام Caching

نظام احترافي ومركزي للـ Caching في مشروع Belqees Media.

## المميزات

- ✅ دعم Memory Store (للـ development) و Redis (للإنتاج)
- ✅ TTL (Time To Live) قابل للتخصيص
- ✅ Cache Invalidation بالـ Tags
- ✅ Cache Headers تلقائياً
- ✅ Cache Middleware للـ API routes
- ✅ Integration مع Next.js Caching

## البنية

```
lib/cache/
├── store.ts       # Cache Store (Memory/Redis)
├── config.ts      # Cache Configurations
├── manager.ts     # Cache Manager
├── middleware.ts  # Cache Middleware
├── index.ts       # Main Export
└── README.md      # Documentation
```

## Cache Configurations

| النوع | TTL | Revalidate | الاستخدام |
|------|-----|------------|----------|
| `public` | 3600s (1h) | 300s | بيانات عامة |
| `portfolio` | 1800s (30m) | 600s | الأعمال |
| `services` | 1800s (30m) | 600s | الخدمات |
| `events` | 900s (15m) | 300s | الفعاليات |
| `blog` | 1800s (30m) | 600s | المدونة |
| `pages` | 3600s (1h) | 900s | الصفحات |
| `user` | 300s (5m) | 60s | بيانات المستخدم |
| `short` | 60s (1m) | - | Cache قصير |

## الاستخدام

### 1. استخدام withCache Middleware (موصى به)

```typescript
import { withCache } from '@/lib/cache/middleware';
import { withErrorHandler } from '@/lib/errors';

export const GET = withCache(
  withErrorHandler(async (request: NextRequest) => {
    const data = await fetchData();
    return NextResponse.json({ success: true, data });
  }),
  { type: 'portfolio' }
);
```

### 2. Skip Cache Conditionally

```typescript
export const GET = withCache(
  withErrorHandler(async (request: NextRequest) => {
    // Handler code
  }),
  {
    type: 'events',
    skip: (request: NextRequest) => {
      const url = new URL(request.url);
      return url.searchParams.get('published') === 'all'; // Skip for admin
    }
  }
);
```

### 3. Cache Invalidation

```typescript
import { invalidateCacheByTags } from '@/lib/cache/middleware';

// بعد إنشاء/تحديث/حذف
await invalidateCacheByTags(['portfolio', 'public']);
```

### 4. استخدام Cache Manager مباشرة

```typescript
import { cacheManager } from '@/lib/cache';

// Get or Set pattern
const data = await cacheManager.getOrSet(
  'cache:key',
  async () => {
    return await fetchData();
  },
  { ttl: 3600 }
);

// Manual operations
await cacheManager.set('key', data, 3600);
const cached = await cacheManager.get('key');
await cacheManager.delete('key');
```

## Cache Headers

النظام يضيف تلقائياً الـ headers التالية:

- `Cache-Control`: `public, max-age={ttl}, stale-while-revalidate={revalidate}`
- `X-Cache-Status`: `HIT` أو `MISS`
- `X-Cache-TTL`: TTL بالثواني

## Cache Invalidation Strategy

### 1. Tag-based Invalidation

```typescript
// عند إنشاء/تحديث/حذف
await invalidateCacheByTags(['portfolio', 'public']);
```

### 2. Pattern-based Invalidation

```typescript
import { invalidateCache } from '@/lib/cache/middleware';

await invalidateCache('cache:portfolio:*');
```

### 3. Manual Invalidation

```typescript
import { cacheManager } from '@/lib/cache';

await cacheManager.delete('cache:portfolio:123');
```

## الإعداد

### للـ Development

لا يحتاج إعداد - يعمل تلقائياً باستخدام Memory Store.

### للإنتاج (Redis - موصى به)

أضف متغيرات البيئة:

```env
UPSTASH_REDIS_REST_URL=https://your-redis-url.upstash.io
UPSTASH_REDIS_REST_TOKEN=your-redis-token
```

## Best Practices

1. ✅ استخدم `withCache` للـ GET requests
2. ✅ استخدم Cache Invalidation عند التعديل
3. ✅ استخدم Tags للـ Invalidation المنظم
4. ✅ Skip cache للـ admin requests
5. ✅ استخدم TTL مناسب حسب نوع البيانات

## التكامل مع Next.js

يعمل بشكل مثالي مع Next.js Caching:

```typescript
// في Server Components
const data = await fetch('/api/portfolio', {
  next: { revalidate: 3600 }
});
```

## ملاحظات

- Memory Store مناسب للـ development فقط
- للإنتاج، يُنصح بشدة باستخدام Redis
- Cache Headers تُضاف تلقائياً
- Failed requests لا تُحفظ في Cache

