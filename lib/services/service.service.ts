/**
 * Service Service
 * طبقة الخدمات للتعامل مع الخدمات
 */

import { prisma } from '@/lib/prisma';
import { retryDatabaseOperation } from '@/lib/prisma';
import { NotFoundError } from '@/lib/errors';
import type { Prisma } from '@prisma/client';

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
        return retryDatabaseOperation(async () => {
            return await prisma.service.findMany({
                where: { published: true },
                select: {
                    id: true,
                    slug: true,
                    title: true,
                    description: true,
                    icon: true,
                    image: true,
                    published: true,
                    createdAt: true,
                },
                orderBy: { createdAt: 'desc' },
                take: limit,
            });
        });
    }

    /**
     * الحصول على جميع الخدمات (مع pagination)
     */
    async getAllServices(filters?: ServiceFilters): Promise<{
        services: any[];
        total: number;
    }> {
        return retryDatabaseOperation(async () => {
            const where: Prisma.ServiceWhereInput = {};

            if (filters?.published !== undefined) {
                where.published = filters.published;
            }

            const [services, total] = await Promise.all([
                prisma.service.findMany({
                    where,
                    select: {
                        id: true,
                        slug: true,
                        title: true,
                        description: true,
                        icon: true,
                        image: true,
                        published: true,
                        createdAt: true,
                    },
                    orderBy: { createdAt: 'desc' },
                    take: filters?.limit,
                    skip: filters?.offset,
                }),
                prisma.service.count({ where }),
            ]);

            return { services, total };
        });
    }

    /**
     * الحصول على خدمة واحدة بالـ ID
     */
    async getServiceById(id: string): Promise<any> {
        return retryDatabaseOperation(async () => {
            const service = await prisma.service.findUnique({
                where: { id },
                select: {
                    id: true,
                    slug: true,
                    title: true,
                    description: true,
                    icon: true,
                    image: true,
                    content: true,
                    published: true,
                    createdAt: true,
                    updatedAt: true,
                },
            });

            if (!service) {
                throw new NotFoundError('الخدمة');
            }

            return service;
        });
    }

    /**
     * الحصول على خدمة واحدة بالـ Slug
     */
    async getServiceBySlug(slug: string): Promise<any> {
        return retryDatabaseOperation(async () => {
            const service = await prisma.service.findUnique({
                where: { slug },
                select: {
                    id: true,
                    slug: true,
                    title: true,
                    description: true,
                    icon: true,
                    image: true,
                    content: true,
                    published: true,
                    createdAt: true,
                    updatedAt: true,
                },
            });

            if (!service) {
                throw new NotFoundError('الخدمة');
            }

            return service;
        });
    }

    /**
     * إنشاء خدمة جديدة
     */
    async createService(data: CreateServiceData): Promise<any> {
        return retryDatabaseOperation(async () => {
            return await prisma.service.create({
                data,
                select: {
                    id: true,
                    slug: true,
                    title: true,
                    description: true,
                    icon: true,
                    image: true,
                    published: true,
                    createdAt: true,
                },
            });
        });
    }

    /**
     * تحديث خدمة
     */
    async updateService(id: string, data: UpdateServiceData): Promise<any> {
        return retryDatabaseOperation(async () => {
            return await prisma.service.update({
                where: { id },
                data,
                select: {
                    id: true,
                    slug: true,
                    title: true,
                    description: true,
                    icon: true,
                    image: true,
                    published: true,
                    updatedAt: true,
                },
            });
        });
    }

    /**
     * حذف خدمة
     */
    async deleteService(id: string): Promise<void> {
        return retryDatabaseOperation(async () => {
            await prisma.service.delete({
                where: { id },
            });
        });
    }
}

// Export singleton instance
export const serviceService = new ServiceService();

