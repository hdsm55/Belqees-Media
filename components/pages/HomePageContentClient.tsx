'use client';

import HeroBlock from '@/components/blocks/HeroBlock';
import Link from 'next/link';
import ScrollReveal from '@/components/animations/ScrollReveal';
import ServiceCard from '@/components/blocks/ServiceCard';
import {
  AdvertisingIcon,
  CorporateContentIcon,
  DocumentariesIcon,
  MicroproductionsIcon,
} from '@/components/icons/CustomIcons';
import StatsSection from '@/components/blocks/StatsSection';
import EventsGrid from '@/components/blocks/EventsGrid';
import ApproachSection from '@/components/blocks/ApproachSection';
import ClientsCarousel from '@/components/blocks/ClientsCarousel';
import Button from '@/components/atoms/Button';
import CornerBrackets from '@/components/atoms/CornerBrackets';
import { useTranslation } from '@/hooks/useTranslation';

interface EventItem {
  id: string;
  slug: string;
  title: string;
  date: Date | string;
  time?: string | null;
  location?: string | null;
  image: string | null;
}

interface HomePageContentClientProps {
  events: EventItem[];
}

export default function HomePageContentClient({ events }: HomePageContentClientProps) {
  const { t } = useTranslation();

  return (
    <>
      {/* Hero Section */}
      <HeroBlock
        title={t('hero.title')}
        subtitle={t('hero.subtitle')}
        ctaText={t('hero.cta')}
        ctaLink="/contact"
        backgroundVideo="/videos/hero-video.mp4"
        backgroundImage="/images-optimized/approach.jpg"
        videoLoop={true}
        videoMuted={true}
      />

      {/* Stats Section */}
      <StatsSection
        stats={[
          { number: '9', suffix: '+', label: t('stats.years') },
          { number: '500', suffix: '+', label: t('stats.projects') },
          { number: '100', suffix: '+', label: t('stats.clients') },
          { number: '50', suffix: '+', label: t('stats.events') },
        ]}
      />

      {/* Services Section */}
      <ScrollReveal animation="fadeInUp">
        <section className="py-16 md:py-20 bg-white dark:bg-gray-900 transition-colors" aria-labelledby="services-heading">
          <div className="container mx-auto px-4">
            <div className="text-center mb-10 md:mb-12">
              <h2 id="services-heading" className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-dark dark:text-gray-100 mb-3 md:mb-4 tracking-tight">
                {t('services.title')}
              </h2>
              <p className="text-sm sm:text-base md:text-lg font-sans text-dark-light dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                {t('services.description')}
              </p>
            </div>
            <ScrollReveal animation="fadeIn" stagger={0.1}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" role="list">
                <div role="listitem">
                  <ServiceCard
                    title={t('services.advertising.title')}
                    description={t('services.advertising.description')}
                    icon={
                      <AdvertisingIcon
                        className="w-full h-full"
                        stroke="currentColor"
                        redDotColor="#FC473C"
                        aria-hidden="true"
                      />
                    }
                  />
                </div>
                <div role="listitem">
                  <ServiceCard
                    title={t('services.corporate.title')}
                    description={t('services.corporate.description')}
                    icon={
                      <CorporateContentIcon
                        className="w-full h-full"
                        fill="currentColor"
                        redDotColor="#FC473C"
                        aria-hidden="true"
                      />
                    }
                  />
                </div>
                <div role="listitem">
                  <ServiceCard
                    title={t('services.documentaries.title')}
                    description={t('services.documentaries.description')}
                    icon={
                      <DocumentariesIcon
                        className="w-full h-full"
                        stroke="currentColor"
                        redDotColor="#FC473C"
                        aria-hidden="true"
                      />
                    }
                  />
                </div>
                <div role="listitem">
                  <ServiceCard
                    title={t('services.microproductions.title')}
                    description={t('services.microproductions.description')}
                    icon={
                      <MicroproductionsIcon
                        className="w-full h-full"
                        stroke="currentColor"
                        redDotColor="#FC473C"
                        aria-hidden="true"
                      />
                    }
                  />
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </ScrollReveal>

      {/* Approach Section */}
      <ApproachSection
        title={t('approach.title')}
        description={t('approach.description')}
        image="/images-optimized/approach.jpg"
        linkText={t('approach.linkText')}
        linkHref="/about"
      />

      {/* Clients Section */}
      <ClientsCarousel
        clients={[
          { id: '1', name: t('clients.partner1'), logo: '/images-optimized/partner-1.png' },
          { id: '2', name: t('clients.partner2'), logo: '/images-optimized/partner-2.png' },
          { id: '3', name: t('clients.partner3'), logo: '/images-optimized/partner-3.png' },
          { id: '4', name: t('clients.partner4'), logo: '/images-optimized/partner-4.png' },
          { id: '5', name: t('clients.partner5'), logo: '/images-optimized/partner-5.png' },
          { id: '6', name: t('clients.partner6'), logo: '/images-optimized/partner-6.png' },
        ]}
        title={t('clients.title')}
      />

      {/* Events Section */}
      <EventsGrid
        title={t('events.title') || 'الفعاليات'}
        items={events.map((item) => ({
          id: item.id,
          title: item.title,
          date: item.date,
          time: item.time,
          location: item.location,
          image: item.image,
          slug: item.slug,
        }))}
        showViewAll={true}
        viewAllLink="/events"
      />

      {/* Contact CTA Section */}
      <ScrollReveal animation="fadeInUp">
        <section className="py-16 md:py-20 bg-gray-50 dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 transition-colors" aria-labelledby="contact-heading">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
                <div className="relative bg-white dark:bg-gray-800 p-8 border border-gray-200 dark:border-gray-700 group">
                  <CornerBrackets showOnHover={true} />
                  <h2 id="contact-heading" className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 md:mb-6 text-dark dark:text-gray-100">
                    {t('contact.title')}
                  </h2>
                  <p className="text-sm sm:text-base md:text-lg text-dark-light dark:text-gray-300 mb-6 md:mb-8 leading-relaxed">
                    {t('contact.description')}
                  </p>
                  <Link href="/contact">
                    <Button
                      variant="simple"
                      size="lg"
                      showRecordingDot={true}
                      showBrackets={true}
                    >
                      {t('contact.cta')}
                    </Button>
                  </Link>
                </div>
                <div className="space-y-4">
                  <div className="relative bg-white dark:bg-gray-800 p-6 border border-gray-200 dark:border-gray-700 group">
                    <CornerBrackets showOnHover={true} />
                    <h3 className="text-base md:text-lg font-semibold text-dark dark:text-gray-100 mb-2">
                      {t('contact.email')}
                    </h3>
                    <a
                      href="mailto:Contact@belqeesmedia.com"
                      className="text-sm md:text-base text-dark-light dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded"
                      aria-label="إرسال بريد إلكتروني إلى Contact@belqeesmedia.com"
                    >
                      Contact@belqeesmedia.com
                    </a>
                  </div>
                  <div className="relative bg-white dark:bg-gray-800 p-6 border border-gray-200 dark:border-gray-700 group">
                    <CornerBrackets showOnHover={true} />
                    <h3 className="text-base md:text-lg font-semibold text-dark dark:text-gray-100 mb-2">
                      {t('contact.phone')}
                    </h3>
                    <div className="space-y-1">
                      <a
                        href="tel:+902124122060"
                        className="block text-sm md:text-base text-dark-light dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded"
                        aria-label="اتصال برقم +90 (212) 412 20 60"
                      >
                        +90 (212) 412 20 60
                      </a>
                      <a
                        href="tel:+908508113366"
                        className="block text-sm md:text-base text-dark-light dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded"
                        aria-label="اتصال برقم +90 (850) 811 33 66"
                      >
                        +90 (850) 811 33 66
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>
    </>
  );
}

