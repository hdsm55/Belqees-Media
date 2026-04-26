'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Calendar, MapPin, Clock } from 'lucide-react';
import Section from '@/components/atoms/Section';
import CornerBrackets from '@/components/atoms/CornerBrackets';
import Button from '@/components/atoms/Button';
import { useTranslation } from '@/hooks/useTranslation';

interface Event {
    id: string;
    slug: string;
    title: string;
    description: string | null;
    date: string | Date;
    time: string | null;
    location: string | null;
    image: string | null;
}

interface EventDetailContentProps {
    event: Event;
}

export default function EventDetailContent({ event }: EventDetailContentProps) {
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

    return (
        <div className="min-h-screen bg-white dark:bg-dark-900 transition-colors pt-20">
            {/* Header Section */}
            <Section id="event-detail-header" spacing="md" className="bg-dark-50 dark:bg-dark-950 border-b border-dark-100 dark:border-dark-800">
                <div className="max-w-4xl mx-auto">
                    <Link
                        href="/events"
                        className="inline-flex items-center gap-2 text-primary-500 font-heading font-bold mb-8 group"
                    >
                        <span className="transform group-hover:-translate-x-1 rtl:group-hover:translate-x-1 transition-transform">
                            {locale === 'ar' ? '→' : '←'}
                        </span>
                        <span>{t('events.backToEvents') || 'العودة للفعاليات'}</span>
                    </Link>

                    <div className="space-y-6">
                        <div className="flex flex-wrap items-center gap-4 text-sm font-sans text-dark-500 dark:text-dark-400">
                            <div className="flex items-center gap-2 px-3 py-1 bg-white dark:bg-dark-800 border border-dark-200 dark:border-dark-700 rounded-full">
                                <Calendar size={14} className="text-primary-500" />
                                <span>{formatDate(event.date)}</span>
                            </div>
                            {event.time && (
                                <div className="flex items-center gap-2 px-3 py-1 bg-white dark:bg-dark-800 border border-dark-200 dark:border-dark-700 rounded-full">
                                    <Clock size={14} className="text-primary-500" />
                                    <span>{event.time}</span>
                                </div>
                            )}
                            {event.location && (
                                <div className="flex items-center gap-2 px-3 py-1 bg-white dark:bg-dark-800 border border-dark-200 dark:border-dark-700 rounded-full">
                                    <MapPin size={14} className="text-primary-500" />
                                    <span>{event.location}</span>
                                </div>
                            )}
                        </div>
                        <h1 className="text-4xl md:text-6xl font-heading font-bold text-dark-900 dark:text-white leading-tight tracking-tight">
                            {event.title}
                        </h1>
                    </div>
                </div>
            </Section>

            {/* Content Section */}
            <Section id="event-detail-content" spacing="md">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                        {/* Main Content */}
                        <div className="lg:col-span-8 space-y-12">
                            {/* Main Image */}
                            {event.image && (
                                <div className="relative aspect-video bg-dark-100 dark:bg-dark-800 shadow-2xl overflow-hidden group">
                                    <Image
                                        src={event.image}
                                        alt={event.title}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                        priority
                                    />
                                    <CornerBrackets showOnHover={false} className="border-white" />
                                </div>
                            )}

                            {/* Description */}
                            <div className="space-y-6">
                                <h2 className="text-3xl font-heading font-bold text-dark-900 dark:text-white">
                                    {t('events.aboutEvent') || 'عن الفعالية'}
                                </h2>
                                <div className="prose prose-lg dark:prose-invert max-w-none text-dark-600 dark:text-dark-300 font-sans leading-relaxed whitespace-pre-wrap">
                                    {event.description || t('events.noDescription')}
                                </div>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="lg:col-span-4">
                            <div className="sticky top-28 bg-white dark:bg-dark-800 p-8 border border-dark-200 dark:border-dark-700 shadow-xl group">
                                <CornerBrackets showOnHover={true} />
                                <h3 className="text-xl font-heading font-bold text-dark-900 dark:text-white mb-8">
                                    {t('events.infoTitle') || 'تفاصيل الفعالية'}
                                </h3>

                                <div className="space-y-6 font-sans">
                                    <div className="flex gap-4">
                                        <div className="w-12 h-12 bg-dark-50 dark:bg-dark-900 rounded-xl flex items-center justify-center text-primary-500 shadow-inner flex-shrink-0">
                                            <Calendar size={20} />
                                        </div>
                                        <div>
                                            <p className="text-xs text-dark-400 uppercase tracking-widest mb-1">{t('events.date') || 'التاريخ'}</p>
                                            <p className="text-base font-bold text-dark-900 dark:text-white">{formatDate(event.date)}</p>
                                        </div>
                                    </div>

                                    {event.time && (
                                        <div className="flex gap-4">
                                            <div className="w-12 h-12 bg-dark-50 dark:bg-dark-900 rounded-xl flex items-center justify-center text-primary-500 shadow-inner flex-shrink-0">
                                                <Clock size={20} />
                                            </div>
                                            <div>
                                                <p className="text-xs text-dark-400 uppercase tracking-widest mb-1">{t('events.time') || 'الوقت'}</p>
                                                <p className="text-base font-bold text-dark-900 dark:text-white">{event.time}</p>
                                            </div>
                                        </div>
                                    )}

                                    {event.location && (
                                        <div className="flex gap-4">
                                            <div className="w-12 h-12 bg-dark-50 dark:bg-dark-900 rounded-xl flex items-center justify-center text-primary-500 shadow-inner flex-shrink-0">
                                                <MapPin size={20} />
                                            </div>
                                            <div>
                                                <p className="text-xs text-dark-400 uppercase tracking-widest mb-1">{t('events.location') || 'الموقع'}</p>
                                                <p className="text-base font-bold text-dark-900 dark:text-white">{event.location}</p>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="mt-10">
                                    <Link href="/contact" className="w-full block">
                                        <Button
                                            variant="recording"
                                            className="w-full justify-center"
                                            showRecordingDot={true}
                                            showBrackets={true}
                                        >
                                            {t('nav.contact') || 'تواصل معنا'}
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Section>
        </div>
    );
}
