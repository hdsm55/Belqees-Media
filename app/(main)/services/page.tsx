import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'الخدمات - Belqees Media',
  description: 'خدمات Belqees Media في الإنتاج الإعلامي والبث المباشر. نقدم البث المباشر، إنتاج الفعاليات، الإنتاج الإعلامي، تصميم الاستوديوهات، الاستشارات التقنية، والتدريب والتطوير.',
  keywords: ['خدمات', 'بث مباشر', 'إنتاج إعلامي', 'فعاليات', 'استوديوهات', 'استشارات تقنية'],
  openGraph: {
    title: 'الخدمات - Belqees Media',
    description: 'خدمات Belqees Media في الإنتاج الإعلامي والبث المباشر',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'الخدمات - Belqees Media',
    description: 'خدمات Belqees Media في الإنتاج الإعلامي والبث المباشر',
  },
  alternates: {
    canonical: '/services',
  },
};

export default function ServicesPage() {
  const services = [
    {
      title: 'البث المباشر',
      description: 'بث سلس متعدد المنصات مع جودة عالية واستقرار ممتاز',
      icon: '📺',
    },
    {
      title: 'إنتاج الفعاليات المباشرة',
      description: 'تنفيذ تقني كامل للمؤتمرات والمنتديات والفعاليات الكبرى',
      icon: '🎬',
    },
    {
      title: 'الإنتاج الإعلامي',
      description: 'برامج تلفزيونية، فيديوهات ترويجية، وثائقيات، ومحتوى إعلامي متنوع',
      icon: '🎥',
    },
    {
      title: 'تصميم وإعداد الاستوديوهات',
      description: 'حلول متكاملة لتصميم وتجهيز الاستوديوهات بأحدث التقنيات',
      icon: '🎙️',
    },
    {
      title: 'الاستشارات التقنية',
      description: 'استشارات متخصصة في التقنيات الإعلامية وأنظمة البث',
      icon: '💡',
    },
    {
      title: 'التدريب والتطوير',
      description: 'برامج تدريبية متخصصة لتطوير مهارات الفريق في المجال الإعلامي',
      icon: '📚',
    },
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-bold text-center text-dark mb-6">خدماتنا</h1>
          <p className="text-xl text-center text-dark-light max-w-3xl mx-auto">
            نقدم حلولاً إعلامية متكاملة بجودة عالية واحترافية
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-lg shadow-sm hover:shadow-lg transition-shadow border border-gray-100"
              >
                <div className="text-5xl mb-4">{service.icon}</div>
                <h3 className="text-2xl font-bold text-dark mb-4">{service.title}</h3>
                <p className="text-dark-light leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-dark mb-4">هل تريد معرفة المزيد؟</h2>
          <p className="text-lg text-dark-light mb-8">
            تواصل معنا لمعرفة كيف يمكننا مساعدتك
          </p>
          <Link href="/contact">
            <button className="px-8 py-3 bg-primary-500 text-white font-semibold rounded-lg hover:bg-primary-600 transition-colors">
              اتصل بنا
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
}

