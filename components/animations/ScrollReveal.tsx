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

    // Check if mobile - تبسيط animations على Mobile
    const isMobile = window.innerWidth < 768;
    if (isMobile) {
      // على Mobile: fade بسيط لكن سريع
      gsap.fromTo(
        element,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }
      );
      return;
    }

    // If has multiple children, use stagger
    if (childElements.length > 1 && stagger > 0) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: element,
          start: 'top 85%', // تقليل من 80% إلى 85% (أسرع)
          end: 'bottom 15%',
          toggleActions: once ? 'play none none none' : 'play none none reverse',
          // تحسينات الأداء
          markers: false,
          refreshPriority: -1, // أقل أولوية
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
            duration: duration * 0.8, // تقليل المدة
            ease: 'power2.out',
          },
          index * stagger
        );
      });
    } else {
      // Single element animation
      const trigger = ScrollTrigger.create({
        trigger: element,
        start: 'top 85%',
        end: 'bottom 15%',
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
            duration: duration * 0.8, // تقليل المدة
            delay,
            ease: 'power2.out',
          }
        ),
        refreshPriority: -1,
      });
      scrollTriggerRef.current = trigger;
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

