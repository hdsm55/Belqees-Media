import type { Metadata } from 'next';
import PortfolioPageContent from '@/components/pages/PortfolioPageContent';

export const metadata: Metadata = {
  title: 'معرض الأعمال - Belqees Media',
  description: 'استعرض معرض أعمال Belqees Media - مشاريعنا في الإنتاج الإعلامي، البث المباشر، الفعاليات، والإعلانات. أمثلة من أفضل أعمالنا.',
  keywords: ['معرض الأعمال', 'portfolio', 'مشاريع', 'إنتاج إعلامي', 'بث مباشر', 'فعاليات', 'إعلانات'],
  openGraph: {
    title: 'معرض الأعمال - Belqees Media',
    description: 'استعرض معرض أعمال Belqees Media - مشاريعنا في الإنتاج الإعلامي والبث المباشر',
    type: 'website',
    url: '/portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'معرض الأعمال - Belqees Media',
    description: 'استعرض معرض أعمال Belqees Media - مشاريعنا في الإنتاج الإعلامي والبث المباشر',
  },
  alternates: {
    canonical: '/portfolio',
  },
};

export default async function PortfolioPage() {
  return (
    <>
      {/* Page Content */}
      <PortfolioPageContent />
    </>
  );
}

