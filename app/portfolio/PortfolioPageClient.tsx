'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Section from '@/components/atoms/Section';
import CornerBrackets from '@/components/atoms/CornerBrackets';
import PageHeroSection from '@/components/blocks/PageHeroSection';
import { useTranslation } from '@/hooks/useTranslation';
import { portfolioItems as staticItems, portfolioCategories as staticCategories } from '@/data/portfolio';

interface PortfolioPageClientProps {
  initialItems?: any[];
  categories?: string[];
}

export default function PortfolioPageClient({ initialItems, categories }: PortfolioPageClientProps) {
  const { t, locale } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const items = initialItems || staticItems;
  const allCategories = categories?.length ? categories : staticCategories;

  const filteredPortfolio = useMemo(() => {
    if (selectedCategory === 'all') return items;
    return items.filter(item => item.category === selectedCategory);
  }, [selectedCategory, items]);

  const getLocalizedValue = (item: any, field: string) => {
    const localizedField = `${field}_${locale}`;
    return item[localizedField] || item[field];
  };

  const getFirstImage = (item: any) => {
    if (!item.images) return '/images/placeholder.jpg';
    if (Array.isArray(item.images)) return item.images[0] || '/images/placeholder.jpg';
    if (typeof item.images === 'string') return item.images;
    return '/images/placeholder.jpg';
  };

  return (
    <div className="min-h-screen bg-white dark:bg-dark-900 transition-colors">
      {/* Hero Section */}
      <PageHeroSection
        title={t('portfolio.pageTitle')}
        subtitle={t('portfolio.pageSubtitle')}
        backgroundImage="/images-optimized/portfolio-hero.jpg"
      />

      {/* Filters */}
      <div className="sticky top-16 md:top-20 z-30 bg-white/80 dark:bg-dark-900/80 backdrop-blur-md border-b border-dark-100 dark:border-dark-800 py-6 transition-colors">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-4 justify-center">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-6 py-2 rounded-full font-heading font-bold transition-all duration-300 border-2 ${
                selectedCategory === 'all'
                  ? 'bg-primary-500 border-primary-500 text-white shadow-lg shadow-primary-500/30'
                  : 'bg-transparent border-dark-200 dark:border-dark-700 text-dark-600 dark:text-dark-400 hover:border-primary-500 hover:text-primary-500'
              }`}
            >
              {t('portfolio.all') || 'الكل'}
            </button>
            {allCategories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-heading font-bold transition-all duration-300 border-2 ${
                  selectedCategory === category
                    ? 'bg-primary-500 border-primary-500 text-white shadow-lg shadow-primary-500/30'
                    : 'bg-transparent border-dark-200 dark:border-dark-700 text-dark-600 dark:text-dark-400 hover:border-primary-500 hover:text-primary-500'
                }`}
              >
                {t(`portfolio.categories.${category.toLowerCase()}`) || category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Portfolio Grid */}
      <Section id="portfolio-grid" spacing="md" animate={false}>
        {filteredPortfolio.length === 0 ? (
          <div className="text-center py-20 bg-dark-50 dark:bg-dark-800/50 rounded-4xl border-2 border-dashed border-dark-200 dark:border-dark-700">
            <p className="text-dark-500 dark:text-dark-400 text-xl font-sans">
              {t('portfolio.noProjects') || 'لا توجد مشاريع في هذا القسم حالياً.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPortfolio.map((item, idx) => (
              <Link
                key={item.id}
                href={`/portfolio/${item.slug}`}
                className="group relative aspect-[4/3] bg-dark-100 dark:bg-dark-800 overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 rounded-lg"
              >
                <Image
                  src={getFirstImage(item)}
                  alt={getLocalizedValue(item, 'title')}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                
                {/* Camera Frame Corners */}
                <CornerBrackets showOnHover={true} className="border-white" />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

                {/* Content Overlay */}
                <div className="absolute inset-0 p-8 flex flex-col justify-end transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <span className="inline-block px-3 py-1 bg-primary-500 text-white text-xs font-bold uppercase tracking-wider mb-3 w-fit rounded-sm">
                    {t(`portfolio.categories.${item.category.toLowerCase()}`) || item.category}
                  </span>
                  <h3 className="text-2xl md:text-3xl font-heading font-bold text-white mb-2 leading-tight">
                    {getLocalizedValue(item, 'title')}
                  </h3>
                  <p className="text-white/70 font-sans line-clamp-2 text-sm md:text-base opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                    {getLocalizedValue(item, 'description')}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </Section>
    </div>
  );
}
