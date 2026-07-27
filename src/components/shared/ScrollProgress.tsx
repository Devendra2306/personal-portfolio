'use client';

import { motion, useScroll, useSpring } from 'motion/react';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const prefersReducedMotion = usePrefersReducedMotion();

  const scaleXSpring = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const scrollProgress = prefersReducedMotion ? scrollYProgress : scaleXSpring;

  return (
    <motion.div
      className="fixed top-0 left-0 w-full h-[2px] z-50 pointer-events-none"
      style={{
        scaleX: scrollProgress,
        transformOrigin: '0%',
        background: 'linear-gradient(to right, #C4917A, #D4A896)',
        boxShadow: '0 0 10px rgba(196, 145, 122, 0.5)',
      }}
    />
  );
}
