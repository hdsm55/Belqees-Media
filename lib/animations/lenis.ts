'use client';

import Lenis from 'lenis';
import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Lenis Smooth Scroll Configuration
 * محسّن - لا يعطل native scroll
 */
export const lenisConfig = {
    duration: 1.0,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical' as const,
    gestureOrientation: 'vertical' as const,
    smoothWheel: false, // تعطيل smooth wheel - نستخدم native scroll
    wheelMultiplier: 1.0,
    smoothTouch: false, // معطل على Mobile
    touchMultiplier: 2,
    infinite: false,
    // تحسينات الأداء
    lerp: 0.1,
    syncTouch: false,
};

/**
 * Initialize Lenis Smooth Scroll
 */
export function initLenis(): Lenis | null {
    if (typeof window === 'undefined') return null;

    const lenis = new Lenis(lenisConfig);

    // Animation loop will be managed by LenisProvider
    return lenis;
}

// Global Lenis instance (singleton)
let globalLenisInstance: Lenis | null = null;

/**
 * React Hook for Lenis
 * محسّن - يستخدم singleton pattern
 */
export function useLenis() {
    const pathname = usePathname();

    useEffect(() => {
        // Initialize Lenis once (singleton) - فقط مرة واحدة
        if (!globalLenisInstance && typeof window !== 'undefined') {
            globalLenisInstance = initLenis();
        }
    }, []); // فقط عند mount - لا نعيد الإنشاء

    // لا نقوم بـ scroll to top هنا - نتركه للـ Provider
    return globalLenisInstance;
}

/**
 * Scroll to element
 */
export function scrollToElement(
    lenis: Lenis | null,
    selector: string,
    options?: {
        offset?: number;
        duration?: number;
        easing?: (t: number) => number;
    }
) {
    if (!lenis) return;

    const element = document.querySelector(selector) as HTMLElement;
    if (element) {
        lenis.scrollTo(element, {
            offset: options?.offset || 0,
            duration: options?.duration || 1.2,
            easing: options?.easing,
        });
    }
}

/**
 * Scroll to top
 */
export function scrollToTop(
    lenis: Lenis | null,
    options?: {
        duration?: number;
        immediate?: boolean;
    }
) {
    if (!lenis) return;

    lenis.scrollTo(0, {
        duration: options?.duration || 1.2,
        immediate: options?.immediate || false,
    });
}

