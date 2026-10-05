import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { services } from "@/lib/data/services";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";

export function ServicesPreview() {
  return (
    <section className="relative overflow-hidden border-y border-navy/5 bg-[#EEF2F8] py-20 md:py-28">
      <div
        className="pointer-events-none absolute -right-32 top-0 h-96 w-96 rounded-full bg-gold/5 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -left-24 bottom-0 h-80 w-80 rounded-full bg-navy/[0.03] blur-3xl"
        aria-hidden="true"
      />

      <div className="container-luxe relative">
        <Reveal className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-navy/10 bg-navy/[0.03] px-4 py-2 text-sm font-semibold text-navy">
            <Sparkles className="h-4 w-4 text-gold" aria-hidden="true" />
            What We Do
          </span>
          <h2 className="section-title mt-6 font-bold text-navy">
            Full UK admissions support
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-graphite">
            Six services, one expert. From choosing the right university to
            landing prepared on your first day in the UK.
          </p>
        </Reveal>

        <Stagger className="mx-auto mt-14 grid max-w-6xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <StaggerItem key={service.slug}>
              <Link
                href={`/services#${service.slug}`}
                className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-navy/8 bg-white p-6 shadow-soft ring-1 ring-navy/[0.04] transition-all duration-300 hover:-translate-y-0.5 hover:border-gold/25 hover:shadow-lift md:p-7"
              >
                <span
                  className="absolute right-5 top-5 font-display text-3xl font-bold leading-none text-navy/[0.07] transition-colors group-hover:text-gold/20"
                  aria-hidden="true"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>

                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-navy text-gold shadow-sm transition-colors duration-300 group-hover:bg-gold group-hover:text-navy">
                  <service.icon className="h-6 w-6" aria-hidden="true" />
                </span>

                <h3 className="mt-6 font-display text-xl font-bold leading-snug text-navy">
                  {service.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-7 text-graphite">
                  {service.short}
                </p>

                <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-navy">
                  Learn more
                  <ArrowRight
                    className="h-4 w-4 text-gold transition-transform duration-300 group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </span>

                <span
                  className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-gold transition-transform duration-300 group-hover:scale-x-100"
                  aria-hidden="true"
                />
              </Link>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal className="mt-14 text-center">
          <ButtonLink href="/contact" variant="primary" size="lg">
            Get Expert Guidance
          </ButtonLink>
        </Reveal>
      </div>
    </section>
  );
}
