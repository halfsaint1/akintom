"use client";

import { useState } from "react";
import Image from "next/image";
import { Play, Star } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  testimonials,
  testimonialCategories,
  type TestimonialCategory,
} from "@/lib/data/testimonials";
import { cn } from "@/lib/utils";

type Filter = TestimonialCategory | "all";

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1" role="img" aria-label={`Rated ${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={cn("h-4 w-4", i < rating ? "fill-gold text-gold" : "text-navy/20")}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

export function TestimonialsExplorer() {
  const [filter, setFilter] = useState<Filter>("all");
  const reduceMotion = useReducedMotion();

  const visible =
    filter === "all"
      ? testimonials
      : testimonials.filter((t) => t.category === filter);

  return (
    <div>
      <div
        className="flex flex-wrap justify-center gap-2"
        role="group"
        aria-label="Filter success stories"
      >
        {testimonialCategories.map((category) => (
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

      <motion.div layout={!reduceMotion} className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {visible.map((t) => (
            <motion.article
              key={t.id}
              layout={!reduceMotion}
              initial={reduceMotion ? false : { opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={reduceMotion ? undefined : { opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="card-lift flex h-full flex-col rounded-2xl border border-navy/5 bg-white shadow-soft"
            >
              <div className="relative aspect-[16/10] overflow-hidden rounded-t-2xl bg-mist">
                <Image
                  src={t.photo}
                  alt={`${t.name}, ${t.course} at ${t.university}`}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                />
                {t.hasVideo ? (
                  <span className="glass absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-xs font-semibold text-white">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gold text-navy">
                      <Play className="h-3 w-3 fill-current" aria-hidden="true" />
                    </span>
                    Video story
                  </span>
                ) : null}
              </div>
              <div className="flex flex-1 flex-col p-7">
                <Stars rating={t.rating} />
                <blockquote className="mt-4 font-display text-lg font-medium leading-snug text-navy">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <p className="mt-4 flex-1 text-sm leading-7 text-graphite">
                  {t.story}
                </p>
                <footer className="mt-6 border-t border-navy/10 pt-5">
                  <p className="font-semibold text-navy">{t.name}</p>
                  <p className="text-sm text-graphite">
                    {t.course} · {t.university}
                  </p>
                </footer>
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
