"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface AccordionItem {
  question: string;
  answer: string;
}

export function Accordion({ items }: { items: AccordionItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const reduceMotion = useReducedMotion();

  return (
    <div className="divide-y divide-navy/10 rounded-2xl border border-navy/10 bg-white">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const panelId = `faq-panel-${index}`;
        const buttonId = `faq-button-${index}`;
        return (
          <div key={item.question}>
            <h3>
              <button
                type="button"
                id={buttonId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left font-semibold text-navy transition-colors hover:bg-mist/60"
              >
                {item.question}
                <ChevronDown
                  className={cn(
                    "h-5 w-5 shrink-0 text-gold transition-transform duration-200",
                    isOpen && "rotate-180",
                  )}
                  aria-hidden="true"
                />
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen ? (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  initial={reduceMotion ? false : { height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={reduceMotion ? undefined : { height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="overflow-hidden"
                >
                  <p className="px-6 pb-6 text-sm leading-7 text-graphite">
                    {item.answer}
                  </p>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
