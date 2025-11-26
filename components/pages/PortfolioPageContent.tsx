'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ScrollReveal from '@/components/animations/ScrollReveal';
import LoadingSkeleton, { CardSkeleton } from '@/components/ui/LoadingSkeleton';
import { useTranslation } from '@/hooks/useTranslation';

import type { PortfolioItem, PortfolioMedia } from '@/lib/api/portfolio';

interface PortfolioResponse {
  data: PortfolioItem[];
  total: number;
  limit: number | null;
  offset: number | null;
}

export default function PortfolioPageContent() {
  const { t } = useTranslation();
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [categories, setCategories] = useState<string[]>([]);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  useEffect(() => {
    setCurrentPage(1); // Reset to first page when category changes
  }, [selectedCategory]);

  useEffect(() => {
    fetchPortfolio();
  }, [selectedCategory, currentPage]);

  const fetchPortfolio = async () => {
    try {
      setLoading(true);
      setError(null);

      const offset = (currentPage - 1) * itemsPerPage;
      const url = selectedCategory === 'all'
        ? `/api/portfolio?published=true&limit=${itemsPerPage}&offset=${offset}`
        : `/api/portfolio?published=true&category=${selectedCategory}&limit=${itemsPerPage}&offset=${offset}`;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(t('portfolio.fetchError'));
      }

      const result: PortfolioResponse = await response.json();
      setPortfolio(result.data || []);
      setTotal(result.total || 0);

      // Extract unique categories (only on first load)
      if (currentPage === 1 && selectedCategory === 'all') {
        // Fetch all categories
        const allResponse = await fetch('/api/portfolio?published=true');
        if (allResponse.ok) {
          const allResult: PortfolioResponse = await allResponse.json();
          const uniqueCategories = Array.from(
            new Set(allResult.data.map(item => item.category).filter(Boolean))
          ) as string[];
          setCategories(uniqueCategories);
        }
      }
      } catch (err) {
        setError(t('portfolio.errorOccurred'));
        if (process.env.NODE_ENV === 'development') {
          console.error('Error fetching portfolio:', err);
        }
      } finally {
      setLoading(false);
    }
  };

  const getImageUrl = (media: PortfolioMedia | null): string | null => {
    if (!media) return null;
    if (typeof media === 'string') return media;
    if (Array.isArray(media) && media.length > 0) {
      const firstItem = media[0];
      return typeof firstItem === 'string' ? firstItem : (firstItem as { url: string }).url || null;
    }
    if (typeof media === 'object' && 'url' in media) {
      return media.url;
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 pt-20 md:pt-24">
      {/* Hero Section */}
      <section className="py-16 md:py-20 bg-gray-50 dark:bg-gray-800 transition-colors">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10 md:mb-12">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-dark dark:text-gray-100 mb-4 md:mb-6 tracking-tight">
              {t('portfolio.title')}
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-dark-light dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              {t('portfolio.description')}
            </p>
          </div>
        </div>
      </section>

      {/* Filters */}
      {categories.length > 0 && (
        <section className="py-6 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-16 md:top-20 z-10">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap gap-3 justify-center">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedCategory === 'all'
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-800 text-dark dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
                aria-label={t('portfolio.viewAllProjects')}
              >
                {t('portfolio.all')}
              </button>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedCategory === category
                      ? 'bg-primary-500 text-white'
                      : 'bg-gray-100 dark:bg-gray-800 text-dark dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                  aria-label={`${t('portfolio.viewProjectDetails')} ${category}`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Portfolio Grid */}
      <section className="py-12 md:py-16 bg-white dark:bg-gray-900 transition-colors" aria-label="معرض المشاريع">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <CardSkeleton key={i} />
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-500 dark:text-red-400 text-lg mb-4">{error}</p>
              <button
                onClick={fetchPortfolio}
                className="px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
              >
                {t('portfolio.retry')}
              </button>
            </div>
          ) : portfolio.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-dark-light dark:text-gray-400 text-lg">
                {t('portfolio.noProjects')}
              </p>
            </div>
          ) : (
            <ScrollReveal animation="fadeIn" stagger={0.1}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" role="list">
                {portfolio.map((item) => {
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
                          placeholder="blur"
                          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center" aria-hidden="true">
                          <span className="text-gray-400 dark:text-gray-500 text-sm">{t('portfolio.projectImage')}</span>
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
                            <div className="text-sm text-white/90 mb-2 font-medium" aria-label={t('portfolio.projectCategory')}>
                              {item.category}
                            </div>
                          )}
                          <h3 className="text-xl font-bold text-white">{item.title}</h3>
                          {item.description && (
                            <p className="text-sm text-white/80 mt-2 line-clamp-2">{item.description}</p>
                          )}
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </ScrollReveal>
          )}

          {/* Pagination */}
          {!loading && !error && portfolio.length > 0 && total > itemsPerPage && (
            <div className="flex justify-center items-center gap-2 mt-12">
              <button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-dark dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                aria-label={t('portfolio.previous')}
              >
                {t('portfolio.previous')}
              </button>

              <div className="flex gap-1">
                {Array.from({ length: Math.ceil(total / itemsPerPage) }, (_, i) => i + 1)
                  .filter(page => {
                    // Show first page, last page, current page, and pages around current
                    return (
                      page === 1 ||
                      page === Math.ceil(total / itemsPerPage) ||
                      (page >= currentPage - 1 && page <= currentPage + 1)
                    );
                  })
                  .map((page, index, array) => {
                    // Add ellipsis
                    const showEllipsisBefore = index > 0 && array[index - 1] !== page - 1;
                    const showEllipsisAfter = index < array.length - 1 && array[index + 1] !== page + 1;

                    return (
                      <div key={page} className="flex items-center gap-1">
                        {showEllipsisBefore && <span className="px-2">...</span>}
                        <button
                          onClick={() => setCurrentPage(page)}
                          className={`px-4 py-2 rounded-lg transition-colors ${
                            currentPage === page
                              ? 'bg-primary-500 text-white'
                              : 'bg-gray-100 dark:bg-gray-800 text-dark dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                          }`}
                          aria-label={`${t('portfolio.page')} ${page}`}
                          aria-current={currentPage === page ? 'page' : undefined}
                        >
                          {page}
                        </button>
                        {showEllipsisAfter && <span className="px-2">...</span>}
                      </div>
                    );
                  })}
              </div>

              <button
                onClick={() => setCurrentPage(prev => Math.min(Math.ceil(total / itemsPerPage), prev + 1))}
                disabled={currentPage >= Math.ceil(total / itemsPerPage)}
                className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-dark dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                aria-label={t('portfolio.next')}
              >
                {t('portfolio.next')}
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

