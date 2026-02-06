/**
 * Event Service (Static Version)
 * طبقة الخدمات للتعامل مع الفعاليات - نسخة ثابتة
 */

import { events } from '@/data/events';
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
        let items = events.map(e => ({ ...e, published: true })); // Static data is all published

        if (limit) {
            items = items.slice(0, limit);
        }

        return items;
    }

    /**
     * الحصول على جميع الفعاليات (مع pagination)
     */
    async getAllEvents(filters?: EventFilters): Promise<{
        events: any[];
        total: number;
    }> {
        let items = events.map(e => ({ ...e, published: true }));

        const total = items.length;
        const offset = filters?.offset || 0;
        const limit = filters?.limit || 10;

        return {
            events: items.slice(offset, offset + limit),
            total
        };
    }

    /**
     * الحصول على فعالية واحدة بالـ ID
     */
    async getEventById(id: string): Promise<any> {
        const item = events.find(e => e.id === id);
        if (!item) throw new NotFoundError('الفعالية');
        return item;
    }

    /**
     * الحصول على فعالية واحدة بالـ Slug
     */
    async getEventBySlug(slug: string): Promise<any> {
        // Since static data doesn't have slugs, we'll try to find by ID or name
        const item = events.find(e => e.id === slug);
        if (!item) throw new NotFoundError('الفعالية');
        return item;
    }

    // Placeholder methods for management
    async createEvent(data: CreateEventData): Promise<any> { return null; }
    async updateEvent(id: string, data: UpdateEventData): Promise<any> { return null; }
    async deleteEvent(id: string): Promise<void> { }
}

// Export singleton instance
export const eventService = new EventService();
