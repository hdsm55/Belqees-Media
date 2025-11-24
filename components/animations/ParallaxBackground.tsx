'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface ParallaxBackgroundProps {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}

export default function ParallaxBackground({
  children,
  speed = 0.3,
  className = '',
}: ParallaxBackgroundProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current || typeof window === 'undefined') return;

    const element = ref.current;
    const trigger = element.parentElement || element;

    const scrollTrigger = ScrollTrigger.create({
      trigger,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
      animation: gsap.to(element, {
        y: speed * 100,
        ease: 'none',
      }),
    });

    return () => {
      scrollTrigger.kill();
    };
  }, [speed]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

