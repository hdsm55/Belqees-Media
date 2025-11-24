'use client';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type Lenis from 'lenis';

/**
 * Integrate GSAP ScrollTrigger with Native Scroll
 * لا نستخدم Lenis للـ scroll - نستخدم native scroll فقط
 * Lenis فقط للـ integration مع ScrollTrigger
 */
export function integrateGSAPWithLenis(lenis: Lenis | null) {
    if (!lenis || typeof window === 'undefined') return;

    // استخدام native scroll event بدلاً من Lenis scroll
    // هذا يضمن أن ScrollTrigger يعمل مع native scroll
    let ticking = false;
    const handleScroll = () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                ScrollTrigger.update();
                ticking = false;
            });
            ticking = true;
        }
    };

    // استخدام window scroll بدلاً من Lenis scroll
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Refresh ScrollTrigger when ready
    ScrollTrigger.refresh();

    // Return cleanup function
    return () => {
        window.removeEventListener('scroll', handleScroll);
    };
}

/**
 * Setup GSAP ScrollTrigger with Native Scroll
 * لا نستخدم Lenis للـ scroll - نستخدم native scroll فقط
 */
export function setupScrollTriggerWithLenis(lenis: Lenis | null) {
    if (typeof window === 'undefined') return () => { };

    // Register ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // Integrate with native scroll (لا نستخدم Lenis للـ scroll)
    const scrollCleanup = integrateGSAPWithLenis(lenis);

    // Refresh on resize
    const handleResize = () => {
        ScrollTrigger.refresh();
    };

    window.addEventListener('resize', handleResize);

    return () => {
        scrollCleanup?.();
        window.removeEventListener('resize', handleResize);
    };
}

