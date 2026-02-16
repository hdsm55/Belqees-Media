'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ScrollReveal from '@/components/animations/ScrollReveal';
import { useTranslation } from '@/hooks/useTranslation';

export default function PortfolioPageClient() {
  const { t, locale } = useTranslation();

  const portfolioItems = [
    {
      id: '1',
      slug: 'tech-summit-2024',
      title: locale === 'ar' ? 'القمة الرقمية العالمية' : (locale === 'tr' ? 'Dijital Dönüşüm Zirvesi' : 'Digital Transformation Summit'),
      description: locale === 'ar' ? 'تغطية إعلامية شاملة للقمة الرقمية العالمية.' : (locale === 'tr' ? 'Küresel Dijital Zirve için kapsamlı medya kapsamı.' : 'Comprehensive media coverage for the Global Digital Summit.'),
      category: locale === 'ar' ? 'إنتاج' : (locale === 'tr' ? 'Prodüksiyon' : 'Production'),
      images: ['/images-optimized/approach.jpg'],
    },
    {
      id: '2',
      slug: 'live-stream-concert',
      title: locale === 'ar' ? 'حفل موسيقي عالمي' : (locale === 'tr' ? 'Canlı Harmoni Konseri' : 'Live Harmony Concert'),
      description: locale === 'ar' ? 'بث مباشر احترافي لحفل موسيقي عالمي.' : (locale === 'tr' ? 'Uluslararası bir موسيقي حفل موسيقي عالمي.' : 'Professional live streaming of an international music concert.'),
      category: locale === 'ar' ? 'بث مباشر' : (locale === 'tr' ? 'Canlı Yayın' : 'Streaming'),
      images: ['/images-optimized/events-hero.jpg'],
    },
    {
      id: '3',
      slug: 'corporate-identity-launch',
      title: locale === 'ar' ? 'رؤية العلامة التجارية 2030' : (locale === 'tr' ? 'Marka Vizyonu 2030' : 'Brand Vision 2030'),
      description: locale === 'ar' ? 'إطلاق الهوية المؤسسية الجديدة لشركة تقنية كبرى.' : (locale === 'tr' ? 'Büyük bir teknoloji şirketi için yeni kurumsal kimliğin lansmanı.' : 'Launching the new corporate identity for a major tech company.'),
      category: locale === 'ar' ? 'هوية' : (locale === 'tr' ? 'Markalaşma' : 'Branding'),
      images: ['/images-optimized/portfolio-hero.jpg'],
    }
  ];

  const categories = locale === 'ar'
    ? ['إنتاج', 'بث مباشر', 'هوية']
    : (locale === 'tr' ? ['Prodüksiyon', 'Canlı Yayın', 'Markalaşma'] : ['Production', 'Streaming', 'Branding']);

  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredPortfolio = selectedCategory === 'all'
    ? portfolioItems
    : portfolioItems.filter(item => item.category === selectedCategory);

  const getImageUrl = (images: string[]): string | null => {
    return images && images.length > 0 ? images[0] : null;
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Filters */}
      <section className="py-6 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-16 md:top-20 z-10 transition-colors">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-3 justify-center">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${selectedCategory === 'all'
                  ? 'bg-primary-500 text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-dark dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
            >
              {t('portfolio.all')}
            </button>
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${selectedCategory === category
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-800 text-dark dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section
        className="py-12 md:py-16 bg-white dark:bg-gray-900 transition-colors"
        aria-label={t('portfolio.galleryAriaLabel')}
      >
        <div className="container mx-auto px-4">
          {filteredPortfolio.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-dark-light dark:text-gray-400 text-lg">
                {t('portfolio.noProjects')}
              </p>
            </div>
          ) : (
            <ScrollReveal animation="fadeIn" stagger={0.1}>
              <div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                role="list"
              >
                {filteredPortfolio.map(item => {
                  const imageUrl = getImageUrl(item.images);

                  return (
                    <Link
                      key={item.id}
                      href={`/portfolio/${item.slug}`}
                      className="project-card project-card-wrapper group relative overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800 aspect-[4/3] cursor-pointer block"
                      role="listitem"
                      aria-label={`${t('portfolio.viewProjectDetails')} ${item.title}`}
                    >
                      {imageUrl ? (
                        <Image
                          src={imageUrl}
                          alt={item.title}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          loading="lazy"
                          quality={75}
                        />
                      ) : (
                        <div
                          className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center"
                          aria-hidden="true"
                        >
                          <span className="text-gray-400 dark:text-gray-500 text-sm">
                            {t('portfolio.projectImage')}
                          </span>
                        </div>
                      )}

                      {/* Camera Frame Corners */}
                      <div className="project-card-top-right" />
                      <div className="project-card-bottom-left" />
                      <div className="project-card-top-left" />
                      <div className="project-card-bottom-right" />

                      {/* Overlay */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-500" />

                      {/* Project Info */}
                      <div className="absolute inset-0 flex items-end p-6 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                        <div>
                          {item.category && (
                            <div
                              className="text-sm text-white/90 mb-2 font-medium"
                              aria-label={t('portfolio.projectCategory')}
                            >
                              {item.category}
                            </div>
                          )}
                          <h3 className="text-xl font-bold text-white">
                            {item.title}
                          </h3>
                          {item.description && (
                            <p className="text-sm text-white/80 mt-2 line-clamp-2">
                              {item.description}
                            </p>
                          )}
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </ScrollReveal>
          )}
        </div>
      </section>
    </div>
  );
}
