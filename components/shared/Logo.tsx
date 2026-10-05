"use client";

import { cn } from "@/lib/utils";

interface LogoProps extends React.HTMLAttributes<HTMLDivElement> {
  showText?: boolean;
  isScrolled?: boolean;
  lightMode?: boolean; // Force light styling (e.g. for dark footers)
}

export function LogoIcon({ className, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("h-11 w-11 select-none", className)}
      {...props}
    >
      <defs>
        {/* Premium multi-stop metallic gold gradient */}
        <linearGradient id="premium-gold-grad" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#9C7A3C" />
          <stop offset="25%" stopColor="#DFBA73" />
          <stop offset="50%" stopColor="#FBF1D5" />
          <stop offset="75%" stopColor="#CBB067" />
          <stop offset="100%" stopColor="#8C682A" />
        </linearGradient>

        {/* Subtle dark gradient for depth */}
        <linearGradient id="premium-dark-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0F172A" />
          <stop offset="100%" stopColor="#1E293B" />
        </linearGradient>
      </defs>

      {/* 1. Academic Crest Shield Outline (Double Thin Line representing stability & standards) */}
      <path
        d="M 50 10 Q 78 12, 86 22 Q 86 55, 50 88 Q 14 55, 14 22 Q 22 12, 50 10 Z"
        stroke="url(#premium-gold-grad)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M 50 15 Q 73 17, 80 25 Q 80 51, 50 81 Q 20 51, 20 25 Q 27 17, 50 15 Z"
        stroke="url(#premium-gold-grad)"
        strokeWidth="1"
        strokeOpacity="0.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* 2. The Monogram 'A' (Designed as a soaring gothic archway & gateway to the UK) */}
      {/* Left pillar */}
      <path
        d="M 37 66 L 50 32"
        stroke="url(#premium-gold-grad)"
        strokeWidth="4"
        strokeLinecap="round"
      />
      {/* Right pillar */}
      <path
        d="M 50 32 L 63 66"
        stroke="url(#premium-gold-grad)"
        strokeWidth="4"
        strokeLinecap="round"
      />

      {/* 3. The Global Pathway / Celestial Swoosh (Dynamic curved bridge representing global recruitment) */}
      {/* An elegant orbital arc wrapping the 'A' crossbar, extending out of the A's legs */}
      <path
        d="M 28 54 Q 50 64, 72 54"
        stroke="url(#premium-gold-grad)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* 4. Horizon Foundation Line (represents grounded advisory and strong roots) */}
      <path
        d="M 34 72 Q 50 75, 66 72"
        stroke="url(#premium-gold-grad)"
        strokeWidth="1.5"
        strokeOpacity="0.6"
        strokeLinecap="round"
      />

      {/* 5. The Compass Star of Excellence (floating perfectly at the apex inside the crest) */}
      {/* Represents guidance, direction, and academic high-achievers */}
      <path
        d="M 50 18 Q 50 24, 44 24 Q 50 24, 50 30 Q 50 24, 56 24 Q 50 24, 50 18 Z"
        fill="url(#premium-gold-grad)"
      />
    </svg>
  );
}

export function Logo({
  showText = true,
  isScrolled = false,
  lightMode = false,
  className,
  ...props
}: LogoProps) {
  // If we are scrolling or forcing lightMode, we apply appropriate dark/light contrast text styles
  const isDarkNavbarMode = isScrolled && !lightMode;

  return (
    <div className={cn("inline-flex items-center gap-3.5 select-none", className)} {...props}>
      {/* Emblem Icon Container with refined premium look */}
      <div
        className={cn(
          "flex h-12 w-12 items-center justify-center rounded-2xl transition-all duration-300 ring-1",
          isDarkNavbarMode
            ? "bg-navy text-white ring-navy/10 shadow-soft"
            : "bg-white/10 text-white ring-white/10 backdrop-blur-md"
        )}
      >
        <LogoIcon className="h-7 w-7" />
      </div>

      {/* Brand Text Styling */}
      {showText && (
        <span className="leading-tight">
          <span
            className={cn(
              "block font-display text-xl font-bold tracking-tight transition-colors duration-300",
              isDarkNavbarMode ? "text-navy" : "text-white"
            )}
          >
            Akintom
          </span>
          <span
            className={cn(
              "block text-[9.5px] font-semibold uppercase tracking-[0.24em] transition-colors duration-300",
              isDarkNavbarMode ? "text-graphite/85" : "text-white/60"
            )}
          >
            Global Resources
          </span>
        </span>
      )}
    </div>
  );
}
