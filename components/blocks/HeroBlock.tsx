'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import Button from '@/components/atoms/Button';
import ParallaxBackground from '@/components/animations/ParallaxBackground';

interface HeroBlockProps {
  title: string;
  subtitle?: string;
  description?: string;
  ctaText?: string;
  ctaLink?: string;
  backgroundImage?: string;
  backgroundVideo?: string; // مسار الفيديو المحلي
  youtubeVideoId?: string; // YouTube Video ID (اختياري)
  videoLoop?: boolean; // تكرار الفيديو
  videoMuted?: boolean; // صامت
}

export default function HeroBlock({
  title,
  subtitle,
  description,
  ctaText = 'ابدأ الآن',
  ctaLink = '/contact',
  backgroundImage,
  backgroundVideo,
  youtubeVideoId,
  videoLoop = true,
  videoMuted = true,
}: HeroBlockProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const companyNameRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if elements exist
    if (!subtitleRef.current && !titleRef.current && !descriptionRef.current && !ctaRef.current) {
      return;
    }

    // Set initial state - إخفاء العناصر أولاً
    const elements = [
      companyNameRef.current,
      subtitleRef.current,
      titleRef.current,
      descriptionRef.current,
      ctaRef.current,
    ].filter(Boolean) as HTMLElement[];

    // Set initial state immediately
    gsap.set(elements, { opacity: 0 });

    // Simplified, fast, cinematic animation
    // Check if mobile
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

    // Simple fade-in for all devices - سريع وسلس
    gsap.to(elements, {
      opacity: 1,
      duration: 0.4,
      stagger: 0.05,
      ease: 'power1.out',
      delay: 0.1,
    });
  }, []);

  // Ensure video plays dynamically
  useEffect(() => {
    if (videoRef.current && backgroundVideo) {
      const video = videoRef.current;

      // Force play
      const playPromise = video.play();

      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            // Video is playing
          })
          .catch((error) => {
            // Auto-play was prevented
            // Try to play on user interaction
            const handleUserInteraction = () => {
              video.play();
              document.removeEventListener('click', handleUserInteraction);
              document.removeEventListener('touchstart', handleUserInteraction);
            };
            document.addEventListener('click', handleUserInteraction);
            document.addEventListener('touchstart', handleUserInteraction);
          });
      }

      // Ensure video loops
      video.loop = videoLoop !== false;
      video.muted = videoMuted !== false;

      // Handle video events
      video.addEventListener('loadeddata', () => {
        video.play().catch(() => {
          // Silent fail if autoplay is blocked
        });
      });

      // Ensure video continues playing if paused
      const checkPlaying = setInterval(() => {
        if (video.paused && !video.ended) {
          video.play().catch(() => {
            // Silent fail
          });
        }
      }, 1000);

      return () => {
        clearInterval(checkPlaying);
      };
    }
  }, [backgroundVideo, videoLoop, videoMuted]);

  return (
    <section className="relative min-h-[90vh] md:min-h-screen bg-white dark:bg-gray-900 overflow-hidden transition-colors">
      {/* Background Video or Image */}
      {backgroundVideo && (
        <div className="absolute inset-0 z-0">
          <video
            ref={videoRef}
            autoPlay
            loop={videoLoop}
            muted={videoMuted}
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover scale-105"
            style={{ filter: 'brightness(0.75) contrast(1.1)' }}
            onLoadedData={(e) => {
              const video = e.currentTarget;
              video.play().catch(() => {
                // Silent fail if autoplay is blocked
              });
            }}
            onPlay={() => {
              // Video is playing
            }}
            onPause={() => {
              // Try to resume if paused unexpectedly
              if (videoRef.current && !videoRef.current.ended) {
                setTimeout(() => {
                  videoRef.current?.play().catch(() => {
                    // Silent fail
                  });
                }, 100);
              }
            }}
          >
            <source src={backgroundVideo} type="video/mp4" />
            <source src={backgroundVideo.replace('.mp4', '.webm')} type="video/webm" />
            متصفحك لا يدعم الفيديو.
          </video>
          {/* Gradient Overlay - خفيف لإظهار الفيديو */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20" />
        </div>
      )}

      {youtubeVideoId && !backgroundVideo && (
        <div className="absolute inset-0 z-0">
          <iframe
            className="absolute inset-0 w-full h-full object-cover pointer-events-none scale-105"
            src={`https://www.youtube.com/embed/${youtubeVideoId}?autoplay=1&mute=${videoMuted ? 1 : 0}&loop=${videoLoop ? 1 : 0}&playlist=${youtubeVideoId}&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1`}
            allow="autoplay; encrypted-media"
            allowFullScreen
            style={{ border: 0, filter: 'brightness(0.75) contrast(1.1)' }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20" />
        </div>
      )}

      {backgroundImage && !backgroundVideo && !youtubeVideoId && (
        <ParallaxBackground speed={0.3} className="absolute inset-0">
          <div
            className="absolute inset-0 scale-105"
            style={{
              backgroundImage: `url(${backgroundImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: 'brightness(0.75) contrast(1.1) grayscale(100%)',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20" />
        </ParallaxBackground>
      )}

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full flex flex-col items-center justify-center min-h-[90vh] md:min-h-screen">
        <div className="max-w-5xl mx-auto w-full">
          <div className="text-center space-y-5 md:space-y-6 lg:space-y-8 flex flex-col items-center">
            {/* Company Name - بلقيس ميديا */}
            <div
              ref={companyNameRef}
              className={`opacity-0 text-sm sm:text-base md:text-lg lg:text-xl font-semibold tracking-wider uppercase ${backgroundVideo || youtubeVideoId || backgroundImage ? 'text-white/90 drop-shadow-lg' : 'text-primary-500 dark:text-primary-400'}`}
              style={{
                textShadow: backgroundVideo || youtubeVideoId || backgroundImage
                  ? '0 2px 8px rgba(0, 0, 0, 0.4)'
                  : 'none',
                letterSpacing: '0.15em',
              }}
            >
              بلقيس ميديا
            </div>

            {/* Title */}
            <h1
              ref={titleRef}
              className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold opacity-0 leading-tight tracking-tight w-full ${backgroundVideo || youtubeVideoId || backgroundImage ? 'text-white drop-shadow-2xl' : 'text-dark dark:text-gray-100'}`}
              style={{
                textShadow: backgroundVideo || youtubeVideoId || backgroundImage
                  ? '0 4px 20px rgba(0, 0, 0, 0.5), 0 2px 10px rgba(0, 0, 0, 0.3)'
                  : 'none',
              }}
            >
              {title}
            </h1>

            {/* Subtitle */}
            {subtitle && (
              <p
                ref={subtitleRef}
                className={`text-base sm:text-lg md:text-xl lg:text-2xl opacity-0 font-medium w-full ${backgroundVideo || youtubeVideoId || backgroundImage ? 'text-gray-100 drop-shadow-lg' : 'text-dark-light dark:text-gray-300'}`}
                style={{
                  textShadow: backgroundVideo || youtubeVideoId || backgroundImage
                    ? '0 2px 10px rgba(0, 0, 0, 0.4)'
                    : 'none',
                }}
              >
                {subtitle}
              </p>
            )}

            {/* Description */}
            {description && (
              <p
                ref={descriptionRef}
                className={`text-sm sm:text-base md:text-lg opacity-0 max-w-3xl mx-auto leading-relaxed w-full ${backgroundVideo || youtubeVideoId || backgroundImage ? 'text-gray-200 drop-shadow-md' : 'text-dark-light dark:text-gray-400'}`}
                style={{
                  textShadow: backgroundVideo || youtubeVideoId || backgroundImage
                    ? '0 1px 5px rgba(0, 0, 0, 0.3)'
                    : 'none',
                }}
              >
                {description}
              </p>
            )}

            {/* CTA Button - محاذاة في المنتصف */}
            <div ref={ctaRef} className="opacity-0 pt-2 flex justify-center w-full">
              <Link href={ctaLink} className="inline-block">
                <Button
                  variant="primary"
                  size="lg"
                  className="inline-block text-base sm:text-lg px-8 py-4 rounded-lg shadow-xl hover:shadow-primary/50 hover:scale-105 transition-all duration-300 font-semibold"
                  style={{
                    boxShadow: '0 8px 30px rgba(217, 0, 0, 0.4), 0 4px 12px rgba(217, 0, 0, 0.3)',
                  }}
                >
                  {ctaText}
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll Indicator - محاذاة في المنتصف تماماً - حركة سلسة */}
        {(backgroundVideo || youtubeVideoId || backgroundImage) && (
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex justify-center items-center">
            <div className="w-5 h-8 border border-white/60 rounded-full flex items-start justify-center pt-1.5">
              <div className="w-1 h-2 bg-white/80 rounded-full" style={{
                animation: 'scrollIndicator 2s ease-in-out infinite'
              }} />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

