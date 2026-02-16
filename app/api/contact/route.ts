import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/server';

/**
 * Contact route - Stores messages in Supabase for admin viewing.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, message, subject } = body;

    // Basic validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, message: 'يرجى ملء جميع الحقول المطلوبة' },
        { status: 400 }
      );
    }

    // Initialize Supabase Admin client to bypass RLS for creation (or use public RLS if enabled)
    const supabase = createAdminClient();

    const { error } = await supabase
      .from('contact_messages')
      .insert([
        {
          name,
          email,
          subject: subject || 'No Subject',
          message,
          createdAt: new Date().toISOString()
        }
      ]);

    if (error) {
      console.error('Supabase Contact Storage Error:', error);
      // Fallback: log to console if DB fails but return success to user for better UX
      // Or return error if we want them to retry
      throw error;
    }

    return NextResponse.json(
      {
        success: true,
        message: 'تم إرسال رسالتك بنجاح، سنقوم بالرد عليك قريباً.',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact Form Error:', error);
    return NextResponse.json(
      { success: false, message: 'حدث خطأ أثناء إرسال الرسالة، يرجى المحاولة لاحقاً' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { success: false, message: 'Method Not Allowed' },
    { status: 405 }
  );
}
