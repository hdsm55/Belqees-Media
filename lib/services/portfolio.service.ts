/**
 * Portfolio Service (Dynamic Supabase Version)
 * طبقة الخدمات للتعامل مع معرض الأعمال عبر Supabase
 */

import { createClient } from '@/lib/supabase/server';
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
     * الحصول على جميع الأعمال (مع pagination)
     */
    async getAllPortfolio(filters?: PortfolioFilters): Promise<{
        portfolio: any[];
        total: number;
    }> {
        const supabase = await createClient();

        let query = supabase
            .from('portfolio')
            .select('*', { count: 'exact' });

        if (filters?.published !== undefined) {
            query = query.eq('published', filters.published);
        }

        if (filters?.category) {
            query = query.eq('category', filters.category);
        }

        const offset = filters?.offset || 0;
        const limit = filters?.limit || 12;

        const { data, count, error } = await query
            .order('createdAt', { ascending: false })
            .range(offset, offset + limit - 1);

        if (error) {
            console.error('Error fetching portfolio:', error);
            return { portfolio: [], total: 0 };
        }

        return {
            portfolio: data || [],
            total: count || 0
        };
    }

    /**
     * الحصول على عمل واحد بالـ Slug
     */
    async getPortfolioBySlug(slug: string): Promise<any> {
        const supabase = await createClient();

        const { data, error } = await supabase
            .from('portfolio')
            .select('*')
            .eq('slug', slug)
            .single();

        if (error || !data) {
            console.error('Error fetching portfolio item:', error);
            throw new NotFoundError('المشروع');
        }

        return data;
    }

    /**
     * الحصول على جميع الفئات (Categories) المستخدمة حالياً
     */
    async getPublishedCategories(): Promise<string[]> {
        const supabase = await createClient();

        const { data, error } = await supabase
            .from('portfolio')
            .select('category')
            .eq('published', true);

        if (error) {
            console.error('Error fetching categories:', error);
            return [];
        }

        // Return unique non-null categories
        const categories = data
            .map(item => item.category)
            .filter((cat, index, self) => cat && self.indexOf(cat) === index) as string[];

        return categories;
    }

    /**
     * إدارة المحتوى (للاستخدام في الـ API Routes إذا لزم الأمر)
     */
    async createPortfolio(data: CreatePortfolioData): Promise<any> {
        const supabase = await createClient();
        const { data: newItem, error } = await supabase
            .from('portfolio')
            .insert([{ ...data, id: crypto.randomUUID(), updatedAt: new Date().toISOString() }])
            .select()
            .single();

        if (error) throw error;
        return newItem;
    }

    async updatePortfolio(id: string, data: UpdatePortfolioData): Promise<any> {
        const supabase = await createClient();
        const { data: updatedItem, error } = await supabase
            .from('portfolio')
            .update({ ...data, updatedAt: new Date().toISOString() })
            .eq('id', id)
            .select()
            .single();

        if (error) throw error;
        return updatedItem;
    }

    async deletePortfolio(id: string): Promise<void> {
        const supabase = await createClient();
        const { error } = await supabase
            .from('portfolio')
            .delete()
            .eq('id', id);

        if (error) throw error;
    }
}

// Export singleton instance
export const portfolioService = new PortfolioService();
