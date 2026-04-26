'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, FreeMode } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import ScrollReveal from '@/components/animations/ScrollReveal';
import { useTranslation } from '@/hooks/useTranslation';
import CornerBrackets from '@/components/atoms/CornerBrackets';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';

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
  const swiperRef = useRef<SwiperType | null>(null);

  // Filter out clients without logos for better display
  const validClients = clients.filter(
    client => client.logo && client.logo.trim() !== ''
  );

  // Duplicate clients multiple times to ensure loop works properly
  // Swiper needs enough slides for loop mode
  const duplicatedClients = [...validClients, ...validClients, ...validClients, ...validClients];


  if (validClients.length === 0) {
    return null;
  }

  // Render a single logo item
  const renderLogoItem = (client: ClientLogo) => {
    const content = (
      <div
        className="logo-wrapper relative border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-6 md:p-8 flex items-center justify-center h-32 md:h-40 w-56 md:w-64 group"
        role="listitem"
      >
        <CornerBrackets showOnHover={false} />
        <Image
          src={client.logo}
          alt={`${t('common.clientLogo')} ${client.name}`}
          width={200}
          height={100}
          className="partner-logo max-w-[160px] md:max-w-[200px] max-h-[80px] md:max-h-[100px] object-contain transition-all duration-500 grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100"
          loading="lazy"
          sizes="(max-width: 768px) 160px, 200px"
          quality={80}
        />
      </div>
    );

    if (client.url) {
      return (
        <a
          href={client.url}
          target="_blank"
          rel="noopener noreferrer"
          className="block focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded h-full"
          aria-label={`${t('common.visitWebsite')} ${client.name}`}
        >
          {content}
        </a>
      );
    }

    return content;
  };

  return (
    <section
      className="py-20 bg-white dark:bg-dark-900 transition-colors overflow-hidden"
      aria-labelledby="clients-heading"
    >
      <div className="container mx-auto px-4">
        {displayTitle && (
          <div className="text-center mb-16">
            <h2
              id="clients-heading"
              className="text-3xl md:text-5xl font-heading font-bold text-dark-900 dark:text-white mb-4"
            >
              {displayTitle}
            </h2>
            <div className="w-24 h-1 bg-primary-500 mx-auto rounded-full"></div>
          </div>
        )}

        <ScrollReveal animation="fadeIn">
          <div className="relative w-full overflow-hidden">
            <Swiper
              onSwiper={swiper => {
                swiperRef.current = swiper;
              }}
              modules={[Autoplay, FreeMode]}
              spaceBetween={30}
              slidesPerView="auto"
              loop={true}
              speed={5000}
              freeMode={true}
              autoplay={{
                delay: 0,
                disableOnInteraction: false,
                pauseOnMouseEnter: false,
              }}
              allowTouchMove={true}
              className="clients-swiper !overflow-visible"
              breakpoints={{
                1: {
                  spaceBetween: 20,
                },
                768: {
                  spaceBetween: 30,
                },
              }}
            >
              {duplicatedClients.map((client, index) => (
                <SwiperSlide key={`${client.id}-${index}`} className="!w-auto">
                  {renderLogoItem(client)}
                </SwiperSlide>
              ))}
            </Swiper>
            
            {/* Gradient Overlays for smooth edges */}
            <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white dark:from-dark-900 to-transparent z-10 pointer-events-none"></div>
            <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white dark:from-dark-900 to-transparent z-10 pointer-events-none"></div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
