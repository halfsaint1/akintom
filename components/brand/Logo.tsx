import Link from "next/link";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";
import { LogoMark } from "@/components/brand/LogoMark";

type LogoProps = {
  className?: string;
  /** onDark: hero/footer navy backgrounds. onLight: white navbar after scroll. */
  tone?: "onDark" | "onLight";
  showWordmark?: boolean;
  href?: string;
  onClick?: () => void;
};

export function Logo({
  className,
  tone = "onLight",
  showWordmark = true,
  href = "/",
  onClick,
}: LogoProps) {
  const content = (
    <>
      <LogoMark
        variant="ghost"
        tone={tone === "onDark" ? "onDark" : "brand"}
        className={cn(
          tone === "onDark" && "drop-shadow-[0_10px_24px_rgba(0,0,0,0.18)]",
          tone === "onLight" && "drop-shadow-[0_10px_24px_rgba(11,31,77,0.08)]",
        )}
      />
      {showWordmark ? (
        <span className="leading-tight">
          <span
            className={cn(
              "block font-display text-[1.35rem] font-extrabold tracking-[-0.045em] transition-colors",
              tone === "onDark" ? "text-white" : "text-navy",
            )}
          >
            {site.shortName}
          </span>
          <span
            className={cn(
              "mt-0.5 block text-[9px] font-bold uppercase tracking-[0.24em] transition-colors",
              tone === "onDark" ? "text-white/70" : "text-graphite",
            )}
          >
            Global Resources
          </span>
        </span>
      ) : null}
    </>
  );

  const classes = cn("inline-flex items-center gap-3", className);

  if (href) {
    return (
      <Link
        href={href}
        onClick={onClick}
        className={classes}
        aria-label={`${site.name} home`}
      >
        {content}
      </Link>
    );
  }

  return <span className={classes}>{content}</span>;
}
