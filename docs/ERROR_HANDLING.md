# Error Handling System - دليل شامل

## نظرة عامة

تم إضافة نظام Error Handling احترافي ومركزي لمعالجة جميع الأخطاء في API بشكل موحد ومتسق.

## المميزات الرئيسية

- ✅ **Custom Error Classes** - أنواع أخطاء مخصصة مع error codes
- ✅ **Centralized Handler** - معالج مركزي لجميع الأخطاء
- ✅ **Automatic Error Conversion** - تحويل تلقائي لـ Zod, Prisma, Supabase errors
- ✅ **Structured Logging** - تسجيل منظم للأخطاء
- ✅ **Error Response Format** - تنسيق موحد لاستجابات الأخطاء
- ✅ **Error Tracking Ready** - جاهز للتكامل مع Sentry وغيرها

## البنية

```
lib/errors/
├── types.ts      # Custom Error Classes & Error Codes
├── handler.ts    # Error Handler & Response Formatter
├── index.ts      # Main Export
└── README.md     # Detailed Documentation
```

## Error Codes

### Authentication & Authorization
- `UNAUTHORIZED` (401) - غير مصرح
- `FORBIDDEN` (403) - غير مسموح
- `INVALID_CREDENTIALS` (401) - بيانات اعتماد غير صحيحة
- `INSUFFICIENT_PERMISSIONS` (403) - صلاحيات غير كافية

### Validation
- `VALIDATION_ERROR` (400) - خطأ في التحقق
- `INVALID_INPUT` (400) - بيانات غير صحيحة
- `MISSING_REQUIRED_FIELD` (400) - حقل مطلوب مفقود

### Not Found
- `NOT_FOUND` (404) - غير موجود
- `RESOURCE_NOT_FOUND` (404) - المورد غير موجود
- `EVENT_NOT_FOUND`, `SERVICE_NOT_FOUND`, etc. (404)

### Conflict
- `CONFLICT` (409) - تعارض
- `DUPLICATE_ENTRY` (409) - سجل مكرر
- `EMAIL_ALREADY_EXISTS` (409) - البريد مستخدم

### Server Errors
- `INTERNAL_SERVER_ERROR` (500) - خطأ في الخادم
- `DATABASE_ERROR` (500) - خطأ في قاعدة البيانات
- `EXTERNAL_SERVICE_ERROR` (500) - خطأ في خدمة خارجية

## الاستخدام

### الطريقة الموصى بها: withErrorHandler

```typescript
import { withErrorHandler } from '@/lib/errors';

export const GET = withErrorHandler(async (request: NextRequest) => {
  const data = await fetchData();
  return NextResponse.json({ success: true, data });
});
```

### استخدام Custom Errors

```typescript
import { NotFoundError, UnauthorizedError } from '@/lib/errors';

if (!resource) {
  throw new NotFoundError('المورد');
}

if (!user) {
  throw new UnauthorizedError();
}
```

## Error Response Format

جميع الأخطاء تُرجع بنفس التنسيق:

```json
{
  "success": false,
  "error": {
    "code": "NOT_FOUND",
    "message": "المورد غير موجود",
    "statusCode": 404,
    "details": {},
    "timestamp": "2024-01-01T00:00:00.000Z",
    "path": "/api/events/123",
    "method": "GET"
  }
}
```

## أمثلة عملية

### مثال 1: GET Request

```typescript
export const GET = withErrorHandler(async (request: NextRequest) => {
  const data = await prisma.event.findMany();
  return NextResponse.json({ success: true, data });
});
```

### مثال 2: POST مع Validation

```typescript
export const POST = withErrorHandler(async (request: NextRequest) => {
  const body = await request.json();
  const data = schema.parse(body); // معالجة تلقائية لـ Zod errors

  const result = await prisma.event.create({ data });
  return NextResponse.json({ success: true, data: result }, { status: 201 });
});
```

### مثال 3: مع Custom Error

```typescript
export const GET = withErrorHandler(async (request, { params }) => {
  const { id } = await params;
  const event = await prisma.event.findUnique({ where: { id } });

  if (!event) {
    throw new NotFoundError('الفعالية');
  }

  return NextResponse.json({ success: true, data: event });
});
```

## التكامل مع Rate Limiting

```typescript
export const POST = withErrorHandler(async (request: NextRequest) => {
  // Rate limiting
  const { response: rateLimitResponse } = await rateLimit(request);
  if (rateLimitResponse) return rateLimitResponse;

  // Handler code
  // ...
});
```

## Logging

- **Operational Errors** (متوقعة) → `logger.warn()`
- **Programming Errors** (غير متوقعة) → `logger.error()` مع stack trace

## Error Tracking

جاهز للتكامل مع Sentry:

```typescript
// في lib/utils/logger.ts
if (isProduction && error) {
  // Sentry.captureException(error, { extra: context });
}
```

## Best Practices

1. ✅ استخدم `withErrorHandler` دائماً
2. ✅ استخدم Custom Errors للرسائل الواضحة
3. ✅ لا تستخدم try-catch داخل handlers
4. ✅ استخدم Error Codes للتعرف على نوع الخطأ

## الملفات المحدثة

تم تطبيق Error Handling على جميع API routes:
- ✅ `/api/events`
- ✅ `/api/services`
- ✅ `/api/contact`
- ✅ `/api/auth/*`
- ✅ `/api/portfolio`
- ✅ `/api/blog`
- ✅ `/api/pages`
- ✅ `/api/health`

## ملاحظات

- جميع الأخطاء تُعاد بنفس التنسيق
- معالجة تلقائية لـ Zod, Prisma, Supabase errors
- جاهز للتكامل مع error tracking services

