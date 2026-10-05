import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";

interface PageHeroProps {
  eyebrow: string;
  title: string;
  description?: string;
  image?: string;
  imageAlt?: string;
}

export function PageHero({
  eyebrow,
  title,
  description,
  image,
  imageAlt = "",
}: PageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-navy pb-14 pt-28 md:pb-16 md:pt-32">
      {image ? (
        <>
          <Image
            src={image}
            alt={imageAlt}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div
            className="absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/85 to-navy/60"
            aria-hidden="true"
          />
        </>
      ) : (
        <div
          className="pointer-events-none absolute -top-24 right-0 h-80 w-[560px] rounded-full bg-gold/10 blur-3xl"
          aria-hidden="true"
        />
      )}
      <div className="container-luxe relative z-10">
        <Reveal>
          <span className="eyebrow text-gold">{eyebrow}</span>
          <h1 className="display-title mt-4 max-w-3xl font-bold text-white">
            {title}
          </h1>
          {description ? (
            <p className="mt-4 max-w-2xl text-base leading-7 text-white/80">
              {description}
            </p>
          ) : null}
        </Reveal>
      </div>
    </section>
  );
}
