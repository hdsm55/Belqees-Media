'use client';

import Image from 'next/image';
import Link from 'next/link';
import ScrollReveal from '@/components/animations/ScrollReveal';
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
      return new Intl.DateTimeFormat(localeMap[locale] || 'ar-SA', {
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
      <div className="text-center py-12">
        <p className="text-gray-500 dark:text-gray-400 text-lg mb-4">
          {t('events.noEvents')}
        </p>
        <p className="text-sm text-gray-400 dark:text-gray-500">
          {t('common.tryAgainLater')}
        </p>
      </div>
    );
  }

  return (
    <ScrollReveal animation="fadeIn" stagger={0.1}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8" role="list">
        {events.map(event => (
          <article
            key={event.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-lg transition-shadow border border-gray-100 dark:border-gray-700 overflow-hidden"
            role="listitem"
          >
            <Link href={`/events/${event.slug}`} className="block">
              {event.image ? (
                <div className="relative aspect-video bg-gray-200 dark:bg-gray-700">
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    loading="lazy"
                    quality={75}
                  />
                </div>
              ) : (
                <div className="aspect-video bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                  <span className="text-gray-400 dark:text-gray-500">
                    {t('events.noImage')}
                  </span>
                </div>
              )}
            </Link>
            <div className="p-6">
              <div className="text-sm text-primary-500 dark:text-primary-400 mb-2 font-medium">
                {formatDate(event.date)}
                {event.time && ` - ${event.time}`}
              </div>
              {event.location && (
                <div className="text-sm text-dark-light dark:text-gray-400 mb-2 flex items-center gap-1">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  {event.location}
                </div>
              )}
              <Link href={`/events/${event.slug}`} className="block group">
                <h3 className="text-2xl font-bold text-dark dark:text-gray-100 mb-3 group-hover:text-primary-500 transition-colors">
                  {event.title}
                </h3>
              </Link>
              {event.description && (
                <p className="text-dark-light dark:text-gray-300 leading-relaxed line-clamp-2 mb-4">
                  {event.description}
                </p>
              )}
              <Link
                href={`/events/${event.slug}`}
                className="inline-flex items-center gap-1 text-sm font-bold text-primary-500 dark:text-primary-400 hover:text-primary-600 transition-colors"
              >
                <span>اقرأ المزيد</span>
                <span className="text-xs">←</span>
              </Link>
            </div>
          </article>
        ))}
      </div>
    </ScrollReveal>
  );
}
