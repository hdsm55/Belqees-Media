# 🔧 إصلاح DATABASE_URL

## المشكلة في DATABASE_URL الحالي

```
DATABASE_URL=postgresql://postgres.megkmakosbklvknhplcg:Alialialj.55.66@aws-1-ap-south-1.pooler.supabase.com:5432/postgres
```

### المشاكل:
1. ❌ المنفذ `5432` - يجب أن يكون `6543` لـ Session Pooler
2. ❌ لا يحتوي على `pgbouncer=true`
3. ❌ لا يحتوي على `sslmode=require`

## ✅ DATABASE_URL الصحيح

افتح ملف `.env.local` واستبدل `DATABASE_URL` بهذا:

```env
DATABASE_URL=postgresql://postgres.megkmakosbklvknhplcg:Alialialj.55.66@aws-1-ap-south-1.pooler.supabase.com:6543/postgres?pgbouncer=true&sslmode=require
```

### التغييرات:
- ✅ المنفذ: `5432` → `6543`
- ✅ أضف: `?pgbouncer=true&sslmode=require`

## 📝 ملف .env.local الكامل

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://megkmakosbklvknhplcg.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here

# Database (Session Pooler - صحيح)
DATABASE_URL=postgresql://postgres.megkmakosbklvknhplcg:Alialialj.55.66@aws-1-ap-south-1.pooler.supabase.com:6543/postgres?pgbouncer=true&sslmode=require

# Next.js
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Optional
NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET=media
```

## ✅ بعد التحديث

1. احفظ ملف `.env.local`
2. أعد تشغيل الخادم:
   ```bash
   npm run dev
   ```
3. جرب الاتصال:
   ```
   http://localhost:3000/api/test-db
   ```

يجب أن ترى:
```json
{
  "success": true,
  "message": "الاتصال بقاعدة البيانات نجح!",
  ...
}
```

---

**بعد التحديث، جرب الاتصال مرة أخرى!** 🚀

