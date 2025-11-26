'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { cn } from '@/utils/cn';
import ThemeToggle from '@/components/atoms/ThemeToggle';
import LanguageSwitcher from '@/components/atoms/LanguageSwitcher';
import { useTranslation } from '@/hooks/useTranslation';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { t, locale } = useTranslation();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { href: '/', label: t('nav.home') },
    { href: '/about', label: t('nav.about') },
    { href: '/services', label: t('nav.services') },
    { href: '/events', label: t('nav.events') },
    { href: '/contact', label: t('nav.contact') },
  ];

  return (
    <header
      className={cn(
        'backdrop-blur-md shadow-md fixed top-0 left-0 right-0 z-[99999] border-b transition-all duration-300 w-full',
        isScrolled
          ? 'bg-white/80 dark:bg-gray-900/80 border-gray-200 dark:border-gray-800'
          : 'bg-transparent border-transparent'
      )}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 99999,
        display: 'block',
        visibility: 'visible',
        opacity: 1,
        width: '100%',
        minHeight: '64px',
        isolation: 'isolate',
        pointerEvents: 'auto',
      }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 md:gap-3 group"
            aria-label="Belqees Media Home"
          >
            <Image
              src="/images/logo.avif"
              alt="Belqees Media Logo"
              width={120}
              height={48}
              priority
              className={cn(
                "h-10 md:h-12 w-auto transition-all duration-300 group-hover:scale-105 border-0 outline-none",
                isScrolled
                  ? "brightness-0 dark:brightness-100"
                  : "brightness-0 invert"
              )}
              style={{
                filter: isScrolled ? undefined : 'brightness(0) invert(1)',
              }}
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-4 lg:gap-6" aria-label="القائمة الرئيسية" role="navigation">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-sm lg:text-base hover:text-primary-500 dark:hover:text-primary-400 transition-colors font-medium relative group",
                  isScrolled ? "text-dark-light dark:text-gray-300" : "text-white"
                )}
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-500 dark:bg-primary-400 transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
            <div className={cn(
              "ml-2 lg:ml-4 pl-2 lg:pl-4 flex items-center gap-2",
              isScrolled ? "border-r border-gray-200 dark:border-gray-700" : "border-r border-white/20"
            )}>
              <LanguageSwitcher isScrolled={isScrolled} />
              <ThemeToggle isScrolled={isScrolled} />
            </div>
          </nav>

          {/* Mobile Menu Button & Theme Toggle */}
          <div className="md:hidden flex items-center gap-3">
            <LanguageSwitcher isScrolled={isScrolled} />
            <ThemeToggle isScrolled={isScrolled} />
            <button
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? 'إغلاق القائمة' : 'فتح القائمة'}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
            >
              <svg
                className={cn(
                  "w-6 h-6 transition-colors",
                  isScrolled ? "text-dark dark:text-gray-300" : "text-white"
                )}
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <nav
          id="mobile-menu"
          className={cn(
            'md:hidden overflow-hidden transition-all duration-300 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800',
            isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          )}
          aria-label="القائمة الرئيسية"
          role="navigation"
        >
          <div className="py-4 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block px-4 py-3 text-base text-dark-light dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-gray-800 hover:text-primary-500 dark:hover:text-primary-400 transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      </div>
    </header>
  );
}

