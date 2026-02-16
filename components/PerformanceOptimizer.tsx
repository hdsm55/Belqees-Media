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
      // Preload hero video optimized version (WebM is usually smaller)
      // Only preload if on home page where hero video is critical
      if (window.location.pathname === '/' || window.location.pathname === '/ar' || window.location.pathname === '/en' || window.location.pathname === '/tr') {
        // Preload the WebM version as it's the first source in HeroBlock
        appendLink('preload', '/videos-optimized/hero-video-720p.webm', 'video', 'video/webm');
      }

      // Preload logo - used everywhere
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
        'https://fonts.googleapis.com',
        'https://fonts.gstatic.com',
      ];

      domains.forEach(domain => {
        appendLink('dns-prefetch', domain);
      });
    };

    // Run optimizations after a short delay to not block initial render
    // Use requestIdleCallback if available for even less impact
    const runOptimizations = () => {
      preloadCriticalResources();
      prefetchNextPages();
      addDNSPrefetch();
    };

    if ('requestIdleCallback' in window) {
      (window as any).requestIdleCallback(() => {
        setTimeout(runOptimizations, 1500);
      });
    } else {
      setTimeout(runOptimizations, 2000);
    }
  }, []);

  return null;
}
