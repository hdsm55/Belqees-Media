/**
 * Centralized Error Handler
 * معالج الأخطاء المركزي
 */

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { Prisma } from '@prisma/client';
import {
  AppError,
  ErrorCode,
  InternalServerError,
  ValidationError,
  DatabaseError,
  NotFoundError,
  UnauthorizedError,
  ForbiddenError,
  ConflictError,
} from './types';
import { logger } from '@/lib/utils/logger';

/**
 * Error Response Format
 */
export interface ErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
    statusCode: number;
    details?: any;
    timestamp: string;
    path?: string;
    method?: string;
  };
}

/**
 * Check if error is operational (expected error)
 */
function isOperationalError(error: any): boolean {
  if (error instanceof AppError) {
    return error.isOperational;
  }
  return false;
}

/**
 * Convert Zod Error to ValidationError
 */
function handleZodError(error: z.ZodError): ValidationError {
  const details = error.errors.map((err) => ({
    field: err.path.join('.'),
    message: err.message,
    code: err.code,
  }));

  return new ValidationError('خطأ في التحقق من البيانات', details);
}

/**
 * Convert Prisma Error to AppError
 */
function handlePrismaError(error: any): AppError {
  // Prisma Not Found Error
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === 'P2025') {
      return new NotFoundError('المورد');
    }

    // Unique constraint violation
    if (error.code === 'P2002') {
      const field = error.meta?.target as string[];
      return new ConflictError(
        `هذا ${field?.[0] || 'الحقل'} موجود بالفعل`,
        { field: field?.[0] }
      );
    }

    // Foreign key constraint violation
    if (error.code === 'P2003') {
      return new ValidationError('مرجع غير صحيح', {
        field: error.meta?.field_name,
      });
    }

    return new DatabaseError('خطأ في قاعدة البيانات', {
      code: error.code,
      meta: error.meta,
    });
  }

  // Prisma Validation Error
  if (error instanceof Prisma.PrismaClientValidationError) {
    return new ValidationError('بيانات غير صحيحة لقاعدة البيانات');
  }

  return new DatabaseError('خطأ في قاعدة البيانات');
}

/**
 * Handle Supabase Auth Errors
 */
function handleSupabaseError(error: any): AppError {
  const message = error.message || 'خطأ في المصادقة';

  if (message.includes('Invalid login credentials')) {
    return new UnauthorizedError('البريد الإلكتروني أو كلمة المرور غير صحيحة');
  }

  if (message.includes('Email already registered')) {
    return new ConflictError('البريد الإلكتروني مستخدم بالفعل');
  }

  if (message.includes('User not found')) {
    return new NotFoundError('المستخدم');
  }

  return new UnauthorizedError(message);
}

/**
 * Convert unknown error to AppError
 */
function normalizeError(error: unknown): AppError {
  // Already an AppError
  if (error instanceof AppError) {
    return error;
  }

  // Zod Validation Error
  if (error instanceof z.ZodError) {
    return handleZodError(error);
  }

  // Prisma Errors
  if (error instanceof Prisma.PrismaClientKnownRequestError ||
      error instanceof Prisma.PrismaClientValidationError) {
    return handlePrismaError(error);
  }

  // Supabase Errors (check for common patterns)
  if (error && typeof error === 'object' && 'message' in error) {
    const errorMessage = (error as any).message;
    if (errorMessage && typeof errorMessage === 'string') {
      if (errorMessage.includes('Invalid') || errorMessage.includes('auth')) {
        return handleSupabaseError(error);
      }
    }
  }

  // Generic Error
  if (error instanceof Error) {
    // Check for common error messages
    if (error.message === 'Unauthorized') {
      return new UnauthorizedError();
    }
    if (error.message.includes('Forbidden') || error.message.includes('permissions')) {
      return new ForbiddenError(error.message);
    }
    if (error.message.includes('Not found') || error.message.includes('not found')) {
      return new NotFoundError();
    }

    return new InternalServerError(error.message);
  }

  // Unknown error
  return new InternalServerError('حدث خطأ غير متوقع');
}

/**
 * Create Error Response
 */
export function createErrorResponse(
  error: AppError,
  request?: NextRequest
): NextResponse<ErrorResponse> {
  const path = request ? new URL(request.url).pathname : undefined;
  const method = request?.method;

  const errorResponse: ErrorResponse = {
    success: false,
    error: {
      code: error.code,
      message: error.message,
      statusCode: error.statusCode,
      timestamp: error.timestamp.toISOString(),
      ...(error.details && { details: error.details }),
      ...(path && { path }),
      ...(method && { method }),
    },
  };

  return NextResponse.json(errorResponse, {
    status: error.statusCode,
  });
}

/**
 * Main Error Handler
 * Handles errors and returns appropriate response
 */
export function handleError(
  error: unknown,
  request?: NextRequest
): NextResponse<ErrorResponse> {
  // Normalize error to AppError
  const appError = normalizeError(error);

  // Log error
  if (isOperationalError(appError)) {
    // Operational errors (expected) - log as warning
    logger.warn('Operational error:', {
      code: appError.code,
      message: appError.message,
      path: request ? new URL(request.url).pathname : undefined,
      method: request?.method,
      details: appError.details,
      context: appError.context,
    });
  } else {
    // Programming errors (unexpected) - log as error
    logger.error('Unexpected error:', {
      code: appError.code,
      message: appError.message,
      path: request ? new URL(request.url).pathname : undefined,
      method: request?.method,
      details: appError.details,
      context: appError.context,
      stack: appError.stack,
      originalError: error,
    });

    // In production, you might want to send to error tracking service
    // Example: Sentry.captureException(error);
  }

  // Create and return error response
  return createErrorResponse(appError, request);
}

/**
 * Error Handler Wrapper for API Routes
 * Wraps API route handlers with error handling
 */
export function withErrorHandler<T extends any[]>(
  handler: (request: NextRequest, ...args: T) => Promise<NextResponse>
) {
  return async (request: NextRequest, ...args: T): Promise<NextResponse> => {
    try {
      return await handler(request, ...args);
    } catch (error) {
      return handleError(error, request);
    }
  };
}

/**
 * Async Error Handler
 * For use with async functions that might throw errors
 */
export async function safeAsync<T>(
  promise: Promise<T>,
  errorMessage?: string
): Promise<[T | null, AppError | null]> {
  try {
    const data = await promise;
    return [data, null];
  } catch (error) {
    const appError = normalizeError(error);
    if (errorMessage) {
      appError.message = errorMessage;
    }
    return [null, appError];
  }
}

