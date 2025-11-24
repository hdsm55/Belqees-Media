# دليل تشغيل Frontend - Belqees Media

## ✅ الخطوات السريعة

### 1. تثبيت Dependencies

من مجلد `frontend` في Git Bash:

```bash
cd frontend
npm install
```

**ملاحظة**: قد يستغرق هذا بضع دقائق في المرة الأولى.

### 2. تشغيل Frontend

بعد تثبيت Dependencies:

```bash
npm run dev
```

### 3. الوصول إلى Frontend

بعد التشغيل، سيفتح المتصفح تلقائياً على:

**http://localhost:5173**

أو يمكنك فتحه يدوياً في المتصفح.

---

## 🔍 التحقق من النجاح

إذا كان كل شيء يعمل بشكل صحيح، يجب أن ترى:

- ✅ صفحة ترحيبية "مرحباً بكم في بلقيس ميديا"
- ✅ Header في الأعلى
- ✅ Footer في الأسفل
- ✅ لا توجد أخطاء في Console

---

## ❌ حل المشاكل

### مشكلة: "Cannot find module"

**الحل**: قم بتثبيت Dependencies:
```bash
npm install
```

### مشكلة: "Port 5173 already in use"

**الحل**:
1. قم بإيقاف العملية التي تستخدم المنفذ
2. أو غيّر المنفذ في `vite.config.ts`:
   ```ts
   server: {
     port: 5174, // أو أي منفذ آخر
   }
   ```

### مشكلة: "Failed to resolve import"

**الحل**: تأكد من تثبيت جميع Dependencies:
```bash
npm install
```

---

## 📝 Scripts المتاحة

- `npm run dev` - تشغيل في وضع التطوير
- `npm run build` - بناء للإنتاج
- `npm run preview` - معاينة البناء
- `npm run lint` - فحص الكود
- `npm run format` - تنسيق الكود

---

## 🎯 الخطوات التالية

بعد التأكد من أن Frontend يعمل:

1. ✅ Frontend يعمل
2. ⏭️ بناء Backend API
3. ⏭️ ربط Frontend مع Backend
4. ⏭️ بناء Dashboard

---

**جاهز؟** قم بتشغيل `npm install` ثم `npm run dev` من مجلد `frontend`! 🚀

