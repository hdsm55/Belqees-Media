import { cache } from 'react';
import { portfolioService } from '@/lib/services/portfolio.service';
import PortfolioDetailContent from '@/components/pages/PortfolioDetailContent';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

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

const getPortfolioItem = cache(async (slug: string) => {
  try {
    const item = await portfolioService.getPortfolioBySlug(slug);
    if (!item || (!item.published && process.env.NODE_ENV === 'production')) {
      return null;
    }
    return item;
  } catch (error) {
    return null;
  }
});

export async function generateStaticParams() {
  const items = await portfolioService.getPublishedPortfolio();
  return items.map((item) => ({
    slug: item.slug,
  }));
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

  const title = `${item.title} - Belqees Media`;
  const description = item.description || `تفاصيل مشروع ${item.title} من Belqees Media`;

  return {
    title,
    description,
    keywords: [item.title, item.category || '', 'مشروع', 'إنتاج إعلامي'],
    openGraph: {
      title,
      description,
      type: 'website',
      url: `/portfolio/${slug}`,
      images: item.images?.[0] ? [{ url: item.images[0], width: 1200, height: 630 }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: item.images?.[0] ? [item.images[0]] : [],
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

  const relatedItems = await portfolioService.getPublishedPortfolio(4);
  const otherItems = relatedItems.filter(i => i.slug !== slug).slice(0, 3);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: item.title,
    description: item.description,
    author: {
      '@type': 'Organization',
      name: 'Belqees Media',
    },
    image: Array.isArray(item.images) ? item.images[0] : item.images,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PortfolioDetailContent item={item} otherItems={otherItems} />
    </>
  );
}

