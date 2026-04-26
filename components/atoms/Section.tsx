'use client';

import React from 'react';
import { cn } from '@/lib/utils/index';
import ScrollReveal from '@/components/animations/ScrollReveal';

interface SectionProps {
  id?: string;
  className?: string;
  containerClassName?: string;
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  centered?: boolean;
  dark?: boolean;
  animate?: boolean;
  spacing?: 'sm' | 'md' | 'lg' | 'none';
}

export default function Section({
  id,
  className,
  containerClassName,
  children,
  title,
  subtitle,
  centered = false,
  dark = false,
  animate = true,
  spacing = 'md',
}: SectionProps) {
  const spacingClasses = {
    sm: 'py-12 md:py-16',
    md: 'py-16 md:py-24',
    lg: 'py-24 md:py-32',
    none: 'py-0',
  };

  const Content = (
    <section
      id={id}
      className={cn(
        'relative transition-colors duration-300',
        spacingClasses[spacing],
        dark ? 'bg-dark-900 text-white' : 'bg-white text-dark-900 dark:bg-dark-900 dark:text-white',
        className
      )}
    >
      <div className={cn('container mx-auto px-4 sm:px-6 lg:px-8', containerClassName)}>
        {(title || subtitle) && (
          <div
            className={cn(
              'mb-12 md:mb-16 max-w-3xl',
              centered ? 'mx-auto text-center' : 'text-right'
            )}
          >
            {title && (
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-4 tracking-tight">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-lg md:text-xl text-dark-500 dark:text-dark-300 leading-relaxed font-sans">
                {subtitle}
              </p>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );

  if (animate) {
    return <ScrollReveal animation="fadeInUp">{Content}</ScrollReveal>;
  }

  return Content;
}
