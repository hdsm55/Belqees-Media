import { NextRequest, NextResponse } from 'next/server';

/**
 * Simplified contact route for a presentation-only website.
 * Removes database storage and complex middleware dependencies.
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

    // In a real production scenario, you would use a service like Resend or SendGrid here:
    // await resend.emails.send({ ... });

    console.log('--- New Contact Form Submission ---');
    console.log('From:', name, `(${email})`);
    console.log('Subject:', subject || 'No Subject');
    console.log('Message:', message);
    console.log('-----------------------------------');

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

// Redirect GET requests as they are no longer needed for public display
export async function GET() {
  return NextResponse.json(
    { success: false, message: 'Method Not Allowed' },
    { status: 405 }
  );
}
