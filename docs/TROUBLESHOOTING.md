# حل المشاكل - Belqees Media

## ⚠️ المشاكل الشائعة وحلولها

### 1. خطأ: Invalid supabaseUrl

**الخطأ:**
```
Error: Invalid supabaseUrl: Must be a valid HTTP or HTTPS URL.
```

**السبب:**
- ملف `.env.local` يحتوي على قيم placeholder بدلاً من قيم Supabase الحقيقية
- أو المتغيرات غير موجودة

**الحل:**
1. افتح ملف `.env.local` (في الجذر، ليس في `app/`)
2. تأكد من أن القيم صحيحة:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-real-anon-key
   ```
3. لا تستخدم `your-supabase-project-url` - استخدم URL الحقيقي من Supabase

**ملاحظة:** إذا لم تكن قد أعددت Supabase بعد، يمكنك:
- إما إعداد Supabase (راجع [ENV_SETUP.md](./ENV_SETUP.md))
- أو تعطيل middleware مؤقتاً

---

### 2. خطأ: 404 Not Found

**الخطأ:**
```
GET / 404
```

**السبب:**
- تشغيل المشروع من مجلد خاطئ
- أو ملفات routing غير موجودة

**الحل:**
1. تأكد من أنك في **الجذر** وليس في `app/`:
   ```bash
   # من الجذر
   npm run dev
   ```
2. تأكد من وجود:
   - `app/(main)/page.tsx` - الصفحة الرئيسية
   - `app/layout.tsx` - Root Layout

---

### 3. خطأ: Cannot find module

**الخطأ:**
```
Cannot find module '@/components/...'
```

**السبب:**
- TypeScript paths غير صحيحة
- أو الملفات غير موجودة

**الحل:**
1. تأكد من وجود `tsconfig.json` في الجذر
2. تأكد من أن paths صحيحة:
   ```json
   "paths": {
     "@/*": ["./*"]
   }
   ```

---

### 4. خطأ: Prisma Client not generated

**الخطأ:**
```
@prisma/client did not initialize yet
```

**الحل:**
```bash
npm run db:generate
```

---

### 5. خطأ: Database connection failed

**الخطأ:**
```
Can't reach database server
```

**الحل:**
1. تأكد من `DATABASE_URL` في `.env.local`
2. تأكد من أن Supabase Project يعمل
3. تأكد من أن كلمة المرور صحيحة

---

## 🔧 نصائح عامة

1. **تأكد من المجلد الصحيح:**
   - المشروع يجب أن يعمل من **الجذر** وليس من `app/`
   - جميع الأوامر من الجذر: `npm run dev`

2. **ملف البيئة:**
   - يجب أن يكون `.env.local` في **الجذر**
   - لا تشاركه في Git

3. **إعادة التشغيل:**
   - بعد تغيير `.env.local`، أعد تشغيل المشروع
   - بعد `npm install`، أعد تشغيل المشروع

---

**للمزيد من المساعدة**: راجع [ENV_SETUP.md](./ENV_SETUP.md) و [NEXTJS_SETUP.md](./NEXTJS_SETUP.md)

