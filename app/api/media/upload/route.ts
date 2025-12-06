import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth/session';
import { rateLimit } from '@/lib/rate-limit';
import { withErrorHandler } from '@/lib/errors';
import { createClient, createAdminClient } from '@/lib/supabase/server';
import { prisma } from '@/lib/prisma';

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/avif', 'image/gif'];
const ALLOWED_VIDEO_TYPES = ['video/mp4', 'video/webm', 'video/ogg'];
const ALLOWED_DOCUMENT_TYPES = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];

export const POST = withErrorHandler(async (request: NextRequest) => {
    const { response: rateLimitResponse } = await rateLimit(request);
    if (rateLimitResponse) return rateLimitResponse;

    const user = await requireAuth();

    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
        return NextResponse.json(
            { success: false, message: 'لم يتم اختيار ملف' },
            { status: 400 }
        );
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
        return NextResponse.json(
            { success: false, message: 'حجم الملف كبير جداً. الحد الأقصى 10MB' },
            { status: 400 }
        );
    }

    // Validate file type
    const allowedTypes = [...ALLOWED_IMAGE_TYPES, ...ALLOWED_VIDEO_TYPES, ...ALLOWED_DOCUMENT_TYPES];
    if (!allowedTypes.includes(file.type)) {
        return NextResponse.json(
            { success: false, message: 'نوع الملف غير مدعوم' },
            { status: 400 }
        );
    }

    try {
        // Check if Supabase is configured
        if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
            console.error('[Media Upload] Supabase not configured');
            return NextResponse.json(
                {
                    success: false,
                    message: 'إعدادات التخزين غير متوفرة. يرجى التحقق من إعدادات Supabase.',
                },
                { status: 500 }
            );
        }

        // Try to use Admin Client (Service Role Key) first to bypass RLS
        // If Service Role Key is not available, fall back to regular client
        let supabase;
        let useAdminClient = false;

        // Log environment check
        const hasServiceRoleKey = !!process.env.SUPABASE_SERVICE_ROLE_KEY;
        console.log('[Media Upload] Environment check:', {
            hasServiceRoleKey,
            serviceRoleKeyLength: hasServiceRoleKey ? process.env.SUPABASE_SERVICE_ROLE_KEY?.length : 0,
            supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL ? 'Set' : 'Missing',
            anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'Set' : 'Missing',
        });

        if (hasServiceRoleKey) {
            try {
                supabase = createAdminClient();
                useAdminClient = true;
                console.log('[Media Upload] ✅ Using Admin Client (Service Role Key) - RLS bypassed');
            } catch (error: any) {
                console.error('[Media Upload] ❌ Failed to create Admin Client:', error.message);
                console.warn('[Media Upload] Falling back to regular client');
                supabase = await createClient();
            }
        } else {
            supabase = await createClient();
            console.log('[Media Upload] ⚠️ Using regular client (Anon Key) - RLS policies apply');
            console.log('[Media Upload] 💡 Tip: Add SUPABASE_SERVICE_ROLE_KEY to .env.local to bypass RLS');
        }

        // Try to upload directly - if bucket doesn't exist, we'll get an error
        // This is more efficient than listing all buckets first
        const timestamp = Date.now();
        const fileExt = file.name.split('.').pop();
        const fileName = `${timestamp}-${Math.random().toString(36).substring(7)}.${fileExt}`;
        const filePath = `media/${fileName}`;

        console.log('[Media Upload] Attempting upload:', { fileName, filePath, size: file.size, type: file.type, useAdminClient });

        // Upload to Supabase Storage directly
        const { data: uploadData, error: uploadError } = await supabase.storage
            .from('media')
            .upload(filePath, file, {
                cacheControl: '3600',
                upsert: false,
            });

        // If upload fails, check the error type
        if (uploadError) {
            console.error('[Media Upload] Upload error:', uploadError);
            console.error('[Media Upload] Full error object:', JSON.stringify(uploadError, null, 2));
            console.error('[Media Upload] Error details:', {
                message: uploadError.message,
                name: (uploadError as any).name,
                statusCode: (uploadError as any).statusCode,
                status: (uploadError as any).status,
                useAdminClient,
                hasServiceRoleKey: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
            });

            const errorMessage = uploadError.message || '';
            const errorName = (uploadError as any).name || '';
            const errorStatus = (uploadError as any).statusCode || (uploadError as any).status || '';

            // Check for permission/RLS issues first (most common)
            if (errorMessage.includes('new row violates row-level security policy') ||
                errorMessage.includes('permission denied') ||
                errorMessage.includes('RLS') ||
                errorMessage.includes('row-level security') ||
                errorMessage.includes('policy') ||
                errorStatus === '403' ||
                errorStatus === 403) {

                // Check if Service Role Key is available
                const hasServiceRoleKey = !!process.env.SUPABASE_SERVICE_ROLE_KEY;
                let message = 'ليس لديك صلاحية للرفع. ';

                if (!hasServiceRoleKey) {
                    message += '⚠️ الحل الأسهل: أضف SUPABASE_SERVICE_ROLE_KEY في ملف .env.local لتجاوز RLS Policies.\n\n';
                    message += 'أو ';
                }

                message += 'تحقق من Policies في Supabase Storage:\n';
                message += '1. افتح Supabase Dashboard → Storage → media bucket → Policies\n';
                message += '2. اضغط على Policy "Authenticated Upload"\n';
                message += '3. تأكد من أن USING expression هو: (bucket_id = \'media\'::text)\n';
                message += '4. تأكد من أن WITH CHECK expression هو: (bucket_id = \'media\'::text)\n';
                message += '5. احفظ Policy\n\n';
                message += 'راجع ملف docs/SUPABASE_STORAGE_SETUP.md للتعليمات التفصيلية.';

                return NextResponse.json(
                    {
                        success: false,
                        message,
                    },
                    { status: 403 }
                );
            }

            // Check if bucket doesn't exist
            if (errorMessage.includes('Bucket not found') ||
                errorMessage.includes('not found') ||
                errorMessage.includes('The resource was not found') ||
                errorMessage.includes('does not exist') ||
                errorStatus === '404' ||
                errorStatus === 404) {
                return NextResponse.json(
                    {
                        success: false,
                        message: 'مجلد التخزين "media" غير موجود. يرجى التحقق من أن الـ bucket "media" موجود و public في Supabase Storage. راجع ملف docs/SUPABASE_STORAGE_SETUP.md للتعليمات.',
                    },
                    { status: 500 }
                );
            }

            // Generic error with full message for debugging
            return NextResponse.json(
                {
                    success: false,
                    message: `خطأ في رفع الملف: ${errorMessage || errorName || 'خطأ غير معروف'}. ${process.env.NODE_ENV === 'development' ? `Status: ${errorStatus}` : ''}`,
                },
                { status: 500 }
            );
        }

        // Get public URL
        const { data: { publicUrl } } = supabase.storage
            .from('media')
            .getPublicUrl(filePath);

        console.log('[Media Upload] Upload successful. Public URL:', publicUrl);

        // Save to database
        const media = await prisma.media.create({
            data: {
                filename: file.name,
                url: publicUrl,
                type: file.type,
                size: file.size,
                uploadedBy: user.id,
            },
            include: {
                uploader: {
                    select: {
                        id: true,
                        email: true,
                    },
                },
            },
        });

        console.log('[Media Upload] Media saved to database:', media.id);

        return NextResponse.json(
            {
                success: true,
                data: media,
                message: 'تم رفع الملف بنجاح',
            },
            { status: 201 }
        );
    } catch (error: any) {
        console.error('[Media Upload] Error:', error);
        return NextResponse.json(
            {
                success: false,
                message: error.message || 'حدث خطأ أثناء رفع الملف',
                error: process.env.NODE_ENV === 'development' ? error.stack : undefined,
            },
            { status: 500 }
        );
    }
});

