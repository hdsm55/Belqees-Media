import { notFound } from 'next/navigation';
import { pages as staticPages } from '@/data/pages';
import { Metadata } from 'next';
import { sanitizeHtml } from '@/lib/utils/sanitize';

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
    title: page.title,
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
      return <p className="text-gray-600">لا يوجد محتوى لهذه الصفحة</p>;
    }

    if (typeof page.content === 'string') {
      const sanitizedContent = sanitizeHtml(page.content);
      return (
        <div
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: sanitizedContent }}
        />
      );
    }

    return <p className="text-gray-600">لا يمكن عرض محتوى هذه الصفحة</p>;
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{page.title}</h1>
          <p className="text-primary-100 text-sm">
            آخر تحديث: {new Date(page.updatedAt).toLocaleDateString('ar-SA')}
          </p>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  return staticPages.filter(p => p.published).map((page) => ({
    slug: page.slug,
  }));
}

export const revalidate = 300;
