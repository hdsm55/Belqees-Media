import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'الفعاليات - Belqees Media',
  description: 'الفعاليات التي قامت Belqees Media بتغطيتها أو تنظيمها. أمثلة من الفعاليات الكبرى التي قمنا بتغطيتها إعلامياً.',
  keywords: ['فعاليات', 'مؤتمرات', 'منتديات', 'تغطية إعلامية', 'إنتاج فعاليات'],
  openGraph: {
    title: 'الفعاليات - Belqees Media',
    description: 'الفعاليات التي قامت Belqees Media بتغطيتها أو تنظيمها',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'الفعاليات - Belqees Media',
    description: 'الفعاليات التي قامت Belqees Media بتغطيتها أو تنظيمها',
  },
  alternates: {
    canonical: '/events',
  },
};

export default function EventsPage() {
  const events = [
    {
      title: 'الذكرى العاشرة لجائزة نوبل للسلام',
      description: 'تغطية إعلامية شاملة للحدث الكبير',
      date: '2023',
      image: null,
    },
    {
      title: 'مؤتمر الباحثين والخبراء اليمنيين',
      description: 'إنتاج وتنظيم كامل للمؤتمر',
      date: '2023',
      image: null,
    },
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-bold text-center text-dark mb-6">الفعاليات</h1>
          <p className="text-xl text-center text-dark-light max-w-3xl mx-auto">
            أمثلة من الفعاليات التي قمنا بتغطيتها أو تنظيمها
          </p>
        </div>
      </section>

      {/* Events Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {events.map((event, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow border border-gray-100 overflow-hidden"
              >
                {event.image ? (
                  <div className="aspect-video bg-gray-200">
                    <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                  </div>
                ) : (
                  <div className="aspect-video bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-400">صورة الفعالية</span>
                  </div>
                )}
                <div className="p-6">
                  <div className="text-sm text-primary-500 mb-2">{event.date}</div>
                  <h3 className="text-2xl font-bold text-dark mb-3">{event.title}</h3>
                  <p className="text-dark-light">{event.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

