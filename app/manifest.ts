import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://belqeesmedia.com';

    return {
        name: 'Belqees Media - بلقيس ميديا',
        short_name: 'Belqees Media',
        description: 'شركة إنتاج إعلامي متكاملة الخدمات تأسست عام 2015',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#D90000',
        orientation: 'portrait-primary',
        icons: [
            {
                src: '/images/logo.avif',
                sizes: 'any',
                type: 'image/avif',
                purpose: 'any',
            },
            {
                src: '/images/logo.avif',
                sizes: '192x192',
                type: 'image/avif',
                purpose: 'maskable',
            },
            {
                src: '/images/logo.avif',
                sizes: '512x512',
                type: 'image/avif',
                purpose: 'maskable',
            },
        ],
        categories: ['business', 'media', 'entertainment'],
        lang: 'ar',
        dir: 'rtl',
    };
}

