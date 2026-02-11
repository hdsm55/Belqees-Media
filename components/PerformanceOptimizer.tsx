'use client';

import { useEffect } from 'react';

/**
 * Performance Optimizer Component
 * Adds performance optimizations like preloading, prefetching, and resource hints
 */
export default function PerformanceOptimizer() {
  useEffect(() => {
    const appendLink = (
      rel: string,
      href: string,
      as?: string,
      type?: string
    ) => {
      const selector = `link[rel="${rel}"][href="${href}"]`;
      if (document.head.querySelector(selector)) return;
      const link = document.createElement('link');
      link.rel = rel;
      link.href = href;
      if (as) link.as = as;
      if (type) link.type = type;
      document.head.appendChild(link);
    };

    // Preload critical resources
    const preloadCriticalResources = () => {
      // Preload hero video if exists
      const heroVideo = document.querySelector('video[src*="hero-video"], video source[src*="hero-video"]');
      if (heroVideo) {
        appendLink('preload', '/videos/hero-video.mp4', 'video', 'video/mp4');
      }

      // Preload logo
      appendLink('preload', '/images/logo.avif', 'image', 'image/avif');
    };

    // Prefetch likely next pages
    const prefetchNextPages = () => {
      const prefetchLinks = ['/about', '/services', '/contact', '/portfolio'];

      prefetchLinks.forEach(href => {
        appendLink('prefetch', href);
      });
    };

    // Add DNS prefetch for external domains
    const addDNSPrefetch = () => {
      const domains = [
        'https://www.youtube.com',
        'https://www.facebook.com',
        'https://www.instagram.com',
        'https://www.linkedin.com',
      ];

      domains.forEach(domain => {
        appendLink('dns-prefetch', domain);
      });
    };

    // Run optimizations after a short delay to not block initial render
    const timeoutId = setTimeout(() => {
      preloadCriticalResources();
      prefetchNextPages();
      addDNSPrefetch();
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, []);

  return null;
}
