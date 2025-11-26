'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import LoadingSkeleton, { CardSkeleton } from '@/components/ui/LoadingSkeleton';
import ScrollReveal from '@/components/animations/ScrollReveal';
import { useTranslation } from '@/hooks/useTranslation';

interface Event {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  date: string;
  time: string | null;
  location: string | null;
  image: string | null;
  published: boolean;
}

export default function EventsPage() {
  const { t } = useTranslation();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('/api/events?published=true');

      if (!response.ok) {
        throw new Error('فشل في جلب البيانات');
      }

      const data: Event[] = await response.json();
      setEvents(data.length > 0 ? data : getDefaultEvents());
    } catch (err) {
      setError('حدث خطأ أثناء جلب البيانات');
      setEvents(getDefaultEvents()); // Fallback to default events
      if (process.env.NODE_ENV === 'development') {
        console.error('Error fetching events:', err);
      }
    } finally {
      setLoading(false);
    }
  };

  // Default events as fallback
  const getDefaultEvents = (): Event[] => [
    {
      id: '1',
      slug: 'nobel-peace-prize',
      title: 'الذكرى العاشرة لجائزة نوبل للسلام',
      description: 'تغطية إعلامية شاملة للحدث الكبير',
      date: '2023-01-01',
      time: null,
      location: null,
      image: null,
      published: true,
    },
    {
      id: '2',
      slug: 'yemen-researchers-conference',
      title: 'مؤتمر الباحثين والخبراء اليمنيين',
      description: 'إنتاج وتنظيم كامل للمؤتمر',
      date: '2023-01-01',
      time: null,
      location: null,
      image: null,
      published: true,
    },
  ];

  const formatDate = (dateString: string): string => {
    try {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat('ar-SA', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }).format(date);
    } catch {
      return dateString;
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 transition-colors min-h-screen pt-20 md:pt-24">
      {/* Hero Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800 transition-colors">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-bold text-center text-dark dark:text-gray-100 mb-6">
            {t('events.pageTitle') || 'الفعاليات'}
          </h1>
          <p className="text-xl text-center text-dark-light dark:text-gray-300 max-w-3xl mx-auto">
            {t('events.pageDescription') || 'أمثلة من الفعاليات التي قمنا بتغطيتها أو تنظيمها'}
          </p>
        </div>
      </section>

      {/* Events Grid */}
      <section className="py-16 bg-white dark:bg-gray-900 transition-colors" aria-labelledby="events-heading">
        <div className="container mx-auto px-4">
          <h2 id="events-heading" className="sr-only">{t('events.title') || 'الفعاليات'}</h2>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {Array.from({ length: 4 }).map((_, i) => (
                <CardSkeleton key={i} />
              ))}
            </div>
          ) : error && events.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-red-500 dark:text-red-400 text-lg mb-4">{error}</p>
              <button
                onClick={fetchEvents}
                className="px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
              >
                إعادة المحاولة
              </button>
            </div>
          ) : events.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-dark-light dark:text-gray-400 text-lg">
                {t('events.noEvents') || 'لا توجد فعاليات متاحة حالياً'}
              </p>
            </div>
          ) : (
            <ScrollReveal animation="fadeIn" stagger={0.1}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8" role="list">
                {events.map((event) => (
                  <article
                    key={event.id}
                    className="bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-lg transition-shadow border border-gray-100 dark:border-gray-700 overflow-hidden"
                    role="listitem"
                  >
                    {event.image ? (
                      <div className="relative aspect-video bg-gray-200 dark:bg-gray-700">
                        <Image
                          src={event.image}
                          alt={event.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 50vw"
                          loading="lazy"
                        />
                      </div>
                    ) : (
                      <div className="aspect-video bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                        <span className="text-gray-400 dark:text-gray-500">
                          {t('events.eventImage') || 'صورة الفعالية'}
                        </span>
                      </div>
                    )}
                    <div className="p-6">
                      <div className="text-sm text-primary-500 dark:text-primary-400 mb-2 font-medium">
                        {formatDate(event.date)}
                        {event.time && ` - ${event.time}`}
                      </div>
                      {event.location && (
                        <div className="text-sm text-dark-light dark:text-gray-400 mb-2">
                          📍 {event.location}
                        </div>
                      )}
                      <h3 className="text-2xl font-bold text-dark dark:text-gray-100 mb-3">
                        {event.title}
                      </h3>
                      {event.description && (
                        <p className="text-dark-light dark:text-gray-300 leading-relaxed">
                          {event.description}
                        </p>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            </ScrollReveal>
          )}
        </div>
      </section>
    </div>
  );
}
