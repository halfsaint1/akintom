"use client";

import { CountUp } from "@/components/motion/CountUp";
import { Reveal } from "@/components/motion/Reveal";
import { site } from "@/lib/site";

const stats = [
  {
    value: site.stats.studentsPlaced,
    suffix: "+",
    label: "Students Placed",
  },
  {
    value: site.stats.partnerUniversities,
    suffix: "+",
    label: "Partner Universities",
  },
  {
    value: site.stats.visaSuccessRate,
    suffix: "%",
    label: "Visa Success Rate",
  },
  {
    value: site.stats.yearsExperience,
    suffix: "+",
    label: "Years Experience",
  },
];

export function TrustBar() {
  return (
    <section className="bg-navy" aria-label="Our track record">
      <div className="container-luxe grid grid-cols-2 gap-x-6 gap-y-6 py-8 md:grid-cols-4 md:py-10">
        {stats.map((stat, index) => (
          <Reveal key={stat.label} delay={index * 0.08} className="text-center">
            <p className="font-display text-3xl font-bold text-gold md:text-4xl">
              <CountUp to={stat.value} suffix={stat.suffix} />
            </p>
            <p className="mt-2 text-xs font-semibold uppercase tracking-eyebrow text-white/65 md:text-sm">
              {stat.label}
            </p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
