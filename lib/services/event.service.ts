/**
 * Event Service (Dynamic Supabase Version)
 * طبقة الخدمات للتعامل مع الفعاليات عبر Supabase
 */

import { createClient } from '@/lib/supabase/server';
import { NotFoundError } from '@/lib/errors';

export interface EventFilters {
    published?: boolean;
    limit?: number;
    offset?: number;
}

export interface CreateEventData {
    slug: string;
    title: string;
    description?: string | null;
    date: Date | string;
    time?: string | null;
    location?: string | null;
    image?: string | null;
    registrations?: any;
    published?: boolean;
}

export interface UpdateEventData extends Partial<CreateEventData> { }

export class EventService {
    /**
     * الحصول على الفعاليات المنشورة
     */
    async getPublishedEvents(limit?: number): Promise<any[]> {
        const supabase = await createClient();

        let query = supabase
            .from('events')
            .select('*')
            .eq('published', true)
            .order('date', { ascending: false });

        if (limit) {
            query = query.limit(limit);
        }

        const { data, error } = await query;

        if (error) {
            console.error('Error fetching events:', error);
            return [];
        }

        return data || [];
    }

    /**
     * الحصول على جميع الفعاليات (مع pagination)
     */
    async getAllEvents(filters?: EventFilters): Promise<{
        events: any[];
        total: number;
    }> {
        const supabase = await createClient();

        let query = supabase
            .from('events')
            .select('*', { count: 'exact' });

        if (filters?.published !== undefined) {
            query = query.eq('published', filters.published);
        }

        const offset = filters?.offset || 0;
        const limit = filters?.limit || 10;

        const { data, count, error } = await query
            .order('date', { ascending: false })
            .range(offset, offset + limit - 1);

        if (error) {
            console.error('Error fetching events:', error);
            return { events: [], total: 0 };
        }

        return {
            events: data || [],
            total: count || 0
        };
    }

    /**
     * الحصول على فعالية واحدة بالـ Slug
     */
    async getEventBySlug(slug: string): Promise<any> {
        const supabase = await createClient();

        const { data, error } = await supabase
            .from('events')
            .select('*')
            .eq('slug', slug)
            .single();

        if (error || !data) {
            console.error('Error fetching event:', error);
            throw new NotFoundError('الفعالية');
        }

        return data;
    }

    /**
     * الحصول على فعالية واحدة بالـ ID
     */
    async getEventById(id: string): Promise<any> {
        const supabase = await createClient();

        const { data, error } = await supabase
            .from('events')
            .select('*')
            .eq('id', id)
            .single();

        if (error || !data) {
            console.error('Error fetching event:', error);
            throw new NotFoundError('الفعالية');
        }

        return data;
    }

    /**
     * إدارة المحتوى
     */
    async createEvent(data: CreateEventData): Promise<any> {
        const supabase = await createClient();
        const { data: newItem, error } = await supabase
            .from('events')
            .insert([{ ...data, id: crypto.randomUUID(), updatedAt: new Date().toISOString() }])
            .select()
            .single();

        if (error) throw error;
        return newItem;
    }

    async updateEvent(id: string, data: UpdateEventData): Promise<any> {
        const supabase = await createClient();
        const { data: updatedItem, error } = await supabase
            .from('events')
            .update({ ...data, updatedAt: new Date().toISOString() })
            .eq('id', id)
            .select()
            .single();

        if (error) throw error;
        return updatedItem;
    }

    async deleteEvent(id: string): Promise<void> {
        const supabase = await createClient();
        const { error } = await supabase
            .from('events')
            .delete()
            .eq('id', id);

        if (error) throw error;
    }
}

// Export singleton instance
export const eventService = new EventService();
