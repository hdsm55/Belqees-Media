import { cache } from 'react';
import { eventService } from '@/lib/services/event.service';
import EventDetailContent from '@/components/pages/EventDetailContent';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

interface Props {
    params: Promise<{ slug: string }>;
}

const getEvent = cache(async (slug: string) => {
    try {
        const event = await eventService.getEventBySlug(slug);
        if (!event || (!event.published && process.env.NODE_ENV === 'production')) {
            return null;
        }
        return event;
    } catch (error) {
        return null;
    }
});

export async function generateStaticParams() {
    const events = await eventService.getPublishedEvents();
    return events.map((event) => ({
        slug: event.slug,
    }));
}

export async function generateMetadata({
    params,
}: Props): Promise<Metadata> {
    const { slug } = await params;
    const event = await getEvent(slug);

    if (!event) {
        return {
            title: 'الفعالية غير موجودة - Belqees Media',
        };
    }

    const title = `${event.title} - Belqees Media`;
    const description = event.description || `تفاصيل فعالية ${event.title} من Belqees Media`;

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            type: 'article',
            images: event.image ? [{ url: event.image, width: 1200, height: 630 }] : [],
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: event.image ? [event.image] : [],
        },
    };
}

export default async function EventDetailPage({
    params,
}: Props) {
    const { slug } = await params;
    const event = await getEvent(slug);

    if (!event) {
        notFound();
    }

    const relatedEvents = await eventService.getPublishedEvents(4);
    const otherEvents = relatedEvents.filter(e => e.slug !== slug).slice(0, 3);

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Event',
        name: event.title,
        description: event.description,
        startDate: event.date,
        location: {
            '@type': 'Place',
            name: event.location || 'Online',
        },
        image: event.image,
        organizer: {
            '@type': 'Organization',
            name: 'Belqees Media',
        },
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <EventDetailContent event={event} otherEvents={otherEvents} />
        </>
    );
}
