# إعداد ملف .env.local

## المشكلة
Prisma لا يجد `DATABASE_URL` في ملف `.env.local`.

## الحل

### الخطوة 1: افتح ملف .env.local

افتح ملف `.env.local` في مجلد المشروع (في نفس المجلد الذي يحتوي على `package.json`).

### الخطوة 2: أضف DATABASE_URL

أضف السطر التالي في الملف (استبدل القيم بين الأقواس):

```env
DATABASE_URL=postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres?schema=public
```

### الخطوة 3: مثال كامل لملف .env.local

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://megkmakosbklvknhplcg.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here

# Database (من Supabase Connection String)
DATABASE_URL=postgresql://postgres:YourPassword123@db.megkmakosbklvknhplcg.supabase.co:5432/postgres?schema=public

# Next.js
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### الخطوة 4: تأكد من:

1. ✅ **لا توجد مسافات** قبل أو بعد `=`
2. ✅ **لا توجد علامات اقتباس** حول القيمة
3. ✅ **السطر يبدأ مباشرة** بـ `DATABASE_URL=`
4. ✅ **لا يوجد `#`** في بداية السطر (إلا إذا كان تعليق)

### الخطوة 5: احفظ الملف

بعد إضافة `DATABASE_URL`، **احفظ الملف** (Ctrl+S).

### الخطوة 6: جرب الأمر مرة أخرى

```bash
npx prisma db push
```

---

## ⚠️ ملاحظات مهمة

1. **اسم الملف**: يجب أن يكون `.env.local` (مع النقطة في البداية)
2. **الموقع**: يجب أن يكون في **جذر المشروع** (نفس مجلد `package.json`)
3. **التنسيق**: لا توجد مسافات حول `=`

---

## 🔍 التحقق من الملف

بعد إضافة `DATABASE_URL`، يمكنك التحقق:

```bash
# في Windows PowerShell
Get-Content .env.local | Select-String "DATABASE_URL"
```

يجب أن يظهر السطر الذي يحتوي على `DATABASE_URL`.

---

**بعد إضافة DATABASE_URL وحفظ الملف، جرب:**
```bash
npx prisma db push
```

