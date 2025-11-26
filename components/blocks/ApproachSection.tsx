'use client';

import Link from 'next/link';
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
        <div className="max-w-4xl mx-auto">
          <ScrollReveal animation="fadeInUp">
            <div className="text-right">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-dark dark:text-gray-100 mb-6 md:mb-8">{displayTitle}</h2>
              <p className="text-sm sm:text-base md:text-lg text-dark-light dark:text-gray-300 leading-relaxed mb-8 md:mb-10 max-w-2xl ml-auto">{description}</p>
              {linkHref && (
                <div className="flex justify-end">
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
                </div>
              )}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

