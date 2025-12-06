'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import ScrollReveal from '@/components/animations/ScrollReveal';
import { useTranslation } from '@/hooks/useTranslation';
import CornerBrackets from '@/components/atoms/CornerBrackets';

// Import Swiper styles
import 'swiper/css';

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
  const validClients = clients.filter(client => client.logo && client.logo.trim() !== '');

  // Duplicate clients multiple times to ensure loop works properly
  // Swiper needs enough slides for loop mode
  const duplicatedClients = [...validClients, ...validClients, ...validClients];

  // Continuous animation using requestAnimationFrame
  useEffect(() => {
    if (!swiperRef.current || validClients.length === 0) return;

    let animationFrameId: number;
    const speed = 0.3; // pixels per frame (adjust for speed)

    const animate = () => {
      if (!swiperRef.current) {
        animationFrameId = requestAnimationFrame(animate);
        return;
      }

      const currentTranslate = swiperRef.current.getTranslate();
      const newTranslate = currentTranslate - speed;

      // Get the width of one set of slides
      const slideWidth = swiperRef.current.width / (swiperRef.current.slides.length / 3);
      const resetPoint = -slideWidth * validClients.length;

      // Reset position when we've scrolled one full set
      if (newTranslate <= resetPoint) {
        swiperRef.current.setTranslate(0);
      } else {
        swiperRef.current.setTranslate(newTranslate);
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    // Start animation after a short delay to ensure Swiper is ready
    const timeoutId = setTimeout(() => {
      animationFrameId = requestAnimationFrame(animate);
    }, 500);

    return () => {
      clearTimeout(timeoutId);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [validClients.length]);

  if (validClients.length === 0) {
    return null;
  }

  // Render a single logo item
  const renderLogoItem = (client: ClientLogo) => {
    const content = (
      <div className="logo-wrapper relative border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-6 md:p-8 flex items-center justify-center h-40 md:h-52 w-full group" role="listitem">
        <CornerBrackets showOnHover={false} />
        <Image
          src={client.logo}
          alt={`${t('common.clientLogo')} ${client.name}`}
          width={280}
          height={140}
          style={{ width: 'auto', height: 'auto' }}
          className="partner-logo max-w-[240px] md:max-w-[300px] max-h-[120px] md:max-h-[140px] object-contain transition-all duration-500"
          loading="lazy"
          sizes="(max-width: 768px) 240px, 300px"
          onError={(e) => {
            console.error(`Failed to load image: ${client.logo}`);
          }}
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
    <section className="py-20 bg-gray-50 dark:bg-gray-800 transition-colors overflow-hidden" aria-labelledby="clients-heading">
      <div className="container mx-auto px-4">
        {displayTitle && (
          <div className="text-center mb-10 md:mb-12">
            <h2 id="clients-heading" className="text-2xl sm:text-3xl font-bold text-dark dark:text-gray-100 mb-3 md:mb-4">{displayTitle}</h2>
          </div>
        )}

        <ScrollReveal animation="fadeIn">
          <div className="relative w-full overflow-hidden">
            <Swiper
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
              }}
              modules={[Autoplay]}
              spaceBetween={24}
              slidesPerView="auto"
              loop={true}
              allowTouchMove={false}
              watchSlidesProgress={true}
              className="clients-swiper"
              breakpoints={{
                1: {
                  slidesPerView: 2,
                  spaceBetween: 16,
                },
                640: {
                  slidesPerView: 3,
                  spaceBetween: 20,
                },
                768: {
                  slidesPerView: 4,
                  spaceBetween: 24,
                },
                1024: {
                  slidesPerView: 5,
                  spaceBetween: 24,
                },
                1280: {
                  slidesPerView: 6,
                  spaceBetween: 24,
                },
              }}
            >
              {duplicatedClients.map((client, index) => (
                <SwiperSlide key={`${client.id}-${index}`} className="!w-auto">
                  {renderLogoItem(client)}
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
