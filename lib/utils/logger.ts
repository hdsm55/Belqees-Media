/**
 * Enhanced Logger utility for production-safe logging
 * Logger محسن للاستخدام في الإنتاج
 */

const isDevelopment = process.env.NODE_ENV === 'development';
const isProduction = process.env.NODE_ENV === 'production';

/**
 * Format log message with timestamp and context
 */
function formatLogMessage(level: string, message: string, context?: any): string {
    const timestamp = new Date().toISOString();
    const contextStr = context ? ` ${JSON.stringify(context)}` : '';
    return `[${timestamp}] [${level}] ${message}${contextStr}`;
}

/**
 * Enhanced Logger with structured logging
 */
export const logger = {
    log: (message: string, context?: any) => {
        if (isDevelopment) {
            console.log(formatLogMessage('LOG', message, context));
        }
    },

    info: (message: string, context?: any) => {
        if (isDevelopment || isProduction) {
            console.info(formatLogMessage('INFO', message, context));
        }
    },

    warn: (message: string, context?: any) => {
        const formatted = formatLogMessage('WARN', message, context);
        if (isDevelopment) {
            console.warn(formatted);
        } else {
            // In production, you might want to send warnings to monitoring service
            console.warn(formatted);
        }
    },

    error: (message: string, error?: any, context?: any) => {
        const formatted = formatLogMessage('ERROR', message, {
            ...context,
            ...(error && {
                error: {
                    name: error?.name,
                    message: error?.message,
                    stack: error?.stack,
                    code: error?.code,
                },
            }),
        });

        // Always log errors
        console.error(formatted);

        // In production, send to error tracking service (e.g., Sentry)
        if (isProduction && error) {
            // Example: Sentry.captureException(error, { extra: context });
            // You can integrate Sentry, LogRocket, or any other error tracking service here
        }
    },

    /**
     * Log API request/response
     */
    api: (method: string, path: string, statusCode: number, duration?: number) => {
        const message = `${method} ${path} - ${statusCode}${duration ? ` (${duration}ms)` : ''}`;
        if (statusCode >= 500) {
            logger.error('API Error', null, { method, path, statusCode, duration });
        } else if (statusCode >= 400) {
            logger.warn('API Warning', { method, path, statusCode, duration });
        } else {
            logger.info(message);
        }
    },

    /**
     * Log database operations
     */
    db: (operation: string, table: string, context?: any) => {
        logger.info(`DB ${operation}`, { table, ...context });
    },
};

