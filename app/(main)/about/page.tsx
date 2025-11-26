import type { Metadata } from 'next';
import AboutPageContent from '@/components/pages/AboutPageContent';

export const metadata: Metadata = {
  title: 'من نحن - Belqees Media',
  description: 'تعرف على Belqees Media، شركة إنتاج إعلامي متكاملة الخدمات تأسست عام 2015. نقدم حلول عالية الجودة للقنوات التلفزيونية والمنصات الرقمية والفعاليات المباشرة.',
  keywords: ['Belqees Media', 'من نحن', 'قناة بلقيس', 'استوديوهات', 'أنظمة البث'],
  openGraph: {
    title: 'من نحن - Belqees Media',
    description: 'تعرف على Belqees Media، شركة إنتاج إعلامي متكاملة الخدمات تأسست عام 2015',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'من نحن - Belqees Media',
    description: 'تعرف على Belqees Media، شركة إنتاج إعلامي متكاملة الخدمات تأسست عام 2015',
  },
  alternates: {
    canonical: '/about',
  },
};

export default function AboutPage() {
  return (
    <>
      {/* Page Content with Translations */}
      <AboutPageContent />
    </>
  );
}
