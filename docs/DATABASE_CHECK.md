# 🔍 فحص قاعدة البيانات - Belqees Media

## ✅ طريقة فحص الاتصال

### الطريقة 1: استخدام Prisma Studio (الأسهل)

```bash
npm run db:studio
```

هذا سيفتح واجهة رسومية في المتصفح على `http://localhost:5555` حيث يمكنك:
- ✅ رؤية جميع الجداول
- ✅ فحص البيانات
- ✅ إضافة/تعديل/حذف البيانات

**إذا فتح Prisma Studio بنجاح = قاعدة البيانات متصلة! ✅**

---

### الطريقة 2: استخدام Prisma Migrate

```bash
npm run db:migrate
```

هذا سيقوم بـ:
- ✅ التحقق من الاتصال
- ✅ إنشاء الجداول إذا لم تكن موجودة
- ✅ تطبيق التغييرات على قاعدة البيانات

**إذا نجح الأمر = قاعدة البيانات متصلة! ✅**

---

### الطريقة 3: استخدام Prisma Generate

```bash
npm run db:generate
```

هذا سيقوم بـ:
- ✅ توليد Prisma Client
- ✅ التحقق من Schema
- ✅ التحقق من الاتصال (جزئياً)

---

## 🔍 فحص الاتصال يدوياً

### 1. التحقق من ملف `.env.local`

تأكد من وجود:
```env
DATABASE_URL=postgresql://postgres:[PASSWORD]@db.xxxxx.supabase.co:5432/postgres
```

### 2. التحقق من Supabase Dashboard

1. اذهب إلى [Supabase Dashboard](https://app.supabase.com)
2. اختر مشروعك
3. اذهب إلى **Database** → **Connection Pooling**
4. تأكد من أن المشروع يعمل

### 3. اختبار الاتصال

افتح Terminal في مجلد المشروع وقم بتشغيل:

```bash
# توليد Prisma Client
npx prisma generate

# فتح Prisma Studio
npx prisma studio
```

---

## ❌ حل المشاكل الشائعة

### خطأ: "Can't reach database server"

**الحل:**
1. تأكد من أن Supabase Project يعمل
2. تأكد من أن DATABASE_URL صحيح
3. تأكد من أن Firewall يسمح بالاتصال

### خطأ: "Authentication failed"

**الحل:**
1. تأكد من أن كلمة المرور في DATABASE_URL صحيحة
2. تأكد من أن المستخدم (postgres) موجود

### خطأ: "Table does not exist"

**الحل:**
1. قم بتشغيل `npm run db:migrate`
2. هذا سينشئ جميع الجداول المطلوبة

---

## ✅ التحقق النهائي

بعد فتح Prisma Studio، يجب أن ترى:

- ✅ **users** - جدول المستخدمين
- ✅ **pages** - جدول الصفحات
- ✅ **services** - جدول الخدمات
- ✅ **portfolio** - جدول الأعمال
- ✅ **events** - جدول الفعاليات
- ✅ **blog_posts** - جدول المدونات
- ✅ **categories** - جدول الفئات
- ✅ **tags** - جدول الوسوم
- ✅ **media** - جدول الملفات
- ✅ **translations** - جدول الترجمات
- ✅ **contact_messages** - جدول الرسائل

**إذا رأيت هذه الجداول = كل شيء يعمل بشكل صحيح! ✅**

---

## 🎯 الخطوة التالية

بعد التأكد من الاتصال:

1. **إذا كانت الجداول فارغة**: ابدأ بإضافة بيانات تجريبية
2. **إذا كانت الجداول غير موجودة**: قم بتشغيل `npm run db:migrate`
3. **إذا كان كل شيء يعمل**: يمكنك البدء في تطوير الموقع!

---

**جاهز!** 🚀

