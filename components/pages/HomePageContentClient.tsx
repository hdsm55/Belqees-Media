'use client';

import HeroBlock from '@/components/blocks/HeroBlock';
import Link from 'next/link';
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
import Section from '@/components/atoms/Section';
import { useTranslation } from '@/hooks/useTranslation';
import { clients, stats } from '@/data/home';

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

export default function HomePageContentClient({
  events,
}: HomePageContentClientProps) {
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
        videoLoop={true}
        videoMuted={true}
      />

      {/* Stats Section */}
      <StatsSection stats={stats(t)} />

      {/* Services Section */}
      <Section
        id="services"
        title={t('services.title')}
        subtitle={t('services.description')}
        centered
        spacing="md"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          <ServiceCard
            title={t('services.advertising.title')}
            description={t('services.advertising.description')}
            icon={
              <AdvertisingIcon
                className="w-full h-full"
                stroke="currentColor"
                redDotColor="var(--color-primary)"
                aria-hidden="true"
              />
            }
          />
          <ServiceCard
            title={t('services.corporate.title')}
            description={t('services.corporate.description')}
            icon={
              <CorporateContentIcon
                className="w-full h-full"
                fill="currentColor"
                redDotColor="var(--color-primary)"
                aria-hidden="true"
              />
            }
          />
          <ServiceCard
            title={t('services.documentaries.title')}
            description={t('services.documentaries.description')}
            icon={
              <DocumentariesIcon
                className="w-full h-full"
                stroke="currentColor"
                redDotColor="var(--color-primary)"
                aria-hidden="true"
              />
            }
          />
          <ServiceCard
            title={t('services.microproductions.title')}
            description={t('services.microproductions.description')}
            icon={
              <MicroproductionsIcon
                className="w-full h-full"
                stroke="currentColor"
                redDotColor="var(--color-primary)"
                aria-hidden="true"
              />
            }
          />
        </div>
      </Section>

      {/* Approach Section */}
      <ApproachSection
        title={t('approach.title')}
        description={t('approach.description')}
        image="/images-optimized/approach.jpg"
        linkText={t('approach.linkText')}
        linkHref="/about"
      />

      {/* Clients Section */}
      <ClientsCarousel clients={clients} title={t('clients.title')} />

      {/* Events Section */}
      <EventsGrid
        title={t('events.title') || 'الفعاليات'}
        items={events.map(item => ({
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
      <Section
        id="contact-cta"
        spacing="lg"
        className="bg-dark-50 dark:bg-dark-950"
      >
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-stretch">
            <div className="lg:col-span-3 relative bg-white dark:bg-dark-800 p-8 md:p-12 border border-dark-200 dark:border-dark-700 shadow-2xl group flex flex-col justify-center">
              <CornerBrackets showOnHover={false} />
              <h2 className="text-3xl md:text-5xl font-heading font-bold mb-6 text-dark-900 dark:text-white leading-tight">
                {t('contact.title')}
              </h2>
              <p className="text-lg text-dark-500 dark:text-dark-300 mb-10 leading-relaxed max-w-2xl">
                {t('contact.description')}
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/contact">
                  <Button
                    variant="recording"
                    size="lg"
                    showRecordingDot={true}
                    showBrackets={true}
                  >
                    {t('contact.cta')}
                  </Button>
                </Link>
                <Link href="/services">
                  <Button
                    variant="outline"
                    size="lg"
                  >
                    {t('common.viewServices') || 'خدماتنا'}
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="lg:col-span-2 grid grid-cols-1 gap-6">
              <div className="relative bg-white dark:bg-dark-800 p-8 border border-dark-200 dark:border-dark-700 shadow-lg group hover:border-primary-500 transition-colors">
                <CornerBrackets showOnHover={true} />
                <h3 className="text-xl font-heading font-bold text-dark-900 dark:text-white mb-4 flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-primary-500"></span>
                  {t('contact.email')}
                </h3>
                <a
                  href="mailto:Contact@belqeesmedia.com"
                  className="text-lg text-dark-500 dark:text-dark-400 hover:text-primary-500 transition-colors block font-sans"
                >
                  Contact@belqeesmedia.com
                </a>
              </div>
              
              <div className="relative bg-white dark:bg-dark-800 p-8 border border-dark-200 dark:border-dark-700 shadow-lg group hover:border-primary-500 transition-colors">
                <CornerBrackets showOnHover={true} />
                <h3 className="text-xl font-heading font-bold text-dark-900 dark:text-white mb-4 flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-primary-500"></span>
                  {t('contact.phone')}
                </h3>
                <div className="space-y-3 font-sans">
                  <a
                    href="tel:+902124122060"
                    className="block text-lg text-dark-500 dark:text-dark-400 hover:text-primary-500 transition-colors"
                  >
                    +90 (212) 412 20 60
                  </a>
                  <a
                    href="tel:+908508113366"
                    className="block text-lg text-dark-500 dark:text-dark-400 hover:text-primary-500 transition-colors"
                  >
                    +90 (850) 811 33 66
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
