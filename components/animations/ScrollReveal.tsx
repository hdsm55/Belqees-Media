'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface ScrollRevealProps {
  children: React.ReactNode;
  animation?: 'fadeIn' | 'fadeInUp' | 'fadeInDown' | 'scaleIn' | 'slideInLeft' | 'slideInRight';
  delay?: number;
  duration?: number;
  stagger?: number;
  className?: string;
  once?: boolean;
}

const animations = {
  fadeIn: { opacity: 0, y: 0 },
  fadeInUp: { opacity: 0, y: 50 },
  fadeInDown: { opacity: 0, y: -50 },
  scaleIn: { opacity: 0, scale: 0.8 },
  slideInLeft: { opacity: 0, x: -100 },
  slideInRight: { opacity: 0, x: 100 },
};

export default function ScrollReveal({
  children,
  animation = 'fadeInUp',
  delay = 0,
  duration = 0.6, // تقليل من 0.8 إلى 0.6
  stagger = 0,
  className = '',
  once = true,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

  useEffect(() => {
    if (!ref.current || typeof window === 'undefined') return;

    const element = ref.current;
    const childElements = Array.from(element.children);

    // Simplified animation for all devices - سريع وسلس
    // Use matchMedia for better performance and accuracy
    const isMobile = window.matchMedia('(max-width: 768px)').matches;

    // Simple fade for mobile - بدون ScrollTrigger لتوفير الأداء
    if (isMobile) {
      gsap.to(element, {
        opacity: 1,
        y: 0,
        x: 0,
        scale: 1,
        duration: 0.4,
        ease: 'power2.out',
        // Immediately set visible to avoid jumping if already in view
        onStart: () => {
          element.style.visibility = 'visible';
        }
      });
      return;
    }

    // If has multiple children, use stagger
    if (childElements.length > 1 && stagger > 0) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: element,
          start: 'top 90%', // أسرع trigger
          end: 'bottom 10%',
          toggleActions: once ? 'play none none none' : 'play none none reverse',
          // تحسينات الأداء
          markers: false,
          refreshPriority: -1,
          // تحسينات إضافية للأداء
          fastScrollEnd: true,
        },
      });

      childElements.forEach((child, index) => {
        tl.fromTo(
          child,
          animations[animation],
          {
            ...animations[animation],
            opacity: 1,
            x: 0,
            y: 0,
            scale: 1,
            duration: duration * 0.5, // تقليل المدة أكثر
            ease: 'power1.out', // أسرع easing
          },
          index * stagger
        );
      });
    } else {
      // Single element animation
      // Check if element is already in viewport - if so, animate immediately
      const rect = element.getBoundingClientRect();
      const isInViewport = rect.top < window.innerHeight && rect.bottom > 0;

      if (isInViewport) {
        // Element is already visible, animate immediately
        gsap.fromTo(
          element,
          animations[animation],
          {
            ...animations[animation],
            opacity: 1,
            x: 0,
            y: 0,
            scale: 1,
            duration: duration,
            delay,
            ease: 'power2.out',
          }
        );
      } else {
        // Element not in viewport, use ScrollTrigger
        const trigger = ScrollTrigger.create({
          trigger: element,
          start: 'top 92%', // Slightly lower start
          end: 'bottom 8%',
          toggleActions: once ? 'play none none none' : 'play none none reverse',
          animation: gsap.fromTo(
            element,
            animations[animation],
            {
              ...animations[animation],
              opacity: 1,
              x: 0,
              y: 0,
              scale: 1,
              duration: duration * 0.6,
              delay,
              ease: 'power1.out',
              clearProps: 'all', // Clean up after animation
              force3D: true, // Use GPU
            }
          ),
          refreshPriority: -1,
          fastScrollEnd: true,
          // Performance optimization
          onEnter: () => {
            if (element) element.style.willChange = 'transform, opacity';
          },
          onLeave: () => {
            if (element) element.style.willChange = 'auto';
          },
        });
        scrollTriggerRef.current = trigger;
      }
    }

    return () => {
      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill();
        scrollTriggerRef.current = null;
      } else {
        ScrollTrigger.getAll().forEach((trigger) => {
          if (trigger.vars.trigger === element) {
            trigger.kill();
          }
        });
      }
    };
  }, [animation, delay, duration, stagger, once]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

