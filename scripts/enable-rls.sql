-- تفعيل Row Level Security على جميع الجداول
-- هذا السكريبت يجب تشغيله في Supabase SQL Editor

-- تفعيل RLS على جدول users
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Policy: المستخدمون يمكنهم رؤية بياناتهم فقط
CREATE POLICY "Users can view own data"
  ON public.users
  FOR SELECT
  USING (auth.uid()::text = "supabaseUserId");

-- Policy: المستخدمون يمكنهم تحديث بياناتهم فقط
CREATE POLICY "Users can update own data"
  ON public.users
  FOR UPDATE
  USING (auth.uid()::text = "supabaseUserId");

-- تفعيل RLS على جدول pages
ALTER TABLE public.pages ENABLE ROW LEVEL SECURITY;

-- Policy: الجميع يمكنهم قراءة الصفحات المنشورة
CREATE POLICY "Anyone can view published pages"
  ON public.pages
  FOR SELECT
  USING (published = true);

-- Policy: المستخدمون المصرح لهم يمكنهم إدارة الصفحات
CREATE POLICY "Authenticated users can manage pages"
  ON public.pages
  FOR ALL
  USING (auth.role() = 'authenticated');

-- تفعيل RLS على جدول services
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view published services"
  ON public.services
  FOR SELECT
  USING (published = true);

CREATE POLICY "Authenticated users can manage services"
  ON public.services
  FOR ALL
  USING (auth.role() = 'authenticated');

-- تفعيل RLS على جدول portfolio
ALTER TABLE public.portfolio ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view published portfolio"
  ON public.portfolio
  FOR SELECT
  USING (published = true);

CREATE POLICY "Authenticated users can manage portfolio"
  ON public.portfolio
  FOR ALL
  USING (auth.role() = 'authenticated');

-- تفعيل RLS على جدول events
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view published events"
  ON public.events
  FOR SELECT
  USING (published = true);

CREATE POLICY "Authenticated users can manage events"
  ON public.events
  FOR ALL
  USING (auth.role() = 'authenticated');

-- تفعيل RLS على جدول blog_posts
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage blog posts"
  ON public.blog_posts
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.users
      WHERE public.users."supabaseUserId" = auth.uid()::text
      AND public.users.role = 'ADMIN'
    )
  );

-- تفعيل RLS على جدول categories
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage categories"
  ON public.categories
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.users
      WHERE public.users."supabaseUserId" = auth.uid()::text
      AND public.users.role = 'ADMIN'
    )
  );

-- تفعيل RLS على جدول tags
ALTER TABLE public.tags ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage tags"
  ON public.tags
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.users
      WHERE public.users."supabaseUserId" = auth.uid()::text
      AND public.users.role = 'ADMIN'
    )
  );

-- تفعيل RLS على جدول media
ALTER TABLE public.media ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view media"
  ON public.media
  FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can manage media"
  ON public.media
  FOR ALL
  USING (auth.role() = 'authenticated');

-- تفعيل RLS على جدول translations
ALTER TABLE public.translations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view translations"
  ON public.translations
  FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can manage translations"
  ON public.translations
  FOR ALL
  USING (auth.role() = 'authenticated');

-- تفعيل RLS على جدول contact_messages
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- Policy: فقط المستخدمون المصرح لهم يمكنهم قراءة الرسائل
CREATE POLICY "Authenticated users can view messages"
  ON public.contact_messages
  FOR SELECT
  USING (auth.role() = 'authenticated');

-- Policy: الجميع يمكنهم إرسال رسائل
CREATE POLICY "Anyone can create messages"
  ON public.contact_messages
  FOR INSERT
  WITH CHECK (true);

-- Policy: المستخدمون المصرح لهم يمكنهم تحديث الرسائل
CREATE POLICY "Authenticated users can update messages"
  ON public.contact_messages
  FOR UPDATE
  USING (auth.role() = 'authenticated');

-- ملاحظة: جدول _prisma_migrations لا يحتاج RLS لأنه جدول نظامي

