import { cn } from "@/lib/utils";

type LogoMarkProps = {
  className?: string;
  /** Filled navy tile, mainly for favicon-style usage */
  variant?: "filled" | "ghost";
  /** Colour treatment for different surfaces */
  tone?: "brand" | "onDark" | "onLight";
};

/**
 * Akintom monogram.
 *
 * A clean custom "A" with a single advisory route stroke. The restrained blue
 * accent keeps the education cue from the reference without making the mark busy.
 */
export function LogoMark({
  className,
  variant = "ghost",
  tone = "brand",
}: LogoMarkProps) {
  const primary = variant === "filled" || tone === "onDark" ? "#FFFFFF" : "#0B1F4D";
  const tileFill = tone === "onDark" ? "rgba(255,255,255,0.1)" : "#0B1F4D";
  const accent = "#18BDF7";
  const accentSoft = tone === "onDark" ? "rgba(24,189,247,0.62)" : "rgba(24,189,247,0.2)";

  return (
    <svg
      viewBox="0 0 56 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-hidden="true"
      className={cn("h-11 w-11 shrink-0", className)}
    >
      {variant === "filled" ? (
        <rect
          x="4"
          y="4"
          width="48"
          height="48"
          rx="15"
          fill={tileFill}
          className={cn(tone === "onDark" && "backdrop-blur-sm")}
        />
      ) : null}

      <path
        d="M14.2 43.2L26.85 13.55C27.26 12.6 28.74 12.6 29.15 13.55L41.8 43.2"
        stroke={primary}
        strokeWidth="6.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M19.8 32.5C25.35 29.2 31.05 27.45 37.4 27.3"
        stroke={accent}
        strokeWidth="4.2"
        strokeLinecap="round"
      />
      <path
        d="M35.15 29.55L38.65 27.18L35.02 25.02"
        stroke={accent}
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.75 39.8C11.28 37.42 13.25 35.3 15.55 33.55"
        stroke={accentSoft}
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <circle cx="28" cy="12.45" r="2.15" fill={accent} />
    </svg>
  );
}
