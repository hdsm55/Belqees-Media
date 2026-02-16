'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Calendar, MapPin, Clock, ArrowRight } from 'lucide-react';
import ScrollReveal from '@/components/animations/ScrollReveal';
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
            return new Intl.DateTimeFormat(localeMap[locale] || 'ar-SA', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            }).format(dateObj);
        } catch {
            return typeof date === 'string' ? date : date.toISOString();
        }
    };

    return (
        <div className="min-h-screen bg-white dark:bg-gray-900 pt-20 md:pt-24 pb-16">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto">
                    {/* Breadcrumbs / Back Link */}
                    <div className="mb-8">
                        <Link
                            href="/events"
                            className="inline-flex items-center gap-2 text-primary-500 hover:text-primary-600 transition-colors group"
                        >
                            <ArrowRight size={18} className="rotate-180 group-hover:-translate-x-1 transition-transform" />
                            <span>{t('events.backToEvents')}</span>
                        </Link>
                    </div>

                    <ScrollReveal animation="fadeIn">
                        {/* Hero Header */}
                        <div className="space-y-6 mb-12">
                            <div className="space-y-4">
                                <div className="flex flex-wrap gap-4 text-sm font-medium text-primary-500 dark:text-primary-400">
                                    <div className="flex items-center gap-1.5">
                                        <Calendar size={16} />
                                        {formatDate(event.date)}
                                    </div>
                                    {event.time && (
                                        <div className="flex items-center gap-1.5">
                                            <Clock size={16} />
                                            {event.time}
                                        </div>
                                    )}
                                    {event.location && (
                                        <div className="flex items-center gap-1.5">
                                            <MapPin size={16} />
                                            {event.location}
                                        </div>
                                    )}
                                </div>
                                <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-dark dark:text-gray-100 leading-tight">
                                    {event.title}
                                </h1>
                            </div>

                            {/* Main Image */}
                            {event.image && (
                                <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden shadow-xl border border-gray-100 dark:border-gray-800">
                                    <Image
                                        src={event.image}
                                        alt={event.title}
                                        fill
                                        className="object-cover"
                                        priority
                                        sizes="100vw"
                                    />
                                </div>
                            )}
                        </div>

                        {/* Event Content */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                            {/* Description */}
                            <div className="lg:col-span-2 space-y-8">
                                <section>
                                    <h2 className="text-2xl font-bold text-dark dark:text-gray-100 mb-6 font-heading">{t('events.aboutEvent')}</h2>
                                    <div className="prose prose-lg dark:prose-invert max-w-none text-dark-light dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
                                        {event.description || t('events.noDescription')}
                                    </div>
                                </section>
                            </div>

                            {/* Sidebar / Info Card */}
                            <div className="space-y-6">
                                <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-2xl border border-gray-100 dark:border-gray-700/50 sticky top-28">
                                    <h3 className="font-bold text-dark dark:text-gray-100 mb-6 text-lg">{t('events.infoTitle')}</h3>

                                    <ul className="space-y-4">
                                        <li className="flex gap-3">
                                            <div className="w-10 h-10 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center text-primary-500 shadow-sm flex-shrink-0">
                                                <Calendar size={18} />
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-500 dark:text-gray-400">{t('events.date')}</p>
                                                <p className="text-sm font-bold text-dark dark:text-gray-100">{formatDate(event.date)}</p>
                                            </div>
                                        </li>
                                        {event.time && (
                                            <li className="flex gap-3">
                                                <div className="w-10 h-10 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center text-primary-500 shadow-sm flex-shrink-0">
                                                    <Clock size={18} />
                                                </div>
                                                <div>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400">{t('events.time')}</p>
                                                    <p className="text-sm font-bold text-dark dark:text-gray-100">{event.time}</p>
                                                </div>
                                            </li>
                                        )}
                                        {event.location && (
                                            <li className="flex gap-3">
                                                <div className="w-10 h-10 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center text-primary-500 shadow-sm flex-shrink-0">
                                                    <MapPin size={18} />
                                                </div>
                                                <div>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400">{t('events.location')}</p>
                                                    <p className="text-sm font-bold text-dark dark:text-gray-100">{event.location}</p>
                                                </div>
                                            </li>
                                        )}
                                    </ul>

                                    <div className="mt-8">
                                        <Link href="/contact" className="w-full">
                                            <Button
                                                variant="simple"
                                                className="w-full justify-center"
                                                showRecordingDot={true}
                                                showBrackets={true}
                                            >
                                                {t('nav.contact')} {t('events.contactInquiry')}
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </div>
        </div>
    );
}
