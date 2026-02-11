import type { Metadata } from 'next';
import { portfolioService } from '@/lib/services';
import PageHeroSection from '@/components/blocks/PageHeroSection';
import PortfolioPageClient from './PortfolioPageClient';

// ISR: Revalidate every 5 minutes
export const revalidate = 300;

export const metadata: Metadata = {
  title: 'معرض الأعمال - Belqees Media',
  description:
    'استعرض معرض أعمال Belqees Media - مشاريعنا في الإنتاج الإعلامي، البث المباشر، الفعاليات، والإعلانات. أمثلة من أفضل أعمالنا.',
  keywords: [
    'معرض الأعمال',
    'portfolio',
    'مشاريع',
    'إنتاج إعلامي',
    'بث مباشر',
    'فعاليات',
    'إعلانات',
  ],
  openGraph: {
    title: 'معرض الأعمال - Belqees Media',
    description:
      'استعرض معرض أعمال Belqees Media - مشاريعنا في الإنتاج الإعلامي والبث المباشر',
    type: 'website',
    url: '/portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'معرض الأعمال - Belqees Media',
    description:
      'استعرض معرض أعمال Belqees Media - مشاريعنا في الإنتاج الإعلامي والبث المباشر',
  },
  alternates: {
    canonical: '/portfolio',
  },
};

export default async function PortfolioPage() {
  // Fetch portfolio data directly from database (Server Component)
  const itemsPerPage = 12;
  const { portfolio, total } = await portfolioService.getAllPortfolio({
    published: true,
    limit: itemsPerPage,
    offset: 0,
  });

  // Fetch categories
  const categories = await portfolioService.getPublishedCategories();

  return (
    <div className="bg-white dark:bg-gray-900 transition-colors min-h-screen">
      {/* Hero Section */}
      <PageHeroSection
        title="معرض الأعمال"
        titleKey="portfolio.pageTitle"
        subtitle="استعرض معرض أعمال Belqees Media - مشاريعنا في الإنتاج الإعلامي، البث المباشر، الفعاليات، والإعلانات"
        subtitleKey="portfolio.pageDescription"
        backgroundImage="/images/portfolio-hero.jpg"
      />

      {/* Portfolio Content */}
      <PortfolioPageClient
        initialPortfolio={portfolio}
        initialCategories={categories}
        initialTotal={total}
        itemsPerPage={itemsPerPage}
      />
    </div>
  );
}
