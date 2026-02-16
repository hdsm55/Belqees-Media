const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Helper to generate slug
const generateSlug = (text) => {
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
    const { events } = require('../data/events');
    for (const event of events) {
        const { id, title, description, image, date, location } = event;
        const slug = generateSlug(title);

        const { error } = await supabase
            .from('events')
            .upsert({
                id: crypto?.randomUUID?.() || require('crypto').randomUUID(),
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
    const { services } = require('../data/services');
    for (const service of services) {
        const { title, description, icon } = service;
        const slug = generateSlug(title);

        const { error } = await supabase
            .from('services')
            .upsert({
                id: crypto?.randomUUID?.() || require('crypto').randomUUID(),
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
    const { portfolioItems } = require('../data/portfolio');
    for (const item of portfolioItems) {
        const { slug, title, description, category, images } = item;

        const { error } = await supabase
            .from('portfolio')
            .upsert({
                id: crypto?.randomUUID?.() || require('crypto').randomUUID(),
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
