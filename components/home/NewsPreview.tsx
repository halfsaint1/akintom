import { ArrowRight } from "lucide-react";
import { newsPosts } from "@/lib/data/news";
import { NewsCard } from "@/components/news/NewsCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";

export function NewsPreview() {
  const latest = newsPosts.slice(0, 3);

  return (
    <section className="border-y border-navy/5 bg-mist py-20 md:py-28">
      <div className="container-luxe">
        <Reveal className="mb-14 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="Events & News"
            title="Deadlines, scholarships, and visa updates."
            description="Put together by our counsellors so you never miss an intake deadline or a funding window."
          />
          <ButtonLink href="/news" variant="outline-dark" className="shrink-0">
            View All News
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </ButtonLink>
        </Reveal>

        <Stagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {latest.map((post) => (
            <StaggerItem key={post.slug}>
              <NewsCard post={post} />
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
