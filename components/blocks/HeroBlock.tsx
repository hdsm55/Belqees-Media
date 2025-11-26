'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import Button from '@/components/atoms/Button';
import ParallaxBackground from '@/components/animations/ParallaxBackground';
import ViewportBrackets from '@/components/atoms/ViewportBrackets';

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

      // Set video to load only metadata initially (not the full video)
      video.preload = 'metadata';

      // Use Intersection Observer to load video only when visible
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              // Video is visible, start loading
              video.preload = 'auto';

              // Load video progressively
              const playPromise = video.play();

              if (playPromise !== undefined) {
                playPromise
                  .then(() => {
                    // Video is playing
                  })
                  .catch((error) => {
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

              // Unobserve after loading starts
              observer.unobserve(video);
            }
          });
        },
        {
          rootMargin: '50px', // Start loading 50px before video is visible
          threshold: 0.1,
        }
      );

      observer.observe(video);

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
        observer.disconnect();
        clearInterval(checkPlaying);
      };
    }
  }, [backgroundVideo, videoLoop, videoMuted]);

  return (
    <section className="hero-section relative min-h-[90vh] md:min-h-screen bg-white dark:bg-gray-900 overflow-hidden transition-colors pt-16 md:pt-20" style={{ zIndex: 0 }}>
      {/* Viewport Brackets - إطارات الكاميرا ثابتة داخل Hero Section */}
      <ViewportBrackets />

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

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-[1] w-full flex flex-col items-center justify-center min-h-[calc(90vh-4rem)] md:min-h-[calc(100vh-5rem)]">
        <div className="max-w-5xl mx-auto w-full">
          <div className="text-center space-y-6 md:space-y-8 lg:space-y-10 flex flex-col items-center">
            {/* Title - العنوان الرئيسي */}
            <h1
              ref={titleRef}
              className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold opacity-0 leading-[1.2] tracking-tight w-full max-w-4xl ${backgroundVideo || youtubeVideoId || backgroundImage ? 'text-white drop-shadow-2xl' : 'text-dark dark:text-gray-100'}`}
              style={{
                textShadow: backgroundVideo || youtubeVideoId || backgroundImage
                  ? '0 4px 20px rgba(0, 0, 0, 0.5), 0 2px 10px rgba(0, 0, 0, 0.3)'
                  : 'none',
                wordSpacing: '0.1em',
                letterSpacing: '-0.02em',
              }}
            >
              {title}
            </h1>

            {/* Subtitle - العنوان الفرعي */}
            {subtitle && (
              <p
                ref={subtitleRef}
                className={`text-base sm:text-lg md:text-xl lg:text-2xl opacity-0 font-medium w-full max-w-2xl leading-relaxed ${backgroundVideo || youtubeVideoId || backgroundImage ? 'text-gray-100 drop-shadow-lg' : 'text-dark-light dark:text-gray-300'}`}
                style={{
                  textShadow: backgroundVideo || youtubeVideoId || backgroundImage
                    ? '0 2px 10px rgba(0, 0, 0, 0.4)'
                    : 'none',
                  letterSpacing: '0.01em',
                }}
              >
                {subtitle}
              </p>
            )}

            {/* CTA Button - زر التواصل */}
            <div ref={ctaRef} className="opacity-0 pt-2 flex justify-center w-full">
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
          </div>
        </div>

      </div>
    </section>
  );
}

