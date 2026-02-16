const { createClient } = require('@supabase/supabase-js');
const { PrismaClient } = require('@prisma/client');
require('dotenv').config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
    console.error('Missing Supabase environment variables');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);
const prisma = new PrismaClient();

async function createAdmin(email, password) {
    try {
        console.log(`Creating admin user: ${email}...`);

        // 1. Create user in Supabase Auth
        const { data: authData, error: authError } = await supabase.auth.admin.createUser({
            email,
            password,
            email_confirm: true
        });

        if (authError) {
            if (authError.message.includes('already registered')) {
                console.log('User already exists in Supabase Auth. Checking database record...');
                // Try to find the user in auth to get their ID
                const { data: listData, error: listError } = await supabase.auth.admin.listUsers();
                const existingUser = listData.users.find(u => u.email === email);
                if (existingUser) {
                    return await syncUserToDb(existingUser.id, email);
                }
            }
            throw authError;
        }

        const userId = authData.user.id;
        console.log(`User created in Auth with ID: ${userId}`);

        // 2. Create user in Prisma DB
        await syncUserToDb(userId, email);

    } catch (error) {
        console.error('Error creating admin:', error);
    } finally {
        await prisma.$disconnect();
    }
}

async function syncUserToDb(supabaseUserId, email) {
    const existingUser = await prisma.user.findUnique({
        where: { email }
    });

    if (existingUser) {
        console.log('User already exists in database. Updating role to ADMIN...');
        await prisma.user.update({
            where: { email },
            data: { role: 'ADMIN', supabaseUserId }
        });
    } else {
        console.log('Creating new user record in database...');
        await prisma.user.create({
            data: {
                email,
                role: 'ADMIN',
                supabaseUserId
            }
        });
    }
    console.log('✅ Admin user is ready!');
}

// Get from command line or use defaults
const email = process.argv[2] || 'admin@belqees.com';
const password = process.argv[3] || 'Admin@123';

createAdmin(email, password);
