'use client';

import { useEffect, useState } from 'react';
import { getTranslations, t, type Locale, defaultLocale } from '@/lib/i18n';

export function useTranslation() {
  const [locale, setLocale] = useState<Locale>(defaultLocale);

  useEffect(() => {
    // Get locale from localStorage or use default
    const savedLocale = localStorage.getItem('locale') as Locale;
    if (savedLocale && ['ar', 'en', 'tr'].includes(savedLocale)) {
      setLocale(savedLocale);
    }
  }, []);

  const translations = getTranslations(locale);

  const translate = (key: string): string => {
    return t(locale, key);
  };

  return {
    t: translate,
    locale,
    setLocale,
    translations,
  };
}

