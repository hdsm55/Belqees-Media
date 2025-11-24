import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  // Check if Supabase environment variables are set
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // Only initialize Supabase if environment variables are set
  if (supabaseUrl && supabaseAnonKey && supabaseUrl.startsWith('http')) {
    try {
      const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
        cookies: {
          getAll() {
            return request.cookies.getAll();
          },
          setAll(cookiesToSet: Array<{ name: string; value: string; options?: CookieOptions }>) {
            cookiesToSet.forEach(({ name, value, options }) => {
              request.cookies.set(name, value);
              response.cookies.set(name, value, options);
            });
          },
        },
      } as Parameters<typeof createServerClient>[2]);

      // Refresh session if expired
      await supabase.auth.getUser();

      // Protected routes - redirect to login if not authenticated
      const { pathname } = request.nextUrl;
      const isAuthPage = pathname.startsWith('/login') || pathname.startsWith('/register');
      const isProtectedRoute = pathname.startsWith('/dashboard') || pathname.startsWith('/api/auth');

      if (isProtectedRoute && !isAuthPage) {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
          const redirectUrl = new URL('/login', request.url);
          redirectUrl.searchParams.set('redirect', pathname);
          return NextResponse.redirect(redirectUrl);
        }
      }

      // Redirect authenticated users away from auth pages
      if (isAuthPage) {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (user) {
          return NextResponse.redirect(new URL('/dashboard', request.url));
        }
      }
    } catch (error) {
      // Silently fail if Supabase is not configured
      console.warn('Supabase middleware error:', error);
    }
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};

