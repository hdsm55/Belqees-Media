/**
 * Cache Manager
 * مدير Cache مركزي مع TTL و Invalidation
 */

import { createCacheStore, CacheStore } from './store';
import { CacheConfig, generateCacheKey } from './config';
import { logger } from '@/lib/utils/logger';

/**
 * Cache Manager Class
 */
export class CacheManager {
  private store: CacheStore;
  private defaultConfig: CacheConfig;

  constructor(defaultConfig?: CacheConfig) {
    this.store = createCacheStore();
    this.defaultConfig = defaultConfig || {
      ttl: 3600,
      prefix: 'cache',
      tags: [],
    };
  }

  /**
   * Get value from cache
   */
  async get<T>(key: string): Promise<T | null> {
    try {
      const value = await this.store.get<T>(key);
      if (value) {
        logger.info('Cache hit', { key });
      } else {
        logger.info('Cache miss', { key });
      }
      return value;
    } catch (error) {
      logger.error('Cache get error', error, { key });
      return null;
    }
  }

  /**
   * Set value in cache
   */
  async set(
    key: string,
    value: any,
    ttl?: number,
    config?: Partial<CacheConfig>
  ): Promise<void> {
    try {
      const finalConfig = { ...this.defaultConfig, ...config };
      const finalTtl = ttl || finalConfig.ttl;

      if (finalTtl <= 0) {
        // Don't cache if TTL is 0 or negative
        return;
      }

      await this.store.set(key, value, finalTtl);
      logger.info('Cache set', { key, ttl: finalTtl });
    } catch (error) {
      logger.error('Cache set error', error, { key });
    }
  }

  /**
   * Delete key from cache
   */
  async delete(key: string): Promise<void> {
    try {
      await this.store.delete(key);
      logger.info('Cache delete', { key });
    } catch (error) {
      logger.error('Cache delete error', error, { key });
    }
  }

  /**
   * Delete all keys matching pattern
   */
  async deletePattern(pattern: string): Promise<void> {
    try {
      await this.store.deletePattern(pattern);
      logger.info('Cache delete pattern', { pattern });
    } catch (error) {
      logger.error('Cache delete pattern error', error, { pattern });
    }
  }

  /**
   * Delete by tags
   */
  async invalidateByTags(tags: string[]): Promise<void> {
    try {
      for (const tag of tags) {
        const pattern = `*:tag:${tag}*`;
        await this.deletePattern(pattern);
      }
      logger.info('Cache invalidate by tags', { tags });
    } catch (error) {
      logger.error('Cache invalidate by tags error', error, { tags });
    }
  }

  /**
   * Check if key exists
   */
  async has(key: string): Promise<boolean> {
    try {
      return await this.store.has(key);
    } catch (error) {
      logger.error('Cache has error', error, { key });
      return false;
    }
  }

  /**
   * Get or Set pattern
   * يحصل على القيمة من Cache أو ينفذ function ويحفظ النتيجة
   */
  async getOrSet<T>(
    key: string,
    fetcher: () => Promise<T>,
    config?: Partial<CacheConfig>
  ): Promise<T> {
    // Try to get from cache
    const cached = await this.get<T>(key);
    if (cached !== null) {
      return cached;
    }

    // Fetch data
    const data = await fetcher();

    // Store in cache
    const finalConfig = { ...this.defaultConfig, ...config };
    await this.set(key, data, undefined, finalConfig);

    return data;
  }

  /**
   * Clear all cache
   */
  async clear(): Promise<void> {
    try {
      await this.store.clear();
      logger.info('Cache cleared');
    } catch (error) {
      logger.error('Cache clear error', error);
    }
  }

  /**
   * Generate cache key with prefix
   */
  generateKey(prefix: string, ...parts: (string | number | null | undefined)[]): string {
    return generateCacheKey(prefix, ...parts);
  }
}

// Default Cache Manager instance
export const cacheManager = new CacheManager();

