# مثال على استخدام Retry Logic في Prisma

## المشكلة

عند حدوث خطأ في الاتصال بقاعدة البيانات (مثل `ConnectionReset`)، قد تفشل الطلبات. الحل هو استخدام `retryDatabaseOperation`.

## الحل

### 1. الاستخدام الأساسي

```typescript
// app/api/events/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { retryDatabaseOperation } from '@/lib/prisma';
import { prisma } from '@/lib/prisma';
import { rateLimit } from '@/lib/rate-limit';
import { withErrorHandler } from '@/lib/errors';
import { withCache } from '@/lib/cache/middleware';

export const GET = withCache(
    withErrorHandler(async (request: NextRequest) => {
        const { response: rateLimitResponse } = await rateLimit(request);
        if (rateLimitResponse) return rateLimitResponse;

        // استخدام retryDatabaseOperation للعمليات الحساسة
        const events = await retryDatabaseOperation(async () => {
            return await prisma.event.findMany({
                where: { published: true },
                orderBy: { date: 'desc' },
            });
        });

        return NextResponse.json({
            success: true,
            data: events,
        });
    }),
    { type: 'events' }
);
```

### 2. الاستخدام مع معاملات مخصصة

```typescript
// إعادة المحاولة 5 مرات مع تأخير 2 ثانية
const events = await retryDatabaseOperation(
    async () => {
        return await prisma.event.findMany();
    },
    5, // maxRetries
    2000 // delayMs
);
```

### 3. الاستخدام في Operations معقدة

```typescript
export const POST = withErrorHandler(async (request: NextRequest) => {
    const body = await request.json();

    // استخدام retry للعمليات الكتابة أيضاً
    const event = await retryDatabaseOperation(async () => {
        return await prisma.event.create({
            data: {
                slug: body.slug,
                title: body.title,
                // ...
            },
        });
    });

    return NextResponse.json({
        success: true,
        data: event,
    });
});
```

### 4. الاستخدام مع Transactions

```typescript
const result = await retryDatabaseOperation(async () => {
    return await prisma.$transaction(async (tx) => {
        const event = await tx.event.create({ data: eventData });
        await tx.media.create({ data: mediaData });
        return event;
    });
});
```

## متى تستخدم retryDatabaseOperation؟

### ✅ استخدمه عندما:
- العملية حساسة ولا يمكن فقدانها
- العملية قد تفشل بسبب مشاكل في الشبكة
- العملية تستغرق وقتاً طويلاً

### ❌ لا تستخدمه عندما:
- العملية idempotent (يمكن تكرارها بدون مشاكل)
- العملية سريعة جداً (مثل SELECT بسيط)
- العملية قد تفشل لأسباب منطقية (مثل validation errors)

## ملاحظات مهمة

1. **Retry Logic تلقائي**: Prisma Client يحاول إعادة الاتصال تلقائياً في بعض الحالات، لكن `retryDatabaseOperation` يوفر طبقة إضافية من الحماية.

2. **Connection Pooling**: تأكد من استخدام Session Pooler (port 6543) في `DATABASE_URL`.

3. **Error Handling**: `retryDatabaseOperation` سيرمي الخطأ الأصلي إذا فشلت جميع المحاولات.

4. **Performance**: Retry logic يضيف تأخيراً، استخدمه فقط عند الحاجة.

## مثال كامل

```typescript
// app/api/events/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma, retryDatabaseOperation } from '@/lib/prisma';
import { rateLimit } from '@/lib/rate-limit';
import { withErrorHandler } from '@/lib/errors';
import { withCache, invalidateCacheByTags } from '@/lib/cache/middleware';

export const GET = withCache(
    withErrorHandler(async (request: NextRequest) => {
        const { response: rateLimitResponse } = await rateLimit(request);
        if (rateLimitResponse) return rateLimitResponse;

        const { searchParams } = new URL(request.url);
        const published = searchParams.get('published');
        const limit = searchParams.get('limit');

        const where = published === 'all' ? {} : { published: true };

        // استخدام retry للعمليات الحساسة
        const events = await retryDatabaseOperation(async () => {
            return await prisma.event.findMany({
                where,
                orderBy: { date: 'desc' },
                take: limit ? parseInt(limit) : undefined,
            });
        });

        return NextResponse.json({
            success: true,
            data: events,
        });
    }),
    {
        type: 'events',
        skip: (request: NextRequest) => {
            const url = new URL(request.url);
            return url.searchParams.get('published') === 'all';
        }
    }
);

export const POST = withErrorHandler(async (request: NextRequest) => {
    const { response: rateLimitResponse } = await rateLimit(request);
    if (rateLimitResponse) return rateLimitResponse;

    const body = await request.json();

    // استخدام retry للعمليات الكتابة
    const event = await retryDatabaseOperation(async () => {
        return await prisma.event.create({
            data: {
                slug: body.slug,
                title: body.title,
                description: body.description,
                date: new Date(body.date),
                published: body.published || false,
            },
        });
    });

    // Invalidate cache
    await invalidateCacheByTags(['events', 'public']);

    return NextResponse.json({
        success: true,
        data: event,
        message: 'تم إنشاء الفعالية بنجاح',
    }, { status: 201 });
});
```

