'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ScrollReveal from '@/components/animations/ScrollReveal';
import Button from '@/components/atoms/Button';
import { useTranslation } from '@/hooks/useTranslation';

import type { PortfolioItem, PortfolioMedia } from '@/lib/api/portfolio';

interface PortfolioDetailContentProps {
  item: PortfolioItem;
}

export default function PortfolioDetailContent({ item }: PortfolioDetailContentProps) {
  const { t } = useTranslation();
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

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 pt-20 md:pt-24">
      {/* Hero Section */}
      <section className="py-12 md:py-16 bg-gray-50 dark:bg-gray-800 transition-colors">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 text-primary-500 dark:text-primary-400 hover:text-primary-600 dark:hover:text-primary-300 mb-6 transition-colors"
            >
              <span>←</span>
              <span>{t('portfolio.backToPortfolio')}</span>
            </Link>

            {item.category && (
              <div className="inline-block px-4 py-2 bg-primary-500/10 text-primary-500 dark:text-primary-400 rounded-lg mb-4 text-sm font-medium">
                {item.category}
              </div>
            )}

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-dark dark:text-gray-100 mb-4 md:mb-6 tracking-tight">
              {item.title}
            </h1>

            {item.description && (
              <p className="text-base sm:text-lg md:text-xl text-dark-light dark:text-gray-300 leading-relaxed">
                {item.description}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Main Image/Video */}
            {displayImage && (
              <div className="mb-8 rounded-lg overflow-hidden">
                <div className="relative aspect-video bg-gray-100 dark:bg-gray-800">
                  <Image
                    src={displayImage}
                    alt={item.title}
                    fill
                    className="object-cover"
                    priority
                    sizes="100vw"
                  />
                </div>
              </div>
            )}

            {videos.length > 0 && (
              <div className="mb-8 space-y-4">
                {videos.map((video, index) => (
                  <div key={index} className="rounded-lg overflow-hidden">
                    <div className="relative aspect-video bg-gray-100 dark:bg-gray-800">
                      <video
                        src={video}
                        controls
                        className="w-full h-full"
                        preload="metadata"
                      >
                        {t('portfolio.videoNotSupported')}
                      </video>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Image Gallery */}
            {images.length > 1 && (
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-dark dark:text-gray-100 mb-6">
                  {t('portfolio.gallery')}
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImageIndex(index)}
                      className={`relative aspect-square rounded-lg overflow-hidden transition-all ${
                        selectedImageIndex === index
                          ? 'ring-4 ring-primary-500'
                          : 'hover:opacity-80'
                      }`}
                      aria-label={`${t('portfolio.viewImage')} ${index + 1}`}
                    >
                      <Image
                        src={image}
                        alt={`${item.title} - صورة ${index + 1}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* CTA Section */}
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-8 md:p-12 text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-dark dark:text-gray-100 mb-4">
                {t('portfolio.similarProject')}
              </h2>
              <p className="text-dark-light dark:text-gray-300 mb-6 max-w-2xl mx-auto">
                {t('portfolio.similarProjectDescription')}
              </p>
              <Link href="/contact">
                <Button
                  variant="recording"
                  size="lg"
                  showRecordingDot={true}
                  showBrackets={true}
                  continuousGlow={true}
                >
                  {t('nav.contact')}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

