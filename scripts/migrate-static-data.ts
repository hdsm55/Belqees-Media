import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { events } from '../data/events';
import { services } from '../data/services';
import { portfolioItems } from '../data/portfolio';
import { randomUUID } from 'crypto';

dotenv.config();

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const generateSlug = (text: string) => {
    return text
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '');
};

async function migrate() {
    console.log('🚀 Starting migration of static data...');

    // 1. Migrate Events
    console.log('\n📅 Migrating Events...');
    for (const event of events) {
        const { title, description, image, date, location } = event;
        const slug = generateSlug(title);

        const { error } = await supabase
            .from('events')
            .upsert({
                id: randomUUID(),
                slug,
                title,
                description,
                image,
                date: new Date(date).toISOString(),
                location,
                published: true,
                updatedAt: new Date().toISOString()
            }, { onConflict: 'slug' });

        if (error) console.error(`❌ Error migrating event "${title}":`, error.message);
        else console.log(`✅ Migrated event: ${title}`);
    }

    // 2. Migrate Services
    console.log('\n🛠️ Migrating Services...');
    for (const service of services) {
        const { title, description, icon } = service;
        const slug = generateSlug(title);

        const { error } = await supabase
            .from('services')
            .upsert({
                id: randomUUID(),
                slug,
                title,
                description,
                icon,
                published: true,
                updatedAt: new Date().toISOString()
            }, { onConflict: 'slug' });

        if (error) console.error(`❌ Error migrating service "${title}":`, error.message);
        else console.log(`✅ Migrated service: ${title}`);
    }

    // 3. Migrate Portfolio
    console.log('\n📂 Migrating Portfolio...');
    for (const item of portfolioItems) {
        const { slug, title, description, category, images } = item;

        const { error } = await supabase
            .from('portfolio')
            .upsert({
                id: randomUUID(),
                slug,
                title,
                description,
                category,
                images,
                published: true,
                updatedAt: new Date().toISOString()
            }, { onConflict: 'slug' });

        if (error) console.error(`❌ Error migrating portfolio item "${title}":`, error.message);
        else console.log(`✅ Migrated portfolio item: ${title}`);
    }

    console.log('\n✨ Migration completed!');
}

migrate().catch(console.error);
