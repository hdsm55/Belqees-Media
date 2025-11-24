import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import ar from '../locales/ar/common.json';
import en from '../locales/en/common.json';
import tr from '../locales/tr/common.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      ar: {
        translation: ar,
      },
      en: {
        translation: en,
      },
      tr: {
        translation: tr,
      },
    },
    lng: localStorage.getItem('language') || 'ar',
    fallbackLng: 'ar',
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });

export default i18n;

