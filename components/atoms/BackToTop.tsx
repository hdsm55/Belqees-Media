'use client';

import { useEffect, useState } from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp } from 'lucide-react';

export default function BackToTop() {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // Visibility threshold
      setIsVisible(window.scrollY > 400);

      // Calculate scroll progress percentage
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentProgress = (window.scrollY / totalScroll) * 100;
      setScrollProgress(currentProgress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const label = t('common.backToTop') || 'Back to top';

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          whileHover={{ scale: 1.1, translateY: -5 }}
          whileTap={{ scale: 0.9 }}
          onClick={scrollToTop}
          aria-label={label}
          title={label}
          className="fixed bottom-8 right-8 z-[99990] flex h-14 w-14 items-center justify-center rounded-full bg-white/80 text-primary-600 shadow-2xl backdrop-blur-md dark:bg-gray-900/80 dark:text-primary-400 border border-white/20 dark:border-gray-800/20"
        >
          {/* Progress Ring */}
          <svg className="absolute h-full w-full -rotate-90" viewBox="0 0 100 100">
            <circle
              className="text-gray-200/30 dark:text-gray-700/30"
              strokeWidth="4"
              stroke="currentColor"
              fill="transparent"
              r="45"
              cx="50"
              cy="50"
            />
            <motion.circle
              className="text-primary-500"
              strokeWidth="4"
              strokeDasharray="283"
              animate={{ strokeDashoffset: 283 - (283 * scrollProgress) / 100 }}
              transition={{ type: 'spring', damping: 20, stiffness: 100 }}
              strokeLinecap="round"
              stroke="currentColor"
              fill="transparent"
              r="45"
              cx="50"
              cy="50"
            />
          </svg>

          {/* Arrow Icon */}
          <ChevronUp className="relative z-10 h-6 w-6" />

          {/* Glow Effect */}
          <div className="absolute inset-0 -z-10 animate-pulse rounded-full bg-primary-500/20 blur-xl dark:bg-primary-500/10" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
