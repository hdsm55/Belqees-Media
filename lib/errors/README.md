# Error Handling System - نظام معالجة الأخطاء

نظام احترافي ومركزي لمعالجة الأخطاء في مشروع Belqees Media.

## المميزات

- ✅ Custom Error Classes مع error codes موحدة
- ✅ معالجة تلقائية لـ Zod, Prisma, Supabase errors
- ✅ Error Response Format موحد
- ✅ Structured Logging للأخطاء
- ✅ Error Handler Wrapper للـ API routes
- ✅ Operational vs Programming Errors
- ✅ Error Tracking جاهز (Sentry, etc.)

## البنية

```
lib/errors/
├── types.ts      # Custom Error Classes & Error Codes
├── handler.ts    # Error Handler & Response Formatter
├── index.ts      # Main Export
└── README.md     # Documentation
```

## Error Codes

### Authentication & Authorization (401, 403)
- `UNAUTHORIZED` - غير مصرح
- `FORBIDDEN` - غير مسموح
- `INVALID_CREDENTIALS` - بيانات اعتماد غير صحيحة
- `INSUFFICIENT_PERMISSIONS` - صلاحيات غير كافية

### Validation Errors (400)
- `VALIDATION_ERROR` - خطأ في التحقق
- `INVALID_INPUT` - بيانات غير صحيحة
- `MISSING_REQUIRED_FIELD` - حقل مطلوب مفقود

### Not Found (404)
- `NOT_FOUND` - غير موجود
- `RESOURCE_NOT_FOUND` - المورد غير موجود
- `EVENT_NOT_FOUND`, `SERVICE_NOT_FOUND`, etc.

### Conflict (409)
- `CONFLICT` - تعارض
- `DUPLICATE_ENTRY` - سجل مكرر
- `EMAIL_ALREADY_EXISTS` - البريد مستخدم

### Server Errors (500)
- `INTERNAL_SERVER_ERROR` - خطأ في الخادم
- `DATABASE_ERROR` - خطأ في قاعدة البيانات
- `EXTERNAL_SERVICE_ERROR` - خطأ في خدمة خارجية

## الاستخدام

### 1. استخدام withErrorHandler (موصى به)

```typescript
import { withErrorHandler } from '@/lib/errors';

export const GET = withErrorHandler(async (request: NextRequest) => {
  // كود الـ handler
  const data = await fetchData();
  return NextResponse.json({ success: true, data });
});
```

### 2. استخدام Custom Errors

```typescript
import { NotFoundError, ValidationError, UnauthorizedError } from '@/lib/errors';

// في الـ handler
if (!resource) {
  throw new NotFoundError('المورد');
}

if (!user) {
  throw new UnauthorizedError();
}
```

### 3. معالجة Zod Errors

```typescript
import { z } from 'zod';
import { withErrorHandler } from '@/lib/errors';

export const POST = withErrorHandler(async (request: NextRequest) => {
  const body = await request.json();
  const data = schema.parse(body); // سيتم معالجته تلقائياً
  // ...
});
```

### 4. معالجة Prisma Errors

```typescript
// يتم معالجتها تلقائياً بواسطة withErrorHandler
const user = await prisma.user.create({ data });
// P2025 (Not Found) -> NotFoundError
// P2002 (Unique) -> ConflictError
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
    "details": { ... },
    "timestamp": "2024-01-01T00:00:00.000Z",
    "path": "/api/events/123",
    "method": "GET"
  }
}
```

## Custom Error Classes

### إنشاء Error مخصص

```typescript
import { AppError, ErrorCode } from '@/lib/errors';

throw new AppError(
  ErrorCode.NOT_FOUND,
  'رسالة الخطأ',
  { details: 'معلومات إضافية' }
);
```

### استخدام Error Classes المدمجة

```typescript
import {
  NotFoundError,
  ValidationError,
  UnauthorizedError,
  ConflictError,
  EmailAlreadyExistsError,
} from '@/lib/errors';

// استخدام مباشر
throw new NotFoundError('الفعالية');
throw new EmailAlreadyExistsError();
throw new ValidationError('خطأ في البيانات', details);
```

## Logging

النظام يسجل الأخطاء تلقائياً:

- **Operational Errors** (متوقعة) → `logger.warn()`
- **Programming Errors** (غير متوقعة) → `logger.error()`

## Error Tracking

جاهز للتكامل مع خدمات Error Tracking:

```typescript
// في lib/utils/logger.ts
if (isProduction && error) {
  // Sentry.captureException(error, { extra: context });
}
```

## أمثلة

### مثال 1: API Route بسيط

```typescript
import { withErrorHandler } from '@/lib/errors';

export const GET = withErrorHandler(async (request: NextRequest) => {
  const data = await fetchData();
  return NextResponse.json({ success: true, data });
});
```

### مثال 2: مع Validation

```typescript
export const POST = withErrorHandler(async (request: NextRequest) => {
  const body = await request.json();
  const data = schema.parse(body); // معالجة تلقائية

  const result = await createResource(data);
  return NextResponse.json({ success: true, data: result }, { status: 201 });
});
```

### مثال 3: مع Custom Errors

```typescript
export const GET = withErrorHandler(async (request, { params }) => {
  const { id } = await params;
  const resource = await prisma.resource.findUnique({ where: { id } });

  if (!resource) {
    throw new NotFoundError('المورد');
  }

  return NextResponse.json({ success: true, data: resource });
});
```

## Best Practices

1. **استخدم `withErrorHandler` دائماً** للـ API routes
2. **استخدم Custom Errors** للرسائل الواضحة
3. **لا تستخدم try-catch** داخل handlers (withErrorHandler يتولى ذلك)
4. **استخدم Error Codes** للتعرف على نوع الخطأ
5. **أضف Context** للأخطاء المهمة

## التكامل مع Rate Limiting

يعمل بشكل مثالي مع Rate Limiting:

```typescript
export const POST = withErrorHandler(async (request: NextRequest) => {
  // Rate limiting
  const { response: rateLimitResponse } = await rateLimit(request);
  if (rateLimitResponse) return rateLimitResponse;

  // Handler code
  // ...
});
```

## ملاحظات

- جميع الأخطاء تُعاد بنفس التنسيق
- Operational errors لا تُسجل كـ errors (warnings فقط)
- Programming errors تُسجل كـ errors مع stack trace
- جاهز للتكامل مع Sentry أو أي error tracking service

