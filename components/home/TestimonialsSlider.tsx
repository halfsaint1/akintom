"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { testimonials, testimonialCategories } from "@/lib/data/testimonials";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";

const AUTO_ADVANCE_MS = 8000;

function categoryLabel(value: string) {
  return testimonialCategories.find((c) => c.value === value)?.label ?? value;
}

function Stars({ rating }: { rating: number }) {
  return (
    <div
      className="flex gap-1"
      role="img"
      aria-label={`Rated ${rating} out of 5 stars`}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={cn(
            "h-4 w-4",
            i < rating ? "fill-gold text-gold" : "text-white/25",
          )}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

export function TestimonialsSlider() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduceMotion = useReducedMotion();
  const current = testimonials[index];

  const goTo = useCallback(
    (next: number) =>
      setIndex((next + testimonials.length) % testimonials.length),
    [],
  );

  useEffect(() => {
    if (paused || reduceMotion) return;
    const timer = setInterval(
      () => setIndex((i) => (i + 1) % testimonials.length),
      AUTO_ADVANCE_MS,
    );
    return () => clearInterval(timer);
  }, [paused, reduceMotion]);

  return (
    <section
      className="relative overflow-hidden border-y border-navy/5 bg-white py-20 md:py-28"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        className="pointer-events-none absolute -left-24 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-gold/5 blur-3xl"
        aria-hidden="true"
      />

      <div className="container-luxe relative">
        <Reveal className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-navy/10 bg-navy/[0.03] px-4 py-2 text-sm font-semibold text-navy">
            <Quote className="h-4 w-4 text-gold" aria-hidden="true" />
            Success Stories
          </span>
          <h2 className="section-title mt-6 font-bold text-navy">
            Hear from our students
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-graphite">
            Real names, real courses, and real UK universities. These are the
            outcomes families come to us for.
          </p>
        </Reveal>

        <div className="relative mx-auto mt-14 max-w-5xl">
          <div
            className="overflow-hidden rounded-3xl border border-navy/10 bg-white shadow-lift ring-1 ring-navy/[0.04]"
            aria-live="polite"
          >
            <AnimatePresence mode="wait">
              <motion.figure
                key={current.id}
                initial={reduceMotion ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={reduceMotion ? undefined : { opacity: 0 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="grid md:grid-cols-[1.15fr_0.85fr]"
              >
                <div className="relative flex flex-col justify-between p-8 md:p-10 lg:p-12">
                  <Quote
                    className="absolute right-8 top-8 h-16 w-16 text-gold/15 md:right-10 md:top-10"
                    aria-hidden="true"
                  />

                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="rounded-full border border-navy/10 bg-mist px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-navy">
                        {categoryLabel(current.category)}
                      </span>
                      <span className="text-xs font-medium text-graphite">
                        {String(index + 1).padStart(2, "0")} /{" "}
                        {String(testimonials.length).padStart(2, "0")}
                      </span>
                    </div>

                    <blockquote className="relative mt-8 font-display text-2xl font-medium leading-snug text-navy md:text-[1.75rem] lg:text-[2rem]">
                      &ldquo;{current.quote}&rdquo;
                    </blockquote>
                  </div>

                  <figcaption className="mt-10 flex items-center gap-4 border-t border-navy/8 pt-8">
                    <span className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full ring-2 ring-gold/40 ring-offset-2 ring-offset-white">
                      <Image
                        src={current.photo}
                        alt={current.name}
                        fill
                        sizes="64px"
                        className="object-cover"
                      />
                    </span>
                    <span className="min-w-0">
                      <span className="block font-display text-lg font-bold text-navy">
                        {current.name}
                      </span>
                      <span className="mt-1 block text-sm text-graphite">
                        {current.course}
                      </span>
                      <span className="mt-0.5 block text-sm font-medium text-navy/70">
                        {current.university}
                      </span>
                    </span>
                  </figcaption>
                </div>

                <div className="relative flex min-h-[280px] flex-col justify-between bg-navy p-8 md:min-h-full md:p-10">
                  <div
                    className="absolute inset-0 bg-gradient-to-br from-navy via-navy to-navy-soft"
                    aria-hidden="true"
                  />
                  <div
                    className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,175,55,0.12),transparent_55%)]"
                    aria-hidden="true"
                  />

                  <div className="relative">
                    <Stars rating={current.rating} />
                    <p className="mt-6 text-sm font-semibold uppercase tracking-[0.16em] text-gold">
                      Placed at
                    </p>
                    <p className="mt-3 font-display text-2xl font-bold leading-tight text-white md:text-[1.65rem]">
                      {current.university}
                    </p>
                    <p className="mt-3 text-sm leading-7 text-white/70">
                      {current.course}
                    </p>
                  </div>

                  <Link
                    href="/testimonials"
                    className="relative mt-8 inline-flex items-center gap-2 text-sm font-semibold text-gold transition-colors hover:text-gold-soft"
                  >
                    Read full story
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </div>
              </motion.figure>
            </AnimatePresence>
          </div>

          <div className="mt-8 flex items-center justify-between gap-4">
            <div className="flex gap-2" role="tablist" aria-label="Testimonials">
              {testimonials.map((t, i) => (
                <button
                  key={t.id}
                  type="button"
                  role="tab"
                  aria-selected={i === index}
                  aria-label={`Show testimonial from ${t.name}`}
                  onClick={() => goTo(i)}
                  className={cn(
                    "h-2.5 rounded-full transition-all duration-300",
                    i === index ? "w-10 bg-gold" : "w-2.5 bg-navy/15 hover:bg-navy/30",
                  )}
                />
              ))}
            </div>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => goTo(index - 1)}
                aria-label="Previous testimonial"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-navy/10 bg-white text-navy shadow-soft transition-all hover:border-navy hover:bg-navy hover:text-white"
              >
                <ChevronLeft className="h-5 w-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => goTo(index + 1)}
                aria-label="Next testimonial"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-navy/10 bg-white text-navy shadow-soft transition-all hover:border-navy hover:bg-navy hover:text-white"
              >
                <ChevronRight className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>

        <Reveal className="mt-14 text-center">
          <ButtonLink href="/testimonials" variant="primary" size="lg">
            View All Success Stories
          </ButtonLink>
        </Reveal>
      </div>
    </section>
  );
}
