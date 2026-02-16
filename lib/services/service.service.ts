/**
 * Service Service (Dynamic Supabase Version)
 * طبقة الخدمات للتعامل مع الخدمات عبر Supabase
 */

import { createClient } from '@/lib/supabase/server';
import { NotFoundError } from '@/lib/errors';

export interface ServiceFilters {
    published?: boolean;
    limit?: number;
    offset?: number;
}

export interface CreateServiceData {
    slug: string;
    title: string;
    description?: string | null;
    icon?: string | null;
    image?: string | null;
    content?: any;
    published?: boolean;
}

export interface UpdateServiceData extends Partial<CreateServiceData> { }

export class ServiceService {
    /**
     * الحصول على الخدمات المنشورة
     */
    async getPublishedServices(limit?: number): Promise<any[]> {
        const supabase = await createClient();

        let query = supabase
            .from('services')
            .select('*')
            .eq('published', true)
            .order('createdAt', { ascending: false });

        if (limit) {
            query = query.limit(limit);
        }

        const { data, error } = await query;

        if (error) {
            console.error('Error fetching published services:', error);
            return [];
        }

        return data || [];
    }

    /**
     * الحصول على جميع الخدمات (مع pagination)
     */
    async getAllServices(filters?: ServiceFilters): Promise<{
        services: any[];
        total: number;
    }> {
        const supabase = await createClient();

        let query = supabase
            .from('services')
            .select('*', { count: 'exact' });

        if (filters?.published !== undefined) {
            query = query.eq('published', filters.published);
        }

        const offset = filters?.offset || 0;
        const limit = filters?.limit || 10;

        const { data, count, error } = await query
            .order('createdAt', { ascending: false })
            .range(offset, offset + limit - 1);

        if (error) {
            console.error('Error fetching services:', error);
            return { services: [], total: 0 };
        }

        return {
            services: data || [],
            total: count || 0
        };
    }

    /**
     * الحصول على خدمة واحدة بالـ Slug
     */
    async getServiceBySlug(slug: string): Promise<any> {
        const supabase = await createClient();

        const { data, error } = await supabase
            .from('services')
            .select('*')
            .eq('slug', slug)
            .single();

        if (error || !data) {
            console.error('Error fetching service:', error);
            throw new NotFoundError('الخدمة');
        }

        return data;
    }

    /**
     * الحصول على خدمة واحدة بالـ ID
     */
    async getServiceById(id: string): Promise<any> {
        const supabase = await createClient();

        const { data, error } = await supabase
            .from('services')
            .select('*')
            .eq('id', id)
            .single();

        if (error || !data) {
            console.error('Error fetching service:', error);
            throw new NotFoundError('الخدمة');
        }

        return data;
    }

    /**
     * إدارة المحتوى
     */
    async createService(data: CreateServiceData): Promise<any> {
        const supabase = await createClient();
        const { data: newItem, error } = await supabase
            .from('services')
            .insert([{ ...data, id: crypto.randomUUID(), updatedAt: new Date().toISOString() }])
            .select()
            .single();

        if (error) throw error;
        return newItem;
    }

    async updateService(id: string, data: UpdateServiceData): Promise<any> {
        const supabase = await createClient();
        const { data: updatedItem, error } = await supabase
            .from('services')
            .update({ ...data, updatedAt: new Date().toISOString() })
            .eq('id', id)
            .select()
            .single();

        if (error) throw error;
        return updatedItem;
    }

    async deleteService(id: string): Promise<void> {
        const supabase = await createClient();
        const { error } = await supabase
            .from('services')
            .delete()
            .eq('id', id);

        if (error) throw error;
    }
}

// Export singleton instance
export const serviceService = new ServiceService();
