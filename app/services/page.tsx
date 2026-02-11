import { Metadata } from 'next';
import { services as staticServices } from '@/data/services';
import PageHeroSection from '@/components/blocks/PageHeroSection';
import ServicesPageClient from './ServicesPageClient';

export const metadata: Metadata = {
  // ...
  title: 'خدماتنا - Belqees Media',
  description: 'نقدم حلولاً إعلامية متكاملة بجودة عالية واحترافية',
  keywords: [
    'خدمات',
    'services',
    'إنتاج إعلامي',
    'بث مباشر',
    'فعاليات',
    'استوديوهات',
  ],
  openGraph: {
    title: 'خدماتنا - Belqees Media',
    description: 'نقدم حلولاً إعلامية متكاملة بجودة عالية واحترافية',
    type: 'website',
    url: '/services',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'خدماتنا - Belqees Media',
    description: 'نقدم حلولاً إعلامية متكاملة بجودة عالية واحترافية',
  },
  alternates: {
    canonical: '/services',
  },
};

export default async function ServicesPage() {
  // Using static data instead of database service
  const servicesData = staticServices;

  return (
    <div className="bg-white dark:bg-gray-900 transition-colors min-h-screen">
      {/* Hero Section */}
      <PageHeroSection
        title="خدماتنا"
        titleKey="services.pageTitle"
        subtitle="نقدم حلولاً إعلامية متكاملة بجودة عالية واحترافية"
        subtitleKey="services.pageDescription"
        backgroundImage="/images-optimized/services-hero.jpg"
      />

      {/* Services Grid */}
      <section
        className="py-16 bg-white dark:bg-gray-900 transition-colors"
        aria-labelledby="services-heading"
      >
        <div className="container mx-auto px-4">
          <h2 id="services-heading" className="sr-only">
            خدماتنا
          </h2>
          <ServicesPageClient services={servicesData as any} />
        </div>
      </section>
    </div>
  );
}
