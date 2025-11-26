/**
 * Rate Limit Store
 * يدعم Memory Store للـ development و Redis للإنتاج
 */

import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

// Memory store للـ development (fallback)
class MemoryStore {
    private data: Map<string, { count: number; resetAt: number }> = new Map();

    async get(key: string): Promise<number | null> {
        const entry = this.data.get(key);
        if (!entry) return null;

        // Check if expired
        if (Date.now() > entry.resetAt) {
            this.data.delete(key);
            return null;
        }

        return entry.count;
    }

    async set(key: string, value: number, ttl: number): Promise<void> {
        this.data.set(key, {
            count: value,
            resetAt: Date.now() + ttl * 1000,
        });

        // Cleanup expired entries periodically
        setTimeout(() => {
            const entry = this.data.get(key);
            if (entry && Date.now() > entry.resetAt) {
                this.data.delete(key);
            }
        }, ttl * 1000);
    }

    async increment(key: string, ttl: number): Promise<number> {
        const current = await this.get(key);
        const newValue = (current || 0) + 1;
        await this.set(key, newValue, ttl);
        return newValue;
    }

    async reset(key: string): Promise<void> {
        this.data.delete(key);
    }
}

// Memory store instance
const memoryStore = new MemoryStore();

/**
 * إنشاء Rate Limiter مع دعم Redis أو Memory Store
 */
export function createRateLimiter(limit: number, window: number) {
    // استخدام Redis إذا كان متوفراً
    if (
        process.env.UPSTASH_REDIS_REST_URL &&
        process.env.UPSTASH_REDIS_REST_TOKEN
    ) {
        const redis = new Redis({
            url: process.env.UPSTASH_REDIS_REST_URL,
            token: process.env.UPSTASH_REDIS_REST_TOKEN,
        });

        return new Ratelimit({
            redis,
            limiter: Ratelimit.slidingWindow(limit, `${window} s`),
            analytics: true,
            prefix: '@belqees-media/ratelimit',
        });
    }

    // استخدام Memory Store كـ fallback
    return {
        limit: async (identifier: string) => {
            const key = `ratelimit:${identifier}`;
            const count = await memoryStore.increment(key, window);
            const remaining = Math.max(0, limit - count);
            const reset = Date.now() + window * 1000;

            return {
                success: count <= limit,
                limit,
                remaining,
                reset,
                resetAfter: window,
            };
        },
    };
}

