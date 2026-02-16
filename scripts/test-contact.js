const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function testInsert() {
    console.log('Testing insertion into contact_messages...');
    const { data, error } = await supabase
        .from('contact_messages')
        .insert([
            {
                id: require('crypto').randomUUID(),
                name: 'Test Bot',
                email: 'test@example.com',
                subject: 'Test Subject',
                message: 'This is a test message from the terminal.',
                createdAt: new Date().toISOString()
            }
        ]);

    if (error) {
        console.error('❌ Insert failed:', error);
    } else {
        console.log('✅ Insert successful!');
    }
}

testInsert();
