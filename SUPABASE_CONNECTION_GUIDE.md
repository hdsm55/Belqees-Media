# 🔗 دليل الاتصال بقاعدة البيانات - Supabase

## 📊 اختيار نوع الاتصال

من الصورة التي أرسلتها، لديك 3 خيارات:

### 1. Direct connection ✅ (الموصى به لـ Next.js + Prisma)

**متى تستخدمه:**
- ✅ تطبيقات Next.js مع Prisma
- ✅ اتصالات دائمة وطويلة الأمد
- ✅ تطبيقات تعمل على Virtual Machines أو Containers

**هذا هو الخيار المناسب لمشروعك!**

### 2. Transaction pooler
- مناسب للتطبيقات Serverless (مثل Vercel Functions)
- كل اتصال قصير ومعزول

### 3. Session pooler
- بديل لـ Direct Connection عند الاتصال عبر IPv4

---

## 🚀 الخطوات

### الخطوة 1: تأكد من اختيار "Direct connection"

في الصورة، يجب أن يكون **"Direct connection"** محدد (كما هو موضح).

### الخطوة 2: نسخ Connection String

1. في الصورة، ابحث عن السطر الذي يبدأ بـ:
   ```
   postgresql://[YOUR_PASSWOR...
   ```

2. اضغط على **"View parameters"** (أو انسخ الرابط مباشرة)

3. ستحصل على رابط مثل:
   ```
   postgresql://postgres.[PROJECT-REF]:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres
   ```

   أو:
   ```
   postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres
   ```

### الخطوة 3: استبدال [YOUR_PASSWORD]

في الرابط، استبدل `[YOUR_PASSWORD]` أو `[PASSWORD]` بكلمة مرور قاعدة البيانات.

**إذا نسيت كلمة المرور:**
- اضغط على **"Reset your database password"** في أسفل الصفحة
- سيتم إرسال كلمة مرور جديدة إليك

### الخطوة 4: إضافة إلى .env.local

افتح ملف `.env.local` وأضف:

```env
DATABASE_URL=postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres?schema=public
```

**مثال:**
```env
DATABASE_URL=postgresql://postgres:MyPassword123@db.megkmakosbklvknhplcg.supabase.co:5432/postgres?schema=public
```

### الخطوة 5: إذا كان هناك تحذير "Not IP"

إذا رأيت تحذير "Not IP" مع زر "IPv4":
- اضغط على زر **"IPv4"** للحصول على Connection String مع IPv4
- أو استخدم **"Session pooler"** بدلاً من Direct connection

---

## 📝 مثال كامل

بعد نسخ Connection String واستبدال كلمة المرور، يجب أن يبدو هكذا:

```env
# في ملف .env.local

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://megkmakosbklvknhplcg.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here

# Database (من Supabase Connection String)
DATABASE_URL=postgresql://postgres:YourPassword123@db.megkmakosbklvknhplcg.supabase.co:5432/postgres?schema=public

# Next.js
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## ✅ بعد الإضافة

نفذ الأوامر التالية:

```bash
# تطبيق التغييرات على قاعدة البيانات
npx prisma db push

# إعادة توليد Prisma Client
npx prisma generate
```

---

## ⚠️ ملاحظات مهمة

1. **كلمة المرور**: حساسة جداً - لا تشاركها أبداً
2. **SSL**: إذا طلب Supabase SSL، أضف `&sslmode=require` في النهاية
3. **النسخ الاحتياطي**: احفظ كلمة المرور في مكان آمن

---

**بعد إضافة DATABASE_URL، جرب الأمر:**
```bash
npx prisma db push
```

يجب أن يعمل الآن! 🚀

