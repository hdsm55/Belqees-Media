# ✅ التحقق من تطابق قاعدة البيانات مع Schema

## 📋 الجداول المتوقعة

حسب `prisma/schema.prisma`، يجب أن تكون هذه الجداول موجودة:

| # | Model | Table Name | الوصف |
|---|-------|------------|-------|
| 1 | User | users | المستخدمين |
| 2 | Page | pages | الصفحات |
| 3 | Service | services | الخدمات |
| 4 | Portfolio | portfolio | الأعمال |
| 5 | Event | events | الفعاليات |
| 6 | BlogPost | blog_posts | المدونات |
| 7 | Category | categories | الفئات |
| 8 | Tag | tags | الوسوم |
| 9 | Media | media | الملفات |
| 10 | Translation | translations | الترجمات |
| 11 | ContactMessage | contact_messages | الرسائل |

**المجموع: 11 جدول**

---

## 🔍 التحقق من التطابق

### الطريقة 1: استخدام سكريبت التحقق

```bash
npm run db:verify
```

هذا السكريبت سيقوم بـ:
- ✅ التحقق من الاتصال
- ✅ التحقق من وجود جميع الجداول
- ✅ عرض عدد السجلات في كل جدول
- ❌ إظهار الأخطاء إذا كانت هناك مشاكل

### الطريقة 2: استخدام Prisma Studio

```bash
npm run db:studio
```

افتح `http://localhost:5555` وتحقق من:
- ✅ وجود جميع الجداول (11 جدول)
- ✅ الأسماء صحيحة
- ✅ البنية صحيحة

---

## ❌ إذا كانت الجداول لا تتطابق

إذا اكتشفت أن الجداول لا تتطابق مع Schema:

### الحل: إعادة تعيين قاعدة البيانات

```bash
npm run db:reset
```

هذا سيقوم بـ:
1. حذف جميع الجداول
2. حذف جميع البيانات
3. إعادة إنشاء الجداول من Schema
4. تطبيق جميع Migrations

---

## 📊 بنية كل جدول

### 1. User (users)
```prisma
- id: String (CUID)
- email: String (unique)
- password: String? (optional)
- role: UserRole (enum)
- supabaseUserId: String? (unique, optional)
- createdAt: DateTime
- updatedAt: DateTime
```

### 2. Page (pages)
```prisma
- id: String (CUID)
- slug: String (unique)
- title: String
- content: Json? (optional)
- blocks: Json? (optional)
- seo: Json? (optional)
- published: Boolean (default: false)
- createdAt: DateTime
- updatedAt: DateTime
```

### 3. Service (services)
```prisma
- id: String (CUID)
- slug: String (unique)
- title: String
- description: String? (optional)
- icon: String? (optional)
- image: String? (optional)
- content: Json? (optional)
- published: Boolean (default: false)
- createdAt: DateTime
- updatedAt: DateTime
```

### 4. Portfolio (portfolio)
```prisma
- id: String (CUID)
- slug: String (unique)
- title: String
- description: String? (optional)
- images: Json? (optional)
- videos: Json? (optional)
- category: String? (optional)
- published: Boolean (default: false)
- createdAt: DateTime
- updatedAt: DateTime
```

### 5. Event (events)
```prisma
- id: String (CUID)
- slug: String (unique)
- title: String
- description: String? (optional)
- date: DateTime
- time: String? (optional)
- location: String? (optional)
- image: String? (optional)
- registrations: Json? (optional)
- published: Boolean (default: false)
- createdAt: DateTime
- updatedAt: DateTime
```

### 6. BlogPost (blog_posts)
```prisma
- id: String (CUID)
- slug: String (unique)
- title: String
- excerpt: String? (optional)
- content: String (Text)
- featuredImage: String? (optional)
- categoryId: String? (optional, FK to Category)
- authorId: String (FK to User)
- published: Boolean (default: false)
- publishedAt: DateTime? (optional)
- createdAt: DateTime
- updatedAt: DateTime
```

### 7. Category (categories)
```prisma
- id: String (CUID)
- slug: String (unique)
- name: String
- description: String? (optional)
- createdAt: DateTime
- updatedAt: DateTime
```

### 8. Tag (tags)
```prisma
- id: String (CUID)
- slug: String (unique)
- name: String
- createdAt: DateTime
- updatedAt: DateTime
```

### 9. Media (media)
```prisma
- id: String (CUID)
- filename: String
- url: String
- type: String
- size: Int
- uploadedBy: String (FK to User)
- createdAt: DateTime
```

### 10. Translation (translations)
```prisma
- id: String (CUID)
- entityType: String
- entityId: String
- language: String
- field: String
- value: String (Text)
- createdAt: DateTime
- updatedAt: DateTime
- Unique: [entityType, entityId, language, field]
```

### 11. ContactMessage (contact_messages)
```prisma
- id: String (CUID)
- name: String
- email: String
- subject: String? (optional)
- message: String (Text)
- read: Boolean (default: false)
- createdAt: DateTime
```

---

## ✅ التحقق النهائي

بعد إعادة التعيين، تأكد من:

1. ✅ **جميع الجداول موجودة** (11 جدول)
2. ✅ **الأسماء صحيحة** (كما في Schema)
3. ✅ **البنية صحيحة** (الحقول والعلاقات)
4. ✅ **لا توجد جداول إضافية** (غير موجودة في Schema)

---

**جاهز!** 🚀

