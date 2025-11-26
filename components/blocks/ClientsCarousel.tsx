'use client';

import Image from 'next/image';
import ScrollReveal from '@/components/animations/ScrollReveal';
import { useTranslation } from '@/hooks/useTranslation';

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
  title,
}: ClientsCarouselProps) {
  const { t } = useTranslation();
  const displayTitle = title || t('clients.title');
  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-800 transition-colors" aria-labelledby="clients-heading">
      <div className="container mx-auto px-4">
        {displayTitle && (
          <div className="text-center mb-10 md:mb-12">
            <h2 id="clients-heading" className="text-2xl sm:text-3xl font-bold text-dark dark:text-gray-100 mb-3 md:mb-4">{displayTitle}</h2>
          </div>
        )}

        <ScrollReveal animation="fadeIn" stagger={0.05}>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center" role="list">
            {clients.map((client) => {
              const content = (
                <div className="logo-wrapper flex items-center justify-center h-24 px-4" role="listitem">
                  {client.logo ? (
                    <Image
                      src={client.logo}
                      alt={`${t('common.clientLogo')} ${client.name}`}
                      width={140}
                      height={70}
                      className="partner-logo max-w-[140px] max-h-[70px] object-contain grayscale hover:grayscale-0 transition-all duration-500 opacity-50 hover:opacity-100"
                      loading="lazy"
                      sizes="(max-width: 768px) 50vw, (max-width: 1024px) 25vw, 16vw"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 dark:bg-gray-700 rounded flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-500 opacity-50 hover:opacity-100" aria-label={client.name}>
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
                    className="block focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded"
                    aria-label={`${t('common.visitWebsite')} ${client.name}`}
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

