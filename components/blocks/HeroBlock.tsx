'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import Button from '@/components/atoms/Button';
import ParallaxBackground from '@/components/animations/ParallaxBackground';

interface HeroBlockProps {
  title: string;
  subtitle?: string;
  ctaText?: string;
  ctaLink?: string;
  backgroundImage?: string;
  backgroundVideo?: string; // مسار الفيديو المحلي
  youtubeVideoId?: string; // YouTube Video ID (اختياري)
  videoLoop?: boolean; // تكرار الفيديو
  videoMuted?: boolean; // صامت
  videoPoster?: string; // Poster image للفيديو (اختياري)
}

export default function HeroBlock({
  title,
  subtitle,
  ctaText = 'ابدأ الآن',
  ctaLink = '/contact',
  backgroundImage,
  backgroundVideo,
  youtubeVideoId,
  videoLoop = true,
  videoMuted = true,
  videoPoster,
}: HeroBlockProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if elements exist
    if (!subtitleRef.current && !titleRef.current && !ctaRef.current) {
      return;
    }

    // Set initial state - إخفاء العناصر أولاً
    const elements = [
      titleRef.current,
      subtitleRef.current,
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

  // Dynamic video loading with Intersection Observer
  useEffect(() => {
    if (videoRef.current && backgroundVideo) {
      const video = videoRef.current;

      // Hero is above the fold, so load immediately for faster start
      video.preload = 'auto';
      video.load();

      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Auto-play was prevented
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

      // Progressive loading: play when enough data is loaded
      video.addEventListener('canplay', () => {
        video.play().catch(() => {
          // Silent fail if autoplay is blocked
        });
      });

      // Ensure video continues playing if paused
      const checkPlaying = setInterval(() => {
        if (video.paused && !video.ended && video.readyState >= 2) {
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
    <section className="hero-section relative min-h-[90vh] md:min-h-screen bg-white dark:bg-gray-900 overflow-hidden transition-colors" style={{ zIndex: 0 }}>
      {/* Hero Corner Brackets - أركان الهيرو (متداخلة في مساحة الهيدر) */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 99998 }}>
        {/* Top Left - متداخلة في مساحة الهيدر */}
        <div
          className="absolute"
          style={{
            top: '16px',
            left: '16px',
            width: '40px',
            height: '40px',
            borderTop: '2px solid rgba(255, 255, 255, 1)',
            borderLeft: '2px solid rgba(255, 255, 255, 1)',
            boxShadow: '0 0 0 1px rgba(0, 0, 0, 0.3)',
          }}
        />
        {/* Top Right - متداخلة في مساحة الهيدر */}
        <div
          className="absolute"
          style={{
            top: '16px',
            right: '16px',
            width: '40px',
            height: '40px',
            borderTop: '2px solid rgba(255, 255, 255, 1)',
            borderRight: '2px solid rgba(255, 255, 255, 1)',
            boxShadow: '0 0 0 1px rgba(0, 0, 0, 0.3)',
          }}
        />
        {/* Bottom Left */}
        <div
          className="absolute"
          style={{
            bottom: '16px',
            left: '16px',
            width: '40px',
            height: '40px',
            borderBottom: '2px solid rgba(255, 255, 255, 1)',
            borderLeft: '2px solid rgba(255, 255, 255, 1)',
            boxShadow: '0 0 0 1px rgba(0, 0, 0, 0.3)',
          }}
        />
        {/* Bottom Right */}
        <div
          className="absolute"
          style={{
            bottom: '16px',
            right: '16px',
            width: '40px',
            height: '40px',
            borderBottom: '2px solid rgba(255, 255, 255, 1)',
            borderRight: '2px solid rgba(255, 255, 255, 1)',
            boxShadow: '0 0 0 1px rgba(0, 0, 0, 0.3)',
          }}
        />
      </div>

      {/* Background Video or Image */}
      {backgroundVideo && (
        <div className="absolute inset-0 z-0" style={{ zIndex: 0 }}>
          <video
            ref={videoRef}
            autoPlay
            loop={videoLoop}
            muted={videoMuted}
            playsInline
            preload="metadata"
            poster={videoPoster || backgroundImage}
            className="absolute inset-0 w-full h-full object-cover scale-105"
            style={{ filter: 'brightness(0.75) contrast(1.1)' }}
            onCanPlay={(e) => {
              // Start playing when enough data is loaded (progressive loading)
              const video = e.currentTarget;
              if (video.readyState >= 2) {
                video.play().catch(() => {
                  // Silent fail if autoplay is blocked
                });
              }
            }}
            onPlay={() => {
              // Video is playing
            }}
            onPause={() => {
              // Try to resume if paused unexpectedly
              if (videoRef.current && !videoRef.current.ended && videoRef.current.readyState >= 2) {
                setTimeout(() => {
                  videoRef.current?.play().catch(() => {
                    // Silent fail
                  });
                }, 100);
              }
            }}
            onWaiting={() => {
              // Video is buffering - this is normal for progressive loading
            }}
            onError={(e) => {
              // Fallback to poster image if video fails to load
              const video = e.currentTarget;
              if (videoPoster || backgroundImage) {
                video.style.display = 'none';
              }
            }}
          >
            <source src={backgroundVideo} type="video/mp4" />
            <source src={backgroundVideo.replace('.mp4', '.webm')} type="video/webm" />
            <p className="text-white">متصفحك لا يدعم الفيديو.</p>
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

      {/* Content - المحتوى */}
      <div className="absolute inset-0 z-[1] flex items-end justify-center pb-16 md:pb-24 lg:pb-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-4xl mx-auto">
            <div className="text-center space-y-6 md:space-y-8 lg:space-y-10 flex flex-col items-center justify-center">
              {/* Title - العنوان الرئيسي */}
              <h1
                ref={titleRef}
                className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading font-bold opacity-0 leading-tight tracking-tight w-full ${backgroundVideo || youtubeVideoId || backgroundImage ? 'text-white' : 'text-dark dark:text-gray-100'}`}
                style={{
                  textShadow: backgroundVideo || youtubeVideoId || backgroundImage
                    ? '0 4px 20px rgba(0, 0, 0, 0.6), 0 2px 10px rgba(0, 0, 0, 0.4)'
                    : 'none',
                }}
              >
                {title}
              </h1>

              {/* Subtitle - العنوان الفرعي */}
              {subtitle && (
                <p
                  ref={subtitleRef}
                  className={`text-sm sm:text-base md:text-lg lg:text-xl opacity-0 font-medium w-full max-w-3xl leading-relaxed ${backgroundVideo || youtubeVideoId || backgroundImage ? 'text-gray-100' : 'text-dark-light dark:text-gray-300'}`}
                  style={{
                    textShadow: backgroundVideo || youtubeVideoId || backgroundImage
                      ? '0 2px 10px rgba(0, 0, 0, 0.5)'
                      : 'none',
                  }}
                >
                  {subtitle}
                </p>
              )}

              {/* CTA Button - زر التواصل */}
              {ctaText && (
                <div ref={ctaRef} className="opacity-0 pt-4 flex justify-center w-full">
                  <Link href={ctaLink} className="inline-block">
                    <Button
                      variant="recording"
                      size="lg"
                      showRecordingDot={true}
                      showBrackets={true}
                      continuousGlow={true}
                    >
                      {ctaText}
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

