import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { serviceService } from '@/lib/services/service.service';
import ServiceDetailContent from '@/components/pages/ServiceDetailContent';

interface Props {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({
    params,
}: Props): Promise<Metadata> {
    const { slug } = await params;

    try {
        const service = await serviceService.getServiceBySlug(slug);

        if (!service) {
            return {
                title: 'الخدمة غير موجودة - Belqees Media',
            };
        }

        return {
            title: `${service.title} - Belqees Media`,
            description: service.description || `تفاصيل خدمة ${service.title} من Belqees Media`,
            openGraph: {
                title: `${service.title} - Belqees Media`,
                description: service.description || `تفاصيل خدمة ${service.title}`,
                type: 'website',
                images: service.image ? [service.image] : [],
            },
        };
    } catch (error) {
        return {
            title: 'الخدمة غير موجودة - Belqees Media',
        };
    }
}

export default async function ServiceDetailPage({
    params,
}: Props) {
    const { slug } = await params;

    try {
        const service = await serviceService.getServiceBySlug(slug);

        if (!service || (!service.published && process.env.NODE_ENV === 'production')) {
            notFound();
        }

        return (
            <ServiceDetailContent service={service} />
        );
    } catch (error) {
        notFound();
    }
}
