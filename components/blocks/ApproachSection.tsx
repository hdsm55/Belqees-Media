'use client';

import Link from 'next/link';
import Image from 'next/image';
import ScrollReveal from '@/components/animations/ScrollReveal';
import Button from '@/components/atoms/Button';
import { useTranslation } from '@/hooks/useTranslation';

interface ApproachSectionProps {
  title?: string;
  description: string;
  image?: string;
  linkText?: string;
  linkHref?: string;
}

export default function ApproachSection({
  title,
  description,
  image,
  linkText,
  linkHref = '/about',
}: ApproachSectionProps) {
  const { t } = useTranslation();
  const displayTitle = title || t('approach.title');
  const displayLinkText = linkText || t('common.learnMore');
  return (
    <section className="py-20 bg-white dark:bg-gray-900 transition-colors">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <ScrollReveal animation="fadeInUp">
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-dark dark:text-gray-100 mb-4 md:mb-6">{displayTitle}</h2>
              <p className="text-sm sm:text-base md:text-lg text-dark-light dark:text-gray-300 leading-relaxed mb-6 md:mb-8">{description}</p>
              {linkHref && (
                <Link href={linkHref}>
                  <Button
                    variant="recording"
                    size="lg"
                    showRecordingDot={true}
                    showBrackets={true}
                    continuousGlow={true}
                  >
                    {displayLinkText}
                  </Button>
                </Link>
              )}
            </div>
          </ScrollReveal>

          {image && (
            <ScrollReveal animation="fadeInUp" delay={0.1}>
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800 group cursor-pointer border border-gray-200 dark:border-gray-700">
                <Image
                  src={image}
                  alt={displayTitle || 'About us'}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </ScrollReveal>
          )}
        </div>
      </div>
    </section>
  );
}

