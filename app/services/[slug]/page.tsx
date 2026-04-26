import { cache } from 'react';
import { serviceService } from '@/lib/services/service.service';
import ServiceDetailContent from '../../../components/pages/ServiceDetailContent';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

interface Props {
    params: Promise<{ slug: string }>;
}

const getService = cache(async (slug: string) => {
    try {
        const service = await serviceService.getServiceBySlug(slug);
        if (!service || (!service.published && process.env.NODE_ENV === 'production')) {
            return null;
        }
        return service;
    } catch (error) {
        return null;
    }
});

export async function generateStaticParams() {
    const services = await serviceService.getPublishedServices();
    return services.map((service) => ({
        slug: service.slug,
    }));
}

export async function generateMetadata({
    params,
}: Props): Promise<Metadata> {
    const { slug } = await params;
    const service = await getService(slug);

    if (!service) {
        return {
            title: 'الخدمة غير موجودة - Belqees Media',
        };
    }

    const title = `${service.title} - Belqees Media`;
    const description = service.description || `تفاصيل خدمة ${service.title} من Belqees Media`;

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            type: 'website',
            images: service.image ? [{ url: service.image, width: 1200, height: 630, alt: service.title }] : [],
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: service.image ? [service.image] : [],
        },
    };
}

export default async function ServiceDetailPage({
    params,
}: Props) {
    const { slug } = await params;
    const service = await getService(slug);

    if (!service) {
        notFound();
    }

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: service.title,
        description: service.description,
        provider: {
            '@type': 'Organization',
            name: 'Belqees Media',
            url: 'https://belqees.media',
        },
        image: service.image,
    };

    const services = await serviceService.getPublishedServices();
    const otherServices = services.filter(s => s.slug !== slug).slice(0, 3);

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <ServiceDetailContent service={service} otherServices={otherServices} />
        </>
    );
}
