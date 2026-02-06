import type { Metadata } from 'next';
import { StructuredData } from '@/components/StructuredData';
import { events } from '@/data/events';
import HomePageContentClient from '@/components/pages/HomePageContentClient';


export const metadata: Metadata = {
  title: 'Belqees Media - شركة إنتاج إعلامي متكاملة الخدمات',
  description: 'Belqees Media هي شركة إنتاج إعلامي متكاملة الخدمات تأسست عام 2015، مكرسة لتقديم حلول عالية الجودة للقنوات التلفزيونية والمنصات الرقمية والفعاليات المباشرة.',
  keywords: ['Belqees Media', 'إنتاج إعلامي', 'بث مباشر', 'فعاليات', 'استوديوهات', 'إعلام', 'إنتاج تلفزيوني', 'إنتاج فيديو', 'إنتاج محتوى'],
  authors: [{ name: 'Belqees Media' }],
  creator: 'Belqees Media',
  publisher: 'Belqees Media',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://belqeesmedia.com'),
  openGraph: {
    title: 'Belqees Media - شركة إنتاج إعلامي متكاملة الخدمات',
    description: 'Belqees Media هي شركة إنتاج إعلامي متكاملة الخدمات تأسست عام 2015، مكرسة لتقديم حلول عالية الجودة للقنوات التلفزيونية والمنصات الرقمية والفعاليات المباشرة.',
    url: '/',
    siteName: 'Belqees Media',
    images: [
      {
        url: '/images/logo.avif',
        width: 1200,
        height: 630,
        alt: 'Belqees Media Logo',
      },
    ],
    locale: 'ar_SA',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Belqees Media - شركة إنتاج إعلامي متكاملة الخدمات',
    description: 'Belqees Media هي شركة إنتاج إعلامي متكاملة الخدمات تأسست عام 2015',
    images: ['/images/logo.avif'],
  },
  alternates: {
    canonical: '/',
    languages: {
      'ar': '/',
      'en': '/en',
      'tr': '/tr',
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Add your verification codes here when available
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
  },
};

export default async function HomePage() {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Belqees Media',
    description: 'شركة إنتاج إعلامي متكاملة الخدمات تأسست عام 2015',
    url: process.env.NEXT_PUBLIC_APP_URL || 'https://belqeesmedia.com',
    logo: `${process.env.NEXT_PUBLIC_APP_URL || 'https://belqeesmedia.com'}/images/logo.avif`,
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+90-212-412-20-60',
      contactType: 'customer service',
      email: 'Contact@belqeesmedia.com',
      areaServed: 'Worldwide',
      availableLanguage: ['Arabic', 'English', 'Turkish'],
    },
    sameAs: [
      'https://www.facebook.com/belqeesmedia',
      'https://www.instagram.com/belqeesmedia',
      'https://www.linkedin.com/company/belqeesmedia',
    ],
    foundingDate: '2015',
  };

  // Fetch events from static data
  const eventsData = events.slice(0, 4);

  return (
    <>
      <StructuredData data={organizationSchema} />

      {/* Page Content with Translations */}
      <HomePageContentClient events={eventsData as any} />
    </>
  );
}
