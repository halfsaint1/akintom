"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";

const heroFeatures = [
  "100% Admission Support",
  "UK Partner Universities",
  "Visa Guidance",
  "Scholarship Assistance",
];

const EASE = [0.21, 0.6, 0.35, 1] as const;

export function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative flex min-h-[78svh] items-center overflow-hidden bg-navy">
      {/* Cinematic background with subtle Ken Burns drift */}
      <motion.div
        className="absolute inset-0"
        initial={reduceMotion ? false : { scale: 1.08 }}
        animate={reduceMotion ? undefined : { scale: 1 }}
        transition={{ duration: 14, ease: "easeOut" }}
        aria-hidden="true"
      >
        <Image
          src="/images/hero-uk-campus.png"
          alt=""
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          className="object-cover object-center"
        />
      </motion.div>
      {/* Navy scrim for legibility */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/75 to-navy/35"
        aria-hidden="true"
      />
      <div
        className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-navy/80 to-transparent"
        aria-hidden="true"
      />

      <div className="container-luxe relative z-10 pb-16 pt-28 md:pb-20 md:pt-32">
        <motion.div
          initial={reduceMotion ? false : "hidden"}
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.12 } },
          }}
          className="max-w-3xl"
        >
          <motion.span
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
            }}
            className="eyebrow text-gold"
          >
            Your Trusted UK Study Partner
          </motion.span>

          <motion.h1
            variants={{
              hidden: { opacity: 0, y: 24 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
            }}
            className="display-title mt-6 font-bold text-white"
          >
            Study in the UK <span className="text-gold">with Confidence</span>
          </motion.h1>

          <motion.p
            variants={{
              hidden: { opacity: 0, y: 24 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
            }}
            className="mt-7 max-w-xl text-lg leading-8 text-white/85"
          >
            Get expert guidance on admissions, scholarships, visa support, and
            university placement from trusted UK education consultants.
          </motion.p>

          <motion.div
            variants={{
              hidden: { opacity: 0, y: 24 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
            }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <ButtonLink href="/contact" variant="primary" size="lg">
              Book Free Consultation
              <ArrowRight
                className="h-4 w-4 transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              />
            </ButtonLink>
            <ButtonLink href="/apply" variant="outline-light" size="lg">
              Apply Now
              <ArrowRight
                className="h-4 w-4 transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              />
            </ButtonLink>
          </motion.div>

          <motion.ul
            variants={{
              hidden: { opacity: 0, y: 24 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
            }}
            className="mt-12 grid max-w-2xl grid-cols-1 gap-3 sm:grid-cols-2"
            aria-label="What we offer"
          >
            {heroFeatures.map((feature) => (
              <li
                key={feature}
                className="glass flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium text-white"
              >
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold/20 text-gold">
                  <Check className="h-3.5 w-3.5" aria-hidden="true" />
                </span>
                {feature}
              </li>
            ))}
          </motion.ul>
        </motion.div>
      </div>
    </section>
  );
}
