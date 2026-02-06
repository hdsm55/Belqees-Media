/**
 * Service Service (Static Version)
 * طبقة الخدمات للتعامل مع الخدمات - نسخة ثابتة
 */

import { services } from '@/data/services';
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
        let items = services.map(s => ({ ...s, published: true }));

        if (limit) {
            items = items.slice(0, limit);
        }

        return items;
    }

    /**
     * الحصول على جميع الخدمات (مع pagination)
     */
    async getAllServices(filters?: ServiceFilters): Promise<{
        services: any[];
        total: number;
    }> {
        let items = services.map(s => ({ ...s, published: true }));

        const total = items.length;
        const offset = filters?.offset || 0;
        const limit = filters?.limit || 10;

        return {
            services: items.slice(offset, offset + limit),
            total
        };
    }

    /**
     * الحصول على خدمة واحدة بالـ ID
     */
    async getServiceById(id: string): Promise<any> {
        const item = services.find(s => s.id === id);
        if (!item) throw new NotFoundError('الخدمة');
        return item;
    }

    /**
     * الحصول على خدمة واحدة بالـ Slug
     */
    async getServiceBySlug(slug: string): Promise<any> {
        const item = services.find(s => s.id === slug); // Using ID as slug for static data
        if (!item) throw new NotFoundError('الخدمة');
        return item;
    }

    // Placeholder methods for management
    async createService(data: CreateServiceData): Promise<any> { return null; }
    async updateService(id: string, data: UpdateServiceData): Promise<any> { return null; }
    async deleteService(id: string): Promise<void> { }
}

// Export singleton instance
export const serviceService = new ServiceService();
