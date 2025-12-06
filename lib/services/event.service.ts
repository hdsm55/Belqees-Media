/**
 * Event Service
 * طبقة الخدمات للتعامل مع الفعاليات
 */

import { prisma } from '@/lib/prisma';
import { retryDatabaseOperation } from '@/lib/prisma';
import { NotFoundError } from '@/lib/errors';
import type { Prisma } from '@prisma/client';

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
        return retryDatabaseOperation(async () => {
            return await prisma.event.findMany({
                where: { published: true },
                select: {
                    id: true,
                    slug: true,
                    title: true,
                    description: true,
                    date: true,
                    time: true,
                    location: true,
                    image: true,
                    published: true,
                    createdAt: true,
                },
                orderBy: { date: 'desc' },
                take: limit,
            });
        });
    }

    /**
     * الحصول على جميع الفعاليات (مع pagination)
     */
    async getAllEvents(filters?: EventFilters): Promise<{
        events: any[];
        total: number;
    }> {
        return retryDatabaseOperation(async () => {
            const where: Prisma.EventWhereInput = {};

            if (filters?.published !== undefined) {
                where.published = filters.published;
            }

            const [events, total] = await Promise.all([
                prisma.event.findMany({
                    where,
                    select: {
                        id: true,
                        slug: true,
                        title: true,
                        description: true,
                        date: true,
                        time: true,
                        location: true,
                        image: true,
                        published: true,
                        createdAt: true,
                    },
                    orderBy: { date: 'desc' },
                    take: filters?.limit,
                    skip: filters?.offset,
                }),
                prisma.event.count({ where }),
            ]);

            return { events, total };
        });
    }

    /**
     * الحصول على فعالية واحدة بالـ ID
     */
    async getEventById(id: string): Promise<any> {
        return retryDatabaseOperation(async () => {
            const event = await prisma.event.findUnique({
                where: { id },
                select: {
                    id: true,
                    slug: true,
                    title: true,
                    description: true,
                    date: true,
                    time: true,
                    location: true,
                    image: true,
                    registrations: true,
                    published: true,
                    createdAt: true,
                    updatedAt: true,
                },
            });

            if (!event) {
                throw new NotFoundError('الفعالية');
            }

            return event;
        });
    }

    /**
     * الحصول على فعالية واحدة بالـ Slug
     */
    async getEventBySlug(slug: string): Promise<any> {
        return retryDatabaseOperation(async () => {
            const event = await prisma.event.findUnique({
                where: { slug },
                select: {
                    id: true,
                    slug: true,
                    title: true,
                    description: true,
                    date: true,
                    time: true,
                    location: true,
                    image: true,
                    registrations: true,
                    published: true,
                    createdAt: true,
                    updatedAt: true,
                },
            });

            if (!event) {
                throw new NotFoundError('الفعالية');
            }

            return event;
        });
    }

    /**
     * إنشاء فعالية جديدة
     */
    async createEvent(data: CreateEventData): Promise<any> {
        return retryDatabaseOperation(async () => {
            return await prisma.event.create({
                data: {
                    ...data,
                    date: typeof data.date === 'string' ? new Date(data.date) : data.date,
                },
                select: {
                    id: true,
                    slug: true,
                    title: true,
                    description: true,
                    date: true,
                    time: true,
                    location: true,
                    image: true,
                    published: true,
                    createdAt: true,
                },
            });
        });
    }

    /**
     * تحديث فعالية
     */
    async updateEvent(id: string, data: UpdateEventData): Promise<any> {
        return retryDatabaseOperation(async () => {
            const updateData: Prisma.EventUpdateInput = { ...data };

            if (data.date) {
                updateData.date = typeof data.date === 'string' ? new Date(data.date) : data.date;
            }

            return await prisma.event.update({
                where: { id },
                data: updateData,
                select: {
                    id: true,
                    slug: true,
                    title: true,
                    description: true,
                    date: true,
                    time: true,
                    location: true,
                    image: true,
                    published: true,
                    updatedAt: true,
                },
            });
        });
    }

    /**
     * حذف فعالية
     */
    async deleteEvent(id: string): Promise<void> {
        return retryDatabaseOperation(async () => {
            await prisma.event.delete({
                where: { id },
            });
        });
    }
}

// Export singleton instance
export const eventService = new EventService();

