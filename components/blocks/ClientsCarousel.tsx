'use client';

import ScrollReveal from '@/components/animations/ScrollReveal';

interface ClientLogo {
  id: string;
  name: string;
  logo: string;
  url?: string;
}

interface ClientsCarouselProps {
  clients: ClientLogo[];
  title?: string;
}

export default function ClientsCarousel({
  clients,
  title = 'الشركات التي وثقت بنا',
}: ClientsCarouselProps) {
  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-800 transition-colors">
      <div className="container mx-auto px-4">
        {title && (
          <div className="text-center mb-10 md:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-dark dark:text-gray-100 mb-3 md:mb-4">{title}</h2>
          </div>
        )}

        <ScrollReveal animation="fadeIn" stagger={0.05}>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center">
            {clients.map((client) => {
              const content = (
                <div className="logo-wrapper flex items-center justify-center h-24 px-4">
                  {client.logo ? (
                    <img
                      src={client.logo}
                      alt={client.name}
                      className="partner-logo max-w-[140px] max-h-[70px] object-contain grayscale hover:grayscale-0 transition-all duration-500 opacity-50 hover:opacity-100"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 dark:bg-gray-700 rounded flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-500 opacity-50 hover:opacity-100">
                      <span className="text-gray-400 dark:text-gray-500 text-sm">{client.name}</span>
                    </div>
                  )}
                </div>
              );

              if (client.url) {
                return (
                  <a
                    key={client.id}
                    href={client.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    {content}
                  </a>
                );
              }

              return <div key={client.id}>{content}</div>;
            })}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

