"use client";

/* ─── Types ────────────────────────────────────────────────────── */
interface StatusTagProps {
  status: "online" | "warning" | "error";
  label?: string;
  className?: string;
}

/* ─── Config ───────────────────────────────────────────────────── */
const STATUS_CONFIG = {
  online: { color: "#00FF9D", defaultLabel: "ONLINE" },
  warning: { color: "#FFB800", defaultLabel: "WARNING" },
  error: { color: "#FF3B5C", defaultLabel: "ERROR" },
} as const;

/* ─── Component ────────────────────────────────────────────────── */
export function StatusTag({
  status,
  label,
  className = "",
}: StatusTagProps) {
  const { color, defaultLabel } = STATUS_CONFIG[status];
  const text = label ?? defaultLabel;

  return (
    <span
      className={`inline-flex items-center gap-2 transition-[filter] duration-200 hover:brightness-110 ${className}`}
      role="status"
      aria-label={text}
    >
      {/* Animated dot — pulse disabled via CSS @media rule in globals.css */}
      <span
        className="status-dot animate-status-pulse"
        aria-hidden="true"
        style={{
          display: "inline-block",
          width: 4,
          height: 4,
          borderRadius: "50%",
          backgroundColor: color,
          boxShadow: `0 0 6px ${color}`,
          flexShrink: 0,
        }}
      />

      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.75rem",
          lineHeight: 1,
          letterSpacing: "0.05em",
          textTransform: "uppercase",
          color,
        }}
      >
        {text}
      </span>
    </span>
  );
}
