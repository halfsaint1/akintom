"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CalendarDays } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  newsPosts,
  newsCategories,
  categoryLabel,
  type NewsCategory,
} from "@/lib/data/news";
import { NewsCard } from "@/components/news/NewsCard";
import { cn } from "@/lib/utils";

type Filter = NewsCategory | "all";

const dateFormatter = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

export function NewsExplorer() {
  const [filter, setFilter] = useState<Filter>("all");
  const reduceMotion = useReducedMotion();

  const featured = newsPosts.find((p) => p.featured);
  const visible = (
    filter === "all" ? newsPosts : newsPosts.filter((p) => p.category === filter)
  ).filter((p) => filter !== "all" || p.slug !== featured?.slug);

  return (
    <div>
      <div
        className="flex flex-wrap justify-center gap-2"
        role="group"
        aria-label="Filter news by category"
      >
        {newsCategories.map((category) => (
          <button
            key={category.value}
            type="button"
            onClick={() => setFilter(category.value)}
            aria-pressed={filter === category.value}
            className={cn(
              "rounded-full border px-5 py-2.5 text-sm font-semibold transition-colors",
              filter === category.value
                ? "border-navy bg-navy text-white"
                : "border-navy/15 bg-white text-navy hover:border-gold hover:bg-gold-faint",
            )}
          >
            {category.label}
          </button>
        ))}
      </div>

      {/* Featured article */}
      {filter === "all" && featured ? (
        <Link
          href={`/news/${featured.slug}`}
          className="card-lift group mt-12 grid overflow-hidden rounded-4xl border border-navy/5 bg-white shadow-soft lg:grid-cols-2"
        >
          <div className="relative aspect-[16/10] bg-mist lg:aspect-auto lg:min-h-[360px]">
            <Image
              src={featured.image}
              alt={featured.title}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          <div className="flex flex-col justify-center p-8 md:p-12">
            <span className="inline-flex w-fit rounded-full bg-gold-faint px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-navy">
              Featured · {categoryLabel(featured.category)}
            </span>
            <h2 className="mt-5 font-display text-2xl font-bold leading-snug text-navy md:text-3xl">
              {featured.title}
            </h2>
            <p className="mt-4 leading-8 text-graphite">{featured.excerpt}</p>
            <p className="mt-6 inline-flex items-center gap-2 text-sm text-graphite">
              <CalendarDays className="h-4 w-4 text-gold" aria-hidden="true" />
              <time dateTime={featured.date}>
                {dateFormatter.format(new Date(featured.date))}
              </time>
            </p>
          </div>
        </Link>
      ) : null}

      <motion.div layout={!reduceMotion} className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {visible.map((post) => (
            <motion.div
              key={post.slug}
              layout={!reduceMotion}
              initial={reduceMotion ? false : { opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={reduceMotion ? undefined : { opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <NewsCard post={post} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
