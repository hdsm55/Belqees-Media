import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { createClient as createSupabaseClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';

export const createClient = async () => {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder',
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet: Array<{ name: string; value: string; options?: CookieOptions }>) {
          try {
            // لوج للتشخيص: التأكد أن Supabase يحاول فعلاً تعيين الكوكيز
            console.log(
              '[Supabase][setAll] setting cookies:',
              cookiesToSet.map((c) => ({
                name: c.name,
                // لا نطبع القيمة الكاملة لأسباب أمنية
                valuePreview: c.value?.slice(0, 10) ?? '',
                options: {
                  ...c.options,
                  secure: process.env.NODE_ENV === 'production',
                },
              }))
            );

            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(
                name,
                value,
                // في التطوير نمنع خيار secure حتى تعمل الكوكيز على http://localhost
                {
                  ...options,
                  secure: process.env.NODE_ENV === 'production',
                } satisfies CookieOptions
              )
            );
          } catch (error) {
            console.error('[Supabase][setAll] Error setting cookies:', error);
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      } as any,
    }
  );
};

/**
 * إنشاء Supabase Admin Client باستخدام Service Role Key
 * يتجاوز RLS Policies - استخدم فقط في Server/API Routes
 */
export const createAdminClient = () => {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error('Supabase URL and Service Role Key must be configured');
  }

  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  );
};

