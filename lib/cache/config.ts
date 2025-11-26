/**
 * Cache Configuration
 * إعدادات Caching حسب نوع البيانات
 */

export interface CacheConfig {
  /** Time To Live بالثواني */
  ttl: number;
  /** Cache Key Prefix */
  prefix: string;
  /** هل يجب إعادة التحقق من Cache */
  revalidate?: number;
  /** Tags للـ Cache Invalidation */
  tags?: string[];
}

/**
 * Cache Configurations حسب نوع البيانات
 */
export const CACHE_CONFIGS = {
  // Public data (بيانات عامة - cache طويل)
  public: {
    ttl: 3600, // 1 hour
    prefix: 'cache:public',
    revalidate: 300, // Revalidate every 5 minutes
    tags: ['public'],
  },

  // Portfolio (الأعمال - cache متوسط)
  portfolio: {
    ttl: 1800, // 30 minutes
    prefix: 'cache:portfolio',
    revalidate: 600, // Revalidate every 10 minutes
    tags: ['portfolio', 'public'],
  },

  // Services (الخدمات - cache متوسط)
  services: {
    ttl: 1800, // 30 minutes
    prefix: 'cache:services',
    revalidate: 600,
    tags: ['services', 'public'],
  },

  // Events (الفعاليات - cache قصير)
  events: {
    ttl: 900, // 15 minutes
    prefix: 'cache:events',
    revalidate: 300,
    tags: ['events', 'public'],
  },

  // Blog (المدونة - cache متوسط)
  blog: {
    ttl: 1800, // 30 minutes
    prefix: 'cache:blog',
    revalidate: 600,
    tags: ['blog', 'public'],
  },

  // Pages (الصفحات - cache طويل)
  pages: {
    ttl: 3600, // 1 hour
    prefix: 'cache:pages',
    revalidate: 900,
    tags: ['pages', 'public'],
  },

  // User-specific data (بيانات المستخدم - cache قصير)
  user: {
    ttl: 300, // 5 minutes
    prefix: 'cache:user',
    revalidate: 60,
    tags: ['user'],
  },

  // Short-lived cache (cache قصير جداً)
  short: {
    ttl: 60, // 1 minute
    prefix: 'cache:short',
    tags: [],
  },

  // No cache (بدون cache)
  none: {
    ttl: 0,
    prefix: 'cache:none',
    tags: [],
  },
} as const;

/**
 * Get Cache Config by type
 */
export function getCacheConfig(type: keyof typeof CACHE_CONFIGS): CacheConfig {
  return CACHE_CONFIGS[type];
}

/**
 * Generate Cache Key
 */
export function generateCacheKey(
  prefix: string,
  ...parts: (string | number | null | undefined)[]
): string {
  const validParts = parts
    .filter((part) => part !== null && part !== undefined)
    .map((part) => String(part));

  return `${prefix}:${validParts.join(':')}`;
}

