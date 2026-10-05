import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarDays, Clock } from "lucide-react";
import { JsonLd } from "@/components/seo/JsonLd";
import { ButtonLink } from "@/components/ui/Button";
import {
  categoryLabel,
  newsPosts,
  type NewsPost,
} from "@/lib/data/news";
import { breadcrumbSchema, buildMetadata } from "@/lib/seo";

const dateFormatter = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

function findPost(slug: string): NewsPost | undefined {
  return newsPosts.find((post) => post.slug === slug);
}

export function generateStaticParams() {
  return newsPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = findPost(slug);

  if (!post) {
    return buildMetadata({
      title: "Article Not Found | Akintom",
      description: "The article you are looking for could not be found.",
      path: "/news",
    });
  }

  return buildMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/news/${post.slug}`,
  });
}

export default async function NewsArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = findPost(slug);

  if (!post) notFound();

  const relatedPosts = newsPosts
    .filter((item) => item.slug !== post.slug && item.category === post.category)
    .slice(0, 2);

  const fallbackRelated = relatedPosts.length
    ? relatedPosts
    : newsPosts.filter((item) => item.slug !== post.slug).slice(0, 2);

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Events & News", path: "/news" },
          { name: post.title, path: `/news/${post.slug}` },
        ])}
      />

      <article>
        <header className="relative overflow-hidden bg-navy pb-12 pt-28 md:pb-16 md:pt-32">
          <Image
            src={post.image}
            alt={post.title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div
            className="absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/85 to-navy/55"
            aria-hidden="true"
          />
          <div className="container-luxe relative z-10">
            <Link
              href="/news"
              className="inline-flex items-center gap-2 text-sm font-semibold text-white/75 transition-colors hover:text-gold"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Back to articles
            </Link>
            <div className="mt-6 max-w-3xl">
              <span className="inline-flex rounded-full bg-gold px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-navy">
                {categoryLabel(post.category)}
              </span>
              <h1 className="mt-4 font-display text-[2rem] font-bold leading-tight tracking-[-0.03em] text-white md:text-[3.25rem]">
                {post.title}
              </h1>
              <p className="mt-4 text-base leading-7 text-white/80">
                {post.excerpt}
              </p>
              <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/70">
                <span className="inline-flex items-center gap-2">
                  <CalendarDays className="h-4 w-4 text-gold" aria-hidden="true" />
                  <time dateTime={post.date}>
                    {dateFormatter.format(new Date(post.date))}
                  </time>
                </span>
                <span className="inline-flex items-center gap-2">
                  <Clock className="h-4 w-4 text-gold" aria-hidden="true" />
                  {post.readMinutes} min read
                </span>
              </div>
            </div>
          </div>
        </header>

        <section className="bg-white py-16 md:py-24">
          <div className="container-luxe grid gap-12 lg:grid-cols-[minmax(0,1fr)_320px]">
            <div className="mx-auto w-full max-w-3xl">
              {post.content.map((section) => (
                <section key={section.heading} className="mt-12 first:mt-0">
                  <h2 className="font-display text-2xl font-bold tracking-[-0.02em] text-navy md:text-3xl">
                    {section.heading}
                  </h2>
                  <div className="mt-5 grid gap-5 text-base leading-8 text-graphite">
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                </section>
              ))}
            </div>

            <aside className="lg:sticky lg:top-28 lg:self-start">
              <div className="rounded-3xl border border-navy/10 bg-mist p-6">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-gold">
                  Need advice?
                </p>
                <h2 className="mt-3 font-display text-2xl font-bold text-navy">
                  Talk through your UK study plan.
                </h2>
                <p className="mt-3 text-sm leading-7 text-graphite">
                  Our counsellors can review your profile, course options and
                  visa timeline before you apply.
                </p>
                <ButtonLink href="/contact" variant="primary" className="mt-6 w-full">
                  Book Free Consultation
                </ButtonLink>
              </div>

              <div className="mt-6 rounded-3xl border border-navy/10 bg-white p-6 shadow-soft">
                <h2 className="font-display text-xl font-bold text-navy">
                  Related articles
                </h2>
                <div className="mt-5 grid gap-4">
                  {fallbackRelated.map((item) => (
                    <Link
                      key={item.slug}
                      href={`/news/${item.slug}`}
                      className="group block rounded-2xl border border-navy/10 p-4 transition-colors hover:border-gold/50 hover:bg-gold-faint"
                    >
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gold">
                        {categoryLabel(item.category)}
                      </p>
                      <h3 className="mt-2 text-sm font-bold leading-6 text-navy group-hover:underline group-hover:decoration-gold group-hover:underline-offset-4">
                        {item.title}
                      </h3>
                    </Link>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </section>
      </article>
    </>
  );
}
