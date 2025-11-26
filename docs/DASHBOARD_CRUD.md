# Dashboard CRUD Operations - دليل شامل

## نظرة عامة

تم تحسين نظام Dashboard CRUD operations بشكل احترافي مع مكونات قابلة لإعادة الاستخدام، واجهة مستخدم محسنة، ومعالجة أخطاء شاملة.

## المكونات الأساسية

### 1. Toast Notifications System

نظام إشعارات شامل للتفاعل مع المستخدم:

**الملفات:**
- `components/dashboard/Toast.tsx` - مكون Toast الفردي
- `components/dashboard/ToastContainer.tsx` - Provider و Context للـ Toasts

**الاستخدام:**
```typescript
import { useToast } from '@/components/dashboard/ToastContainer';

const { success, error, warning, info } = useToast();

// عرض إشعار
success('تم الحفظ بنجاح');
error('حدث خطأ أثناء الحفظ');
warning('تحذير: البيانات قديمة');
info('معلومة: تم التحديث');
```

### 2. DataTable Component

مكون جدول بيانات شامل مع البحث والترتيب والتصفح:

**الملفات:**
- `components/dashboard/DataTable.tsx`

**الميزات:**
- ✅ بحث في جميع الأعمدة
- ✅ ترتيب حسب الأعمدة
- ✅ تصفح الصفحات (Pagination)
- ✅ تخصيص عرض الأعمدة
- ✅ إجراءات مخصصة لكل صف

**الاستخدام:**
```typescript
import DataTable, { Column } from '@/components/dashboard/DataTable';

const columns: Column<Page>[] = [
  {
    key: 'title',
    label: 'العنوان',
    sortable: true,
  },
  {
    key: 'published',
    label: 'الحالة',
    render: (value) => (
      <span className={value ? 'text-green-600' : 'text-gray-600'}>
        {value ? 'منشور' : 'مسودة'}
      </span>
    ),
  },
];

<DataTable
  data={pages}
  columns={columns}
  searchable={true}
  pagination={true}
  pageSize={10}
  actions={(page) => <PageActions page={page} />}
/>
```

### 3. CRUD Hooks

Hook شامل لعمليات CRUD:

**الملفات:**
- `lib/dashboard/hooks.ts`

**الاستخدام:**
```typescript
import { useCrud } from '@/lib/dashboard/hooks';

const { create, update, remove, fetchOne, isLoading, error } = useCrud({
  endpoint: '/api/pages',
  redirectPath: '/dashboard/pages',
  onSuccess: (data) => {
    console.log('Success:', data);
  },
  onError: (error) => {
    console.error('Error:', error);
  },
});

// إنشاء
await create({ title: 'صفحة جديدة', slug: 'new-page' });

// تحديث
await update(id, { title: 'عنوان محدث' });

// حذف
await remove(id);

// جلب واحد
const page = await fetchOne(id);
```

### 4. Form Components

مكونات نموذج محسنة:

**الملفات:**
- `components/dashboard/Form.tsx` - مكون Form الأساسي
- `components/dashboard/FormField.tsx` - حقل نموذج مع Label و Error

**الاستخدام:**
```typescript
import Form from '@/components/dashboard/Form';
import FormField from '@/components/dashboard/FormField';

<Form onSubmit={handleSubmit} isLoading={isLoading}>
  <FormField label="العنوان" required error={errors.title}>
    <Input
      value={formData.title}
      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
      error={errors.title}
    />
  </FormField>
</Form>
```

### 5. Confirm Dialog

نافذة تأكيد للحذف والإجراءات الخطرة:

**الملفات:**
- `components/dashboard/ConfirmDialog.tsx`

**الاستخدام:**
```typescript
import ConfirmDialog from '@/components/dashboard/ConfirmDialog';

const [showDialog, setShowDialog] = useState(false);

<ConfirmDialog
  isOpen={showDialog}
  title="حذف الصفحة"
  message="هل أنت متأكد من الحذف؟"
  confirmText="حذف"
  cancelText="إلغاء"
  variant="danger"
  onConfirm={handleDelete}
  onCancel={() => setShowDialog(false)}
/>
```

### 6. Navigation Components

مكونات التنقل المحسنة:

**الملفات:**
- `components/dashboard/NavLink.tsx`

**الميزات:**
- ✅ تحديد الصفحة النشطة تلقائياً
- ✅ أيقونات و Badges
- ✅ دعم Dark Mode

## صفحات Dashboard

### الصفحات المتوفرة

1. **Pages** (`/dashboard/pages`)
   - عرض جميع الصفحات
   - إنشاء صفحة جديدة
   - تعديل صفحة
   - حذف صفحة

2. **Services** (`/dashboard/services`)
   - عرض جميع الخدمات
   - إنشاء خدمة جديدة
   - تعديل خدمة
   - حذف خدمة

3. **Portfolio** (`/dashboard/portfolio`)
   - عرض جميع الأعمال
   - إنشاء عمل جديد
   - تعديل عمل
   - حذف عمل

4. **Events** (`/dashboard/events`)
   - عرض جميع الفعاليات
   - إنشاء فعالية جديدة
   - تعديل فعالية
   - حذف فعالية

5. **Blog** (`/dashboard/blog`)
   - عرض جميع المقالات
   - إنشاء مقال جديد
   - تعديل مقال
   - حذف مقال

## هيكل الملفات

```
app/(dashboard)/
├── layout.tsx                    # Layout الرئيسي مع Sidebar
├── dashboard/
│   ├── page.tsx                  # الصفحة الرئيسية
│   ├── pages/
│   │   ├── page.tsx             # قائمة الصفحات
│   │   ├── new/
│   │   │   └── page.tsx         # إنشاء صفحة جديدة
│   │   └── [id]/
│   │       └── edit/
│   │           └── page.tsx     # تعديل صفحة
│   ├── services/
│   │   └── ...                   # نفس الهيكل
│   ├── portfolio/
│   │   └── ...                   # نفس الهيكل
│   ├── events/
│   │   └── ...                   # نفس الهيكل
│   └── blog/
│       └── ...                   # نفس الهيكل

components/dashboard/
├── Toast.tsx                     # مكون Toast
├── ToastContainer.tsx            # Toast Provider
├── DataTable.tsx                 # جدول البيانات
├── Form.tsx                      # مكون Form
├── FormField.tsx                 # حقل Form
├── ConfirmDialog.tsx             # نافذة التأكيد
├── NavLink.tsx                   # رابط التنقل
├── PagesTableActions.tsx         # إجراءات جدول الصفحات
├── ServicesTableActions.tsx      # إجراءات جدول الخدمات
├── PortfolioTableActions.tsx     # إجراءات جدول الأعمال
├── EventsTableActions.tsx       # إجراءات جدول الفعاليات
└── BlogTableActions.tsx          # إجراءات جدول المدونة

lib/dashboard/
└── hooks.ts                      # CRUD Hooks
```

## الميزات الرئيسية

### 1. Error Handling
- ✅ معالجة أخطاء شاملة عبر `withErrorHandler`
- ✅ رسائل خطأ واضحة بالعربية
- ✅ Toast notifications للأخطاء

### 2. Validation
- ✅ تحقق من البيانات في Frontend
- ✅ رسائل خطأ واضحة
- ✅ تحقق من Slug format

### 3. Loading States
- ✅ حالات تحميل واضحة
- ✅ تعطيل الأزرار أثناء التحميل
- ✅ رسائل "جاري الحفظ..."

### 4. Cache Invalidation
- ✅ إبطال Cache تلقائياً عند التعديل/الحذف
- ✅ دعم Tag-based invalidation

### 5. Rate Limiting
- ✅ حماية API endpoints من الإفراط في الطلبات
- ✅ Headers واضحة للـ Rate Limit

## أفضل الممارسات

### 1. استخدام CRUD Hooks
```typescript
// ✅ جيد
const { create, isLoading } = useCrud({
  endpoint: '/api/pages',
  redirectPath: '/dashboard/pages',
});

// ❌ سيء
const [isLoading, setIsLoading] = useState(false);
const handleSubmit = async () => {
  setIsLoading(true);
  try {
    const response = await fetch('/api/pages', { ... });
    // ...
  } catch (error) {
    // ...
  } finally {
    setIsLoading(false);
  }
};
```

### 2. استخدام Toast Notifications
```typescript
// ✅ جيد
const { success, error } = useToast();
success('تم الحفظ بنجاح');

// ❌ سيء
alert('تم الحفظ بنجاح');
```

### 3. استخدام Confirm Dialog
```typescript
// ✅ جيد
<ConfirmDialog
  isOpen={showDialog}
  title="حذف"
  message="هل أنت متأكد؟"
  onConfirm={handleDelete}
/>

// ❌ سيء
if (confirm('هل أنت متأكد؟')) {
  // ...
}
```

### 4. Validation
```typescript
// ✅ جيد
const validate = () => {
  const errors: Record<string, string> = {};
  if (!formData.title.trim()) {
    errors.title = 'العنوان مطلوب';
  }
  setErrors(errors);
  return Object.keys(errors).length === 0;
};

// ❌ سيء
if (!formData.title) {
  alert('العنوان مطلوب');
  return;
}
```

## التكامل مع الأنظمة الأخرى

### 1. Error Handling
جميع API routes تستخدم `withErrorHandler`:
```typescript
export const POST = withErrorHandler(async (request) => {
  // ...
});
```

### 2. Cache Invalidation
```typescript
await invalidateCacheByTags(['pages', 'public']);
```

### 3. Rate Limiting
```typescript
const { response: rateLimitResponse } = await rateLimit(request);
if (rateLimitResponse) return rateLimitResponse;
```

## الخطوات التالية

1. ✅ إنشاء CRUD Components قابلة لإعادة الاستخدام
2. ✅ إنشاء DataTable component
3. ✅ إنشاء Form components محسنة
4. ✅ إضافة Toast notifications
5. ✅ إنشاء Dashboard pages لجميع الكيانات
6. ✅ تحسين Layout والـ Navigation
7. ⏳ إضافة صفحات Create/Edit لبقية الكيانات (Portfolio, Events, Blog)
8. ⏳ إضافة File Upload للملفات
9. ⏳ إضافة Rich Text Editor للمحتوى
10. ⏳ إضافة Bulk Actions (حذف متعدد)

## الخلاصة

تم إنشاء نظام Dashboard CRUD محترف وشامل مع:
- ✅ مكونات قابلة لإعادة الاستخدام
- ✅ معالجة أخطاء شاملة
- ✅ واجهة مستخدم محسنة
- ✅ تجربة مستخدم ممتازة
- ✅ كود نظيف ومنظم
- ✅ TypeScript كامل
- ✅ دعم Dark Mode

 النظام جاهز للاستخدام والتوسع!

