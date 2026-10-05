"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { navLinks } from "@/lib/site";
import { ButtonLink } from "@/components/ui/Button";
import { Logo } from "@/components/brand/Logo";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const isHome = pathname === "/";
  const solid = scrolled || !isHome || isOpen;

  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => setScrolled(window.scrollY > 24));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    // Sync once on mount (e.g. scroll restoration) without a synchronous setState.
    frame = requestAnimationFrame(() => setScrolled(window.scrollY > 24));
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const closeMenu = useCallback(() => setIsOpen(false), []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        solid
          ? "border-b border-navy/10 bg-white/90 shadow-soft backdrop-blur-md"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <nav
        aria-label="Main navigation"
        className="container-luxe flex h-[72px] items-center justify-between gap-6"
      >
        <Logo
          href="/"
          onClick={closeMenu}
          tone={solid ? "onLight" : "onDark"}
        />

        <ul className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={cn(
                  "text-base font-medium transition-colors",
                  solid
                    ? "text-ink hover:text-navy"
                    : "text-white/85 hover:text-white",
                  pathname === link.href &&
                    (solid ? "text-navy underline decoration-gold decoration-2 underline-offset-8" : "text-white underline decoration-gold decoration-2 underline-offset-8"),
                )}
                aria-current={pathname === link.href ? "page" : undefined}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden lg:block">
          <ButtonLink href="/apply" variant="primary" size="sm">
            Apply Now
          </ButtonLink>
        </div>

        <button
          type="button"
          onClick={() => setIsOpen((open) => !open)}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          className={cn(
            "flex h-11 w-11 items-center justify-center rounded-xl lg:hidden",
            solid ? "text-navy" : "text-white",
          )}
        >
          {isOpen ? (
            <X className="h-6 w-6" aria-hidden="true" />
          ) : (
            <Menu className="h-6 w-6" aria-hidden="true" />
          )}
        </button>
      </nav>

      <AnimatePresence>
        {isOpen ? (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="border-t border-navy/10 bg-white lg:hidden"
          >
            <ul className="container-luxe flex flex-col gap-1 py-5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={closeMenu}
                    aria-current={pathname === link.href ? "page" : undefined}
                    className={cn(
                      "block rounded-xl px-4 py-3 text-lg font-medium text-ink hover:bg-mist",
                      pathname === link.href && "bg-mist text-navy",
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li className="mt-3 px-4 pb-2">
                <ButtonLink
                  href="/apply"
                  variant="primary"
                  className="w-full"
                  onClick={closeMenu}
                >
                  Apply Now
                </ButtonLink>
              </li>
            </ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
