import {
  ArrowRight,
  ClipboardCheck,
  FileCheck2,
  GraduationCap,
  PartyPopper,
  Plane,
  Search,
} from "lucide-react";
import { processSteps } from "@/lib/data/services";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";

const stepIcons = [
  ClipboardCheck,
  Search,
  FileCheck2,
  GraduationCap,
  Plane,
  PartyPopper,
];

export function ProcessTimeline() {
  return (
    <section className="bg-[#EEF4FB] py-20 md:py-28">
      <div className="container-luxe">
        <Reveal className="mx-auto max-w-3xl text-center">
          <h2 className="section-title font-bold text-navy">
            Your path to a UK degree
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-graphite">
            A simple, transparent process so you always know what happens next,
            in what order, and what it costs before you commit.
          </p>
        </Reveal>

        <div className="relative mx-auto mt-16 max-w-3xl">
          <div
            className="absolute bottom-6 left-[1.35rem] top-6 w-px bg-navy/15 md:left-6"
            aria-hidden="true"
          />

          <Stagger className="space-y-6">
            {processSteps.map((step, index) => {
              const Icon = stepIcons[index];
              return (
                <StaggerItem key={step.step} className="relative pl-14 md:pl-16">
                  <span
                    className="absolute left-0 top-7 flex h-11 w-11 items-center justify-center rounded-full border-2 border-white bg-[#DDE8F5] font-display text-base font-bold text-navy shadow-sm"
                    aria-hidden="true"
                  >
                    {step.step}
                  </span>

                  <article className="flex gap-5 rounded-2xl border border-navy/8 bg-white p-5 shadow-soft md:p-6">
                    <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-[#E8F0FA] text-navy">
                      <Icon className="h-6 w-6" aria-hidden="true" />
                    </span>
                    <div className="min-w-0 pt-0.5">
                      <h3 className="font-display text-lg font-bold text-navy md:text-xl">
                        {step.title}
                      </h3>
                      <p className="mt-2 text-sm leading-7 text-graphite">
                        {step.text}
                      </p>
                    </div>
                  </article>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>

        <Reveal className="mt-14 text-center">
          <ButtonLink href="/apply" variant="navy" size="lg">
            Start Your Journey Today
            <ArrowRight
              className="h-4 w-4 transition-transform group-hover:translate-x-1"
              aria-hidden="true"
            />
          </ButtonLink>
        </Reveal>
      </div>
    </section>
  );
}
