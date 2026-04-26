'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import Section from '@/components/atoms/Section';
import CornerBrackets from '@/components/atoms/CornerBrackets';
import Button from '@/components/atoms/Button';
import { useTranslation } from '@/hooks/useTranslation';

import type { PortfolioItem, PortfolioMedia } from '@/lib/api/portfolio';

interface PortfolioDetailContentProps {
  item: PortfolioItem;
  otherItems?: PortfolioItem[];
}

export default function PortfolioDetailContent({ item, otherItems = [] }: PortfolioDetailContentProps) {
  const { t, locale } = useTranslation();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const getMediaUrls = (media: PortfolioMedia | null): string[] => {
    if (!media) return [];
    if (typeof media === 'string') return [media];
    if (Array.isArray(media)) {
      return media.map((item) =>
        typeof item === 'string' ? item : (item as { url: string }).url || ''
      ).filter(Boolean);
    }
    if (typeof media === 'object' && 'url' in media) {
      return [media.url];
    }
    return [];
  };

  const getImages = (): string[] => getMediaUrls(item.images);
  const getVideos = (): string[] => getMediaUrls(item.videos);

  const images = getImages();
  const videos = getVideos();
  const displayImage = images[selectedImageIndex] || images[0];

  const getLocalizedValue = (item: any, field: string) => {
    const localizedField = `${field}_${locale}`;
    return item[localizedField] || item[field];
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6, ease: "easeOut" }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-dark-900 transition-colors pt-20">
      {/* Header Section */}
      <Section id="portfolio-detail-header" spacing="lg" className="relative overflow-hidden bg-dark-50 dark:bg-dark-950 border-b border-dark-100 dark:border-dark-800">
        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
           <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,var(--color-primary)_0%,transparent_70%)]" />
        </div>
        
        <div className="max-w-5xl mx-auto relative z-10">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-3 text-primary-500 font-heading font-bold mb-12 group text-lg"
            >
              <span className="w-10 h-10 rounded-full border border-primary-500/20 flex items-center justify-center group-hover:bg-primary-500 group-hover:text-white transition-all">
                {locale === 'ar' ? '→' : '←'}
              </span>
              <span>{t('portfolio.backToPortfolio') || 'Back to Projects'}</span>
            </Link>
          </motion.div>

          <div className="space-y-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-4"
            >
              {item.category && (
                <span className="inline-block px-5 py-2 bg-primary-500 text-white text-xs font-black uppercase tracking-[0.2em] rounded-full shadow-lg shadow-primary-500/30">
                  {t(`portfolio.categories.${item.category.toLowerCase()}`) || item.category}
                </span>
              )}
              <div className="h-px w-12 bg-primary-500/30" />
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-5xl md:text-8xl font-heading font-black text-dark-900 dark:text-white leading-[1.1] tracking-tight"
            >
              {getLocalizedValue(item, 'title')}
            </motion.h1>

            {item.description && (
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-2xl text-dark-600 dark:text-dark-300 font-sans leading-relaxed max-w-3xl"
              >
                {getLocalizedValue(item, 'description')}
              </motion.p>
            )}
          </div>
        </div>
      </Section>

      {/* Media Section */}
      <Section id="portfolio-detail-media" spacing="lg">
        <div className="max-w-6xl mx-auto space-y-20">
          {/* Main Media Display */}
          <motion.div 
             initial={{ opacity: 0, scale: 0.95 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true }}
             transition={{ duration: 0.8 }}
             className="relative aspect-video bg-dark-100 dark:bg-dark-800 shadow-2xl rounded-[2.5rem] overflow-hidden group"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={displayImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0"
              >
                {displayImage && (
                  <Image
                    src={displayImage}
                    alt={getLocalizedValue(item, 'title')}
                    fill
                    className="object-cover"
                    priority
                  />
                )}
              </motion.div>
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-t from-dark-950/40 to-transparent pointer-events-none" />
            <CornerBrackets showOnHover={false} className="border-white/30" />
          </motion.div>

          {/* Video Players */}
          {videos.length > 0 && (
            <div className="grid grid-cols-1 gap-12">
              {videos.map((video, index) => (
                <motion.div 
                  key={index}
                  {...fadeInUp}
                  className="relative aspect-video bg-dark-900 shadow-2xl rounded-[2.5rem] overflow-hidden border border-dark-800"
                >
                   <video
                    src={video}
                    controls
                    className="w-full h-full object-contain"
                    preload="metadata"
                  />
                  <CornerBrackets showOnHover={true} className="border-primary-500/50" />
                </motion.div>
              ))}
            </div>
          )}

          {/* Thumbnail Gallery */}
          {images.length > 1 && (
            <motion.div {...fadeInUp} className="space-y-8">
              <div className="flex items-center gap-6">
                <h2 className="text-3xl font-heading font-bold text-dark-900 dark:text-white whitespace-nowrap">
                  {t('portfolio.gallery') || 'Project Gallery'}
                </h2>
                <div className="h-px w-full bg-dark-100 dark:bg-dark-800" />
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {images.map((image, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`relative aspect-video rounded-2xl overflow-hidden transition-all duration-500 border-4 ${
                      selectedImageIndex === index
                        ? 'border-primary-500 shadow-2xl shadow-primary-500/20'
                        : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${item.title} - ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </Section>

      {/* Related Projects */}
      {otherItems.length > 0 && (
        <Section id="related-projects" spacing="lg" className="bg-dark-50 dark:bg-dark-950/50 border-t border-dark-100 dark:border-dark-800">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
              <div className="space-y-4">
                <h2 className="text-4xl md:text-5xl font-heading font-bold text-dark-900 dark:text-white">
                  {t('portfolio.similarProject') || 'Related Projects'}
                </h2>
                <p className="text-xl text-dark-500 max-w-2xl font-sans">
                  {t('portfolio.similarProjectDescription') || 'Check out more of our professional work.'}
                </p>
              </div>
              <Link href="/portfolio" className="text-primary-500 font-heading font-bold hover:underline text-lg">
                {t('portfolio.viewAll') || 'View All Projects'} →
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {otherItems.map((relatedItem, index) => (
                <motion.div
                  key={relatedItem.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link href={`/portfolio/${relatedItem.slug}`} className="group block h-full">
                    <div className="bg-white dark:bg-dark-800 rounded-[2rem] overflow-hidden border border-dark-100 dark:border-dark-700 h-full flex flex-col transition-all duration-500 hover:shadow-2xl hover:shadow-primary-500/10 hover:-translate-y-2">
                      <div className="relative h-64 overflow-hidden">
                         <Image
                            src={getMediaUrls(relatedItem.images)[0] || ''}
                            alt={relatedItem.title}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                        <div className="absolute inset-0 bg-gradient-to-t from-dark-900/80 via-transparent to-transparent opacity-60 group-hover:opacity-100 transition-opacity" />
                        <div className="absolute bottom-6 left-6 right-6">
                           <span className="px-3 py-1 bg-primary-500 text-white text-[10px] font-bold uppercase tracking-widest rounded-sm">
                              {relatedItem.category}
                           </span>
                        </div>
                      </div>
                      <div className="p-8 flex flex-col flex-grow">
                        <h3 className="text-2xl font-heading font-bold text-dark-900 dark:text-white mb-4 group-hover:text-primary-500 transition-colors">
                          {getLocalizedValue(relatedItem, 'title')}
                        </h3>
                        <p className="text-dark-500 dark:text-dark-400 font-sans line-clamp-2 mb-6 text-lg">
                          {getLocalizedValue(relatedItem, 'description')}
                        </p>
                        <div className="mt-auto flex items-center text-primary-500 font-heading font-bold text-sm uppercase tracking-widest">
                          {t('common.readMore') || 'Explore Project'}
                          <span className="ms-3 transform transition-transform group-hover:translate-x-2">→</span>
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

      {/* CTA Section */}
      <Section id="portfolio-cta" spacing="xl" className="relative overflow-hidden">
        <div className="absolute inset-0 bg-primary-500/5 dark:bg-primary-500/[0.02] pointer-events-none" />
        <div className="max-w-4xl mx-auto text-center space-y-12 relative z-10">
          <motion.h2 
            {...fadeInUp}
            className="text-4xl md:text-6xl font-heading font-black text-dark-900 dark:text-white leading-tight"
          >
            {t('portfolio.haveProject') || 'Have a Vision in Mind?'}
          </motion.h2>
          <motion.p 
            {...fadeInUp}
            transition={{ delay: 0.1 }}
            className="text-2xl text-dark-600 dark:text-dark-300 font-sans max-w-2xl mx-auto leading-relaxed"
          >
            {t('portfolio.ctaDescription') || 'Let\'s collaborate to create something extraordinary that stands out.'}
          </motion.p>
          <motion.div 
            {...fadeInUp}
            transition={{ delay: 0.2 }}
            className="flex justify-center"
          >
            <Link href="/contact">
              <Button
                variant="recording"
                size="xl"
                showRecordingDot={true}
                showBrackets={true}
                className="px-16 py-10 text-xl"
              >
                {t('nav.contact') || 'Start a Conversation'}
              </Button>
            </Link>
          </motion.div>
        </div>
      </Section>
    </div>
  );
}
