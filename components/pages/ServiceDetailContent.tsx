'use client';

import Link from 'next/link';
import Image from 'next/image';
import Section from '@/components/atoms/Section';
import CornerBrackets from '@/components/atoms/CornerBrackets';
import Button from '@/components/atoms/Button';
import { useTranslation } from '@/hooks/useTranslation';
import {
  MediaProductionIcon,
  LiveEventsIcon,
  LiveBroadcastIcon,
  TrainingIcon,
  InnovativeEfficiencyIcon,
  StudioDesignIcon,
} from '@/components/icons/CustomIcons';

interface ServiceDetailContentProps {
  service: any;
}

export default function ServiceDetailContent({ service }: ServiceDetailContentProps) {
  const { t, locale } = useTranslation();

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
    <div className="min-h-screen bg-white dark:bg-dark-900 transition-colors pt-20">
      {/* Hero Section */}
      <div className="relative h-[60vh] min-h-[400px] w-full overflow-hidden">
        {service.image ? (
          <Image
            src={service.image}
            alt={service.title}
            fill
            className="object-cover"
            priority
          />
        ) : (
          <div className="w-full h-full bg-dark-100 dark:bg-dark-800" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/40 to-transparent" />
        
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 text-primary-500 bg-white/10 backdrop-blur-md p-3 rounded-2xl">
                  {getServiceIcon(service.slug)}
                </div>
                <span className="text-white/80 font-heading font-bold tracking-widest uppercase text-sm">
                  {t('services.serviceDetail') || 'تفاصيل الخدمة'}
                </span>
              </div>
              <h1 className="text-5xl md:text-7xl font-heading font-bold text-white leading-tight">
                {service.title}
              </h1>
            </div>
          </div>
        </div>
        <CornerBrackets className="border-white/30" />
      </div>

      {/* Content Section */}
      <Section id="service-content" spacing="md">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-8">
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <h2 className="text-3xl font-heading font-bold text-dark-900 dark:text-white mb-6">
                {t('services.aboutService') || 'عن هذه الخدمة'}
              </h2>
              <p className="text-xl text-dark-600 dark:text-dark-300 font-sans leading-relaxed">
                {service.description}
              </p>
              {service.content && (
                 <div className="mt-8 font-sans text-dark-600 dark:text-dark-300" 
                      dangerouslySetInnerHTML={{ __html: service.content }} />
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <div className="bg-dark-50 dark:bg-dark-800/50 p-8 rounded-4xl border border-dark-100 dark:border-dark-700">
              <h3 className="text-2xl font-heading font-bold text-dark-900 dark:text-white mb-6">
                {t('services.whyChooseUs') || 'لماذا تختار بلقيس؟'}
              </h3>
              <ul className="space-y-4 font-sans text-dark-600 dark:text-dark-300">
                <li className="flex items-start gap-3">
                  <span className="text-primary-500 mt-1">✓</span>
                  <span>{t('services.feature1') || 'خبرة ممتدة في الإنتاج الإعلامي'}</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary-500 mt-1">✓</span>
                  <span>{t('services.feature2') || 'أحدث المعدات والتقنيات العالمية'}</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary-500 mt-1">✓</span>
                  <span>{t('services.feature3') || 'فريق متخصص ومبدع'}</span>
                </li>
              </ul>
            </div>

            <Link href="/contact" className="block">
              <Button
                variant="recording"
                size="lg"
                className="w-full"
                showBrackets={true}
                showRecordingDot={true}
              >
                {t('services.requestService') || 'اطلب الخدمة الآن'}
              </Button>
            </Link>
          </div>
        </div>
      </Section>

      {/* Back Link */}
      <div className="container mx-auto px-4 pb-20">
        <Link
          href="/services"
          className="inline-flex items-center gap-2 text-dark-500 hover:text-primary-500 font-heading font-bold transition-colors group"
        >
          <span className="transform group-hover:-translate-x-1 rtl:group-hover:translate-x-1 transition-transform">
            {locale === 'ar' ? '→' : '←'}
          </span>
          <span>{t('services.backToServices') || 'العودة لجميع الخدمات'}</span>
        </Link>
      </div>
    </div>
  );
}
