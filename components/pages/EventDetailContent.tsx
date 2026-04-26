'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Clock, ArrowRight, ArrowLeft } from 'lucide-react';
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
    otherEvents?: Event[];
}

export default function EventDetailContent({ event, otherEvents = [] }: EventDetailContentProps) {
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

    const fadeInUp = {
        initial: { opacity: 0, y: 30 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.6, ease: "easeOut" }
    };

    return (
        <div className="min-h-screen bg-white dark:bg-dark-900 transition-colors pt-20">
            {/* Hero Section */}
            <div className="relative h-[60vh] min-h-[500px] w-full overflow-hidden">
                {event.image ? (
                    <motion.div 
                        initial={{ scale: 1.1, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                        className="absolute inset-0"
                    >
                        <Image
                            src={event.image}
                            alt={event.title}
                            fill
                            className="object-cover"
                            priority
                        />
                    </motion.div>
                ) : (
                    <div className="w-full h-full bg-dark-100 dark:bg-dark-800" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/60 to-transparent" />
                
                <div className="absolute inset-0 flex items-end pb-20">
                    <div className="container mx-auto px-4">
                        <motion.div 
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="max-w-4xl space-y-6"
                        >
                            <div className="flex flex-wrap items-center gap-4">
                                <span className="px-4 py-1.5 bg-primary-500 text-white text-xs font-black uppercase tracking-[0.2em] rounded-full shadow-lg shadow-primary-500/30">
                                    {t('events.upcomingEvent') || 'EVENT'}
                                </span>
                                <div className="flex items-center gap-2 text-white/80 font-sans">
                                    <Calendar size={16} className="text-primary-500" />
                                    <span className="text-sm font-bold">{formatDate(event.date)}</span>
                                </div>
                            </div>
                            <h1 className="text-5xl md:text-7xl font-heading font-black text-white leading-tight tracking-tight">
                                {event.title}
                            </h1>
                        </motion.div>
                    </div>
                </div>
                <CornerBrackets className="border-white/20" />
            </div>

            {/* Content Section */}
            <Section id="event-detail-content" spacing="lg" className="relative z-10 -mt-10">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                        {/* Main Content */}
                        <motion.div 
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="lg:col-span-8 space-y-12"
                        >
                            <div className="bg-white dark:bg-dark-800 p-10 md:p-16 rounded-[3rem] shadow-2xl shadow-dark-900/5 border border-dark-100 dark:border-dark-700/50">
                                <div className="prose prose-xl dark:prose-invert max-w-none">
                                    <h2 className="text-4xl font-heading font-bold text-dark-900 dark:text-white mb-10 flex items-center gap-4">
                                        <span className="w-8 h-1 bg-primary-500 rounded-full" />
                                        {t('events.aboutEvent') || 'Event Overview'}
                                    </h2>
                                    <div className="text-2xl text-dark-600 dark:text-dark-300 font-sans leading-relaxed whitespace-pre-wrap">
                                        {event.description || t('events.noDescription')}
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Sidebar */}
                        <motion.div 
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="lg:col-span-4"
                        >
                            <div className="sticky top-32 space-y-8">
                                <div className="bg-dark-50 dark:bg-dark-800/80 backdrop-blur-xl p-10 rounded-[2.5rem] border border-dark-100 dark:border-dark-700 shadow-xl relative overflow-hidden group">
                                    <CornerBrackets showOnHover={true} className="border-primary-500/30" />
                                    <h3 className="text-2xl font-heading font-bold text-dark-900 dark:text-white mb-10">
                                        {t('events.infoTitle') || 'Event Details'}
                                    </h3>

                                    <div className="space-y-8 font-sans">
                                        <div className="flex gap-5 group/item">
                                            <div className="w-14 h-14 bg-white dark:bg-dark-900 rounded-2xl flex items-center justify-center text-primary-500 shadow-xl border border-dark-100 dark:border-dark-700 group-hover/item:bg-primary-500 group-hover/item:text-white transition-all flex-shrink-0">
                                                <Calendar size={24} />
                                            </div>
                                            <div>
                                                <p className="text-xs text-dark-400 uppercase tracking-widest mb-1 font-black">{t('events.date') || 'Date'}</p>
                                                <p className="text-lg font-bold text-dark-900 dark:text-white">{formatDate(event.date)}</p>
                                            </div>
                                        </div>

                                        {event.time && (
                                            <div className="flex gap-5 group/item">
                                                <div className="w-14 h-14 bg-white dark:bg-dark-900 rounded-2xl flex items-center justify-center text-primary-500 shadow-xl border border-dark-100 dark:border-dark-700 group-hover/item:bg-primary-500 group-hover/item:text-white transition-all flex-shrink-0">
                                                    <Clock size={24} />
                                                </div>
                                                <div>
                                                    <p className="text-xs text-dark-400 uppercase tracking-widest mb-1 font-black">{t('events.time') || 'Time'}</p>
                                                    <p className="text-lg font-bold text-dark-900 dark:text-white">{event.time}</p>
                                                </div>
                                            </div>
                                        )}

                                        {event.location && (
                                            <div className="flex gap-5 group/item">
                                                <div className="w-14 h-14 bg-white dark:bg-dark-900 rounded-2xl flex items-center justify-center text-primary-500 shadow-xl border border-dark-100 dark:border-dark-700 group-hover/item:bg-primary-500 group-hover/item:text-white transition-all flex-shrink-0">
                                                    <MapPin size={24} />
                                                </div>
                                                <div>
                                                    <p className="text-xs text-dark-400 uppercase tracking-widest mb-1 font-black">{t('events.location') || 'Location'}</p>
                                                    <p className="text-lg font-bold text-dark-900 dark:text-white">{event.location}</p>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    <div className="mt-12">
                                        <Link href="/contact" className="w-full block">
                                            <Button
                                                variant="recording"
                                                size="xl"
                                                className="w-full justify-center text-lg py-7"
                                                showRecordingDot={true}
                                                showBrackets={true}
                                            >
                                                {t('events.registerInterest') || 'Contact for Details'}
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </Section>

            {/* Other Events */}
            {otherEvents.length > 0 && (
                <Section id="other-events" spacing="lg" className="bg-dark-50 dark:bg-dark-950/50 border-t border-dark-100 dark:border-dark-800">
                    <div className="container mx-auto px-4">
                        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                            <div className="space-y-4">
                                <h2 className="text-4xl md:text-5xl font-heading font-bold text-dark-900 dark:text-white">
                                    {t('events.otherEvents') || 'Other Events'}
                                </h2>
                                <p className="text-xl text-dark-500 max-w-2xl font-sans">
                                    {t('events.otherEventsDesc') || 'Don\'t miss our other upcoming media gatherings and events.'}
                                </p>
                            </div>
                            <Link href="/events" className="text-primary-500 font-heading font-bold hover:underline text-lg flex items-center gap-2">
                                {t('events.viewAll') || 'Explore All Events'} {locale === 'ar' ? <ArrowLeft size={20} /> : <ArrowRight size={20} />}
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                            {otherEvents.map((item, index) => (
                                <motion.div
                                    key={item.slug}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <Link href={`/events/${item.slug}`} className="group block h-full">
                                        <div className="bg-white dark:bg-dark-800 rounded-[2.5rem] overflow-hidden border border-dark-100 dark:border-dark-700 h-full flex flex-col transition-all duration-500 hover:shadow-2xl hover:shadow-primary-500/10 hover:-translate-y-2">
                                            <div className="relative h-56 overflow-hidden">
                                                {item.image ? (
                                                    <Image
                                                        src={item.image}
                                                        alt={item.title}
                                                        fill
                                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full bg-dark-100 dark:bg-dark-700" />
                                                )}
                                                <div className="absolute inset-0 bg-gradient-to-t from-dark-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                                <div className="absolute top-6 left-6">
                                                   <div className="px-3 py-1 bg-white/20 backdrop-blur-md border border-white/30 text-white text-[10px] font-bold rounded-full">
                                                        {formatDate(item.date)}
                                                   </div>
                                                </div>
                                            </div>
                                            <div className="p-10 flex flex-col flex-grow">
                                                <h3 className="text-2xl font-heading font-bold text-dark-900 dark:text-white mb-4 group-hover:text-primary-500 transition-colors">
                                                    {item.title}
                                                </h3>
                                                <p className="text-dark-500 dark:text-dark-400 font-sans line-clamp-2 mb-8 text-lg">
                                                    {item.description}
                                                </p>
                                                <div className="mt-auto flex items-center text-primary-500 font-heading font-bold text-sm uppercase tracking-widest">
                                                    {t('common.viewDetails') || 'View Details'}
                                                    <span className="ms-3 transform transition-transform group-hover:translate-x-2">
                                                        {locale === 'ar' ? <ArrowLeft size={16} /> : <ArrowRight size={16} />}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </Section>
            )}

            {/* Back Link */}
            <div className="container mx-auto px-4 pb-20 mt-12">
                <div className="h-px w-full bg-dark-100 dark:bg-dark-800 mb-12" />
                <Link
                    href="/events"
                    className="inline-flex items-center gap-3 text-dark-500 hover:text-primary-500 font-heading font-bold transition-all group text-lg"
                >
                    <span className="w-10 h-10 rounded-full border border-dark-200 dark:border-dark-700 flex items-center justify-center group-hover:border-primary-500 group-hover:bg-primary-500 group-hover:text-white transition-all">
                        {locale === 'ar' ? <ArrowRight size={20} /> : <ArrowLeft size={20} />}
                    </span>
                    <span>{t('events.backToEvents') || 'Back to All Events'}</span>
                </Link>
            </div>
        </div>
    );
}
