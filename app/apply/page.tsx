import type { Metadata } from "next";
import { ApplicationForm } from "@/components/apply/ApplicationForm";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildMetadata, breadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Apply Now | UK Study Application | Akintom",
  description:
    "Apply to study in the UK through Akintom. Complete our four-step application form for university placement, scholarships and visa support.",
  path: "/apply",
});

export default function ApplyPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Apply", path: "/apply" },
        ])}
      />
      <section className="bg-slate-50 pb-14 pt-28 md:pb-20 md:pt-32">
        <div className="container-luxe">
          <div className="mx-auto max-w-4xl text-center">
            <span className="eyebrow justify-center text-gold">Apply Now</span>
            <h1 className="section-title mt-4 font-bold text-navy">
              Start your UK application
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-base leading-8 text-graphite">
              Fill in your details below. It takes about 5 minutes and an expert
              will follow up within one business day.
            </p>
          </div>
          <div className="mx-auto mt-12 max-w-4xl">
            <ApplicationForm />
          </div>
        </div>
      </section>
    </>
  );
}
