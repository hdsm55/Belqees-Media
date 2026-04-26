'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
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
  otherServices?: any[];
}

export default function ServiceDetailContent({ service, otherServices = [] }: ServiceDetailContentProps) {
  const { t, locale } = useTranslation();

  const getServiceIcon = (slug: string, className = 'w-full h-full') => {
    const iconProps = {
      className,
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

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  };

  const stagger = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-dark-900 transition-colors pt-20">
      {/* Hero Section */}
      <div className="relative h-[70vh] min-h-[500px] w-full overflow-hidden">
        {service.image ? (
          <motion.div 
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="absolute inset-0"
          >
            <Image
              src={service.image}
              alt={service.title}
              fill
              className="object-cover"
              priority
            />
          </motion.div>
        ) : (
          <div className="w-full h-full bg-dark-100 dark:bg-dark-800" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/60 to-transparent" />
        
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-4">
            <motion.div 
              variants={stagger}
              initial="initial"
              animate="animate"
              className="max-w-4xl space-y-8"
            >
              <motion.div variants={fadeInUp} className="flex items-center gap-4">
                <div className="w-20 h-20 text-primary-500 bg-white/10 backdrop-blur-xl p-4 rounded-3xl border border-white/20 shadow-2xl">
                  {getServiceIcon(service.slug)}
                </div>
                <div className="flex flex-col">
                  <span className="text-primary-500 font-heading font-bold tracking-[0.2em] uppercase text-xs mb-1">
                    {t('services.serviceDetail') || 'SERVICE DETAILS'}
                  </span>
                  <div className="h-px w-12 bg-primary-500/50" />
                </div>
              </motion.div>
              <motion.h1 
                variants={fadeInUp}
                className="text-6xl md:text-8xl font-heading font-black text-white leading-[1.1] tracking-tight"
              >
                {service.title}
              </motion.h1>
            </motion.div>
          </div>
        </div>
        <CornerBrackets className="border-white/20" />
      </div>

      {/* Content Section */}
      <Section id="service-content" spacing="lg" className="relative z-10 -mt-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
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
                  {t('services.aboutService') || 'About Service'}
                </h2>
                <p className="text-2xl text-dark-600 dark:text-dark-300 font-sans leading-relaxed mb-12">
                  {service.description}
                </p>
                {service.content && (
                   <div className="mt-12 font-sans text-dark-600 dark:text-dark-300 leading-loose" 
                        dangerouslySetInnerHTML={{ __html: service.content }} />
                )}
              </div>
            </div>
          </motion.div>

          {/* Sidebar */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-4 space-y-8"
          >
            <div className="sticky top-32 space-y-8">
              <div className="bg-dark-50 dark:bg-dark-800/80 backdrop-blur-xl p-10 rounded-[2.5rem] border border-dark-100 dark:border-dark-700 shadow-xl">
                <h3 className="text-2xl font-heading font-bold text-dark-900 dark:text-white mb-8">
                  {t('services.whyChooseUs') || 'Why Choose Us?'}
                </h3>
                <ul className="space-y-6 font-sans text-lg text-dark-600 dark:text-dark-300">
                  <li className="flex items-start gap-4 group">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary-500/10 text-primary-500 flex items-center justify-center group-hover:bg-primary-500 group-hover:text-white transition-colors mt-1">✓</span>
                    <span>{t('services.feature1') || 'Expertise in media production'}</span>
                  </li>
                  <li className="flex items-start gap-4 group">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary-500/10 text-primary-500 flex items-center justify-center group-hover:bg-primary-500 group-hover:text-white transition-colors mt-1">✓</span>
                    <span>{t('services.feature2') || 'Latest global equipment'}</span>
                  </li>
                  <li className="flex items-start gap-4 group">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary-500/10 text-primary-500 flex items-center justify-center group-hover:bg-primary-500 group-hover:text-white transition-colors mt-1">✓</span>
                    <span>{t('services.feature3') || 'Creative specialist team'}</span>
                  </li>
                </ul>
              </div>

              <Link href="/contact" className="block group">
                <Button
                  variant="recording"
                  size="xl"
                  className="w-full text-xl py-8"
                  showBrackets={true}
                  showRecordingDot={true}
                >
                  {t('services.requestService') || 'Request Service'}
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </Section>

      {/* Related Services */}
      {otherServices.length > 0 && (
        <Section id="related-services" spacing="lg" className="bg-dark-50 dark:bg-dark-950/50">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
              <div className="space-y-4">
                <h2 className="text-4xl md:text-5xl font-heading font-bold text-dark-900 dark:text-white">
                  {t('services.otherServices') || 'Services You Might Need'}
                </h2>
                <p className="text-xl text-dark-500 max-w-2xl font-sans">
                  {t('services.otherServicesDesc') || 'Explore our wide range of professional media services.'}
                </p>
              </div>
              <Link href="/services" className="text-primary-500 font-heading font-bold hover:underline text-lg">
                {t('services.viewAll') || 'View All Services'} →
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {otherServices.map((item, index) => (
                <motion.div
                  key={item.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link href={`/services/${item.slug}`} className="group block h-full">
                    <div className="bg-white dark:bg-dark-800 rounded-3xl overflow-hidden border border-dark-100 dark:border-dark-700 h-full flex flex-col transition-all duration-500 hover:shadow-2xl hover:shadow-primary-500/10 hover:-translate-y-2">
                      <div className="relative h-48 overflow-hidden">
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
                      </div>
                      <div className="p-8 flex flex-col flex-grow">
                        <div className="w-12 h-12 text-primary-500 mb-6 group-hover:scale-110 transition-transform">
                          {getServiceIcon(item.slug)}
                        </div>
                        <h3 className="text-2xl font-heading font-bold text-dark-900 dark:text-white mb-4 group-hover:text-primary-500 transition-colors">
                          {item.title}
                        </h3>
                        <p className="text-dark-500 dark:text-dark-400 font-sans line-clamp-2 mb-6">
                          {item.description}
                        </p>
                        <div className="mt-auto flex items-center text-primary-500 font-heading font-bold text-sm">
                          {t('common.readMore') || 'Learn More'}
                          <span className="ms-2 transform transition-transform group-hover:translate-x-1">→</span>
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

      {/* Footer CTA */}
      <div className="container mx-auto px-4 pb-20">
        <div className="h-px w-full bg-dark-100 dark:bg-dark-800 mb-12" />
        <Link
          href="/services"
          className="inline-flex items-center gap-3 text-dark-500 hover:text-primary-500 font-heading font-bold transition-all group text-lg"
        >
          <span className="w-10 h-10 rounded-full border border-dark-200 dark:border-dark-700 flex items-center justify-center group-hover:border-primary-500 group-hover:bg-primary-500 group-hover:text-white transition-all">
            {locale === 'ar' ? '→' : '←'}
          </span>
          <span>{t('services.backToServices') || 'Back to All Services'}</span>
        </Link>
      </div>
    </div>
  );
}
