# متغيرات البيئة - Belqees Media
## دليل شامل لإعداد متغيرات البيئة

---

## 📋 نظرة عامة

هذا الملف يحتوي على جميع متغيرات البيئة المطلوبة لتشغيل المشروع. انسخ هذا الملف إلى `.env.local` واملأ القيم المطلوبة.

---

## 🚀 الإعداد السريع

```bash
# 1. انسخ الملف
cp docs/ENV_VARIABLES_AR.md .env.local

# 2. أو أنشئ ملف .env.local يدوياً وانسخ المحتوى أدناه
```

---

## 📝 متغيرات البيئة المطلوبة

### 1. Next.js Configuration

```env
NODE_ENV=development
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

**الوصف**:
- `NODE_ENV`: بيئة التشغيل (`development` أو `production`)
- `NEXT_PUBLIC_APP_URL`: رابط الموقع الأساسي (يُستخدم في sitemap, robots.txt)

---

### 2. Supabase Configuration (مطلوب)

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

**كيفية الحصول عليها**:
1. اذهب إلى [Supabase Dashboard](https://app.supabase.com)
2. اختر مشروعك
3. اذهب إلى **Settings** > **API**
4. انسخ:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

**الوصف**:
- `NEXT_PUBLIC_SUPABASE_URL`: رابط مشروع Supabase
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: المفتاح العام للوصول إلى Supabase

---

### 3. Database Configuration (مطلوب)

```env
DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres?pgbouncer=true&connection_limit=1"
```

**كيفية الحصول عليها**:
1. اذهب إلى Supabase Dashboard
2. اذهب إلى **Settings** > **Database**
3. في قسم **Connection String**:
   - اختر **Connection Pooling** (مُوصى به للإنتاج)
   - انسخ Connection String
   - استبدل `[YOUR-PASSWORD]` بكلمة المرور

**ملاحظات مهمة**:
- استخدم **Connection Pooling** في Production
- استخدم **Direct Connection** في Development (اختياري)
- لا تشارك `DATABASE_URL` أبداً (يحتوي على كلمة المرور)

---

### 4. Upstash Redis (اختياري - للـ Rate Limiting)

```env
UPSTASH_REDIS_REST_URL=https://your-redis.upstash.io
UPSTASH_REDIS_REST_TOKEN=your-redis-token-here
```

**كيفية الحصول عليها**:
1. اذهب إلى [Upstash Dashboard](https://console.upstash.com)
2. أنشئ Redis Database جديد
3. انسخ:
   - **REST URL** → `UPSTASH_REDIS_REST_URL`
   - **REST TOKEN** → `UPSTASH_REDIS_REST_TOKEN`

**ملاحظات**:
- في **Development**: يمكن العمل بدون Upstash (سيستخدم Memory Store)
- في **Production**: يُوصى بشدة باستخدام Upstash

---

## 🔮 متغيرات مستقبلية (اختيارية)

### 5. Email Service

#### Resend (مُوصى به)

```env
RESEND_API_KEY=re_xxxxxxxxxxxxx
```

#### أو SendGrid

```env
SENDGRID_API_KEY=SG.xxxxxxxxxxxxx
SENDGRID_FROM_EMAIL=noreply@belqeesmedia.com
```

---

### 6. Analytics

#### Google Analytics 4

```env
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

#### أو Plausible (Privacy-friendly)

```env
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=belqeesmedia.com
```

---

### 7. Error Tracking (Sentry)

```env
SENTRY_DSN=https://xxxxx@xxxxx.ingest.sentry.io/xxxxx
SENTRY_AUTH_TOKEN=your-sentry-auth-token
NEXT_PUBLIC_SENTRY_DSN=https://xxxxx@xxxxx.ingest.sentry.io/xxxxx
```

---

### 8. Security

```env
SECRET_KEY=your-secret-key-here-min-32-chars
```

**ملاحظة**: استخدم مفتاح عشوائي قوي (32 حرف على الأقل)

---

### 9. Feature Flags

```env
NEXT_PUBLIC_ENABLE_ANALYTICS=false
NEXT_PUBLIC_ENABLE_ERROR_TRACKING=false
```

---

## 📋 ملف .env.local الكامل

```env
# ============================================
# Belqees Media - Environment Variables
# ============================================

# Next.js Configuration
NODE_ENV=development
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Supabase Configuration (مطلوب)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here

# Database Configuration (مطلوب)
DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres?pgbouncer=true&connection_limit=1"

# Upstash Redis (اختياري - للـ Development يمكن تجاهله)
UPSTASH_REDIS_REST_URL=https://your-redis.upstash.io
UPSTASH_REDIS_REST_TOKEN=your-redis-token-here

# Email Service (اختياري - للمستقبل)
# RESEND_API_KEY=re_xxxxxxxxxxxxx

# Analytics (اختياري - للمستقبل)
# NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Error Tracking (اختياري - للمستقبل)
# SENTRY_DSN=https://xxxxx@xxxxx.ingest.sentry.io/xxxxx
# NEXT_PUBLIC_SENTRY_DSN=https://xxxxx@xxxxx.ingest.sentry.io/xxxxx

# Security (اختياري)
# SECRET_KEY=your-secret-key-here-min-32-chars

# Feature Flags (اختياري)
# NEXT_PUBLIC_ENABLE_ANALYTICS=false
# NEXT_PUBLIC_ENABLE_ERROR_TRACKING=false
```

---

## ✅ التحقق من الإعداد

بعد إعداد ملف `.env.local`، تحقق من:

1. **تشغيل المشروع**:
   ```bash
   npm run dev
   ```

2. **التحقق من الاتصال بقاعدة البيانات**:
   ```bash
   npm run db:check
   ```

3. **التحقق من Supabase**:
   - افتح المتصفح على `http://localhost:3000`
   - جرب تسجيل الدخول

---

## 🔒 الأمان

### ⚠️ مهم جداً:

1. **لا تشارك ملف `.env.local` أبداً**
   - موجود في `.gitignore`
   - لا ترفعه إلى GitHub
   - لا ترسله عبر البريد الإلكتروني

2. **في Production**:
   - استخدم Environment Variables في منصة النشر (Vercel, etc.)
   - لا تضع المتغيرات في الكود
   - استخدم Secrets Management

3. **Rotation**:
   - غيّر المفاتيح بانتظام
   - خاصة بعد أي تسريب محتمل

---

## 🐛 استكشاف الأخطاء

### خطأ: "Missing Supabase environment variables"
**الحل**: تأكد من وجود `NEXT_PUBLIC_SUPABASE_URL` و `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### خطأ: "Database connection failed"
**الحل**:
- تحقق من `DATABASE_URL`
- تأكد من أن كلمة المرور صحيحة
- تحقق من أن Supabase Database يعمل

### خطأ: "Rate limit error"
**الحل**:
- في Development: يمكن تجاهل Upstash (Memory Store)
- في Production: تأكد من إعداد Upstash بشكل صحيح

---

## 📚 روابط مفيدة

- [Supabase Documentation](https://supabase.com/docs)
- [Upstash Documentation](https://docs.upstash.com)
- [Next.js Environment Variables](https://nextjs.org/docs/basic-features/environment-variables)
- [Prisma Environment Variables](https://www.prisma.io/docs/concepts/components/prisma-schema/overview)

---

**آخر تحديث**: {{ تاريخ اليوم }}

