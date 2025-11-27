# ✅ التحقق من إصلاح DATABASE_URL

## الخطوات المطلوبة

### 1. تأكد من تحديث .env.local

افتح ملف `.env.local` وتأكد من أن `DATABASE_URL` يبدو هكذا:

```env
DATABASE_URL=postgresql://postgres.megkmakosbklvknhplcg:Alialialj.55.66@aws-1-ap-south-1.pooler.supabase.com:6543/postgres?pgbouncer=true&sslmode=require
```

**مهم:**
- ✅ المنفذ: `6543` (ليس 5432)
- ✅ يحتوي على: `?pgbouncer=true&sslmode=require`
- ✅ العنوان: `aws-1-ap-south-1.pooler.supabase.com` (يحتوي على pooler)

### 2. احفظ الملف

بعد التعديل، **احفظ الملف** (Ctrl+S).

### 3. أعد تشغيل الخادم

**أوقف الخادم** (Ctrl+C) ثم شغله مرة أخرى:

```bash
npm run dev
```

**مهم جداً:** يجب إعادة تشغيل الخادم بعد تغيير `.env.local`!

### 4. جرب الاتصال مرة أخرى

افتح في المتصفح:
```
http://localhost:3000/api/test-db
```

---

## 🔍 إذا لم يعمل بعد

### التحقق من أن الخادم يقرأ .env.local

أضف endpoint للتحقق من DATABASE_URL (بدون كلمة المرور):

```typescript
// app/api/check-env/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  const dbUrl = process.env.DATABASE_URL;

  if (!dbUrl) {
    return NextResponse.json({
      error: 'DATABASE_URL not found',
    });
  }

  // إخفاء كلمة المرور
  const masked = dbUrl.replace(/:[^:@]+@/, ':****@');

  return NextResponse.json({
    hasDatabaseUrl: !!dbUrl,
    maskedUrl: masked,
    port: dbUrl.includes(':6543') ? '6543 ✅' : dbUrl.includes(':5432') ? '5432 ❌' : 'unknown',
    hasPooler: dbUrl.includes('pooler') ? '✅' : '❌',
    hasPgbouncer: dbUrl.includes('pgbouncer=true') ? '✅' : '❌',
  });
}
```

ثم افتح:
```
http://localhost:3000/api/check-env
```

---

## ⚠️ مشاكل شائعة

### 1. الخادم لم يعيد التشغيل
- **الحل:** أوقف الخادم (Ctrl+C) وشغله مرة أخرى

### 2. ملف .env.local في مكان خاطئ
- **الحل:** تأكد من أنه في **جذر المشروع** (نفس مجلد `package.json`)

### 3. تنسيق خاطئ
- **الحل:** تأكد من عدم وجود مسافات حول `=`
- **الحل:** تأكد من عدم وجود علامات اقتباس

### 4. Supabase Project Paused
- **الحل:** اذهب إلى Supabase Dashboard وتحقق من أن المشروع نشط

---

## ✅ DATABASE_URL الصحيح (نسخه كاملاً)

```env
DATABASE_URL=postgresql://postgres.megkmakosbklvknhplcg:Alialialj.55.66@aws-1-ap-south-1.pooler.supabase.com:6543/postgres?pgbouncer=true&sslmode=require
```

---

**بعد تحديث .env.local وإعادة تشغيل الخادم، جرب مرة أخرى!** 🚀

