import Image from "next/image";
import { MapPin, ArrowRight } from "lucide-react";
import { universities } from "@/lib/data/universities";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";

export function FeaturedUniversities() {
  return (
    <section className="border-y border-navy/5 bg-mist py-20 md:py-28">
      <div className="container-luxe">
        <Reveal className="mb-12 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="Partner Institutions"
            title="Featured UK Universities"
            description="Direct partnerships with universities across England and Wales, chosen for graduate outcomes, student support, and international scholarships."
          />
          <ButtonLink href="/services" variant="outline-dark" className="shrink-0">
            View Our Services
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </ButtonLink>
        </Reveal>

        <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {universities.map((uni) => (
            <StaggerItem key={uni.slug}>
              <article className="group relative aspect-[5/6] overflow-hidden rounded-2xl border border-navy/10 bg-navy shadow-soft ring-1 ring-white/10 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lift">
                <Image
                  src={uni.image}
                  alt={`${uni.name} campus`}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />

                <div
                  className="absolute inset-0 bg-gradient-to-t from-navy via-navy/25 to-navy/5"
                  aria-hidden="true"
                />

                {uni.badge ? (
                  <span className="absolute left-4 top-4 rounded-full border border-white/15 bg-navy/80 px-3 py-1.5 text-[11px] font-semibold tracking-wide text-white backdrop-blur-sm">
                    {uni.badge}
                  </span>
                ) : null}

                <div className="absolute inset-x-0 bottom-0 border-t border-white/10 bg-gradient-to-t from-navy/95 to-transparent px-5 pb-5 pt-8 md:px-5 md:pb-5 md:pt-7">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-gold/90">
                    {uni.ranking}
                  </p>
                  <h3 className="mt-2 font-display text-xl font-bold leading-snug text-white md:text-[1.35rem]">
                    {uni.name}
                  </h3>
                  <p className="mt-1.5 flex items-center gap-1.5 text-sm text-white/70">
                    <MapPin className="h-3.5 w-3.5 shrink-0 text-gold" aria-hidden="true" />
                    <span className="truncate">{uni.city}</span>
                  </p>
                </div>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
