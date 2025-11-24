'use client';

import Link from 'next/link';
import ScrollReveal from '@/components/animations/ScrollReveal';

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
  title = 'أحدث مشاريعنا',
  showViewAll = true,
  viewAllLink = '/portfolio',
}: PortfolioGridProps) {
  return (
    <section className="py-20 bg-white dark:bg-gray-900 transition-colors">
      <div className="container mx-auto px-4">
        {title && (
          <div className="text-center mb-10 md:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-dark dark:text-gray-100 mb-3 md:mb-4">{title}</h2>
          </div>
        )}

        <ScrollReveal animation="fadeIn" stagger={0.1}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {items.map((item) => {
              const content = (
                <div className="project-card project-card-wrapper group relative overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800 aspect-[4/3] cursor-pointer">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                      <span className="text-gray-400 dark:text-gray-500">صورة المشروع</span>
                    </div>
                  )}

                  {/* Camera Frame Corners - Top Right & Bottom Left */}
                  <div className="project-card-top-right" />
                  <div className="project-card-bottom-left" />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-500" />

                  {/* Project Info */}
                  <div className="absolute inset-0 flex items-end p-6 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                    <div>
                      <div className="text-sm text-white/90 mb-2 font-medium">{item.category}</div>
                      <h3 className="text-xl font-bold text-white">{item.title}</h3>
                    </div>
                  </div>
                </div>
              );

              if (item.slug) {
                return (
                  <Link key={item.id} href={`/portfolio/${item.slug}`}>
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
              className="inline-block text-dark dark:text-gray-100 hover:text-primary-500 dark:hover:text-primary-400 transition-colors font-medium text-lg"
            >
              عرض جميع المشاريع →
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

