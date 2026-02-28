"use client";
// components/Logo.tsx

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFire } from "@fortawesome/free-solid-svg-icons";

interface LogoProps {
  /** When true the logo fades out — stays in DOM to avoid layout reflow */
  hidden?: boolean;
}

export default function Logo({ hidden = false }: LogoProps) {
  return (
    <div
      className="fixed top-[max(16px,env(safe-area-inset-top))] left-3 z-50 transition-opacity duration-150"
      style={{
        opacity: hidden ? 0 : 1,
        pointerEvents: hidden ? "none" : "auto",
      }}
    >
      {/* Invisible SVG — defines the flame gradient used by the icon */}
      <svg width="0" height="0" className="absolute">
        <defs>
          {/* Fire: yellow base → orange body → red tip using oklch for perceptually smooth blend */}
          <linearGradient id="fire-gradient" x1="0%" y1="100%" x2="0%" y2="0%">
            {/* Yellow base - tightly constrained to the bottom for the "hottest" core */}
            <stop offset="0%" stopColor="oklch(0.85 0.18 90)" />

            {/* Orange body - hits peak orange at 40% to fill the wide base curves naturally */}
            <stop offset="40%" stopColor="oklch(0.70 0.19 50)" />

            {/* Red tip - smoothly gradients into red for the remaining top 60% */}
            <stop offset="100%" stopColor="oklch(0.55 0.22 27)" />
          </linearGradient>
        </defs>
      </svg>

      <h1
        className="flex items-center gap-1 font-extrabold text-xl tracking-tight"
        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
      >
        <FontAwesomeIcon
          icon={faFire}
          className="[&_path]:fill-[url(#fire-gradient)]"
        />
        <span
          style={{
            color: "white",
            textShadow: "0 1px 3px rgba(0,0,0,0.3)",
          }}
        >
          TrendBites
        </span>
      </h1>
    </div>
  );
}
