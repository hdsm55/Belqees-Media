'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/utils/cn';
import { type Locale, locales, defaultLocale } from '@/lib/i18n';

const languageNames: Record<Locale, string> = {
  ar: 'العربية',
  en: 'English',
  tr: 'Türkçe',
};

interface LanguageSwitcherProps {
  isScrolled?: boolean;
}

export default function LanguageSwitcher({ isScrolled = false }: LanguageSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentLocale, setCurrentLocale] = useState<Locale>(defaultLocale);

  useEffect(() => {
    // Get locale from localStorage
    const savedLocale = localStorage.getItem('locale') as Locale;
    if (savedLocale && locales.includes(savedLocale)) {
      setCurrentLocale(savedLocale);
    }
  }, []);

  const handleLanguageChange = (locale: Locale) => {
    // Save to localStorage
    localStorage.setItem('locale', locale);
    setCurrentLocale(locale);
    // Reload page to apply language change
    window.location.reload();
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex items-center gap-2 px-3 py-2 rounded-lg transition-colors",
          isScrolled
            ? "hover:bg-gray-100 dark:hover:bg-gray-800"
            : "hover:bg-white/10"
        )}
        aria-label="Change language"
        aria-expanded={isOpen}
      >
        <svg
          className={cn(
            "w-5 h-5 transition-colors",
            isScrolled ? "text-dark dark:text-gray-300" : "text-white"
          )}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
        </svg>
        <span className={cn(
          "text-sm font-medium hidden sm:block transition-colors",
          isScrolled ? "text-dark dark:text-gray-300" : "text-white"
        )}>
          {languageNames[currentLocale]}
        </span>
        <svg
          className={cn(
            'w-4 h-4 transition-all',
            isScrolled ? "text-dark dark:text-gray-300" : "text-white",
            isOpen ? 'rotate-180' : ''
          )}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute top-full right-0 mt-2 w-40 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-20 overflow-hidden">
            {locales.map((locale) => (
              <button
                key={locale}
                onClick={() => handleLanguageChange(locale)}
                className={cn(
                  'w-full text-right px-4 py-2 text-sm transition-colors',
                  currentLocale === locale
                    ? 'bg-primary-50 dark:bg-gray-700 text-primary-500 dark:text-primary-400 font-medium'
                    : 'text-dark dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                )}
              >
                {languageNames[locale]}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

