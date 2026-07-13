"use client";

import { type ReactNode, type MouseEvent, type KeyboardEvent } from "react";

/* ─── Types ────────────────────────────────────────────────────── */
interface GlowButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary";
  href?: string;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit";
}

/* ─── Component ────────────────────────────────────────────────── */
export function GlowButton({
  children,
  variant = "primary",
  href,
  onClick,
  className = "",
  type = "button",
}: GlowButtonProps) {
  const isPrimary = variant === "primary";

  /* ── Shared classes ── */
  const baseClasses = [
    "inline-flex items-center justify-center",
    "px-6 py-3",
    "rounded transition-all duration-300",
    "cursor-pointer select-none",
    /* Focus ring — visible, high-contrast, offset */
    "focus-visible:outline-2 focus-visible:outline-offset-2",
    isPrimary
      ? "focus-visible:outline-[#00F0FF]"
      : "focus-visible:outline-[#9D4EDD]",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  /* ── Variant-specific inline styles ── */
  const variantStyle: React.CSSProperties = isPrimary
    ? {
        border: "1px solid #00F0FF",
        color: "#00F0FF",
        background: "transparent",
        fontFamily: "var(--font-mono)",
        fontSize: "0.875rem",
        letterSpacing: "0.05em",
        textTransform: "uppercase",
      }
    : {
        border: "1px solid rgba(157, 78, 221, 0.5)",
        color: "#E8E8ED",
        background: "transparent",
        fontFamily: "var(--font-body)",
        fontSize: "0.875rem",
      };

  /* ── Hover handler ── */
  function handleMouseEnter(e: MouseEvent<HTMLElement>) {
    const el = e.currentTarget;
    if (isPrimary) {
      el.style.boxShadow =
        "0 0 20px rgba(0,240,255,0.3), inset 0 0 20px rgba(0,240,255,0.1)";
      el.style.color = "#FFFFFF";
      el.style.borderColor = "#00F0FF";
    } else {
      el.style.boxShadow = "0 0 20px rgba(157,78,221,0.3)";
      el.style.borderColor = "rgba(157, 78, 221, 1)";
    }
  }

  function handleMouseLeave(e: MouseEvent<HTMLElement>) {
    const el = e.currentTarget;
    el.style.boxShadow = "none";
    if (isPrimary) {
      el.style.color = "#00F0FF";
      el.style.borderColor = "#00F0FF";
    } else {
      el.style.borderColor = "rgba(157, 78, 221, 0.5)";
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
        href={href}
        target={target}
        rel={rel}
        className={baseClasses}
        style={variantStyle}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onKeyDown={handleKeyDown}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={baseClasses}
      style={variantStyle}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </button>
  );
}
