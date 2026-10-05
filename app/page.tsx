import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { TrustBar } from "@/components/home/TrustBar";
import { FeaturedUniversities } from "@/components/home/FeaturedUniversities";
import { ServicesPreview } from "@/components/home/ServicesPreview";
import { WhyChoose } from "@/components/home/WhyChoose";
import { ProcessTimeline } from "@/components/home/ProcessTimeline";
import { TestimonialsSlider } from "@/components/home/TestimonialsSlider";
import { NewsPreview } from "@/components/home/NewsPreview";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Study in the UK from Nigeria | Akintom Global Resources",
  description:
    "UK admission consultants in Nigeria. Free consultation for university placement, scholarships and student visa support. Book yours today.",
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBar />
      <FeaturedUniversities />
      <ServicesPreview />
      <WhyChoose />
      <ProcessTimeline />
      <TestimonialsSlider />
      <NewsPreview />
    </>
  );
}
