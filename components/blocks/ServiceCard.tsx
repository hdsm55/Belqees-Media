'use client';

import Link from 'next/link';
import Image from 'next/image';
import CornerBrackets from '@/components/atoms/CornerBrackets';
import { ReactNode } from 'react';
import { useTranslation } from '@/hooks/useTranslation';

interface ServiceCardProps {
  title: string;
  description: string;
  icon?: string | ReactNode;
  image?: string;
  slug?: string;
}

export default function ServiceCard({
  title,
  description,
  icon,
  image,
  slug,
}: ServiceCardProps) {
  const { t } = useTranslation();
  const content = (
    <div className="relative bg-white dark:bg-gray-800 p-6 md:p-8 rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-gray-700 group h-full flex flex-col hover:border-dark dark:hover:border-gray-500">
      {/* Corner Brackets */}
      <CornerBrackets />
      {icon && (
        <div className="mb-4 md:mb-6 group-hover:scale-105 transition-transform duration-300 flex items-center justify-center">
          {typeof icon === 'string' ? (
            <span className="text-4xl md:text-5xl">{icon}</span>
          ) : (
            <div className="w-16 h-16 md:w-20 md:h-20 text-dark dark:text-gray-100">
              {icon}
            </div>
          )}
        </div>
      )}
      {image && (
        <div className="relative w-full h-40 md:h-48 mb-4 md:mb-6 rounded-lg overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, 50vw"
            loading="lazy"
            quality={80}
          />
        </div>
      )}
      <h3 className="text-lg md:text-xl font-heading font-semibold text-dark dark:text-gray-100 mb-3 md:mb-4 group-hover:text-primary-500 dark:group-hover:text-primary-400 transition-colors">
        {title}
      </h3>
      <p className="text-sm md:text-base font-sans text-dark-light dark:text-gray-300 flex-grow leading-relaxed">
        {description}
      </p>
      {slug && (
        <div className="mt-4 md:mt-6">
          <span className="text-sm md:text-base text-primary-500 dark:text-primary-400 font-medium group-hover:underline inline-flex items-center gap-2">
            {t('common.learnMore')}
            <span className="group-hover:translate-x-1 transition-transform duration-300">
              →
            </span>
          </span>
        </div>
      )}
    </div>
  );

  if (slug) {
    return (
      <Link href={`/services/${slug}`} className="block h-full">
        {content}
      </Link>
    );
  }

  return content;
}
