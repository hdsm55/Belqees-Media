import arTranslations from '@/locales/ar/common.json';
import enTranslations from '@/locales/en/common.json';
import trTranslations from '@/locales/tr/common.json';

export type Locale = 'ar' | 'en' | 'tr';

const translations = {
  ar: arTranslations,
  en: enTranslations,
  tr: trTranslations,
} as const;

export function getTranslations(locale: Locale = 'ar') {
  return translations[locale];
}

export function t(locale: Locale, key: string): string {
  const keys = key.split('.');
  let value: any = translations[locale];

  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = value[k as keyof typeof value];
    } else {
      // Fallback to Arabic if key not found
      value = translations.ar;
      for (const fallbackKey of keys) {
        if (value && typeof value === 'object' && fallbackKey in value) {
          value = value[fallbackKey as keyof typeof value];
        } else {
          return key; // Return key if translation not found
        }
      }
      break;
    }
  }

  return typeof value === 'string' ? value : key;
}

export const defaultLocale: Locale = 'ar';
export const locales: Locale[] = ['ar', 'en', 'tr'];

