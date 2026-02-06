import { Metadata } from 'next';
import { events } from '@/data/events';
import PageHeroSection from '@/components/blocks/PageHeroSection';
import EventsPageClient from './EventsPageClient';

export const metadata: Metadata = {
  // ...
  title: 'الفعاليات - Belqees Media',
  description: 'استكشف فعالياتنا وإنتاجاتنا الإعلامية المميزة',
  keywords: ['فعاليات', 'events', 'إنتاج إعلامي', 'بث مباشر', 'فعاليات مباشرة'],
  openGraph: {
    title: 'الفعاليات - Belqees Media',
    description: 'استكشف فعالياتنا وإنتاجاتنا الإعلامية المميزة',
    type: 'website',
    url: '/events',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'الفعاليات - Belqees Media',
    description: 'استكشف فعالياتنا وإنتاجاتنا الإعلامية المميزة',
  },
  alternates: {
    canonical: '/events',
  },
};

export default async function EventsPage() {
  // Using static events data
  const eventsData = events;


  return (
    <div className="bg-white dark:bg-gray-900 transition-colors min-h-screen">
      {/* Hero Section */}
      <PageHeroSection
        title="الفعاليات"
        subtitle="استكشف فعالياتنا وإنتاجاتنا الإعلامية المميزة"
        backgroundImage="/images/events-hero.jpg"
      />

      {/* Events Grid */}
      <section className="py-16 bg-white dark:bg-gray-900 transition-colors" aria-labelledby="events-heading">
        <div className="container mx-auto px-4">
          <h2 id="events-heading" className="sr-only">الفعاليات</h2>
          <EventsPageClient events={eventsData as any} />
        </div>
      </section>
    </div>
  );
}
