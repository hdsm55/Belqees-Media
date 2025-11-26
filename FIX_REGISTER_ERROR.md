# 🔧 إصلاح خطأ 500 في Register

## المشكلة

خطأ 500 عند محاولة إنشاء حساب جديد. السبب: عمود `supabaseUserId` غير موجود في قاعدة البيانات.

## ✅ الحل المؤقت

تم تعديل الكود ليكون أكثر مرونة - إذا كان العمود غير موجود، سيتم إنشاء المستخدم بدونه.

## 🔧 الحل الدائم: إضافة العمود

### الطريقة 1: Supabase SQL Editor (الأسهل)

1. اذهب إلى [Supabase Dashboard](https://app.supabase.com)
2. اختر مشروعك
3. اذهب إلى **SQL Editor**
4. انسخ والصق:

```sql
-- Add supabaseUserId column
ALTER TABLE "users"
ADD COLUMN IF NOT EXISTS "supabaseUserId" TEXT;

-- Add unique constraint
CREATE UNIQUE INDEX IF NOT EXISTS "users_supabaseUserId_key" ON "users"("supabaseUserId");
```

5. اضغط **Run**

### الطريقة 2: استخدام Prisma (إذا كان يعمل)

```bash
npx prisma db push
```

---

## ✅ بعد إضافة العمود

1. **جرب إنشاء حساب جديد:**
   ```
   http://localhost:3000/register
   ```

2. **يجب أن يعمل الآن!**

---

## 📝 ملاحظة

الكود الآن يتعامل مع حالة عدم وجود العمود، لكن **يجب إضافة العمود** للعمل بشكل صحيح مع Supabase Auth.

---

**استخدم الطريقة 1 (Supabase SQL Editor) - الأسهل!** 🚀

