import { notFound } from 'next/navigation';
import { pages as staticPages } from '@/data/pages';
import { Metadata } from 'next';
import { sanitizeHtml } from '@/lib/utils/sanitize';
import PageHeroSection from '@/components/blocks/PageHeroSection';
import Section from '@/components/atoms/Section';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = staticPages.find(p => p.slug === slug && p.published);

  if (!page) {
    return {
      title: 'الصفحة غير موجودة',
    };
  }

  return {
    title: `${page.title} - Belqees Media`,
    description: typeof page.content === 'string'
      ? page.content.substring(0, 160)
      : 'صفحة من موقع بلقيس ميديا',
  };
}

export default async function DynamicPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = staticPages.find(p => p.slug === slug && p.published);

  if (!page) {
    notFound();
  }

  // Render content
  const renderContent = () => {
    if (!page.content) {
      return (
        <div className="py-20 text-center bg-dark-50 dark:bg-dark-800/50 rounded-4xl border-2 border-dashed border-dark-200 dark:border-dark-700">
           <p className="text-dark-500 dark:text-dark-400 text-xl font-sans">
             {slug === 'terms' ? 'لا يوجد محتوى لهذه الصفحة حالياً.' : 'محتوى هذه الصفحة غير متوفر.'}
           </p>
        </div>
      );
    }

    if (typeof page.content === 'string') {
      const sanitizedContent = sanitizeHtml(page.content);
      return (
        <div
          className="prose prose-lg dark:prose-invert max-w-none text-dark-600 dark:text-dark-300 font-sans leading-relaxed"
          dangerouslySetInnerHTML={{ __html: sanitizedContent }}
        />
      );
    }

    return (
      <div className="py-20 text-center bg-dark-50 dark:bg-dark-800/50 rounded-4xl border-2 border-dashed border-dark-200 dark:border-dark-700">
         <p className="text-dark-500 dark:text-dark-400 text-xl font-sans">لا يمكن عرض محتوى هذه الصفحة.</p>
      </div>
    );
  };

  const lastUpdated = new Date(page.updatedAt).toLocaleDateString('ar-SA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="min-h-screen bg-white dark:bg-dark-900 transition-colors">
      {/* Hero Section */}
      <PageHeroSection
        title={page.title}
        subtitle={`آخر تحديث: ${lastUpdated}`}
        backgroundImage="/images-optimized/about-hero.jpg"
      />

      {/* Content Section */}
      <Section id="page-content" spacing="md">
        <div className="max-w-4xl mx-auto">
          {renderContent()}
        </div>
      </Section>
    </div>
  );
}

export async function generateStaticParams() {
  return staticPages.filter(p => p.published).map((page) => ({
    slug: page.slug,
  }));
}

export const revalidate = 300;
