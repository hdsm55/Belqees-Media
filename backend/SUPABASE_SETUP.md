# إعداد Supabase مع المشروع

## ✅ التحقق من إعدادات Supabase

### 1. صيغة DATABASE_URL في Supabase

يجب أن يكون رابط Supabase بهذه الصيغة:

```
postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres?schema=public
```

أو:

```
postgresql://postgres.[YOUR-PROJECT-REF]:[YOUR-PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres?schema=public
```

### 2. إعدادات مهمة في Supabase

#### أ. Connection Pooling (مستحسن للإنتاج)
- استخدم **Connection Pooling** للإنتاج
- Port: `6543` (للـ Pooling) أو `5432` (مباشر)

#### ب. SSL Mode
للتطوير المحلي، قد تحتاج إلى إضافة `?sslmode=require`:

```
postgresql://postgres:[PASSWORD]@db.[PROJECT].supabase.co:5432/postgres?schema=public&sslmode=require
```

### 3. التحقق من الاتصال

#### الطريقة 1: استخدام Prisma

```bash
cd backend
npx prisma db pull
```

#### الطريقة 2: استخدام Script التحقق

```bash
cd backend
npx tsx check-connection.ts
```

#### الطريقة 3: استخدام Prisma Studio

```bash
cd backend
npm run db:studio
```

### 4. تشغيل Migration

بعد التأكد من الاتصال:

```bash
cd backend
npm run db:migrate
```

أو:

```bash
npx prisma migrate dev --name init
```

---

## 🔧 حل المشاكل الشائعة

### مشكلة: "Can't reach database server"

**الحل**:
1. تحقق من أن Supabase Project يعمل
2. تحقق من صحة DATABASE_URL
3. تأكد من إضافة `?sslmode=require` إذا لزم الأمر

### مشكلة: "SSL connection required"

**الحل**: أضف `sslmode=require` إلى DATABASE_URL:

```
postgresql://...?schema=public&sslmode=require
```

### مشكلة: "Connection timeout"

**الحل**:
1. تحقق من إعدادات Firewall في Supabase
2. تأكد من إضافة IP الخاص بك إلى Allowed IPs (للإنتاج)
3. للتطوير، استخدم Connection Pooling

### مشكلة: "Schema 'public' does not exist"

**الحل**: تأكد من إضافة `?schema=public` في نهاية DATABASE_URL

---

## 📝 مثال على ملف .env صحيح

```env
# Supabase Database URL
DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres?schema=public&sslmode=require"

# Server
PORT=3000
NODE_ENV=development

# Frontend URL
FRONTEND_URL=http://localhost:5173

# JWT
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRE=7d
JWT_REFRESH_SECRET=your-super-secret-refresh-key-change-this-in-production
JWT_REFRESH_EXPIRE=30d
```

---

## 🔐 الأمان

### للتطوير:
- استخدم Connection String من Supabase Dashboard
- لا تشارك ملف `.env` في Git

### للإنتاج:
- استخدم Environment Variables في منصة النشر
- استخدم Connection Pooling
- قم بتفعيل Row Level Security في Supabase

---

## 📚 روابط مفيدة

- [Supabase Database Docs](https://supabase.com/docs/guides/database)
- [Prisma with Supabase](https://www.prisma.io/docs/guides/deployment/deployment-guides/deploying-to-supabase)
- [Connection Pooling](https://supabase.com/docs/guides/database/connecting-to-postgres#connection-pooler)

