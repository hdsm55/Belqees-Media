'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface ParallaxProps {
  children: React.ReactNode;
  speed?: number; // Positive = moves slower, Negative = moves faster
  direction?: 'up' | 'down';
  className?: string;
}

export default function Parallax({
  children,
  speed = 0.5,
  direction = 'up',
  className = '',
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current || typeof window === 'undefined') return;

    const element = ref.current;
    const yValue = direction === 'up' ? speed * 100 : -speed * 100;

    const scrollTrigger = ScrollTrigger.create({
      trigger: element,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
      animation: gsap.to(element, {
        y: yValue,
        ease: 'none',
      }),
    });

    return () => {
      scrollTrigger.kill();
    };
  }, [speed, direction]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

