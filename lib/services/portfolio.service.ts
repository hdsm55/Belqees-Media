/**
 * Portfolio Service (Static Version)
 * طبقة الخدمات للتعامل مع الأعمال - نسخة ثابتة
 */

import { portfolioItems, portfolioCategories } from '@/data/portfolio';
import { NotFoundError } from '@/lib/errors';

export interface PortfolioFilters {
    published?: boolean;
    category?: string;
    limit?: number;
    offset?: number;
}

export interface CreatePortfolioData {
    slug: string;
    title: string;
    description?: string | null;
    images?: any;
    videos?: any;
    category?: string | null;
    published?: boolean;
}

export interface UpdatePortfolioData extends Partial<CreatePortfolioData> { }

export class PortfolioService {
    /**
     * الحصول على الأعمال المنشورة
     */
    async getPublishedPortfolio(limit?: number, category?: string): Promise<any[]> {
        let items = portfolioItems.filter(item => item.published);

        if (category) {
            items = items.filter(item => item.category === category);
        }

        if (limit) {
            items = items.slice(0, limit);
        }

        return items;
    }

    /**
     * الحصول على جميع الأعمال (مع pagination)
     */
    async getAllPortfolio(filters?: PortfolioFilters): Promise<{
        portfolio: any[];
        total: number;
    }> {
        let items = [...portfolioItems];

        if (filters?.published !== undefined) {
            items = items.filter(item => item.published === filters.published);
        }

        if (filters?.category) {
            items = items.filter(item => item.category === filters.category);
        }

        const total = items.length;
        const offset = filters?.offset || 0;
        const limit = filters?.limit || 12;

        return {
            portfolio: items.slice(offset, offset + limit),
            total
        };
    }

    /**
     * الحصول على عمل واحد بالـ ID
     */
    async getPortfolioById(id: string): Promise<any> {
        const item = portfolioItems.find(i => i.id === id);
        if (!item) throw new NotFoundError('العمل');
        return item;
    }

    /**
     * الحصول على عمل واحد بالـ Slug
     */
    async getPortfolioBySlug(slug: string): Promise<any> {
        const item = portfolioItems.find(i => i.slug === slug);
        if (!item) throw new NotFoundError('العمل');
        return item;
    }

    /**
     * الحصول على جميع الفئات (Categories) للأعمال المنشورة
     */
    async getPublishedCategories(): Promise<string[]> {
        return portfolioCategories;
    }

    // Placeholder methods for management (not used in static version)
    async createPortfolio(data: CreatePortfolioData): Promise<any> { return null; }
    async updatePortfolio(id: string, data: UpdatePortfolioData): Promise<any> { return null; }
    async deletePortfolio(id: string): Promise<void> { }
}

// Export singleton instance
export const portfolioService = new PortfolioService();
