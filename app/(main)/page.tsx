import type { Metadata } from 'next';
import HeroBlock from '@/components/blocks/HeroBlock';
import Link from 'next/link';
import { StructuredData } from '@/components/StructuredData';
import ScrollReveal from '@/components/animations/ScrollReveal';
import ServiceCard from '@/components/blocks/ServiceCard';
import StatsSection from '@/components/blocks/StatsSection';
import PortfolioGrid from '@/components/blocks/PortfolioGrid';
import ApproachSection from '@/components/blocks/ApproachSection';
import ClientsCarousel from '@/components/blocks/ClientsCarousel';
import Button from '@/components/atoms/Button';
import CornerBrackets from '@/components/atoms/CornerBrackets';

export const metadata: Metadata = {
  title: 'Belqees Media - شركة إنتاج إعلامي متكاملة الخدمات',
  description: 'Belqees Media هي شركة إنتاج إعلامي متكاملة الخدمات تأسست عام 2015، مكرسة لتقديم حلول عالية الجودة للقنوات التلفزيونية والمنصات الرقمية والفعاليات المباشرة.',
  keywords: ['Belqees Media', 'إنتاج إعلامي', 'بث مباشر', 'فعاليات', 'استوديوهات', 'إعلام'],
  openGraph: {
    title: 'Belqees Media - شركة إنتاج إعلامي متكاملة الخدمات',
    description: 'Belqees Media هي شركة إنتاج إعلامي متكاملة الخدمات تأسست عام 2015',
    type: 'website',
    locale: 'ar_SA',
    siteName: 'Belqees Media',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Belqees Media - شركة إنتاج إعلامي متكاملة الخدمات',
    description: 'Belqees Media هي شركة إنتاج إعلامي متكاملة الخدمات تأسست عام 2015',
  },
  alternates: {
    canonical: '/',
  },
};

export default function HomePage() {
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

  return (
    <>
      <StructuredData data={organizationSchema} />

      {/* Hero Section */}
      <HeroBlock
        title="نصنع المحتوى الإعلامي الذي يناسب احتياجاتك"
        subtitle="من المشاريع الكبيرة إلى الإنتاجات الصغيرة"
        description="في خدماتنا الإعلامية، نوجه الشركات عبر ثلاث مراحل رئيسية: التخطيط التفصيلي قبل الإنتاج، الإنتاج الفعال باستخدام فرق خبيرة، وما بعد الإنتاج الدقيق لإنشاء منتج نهائي لا يبدو رائعاً فحسب، بل يتواصل بفعالية"
        ctaText="تواصل معنا"
        ctaLink="/contact"
        backgroundVideo="/videos/hero-video.mp4"
        videoLoop={true}
        videoMuted={true}
      />

      {/* Stats Section */}
      <StatsSection
        stats={[
          { number: '9', suffix: '+', label: 'سنوات من الخبرة' },
          { number: '500', suffix: '+', label: 'مشروع منجز' },
          { number: '100', suffix: '+', label: 'عميل راضٍ' },
          { number: '50', suffix: '+', label: 'فعالية مغطاة' },
        ]}
      />

      {/* Services Section - Similar to tmrw.film */}
      <ScrollReveal animation="fadeInUp">
        <section className="py-16 md:py-20 bg-white dark:bg-gray-900 transition-colors">
          <div className="container mx-auto px-4">
            <div className="text-center mb-10 md:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-dark dark:text-gray-100 mb-3 md:mb-4">من المشاريع الكبيرة إلى الإنتاجات الصغيرة</h2>
              <p className="text-sm sm:text-base md:text-lg text-dark-light dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                في خدماتنا الإعلامية، نوجه الشركات عبر ثلاث مراحل رئيسية: التخطيط التفصيلي قبل الإنتاج، الإنتاج الفعال باستخدام فرق خبيرة، وما بعد الإنتاج الدقيق
              </p>
            </div>
            <ScrollReveal animation="fadeIn" stagger={0.1}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <ServiceCard
                  title="الإعلانات"
                  description="إنتاج إعلانات تلفزيونية ورقمية بجودة عالية"
                  icon="📺"
                />
                <ServiceCard
                  title="المحتوى المؤسسي"
                  description="فيديوهات احترافية للشركات والمؤسسات"
                  icon="🏢"
                />
                <ServiceCard
                  title="الوثائقيات"
                  description="إنتاج وثائقيات احترافية وقصص مؤثرة"
                  icon="🎬"
                />
                <ServiceCard
                  title="الإنتاجات الصغيرة"
                  description="حلول إعلامية مرنة للمشاريع الصغيرة"
                  icon="🎥"
                />
              </div>
            </ScrollReveal>
          </div>
        </section>
      </ScrollReveal>

      {/* Approach Section */}
      <ApproachSection
        title="نهجنا"
        description="نوفر خدمة صوتية بصرية كاملة. نخصص فريقنا ومعداتنا وفقاً لاحتياجات كل مشروع، مما يضمن إنتاجاً مخصصاً يتميز بجودة عالية. نحن ملتزمون بالابتكار، وخدمة العملاء الاستثنائية، وأعلى معايير الأخلاق والنزاهة التحريرية."
        linkText="اعرف المزيد"
        linkHref="/about"
      />

      {/* Clients Section */}
      <ClientsCarousel
        clients={[
          { id: '1', name: 'شريك 1', logo: '' },
          { id: '2', name: 'شريك 2', logo: '' },
          { id: '3', name: 'شريك 3', logo: '' },
          { id: '4', name: 'شريك 4', logo: '' },
          { id: '5', name: 'شريك 5', logo: '' },
          { id: '6', name: 'شريك 6', logo: '' },
        ]}
        title="الشركات التي وثقت بنا"
      />

      {/* Portfolio Section */}
      <PortfolioGrid
        title="أحدث مشاريعنا"
        items={[
          {
            id: '1',
            title: 'مشروع 1',
            category: 'إنتاج إعلامي',
            image: '',
          },
          {
            id: '2',
            title: 'مشروع 2',
            category: 'بث مباشر',
            image: '',
          },
          {
            id: '3',
            title: 'مشروع 3',
            category: 'فعاليات',
            image: '',
          },
          {
            id: '4',
            title: 'مشروع 4',
            category: 'إعلانات',
            image: '',
          },
        ]}
        showViewAll={true}
        viewAllLink="/portfolio"
      />

      {/* Contact CTA Section */}
      <ScrollReveal animation="fadeInUp">
        <section className="py-16 md:py-20 bg-gray-50 dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 transition-colors">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
                <div className="relative bg-white dark:bg-gray-800 p-8 border border-gray-200 dark:border-gray-700 group">
                  <CornerBrackets showOnHover={true} />
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 md:mb-6 text-dark dark:text-gray-100">تواصل معنا</h2>
                  <p className="text-sm sm:text-base md:text-lg text-dark-light dark:text-gray-300 mb-6 md:mb-8 leading-relaxed">
                    دعنا نفهم كيف يمكن للمحتوى الإعلامي أن يساعد في تواصلك
                  </p>
                  <Link href="/contact">
                    <Button variant="primary" size="lg" className="text-sm md:text-base">
                      تواصل معنا
                    </Button>
                  </Link>
                </div>
                <div className="space-y-4">
                  <div className="relative bg-white dark:bg-gray-800 p-6 border border-gray-200 dark:border-gray-700 group">
                    <CornerBrackets showOnHover={true} />
                    <h3 className="text-base md:text-lg font-semibold text-dark dark:text-gray-100 mb-2">البريد الإلكتروني</h3>
                    <a
                      href="mailto:Contact@belqeesmedia.com"
                      className="text-sm md:text-base text-dark-light dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
                    >
                      Contact@belqeesmedia.com
                    </a>
                  </div>
                  <div className="relative bg-white dark:bg-gray-800 p-6 border border-gray-200 dark:border-gray-700 group">
                    <CornerBrackets showOnHover={true} />
                    <h3 className="text-base md:text-lg font-semibold text-dark dark:text-gray-100 mb-2">الهاتف</h3>
                    <div className="space-y-1">
                      <a
                        href="tel:+902124122060"
                        className="block text-sm md:text-base text-dark-light dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
                      >
                        +90 (212) 412 20 60
                      </a>
                      <a
                        href="tel:+908508113366"
                        className="block text-sm md:text-base text-dark-light dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
                      >
                        +90 (850) 811 33 66
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>
    </>
  );
}
