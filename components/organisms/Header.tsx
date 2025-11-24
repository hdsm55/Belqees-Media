'use client';

import Link from 'next/link';
import { useState } from 'react';
import { cn } from '@/utils/cn';
import ThemeToggle from '@/components/atoms/ThemeToggle';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { href: '/', label: 'الرئيسية' },
    { href: '/about', label: 'من نحن' },
    { href: '/services', label: 'الخدمات' },
    { href: '/events', label: 'الفعاليات' },
    { href: '/contact', label: 'اتصل بنا' },
  ];

  return (
    <header className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-md sticky top-0 z-[100] border-b border-gray-200 dark:border-gray-800 transition-all">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 md:gap-3 group"
            aria-label="Belqees Media Home"
          >
            <img
              src="/images/logo.avif"
              alt="Belqees Media Logo"
              className="h-10 md:h-12 w-auto transition-transform duration-300 group-hover:scale-105"
              width={120}
              height={48}
            />
            <span className="text-lg md:text-xl font-bold text-dark dark:text-gray-100 hidden sm:block transition-colors group-hover:text-primary-500 dark:group-hover:text-primary-400">
              بلقيس ميديا
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-4 lg:gap-6" aria-label="القائمة الرئيسية" role="navigation">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm lg:text-base text-dark-light dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors font-medium relative group"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-500 dark:bg-primary-400 transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
            <div className="ml-2 lg:ml-4 pl-2 lg:pl-4 border-r border-gray-200 dark:border-gray-700">
              <ThemeToggle />
            </div>
          </nav>

          {/* Mobile Menu Button & Theme Toggle */}
          <div className="md:hidden flex items-center gap-3">
            <ThemeToggle />
            <button
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? 'إغلاق القائمة' : 'فتح القائمة'}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
            >
              <svg
                className="w-6 h-6 text-dark dark:text-gray-300"
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

