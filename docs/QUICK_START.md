# دليل البدء السريع - Belqees Media

## 🚀 البدء السريع

### 1. تثبيت Dependencies

```bash
npm install
```

### 2. إعداد ملف البيئة

```bash
cp env.example .env.local
```

ثم قم بتعديل `.env.local` وأضف معلومات Supabase (راجع [ENV_SETUP.md](./ENV_SETUP.md)).

### 3. إعداد قاعدة البيانات

```bash
# توليد Prisma Client
npm run db:generate

# تشغيل Migrations
npm run db:migrate
```

### 4. تشغيل المشروع

```bash
npm run dev
```

### 5. الوصول إلى المشروع

- **الموقع**: http://localhost:3000
- **API Health Check**: http://localhost:3000/api/health

---

## 📋 الأوامر المتاحة

```bash
# التطوير
npm run dev          # تشغيل المشروع في وضع التطوير

# البناء
npm run build        # بناء المشروع للإنتاج
npm run start        # تشغيل المشروع بعد البناء

# قاعدة البيانات
npm run db:generate  # توليد Prisma Client
npm run db:migrate   # تشغيل Migrations
npm run db:studio    # فتح Prisma Studio

# الجودة
npm run lint         # فحص الكود
```

---

## ⚠️ ملاحظات مهمة

1. تأكد من إعداد `.env.local` قبل تشغيل المشروع
2. تأكد من أن Supabase Project يعمل
3. تأكد من أن DATABASE_URL صحيح في `.env.local`

---

**للتفاصيل الكاملة**: راجع [NEXTJS_SETUP.md](./NEXTJS_SETUP.md)

