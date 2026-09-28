"use client";

import { type ReactNode, type MouseEvent, type KeyboardEvent, useRef, useState, useCallback } from "react";

/* ── Types ── */
interface GlowButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "mega";
  href?: string;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
}

/* ── Component ── */
export function GlowButton({
  children,
  variant = "primary",
  href,
  onClick,
  className = "",
  type = "button",
  disabled = false,
}: GlowButtonProps) {
  const isMega = variant === "mega";
  const isPrimary = variant === "primary";
  const ref = useRef<HTMLElement>(null);
  const [transform, setTransform] = useState("translate(0px, 0px) scale(1)");

  /* ── Magnetic pull ── */
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
    setTransform(`translate(${clampedX}px, ${clampedY}px) scale(1.02)`);
  }, []);

  const handleMouseLeave = useCallback((e: MouseEvent<HTMLElement>) => {
    setTransform("translate(0px, 0px) scale(1)");
    const el = e.currentTarget;
    
    if (isMega) {
      el.style.boxShadow = "0 4px 20px rgba(196, 145, 122, 0.35), inset 0 1px 1px rgba(255, 255, 255, 0.2)";
    } else if (isPrimary) {
      el.style.boxShadow = "none";
      el.style.color = "#C4917A";
      el.style.borderColor = "#C4917A";
    } else {
      el.style.boxShadow = "none";
      el.style.borderColor = "rgba(196, 145, 122, 0.35)";
    }
  }, [isPrimary, isMega]);

  const handleMouseEnter = useCallback((e: MouseEvent<HTMLElement>) => {
    const el = e.currentTarget;
    if (isMega) {
      el.style.boxShadow = "0 8px 30px rgba(196, 145, 122, 0.5), inset 0 1px 1px rgba(255, 255, 255, 0.3)";
    } else if (isPrimary) {
      el.style.boxShadow = "0 0 20px rgba(196,145,122,0.25), inset 0 0 20px rgba(196,145,122,0.06)";
      el.style.color = "#FFFFFF";
      el.style.borderColor = "#C4917A";
    } else {
      el.style.boxShadow = "0 0 20px rgba(196,145,122,0.15)";
      el.style.borderColor = "rgba(196, 145, 122, 0.7)";
    }
  }, [isPrimary, isMega]);

  /* ── Shared classes ── */
  const baseClasses = [
    "group relative overflow-hidden inline-flex items-center justify-center gap-2",
    isMega ? "px-8 py-4 font-body font-semibold rounded-full" : "px-6 py-3 rounded",
    "transition-all duration-300",
    "cursor-pointer select-none",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C4917A]",
    disabled ? "opacity-50 pointer-events-none" : "",
    className,
  ].filter(Boolean).join(" ");

  /* ── Variant-specific inline styles ── */
  let variantStyle: React.CSSProperties = { transform, transition: "all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)" };
  
  if (isMega) {
    variantStyle = {
      ...variantStyle,
      background: "linear-gradient(135deg, #D4A896 0%, #C4917A 100%)",
      color: "#000",
      boxShadow: "0 4px 20px rgba(196, 145, 122, 0.35), inset 0 1px 1px rgba(255, 255, 255, 0.2)",
      fontSize: "1rem",
      border: "none",
    };
  } else if (isPrimary) {
    variantStyle = {
      ...variantStyle,
      border: "1px solid #C4917A",
      color: "#C4917A",
      background: "transparent",
      fontFamily: "var(--font-mono)",
      fontSize: "0.875rem",
      letterSpacing: "0.05em",
      textTransform: "uppercase",
    };
  } else {
    variantStyle = {
      ...variantStyle,
      border: "1px solid rgba(196, 145, 122, 0.35)",
      color: "#E8E8ED",
      background: "transparent",
      fontFamily: "var(--font-body)",
      fontSize: "0.875rem",
    };
  }

  /* Allow keyboard activation for <a> tags */
  function handleKeyDown(e: KeyboardEvent<HTMLElement>) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onClick?.();
    }
  }

  const InnerContent = () => (
    <>
      <span className="relative z-10 flex items-center justify-center gap-2">{children}</span>
      {isMega && (
        <div 
          className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 group-hover:animate-[sweep_1.5s_ease-in-out_infinite]"
          style={{
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
            transform: "translateX(-100%) skewX(-15deg)",
          }}
        />
      )}
    </>
  );

  /* ── Render as <a> or <button> ── */
  if (href) {
    const isExternal = href.startsWith('http') || href.endsWith('.pdf');
    return (
      <a
        ref={ref as React.RefObject<HTMLAnchorElement>}
        href={href}
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noopener noreferrer' : undefined}
        className={baseClasses}
        style={variantStyle}
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onKeyDown={handleKeyDown}
        data-cursor="pointer"
      >
        <InnerContent />
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
      <InnerContent />
    </button>
  );
}
