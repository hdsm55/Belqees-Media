/**
 * Script to seed default events into the database
 * Run with: npx tsx scripts/seed-events.ts
 */

import { config } from 'dotenv';
import { resolve } from 'path';

// Load environment variables
config({ path: resolve(process.cwd(), '.env.local') });
config({ path: resolve(process.cwd(), '.env') });

import { prisma } from '../lib/prisma';

const defaultEvents = [
    {
        slug: 'nobel-peace-prize',
        title: 'الذكرى العاشرة لجائزة نوبل للسلام',
        description: 'تغطية إعلامية شاملة للحدث الكبير مع بث مباشر عالي الجودة',
        date: new Date('2024-12-10'),
        time: '18:00',
        location: 'أوسلو، النرويج',
        image: '/images/nobel-peace-prize.jpg',
        published: true,
    },
    {
        slug: 'yemen-researchers-conference',
        title: 'مؤتمر الباحثين والخبراء اليمنيين',
        description: 'إنتاج وتنظيم كامل للمؤتمر مع تغطية إعلامية متكاملة',
        date: new Date('2024-11-15'),
        time: '09:00',
        location: 'إسطنبول، تركيا',
        image: '/images/yemen-researchers-conference.jpg',
        published: true,
    },
    {
        slug: 'media-production-workshop',
        title: 'ورشة عمل الإنتاج الإعلامي',
        description: 'ورشة تدريبية متخصصة في تقنيات الإنتاج الإعلامي الحديث',
        date: new Date('2024-12-20'),
        time: '14:00',
        location: 'استوديوهات بلقيس ميديا',
        image: '/images/events-hero.jpg',
        published: true,
    },
];

async function seedEvents() {
    console.log('🌱 بدء إضافة الفعاليات الافتراضية...\n');

    try {
        for (const event of defaultEvents) {
            const existing = await prisma.event.findUnique({
                where: { slug: event.slug },
            });

            if (existing) {
                // تحديث الصورة للفعالية الموجودة
                if (event.image) {
                    await prisma.event.update({
                        where: { slug: event.slug },
                        data: { image: event.image },
                    });
                    console.log(`🔄 تم تحديث صورة الفعالية: "${event.title}"`);
                } else {
                    console.log(`⏭️  الفعالية "${event.title}" موجودة بالفعل (slug: ${event.slug})`);
                }
            } else {
                await prisma.event.create({
                    data: event,
                });
                console.log(`✅ تم إضافة الفعالية: "${event.title}"`);
            }
        }

        console.log('\n✨ تم الانتهاء من إضافة الفعاليات الافتراضية!');
    } catch (error) {
        console.error('❌ حدث خطأ أثناء إضافة الفعاليات:', error);
        throw error;
    } finally {
        await prisma.$disconnect();
    }
}

seedEvents()
    .then(() => {
        console.log('\n🎉 تم بنجاح!');
        process.exit(0);
    })
    .catch((error) => {
        console.error('\n💥 فشل:', error);
        process.exit(1);
    });

