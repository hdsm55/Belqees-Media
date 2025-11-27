# 🔍 اختبار الاتصال بقاعدة البيانات

## طريقة 1: استخدام API Endpoint (الأسهل)

تم إنشاء endpoint للاختبار:

### الخطوة 1: تأكد من أن الخادم يعمل

```bash
npm run dev
```

### الخطوة 2: افتح المتصفح وانتقل إلى:

```
http://localhost:3000/api/test-db
```

### النتيجة المتوقعة:

**إذا نجح الاتصال:**
```json
{
  "success": true,
  "message": "الاتصال بقاعدة البيانات نجح!",
  "data": {
    "connection": "✅ متصل",
    "query": "✅ يعمل",
    "tables": ["users", "pages", ...],
    "users": {
      "count": 0,
      "hasSupabaseUserId": true/false
    }
  }
}
```

**إذا فشل الاتصال:**
```json
{
  "success": false,
  "message": "فشل الاتصال بقاعدة البيانات",
  "error": "...",
  "details": {...}
}
```

---

## طريقة 2: استخدام Prisma Studio

```bash
npm run db:studio
```

إذا فتح Prisma Studio بنجاح، يعني الاتصال يعمل.

---

## طريقة 3: استخدام Terminal

```bash
npm run db:check
```

---

## طريقة 4: اختبار مباشر مع Node.js

أنشئ ملف `test-connection-simple.js`:

```javascript
require('dotenv').config({ path: '.env.local' });

async function test() {
  try {
    const { PrismaClient } = require('@prisma/client');
    const prisma = new PrismaClient();

    await prisma.$connect();
    console.log('✅ الاتصال نجح!');

    const result = await prisma.$queryRaw`SELECT 1 as test`;
    console.log('✅ الاستعلام نجح!', result);

    await prisma.$disconnect();
    console.log('✅ تم إغلاق الاتصال');
  } catch (error) {
    console.error('❌ خطأ:', error.message);
    process.exit(1);
  }
}

test();
```

ثم شغله:
```bash
node test-connection-simple.js
```

---

## ✅ بعد الاختبار

إذا نجح الاتصال:
1. ✅ قاعدة البيانات متصلة
2. ✅ يمكنك الآن تشغيل: `npx prisma db push`

إذا فشل الاتصال:
1. تحقق من `DATABASE_URL` في `.env.local`
2. تأكد من استخدام **Session Pooler** من Supabase
3. تأكد من أن Supabase Project نشط

---

**جرب الطريقة 1 أولاً - الأسهل والأسرع!** 🚀

