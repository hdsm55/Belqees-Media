import { NextResponse } from 'next/server';

export async function GET() {
    const dbUrl = process.env.DATABASE_URL;

    if (!dbUrl) {
        return NextResponse.json({
            error: 'DATABASE_URL not found in environment variables',
            tip: 'Make sure .env.local exists and contains DATABASE_URL',
        });
    }

    // إخفاء كلمة المرور
    const masked = dbUrl.replace(/:[^:@]+@/, ':****@');

    // التحقق من الميزات
    const checks = {
        hasDatabaseUrl: !!dbUrl,
        maskedUrl: masked,
        port: dbUrl.includes(':6543') ? '6543 ✅ (Correct for Session Pooler)' :
            dbUrl.includes(':5432') ? '5432 ❌ (Wrong - should be 6543)' :
                'unknown',
        hasPooler: dbUrl.includes('pooler') ? '✅ Has pooler' : '❌ Missing pooler',
        hasPgbouncer: dbUrl.includes('pgbouncer=true') ? '✅ Has pgbouncer=true' : '❌ Missing pgbouncer=true',
        hasSslMode: dbUrl.includes('sslmode=require') ? '✅ Has sslmode=require' : '⚠️ Missing sslmode=require (optional)',
        connectionType: dbUrl.includes('pooler') ? 'Session Pooler ✅' :
            dbUrl.includes('db.') ? 'Direct Connection ⚠️' :
                'Unknown',
    };

    return NextResponse.json({
        success: true,
        checks,
        recommendation: checks.port.includes('5432') || !checks.hasPooler || !checks.hasPgbouncer
            ? 'Update DATABASE_URL to use Session Pooler with port 6543 and pgbouncer=true'
            : 'DATABASE_URL looks correct! Make sure to restart the server after changes.',
    });
}

