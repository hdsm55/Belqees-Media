# 🔍 اختبار سريع للاتصال بقاعدة البيانات

## طريقة 1: استخدام السكريبت الموجود

```bash
npm run db:check
```

## طريقة 2: اختبار مباشر مع Prisma

```bash
npx prisma db pull
```

هذا الأمر سيحاول الاتصال بقاعدة البيانات وسحب الـ Schema. إذا نجح، يعني الاتصال يعمل.

## طريقة 3: استخدام Prisma Studio

```bash
npm run db:studio
```

إذا فتح Prisma Studio بنجاح، يعني الاتصال يعمل.

## طريقة 4: اختبار بسيط مع Node.js

أنشئ ملف `test.js` في جذر المشروع:

```javascript
require('dotenv').config({ path: '.env.local' });

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function test() {
  try {
    await prisma.$connect();
    console.log('✅ الاتصال نجح!');
    const result = await prisma.$queryRaw`SELECT 1 as test`;
    console.log('✅ الاستعلام نجح!', result);
    await prisma.$disconnect();
  } catch (error) {
    console.error('❌ خطأ:', error.message);
    process.exit(1);
  }
}

test();
```

ثم شغله:
```bash
node test.js
```

## طريقة 5: التحقق من DATABASE_URL مباشرة

```bash
# في PowerShell
Get-Content .env.local | Select-String "DATABASE_URL"
```

يجب أن يظهر السطر الذي يحتوي على `DATABASE_URL=...`

---

## 🔧 إذا لم يعمل أي شيء

1. **تحقق من ملف .env.local**:
   - يجب أن يكون في جذر المشروع
   - يجب أن يحتوي على `DATABASE_URL=...`
   - لا توجد مسافات حول `=`

2. **تحقق من DATABASE_URL**:
   - يجب أن يبدأ بـ `postgresql://`
   - يجب أن يحتوي على كلمة المرور الصحيحة
   - يجب أن يحتوي على معرف المشروع الصحيح

3. **تحقق من Supabase**:
   - تأكد من أن المشروع يعمل
   - تأكد من أن قاعدة البيانات نشطة

---

**جرب الطريقة 1 أولاً:**
```bash
npm run db:check
```

