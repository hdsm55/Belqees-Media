/**
 * Custom Error Types and Error Codes
 * أنواع الأخطاء المخصصة ورموز الأخطاء
 */

/**
 * Error Codes - رموز الأخطاء
 */
export enum ErrorCode {
  // Authentication & Authorization (401, 403)
  UNAUTHORIZED = 'UNAUTHORIZED',
  FORBIDDEN = 'FORBIDDEN',
  INVALID_CREDENTIALS = 'INVALID_CREDENTIALS',
  TOKEN_EXPIRED = 'TOKEN_EXPIRED',
  INSUFFICIENT_PERMISSIONS = 'INSUFFICIENT_PERMISSIONS',

  // Validation Errors (400)
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  INVALID_INPUT = 'INVALID_INPUT',
  MISSING_REQUIRED_FIELD = 'MISSING_REQUIRED_FIELD',
  INVALID_FORMAT = 'INVALID_FORMAT',

  // Not Found (404)
  NOT_FOUND = 'NOT_FOUND',
  RESOURCE_NOT_FOUND = 'RESOURCE_NOT_FOUND',
  USER_NOT_FOUND = 'USER_NOT_FOUND',
  EVENT_NOT_FOUND = 'EVENT_NOT_FOUND',
  SERVICE_NOT_FOUND = 'SERVICE_NOT_FOUND',
  PORTFOLIO_NOT_FOUND = 'PORTFOLIO_NOT_FOUND',
  BLOG_POST_NOT_FOUND = 'BLOG_POST_NOT_FOUND',
  PAGE_NOT_FOUND = 'PAGE_NOT_FOUND',

  // Conflict (409)
  CONFLICT = 'CONFLICT',
  DUPLICATE_ENTRY = 'DUPLICATE_ENTRY',
  RESOURCE_ALREADY_EXISTS = 'RESOURCE_ALREADY_EXISTS',
  EMAIL_ALREADY_EXISTS = 'EMAIL_ALREADY_EXISTS',

  // Server Errors (500)
  INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR',
  DATABASE_ERROR = 'DATABASE_ERROR',
  EXTERNAL_SERVICE_ERROR = 'EXTERNAL_SERVICE_ERROR',
  UNKNOWN_ERROR = 'UNKNOWN_ERROR',

  // Rate Limiting (429)
  RATE_LIMIT_EXCEEDED = 'RATE_LIMIT_EXCEEDED',

  // Bad Request (400)
  BAD_REQUEST = 'BAD_REQUEST',
  INVALID_REQUEST_BODY = 'INVALID_REQUEST_BODY',
}

/**
 * HTTP Status Codes mapping
 */
export const ERROR_STATUS_MAP: Record<ErrorCode, number> = {
  [ErrorCode.UNAUTHORIZED]: 401,
  [ErrorCode.FORBIDDEN]: 403,
  [ErrorCode.INVALID_CREDENTIALS]: 401,
  [ErrorCode.TOKEN_EXPIRED]: 401,
  [ErrorCode.INSUFFICIENT_PERMISSIONS]: 403,
  [ErrorCode.VALIDATION_ERROR]: 400,
  [ErrorCode.INVALID_INPUT]: 400,
  [ErrorCode.MISSING_REQUIRED_FIELD]: 400,
  [ErrorCode.INVALID_FORMAT]: 400,
  [ErrorCode.NOT_FOUND]: 404,
  [ErrorCode.RESOURCE_NOT_FOUND]: 404,
  [ErrorCode.USER_NOT_FOUND]: 404,
  [ErrorCode.EVENT_NOT_FOUND]: 404,
  [ErrorCode.SERVICE_NOT_FOUND]: 404,
  [ErrorCode.PORTFOLIO_NOT_FOUND]: 404,
  [ErrorCode.BLOG_POST_NOT_FOUND]: 404,
  [ErrorCode.PAGE_NOT_FOUND]: 404,
  [ErrorCode.CONFLICT]: 409,
  [ErrorCode.DUPLICATE_ENTRY]: 409,
  [ErrorCode.RESOURCE_ALREADY_EXISTS]: 409,
  [ErrorCode.EMAIL_ALREADY_EXISTS]: 409,
  [ErrorCode.INTERNAL_SERVER_ERROR]: 500,
  [ErrorCode.DATABASE_ERROR]: 500,
  [ErrorCode.EXTERNAL_SERVICE_ERROR]: 500,
  [ErrorCode.UNKNOWN_ERROR]: 500,
  [ErrorCode.RATE_LIMIT_EXCEEDED]: 429,
  [ErrorCode.BAD_REQUEST]: 400,
  [ErrorCode.INVALID_REQUEST_BODY]: 400,
};

/**
 * Base Error Class
 */
export class AppError extends Error {
  public readonly code: ErrorCode;
  public readonly statusCode: number;
  public readonly isOperational: boolean;
  public readonly details?: any;
  public readonly timestamp: Date;
  public readonly context?: Record<string, any>;

  constructor(
    code: ErrorCode,
    message: string,
    details?: any,
    isOperational: boolean = true,
    context?: Record<string, any>
  ) {
    super(message);
    this.name = this.constructor.name;
    this.code = code;
    this.statusCode = ERROR_STATUS_MAP[code];
    this.isOperational = isOperational;
    this.details = details;
    this.timestamp = new Date();
    this.context = context;

    // Maintains proper stack trace
    Error.captureStackTrace(this, this.constructor);
  }

  toJSON() {
    return {
      code: this.code,
      message: this.message,
      statusCode: this.statusCode,
      details: this.details,
      timestamp: this.timestamp.toISOString(),
      ...(this.context && { context: this.context }),
    };
  }
}

/**
 * Authentication Errors
 */
export class UnauthorizedError extends AppError {
  constructor(message: string = 'غير مصرح', details?: any) {
    super(ErrorCode.UNAUTHORIZED, message, details);
  }
}

export class ForbiddenError extends AppError {
  constructor(message: string = 'غير مسموح', details?: any) {
    super(ErrorCode.FORBIDDEN, message, details);
  }
}

export class InvalidCredentialsError extends AppError {
  constructor(message: string = 'البريد الإلكتروني أو كلمة المرور غير صحيحة') {
    super(ErrorCode.INVALID_CREDENTIALS, message);
  }
}

export class InsufficientPermissionsError extends AppError {
  constructor(message: string = 'ليس لديك الصلاحيات الكافية', details?: any) {
    super(ErrorCode.INSUFFICIENT_PERMISSIONS, message, details);
  }
}

/**
 * Validation Errors
 */
export class ValidationError extends AppError {
  constructor(message: string = 'خطأ في التحقق من البيانات', details?: any) {
    super(ErrorCode.VALIDATION_ERROR, message, details);
  }
}

export class InvalidInputError extends AppError {
  constructor(message: string = 'بيانات غير صحيحة', details?: any) {
    super(ErrorCode.INVALID_INPUT, message, details);
  }
}

/**
 * Not Found Errors
 */
export class NotFoundError extends AppError {
  constructor(
    resource: string = 'المورد',
    message?: string,
    details?: any
  ) {
    super(
      ErrorCode.NOT_FOUND,
      message || `${resource} غير موجود`,
      details
    );
  }
}

export class ResourceNotFoundError extends NotFoundError {
  constructor(resource: string, details?: any) {
    super(resource, undefined, details);
    this.code = ErrorCode.RESOURCE_NOT_FOUND;
  }
}

/**
 * Conflict Errors
 */
export class ConflictError extends AppError {
  constructor(message: string = 'تعارض في البيانات', details?: any) {
    super(ErrorCode.CONFLICT, message, details);
  }
}

export class DuplicateEntryError extends AppError {
  constructor(message: string = 'هذا السجل موجود بالفعل', details?: any) {
    super(ErrorCode.DUPLICATE_ENTRY, message, details);
  }
}

export class EmailAlreadyExistsError extends AppError {
  constructor(message: string = 'البريد الإلكتروني مستخدم بالفعل') {
    super(ErrorCode.EMAIL_ALREADY_EXISTS, message);
  }
}

/**
 * Server Errors
 */
export class InternalServerError extends AppError {
  constructor(message: string = 'حدث خطأ في الخادم', details?: any) {
    super(ErrorCode.INTERNAL_SERVER_ERROR, message, details, false);
  }
}

export class DatabaseError extends AppError {
  constructor(message: string = 'خطأ في قاعدة البيانات', details?: any) {
    super(ErrorCode.DATABASE_ERROR, message, details, false);
  }
}

export class ExternalServiceError extends AppError {
  constructor(
    service: string,
    message?: string,
    details?: any
  ) {
    super(
      ErrorCode.EXTERNAL_SERVICE_ERROR,
      message || `خطأ في خدمة ${service}`,
      details,
      false
    );
  }
}

