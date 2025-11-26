'use client';

import Link from 'next/link';
import { useTranslation } from '@/hooks/useTranslation';

/**
 * Skip to Content Link
 * Improves accessibility by allowing keyboard users to skip navigation
 */
export default function SkipToContent() {
  const { t } = useTranslation();
  return (
    <Link
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[999999] focus:px-4 focus:py-2 focus:bg-primary-500 focus:text-white focus:rounded focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary-300"
      aria-label={t('common.skipToContent')}
    >
      {t('common.skipToContent')}
    </Link>
  );
}

