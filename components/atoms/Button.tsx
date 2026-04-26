'use client';

import { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/utils/cn';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'video' | 'recording' | 'simple';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  children: ReactNode;
  showRecordingDot?: boolean; // إظهار دائرة التسجيل الحمراء
  showBrackets?: boolean; // إظهار إطار L-shaped brackets
  continuousGlow?: boolean; // لمعة مستمرة تلمع باستمرار
}

export default function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  showRecordingDot = false,
  showBrackets = false,
  continuousGlow = false,
  ...props
}: ButtonProps) {
  const baseStyles = 'font-medium rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 relative overflow-hidden';

  // تحديد ما إذا كان يجب إظهار التصميم الخاص بالتسجيل
  const childrenText = typeof children === 'string' ? children : '';
  const isRecordingStyle = variant === 'recording' || variant === 'video' ||
    showBrackets ||
    childrenText.toUpperCase().includes('PLAY') ||
    childrenText.toUpperCase().includes('VIDEO') ||
    childrenText.toUpperCase().includes('تشغيل') ||
    childrenText.toUpperCase().includes('SHOWREEL');

  const shouldShowDot = showRecordingDot || isRecordingStyle;
  const shouldShowBrackets = showBrackets || isRecordingStyle;
  const shouldGlow = continuousGlow || isRecordingStyle;

  const variants = {
    primary: 'bg-primary-500 text-white hover:bg-primary-600 dark:hover:bg-primary-700 focus:ring-primary-500 dark:bg-primary-500',
    secondary: 'bg-dark dark:bg-gray-800 text-white hover:bg-dark-light dark:hover:bg-gray-700 focus:ring-dark',
    outline: 'border-2 border-primary-500 dark:border-primary-400 text-primary-500 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 focus:ring-primary-500',
    ghost: 'text-primary-500 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 focus:ring-primary-500',
    video: cn(
      'relative border-2 border-white dark:border-white bg-transparent text-white uppercase tracking-wider',
      'flex items-center justify-center gap-3 px-6 py-3 rounded-none',
      'hover:bg-white/10 dark:hover:bg-white/10 hover:border-white dark:hover:border-white',
      'hover:shadow-[0_0_40px_rgba(255,255,255,0.6),0_0_80px_rgba(255,255,255,0.4),inset_0_0_20px_rgba(255,255,255,0.1)]',
      'dark:hover:shadow-[0_0_40px_rgba(255,255,255,0.6),0_0_80px_rgba(255,255,255,0.4),inset_0_0_20px_rgba(255,255,255,0.1)]',
      'hover:scale-[1.02]',
      'transition-all duration-300 ease-in-out',
      'backdrop-blur-sm',
      'focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent',
      'bg-black/20 dark:bg-black/20'
    ),
    recording: cn(
      'relative border-2 border-white dark:border-white bg-transparent text-white uppercase tracking-wider',
      'flex items-center justify-center gap-3 px-6 py-3 rounded-none',
      'hover:bg-white/10 dark:hover:bg-white/10 hover:border-white dark:hover:border-white',
      'hover:scale-[1.02]',
      'transition-all duration-300 ease-in-out',
      'backdrop-blur-sm',
      'focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent',
      'bg-black/20 dark:bg-black/20',
      // لمعة مستمرة
      shouldGlow && 'shadow-[0_0_20px_rgba(255,255,255,0.5),0_0_40px_rgba(255,255,255,0.3),inset_0_0_10px_rgba(255,255,255,0.1)]'
    ),
    simple: cn(
      'relative bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300',
      'flex items-center justify-center gap-2 px-6 py-3 rounded-lg',
      'hover:bg-gray-300 dark:hover:bg-gray-600',
      'transition-colors duration-300',
      'focus:ring-2 focus:ring-gray-400 focus:ring-offset-2',
      'font-medium'
    ),
  };

  const sizes = {
    sm: variant === 'video' || variant === 'recording' ? 'px-4 py-2 text-sm' : variant === 'simple' ? 'px-4 py-2 text-sm' : 'px-3 py-1.5 text-sm',
    md: variant === 'video' || variant === 'recording' ? 'px-6 py-3 text-base' : variant === 'simple' ? 'px-6 py-3 text-base' : 'px-4 py-2 text-base',
    lg: variant === 'video' || variant === 'recording' ? 'px-8 py-4 text-lg' : variant === 'simple' ? 'px-8 py-4 text-lg' : 'px-6 py-3 text-lg',
    xl: variant === 'video' || variant === 'recording' ? 'px-10 py-5 text-xl' : variant === 'simple' ? 'px-10 py-5 text-xl' : 'px-8 py-4 text-xl',
  };

  // إذا كان التصميم هو simple، نعرض التصميم البسيط مع الأقواس
  if (variant === 'simple') {
    return (
      <button
        className={cn(baseStyles, variants.simple, sizes[size], className)}
        aria-disabled={props.disabled}
        {...props}
      >
        {/* إطار L-shaped brackets */}
        {shouldShowBrackets && (
          <>
            {/* Top Left Bracket */}
            <div className="absolute top-0 left-0 w-6 h-6">
              <div className="absolute top-0 left-0 w-4 h-0.5 bg-gray-600 dark:bg-gray-400" />
              <div className="absolute top-0 left-0 w-0.5 h-4 bg-gray-600 dark:bg-gray-400" />
            </div>

            {/* Top Right Bracket */}
            <div className="absolute top-0 right-0 w-6 h-6">
              <div className="absolute top-0 right-0 w-4 h-0.5 bg-gray-600 dark:bg-gray-400" />
              <div className="absolute top-0 right-0 w-0.5 h-4 bg-gray-600 dark:bg-gray-400" />
            </div>

            {/* Bottom Left Bracket */}
            <div className="absolute bottom-0 left-0 w-6 h-6">
              <div className="absolute bottom-0 left-0 w-0.5 h-4 bg-gray-600 dark:bg-gray-400" />
              <div className="absolute bottom-0 left-0 w-4 h-0.5 bg-gray-600 dark:bg-gray-400" />
            </div>

            {/* Bottom Right Bracket */}
            <div className="absolute bottom-0 right-0 w-6 h-6">
              <div className="absolute bottom-0 right-0 w-0.5 h-4 bg-gray-600 dark:bg-gray-400" />
              <div className="absolute bottom-0 right-0 w-4 h-0.5 bg-gray-600 dark:bg-gray-400" />
            </div>
          </>
        )}

        {/* دائرة التسجيل الحمراء - على اليمين في RTL */}
        {shouldShowDot && (
          <span
            className="relative flex-shrink-0 w-3 h-3 rounded-full bg-[#D90000] z-10 recording-dot-pulse order-2"
            style={{
              boxShadow: 'none',
            }}
          />
        )}

        <span className="relative z-10 order-1">{children}</span>
      </button>
    );
  }

  // إذا كان التصميم هو recording أو video، نعرض التصميم الخاص
  if (isRecordingStyle) {
    const recordingVariant = (variant === 'recording' || variant === 'video') ? variant : 'video';
    return (
      <button
        className={cn(baseStyles, variants[recordingVariant], sizes[size], className)}
        aria-disabled={props.disabled}
        {...props}
      >
        {/* لمعة مستمرة تلمع باستمرار */}
        {shouldGlow && (
          <>
            {/* Shimmer effect */}
            <div
              className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent"
              style={{
                animation: 'shimmer 3s infinite',
              }}
            />
            {/* Continuous glow */}
            <div
              className="absolute inset-0 opacity-75"
              style={{
                background: 'radial-gradient(circle at center, rgba(255,255,255,0.3) 0%, transparent 70%)',
                animation: 'pulse-glow 2s ease-in-out infinite',
              }}
            />
          </>
        )}

        {/* إطار L-shaped brackets */}
        {shouldShowBrackets && (
          <>
            {/* Top Left Bracket */}
            <div className="absolute top-0 left-0 w-6 h-6">
              <div className="absolute top-0 left-0 w-4 h-0.5 bg-white" style={{ boxShadow: '0 0 8px rgba(255,255,255,0.8)' }} />
              <div className="absolute top-0 left-0 w-0.5 h-4 bg-white" style={{ boxShadow: '0 0 8px rgba(255,255,255,0.8)' }} />
            </div>

            {/* Top Right Bracket */}
            <div className="absolute top-0 right-0 w-6 h-6">
              <div className="absolute top-0 right-0 w-4 h-0.5 bg-white" style={{ boxShadow: '0 0 8px rgba(255,255,255,0.8)' }} />
              <div className="absolute top-0 right-0 w-0.5 h-4 bg-white" style={{ boxShadow: '0 0 8px rgba(255,255,255,0.8)' }} />
            </div>

            {/* Bottom Left Bracket */}
            <div className="absolute bottom-0 left-0 w-6 h-6">
              <div className="absolute bottom-0 left-0 w-0.5 h-4 bg-white" style={{ boxShadow: '0 0 8px rgba(255,255,255,0.8)' }} />
              <div className="absolute bottom-0 left-0 w-4 h-0.5 bg-white" style={{ boxShadow: '0 0 8px rgba(255,255,255,0.8)' }} />
            </div>

            {/* Bottom Right Bracket */}
            <div className="absolute bottom-0 right-0 w-6 h-6">
              <div className="absolute bottom-0 right-0 w-0.5 h-4 bg-white" style={{ boxShadow: '0 0 8px rgba(255,255,255,0.8)' }} />
              <div className="absolute bottom-0 right-0 w-4 h-0.5 bg-white" style={{ boxShadow: '0 0 8px rgba(255,255,255,0.8)' }} />
            </div>
          </>
        )}

        {/* دائرة التسجيل الحمراء */}
        {shouldShowDot && (
          <span
            className="relative flex-shrink-0 w-3 h-3 rounded-full bg-[#D90000] z-10 recording-dot-pulse"
            style={{
              boxShadow: 'none',
            }}
          />
        )}

        <span className="relative z-10 font-semibold text-sm sm:text-base">{children}</span>
      </button>
    );
  }

  // Default button styles
  const defaultVariant = variant || 'primary';
  return (
    <button
      className={cn(baseStyles, variants[defaultVariant as keyof typeof variants], sizes[size], className)}
      aria-disabled={props.disabled}
      {...props}
    >
      {children}
    </button>
  );
}
