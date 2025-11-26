import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Allow all requests to pass through
  // Language switching will be handled client-side via useTranslation hook
  // and stored in localStorage or URL params
  return NextResponse.next();
}

export const config = {
  matcher: [
    // Skip all internal paths (_next, api, static files)
    '/((?!_next|api|favicon.ico|images|videos|.*\\..*).*)',
  ],
};
