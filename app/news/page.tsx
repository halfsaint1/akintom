import type { Metadata } from "next";
import { PageHero } from "@/components/shared/PageHero";
import { NewsExplorer } from "@/components/news/NewsExplorer";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildMetadata, breadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "UK Study News, Scholarships & Visa Updates | Akintom",
  description:
    "Admission deadlines, scholarship alerts, UK university news and visa updates for Nigerian students, from Akintom's counsellors.",
  path: "/news",
});

export default function NewsPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Events & News", path: "/news" },
        ])}
      />
      <PageHero
        eyebrow="Events & News"
        title="Stay ahead of deadlines and updates."
        description="Deadlines, scholarship windows, visa policy changes and our UK education fairs, published as our counsellors track them."
      />

      <section className="bg-mist py-20 md:py-28">
        <div className="container-luxe">
          <NewsExplorer />
        </div>
      </section>
    </>
  );
}
