"use client";

import { type ReactNode, type MouseEvent, type KeyboardEvent, useRef, useState, useCallback } from "react";

/* ─── Types ────────────────────────────────────────────────────── */
interface GlowButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary";
  href?: string;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
}

/* ─── Component ────────────────────────────────────────────────── */
export function GlowButton({
  children,
  variant = "primary",
  href,
  onClick,
  className = "",
  type = "button",
  disabled = false,
}: GlowButtonProps) {
  const isPrimary = variant === "primary";
  const ref = useRef<HTMLElement>(null);
  const [transform, setTransform] = useState("translate(0px, 0px)");

  /* ── Magnetic pull — shift toward cursor within 12px ── */
  const handleMouseMove = useCallback((e: MouseEvent<HTMLElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = (e.clientX - centerX) * 0.15;
    const deltaY = (e.clientY - centerY) * 0.25;
    const clampedX = Math.max(-12, Math.min(12, deltaX));
    const clampedY = Math.max(-8, Math.min(8, deltaY));
    setTransform(`translate(${clampedX}px, ${clampedY}px)`);
  }, []);

  const handleMouseLeave = useCallback((e: MouseEvent<HTMLElement>) => {
    setTransform("translate(0px, 0px)");
    const el = e.currentTarget;
    el.style.boxShadow = "none";
    if (isPrimary) {
      el.style.color = "#C4917A";
      el.style.borderColor = "#C4917A";
    } else {
      el.style.borderColor = "rgba(196, 145, 122, 0.35)";
    }
  }, [isPrimary]);

  /* ── Shared classes ── */
  const baseClasses = [
    "inline-flex items-center justify-center",
    "px-6 py-3",
    "rounded transition-all duration-300",
    "cursor-pointer select-none",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C4917A]",
    disabled ? "opacity-50 pointer-events-none" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  /* ── Variant-specific inline styles ── */
  const variantStyle: React.CSSProperties = isPrimary
    ? {
        border: "1px solid #C4917A",
        color: "#C4917A",
        background: "transparent",
        fontFamily: "var(--font-mono)",
        fontSize: "0.875rem",
        letterSpacing: "0.05em",
        textTransform: "uppercase",
        transform,
        transition: "all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
      }
    : {
        border: "1px solid rgba(196, 145, 122, 0.35)",
        color: "#E8E8ED",
        background: "transparent",
        fontFamily: "var(--font-body)",
        fontSize: "0.875rem",
        transform,
        transition: "all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
      };

  /* ── Hover handler ── */
  function handleMouseEnter(e: MouseEvent<HTMLElement>) {
    const el = e.currentTarget;
    if (isPrimary) {
      el.style.boxShadow =
        "0 0 20px rgba(196,145,122,0.25), inset 0 0 20px rgba(196,145,122,0.06)";
      el.style.color = "#FFFFFF";
      el.style.borderColor = "#C4917A";
    } else {
      el.style.boxShadow = "0 0 20px rgba(196,145,122,0.15)";
      el.style.borderColor = "rgba(196, 145, 122, 0.7)";
    }
  }

  /* Allow keyboard activation for <a> tags */
  function handleKeyDown(e: KeyboardEvent<HTMLElement>) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onClick?.();
    }
  }

  /* ── Render as <a> or <button> ── */
  if (href) {
    const isExternal = href.startsWith('http') || href.endsWith('.pdf');
    const target = isExternal ? '_blank' : undefined;
    const rel = isExternal ? 'noopener noreferrer' : undefined;

    return (
      <a
        ref={ref as React.RefObject<HTMLAnchorElement>}
        href={href}
        target={target}
        rel={rel}
        className={baseClasses}
        style={variantStyle}
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onKeyDown={handleKeyDown}
        data-cursor="pointer"
      >
        {children}
      </a>
    );
  }

  return (
    <button
      ref={ref as React.RefObject<HTMLButtonElement>}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={baseClasses}
      style={variantStyle}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      data-cursor="pointer"
    >
      {children}
    </button>
  );
}

