import { Award, BadgeCheck, Globe, Headphones, ShieldCheck } from "lucide-react";
import { whyChoose } from "@/lib/data/services";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";

const icons = [ShieldCheck, Headphones, Award, Globe];

export function WhyChoose() {
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="container-luxe">
        <Reveal className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-navy/10 bg-navy/[0.03] px-4 py-2 text-sm font-semibold text-navy">
            <BadgeCheck className="h-4 w-4 text-gold" aria-hidden="true" />
            Why Choose Akintom
          </span>
          <h2 className="section-title mt-6 font-bold text-navy">
            Why students choose Akintom
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-graphite">
            We do more than submit applications. You get honest guidance, a clear
            process, and one expert who stays with you from Lagos to your first
            lecture in the UK.
          </p>
        </Reveal>

        <Stagger className="mx-auto mt-14 grid max-w-5xl gap-6 sm:grid-cols-2">
          {whyChoose.map((reason, index) => {
            const Icon = icons[index];
            return (
              <StaggerItem key={reason.title}>
                <article className="flex h-full gap-5 rounded-2xl border border-navy/8 bg-white p-6 shadow-soft transition-shadow hover:shadow-lift md:p-7">
                  <span
                    className="w-1 shrink-0 self-stretch rounded-full bg-navy/80"
                    aria-hidden="true"
                  />
                  <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-navy/5 text-navy">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <div className="min-w-0">
                    <h3 className="font-display text-lg font-bold leading-snug text-navy md:text-xl">
                      {reason.title}
                    </h3>
                    <p className="mt-2.5 text-sm leading-7 text-graphite">
                      {reason.text}
                    </p>
                  </div>
                </article>
              </StaggerItem>
            );
          })}
        </Stagger>

        <Reveal className="mt-14 text-center">
          <ButtonLink href="/contact" variant="primary" size="lg">
            Book Free Consultation
          </ButtonLink>
        </Reveal>
      </div>
    </section>
  );
}
