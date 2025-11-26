import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';

export const createClient = async () => {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
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
      },
    }
  );
};

