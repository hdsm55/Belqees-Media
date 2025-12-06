/**
 * Cache Store
 * يدعم Memory Store للـ development و Redis للإنتاج
 */

import { Redis } from '@upstash/redis';

// Memory store للـ development (fallback)
class MemoryStore {
  private data: Map<string, { value: any; expiresAt: number }> = new Map();

  async get<T>(key: string): Promise<T | null> {
    const entry = this.data.get(key);
    if (!entry) return null;

    // Check if expired
    if (Date.now() > entry.expiresAt) {
      this.data.delete(key);
      return null;
    }

    return entry.value as T;
  }

  async set(key: string, value: any, ttl: number): Promise<void> {
    this.data.set(key, {
      value,
      expiresAt: Date.now() + ttl * 1000,
    });

    // Cleanup expired entries periodically
    setTimeout(() => {
      const entry = this.data.get(key);
      if (entry && Date.now() > entry.expiresAt) {
        this.data.delete(key);
      }
    }, ttl * 1000);
  }

  async delete(key: string): Promise<void> {
    this.data.delete(key);
  }

  async deletePattern(pattern: string): Promise<void> {
    const regex = new RegExp(pattern.replace('*', '.*'));
    for (const key of this.data.keys()) {
      if (regex.test(key)) {
        this.data.delete(key);
      }
    }
  }

  async clear(): Promise<void> {
    this.data.clear();
  }

  async has(key: string): Promise<boolean> {
    const entry = this.data.get(key);
    if (!entry) return false;
    if (Date.now() > entry.expiresAt) {
      this.data.delete(key);
      return false;
    }
    return true;
  }
}

// Memory store instance
const memoryStore = new MemoryStore();

/**
 * Cache Store Interface
 */
export interface CacheStore {
  get<T>(key: string): Promise<T | null>;
  set(key: string, value: any, ttl: number): Promise<void>;
  delete(key: string): Promise<void>;
  deletePattern(pattern: string): Promise<void>;
  clear(): Promise<void>;
  has(key: string): Promise<boolean>;
}

/**
 * Create Cache Store
 * يستخدم Redis إذا كان متوفراً، وإلا Memory Store
 */
export function createCacheStore(): CacheStore {
  // استخدام Redis إذا كان متوفراً
  if (
    process.env.UPSTASH_REDIS_REST_URL &&
    process.env.UPSTASH_REDIS_REST_TOKEN
  ) {
    const redis = new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
    });

    return {
      async get<T>(key: string): Promise<T | null> {
        const value = await redis.get(key);
        if (value === null) return null;

        // Try to parse JSON, if fails return as string
        try {
          return typeof value === 'string' ? (JSON.parse(value) as T) : (value ?? null) as T;
        } catch {
          return (value ?? null) as T;
        }
      },

      async set(key: string, value: any, ttl: number): Promise<void> {
        // Redis can store strings directly, but we'll stringify for consistency
        const serialized = typeof value === 'string' ? value : JSON.stringify(value);
        await redis.setex(key, ttl, serialized);
      },

      async delete(key: string): Promise<void> {
        await redis.del(key);
      },

      async deletePattern(pattern: string): Promise<void> {
        // Redis doesn't support pattern deletion directly
        // We'll need to get all keys matching pattern and delete them
        const keys = await redis.keys(pattern);
        if (keys.length > 0) {
          await redis.del(...keys);
        }
      },

      async clear(): Promise<void> {
        // In production, be careful with this
        // await redis.flushdb();
      },

      async has(key: string): Promise<boolean> {
        const exists = await redis.exists(key);
        return exists === 1;
      },
    };
  }

  // استخدام Memory Store كـ fallback
  return memoryStore;
}

