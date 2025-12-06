import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { NextRequest, NextResponse } from 'next/server';

/**
 * عميل Supabase مخصص لمسارات API (Route Handlers)
 * يربط الكوكيز بردّ NextResponse الذي سنرجعه للمتصفح.
 */
export function createRouteClient(request: NextRequest) {
    const internalResponse = NextResponse.next();

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll();
                },
                setAll(cookiesToSet: Array<{ name: string; value: string; options?: CookieOptions }>) {
                    // لوج للتشخيص: هل Supabase يحاول تعيين كوكيز في مسارات API؟
                    console.log(
                        '[Supabase][route-client][setAll] setting cookies:',
                        cookiesToSet.map((c) => ({
                            name: c.name,
                            valuePreview: c.value?.slice(0, 10) ?? '',
                            options: {
                                ...c.options,
                                secure: process.env.NODE_ENV === 'production',
                            },
                        }))
                    );

                    cookiesToSet.forEach(({ name, value, options }) => {
                        internalResponse.cookies.set(
                            name,
                            value,
                            {
                                ...options,
                                secure: process.env.NODE_ENV === 'production',
                            } satisfies CookieOptions
                        );
                    });
                },
            } as any,
        }
    );

    /**
     * دمج الكوكيز التي عيّنها Supabase في رد JSON النهائي الذي نُرجعه من المسار.
     */
    function withSupabaseCookies<T>(
        response: NextResponse<T>
    ): NextResponse<T> {
        internalResponse.cookies.getAll().forEach((cookie) => {
            response.cookies.set(cookie.name, cookie.value, {
                httpOnly: cookie.httpOnly,
                secure: cookie.secure,
                sameSite: cookie.sameSite,
                path: cookie.path,
                expires: cookie.expires,
                maxAge: cookie.maxAge,
            });
        });
        return response;
    }

    return { supabase, withSupabaseCookies };
}


