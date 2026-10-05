import type { Metadata } from "next";
import Image from "next/image";
import {
  Target,
  Telescope,
  Gem,
  ShieldCheck,
  Handshake,
  Medal,
} from "lucide-react";
import { PageHero } from "@/components/shared/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildMetadata, breadcrumbSchema } from "@/lib/seo";
import { site } from "@/lib/site";
import { universities } from "@/lib/data/universities";

export const metadata: Metadata = buildMetadata({
  title: "About Us | Trusted UK Education Consultants in Nigeria",
  description:
    "Learn how Akintom supports Nigerian students with UK university placement, scholarships, visa guidance, and accountable end-to-end admissions support.",
  path: "/about",
});

const values = [
  {
    icon: Gem,
    title: "Integrity First",
    text: "We tell families the truth about their chances, costs and timelines, even when it is not what they want to hear.",
  },
  {
    icon: Handshake,
    title: "One Accountable Expert",
    text: "Every student works with one named consultant from first call to first lecture. No call centres, no file numbers.",
  },
  {
    icon: ShieldCheck,
    title: "Compliance Without Compromise",
    text: "Every document we submit meets UKVI and university standards. Our 99% visa success rate is built on doing it properly.",
  },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ])}
      />
      <PageHero
        eyebrow="About Akintom Global Resources"
        title="Trusted UK admissions support."
        description="For over a decade, we have supported students across Nigeria with placement, scholarships, visa guidance, and pre-departure preparation."
      />

      {/* Company story */}
      <section className="bg-white py-20 md:py-28">
        <div className="container-luxe grid items-center gap-14 lg:grid-cols-2">
          <Reveal direction="left">
            <SectionHeading
              eyebrow="Our Story"
              title="How Akintom started."
            />
            <div className="mt-6 space-y-5 text-base leading-8 text-graphite">
              <p>
                Akintom Global Resources started after our founder watched his
                own cousin lose a year, and a visa fee, to an agent who
                disappeared after collecting payment. The lesson was simple:
                Nigerian families don&apos;t lack ambition or funds. What they
                lack is an expert who is accountable.
              </p>
              <p>
                We built the agency we wished existed: one named consultant per
                student, a published six-step process, parents copied into
                every milestone, and direct relationships with UK admission
                teams instead of middlemen.
              </p>
              <p>
                Today, more than {site.stats.studentsPlaced.toLocaleString()}{" "}
                students have gone through that process, and most of our new
                families come to us through referrals from the last ones.
              </p>
            </div>
          </Reveal>
          <Reveal direction="right" className="relative">
            <div className="relative aspect-[4/3] overflow-hidden rounded-4xl shadow-lift">
              <Image
                src="/images/about-consultants.png"
                alt="Akintom consultants advising a student and her parents in our Lagos office"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 hidden rounded-2xl border border-navy/5 bg-white p-6 shadow-lift md:block">
              <p className="font-display text-3xl font-bold text-navy">
                {site.stats.yearsExperience}+ years
              </p>
              <p className="mt-1 text-sm text-graphite">
                of UK admissions expertise
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Mission / Vision / Values */}
      <section className="bg-mist py-20 md:py-28">
        <div className="container-luxe">
          <Reveal>
            <SectionHeading
              eyebrow="Mission, Vision & Values"
              title="What we stand for."
              align="center"
            />
          </Reveal>
          <Stagger className="mt-14 grid gap-6 md:grid-cols-2">
            <StaggerItem>
              <div className="h-full rounded-2xl border border-navy/5 bg-white p-8 shadow-soft">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-navy text-gold">
                  <Target className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="mt-6 font-display text-2xl font-bold text-navy">
                  Our Mission
                </h3>
                <p className="mt-3 leading-8 text-graphite">
                  To make UK education genuinely accessible to Nigerian
                  students through honest counsel, rigorous preparation, and
                  accountable, end-to-end support.
                </p>
              </div>
            </StaggerItem>
            <StaggerItem>
              <div className="h-full rounded-2xl border border-navy/5 bg-white p-8 shadow-soft">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-navy text-gold">
                  <Telescope className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="mt-6 font-display text-2xl font-bold text-navy">
                  Our Vision
                </h3>
                <p className="mt-3 leading-8 text-graphite">
                  To be West Africa&apos;s most trusted UK admissions
                  consultancy. The first name parents mention, and the standard
                  universities measure other agents against.
                </p>
              </div>
            </StaggerItem>
          </Stagger>
          <Stagger className="mt-6 grid gap-6 md:grid-cols-3">
            {values.map((value) => (
              <StaggerItem key={value.title}>
                <div className="h-full rounded-2xl border border-navy/5 bg-white p-8 shadow-soft">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold-faint">
                    <value.icon className="h-5 w-5 text-gold" aria-hidden="true" />
                  </span>
                  <h3 className="mt-6 font-display text-xl font-bold text-navy">
                    {value.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-graphite">
                    {value.text}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* UK partnerships */}
      <section className="bg-white py-20 md:py-28">
        <div className="container-luxe">
          <Reveal>
            <SectionHeading
              eyebrow="UK Partnerships"
              title="Universities we work with."
              description="Some of the universities we place students into every intake."
              align="center"
            />
          </Reveal>
          <Stagger className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3">
            {universities.map((uni) => (
              <StaggerItem key={uni.slug}>
                <div className="flex h-full items-center justify-between gap-3 rounded-2xl border border-navy/10 bg-white px-5 py-4">
                  <span className="text-sm font-semibold text-navy">
                    {uni.name}
                  </span>
                  <Medal className="h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
                </div>
              </StaggerItem>
            ))}
          </Stagger>

          <Reveal className="mt-14 flex flex-wrap justify-center gap-4">
            <ButtonLink href="/contact" variant="primary" size="lg">
              Book Free Consultation
            </ButtonLink>
            <ButtonLink href="/apply" variant="outline-dark" size="lg">
              Apply Now
            </ButtonLink>
          </Reveal>
        </div>
      </section>
    </>
  );
}
