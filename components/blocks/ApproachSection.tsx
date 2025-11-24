'use client';

import Link from 'next/link';
import ScrollReveal from '@/components/animations/ScrollReveal';
import Button from '@/components/atoms/Button';

interface ApproachSectionProps {
  title?: string;
  description: string;
  image?: string;
  linkText?: string;
  linkHref?: string;
}

export default function ApproachSection({
  title = 'نهجنا',
  description,
  image,
  linkText = 'اعرف المزيد',
  linkHref = '/about',
}: ApproachSectionProps) {
  return (
    <section className="py-20 bg-white dark:bg-gray-900 transition-colors">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <ScrollReveal animation="fadeInUp">
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-dark dark:text-gray-100 mb-4 md:mb-6">{title}</h2>
              <p className="text-sm sm:text-base md:text-lg text-dark-light dark:text-gray-300 leading-relaxed mb-6 md:mb-8">{description}</p>
              {linkHref && (
                <Link href={linkHref}>
                  <Button variant="outline" size="lg">
                    {linkText}
                  </Button>
                </Link>
              )}
            </div>
          </ScrollReveal>

          {image && (
            <ScrollReveal animation="fadeInUp" delay={0.1}>
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800 group cursor-pointer">
                <img
                  src={image}
                  alt={title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </ScrollReveal>
          )}
        </div>
      </div>
    </section>
  );
}

