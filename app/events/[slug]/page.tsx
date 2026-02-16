import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { eventService } from '@/lib/services/event.service';
import EventDetailContent from '@/components/pages/EventDetailContent';

interface Props {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({
    params,
}: Props): Promise<Metadata> {
    const { slug } = await params;

    try {
        const event = await eventService.getEventBySlug(slug);

        if (!event) {
            return {
                title: 'الفعالية غير موجودة - Belqees Media',
            };
        }

        return {
            title: `${event.title} - Belqees Media`,
            description: event.description || `تفاصيل فعالية ${event.title} من Belqees Media`,
            openGraph: {
                title: `${event.title} - Belqees Media`,
                description: event.description || `تفاصيل فعالية ${event.title}`,
                type: 'website',
                images: event.image ? [event.image] : [],
            },
        };
    } catch (error) {
        return {
            title: 'الفعالية غير موجودة - Belqees Media',
        };
    }
}

export default async function EventDetailPage({
    params,
}: Props) {
    const { slug } = await params;

    try {
        const event = await eventService.getEventBySlug(slug);

        if (!event || (!event.published && process.env.NODE_ENV === 'production')) {
            notFound();
        }

        return (
            <EventDetailContent event={event} />
        );
    } catch (error) {
        notFound();
    }
}
