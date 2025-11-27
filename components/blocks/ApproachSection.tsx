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
        <div className="border border-black dark:border-gray-700">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* الصورة في القسم الأيسر */}
            {image ? (
              <ScrollReveal animation="fadeInUp" delay={0.1}>
                <div className="relative aspect-[4/3] overflow-hidden bg-gray-100 dark:bg-gray-800">
                  <Image
                    src={image}
                    alt={displayTitle || 'Our approach'}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    loading="lazy"
                  />
                  {/* نقطة حمراء في الزاوية العلوية اليسرى */}
                  <div className="absolute top-3 left-3 w-3 h-3 bg-[#D90000] rounded-full recording-dot-pulse" />
                </div>
              </ScrollReveal>
            ) : (
              <div className="relative aspect-[4/3] bg-gray-100 dark:bg-gray-800">
                {/* نقطة حمراء في الزاوية العلوية اليسرى */}
                <div className="absolute top-3 left-3 w-3 h-3 bg-[#D90000] rounded-full recording-dot-pulse" />
              </div>
            )}

            {/* النص في القسم الأيمن */}
            <ScrollReveal animation="fadeInUp">
              <div className="text-right p-8 md:p-12 lg:p-16">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-dark dark:text-gray-100 mb-4 md:mb-6">{displayTitle}</h2>
                <p className="text-sm sm:text-base md:text-lg text-dark-light dark:text-gray-300 leading-relaxed mb-6 md:mb-8">{description}</p>
                {linkHref && (
                  <Link href={linkHref} className="inline-block">
                    <Button
                      variant="simple"
                      size="lg"
                      showRecordingDot={true}
                      showBrackets={true}
                    >
                      {displayLinkText}
                    </Button>
                  </Link>
                )}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}

