'use client';

import { useEffect, useState, useRef } from 'react';

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [outerPosition, setOuterPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isOnImage, setIsOnImage] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const innerCircleRef = useRef<HTMLDivElement>(null);
  const outerRingRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number>();
  const innerAnimationFrameRef = useRef<number>();
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  useEffect(() => {
    // إلغاء الكيرسر على الأجهزة المحمولة
    if (isMobile) return;

    // تتبع موقع الماوس - الدائرة الداخلية مباشرة، الخارجية بتأخير
    const handleMouseMove = (e: MouseEvent) => {
      // الدائرة الداخلية تتبع مباشرة بدون تأخير باستخدام requestAnimationFrame للأداء الأفضل
      if (innerAnimationFrameRef.current) {
        cancelAnimationFrame(innerAnimationFrameRef.current);
      }

      innerAnimationFrameRef.current = requestAnimationFrame(() => {
        if (innerCircleRef.current) {
          innerCircleRef.current.style.left = `${e.clientX}px`;
          innerCircleRef.current.style.top = `${e.clientY}px`;
        }
        setMousePosition({ x: e.clientX, y: e.clientY });
      });

      // الدائرة الخارجية تتحرك مباشرة بدون أي تأخير
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }

      animationFrameRef.current = requestAnimationFrame(() => {
        if (outerRingRef.current) {
          outerRingRef.current.style.left = `${e.clientX}px`;
          outerRingRef.current.style.top = `${e.clientY}px`;
        }
        setOuterPosition({
          x: e.clientX,
          y: e.clientY,
        });
      });
    };

    // تفاعل الضغط
    const handleMouseDown = () => {
      setIsClicking(true);
    };

    const handleMouseUp = () => {
      setIsClicking(false);
    };

    // تفاعل السحب
    const handleDragStart = () => {
      setIsDragging(true);
    };

    const handleDragEnd = () => {
      setIsDragging(false);
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

      // التحقق من النص القابل للسحب
      if (target.closest('p, span, div[contenteditable], input, textarea')) {
        const selection = window.getSelection();
        if (selection && selection.toString().length > 0) {
          setIsDragging(true);
        }
      }
    };

    // إخفاء الكيرسر الافتراضي
    document.body.style.cursor = 'none';

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('dragstart', handleDragStart);
    window.addEventListener('dragend', handleDragEnd);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('selectstart', handleDragStart);

    return () => {
      document.body.style.cursor = '';
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (innerAnimationFrameRef.current) {
        cancelAnimationFrame(innerAnimationFrameRef.current);
      }
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('dragstart', handleDragStart);
      window.removeEventListener('dragend', handleDragEnd);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('selectstart', handleDragStart);
    };
  }, [isMobile]);

  // إلغاء الكيرسر على الأجهزة المحمولة
  if (isMobile) return null;

  return (
    <>
      {/* الدائرة الداخلية - نقطة حمراء تلمع باستمرار (إيحاء حالة تسجيل) */}
      <div
        ref={innerCircleRef}
        className={`fixed pointer-events-none z-[999999] ${!isHovering ? 'recording-dot-pulse' : ''}`}
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
          width: isClicking ? '10px' : isHovering ? '26px' : isDragging ? '12px' : '12px',
          // الحفاظ على الشكل دائري دائماً حتى في حالة السحب
          height: isClicking ? '10px' : isHovering ? '26px' : isDragging ? '12px' : '12px',
          borderRadius: '50%',
          backgroundColor: isHovering ? 'rgba(255, 255, 255, 0.9)' : '#D90000',
          transform: 'translate(-50%, -50%)',
          mixBlendMode: isHovering ? 'difference' : 'normal',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition:
            'width 0.3s cubic-bezier(0.23, 1, 0.32, 1), height 0.3s cubic-bezier(0.23, 1, 0.32, 1), background-color 0.3s cubic-bezier(0.23, 1, 0.32, 1)',
          willChange: 'transform, opacity',
          opacity: isOnImage ? 0 : undefined,
          boxShadow: 'none',
        }}
      />

      {/* الدائرة الخارجية */}
      <div
        ref={outerRingRef}
        className="fixed pointer-events-none z-[999998]"
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
          width: isClicking ? '30px' : isHovering ? '60px' : '45px',
          height: isClicking ? '30px' : isHovering ? '60px' : '45px',
          borderRadius: '50%',
          border: '1px solid rgba(255, 255, 255, 0.6)',
          transform: 'translate(-50%, -50%)',
          transition: 'width 0.6s cubic-bezier(0.23, 1, 0.32, 1), height 0.6s cubic-bezier(0.23, 1, 0.32, 1), border-color 0.6s cubic-bezier(0.23, 1, 0.32, 1)',
          willChange: 'transform',
          opacity: isOnImage ? 0 : 1,
        }}
      />

      {/* نص "View" على الصور */}
      {isOnImage && (
        <div
          className="fixed pointer-events-none z-[999999] text-white text-sm font-medium"
          style={{
            left: mousePosition.x,
            top: mousePosition.y,
            transform: 'translate(-50%, -50%)',
            transition: 'opacity 0.3s cubic-bezier(0.23, 1, 0.32, 1)',
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

