/**
 * Portfolio Service
 * طبقة الخدمات للتعامل مع الأعمال
 */

import { prisma } from '@/lib/prisma';
import { retryDatabaseOperation } from '@/lib/prisma';
import { NotFoundError } from '@/lib/errors';
import type { Prisma } from '@prisma/client';

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
        return retryDatabaseOperation(async () => {
            const where: Prisma.PortfolioWhereInput = {
                published: true,
            };

            if (category) {
                where.category = category;
            }

            return await prisma.portfolio.findMany({
                where,
                select: {
                    id: true,
                    slug: true,
                    title: true,
                    description: true,
                    images: true,
                    videos: true,
                    category: true,
                    published: true,
                    createdAt: true,
                },
                orderBy: { createdAt: 'desc' },
                take: limit,
            });
        });
    }

    /**
     * الحصول على جميع الأعمال (مع pagination)
     */
    async getAllPortfolio(filters?: PortfolioFilters): Promise<{
        portfolio: any[];
        total: number;
    }> {
        return retryDatabaseOperation(async () => {
            const where: Prisma.PortfolioWhereInput = {};

            if (filters?.published !== undefined) {
                where.published = filters.published;
            }

            if (filters?.category) {
                where.category = filters.category;
            }

            const [portfolio, total] = await Promise.all([
                prisma.portfolio.findMany({
                    where,
                    select: {
                        id: true,
                        slug: true,
                        title: true,
                        description: true,
                        images: true,
                        videos: true,
                        category: true,
                        published: true,
                        createdAt: true,
                    },
                    orderBy: { createdAt: 'desc' },
                    take: filters?.limit,
                    skip: filters?.offset,
                }),
                prisma.portfolio.count({ where }),
            ]);

            return { portfolio, total };
        });
    }

    /**
     * الحصول على عمل واحد بالـ ID
     */
    async getPortfolioById(id: string): Promise<any> {
        return retryDatabaseOperation(async () => {
            const item = await prisma.portfolio.findUnique({
                where: { id },
                select: {
                    id: true,
                    slug: true,
                    title: true,
                    description: true,
                    images: true,
                    videos: true,
                    category: true,
                    published: true,
                    createdAt: true,
                    updatedAt: true,
                },
            });

            if (!item) {
                throw new NotFoundError('العمل');
            }

            return item;
        });
    }

    /**
     * الحصول على عمل واحد بالـ Slug
     */
    async getPortfolioBySlug(slug: string): Promise<any> {
        return retryDatabaseOperation(async () => {
            const item = await prisma.portfolio.findUnique({
                where: { slug },
                select: {
                    id: true,
                    slug: true,
                    title: true,
                    description: true,
                    images: true,
                    videos: true,
                    category: true,
                    published: true,
                    createdAt: true,
                    updatedAt: true,
                },
            });

            if (!item) {
                throw new NotFoundError('العمل');
            }

            return item;
        });
    }

    /**
     * إنشاء عمل جديد
     */
    async createPortfolio(data: CreatePortfolioData): Promise<any> {
        return retryDatabaseOperation(async () => {
            return await prisma.portfolio.create({
                data,
                select: {
                    id: true,
                    slug: true,
                    title: true,
                    description: true,
                    images: true,
                    videos: true,
                    category: true,
                    published: true,
                    createdAt: true,
                },
            });
        });
    }

    /**
     * تحديث عمل
     */
    async updatePortfolio(id: string, data: UpdatePortfolioData): Promise<any> {
        return retryDatabaseOperation(async () => {
            return await prisma.portfolio.update({
                where: { id },
                data,
                select: {
                    id: true,
                    slug: true,
                    title: true,
                    description: true,
                    images: true,
                    videos: true,
                    category: true,
                    published: true,
                    updatedAt: true,
                },
            });
        });
    }

    /**
     * حذف عمل
     */
    async deletePortfolio(id: string): Promise<void> {
        return retryDatabaseOperation(async () => {
            await prisma.portfolio.delete({
                where: { id },
            });
        });
    }

    /**
     * الحصول على جميع الفئات (Categories) للأعمال المنشورة
     */
    async getPublishedCategories(): Promise<string[]> {
        return retryDatabaseOperation(async () => {
            const items = await prisma.portfolio.findMany({
                where: {
                    published: true,
                },
                select: {
                    category: true,
                },
            });

            // Extract unique categories
            const uniqueCategories = Array.from(
                new Set(items.map(item => item.category).filter(Boolean))
            ) as string[];

            return uniqueCategories;
        });
    }
}

// Export singleton instance
export const portfolioService = new PortfolioService();

