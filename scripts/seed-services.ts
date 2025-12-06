/**
 * Script to seed default services into the database
 * Run with: npx tsx scripts/seed-services.ts
 */

import { config } from 'dotenv';
import { resolve } from 'path';

// Load environment variables
config({ path: resolve(process.cwd(), '.env.local') });
config({ path: resolve(process.cwd(), '.env') });

import { prisma } from '../lib/prisma';

const defaultServices = [
    {
        slug: 'live-streaming',
        title: 'البث المباشر',
        description: 'بث سلس متعدد المنصات مع جودة عالية واستقرار ممتاز',
        icon: null,
        image: null,
        published: true,
    },
    {
        slug: 'live-events',
        title: 'إنتاج الفعاليات المباشرة',
        description: 'تنفيذ تقني كامل للمؤتمرات والمنتديات والفعاليات الكبرى',
        icon: null,
        image: null,
        published: true,
    },
    {
        slug: 'media-production',
        title: 'الإنتاج الإعلامي',
        description: 'برامج تلفزيونية، فيديوهات ترويجية، وثائقيات، ومحتوى إعلامي متنوع',
        icon: null,
        image: null,
        published: true,
    },
    {
        slug: 'studio-design',
        title: 'تصميم وإعداد الاستوديوهات',
        description: 'حلول متكاملة لتصميم وتجهيز الاستوديوهات بأحدث التقنيات',
        icon: null,
        image: null,
        published: true,
    },
    {
        slug: 'technical-consultancy',
        title: 'الاستشارات التقنية',
        description: 'استشارات متخصصة في التقنيات الإعلامية وأنظمة البث',
        icon: null,
        image: null,
        published: true,
    },
    {
        slug: 'training',
        title: 'التدريب والتطوير',
        description: 'برامج تدريبية متخصصة لتطوير مهارات الفريق في المجال الإعلامي',
        icon: null,
        image: null,
        published: true,
    },
];

async function seedServices() {
    console.log('🌱 بدء إضافة الخدمات الافتراضية...\n');

    try {
        for (const service of defaultServices) {
            // Check if service already exists
            const existing = await prisma.service.findUnique({
                where: { slug: service.slug },
            });

            if (existing) {
                console.log(`⏭️  الخدمة "${service.title}" موجودة بالفعل (slug: ${service.slug})`);
            } else {
                await prisma.service.create({
                    data: service,
                });
                console.log(`✅ تم إضافة الخدمة: "${service.title}"`);
            }
        }

        console.log('\n✨ تم الانتهاء من إضافة الخدمات الافتراضية!');
    } catch (error) {
        console.error('❌ حدث خطأ أثناء إضافة الخدمات:', error);
        throw error;
    } finally {
        await prisma.$disconnect();
    }
}

// Run the seed function
seedServices()
    .then(() => {
        console.log('\n🎉 تم بنجاح!');
        process.exit(0);
    })
    .catch((error) => {
        console.error('\n💥 فشل:', error);
        process.exit(1);
    });

