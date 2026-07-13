'use client';

import { useState, useEffect, type RefObject } from 'react';

interface MousePosition {
  x: number;
  y: number;
  isInside: boolean;
}

const DEFAULT_POSITION: MousePosition = {
  x: 0.5,
  y: 0.5,
  isInside: false,
};

export function useMousePosition(
  ref: RefObject<HTMLElement | null>,
): MousePosition {
  const [position, setPosition] = useState<MousePosition>(DEFAULT_POSITION);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleMouseMove = (event: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const x = Math.min(Math.max((event.clientX - rect.left) / rect.width, 0), 1);
      const y = Math.min(Math.max((event.clientY - rect.top) / rect.height, 0), 1);

      setPosition({ x, y, isInside: true });
    };

    const handleMouseLeave = () => {
      setPosition(DEFAULT_POSITION);
    };

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [ref]);

  return position;
}
