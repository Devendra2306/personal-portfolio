"use client";

import { type ElementType, type ReactNode } from "react";

/* ─── Types ────────────────────────────────────────────────────── */
interface GlassPanelProps {
  children: ReactNode;
  className?: string;
  hoverable?: boolean;
  glowColor?: "cyan" | "purple";
  as?: any;
}

/* ─── Corner Bracket ───────────────────────────────────────────── */
type Corner = "tl" | "tr" | "bl" | "br";

function CornerBracket({
  corner,
  color,
}: {
  corner: Corner;
  color: string;
}) {
  const size = 12; // px – arm length
  const weight = "1px"; // stroke width

  const positionClasses: Record<Corner, string> = {
    tl: "top-0 left-0",
    tr: "top-0 right-0",
    bl: "bottom-0 left-0",
    br: "bottom-0 right-0",
  };

  /**
   * Each bracket is an L‑shape built from two border segments.
   * We set a border on exactly two adjacent sides and size the span
   * so the arms are 12 px long.
   */
  const borderClasses: Record<Corner, string> = {
    tl: "border-t border-l",
    tr: "border-t border-r",
    bl: "border-b border-l",
    br: "border-b border-r",
  };

  return (
    <span
      aria-hidden="true"
      className={`pointer-events-none absolute ${positionClasses[corner]} ${borderClasses[corner]}`}
      style={{
        width: size,
        height: size,
        borderColor: color,
        borderWidth: weight,
      }}
    />
  );
}

/* ─── Glass Panel ──────────────────────────────────────────────── */
export function GlassPanel({
  children,
  className = "",
  hoverable = false,
  glowColor = "cyan",
  as: Tag = "div",
}: GlassPanelProps) {
  const bracketColor =
    glowColor === "cyan"
      ? "rgba(0, 240, 255, 0.35)"
      : "rgba(157, 78, 221, 0.35)";

  const glowRgb =
    glowColor === "cyan" ? "0, 240, 255" : "157, 78, 221";

  return (
    <Tag
      className={[
        /* ── Layout ── */
        "relative rounded-lg",
        /* ── Glass surface ── */
        "backdrop-blur-[16px]",
        /* ── Hover state ── */
        hoverable &&
          "transition-all duration-300 hover:-translate-y-0.5",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={{
        background: "rgba(255, 255, 255, 0.03)",
        border: "1px solid rgba(0, 240, 255, 0.15)",
        ...(glowColor === "purple" && {
          borderColor: "rgba(157, 78, 221, 0.15)",
        }),
        ...(hoverable
          ? {
              /* Idle shadow – transitions on hover via inline + CSS */
              boxShadow: `0 0 0 transparent`,
            }
          : {}),
      }}
      onMouseEnter={
        hoverable
          ? (e: React.MouseEvent<HTMLElement>) => {
              (e.currentTarget as HTMLElement).style.boxShadow =
                `0 0 24px rgba(${glowRgb}, 0.25), inset 0 0 24px rgba(${glowRgb}, 0.06)`;
              (e.currentTarget as HTMLElement).style.borderColor =
                `rgba(${glowRgb}, 0.35)`;
            }
          : undefined
      }
      onMouseLeave={
        hoverable
          ? (e: React.MouseEvent<HTMLElement>) => {
              (e.currentTarget as HTMLElement).style.boxShadow =
                "0 0 0 transparent";
              (e.currentTarget as HTMLElement).style.borderColor =
                glowColor === "cyan"
                  ? "rgba(0, 240, 255, 0.15)"
                  : "rgba(157, 78, 221, 0.15)";
            }
          : undefined
      }
    >
      {/* HUD corner brackets */}
      <CornerBracket corner="tl" color={bracketColor} />
      <CornerBracket corner="tr" color={bracketColor} />
      <CornerBracket corner="bl" color={bracketColor} />
      <CornerBracket corner="br" color={bracketColor} />

      {children}
    </Tag>
  );
}
