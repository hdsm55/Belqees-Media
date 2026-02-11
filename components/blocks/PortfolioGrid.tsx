'use client';

import Link from 'next/link';
import Image from 'next/image';
import ScrollReveal from '@/components/animations/ScrollReveal';
import LoadingSkeleton from '@/components/ui/LoadingSkeleton';
import { useState } from 'react';
import { useTranslation } from '@/hooks/useTranslation';

interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  image: string;
  slug?: string;
}

interface PortfolioGridProps {
  items: PortfolioItem[];
  title?: string;
  showViewAll?: boolean;
  viewAllLink?: string;
}

export default function PortfolioGrid({
  items,
  title,
  showViewAll = true,
  viewAllLink = '/portfolio',
}: PortfolioGridProps) {
  const { t } = useTranslation();
  const displayTitle = title || t('portfolio.title');
  return (
    <section
      className="py-20 bg-white dark:bg-gray-900 transition-colors"
      aria-label="معرض المشاريع"
    >
      <div className="container mx-auto px-4">
        {displayTitle && (
          <div className="text-center mb-10 md:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-dark dark:text-gray-100 mb-3 md:mb-4">
              {displayTitle}
            </h2>
          </div>
        )}

        <ScrollReveal animation="fadeIn" stagger={0.1}>
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            role="list"
          >
            {items.map(item => {
              const content = (
                <div
                  className="project-card project-card-wrapper group relative overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800 aspect-[4/3] cursor-pointer"
                  role="listitem"
                  aria-label={`${item.title} - ${item.category}`}
                >
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt={`${item.title} - ${item.category}`}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
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

                  {/* Camera Frame Corners - All 4 corners with animation */}
                  <div className="project-card-top-right" />
                  <div className="project-card-bottom-left" />
                  <div className="project-card-top-left" />
                  <div className="project-card-bottom-right" />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-500" />

                  {/* Project Info */}
                  <div className="absolute inset-0 flex items-end p-6 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                    <div>
                      <div
                        className="text-sm text-white/90 mb-2 font-medium"
                        aria-label={t('portfolio.projectCategory')}
                      >
                        {item.category}
                      </div>
                      <h3 className="text-xl font-bold text-white">
                        {item.title}
                      </h3>
                    </div>
                  </div>
                </div>
              );

              if (item.slug) {
                return (
                  <Link
                    key={item.id}
                    href={`/portfolio/${item.slug}`}
                    aria-label={`عرض تفاصيل ${item.title}`}
                  >
                    {content}
                  </Link>
                );
              }

              return <div key={item.id}>{content}</div>;
            })}
          </div>
        </ScrollReveal>

        {showViewAll && (
          <div className="text-center mt-12">
            <Link
              href={viewAllLink}
              className="inline-block text-dark dark:text-gray-100 hover:text-primary-500 dark:hover:text-primary-400 transition-colors font-medium text-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded"
              aria-label={t('portfolio.viewAllProjects')}
            >
              {t('portfolio.viewAllProjects')} →
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
