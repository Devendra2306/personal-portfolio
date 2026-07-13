"use client";

import { type ReactNode } from "react";
import { motion } from "motion/react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/* ─── Types ────────────────────────────────────────────────────── */
interface SectionRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right";
}

/* ─── Direction → initial transform ───────────────────────────── */
function getInitialOffset(direction: "up" | "left" | "right") {
  switch (direction) {
    case "up":
      return { opacity: 0, y: 20 };
    case "left":
      return { opacity: 0, x: -20 };
    case "right":
      return { opacity: 0, x: 20 };
  }
}

/* ─── Component ────────────────────────────────────────────────── */
export function SectionReveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
}: SectionRevealProps) {
  const prefersReducedMotion = usePrefersReducedMotion();

  /* Static fallback — no motion wrapper at all */
  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  const initial = getInitialOffset(direction);

  return (
    <motion.div
      className={className}
      initial={initial}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.5,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      {children}
    </motion.div>
  );
}
