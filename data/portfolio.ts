export const portfolioItems = [
    {
        id: '1',
        slug: 'tech-summit-2024',
        title: 'Digital Transformation Summit',
        title_en: 'Digital Transformation Summit',
        title_tr: 'Dijital Dönüşüm Zirvesi',
        description: 'تغطية إعلامية شاملة للقمة الرقمية العالمية.',
        description_en: 'Comprehensive media coverage for the Global Digital Summit.',
        description_tr: 'Küresel Dijital Zirve için kapsamlı medya kapsamı.',
        category: 'Production',
        images: ['/images/portfolio/summit-1.jpg'],
        published: true,
        createdAt: new Date().toISOString()
    },
    {
        id: '2',
        slug: 'live-stream-concert',
        title: 'Live Harmony Concert',
        title_en: 'Live Harmony Concert',
        title_tr: 'Canlı Harmoni Konseri',
        description: 'بث مباشر احترافي لحفل موسيقي عالمي.',
        description_en: 'Professional live streaming of an international music concert.',
        description_tr: 'Uluslararası bir müzik konserinin profesyonel canlı yayını.',
        category: 'Streaming',
        images: ['/images/portfolio/concert-1.jpg'],
        published: true,
        createdAt: new Date().toISOString()
    },
    {
        id: '3',
        slug: 'corporate-identity-launch',
        title: 'Brand Vision 2030',
        title_en: 'Brand Vision 2030',
        title_tr: 'Marka Vizyonu 2030',
        description: 'إطلاق الهوية المؤسسية الجديدة لشركة تقنية كبرى.',
        description_en: 'Launching the new corporate identity for a major tech company.',
        description_tr: 'Büyük bir teknoloji şirketi için yeni kurumsal kimliğin lansmanı.',
        category: 'Branding',
        images: ['/images/portfolio/brand-1.jpg'],
        published: true,
        createdAt: new Date().toISOString()
    }
];

export const portfolioCategories = ['Production', 'Streaming', 'Branding', 'Events'];
