'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import ScrollReveal from '@/components/animations/ScrollReveal';
import { useTranslation } from '@/hooks/useTranslation';
import CornerBrackets from '@/components/atoms/CornerBrackets';

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
  const trackRef = useRef<HTMLDivElement>(null);
  const firstCopyRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();
  const isPausedRef = useRef(false);

  // Filter out clients without logos for better display
  const validClients = clients.filter(client => client.logo && client.logo.trim() !== '');

  if (validClients.length === 0) {
    return null;
  }

  // Infinite scroll using JavaScript for perfect seamless loop
  useEffect(() => {
    const track = trackRef.current;
    const firstCopy = firstCopyRef.current;

    if (!track || !firstCopy) return;

    // Wait for images to load and calculate width
    const initAnimation = () => {
      // Calculate width including gap
      const firstCopyWidth = firstCopy.offsetWidth;
      const gap = 24; // 1.5rem = 24px
      const totalWidth = firstCopyWidth + gap;

      if (firstCopyWidth === 0) {
        // If width is 0, wait a bit and try again
        setTimeout(initAnimation, 100);
        return;
      }

      let position = 0;
      const speed = 1; // pixels per frame

      const animate = () => {
        if (!isPausedRef.current) {
          position -= speed;

          // When first copy is completely out (including gap), reset to 0 (seamless loop)
          if (Math.abs(position) >= totalWidth) {
            position = 0;
          }

          track.style.transform = `translateX(${position}px)`;
        }
        animationRef.current = requestAnimationFrame(animate);
      };

      animationRef.current = requestAnimationFrame(animate);
    };

    // Start animation after a short delay to ensure DOM is ready
    const timeoutId = setTimeout(initAnimation, 100);

    // Handle window resize
    const handleResize = () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      setTimeout(initAnimation, 100);
    };

    window.addEventListener('resize', handleResize);

    // Handle hover to pause animation
    const wrapper = track?.parentElement;

    if (wrapper) {
      const handleMouseEnter = () => {
        isPausedRef.current = true;
      };
      const handleMouseLeave = () => {
        isPausedRef.current = false;
      };

      wrapper.addEventListener('mouseenter', handleMouseEnter);
      wrapper.addEventListener('mouseleave', handleMouseLeave);

      return () => {
        clearTimeout(timeoutId);
        window.removeEventListener('resize', handleResize);
        wrapper.removeEventListener('mouseenter', handleMouseEnter);
        wrapper.removeEventListener('mouseleave', handleMouseLeave);
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }
      };
    }

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [validClients]);

  // Render a single logo item
  const renderLogoItem = (client: ClientLogo, uniqueKey: string) => {
    const content = (
      <div className="logo-wrapper relative border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-6 md:p-8 flex items-center justify-center h-40 md:h-52 flex-shrink-0 group" role="listitem">
        <CornerBrackets showOnHover={false} />
        <Image
          src={client.logo}
          alt={`${t('common.clientLogo')} ${client.name}`}
          width={280}
          height={140}
          className="partner-logo max-w-[240px] md:max-w-[300px] max-h-[120px] md:max-h-[140px] object-contain grayscale hover:grayscale-0 transition-all duration-500 opacity-80 hover:opacity-100"
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
          key={uniqueKey}
          href={client.url}
          target="_blank"
          rel="noopener noreferrer"
          className="block focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded flex-shrink-0"
          aria-label={`${t('common.visitWebsite')} ${client.name}`}
        >
          {content}
        </a>
      );
    }

    return <div key={uniqueKey} className="flex-shrink-0">{content}</div>;
  };

  // Create 2 identical copies for seamless infinite loop
  // When first copy scrolls out, second copy is in exact same position
  const firstCopy = validClients.map((client, index) => ({ client, key: `copy-1-${client.id}-${index}` }));
  const secondCopy = validClients.map((client, index) => ({ client, key: `copy-2-${client.id}-${index}` }));

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
            {/* Infinite scrolling container - seamless loop */}
            <div className="clients-carousel-wrapper">
              <div ref={trackRef} className="clients-carousel-track">
                {/* Copy 1 */}
                <div ref={firstCopyRef} className="clients-carousel-copy">
                  {firstCopy.map((item) => renderLogoItem(item.client, item.key))}
                </div>
                {/* Copy 2 - seamless duplicate */}
                <div className="clients-carousel-copy">
                  {secondCopy.map((item) => renderLogoItem(item.client, item.key))}
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

