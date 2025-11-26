/**
 * Error Handling System - Main Export
 * نظام معالجة الأخطاء - التصدير الرئيسي
 */

export * from './types';
export * from './handler';

// Re-export commonly used errors for convenience
export {
  AppError,
  UnauthorizedError,
  ForbiddenError,
  ValidationError,
  NotFoundError,
  ConflictError,
  InternalServerError,
  DatabaseError,
  ErrorCode,
} from './types';

export {
  handleError,
  createErrorResponse,
  withErrorHandler,
  safeAsync,
} from './handler';

