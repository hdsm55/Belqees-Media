# 🔧 إصلاح خطأ Prisma Client

## المشكلة
```
Prisma Client Error: Unable to run script
```

الخطأ يحدث لأن:
1. المسار يحتوي على أحرف عربية (`قناة بلقيس`)
2. Prisma Client لم يتم توليده بشكل صحيح
3. قد تكون هناك مشكلة في DATABASE_URL

## الحلول

### الحل 1: إعادة توليد Prisma Client (الأولوية)

```bash
# حذف Prisma Client القديم
Remove-Item -Recurse -Force node_modules\.prisma

# إعادة توليد Prisma Client
npx prisma generate
```

### الحل 2: إعادة تثبيت node_modules

```bash
# حذف node_modules
Remove-Item -Recurse -Force node_modules

# إعادة التثبيت
npm install

# توليد Prisma Client
npx prisma generate
```

### الحل 3: التحقق من DATABASE_URL

تأكد من أن `DATABASE_URL` موجود وصحيح في `.env.local`:

```env
DATABASE_URL=postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres?schema=public&sslmode=require
```

أو مع Session Pooler:

```env
DATABASE_URL=postgresql://postgres.[PROJECT-REF]:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres?pgbouncer=true&sslmode=require
```

### الحل 4: استخدام Prisma Studio من Terminal

بدلاً من فتح Prisma Studio من Cursor، استخدم Terminal:

```bash
npm run db:studio
```

### الحل 5: اختبار الاتصال من API

```bash
# شغل الخادم
npm run dev

# افتح في المتصفح
http://localhost:3000/api/test-db
```

---

## ⚠️ ملاحظة مهمة

المسار يحتوي على أحرف عربية (`قناة بلقيس`). هذا قد يسبب مشاكل مع بعض الأدوات.

**الحل الدائم (اختياري):**
- نقل المشروع إلى مسار بدون أحرف عربية
- مثال: `E:\Projects\Belqees-Media`

لكن هذا ليس ضرورياً - الحلول أعلاه يجب أن تعمل.

---

## ✅ بعد الإصلاح

1. جرب فتح Prisma Studio مرة أخرى:
   ```bash
   npm run db:studio
   ```

2. أو استخدم API للاختبار:
   ```bash
   npm run dev
   # ثم افتح: http://localhost:3000/api/test-db
   ```

---

**ابدأ بالحل 1 - إعادة توليد Prisma Client!** 🚀

