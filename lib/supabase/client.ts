import { createBrowserClient } from '@supabase/ssr';
import { createClient as createSupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder';

if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  // لا توقف بناء التطبيق بسبب غياب متغيرات البيئة، فقط حذر المستخدم
  // سيتم استخدام قيم وهمية للسماح لعملية البناء (prerendering) بالاكتمال
  console.warn('⚠️ Warning: Supabase environment variables are missing! Using placeholders for build.');
}

// عميل جاهز للاستخدام في أي مكان داخل المتصفح (singleton)
export const supabase = createSupabaseClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});

/**
 * مُنشئ عميل متصفح جديد (يُستخدم عند الحاجة لإنشاء instance منفصل)
 */
export const createBrowserSupabaseClient = () =>
  createBrowserClient(supabaseUrl, supabaseAnonKey);

