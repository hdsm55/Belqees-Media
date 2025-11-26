'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import ServiceCard from '@/components/blocks/ServiceCard';
import LoadingSkeleton, { CardSkeleton } from '@/components/ui/LoadingSkeleton';
import { useTranslation } from '@/hooks/useTranslation';
import ScrollReveal from '@/components/animations/ScrollReveal';

interface Service {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  icon: string | null;
  image: string | null;
  published: boolean;
}

export default function ServicesPage() {
  const { t } = useTranslation();
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('/api/services?published=true');

      if (!response.ok) {
        throw new Error('فشل في جلب البيانات');
      }

      const data: Service[] = await response.json();
      setServices(data.length > 0 ? data : getDefaultServices());
    } catch (err) {
      setError('حدث خطأ أثناء جلب البيانات');
      setServices(getDefaultServices()); // Fallback to default services
      if (process.env.NODE_ENV === 'development') {
        console.error('Error fetching services:', err);
      }
    } finally {
      setLoading(false);
    }
  };

  // Default services as fallback
  const getDefaultServices = (): Service[] => [
    {
      id: '1',
      slug: 'live-streaming',
      title: 'البث المباشر',
      description: 'بث سلس متعدد المنصات مع جودة عالية واستقرار ممتاز',
      icon: '📺',
      image: null,
      published: true,
    },
    {
      id: '2',
      slug: 'live-events',
      title: 'إنتاج الفعاليات المباشرة',
      description: 'تنفيذ تقني كامل للمؤتمرات والمنتديات والفعاليات الكبرى',
      icon: '🎬',
      image: null,
      published: true,
    },
    {
      id: '3',
      slug: 'media-production',
      title: 'الإنتاج الإعلامي',
      description: 'برامج تلفزيونية، فيديوهات ترويجية، وثائقيات، ومحتوى إعلامي متنوع',
      icon: '🎥',
      image: null,
      published: true,
    },
    {
      id: '4',
      slug: 'studio-design',
      title: 'تصميم وإعداد الاستوديوهات',
      description: 'حلول متكاملة لتصميم وتجهيز الاستوديوهات بأحدث التقنيات',
      icon: '🎙️',
      image: null,
      published: true,
    },
    {
      id: '5',
      slug: 'technical-consultancy',
      title: 'الاستشارات التقنية',
      description: 'استشارات متخصصة في التقنيات الإعلامية وأنظمة البث',
      icon: '💡',
      image: null,
      published: true,
    },
    {
      id: '6',
      slug: 'training',
      title: 'التدريب والتطوير',
      description: 'برامج تدريبية متخصصة لتطوير مهارات الفريق في المجال الإعلامي',
      icon: '📚',
      image: null,
      published: true,
    },
  ];

  return (
    <div className="bg-white dark:bg-gray-900 transition-colors min-h-screen pt-20 md:pt-24">
      {/* Hero Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800 transition-colors">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-bold text-center text-dark dark:text-gray-100 mb-6">
            {t('services.pageTitle') || 'خدماتنا'}
          </h1>
          <p className="text-xl text-center text-dark-light dark:text-gray-300 max-w-3xl mx-auto">
            {t('services.pageDescription') || 'نقدم حلولاً إعلامية متكاملة بجودة عالية واحترافية'}
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 bg-white dark:bg-gray-900 transition-colors" aria-labelledby="services-heading">
        <div className="container mx-auto px-4">
          <h2 id="services-heading" className="sr-only">{t('services.title') || 'خدماتنا'}</h2>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, i) => (
                <CardSkeleton key={i} />
              ))}
            </div>
          ) : error && services.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-red-500 dark:text-red-400 text-lg mb-4">{error}</p>
              <button
                onClick={fetchServices}
                className="px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
              >
                إعادة المحاولة
              </button>
            </div>
          ) : (
            <ScrollReveal animation="fadeIn" stagger={0.1}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" role="list">
                {services.map((service) => (
                  <div key={service.id} role="listitem">
                    <ServiceCard
                      title={service.title}
                      description={service.description || ''}
                      icon={service.icon || undefined}
                      image={service.image || undefined}
                      slug={service.slug}
                    />
                  </div>
                ))}
              </div>
            </ScrollReveal>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800 transition-colors">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-dark dark:text-gray-100 mb-4">
            {t('services.cta.title') || 'هل تريد معرفة المزيد؟'}
          </h2>
          <p className="text-lg text-dark-light dark:text-gray-300 mb-8">
            {t('services.cta.description') || 'تواصل معنا لمعرفة كيف يمكننا مساعدتك'}
          </p>
          <Link href="/contact">
            <button className="px-8 py-3 bg-primary-500 text-white font-semibold rounded-lg hover:bg-primary-600 dark:hover:bg-primary-700 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2">
              {t('services.cta.button') || 'اتصل بنا'}
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
}
