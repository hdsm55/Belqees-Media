'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { useLenis } from '@/lib/animations/lenis';
import { setupScrollTriggerWithLenis } from '@/lib/animations/integration';

interface LenisProviderProps {
  children: React.ReactNode;
}

export default function LenisProvider({ children }: LenisProviderProps) {
  const lenis = useLenis();
  const pathname = usePathname();
  const rafIdRef = useRef<number | null>(null);
  const cleanupRef = useRef<(() => void) | null>(null);
  const initializedRef = useRef(false);

  useEffect(() => {
    // Setup GSAP ScrollTrigger مع native scroll
    // لا نستخدم Lenis للـ scroll - نستخدم native scroll فقط
    if (initializedRef.current) return;

    // Setup GSAP integration (مع native scroll)
    cleanupRef.current = setupScrollTriggerWithLenis(lenis);

    initializedRef.current = true;

    // Refresh ScrollTrigger بعد التحميل
    if (typeof window !== 'undefined') {
      setTimeout(() => {
        const { ScrollTrigger } = require('gsap/ScrollTrigger');
        ScrollTrigger.refresh();
      }, 100);
    }

    return () => {
      cleanupRef.current?.();
      initializedRef.current = false;
    };
  }, [lenis]);

  useEffect(() => {
    // Scroll to top on route change
    if (lenis && initializedRef.current) {
      lenis.scrollTo(0, { immediate: false, duration: 0.5 });
    }
  }, [pathname, lenis]);

  return <>{children}</>;
}

