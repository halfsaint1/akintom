import type { Metadata } from "next";
import { PageHero } from "@/components/shared/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { TestimonialsExplorer } from "@/components/testimonials/TestimonialsExplorer";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildMetadata, breadcrumbSchema } from "@/lib/seo";
import { universities } from "@/lib/data/universities";

export const metadata: Metadata = buildMetadata({
  title: "Student Success Stories | Nigerian Students in UK Universities",
  description:
    "Real Nigerian students placed in South Wales, Derby, Sunderland, Hertfordshire, Hull and York St John. Read and watch their UK admission success stories.",
  path: "/testimonials",
});

export default function TestimonialsPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Testimonials", path: "/testimonials" },
        ])}
      />
      <PageHero
        eyebrow="Success Stories"
        title="Student outcomes that speak for themselves."
        description="Every story below is a real student, a real course and a real UK university. We would rather show you than ask you to take our word for it."
        image="/images/testimonials-graduation.png"
        imageAlt=""
      />

      <section className="bg-mist py-20 md:py-28">
        <div className="container-luxe">
          <TestimonialsExplorer />
        </div>
      </section>

      {/* Placement strip */}
      <section className="bg-white py-20 md:py-24">
        <div className="container-luxe">
          <Reveal>
            <SectionHeading
              eyebrow="Recent Placements"
              title="Where our students study now."
              align="center"
            />
          </Reveal>
          <Stagger className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3">
            {universities.map((uni) => (
              <StaggerItem key={uni.slug}>
                <div className="flex h-full flex-col rounded-2xl border border-navy/10 bg-white px-5 py-4">
                  <span className="text-sm font-semibold text-navy">{uni.name}</span>
                  <span className="mt-1 text-xs text-graphite">{uni.ranking}</span>
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
