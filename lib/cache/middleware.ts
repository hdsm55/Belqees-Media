/**
 * Cache Middleware for API Routes
 * Middleware للـ Caching في API Routes
 */

import { NextRequest, NextResponse } from 'next/server';
import { cacheManager } from './manager';
import { CacheConfig, getCacheConfig, generateCacheKey } from './config';
import { logger } from '@/lib/utils/logger';

/**
 * Cache Options
 */
export interface CacheOptions {
  /** Cache type from config */
  type?: keyof typeof import('./config').CACHE_CONFIGS;
  /** Custom TTL in seconds */
  ttl?: number;
  /** Custom cache key */
  key?: string;
  /** Additional key parts */
  keyParts?: (string | number | null | undefined)[];
  /** Skip cache for this request (boolean or function) */
  skip?: boolean | ((request: NextRequest) => boolean);
  /** Custom cache config */
  config?: Partial<CacheConfig>;
}

/**
 * Generate cache key from request
 */
function getCacheKeyFromRequest(
  request: NextRequest,
  options: CacheOptions
): string {
  if (options.key) {
    return options.key;
  }

  const url = new URL(request.url);
  const pathname = url.pathname;
  const searchParams = url.searchParams.toString();

  const config = options.type
    ? getCacheConfig(options.type)
    : { prefix: 'cache:api' };

  const keyParts = [
    pathname,
    searchParams ? `?${searchParams}` : null,
    ...(options.keyParts || []),
  ];

  return generateCacheKey(config.prefix, ...keyParts);
}

/**
 * Add Cache Headers to response
 */
function addCacheHeaders(
  response: NextResponse,
  config: CacheConfig,
  cached: boolean = false
): void {
  const maxAge = config.ttl;
  const staleWhileRevalidate = config.revalidate || 0;

  // Cache-Control header
  const cacheControl = [
    'public',
    `max-age=${maxAge}`,
    staleWhileRevalidate > 0 ? `stale-while-revalidate=${staleWhileRevalidate}` : null,
  ]
    .filter(Boolean)
    .join(', ');

  response.headers.set('Cache-Control', cacheControl);
  response.headers.set('X-Cache-Status', cached ? 'HIT' : 'MISS');
  response.headers.set('X-Cache-TTL', maxAge.toString());
}

/**
 * Cache Middleware
 * Wraps API route handler with caching
 */
export function withCache<T extends any[]>(
  handler: (request: NextRequest, ...args: T) => Promise<NextResponse>,
  options: CacheOptions = {}
) {
  return async (request: NextRequest, ...args: T): Promise<NextResponse> => {
    // Skip cache if requested
    const shouldSkip = typeof options.skip === 'function'
      ? options.skip(request)
      : options.skip || false;

    if (shouldSkip || request.headers.get('Cache-Control') === 'no-cache') {
      return handler(request, ...args);
    }

    // Get cache config
    const config = options.type
      ? getCacheConfig(options.type)
      : { ...getCacheConfig('public'), ...options.config };

    // Generate cache key
    const cacheKey = getCacheKeyFromRequest(request, options);

    try {
      // Try to get from cache
      const cached = await cacheManager.get<{
        data: any;
        headers: Record<string, string>;
        status: number;
      }>(cacheKey);

      if (cached) {
        // Return cached response
        const response = NextResponse.json(cached.data, {
          status: cached.status,
        });

        // Restore headers
        Object.entries(cached.headers || {}).forEach(([key, value]) => {
          response.headers.set(key, value);
        });

        addCacheHeaders(response, config, true);
        logger.info('Cache hit', { key: cacheKey });
        return response;
      }

      // Execute handler
      const response = await handler(request, ...args);

      // Clone response to read body
      const clonedResponse = response.clone();
      const data = await clonedResponse.json();

      // Store in cache (only for successful responses)
      if (response.status >= 200 && response.status < 300) {
        const responseHeaders: Record<string, string> = {};
        response.headers.forEach((value, key) => {
          responseHeaders[key] = value;
        });

        await cacheManager.set(
          cacheKey,
          {
            data,
            headers: responseHeaders,
            status: response.status,
          },
          config.ttl,
          config
        );

        logger.info('Cache set', { key: cacheKey, ttl: config.ttl });
      }

      // Add cache headers
      addCacheHeaders(response, config, false);

      return response;
    } catch (error) {
      logger.error('Cache middleware error', error, { key: cacheKey });
      // On error, just execute handler without cache
      return handler(request, ...args);
    }
  };
}

/**
 * Invalidate cache by pattern
 */
export async function invalidateCache(pattern: string): Promise<void> {
  await cacheManager.deletePattern(pattern);
}

/**
 * Invalidate cache by tags
 */
export async function invalidateCacheByTags(tags: string[]): Promise<void> {
  await cacheManager.invalidateByTags(tags);
}

