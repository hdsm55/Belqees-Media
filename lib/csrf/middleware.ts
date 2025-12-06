/**
 * CSRF Protection Middleware
 * Middleware لحماية CSRF
 */

import { NextRequest, NextResponse } from 'next/server';
import { validateCSRFToken, extractCSRFTokenFromRequest, CSRF } from './token';
import { logger } from '@/lib/utils/logger';

/**
 * CSRF Protection Options
 */
export interface CSRFProtectionOptions {
  /** Methods that require CSRF protection (default: POST, PUT, PATCH, DELETE) */
  protectedMethods?: string[];
  /** Paths to exclude from CSRF protection */
  excludePaths?: string[];
  /** Custom error message */
  errorMessage?: string;
}

const DEFAULT_PROTECTED_METHODS = ['POST', 'PUT', 'PATCH', 'DELETE'];
const DEFAULT_EXCLUDE_PATHS: string[] = [];

/**
 * CSRF Protection Middleware Wrapper
 * Wrapper لحماية CSRF
 */
export function withCSRFProtection<T extends (...args: any[]) => Promise<NextResponse>>(
  handler: T,
  options: CSRFProtectionOptions = {}
): T {
  const {
    protectedMethods = DEFAULT_PROTECTED_METHODS,
    excludePaths = DEFAULT_EXCLUDE_PATHS,
    errorMessage = 'CSRF token validation failed',
  } = options;

  return (async (request: NextRequest, ...args: any[]) => {
    // Check if path is excluded
    const pathname = new URL(request.url).pathname;
    if (excludePaths.some((path) => pathname.startsWith(path))) {
      return handler(request, ...args);
    }

    // Check if method requires CSRF protection
    if (!protectedMethods.includes(request.method)) {
      return handler(request, ...args);
    }

    // Extract token from request
    let body: any = null;
    try {
      // Try to parse body if it's JSON
      const contentType = request.headers.get('content-type');
      if (contentType?.includes('application/json')) {
        body = await request.clone().json().catch(() => null);
      } else if (contentType?.includes('application/x-www-form-urlencoded')) {
        // For form data, we'll need to handle it differently
        // For now, we'll rely on header
        body = null;
      }
    } catch (error) {
      // Ignore parsing errors
    }

    const token = extractCSRFTokenFromRequest(request.headers, body);

    // Validate token
    const isValid = await validateCSRFToken(token);

    if (!isValid) {
      logger.warn('CSRF token validation failed', {
        path: pathname,
        method: request.method,
        ip: request.headers.get('x-forwarded-for') || request.ip,
      });

      return NextResponse.json(
        {
          success: false,
          error: errorMessage,
          code: 'CSRF_TOKEN_INVALID',
        },
        { status: 403 }
      );
    }

    // Token is valid, proceed with handler
    return handler(request, ...args);
  }) as T;
}

/**
 * Standalone CSRF validation function
 * دالة مستقلة للتحقق من CSRF
 */
export async function validateCSRFRequest(
  request: NextRequest
): Promise<{ valid: boolean; error?: string }> {
  const method = request.method;

  // Only validate state-changing methods
  if (!DEFAULT_PROTECTED_METHODS.includes(method)) {
    return { valid: true };
  }

  let body: any = null;
  try {
    const contentType = request.headers.get('content-type');
    if (contentType?.includes('application/json')) {
      body = await request.clone().json().catch(() => null);
    }
  } catch (error) {
    // Ignore parsing errors
  }

  const token = extractCSRFTokenFromRequest(request.headers, body);
  const isValid = await validateCSRFToken(token);

  if (!isValid) {
    return {
      valid: false,
      error: 'CSRF token validation failed',
    };
  }

  return { valid: true };
}

