import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

/**
 * Prisma Client Configuration
 * مع إعدادات محسّنة للاتصال والموثوقية
 */
export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    // Logging: في production فقط errors (لا queries ولا warnings لتجنب تعطيل السيرفر)
    // في development: errors و warnings فقط (queries فقط إذا PRISMA_LOG_QUERIES=true)
    log: process.env.NODE_ENV === 'production'
      ? ['error'] // في الإنتاج: فقط errors
      : (process.env.PRISMA_LOG_QUERIES === 'true'
          ? ['query', 'error', 'warn']
          : ['error', 'warn']), // في التطوير: errors و warnings

    // إعدادات الاتصال المحسّنة
    datasources: {
      db: {
        url: process.env.DATABASE_URL,
      },
    },
  });

// Singleton pattern: في جميع البيئات لتجنب إنشاء multiple connections
if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
} else {
  // في production: نستخدم globalThis لتجنب memory leaks
  globalForPrisma.prisma = prisma;
}

/**
 * Graceful Shutdown Handler
 * إغلاق الاتصال بشكل صحيح عند إيقاف التطبيق
 */
if (typeof window === 'undefined') {
  // Server-side only
  const gracefulShutdown = async () => {
    console.log('🔄 Closing Prisma connection...');
    await prisma.$disconnect();
    console.log('✅ Prisma connection closed');
  };

  // Handle process termination
  process.on('beforeExit', gracefulShutdown);
  process.on('SIGINT', gracefulShutdown);
  process.on('SIGTERM', gracefulShutdown);
}

/**
 * Connection Health Check
 * التحقق من صحة الاتصال
 */
export async function checkDatabaseConnection(): Promise<boolean> {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return true;
  } catch (error) {
    console.error('❌ Database connection check failed:', error);
    return false;
  }
}

/**
 * Retry Database Operation
 * إعادة محاولة العملية في حالة فشل الاتصال
 */
export async function retryDatabaseOperation<T>(
  operation: () => Promise<T>,
  maxRetries: number = 3,
  delayMs: number = 1000
): Promise<T> {
  let lastError: Error | unknown;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await operation();
    } catch (error: any) {
      lastError = error;

      // Check if it's a connection error
      const isConnectionError =
        error?.code === 'P1001' || // Can't reach database server
        error?.code === 'P1002' || // Database server doesn't accept connections
        error?.code === 'P1008' || // Operations timed out
        error?.message?.includes('ConnectionReset') ||
        error?.message?.includes('forcibly closed') ||
        error?.message?.includes('ECONNRESET');

      if (isConnectionError && attempt < maxRetries) {
        console.warn(
          `⚠️ Database connection error (attempt ${attempt}/${maxRetries}), retrying in ${delayMs}ms...`
        );

        // Try to reconnect
        try {
          await prisma.$disconnect();
          await prisma.$connect();
        } catch (reconnectError) {
          console.error('❌ Failed to reconnect:', reconnectError);
        }

        // Wait before retrying
        await new Promise((resolve) => setTimeout(resolve, delayMs * attempt));
        continue;
      }

      // If not a connection error or max retries reached, throw
      throw error;
    }
  }

  throw lastError;
}

