import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { Metadata } from 'next';
import { unstable_cache } from 'next/cache';
import { sanitizeHtml } from '@/lib/utils/sanitize';

// Cache the page for 5 minutes
const getCachedPage = unstable_cache(
  async (slug: string) => {
    return await prisma.page.findUnique({
      where: {
        slug,
        published: true,
      },
    });
  },
  ['page'],
  { revalidate: 300 }
);

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = await getCachedPage(slug);

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
  const page = await getCachedPage(slug);

  if (!page) {
    notFound();
  }

  // Render content based on type
  const renderContent = () => {
    if (!page.content) {
      return <p className="text-gray-600">لا يوجد محتوى لهذه الصفحة</p>;
    }

    // If content is a string, render it as HTML (sanitized)
    if (typeof page.content === 'string') {
      const sanitizedContent = sanitizeHtml(page.content);
      return (
        <div
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: sanitizedContent }}
        />
      );
    }

    // If content is an object/JSON, render it as formatted JSON
    if (typeof page.content === 'object') {
      return (
        <div className="prose prose-lg max-w-none">
          <pre className="whitespace-pre-wrap bg-gray-50 p-4 rounded-lg">
            {JSON.stringify(page.content, null, 2)}
          </pre>
        </div>
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
          {page.createdAt && (
            <p className="text-primary-100 text-sm">
              آخر تحديث: {new Date(page.updatedAt).toLocaleDateString('ar-SA')}
            </p>
          )}
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

// Generate static params for ISR
export async function generateStaticParams() {
  const pages = await prisma.page.findMany({
    where: {
      published: true,
    },
    select: {
      slug: true,
    },
  });

  return pages.map((page) => ({
    slug: page.slug,
  }));
}

// Revalidate every 5 minutes
export const revalidate = 300;

