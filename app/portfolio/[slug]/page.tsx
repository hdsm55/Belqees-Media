import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import PortfolioDetailContent from '@/components/pages/PortfolioDetailContent';

interface PortfolioItem {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  category: string | null;
  images: any;
  videos: any;
  createdAt: string;
}

import { portfolioService } from '@/lib/services/portfolio.service';

async function getPortfolioItem(slug: string): Promise<PortfolioItem | null> {
  try {
    return await portfolioService.getPortfolioBySlug(slug);
  } catch (error) {
    console.error('Error fetching portfolio item:', error);
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = await getPortfolioItem(slug);

  if (!item) {
    return {
      title: 'المشروع غير موجود - Belqees Media',
    };
  }

  return {
    title: `${item.title} - Belqees Media`,
    description: item.description || `تفاصيل مشروع ${item.title} من Belqees Media`,
    keywords: [item.title, item.category || '', 'مشروع', 'إنتاج إعلامي'],
    openGraph: {
      title: `${item.title} - Belqees Media`,
      description: item.description || `تفاصيل مشروع ${item.title}`,
      type: 'website',
      url: `/portfolio/${slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${item.title} - Belqees Media`,
      description: item.description || `تفاصيل مشروع ${item.title}`,
    },
    alternates: {
      canonical: `/portfolio/${slug}`,
    },
  };
}

export default async function PortfolioDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = await getPortfolioItem(slug);

  if (!item) {
    notFound();
  }

  return (
    <>
      {/* Page Content */}
      <PortfolioDetailContent item={item} />
    </>
  );
}

