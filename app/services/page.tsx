import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "lucide-react";
import { PageHero } from "@/components/shared/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { Accordion } from "@/components/ui/Accordion";
import { Reveal } from "@/components/motion/Reveal";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildMetadata, breadcrumbSchema, faqSchema } from "@/lib/seo";
import { services } from "@/lib/data/services";
import { faqs } from "@/lib/data/faqs";
import { cn } from "@/lib/utils";

export const metadata: Metadata = buildMetadata({
  title: "UK Admission, Scholarship & Visa Services | Akintom",
  description:
    "End-to-end UK study services for Nigerian students: university placement, scholarship support, visa assistance, accommodation and pre-departure guidance.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <JsonLd
        data={[
          faqSchema,
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
          ]),
        ]}
      />
      <PageHero
        eyebrow="Our Services"
        title="Everything you need, handled by one expert."
        description="University placement, scholarship support, visa assistance, accommodation, pre-departure guidance and career counselling, all from one expert who is accountable to you."
        image="/images/services-guidance.png"
        imageAlt=""
      />

      {/* In-page anchor navigation */}
      <nav
        aria-label="Services on this page"
        className="sticky top-[72px] z-30 border-b border-navy/10 bg-white/90 backdrop-blur-md"
      >
        <div className="container-luxe flex gap-2 overflow-x-auto py-3">
          {services.map((service) => (
            <Link
              key={service.slug}
              href={`#${service.slug}`}
              className="whitespace-nowrap rounded-full border border-navy/15 px-4 py-2 text-xs font-semibold text-navy transition-colors hover:border-gold hover:bg-gold-faint"
            >
              {service.title}
            </Link>
          ))}
        </div>
      </nav>

      {/* Detailed service sections */}
      {services.map((service, index) => (
        <section
          key={service.slug}
          id={service.slug}
          className={cn(
            "scroll-mt-32 py-20 md:py-24",
            index % 2 === 0 ? "bg-white" : "bg-mist",
          )}
        >
          <div className="container-luxe grid items-start gap-12 lg:grid-cols-2">
            <Reveal direction="left">
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-navy text-gold">
                <service.icon className="h-6 w-6" aria-hidden="true" />
              </span>
              <span className="eyebrow mt-8 text-gold">
                Service {String(index + 1).padStart(2, "0")}
              </span>
              <h2 className="section-title mt-4 font-bold text-navy">
                {service.title}
              </h2>
              <p className="mt-5 text-base leading-8 text-graphite">
                {service.description}
              </p>
              <div className="mt-8">
                <ButtonLink href="/contact" variant="navy">
                  Get Expert Guidance
                </ButtonLink>
              </div>
            </Reveal>
            <Reveal direction="right">
              <div className="rounded-2xl border border-navy/5 bg-white p-8 shadow-soft">
                <p className="text-sm font-bold uppercase tracking-eyebrow text-gold">
                  What&apos;s included
                </p>
                <ul className="mt-6 space-y-4">
                  {service.included.map((item) => (
                    <li key={item} className="flex gap-3 text-sm leading-7 text-ink">
                      <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-success/10">
                        <Check className="h-3 w-3 text-success" aria-hidden="true" />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </section>
      ))}

      {/* FAQ */}
      <section className="bg-white py-20 md:py-28">
        <div className="container-luxe grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          <Reveal direction="left">
            <SectionHeading
              eyebrow="Frequently Asked Questions"
              title="The questions every family asks first."
              description="If your question isn't here, ask it on WhatsApp. A real expert replies, not a bot."
            />
          </Reveal>
          <Reveal direction="right">
            <Accordion items={faqs} />
          </Reveal>
        </div>
      </section>
    </>
  );
}
