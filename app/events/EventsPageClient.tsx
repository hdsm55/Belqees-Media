'use client';

import Image from 'next/image';
import Link from 'next/link';
import Section from '@/components/atoms/Section';
import CornerBrackets from '@/components/atoms/CornerBrackets';
import { useTranslation } from '@/hooks/useTranslation';

interface Event {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  date: Date | string;
  time: string | null;
  location: string | null;
  image: string | null;
  published: boolean;
}

interface EventsPageClientProps {
  events: Event[];
}

export default function EventsPageClient({ events }: EventsPageClientProps) {
  const { t, locale } = useTranslation();

  const formatDate = (date: Date | string): string => {
    try {
      const dateObj = typeof date === 'string' ? new Date(date) : date;
      const localeMap = {
        ar: 'ar-SA',
        en: 'en-US',
        tr: 'tr-TR',
      };
      return new Intl.DateTimeFormat(localeMap[locale as keyof typeof localeMap] || 'ar-SA', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }).format(dateObj);
    } catch {
      return typeof date === 'string' ? date : date.toISOString();
    }
  };

  if (events.length === 0) {
    return (
      <Section id="no-events" centered>
        <div className="py-20 bg-dark-50 dark:bg-dark-800/50 rounded-4xl border-2 border-dashed border-dark-200 dark:border-dark-700 max-w-2xl mx-auto">
          <p className="text-dark-500 dark:text-dark-400 text-xl font-sans mb-4">
            {t('events.noEvents') || 'لا توجد فعاليات حالياً.'}
          </p>
          <p className="text-sm text-dark-400 dark:text-dark-500">
            {t('common.tryAgainLater')}
          </p>
        </div>
      </Section>
    );
  }

  return (
    <Section id="events-grid" spacing="md">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12" role="list">
        {events.map(event => (
          <article
            key={event.id}
            className="group bg-white dark:bg-dark-800 border border-dark-200 dark:border-dark-700 overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500"
            role="listitem"
          >
            <div className="relative aspect-video overflow-hidden">
              {event.image ? (
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              ) : (
                <div className="w-full h-full bg-dark-100 dark:bg-dark-900 flex items-center justify-center">
                  <span className="text-dark-400 dark:text-dark-600 font-sans">
                    {t('events.noImage')}
                  </span>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-dark-950/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <CornerBrackets showOnHover={true} className="border-white" />
            </div>

            <div className="p-8">
              <div className="flex flex-wrap items-center gap-4 text-sm font-sans mb-4">
                <span className="px-3 py-1 bg-primary-500/10 text-primary-500 dark:text-primary-400 font-bold border border-primary-500/20">
                  {formatDate(event.date)}
                </span>
                {event.time && (
                  <span className="text-dark-500 dark:text-dark-400">
                    {event.time}
                  </span>
                )}
                {event.location && (
                  <span className="text-dark-500 dark:text-dark-400 flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {event.location}
                  </span>
                )}
              </div>

              <Link href={`/events/${event.slug}`} className="block group/title">
                <h3 className="text-2xl font-heading font-bold text-dark-900 dark:text-white mb-4 group-hover/title:text-primary-500 transition-colors leading-tight">
                  {event.title}
                </h3>
              </Link>

              {event.description && (
                <p className="text-dark-600 dark:text-dark-300 font-sans leading-relaxed line-clamp-3 mb-6">
                  {event.description}
                </p>
              )}

              <Link
                href={`/events/${event.slug}`}
                className="inline-flex items-center gap-2 text-sm font-heading font-bold text-primary-500 dark:text-primary-400 hover:text-primary-600 transition-all group/link"
              >
                <span>{t('common.readMore') || 'اقرأ المزيد'}</span>
                <span className="transform group-hover/link:translate-x-1 rtl:group-hover/link:-translate-x-1 transition-transform">
                  {locale === 'ar' ? '←' : '→'}
                </span>
              </Link>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
