'use client';

import Link from 'next/link';
import ServiceCard from '@/components/blocks/ServiceCard';
import Section from '@/components/atoms/Section';
import { useTranslation } from '@/hooks/useTranslation';
import Button from '@/components/atoms/Button';
import {
  MediaProductionIcon,
  LiveEventsIcon,
  LiveBroadcastIcon,
  TrainingIcon,
  InnovativeEfficiencyIcon,
  StudioDesignIcon,
} from '@/components/icons/CustomIcons';
import { servicesData } from '@/data/services';

export default function ServicesPageClient() {
  const { t } = useTranslation();
  const services = servicesData(t);

  const getServiceIcon = (slug: string) => {
    const iconProps = {
      className: 'w-full h-full',
      stroke: 'currentColor' as const,
      redDotColor: 'var(--color-primary)',
      'aria-hidden': true as const,
    };

    switch (slug) {
      case 'media-production':
        return <MediaProductionIcon {...iconProps} />;
      case 'live-events':
        return <LiveEventsIcon {...iconProps} fill="currentColor" />;
      case 'live-streaming':
        return <LiveBroadcastIcon {...iconProps} />;
      case 'training':
        return <TrainingIcon {...iconProps} fill="currentColor" />;
      case 'technical-consultancy':
        return <InnovativeEfficiencyIcon {...iconProps} />;
      case 'studio-design':
        return <StudioDesignIcon {...iconProps} />;
      default:
        return null;
    }
  };

  return (
    <>
      <Section id="services-grid" spacing="md">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {services.map(service => (
            <div key={service.id}>
              <ServiceCard
                title={service.title}
                description={service.description || ''}
                icon={getServiceIcon(service.slug)}
                image={service.image}
                slug={service.slug}
              />
            </div>
          ))}
        </div>
      </Section>

      {/* CTA Section */}
      <Section id="services-cta" spacing="md" className="bg-dark-50 dark:bg-dark-950 border-y border-dark-100 dark:border-dark-800">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-dark-900 dark:text-white mb-6">
            {t('services.cta.title')}
          </h2>
          <p className="text-xl text-dark-600 dark:text-dark-300 mb-10 max-w-2xl mx-auto font-sans leading-relaxed">
            {t('services.cta.description')}
          </p>
          <div className="flex justify-center">
            <Link href="/contact">
              <Button
                variant="recording"
                size="lg"
                showRecordingDot={true}
                showBrackets={true}
                className="px-12"
              >
                {t('services.cta.button')}
              </Button>
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
