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

export default function ServicesPageClient() {
  const { t } = useTranslation();

  const services = [
    {
      id: 'media-production',
      slug: 'media-production',
      title: t('services.mediaProduction') || 'الإنتاج الإعلامي',
      description: t('services.advertising.description'),
      image: '/images-optimized/service-production.jpg',
    },
    {
      id: 'live-events',
      slug: 'live-events',
      title: t('services.liveEvents.title'),
      description: t('services.liveEvents.description'),
      image: '/images-optimized/service-events.jpg',
    },
    {
      id: 'live-streaming',
      slug: 'live-streaming',
      title: t('services.liveStreaming.title') || 'البث المباشر',
      description: t('services.liveStreaming.description') || 'بث مباشر احترافي للفعاليات والمؤتمرات بأحدث التقنيات.',
      image: '/images-optimized/service-streaming.jpg',
    },
    {
      id: 'training',
      slug: 'training',
      title: t('services.training.title'),
      description: t('services.training.description'),
      image: '/images-optimized/service-training.jpg',
    },
    {
      id: 'technical-consultancy',
      slug: 'technical-consultancy',
      title: t('services.technicalConsultancy.title'),
      description: t('services.technicalConsultancy.description'),
      image: '/images-optimized/service-consultancy.jpg',
    },
    {
      id: 'studio-design',
      slug: 'studio-design',
      title: t('services.studioDesign.title'),
      description: t('services.studioDesign.description'),
      image: '/images-optimized/service-studio.jpg',
    }
  ];

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
                icon={getServiceIcon(service.slug)}
                image={service.image}
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
