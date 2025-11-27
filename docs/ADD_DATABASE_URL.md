# إضافة DATABASE_URL إلى .env.local

## المشكلة
الخطأ: `Environment variable not found: DATABASE_URL`

## الحل

### الخطوة 1: الحصول على DATABASE_URL من Supabase

1. اذهب إلى [Supabase Dashboard](https://app.supabase.com)
2. اختر مشروعك
3. اذهب إلى **Settings** (⚙️) → **Database**
4. ابحث عن **Connection string** أو **Connection pooling**
5. انسخ الرابط الذي يبدو هكذا:
   ```
   postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres
   ```

### الخطوة 2: إضافة DATABASE_URL إلى .env.local

افتح ملف `.env.local` وأضف السطر التالي:

```env
DATABASE_URL=postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres?schema=public
```

**مهم**: استبدل:
- `[YOUR-PASSWORD]` → كلمة مرور قاعدة البيانات (التي اخترتها عند إنشاء المشروع)
- `[YOUR-PROJECT-REF]` → معرف المشروع (مثل: `megkmakosbklvknhplcg`)

### مثال:

```env
DATABASE_URL=postgresql://postgres:MyPassword123@db.megkmakosbklvknhplcg.supabase.co:5432/postgres?schema=public
```

### الخطوة 3: إذا كان Supabase يطلب SSL

أضف `&sslmode=require` في النهاية:

```env
DATABASE_URL=postgresql://postgres:MyPassword123@db.megkmakosbklvknhplcg.supabase.co:5432/postgres?schema=public&sslmode=require
```

### الخطوة 4: تطبيق التغييرات

بعد إضافة `DATABASE_URL`، نفذ:

```bash
npx prisma db push
npx prisma generate
```

---

## 🔍 كيفية العثور على Project Reference

إذا لم تجد Project Reference:
1. اذهب إلى **Settings** → **General**
2. ابحث عن **Reference ID** أو **Project ID**
3. أو انظر إلى URL المشروع: `https://[PROJECT-REF].supabase.co`

---

## ⚠️ ملاحظات مهمة

1. **كلمة المرور**: إذا نسيت كلمة المرور، يمكنك إعادة تعيينها من Supabase Dashboard
2. **الأمان**: لا تشارك ملف `.env.local` أبداً
3. **النسخ الاحتياطي**: احفظ كلمة المرور في مكان آمن

---

**بعد إضافة DATABASE_URL، جرب الأمر مرة أخرى:**
```bash
npx prisma db push
```

