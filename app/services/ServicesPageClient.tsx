'use client';

import Link from 'next/link';
import ServiceCard from '@/components/blocks/ServiceCard';
import ScrollReveal from '@/components/animations/ScrollReveal';
import { useTranslation } from '@/hooks/useTranslation';
import {
  MediaProductionIcon,
  LiveEventsIcon,
  LiveBroadcastIcon,
  TrainingIcon,
  InnovativeEfficiencyIcon,
  StudioDesignIcon,
} from '@/components/icons/CustomIcons';

interface Service {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  icon: string | null;
  image: string | null;
  published: boolean;
}

interface ServicesPageClientProps {
  services: Service[];
}

export default function ServicesPageClient({
  services,
}: ServicesPageClientProps) {
  const { t } = useTranslation();

  // Helper function to get icon component for a service
  const getServiceIcon = (slug: string) => {
    const iconProps = {
      className: 'w-full h-full',
      stroke: 'currentColor' as const,
      redDotColor: '#FC473C',
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

  if (services.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 dark:text-gray-400 text-lg mb-4">
          {t('services.noServices')}
        </p>
        <p className="text-sm text-gray-400 dark:text-gray-500">
          {t('common.tryAgainLater')}
        </p>
      </div>
    );
  }

  return (
    <>
      <ScrollReveal animation="fadeIn" stagger={0.1}>
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          role="list"
        >
          {services.map(service => (
            <div key={service.id} role="listitem">
              <ServiceCard
                title={service.title}
                description={service.description || ''}
                icon={
                  service.slug
                    ? getServiceIcon(service.slug)
                    : service.icon || undefined
                }
                image={service.image || undefined}
                slug={service.slug}
              />
            </div>
          ))}
        </div>
      </ScrollReveal>

      {/* CTA Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800 transition-colors mt-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-dark dark:text-gray-100 mb-4">
            {t('services.cta.title')}
          </h2>
          <p className="text-lg text-dark-light dark:text-gray-300 mb-8">
            {t('services.cta.description')}
          </p>
          <Link href="/contact">
            <button className="px-8 py-3 bg-primary-500 text-white font-semibold rounded-lg hover:bg-primary-600 dark:hover:bg-primary-700 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2">
              {t('services.cta.button')}
            </button>
          </Link>
        </div>
      </section>
    </>
  );
}
