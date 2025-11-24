import type { Metadata } from 'next';

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
    <div className="bg-white">
      {/* Hero Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-bold text-center text-dark mb-6">من نحن</h1>
          <p className="text-xl text-center text-dark-light max-w-3xl mx-auto">
            Belqees Media هي شركة إنتاج إعلامي متكاملة الخدمات تأسست عام 2015
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Introduction */}
            <div>
              <h2 className="text-3xl font-bold text-dark mb-4">عن الشركة</h2>
              <p className="text-lg text-dark-light leading-relaxed">
                Belqees Media هي شركة إنتاج إعلامي متكاملة الخدمات تأسست عام 2015، مكرسة لتقديم حلول عالية الجودة للقنوات التلفزيونية والمنصات الرقمية والفعاليات المباشرة.
              </p>
              <p className="text-lg text-dark-light leading-relaxed mt-4">
                نحن ملتزمون بالابتكار، وخدمة العملاء الاستثنائية، وأعلى معايير الأخلاق والنزاهة التحريرية.
              </p>
            </div>

            {/* Belqees Channel */}
            <div>
              <h2 className="text-3xl font-bold text-dark mb-4">قناة بلقيس</h2>
              <p className="text-lg text-dark-light leading-relaxed">
                قناة بلقيس (Belqees Channel) هي جزء من مجموعة Belqees Media، وتضم استوديوهات متطورة مجهزة بأحدث التقنيات الإعلامية.
              </p>
            </div>

            {/* Broadcast & Media Systems */}
            <div>
              <h2 className="text-3xl font-bold text-dark mb-4">أنظمة البث والإعلام</h2>
              <p className="text-lg text-dark-light leading-relaxed mb-4">
                نستخدم أحدث الأنظمة والتقنيات في مجال الإنتاج الإعلامي:
              </p>
              <ul className="list-disc list-inside space-y-2 text-dark-light text-lg">
                <li>Octopus Newsroom - نظام إدارة الأخبار</li>
                <li>Metus MAM - نظام إدارة المحتوى الإعلامي</li>
                <li>Brainstorm 3D - تقنيات الرسوم ثلاثية الأبعاد</li>
                <li>Adobe Creative Cloud - حزمة برامج الإنتاج الإبداعي</li>
              </ul>
            </div>

            {/* Team */}
            <div>
              <h2 className="text-3xl font-bold text-dark mb-4">فريق العمل</h2>
              <p className="text-lg text-dark-light leading-relaxed">
                فريقنا متعدد الجنسيات ومؤهل يضم مهندسين تقنيين، ومخرجين، ومحررين، ومستشارين إعلاميين، يعملون معاً لتقديم أفضل الحلول لعملائنا.
              </p>
            </div>

            {/* Gallery Placeholder */}
            <div>
              <h2 className="text-3xl font-bold text-dark mb-4">معرض الصور</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div
                    key={i}
                    className="aspect-square bg-gray-200 rounded-lg flex items-center justify-center"
                  >
                    <span className="text-gray-400">صورة {i}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
