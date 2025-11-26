'use client';

import { useEffect } from 'react';

/**
 * Performance Optimizer Component
 * Adds performance optimizations like preloading, prefetching, and resource hints
 */
export default function PerformanceOptimizer() {
  useEffect(() => {
    // Preload critical resources
    const preloadCriticalResources = () => {
      // Preload hero video if exists
      const heroVideo = document.querySelector('video[src*="hero-video"]');
      if (heroVideo) {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'video';
        link.href = '/videos/hero-video.mp4';
        link.type = 'video/mp4';
        document.head.appendChild(link);
      }

      // Preload logo
      const logoLink = document.createElement('link');
      logoLink.rel = 'preload';
      logoLink.as = 'image';
      logoLink.href = '/images/logo.avif';
      logoLink.type = 'image/avif';
      document.head.appendChild(logoLink);
    };

    // Prefetch likely next pages
    const prefetchNextPages = () => {
      const prefetchLinks = ['/about', '/services', '/contact', '/portfolio'];

      prefetchLinks.forEach((href) => {
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = href;
        document.head.appendChild(link);
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

      domains.forEach((domain) => {
        const link = document.createElement('link');
        link.rel = 'dns-prefetch';
        link.href = domain;
        document.head.appendChild(link);
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

