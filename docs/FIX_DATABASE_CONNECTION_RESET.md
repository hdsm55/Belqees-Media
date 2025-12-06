# 🔧 حل مشكلة Database Connection Reset

## المشكلة

```
prisma:error Error in PostgreSQL connection: Error {
  kind: Io,
  cause: Some(Os {
    code: 10054,
    kind: ConnectionReset,
    message: "An existing connection was forcibly closed by the remote host."
  })
}
```

## الأسباب المحتملة

1. **عدم استخدام Connection Pooler بشكل صحيح**
2. **عدم وجود retry logic عند فشل الاتصال**
3. **عدم وجود connection timeout settings**
4. **مشاكل في الشبكة أو قاعدة البيانات**

## الحلول

### 1. التحقق من DATABASE_URL

تأكد من أن `DATABASE_URL` في `.env.local` يستخدم **Session Pooler**:

```env
# ✅ صحيح - Session Pooler (للتطوير والإنتاج)
DATABASE_URL=postgresql://postgres.xxx:password@aws-1-ap-south-1.pooler.supabase.com:6543/postgres?pgbouncer=true&sslmode=require

# ❌ خطأ - Direct Connection (يسبب مشاكل في الإنتاج)
DATABASE_URL=postgresql://postgres.xxx:password@aws-1-ap-south-1.pooler.supabase.com:5432/postgres
```

**الفرق:**
- ✅ Port `6543` = Session Pooler (موصى به)
- ❌ Port `5432` = Direct Connection (قد يسبب مشاكل)

### 2. استخدام Retry Logic

تم تحديث `lib/prisma.ts` لإضافة:
- ✅ Retry logic تلقائي
- ✅ Connection health check
- ✅ Graceful shutdown

**الاستخدام:**

```typescript
import { prisma, retryDatabaseOperation } from '@/lib/prisma';

// استخدام عادي (مع retry تلقائي)
const events = await retryDatabaseOperation(async () => {
  return await prisma.event.findMany();
});

// أو استخدام مباشر (Prisma سيعيد المحاولة تلقائياً في بعض الحالات)
const events = await prisma.event.findMany();
```

### 3. إضافة Connection Pooling Parameters

إذا استمرت المشكلة، أضف هذه المعاملات إلى `DATABASE_URL`:

```env
DATABASE_URL=postgresql://postgres.xxx:password@aws-1-ap-south-1.pooler.supabase.com:6543/postgres?pgbouncer=true&sslmode=require&connection_limit=10&pool_timeout=10
```

**المعاملات:**
- `pgbouncer=true` - تفعيل Connection Pooling
- `sslmode=require` - تفعيل SSL
- `connection_limit=10` - حد الاتصالات المتزامنة
- `pool_timeout=10` - timeout للاتصال (بالثواني)

### 4. التحقق من Supabase Dashboard

1. افتح [Supabase Dashboard](https://supabase.com/dashboard)
2. اذهب إلى **Settings** → **Database**
3. تحقق من:
   - ✅ **Connection Pooling** مفعّل
   - ✅ **Session Mode** مفعّل (ليس Transaction Mode)
   - ✅ **Max Connections** كافٍ

### 5. استخدام Direct Connection للـ Migrations فقط

للـ migrations، استخدم Direct Connection (port 5432):

```env
# للـ migrations فقط
DATABASE_URL=postgresql://postgres.xxx:password@aws-1-ap-south-1.pooler.supabase.com:5432/postgres?sslmode=require

# للـ Application (Session Pooler)
DATABASE_URL=postgresql://postgres.xxx:password@aws-1-ap-south-1.pooler.supabase.com:6543/postgres?pgbouncer=true&sslmode=require
```

## اختبار الاتصال

### 1. اختبار بسيط

```bash
npm run db:check
```

### 2. اختبار عبر API

```bash
curl http://localhost:3000/api/test-db
```

### 3. اختبار في الكود

```typescript
import { checkDatabaseConnection } from '@/lib/prisma';

const isConnected = await checkDatabaseConnection();
console.log('Database connected:', isConnected);
```

## نصائح إضافية

### 1. تقليل عدد الاتصالات المتزامنة

إذا كان لديك الكثير من API routes التي تستخدم Prisma، قلل عدد الاتصالات:

```typescript
// في lib/prisma.ts
export const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL + '&connection_limit=5', // تقليل الاتصالات
    },
  },
});
```

### 2. استخدام Connection Pooling في Production

في Production، استخدم **Transaction Pooler** (port 6543) دائماً:

```env
# Production
DATABASE_URL=postgresql://postgres.xxx:password@aws-1-ap-south-1.pooler.supabase.com:6543/postgres?pgbouncer=true&sslmode=require&connection_limit=10
```

### 3. مراقبة الاتصالات

راقب عدد الاتصالات في Supabase Dashboard:
- **Settings** → **Database** → **Connection Pooling**

## استكشاف الأخطاء

### الخطأ: "Connection reset by peer"

**الحل:**
1. تحقق من `DATABASE_URL` (يجب أن يكون port 6543)
2. أضف `pgbouncer=true`
3. أعد تشغيل الخادم

### الخطأ: "Too many connections"

**الحل:**
1. قلل `connection_limit` في `DATABASE_URL`
2. استخدم Connection Pooling
3. تحقق من Supabase Dashboard للاتصالات النشطة

### الخطأ: "Connection timeout"

**الحل:**
1. أضف `pool_timeout=10` إلى `DATABASE_URL`
2. تحقق من الشبكة
3. تحقق من Supabase status

## المراجع

- [Supabase Connection Pooling](https://supabase.com/docs/guides/database/connecting-to-postgres#connection-pooler)
- [Prisma Connection Management](https://www.prisma.io/docs/guides/performance-and-optimization/connection-management)
- [Prisma Error Codes](https://www.prisma.io/docs/reference/api-reference/error-reference)

