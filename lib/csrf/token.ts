/**
 * CSRF Token Generation and Validation
 * توليد والتحقق من CSRF Tokens
 */

import { cookies } from 'next/headers';
import crypto from 'crypto';

const CSRF_TOKEN_COOKIE_NAME = 'csrf-token';
const CSRF_TOKEN_HEADER = 'X-CSRF-Token';
const CSRF_TOKEN_LENGTH = 32;
const CSRF_TOKEN_MAX_AGE = 60 * 60 * 24; // 24 hours

/**
 * Generate a secure random CSRF token
 * توليد CSRF token عشوائي آمن
 */
export function generateCSRFToken(): string {
  return crypto.randomBytes(CSRF_TOKEN_LENGTH).toString('hex');
}

/**
 * Get or create CSRF token from cookies
 * الحصول على أو إنشاء CSRF token من الكوكيز
 */
export async function getCSRFToken(): Promise<string> {
  const cookieStore = await cookies();
  let token = cookieStore.get(CSRF_TOKEN_COOKIE_NAME)?.value;

  if (!token) {
    token = generateCSRFToken();
    cookieStore.set(CSRF_TOKEN_COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: CSRF_TOKEN_MAX_AGE,
      path: '/',
    });
  }

  return token;
}

/**
 * Validate CSRF token from request
 * التحقق من CSRF token من الطلب
 */
export async function validateCSRFToken(
  requestToken: string | null | undefined
): Promise<boolean> {
  if (!requestToken) {
    return false;
  }

  const cookieStore = await cookies();
  const cookieToken = cookieStore.get(CSRF_TOKEN_COOKIE_NAME)?.value;

  if (!cookieToken) {
    return false;
  }

  // Ensure both tokens have the same length before comparison
  if (requestToken.length !== cookieToken.length) {
    return false;
  }

  // Use constant-time comparison to prevent timing attacks
  try {
    return crypto.timingSafeEqual(
      Buffer.from(requestToken, 'utf8'),
      Buffer.from(cookieToken, 'utf8')
    );
  } catch (error) {
    return false;
  }
}

/**
 * Get CSRF token from request headers or body
 * الحصول على CSRF token من headers أو body
 */
export function extractCSRFTokenFromRequest(
  headers: Headers,
  body?: any
): string | null {
  // Try header first
  const headerToken = headers.get(CSRF_TOKEN_HEADER);
  if (headerToken) {
    return headerToken;
  }

  // Try body
  if (body && typeof body === 'object' && body._csrf) {
    return body._csrf;
  }

  return null;
}

/**
 * CSRF Token Constants
 */
export const CSRF = {
  COOKIE_NAME: CSRF_TOKEN_COOKIE_NAME,
  HEADER_NAME: CSRF_TOKEN_HEADER,
  MAX_AGE: CSRF_TOKEN_MAX_AGE,
} as const;

