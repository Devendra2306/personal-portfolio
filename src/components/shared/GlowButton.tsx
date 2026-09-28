"use client";

import { type ReactNode, type MouseEvent, type KeyboardEvent, useRef, useState, useCallback } from "react";
import toast from 'react-hot-toast';

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
  const isPrimary = variant === "primary" || variant === "mega";
  const ref = useRef<HTMLElement>(null);
  const [transform, setTransform] = useState("translate(0px, 0px) scale(1)");

  const handleMouseMove = useCallback((e: MouseEvent<HTMLElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = (e.clientX - centerX) * 0.1;
    const deltaY = (e.clientY - centerY) * 0.15;
    setTransform(`translate(${deltaX}px, ${deltaY}px) scale(1.02)`);
  }, []);

  const handleMouseLeave = useCallback((e: MouseEvent<HTMLElement>) => {
    setTransform("translate(0px, 0px) scale(1)");
    const el = e.currentTarget;
    if (isPrimary) {
      el.style.boxShadow = "0 0 0 1px rgba(255, 255, 255, 0.1), 0 2px 10px rgba(0, 0, 0, 0.5)";
      el.style.background = "rgba(255, 255, 255, 0.03)";
    } else {
      el.style.background = "transparent";
      el.style.boxShadow = "none";
    }
  }, [isPrimary]);

  const handleMouseEnter = useCallback((e: MouseEvent<HTMLElement>) => {
    const el = e.currentTarget;
    if (isPrimary) {
      el.style.boxShadow = "0 0 0 1px rgba(196, 145, 122, 0.5), 0 0 30px rgba(196, 145, 122, 0.2), inset 0 0 20px rgba(196, 145, 122, 0.1)";
      el.style.background = "rgba(196, 145, 122, 0.08)";
    } else {
      el.style.background = "rgba(255, 255, 255, 0.04)";
    }
  }, [isPrimary]);

  const baseClasses = [
    "group relative inline-flex items-center justify-center gap-2",
    "px-6 py-3 rounded-lg backdrop-blur-md",
    "transition-all duration-300 ease-out",
    "cursor-pointer select-none font-mono text-sm tracking-[0.08em] uppercase",
    disabled ? "opacity-40 pointer-events-none" : "",
    className,
  ].filter(Boolean).join(" ");

  let variantStyle: React.CSSProperties = { transform, transition: "transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94), box-shadow 0.3s ease, background 0.3s ease" };
  
  if (isPrimary) {
    variantStyle = {
      ...variantStyle,
      color: "#FFFFFF",
      background: "rgba(255, 255, 255, 0.03)",
      boxShadow: "0 0 0 1px rgba(255, 255, 255, 0.1), 0 2px 10px rgba(0, 0, 0, 0.5)",
    };
  } else {
    variantStyle = {
      ...variantStyle,
      color: "rgba(255, 255, 255, 0.6)",
      background: "transparent",
      boxShadow: "none",
    };
  }

  function handleKeyDown(e: KeyboardEvent<HTMLElement>) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      if (onClick) onClick();
      else if (!href || href === '#' || href === '') toast('🚀 That feature is coming soon!');
    }
  }

  const handleBtnClick = (e: MouseEvent<HTMLButtonElement>) => {
    if (onClick) onClick();
    else toast('🚀 That feature is coming soon!', { icon: '✨' });
  };

  const InnerContent = () => (
    <>
      <span className="relative z-10 flex items-center justify-center gap-2">{children}</span>
      <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
           style={{ background: 'radial-gradient(circle at center, rgba(255,255,255,0.1) 0%, transparent 60%)' }} />
    </>
  );

  if (href && href !== '#' && href !== '') {
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
        onClick={onClick}
      >
        <InnerContent />
      </a>
    );
  }

  return (
    <button
      ref={ref as React.RefObject<HTMLButtonElement>}
      type={type}
      onClick={handleBtnClick}
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
