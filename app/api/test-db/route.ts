import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  return NextResponse.json({
    success: true,
    message: 'Prisma has been removed. Testing static mode.',
    data: {
      mode: 'static',
      database: 'Supabase (Auth Only)',
    },
  });
}
