# إعداد Supabase Storage

## إنشاء Storage Bucket

لتمكين رفع الصور والملفات، يجب إنشاء bucket في Supabase Storage:

### الخطوات:

1. **افتح Supabase Dashboard**
   - اذهب إلى [https://supabase.com/dashboard](https://supabase.com/dashboard)
   - اختر مشروعك

2. **انتقل إلى Storage**
   - من القائمة الجانبية، اضغط على **Storage**

3. **إنشاء Bucket جديد** ⚠️ **هذه الخطوة ضرورية قبل إعداد Policies**

   - اضغط على **New bucket** (أو **Create bucket**)
   - أدخل المعلومات التالية:
     - **الاسم:** `media` (بالضبط، حروف صغيرة فقط)
     - **Public bucket:** ✅ **مفعل** (يجب أن يكون public لعرض الصور)
     - **File size limit:** `10MB` (أو حسب احتياجك)
     - **Allowed MIME types:** اتركه فارغاً أو أضف:
       - `image/*`
       - `video/*`
       - `application/pdf`
   - اضغط **Create bucket** أو **Save**

   ⚠️ **مهم:** تأكد من أن الـ bucket تم إنشاؤه بنجاح ويظهر في قائمة Storage قبل المتابعة إلى الخطوة التالية.

4. **إعداد Policies (الصلاحيات)**

   بعد إنشاء الـ bucket، يجب إعداد Policies للسماح بالرفع والقراءة:

   - اضغط على الـ bucket `media`
   - اضغط على **Policies**
   - اضغط على **New Policy**

   **Policy 1: للقراءة (Public)**
   - **Policy Name:** `Public Read Access`
   - **Allowed operation:** ✅ **SELECT** (يجب تحديد SELECT)
   - **Target roles:** `anon, authenticated`
   - **Policy definition:**
   ```sql
   (bucket_id = 'media'::text)
   ```
   - اضغط **Review** ثم **Save policy**

   **Policy 2: للرفع (Authenticated only)**
   - **Policy Name:** `Authenticated Upload`
   - **Allowed operation:** ✅ **INSERT** (يجب تحديد INSERT فقط، لا تختار SELECT أو UPDATE أو DELETE)
   - **Target roles:** `authenticated` فقط (احذف `anon` إذا كان موجوداً)
   - **Policy definition (USING expression):** ⚠️ **هذا مهم جداً!**
     - اضغط على "USING expression" أو "USING"
     - أدخل الشرط التالي بالضبط:
     ```sql
     (bucket_id = 'media'::text)
     ```
     - ⚠️ تأكد من كتابة الشرط بالضبط كما هو (بما في ذلك الأقواس والفواصل)
   - **Policy definition (WITH CHECK expression):** ⚠️ **هذا مهم جداً أيضاً!**
     - اضغط على "WITH CHECK expression" أو "WITH CHECK"
     - أدخل نفس الشرط:
     ```sql
     (bucket_id = 'media'::text)
     ```
     - ⚠️ إذا لم يكن هناك حقل "WITH CHECK"، اتركه فارغاً أو استخدم نفس الشرط
   - اضغط **Review** ثم **Save policy**

   ⚠️ **ملاحظة مهمة جداً:**
   - إذا كانت Policy موجودة بالفعل ولكن لا تعمل، **احذفها وأعد إنشاءها** من جديد
   - تأكد من أن الشرط في USING و WITH CHECK مطابق تماماً: `(bucket_id = 'media'::text)`
   - لا تضع أي شروط إضافية أو تغييرات في الشرط

   ⚠️ **مهم جداً:**
   - تأكد من أن Policy للـ INSERT يطبق على `authenticated` فقط (ليس `anon`)
   - تأكد من تحديد **INSERT** فقط في "Allowed operation"
   - تأكد من حفظ كلا الـ Policies (يجب أن يظهرا في قائمة Policies)
   - إذا ظهرت رسالة "permission denied" أو "RLS policy violation" أو "403 Forbidden":
     1. تحقق من أن الشرط في Policy definition صحيح: `(bucket_id = 'media'::text)`
     2. تأكد من أن Policy للـ INSERT موجود ومفعل
     3. تأكد من أن المستخدم مسجل دخول (authenticated)
     4. جرب حذف Policy وإعادة إنشائها من جديد

   **ملاحظة مهمة:**
   - يجب تحديد **SELECT** للقراءة (getPublicUrl)
   - يجب تحديد **INSERT** للرفع (upload)
   - إذا لم تحدد أي عمليات، ستظهر رسالة خطأ: "Please allow at least one operation in your policy"

### التحقق من الإعداد:

بعد إعداد الـ bucket، جرب رفع صورة من لوحة التحكم. إذا ظهرت رسالة خطأ، تحقق من:

1. ✅ الـ bucket موجود واسمه `media`
2. ✅ الـ bucket public
3. ✅ Policies محددة بشكل صحيح
4. ✅ متغيرات البيئة في `.env.local`:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your-project-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   ```

### حل بديل: استخدام Service Role Key (يتجاوز RLS)

إذا كنت تواجه مشاكل مع RLS Policies، يمكنك استخدام Service Role Key للرفع (يتجاوز جميع Policies):

1. **احصل على Service Role Key:**
   - في Supabase Dashboard → Settings → API
   - انسخ `service_role` key (⚠️ **احفظه سراً!**)

2. **أضفه إلى `.env.local`:**
   ```
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
   ```

3. **ملاحظات مهمة:**
   - ⚠️ **لا تضع Service Role Key في Client Code**
   - ✅ استخدمه فقط في Server/API Routes
   - ✅ الكود يستخدم Service Role Key تلقائياً إذا كان متوفراً
   - ⚠️ Service Role Key يتجاوز جميع RLS Policies - استخدمه بحذر

### استكشاف الأخطاء:

إذا ظهرت رسالة "Bucket not found":
- تأكد من أن الـ bucket موجود في Supabase Dashboard
- تأكد من أن الاسم مطابق تماماً: `media` (حروف صغيرة)

إذا ظهرت رسالة "Permission denied":
- تحقق من Policies
- تأكد من أن المستخدم مسجل دخول (authenticated)

