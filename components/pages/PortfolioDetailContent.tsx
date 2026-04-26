'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Section from '@/components/atoms/Section';
import CornerBrackets from '@/components/atoms/CornerBrackets';
import Button from '@/components/atoms/Button';
import { useTranslation } from '@/hooks/useTranslation';

import type { PortfolioItem, PortfolioMedia } from '@/lib/api/portfolio';

interface PortfolioDetailContentProps {
  item: PortfolioItem;
}

export default function PortfolioDetailContent({ item }: PortfolioDetailContentProps) {
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

  return (
    <div className="min-h-screen bg-white dark:bg-dark-900 transition-colors pt-20">
      {/* Header Section */}
      <Section id="portfolio-detail-header" spacing="md" className="bg-dark-50 dark:bg-dark-950 border-b border-dark-100 dark:border-dark-800">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 text-primary-500 font-heading font-bold mb-8 group"
          >
            <span className="transform group-hover:-translate-x-1 rtl:group-hover:translate-x-1 transition-transform">
              {locale === 'ar' ? '→' : '←'}
            </span>
            <span>{t('portfolio.backToPortfolio') || 'العودة للمشاريع'}</span>
          </Link>

          <div className="space-y-6">
            {item.category && (
              <span className="inline-block px-4 py-1 bg-primary-500 text-white text-xs font-bold uppercase tracking-widest rounded-sm">
                {t(`portfolio.categories.${item.category.toLowerCase()}`) || item.category}
              </span>
            )}
            <h1 className="text-4xl md:text-6xl font-heading font-bold text-dark-900 dark:text-white leading-tight tracking-tight">
              {getLocalizedValue(item, 'title')}
            </h1>
            {item.description && (
              <p className="text-xl text-dark-600 dark:text-dark-300 font-sans leading-relaxed">
                {getLocalizedValue(item, 'description')}
              </p>
            )}
          </div>
        </div>
      </Section>

      {/* Media Section */}
      <Section id="portfolio-detail-media" spacing="md">
        <div className="max-w-6xl mx-auto space-y-12">
          {/* Main Media Display */}
          <div className="relative aspect-video bg-dark-100 dark:bg-dark-800 shadow-2xl overflow-hidden group">
            {displayImage && (
              <Image
                src={displayImage}
                alt={getLocalizedValue(item, 'title')}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                priority
              />
            )}
            <CornerBrackets showOnHover={false} className="border-white" />
          </div>

          {/* Video Players */}
          {videos.length > 0 && (
            <div className="grid grid-cols-1 gap-8">
              {videos.map((video, index) => (
                <div key={index} className="relative aspect-video bg-dark-900 shadow-xl overflow-hidden">
                   <video
                    src={video}
                    controls
                    className="w-full h-full object-contain"
                    preload="metadata"
                  />
                  <CornerBrackets showOnHover={true} />
                </div>
              ))}
            </div>
          )}

          {/* Thumbnail Gallery */}
          {images.length > 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-heading font-bold text-dark-900 dark:text-white">
                {t('portfolio.gallery') || 'معرض الصور'}
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`relative aspect-video overflow-hidden transition-all duration-300 border-2 ${
                      selectedImageIndex === index
                        ? 'border-primary-500 scale-95 shadow-lg shadow-primary-500/20'
                        : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${item.title} - ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </Section>

      {/* CTA Section */}
      <Section id="portfolio-cta" spacing="md" className="bg-dark-50 dark:bg-dark-950 border-t border-dark-100 dark:border-dark-800">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-dark-900 dark:text-white">
            {t('portfolio.similarProject') || 'هل تبحث عن مشروع مشابه؟'}
          </h2>
          <p className="text-lg text-dark-600 dark:text-dark-300 font-sans max-w-2xl mx-auto leading-relaxed">
            {t('portfolio.similarProjectDescription') || 'نحن هنا لمساعدتك في تحويل رؤيتك إلى واقع ملموس بجودة عالمية.'}
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
                {t('nav.contact') || 'تواصل معنا'}
              </Button>
            </Link>
          </div>
        </div>
      </Section>
    </div>
  );
}

