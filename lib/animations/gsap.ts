'use client';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

/**
 * GSAP Context Manager
 * Manages GSAP animations and cleanup
 */
export class GSAPContext {
    private context: gsap.Context | null = null;

    constructor() {
        if (typeof window !== 'undefined') {
            this.context = gsap.context(() => { });
        }
    }

    /**
     * Add animation to context
     */
    add(animation: gsap.core.Tween | gsap.core.Timeline) {
        // Context.add is not available in GSAP Context API
        // This method is kept for compatibility but does nothing
        // Animations are managed directly
    }

    /**
     * Create a timeline
     */
    timeline(vars?: gsap.TimelineVars): gsap.core.Timeline {
        return gsap.timeline(vars);
    }

    /**
     * Create a tween
     */
    to(targets: gsap.TweenTarget, vars: gsap.TweenVars): gsap.core.Tween {
        return gsap.to(targets, vars);
    }

    /**
     * Create a from tween
     */
    from(targets: gsap.TweenTarget, vars: gsap.TweenVars): gsap.core.Tween {
        return gsap.from(targets, vars);
    }

    /**
     * Create a fromTo tween
     */
    fromTo(
        targets: gsap.TweenTarget,
        fromVars: gsap.TweenVars,
        toVars: gsap.TweenVars
    ): gsap.core.Tween {
        return gsap.fromTo(targets, fromVars, toVars);
    }

    /**
     * Cleanup all animations
     */
    cleanup() {
        if (this.context) {
            this.context.revert();
            this.context = null;
        }
    }

    /**
     * Refresh ScrollTrigger
     */
    refresh() {
        if (typeof window !== 'undefined') {
            ScrollTrigger.refresh();
        }
    }
}

/**
 * Create a new GSAP Context
 */
export function createGSAPContext(): GSAPContext {
    return new GSAPContext();
}

/**
 * ScrollTrigger configuration
 */
export const scrollTriggerConfig = {
    start: 'top 80%',
    end: 'bottom 20%',
    toggleActions: 'play none none reverse',
    markers: false, // Set to true for debugging
};

/**
 * Common animation presets
 */
export const animations = {
    fadeIn: {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power2.out',
    },
    fadeInUp: {
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: 'power2.out',
    },
    fadeInDown: {
        opacity: 0,
        y: -50,
        duration: 0.8,
        ease: 'power2.out',
    },
    scaleIn: {
        opacity: 0,
        scale: 0.8,
        duration: 0.8,
        ease: 'back.out(1.7)',
    },
    slideInLeft: {
        opacity: 0,
        x: -100,
        duration: 0.8,
        ease: 'power2.out',
    },
    slideInRight: {
        opacity: 0,
        x: 100,
        duration: 0.8,
        ease: 'power2.out',
    },
};

