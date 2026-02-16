import { NextRequest, NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const file = formData.get('file') as File;

        if (!file) {
            return NextResponse.json({ error: 'No file provided' }, { status: 400 });
        }

        // 1. Convert File to ArrayBuffer and then to Buffer
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // 2. Upload to Cloudinary using a Promise (since upload_stream is callback-based)
        const uploadResult = await new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                {
                    folder: 'belqees_media_uploads',
                    resource_type: 'auto',
                },
                (error, result) => {
                    if (error) reject(error);
                    else resolve(result);
                }
            );
            uploadStream.end(buffer);
        }) as any;

        return NextResponse.json({ url: uploadResult.secure_url });

    } catch (error: any) {
        console.error('Cloudinary Upload error:', error);
        return NextResponse.json({ error: error.message || 'فشل الرفع إلى Cloudinary' }, { status: 500 });
    }
}
