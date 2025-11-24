# 🔄 إعادة تعيين قاعدة البيانات - Belqees Media

## ⚠️ تحذير مهم

**هذا الأمر سيقوم بـ:**
- ❌ حذف جميع الجداول من قاعدة البيانات
- ❌ حذف جميع البيانات
- ✅ إعادة إنشاء الجداول من Schema الحالي
- ✅ تطبيق جميع Migrations من جديد

**استخدم هذا الأمر فقط عندما:**
- تريد إعادة تعيين قاعدة البيانات بالكامل
- تريد التأكد من تطابق الجداول مع Schema
- تريد البدء من جديد

---

## 🚀 طريقة الاستخدام

### 1. التحقق من Schema الحالي

قبل إعادة التعيين، تأكد من أن `prisma/schema.prisma` يحتوي على الجداول الصحيحة:

```prisma
- User (users)
- Page (pages)
- Service (services)
- Portfolio (portfolio)
- Event (events)
- BlogPost (blog_posts)
- Category (categories)
- Tag (tags)
- Media (media)
- Translation (translations)
- ContactMessage (contact_messages)
```

### 2. إعادة تعيين قاعدة البيانات

```bash
npm run db:reset
```

سيطلب منك تأكيد العملية. اكتب **"نعم"** للمتابعة.

### 3. التحقق من النتيجة

بعد إعادة التعيين، قم بفتح Prisma Studio:

```bash
npm run db:studio
```

يجب أن ترى جميع الجداول (11 جدول) فارغة (0 records).

---

## 🔍 التحقق من تطابق Schema

للتحقق من أن الجداول تتطابق مع Schema:

```bash
npm run db:verify
```

هذا الأمر سيقوم بـ:
- ✅ التحقق من الاتصال
- ✅ التحقق من وجود جميع الجداول
- ✅ عرض عدد السجلات في كل جدول
- ❌ إظهار الأخطاء إذا كانت هناك مشاكل

---

## 📋 الجداول المتوقعة

بعد إعادة التعيين، يجب أن ترى هذه الجداول:

| Model | Table | الوصف |
|-------|-------|-------|
| User | users | المستخدمين |
| Page | pages | الصفحات |
| Service | services | الخدمات |
| Portfolio | portfolio | الأعمال |
| Event | events | الفعاليات |
| BlogPost | blog_posts | المدونات |
| Category | categories | الفئات |
| Tag | tags | الوسوم |
| Media | media | الملفات |
| Translation | translations | الترجمات |
| ContactMessage | contact_messages | الرسائل |

---

## 🔧 الأوامر المتاحة

```bash
# إعادة تعيين قاعدة البيانات بالكامل
npm run db:reset

# التحقق من تطابق Schema
npm run db:verify

# فتح Prisma Studio
npm run db:studio

# إنشاء Migration جديد
npm run db:migrate

# توليد Prisma Client
npm run db:generate
```

---

## ❌ حل المشاكل

### خطأ: "Can't reach database"
- تأكد من أن `DATABASE_URL` صحيح في `.env.local`
- تأكد من أن Supabase Project يعمل

### خطأ: "Authentication failed"
- تأكد من أن كلمة المرور في `DATABASE_URL` صحيحة

### خطأ: "Table does not exist"
- قم بتشغيل `npm run db:reset` لإعادة إنشاء الجداول

---

## ✅ بعد إعادة التعيين

1. **افتح Prisma Studio** للتحقق:
   ```bash
   npm run db:studio
   ```

2. **أضف بيانات تجريبية** (اختياري):
   - يمكنك إضافة بيانات من خلال Prisma Studio
   - أو من خلال API Routes

3. **ابدأ التطوير**:
   - الآن قاعدة البيانات جاهزة
   - يمكنك البدء في تطوير الموقع

---

**جاهز!** 🚀

