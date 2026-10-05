"use client";

import { MessageCircle, Phone } from "lucide-react";
import { site, whatsappLink } from "@/lib/site";

/**
 * Desktop: sticky WhatsApp consultation pill (bottom-right).
 * Mobile: persistent floating WhatsApp + Call bar (bottom).
 */
export function FloatingCtas() {
  return (
    <>
      {/* Desktop sticky WhatsApp pill */}
      <a
        href={whatsappLink()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        className="fixed bottom-6 right-6 z-40 hidden items-center gap-3 rounded-full bg-success py-3 pl-4 pr-6 text-sm font-semibold text-white shadow-lift transition-transform hover:-translate-y-0.5 md:inline-flex"
      >
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
          <MessageCircle className="h-4 w-4" aria-hidden="true" />
        </span>
        Chat with us on WhatsApp
      </a>

      {/* Mobile floating WhatsApp + Call bar */}
      <div
        className="fixed inset-x-4 bottom-4 z-40 grid grid-cols-2 gap-3 md:hidden"
        role="group"
        aria-label="Quick contact"
      >
        <a
          href={whatsappLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="flex min-h-12 items-center justify-center gap-2 rounded-full bg-success text-sm font-semibold text-white shadow-lift"
        >
          <MessageCircle className="h-4 w-4" aria-hidden="true" />
          WhatsApp
        </a>
        <a
          href={site.phoneHref}
          className="flex min-h-12 items-center justify-center gap-2 rounded-full bg-navy text-sm font-semibold text-white shadow-lift"
        >
          <Phone className="h-4 w-4" aria-hidden="true" />
          Call Us
        </a>
      </div>
    </>
  );
}
