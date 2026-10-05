import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  dark?: boolean;
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  dark = false,
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        align === "center" && "mx-auto flex max-w-3xl flex-col items-center text-center",
        className,
      )}
    >
      <span className={cn("eyebrow", dark ? "text-gold" : "text-gold")}>
        {eyebrow}
      </span>
      <h2
        className={cn(
          "section-title mt-5 font-bold",
          dark ? "text-white" : "text-navy",
        )}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            "mt-5 max-w-2xl text-lg leading-8",
            dark ? "text-white/70" : "text-graphite",
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
