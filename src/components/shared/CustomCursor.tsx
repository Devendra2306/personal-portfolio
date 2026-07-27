'use client';

import { useEffect, useRef, useState } from 'react';

export const CustomCursor = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  
  const [isTouchDevice, setIsTouchDevice] = useState(true); // Default true to prevent hydration mismatch, set false in effect if needed
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  
  // States for different hover effects
  const [hoverState, setHoverState] = useState<'default' | 'pointer' | 'text'>('default');
  
  const mouse = useRef({ x: -100, y: -100 });
  const ring = useRef({ x: -100, y: -100 });
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    // Check for touch devices
    const isTouch = ('ontouchstart' in window) || navigator.maxTouchPoints > 0 || window.matchMedia('(hover: none)').matches;
    setIsTouchDevice(isTouch);
    
    // Check for reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setIsReducedMotion(prefersReducedMotion);

    if (isTouch || prefersReducedMotion) return;

    // Add class to body to hide default cursor
    document.body.classList.add('cursor-active');

    // Initialize cursor position on first move
    let isInitialized = false;

    const onMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      
      if (!isInitialized) {
        ring.current.x = e.clientX;
        ring.current.y = e.clientY;
        isInitialized = true;
      }
      
      // Immediately update dot position
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
    };

    const animate = () => {
      // Lerp for ring
      ring.current.x += (mouse.current.x - ring.current.x) * 0.15;
      ring.current.y += (mouse.current.y - ring.current.y) * 0.15;
      
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.current.x}px, ${ring.current.y}px, 0)`;
      }
      
      rafId.current = requestAnimationFrame(animate);
    };

    // Hover effects
    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      if (
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') ||
        target.closest('button') ||
        target.closest('[data-cursor="pointer"]')
      ) {
        setHoverState('pointer');
      } else if (target.closest('[data-cursor="text"]')) {
        setHoverState('text');
      } else {
        setHoverState('default');
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseover', onMouseOver);
    
    // Initialize animation loop
    rafId.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', onMouseOver);
      if (rafId.current) cancelAnimationFrame(rafId.current);
      document.body.classList.remove('cursor-active');
    };
  }, []);

  if (isTouchDevice || isReducedMotion) return null;

  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
          body.cursor-active, 
          body.cursor-active * {
            cursor: none !important;
          }
        `
      }} />
      <div
        ref={dotRef}
        className="cursor-dot"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '8px',
          height: '8px',
          marginLeft: '-4px',
          marginTop: '-4px',
          backgroundColor: 'rgba(196, 145, 122, 0.8)', // #C4917A at 80% opacity
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9999,
          transform: 'translate3d(-100px, -100px, 0)',
          transition: 'width 0.2s ease, height 0.2s ease, margin 0.2s ease',
          ...(hoverState === 'pointer' && {
            width: '4px',
            height: '4px',
            marginLeft: '-2px',
            marginTop: '-2px',
          }),
        }}
      />
      <div
        ref={ringRef}
        className="cursor-ring"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '36px',
          height: '36px',
          marginLeft: '-18px',
          marginTop: '-18px',
          border: '1px solid',
          borderColor: hoverState !== 'default' ? 'rgba(196, 145, 122, 0.6)' : 'rgba(255, 255, 255, 0.3)',
          borderRadius: hoverState === 'text' ? '2px' : '50%',
          pointerEvents: 'none',
          zIndex: 9999,
          transform: 'translate3d(-100px, -100px, 0)',
          transition: 'width 0.2s ease, height 0.2s ease, margin 0.2s ease, border-color 0.2s ease, border-radius 0.2s ease, background-color 0.2s ease',
          ...(hoverState === 'pointer' && {
            width: '54px', // 36px * 1.5
            height: '54px',
            marginLeft: '-27px',
            marginTop: '-27px',
          }),
          ...(hoverState === 'text' && {
            width: '4px',
            height: '24px',
            marginLeft: '-2px',
            marginTop: '-12px',
            backgroundColor: 'rgba(196, 145, 122, 0.6)',
          }),
        }}
      />
    </>
  );
};
