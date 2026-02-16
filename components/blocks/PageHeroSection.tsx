'use client';

import Image from 'next/image';
import Button from '@/components/atoms/Button';
import Link from 'next/link';
import ScrollReveal from '@/components/animations/ScrollReveal';
import { useTranslation } from '@/hooks/useTranslation';

interface PageHeroSectionProps {
  title: string;
  titleKey?: string;
  subtitle?: string;
  subtitleKey?: string;
  description?: string;
  descriptionKey?: string;
  backgroundImage?: string;
  buttonText?: string;
  buttonTextKey?: string;
  buttonLink?: string;
  overlay?: boolean;
  className?: string;
}

export default function PageHeroSection({
  title,
  titleKey,
  subtitle,
  subtitleKey,
  description,
  descriptionKey,
  backgroundImage,
  buttonText,
  buttonTextKey,
  buttonLink,
  overlay = true,
  className = '',
}: PageHeroSectionProps) {
  const { t } = useTranslation();

  const resolveText = (key: string | undefined, fallback?: string) => {
    if (!key) return fallback;
    const value = t(key);
    return value === key ? fallback : value;
  };

  const resolvedTitle = resolveText(titleKey, title) || '';
  const resolvedSubtitle = resolveText(subtitleKey, subtitle);
  const resolvedDescription = resolveText(descriptionKey, description);
  const resolvedButtonText = resolveText(buttonTextKey, buttonText);
  // Removed GSAP animation - using ScrollReveal instead

  // Compact height like About page
  const heightClass = 'py-20 md:py-32';

  const hasBackground = !!backgroundImage;

  return (
    <section
      className={`relative ${heightClass} w-full overflow-hidden flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 transition-colors ${className}`}
      style={{ zIndex: 0 }}
    >
      {/* Background Image - Static Image Only */}
      {backgroundImage && (
        <div className="absolute inset-0 z-0">
          <Image
            src={backgroundImage}
            alt=""
            fill
            className="object-cover"
            priority
            quality={80}
            sizes="100vw"
            aria-hidden="true"
          />
          {overlay && (
            <div
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(to bottom right, rgba(0, 0, 0, 0.8), rgba(217, 0, 0, 0.3), rgba(0, 0, 0, 0.8))',
              }}
            />
          )}
        </div>
      )}

      {/* Gradient Overlay for dark background (when no image/video) */}
      {!hasBackground && overlay && (
        <>
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/40" />
        </>
      )}

      {/* Corner Brackets - مثل صفحة من نحن */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="opacity-30">
          <div
            className="absolute"
            style={{
              top: '16px',
              left: '16px',
              width: '40px',
              height: '40px',
              borderTop: '2px solid rgba(255, 255, 255, 1)',
              borderLeft: '2px solid rgba(255, 255, 255, 1)',
            }}
          />
          <div
            className="absolute"
            style={{
              top: '16px',
              right: '16px',
              width: '40px',
              height: '40px',
              borderTop: '2px solid rgba(255, 255, 255, 1)',
              borderRight: '2px solid rgba(255, 255, 255, 1)',
            }}
          />
          <div
            className="absolute"
            style={{
              bottom: '16px',
              left: '16px',
              width: '40px',
              height: '40px',
              borderBottom: '2px solid rgba(255, 255, 255, 1)',
              borderLeft: '2px solid rgba(255, 255, 255, 1)',
            }}
          />
          <div
            className="absolute"
            style={{
              bottom: '16px',
              right: '16px',
              width: '40px',
              height: '40px',
              borderBottom: '2px solid rgba(255, 255, 255, 1)',
              borderRight: '2px solid rgba(255, 255, 255, 1)',
            }}
          />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <ScrollReveal animation="fadeInUp" delay={0} once={true}>
          <div className="relative inline-block">
            <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-white opacity-50"></div>
            <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-white opacity-50"></div>
            <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-white opacity-50"></div>
            <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-white opacity-50"></div>
            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6 px-6 py-3"
              style={{
                textShadow:
                  '0 4px 20px rgba(0, 0, 0, 0.6), 0 2px 10px rgba(0, 0, 0, 0.4)',
              }}
            >
              {resolvedTitle}
            </h1>
          </div>
        </ScrollReveal>

        {/* Subtitle */}
        {resolvedSubtitle && (
          <ScrollReveal animation="fadeInUp" delay={0.2} once={true}>
            <p
              className="text-base md:text-lg lg:text-xl text-white text-opacity-90 mb-6 md:mb-8 max-w-2xl mx-auto leading-relaxed"
              style={{
                textShadow: '0 2px 10px rgba(0, 0, 0, 0.5)',
              }}
            >
              {resolvedSubtitle}
            </p>
          </ScrollReveal>
        )}

        {/* Description */}
        {resolvedDescription && (
          <ScrollReveal animation="fadeInUp" delay={0.3} once={true}>
            <p
              className="text-base md:text-lg text-white text-opacity-90 max-w-2xl mx-auto leading-relaxed"
              style={{
                textShadow: '0 1px 5px rgba(0, 0, 0, 0.4)',
              }}
            >
              {resolvedDescription}
            </p>
          </ScrollReveal>
        )}

        {/* Button */}
        {resolvedButtonText && buttonLink && (
          <ScrollReveal animation="fadeInUp" delay={0.4} once={true}>
            <div className="pt-4 flex justify-center">
              <Link href={buttonLink} className="inline-block">
                <Button
                  variant="recording"
                  size="lg"
                  showRecordingDot={true}
                  showBrackets={true}
                  continuousGlow={true}
                >
                  {resolvedButtonText}
                </Button>
              </Link>
            </div>
          </ScrollReveal>
        )}
      </div>
    </section>
  );
}
