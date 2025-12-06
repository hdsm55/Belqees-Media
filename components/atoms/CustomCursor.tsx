'use client';

import { useEffect, useState, useRef } from 'react';

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isOnImage, setIsOnImage] = useState(false);
  const innerCircleRef = useRef<HTMLDivElement>(null);
  const outerRingRef = useRef<HTMLDivElement>(null);
  const rafId = useRef<number | null>(null);
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  useEffect(() => {
    // إلغاء الكيرسر على الأجهزة المحمولة
    if (isMobile) return;

    // تهيئة الموضع الأولي
    const initPosition = () => {
      if (typeof window !== 'undefined') {
        const x = window.innerWidth / 2;
        const y = window.innerHeight / 2;
        setMousePosition({ x, y });

        if (innerCircleRef.current) {
          innerCircleRef.current.style.left = `${x}px`;
          innerCircleRef.current.style.top = `${y}px`;
        }
        if (outerRingRef.current) {
          outerRingRef.current.style.left = `${x}px`;
          outerRingRef.current.style.top = `${y}px`;
        }
      }
    };

    initPosition();

    // متغيرات للحركة السلسة
    let currentX = window.innerWidth / 2;
    let currentY = window.innerHeight / 2;
    let targetX = currentX;
    let targetY = currentY;

    // دالة لتحديث الموضع بشكل سلس
    const updatePosition = () => {
      // حساب المسافة بين الموضع الحالي والهدف
      const dx = targetX - currentX;
      const dy = targetY - currentY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      // إذا كانت المسافة صغيرة جداً، توقف
      if (distance < 0.1) {
        currentX = targetX;
        currentY = targetY;
        if (rafId.current) {
          cancelAnimationFrame(rafId.current);
          rafId.current = null;
        }
        return;
      }

      // حركة سلسة باستخدام easing
      const easing = 0.07; // قيمة أقل = حركة أسرع وأكثر استجابة
      currentX += dx * easing;
      currentY += dy * easing;

      // تحديث الموضع
      setMousePosition({ x: currentX, y: currentY });

      if (innerCircleRef.current) {
        innerCircleRef.current.style.left = `${currentX}px`;
        innerCircleRef.current.style.top = `${currentY}px`;
      }
      if (outerRingRef.current) {
        outerRingRef.current.style.left = `${currentX}px`;
        outerRingRef.current.style.top = `${currentY}px`;
      }

      // الاستمرار في التحديث
      rafId.current = requestAnimationFrame(updatePosition);
    };

    // تتبع موقع الماوس
    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;

      // بدء التحديث إذا لم يكن جارياً
      if (!rafId.current) {
        rafId.current = requestAnimationFrame(updatePosition);
      }
    };

    // تفاعل الضغط
    const handleMouseDown = () => {
      setIsClicking(true);
    };

    const handleMouseUp = () => {
      setIsClicking(false);
    };

    // التحقق من العناصر التفاعلية
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      // التحقق من الروابط والأزرار
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.closest('[role="button"]')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }

      // التحقق من الصور
      if (target.tagName === 'IMG' || target.closest('img')) {
        setIsOnImage(true);
      } else {
        setIsOnImage(false);
      }
    };

    // إخفاء الكيرسر الافتراضي
    document.body.style.cursor = 'none';

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseover', handleMouseOver);

    return () => {
      document.body.style.cursor = '';
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, [isMobile]);

  // إلغاء الكيرسر على الأجهزة المحمولة
  if (isMobile) return null;

  return (
    <>
      {/* الدائرة الداخلية - نقطة حمراء */}
      <div
        ref={innerCircleRef}
        className={`fixed pointer-events-none z-[999999] ${!isHovering ? 'recording-dot-pulse' : ''}`}
        style={{
          width: isClicking ? '10px' : isHovering ? '26px' : '12px',
          height: isClicking ? '10px' : isHovering ? '26px' : '12px',
          borderRadius: '50%',
          backgroundColor: isHovering ? 'rgba(255, 255, 255, 0.9)' : '#D90000',
          mixBlendMode: isHovering ? 'difference' : 'normal',
          transform: 'translate(-50%, -50%)',
          transition: 'width 0.2s ease-out, height 0.2s ease-out, background-color 0.2s ease-out',
          willChange: 'transform',
          opacity: isOnImage ? 0 : 1,
          boxShadow: 'none',
        }}
      />

      {/* الدائرة الخارجية */}
      <div
        ref={outerRingRef}
        className="fixed pointer-events-none z-[999998]"
        style={{
          width: isClicking ? '30px' : isHovering ? '60px' : '45px',
          height: isClicking ? '30px' : isHovering ? '60px' : '45px',
          borderRadius: '50%',
          border: '1px solid rgba(255, 255, 255, 0.6)',
          transform: 'translate(-50%, -50%)',
          transition: 'width 0.3s ease-out, height 0.3s ease-out, border-color 0.3s ease-out',
          willChange: 'transform',
          opacity: isOnImage ? 0 : 1,
        }}
      />

      {/* نص "View" على الصور */}
      {isOnImage && (
        <div
          className="fixed pointer-events-none z-[999999] text-white text-sm font-medium"
          style={{
            left: `${mousePosition.x}px`,
            top: `${mousePosition.y}px`,
            transform: 'translate(-50%, -50%)',
            transition: 'opacity 0.2s ease-out',
            willChange: 'transform',
            textShadow: '0 2px 8px rgba(0, 0, 0, 0.5)',
          }}
        >
          View
        </div>
      )}
    </>
  );
}
