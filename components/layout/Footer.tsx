import Link from "next/link";
import {
  MapPin,
  Phone,
  Instagram,
  Facebook,
  Linkedin,
  Twitter,
} from "lucide-react";
import { site, navLinks } from "@/lib/site";
import { Logo } from "@/components/brand/Logo";

const serviceLinks = [
  { label: "University Admission", href: "/services#university-placement" },
  { label: "Scholarship Guidance", href: "/services#scholarship-support" },
  { label: "Visa Assistance", href: "/services#visa-assistance" },
  { label: "Accommodation Support", href: "/services#accommodation-support" },
  { label: "Career Counselling", href: "/services#career-counselling" },
];

const socials = [
  { label: "Instagram", href: site.social.instagram, Icon: Instagram },
  { label: "Facebook", href: site.social.facebook, Icon: Facebook },
  { label: "LinkedIn", href: site.social.linkedin, Icon: Linkedin },
  { label: "X (Twitter)", href: site.social.twitter, Icon: Twitter },
];

export function Footer() {
  return (
    <footer className="bg-navy-deep text-white">
      <div className="container-luxe grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo tone="onDark" href="/" className="mb-6" />
          <p className="max-w-xs text-sm leading-7 text-white/70">
            A UK universities recruitment and admissions agency in Nigeria,
            guiding students from their first conversation to their first
            lecture.
          </p>
          <ul className="mt-6 flex gap-3" aria-label="Social media">
            {socials.map(({ label, href, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-gold hover:text-gold"
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <nav aria-label="Footer company links">
          <p className="mb-5 text-sm font-bold uppercase tracking-eyebrow text-gold">
            Company
          </p>
          <ul className="grid gap-3">
            {navLinks
              .filter((link) => link.href !== "/")
              .map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 transition-colors hover:text-gold"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
          </ul>
        </nav>

        <nav aria-label="Footer service links">
          <p className="mb-5 text-sm font-bold uppercase tracking-eyebrow text-gold">
            Services
          </p>
          <ul className="grid gap-3">
            {serviceLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-white/70 transition-colors hover:text-gold"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="mb-5 text-sm font-bold uppercase tracking-eyebrow text-gold">
            Contact
          </p>
          <ul className="grid gap-4 text-sm text-white/70">
            <li className="flex gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
              <span>
                <span className="block font-semibold text-white/85">Nigeria</span>
                {site.address.street}, {site.address.city},{" "}
                {site.address.region}, {site.address.country}
              </span>
            </li>
            <li className="flex gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
              <span>
                <span className="block font-semibold text-white/85">UK</span>
                {site.addressUk.street}, {site.addressUk.city}{" "}
                {site.addressUk.postalCode}, {site.addressUk.country}
              </span>
            </li>
            <li>
              <a
                href={site.phoneHref}
                className="flex gap-3 transition-colors hover:text-gold"
              >
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
                <span>
                  <span className="block font-semibold text-white/85">Nigeria</span>
                  {site.phone}
                </span>
              </a>
            </li>
            <li>
              <a
                href={site.phoneUkHref}
                className="flex gap-3 transition-colors hover:text-gold"
              >
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
                <span>
                  <span className="block font-semibold text-white/85">UK</span>
                  {site.phoneUk}
                </span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-luxe py-6 text-xs text-white/50">
          <p>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
