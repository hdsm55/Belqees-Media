import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'اتصل بنا - Belqees Media',
  description: 'تواصل مع Belqees Media. نحن هنا للإجابة على استفساراتك ومساعدتك في جميع احتياجاتك الإعلامية.',
  keywords: ['اتصل بنا', 'تواصل', 'Belqees Media', 'استفسار'],
  openGraph: {
    title: 'اتصل بنا - Belqees Media',
    description: 'تواصل مع Belqees Media. نحن هنا للإجابة على استفساراتك ومساعدتك',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'اتصل بنا - Belqees Media',
    description: 'تواصل مع Belqees Media. نحن هنا للإجابة على استفساراتك ومساعدتك',
  },
  alternates: {
    canonical: '/contact',
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

