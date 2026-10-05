import type { Metadata } from "next";
import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { PageHero } from "@/components/shared/PageHero";
import { ContactForm } from "@/components/contact/ContactForm";
import { Reveal } from "@/components/motion/Reveal";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildMetadata, breadcrumbSchema, localBusinessSchema } from "@/lib/seo";
import { site, whatsappLink } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Contact Us | Book a Free UK Study Consultation",
  description:
    "Book a free consultation with a UK admissions expert in Nigeria. Visit our office, call, or message us on WhatsApp today.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={[
          localBusinessSchema,
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Contact", path: "/contact" },
          ]),
        ]}
      />
      <PageHero
        eyebrow="Contact Us"
        title="Start with one conversation."
        description="Book your free consultation at our Benin office, on a call, or on WhatsApp. Bring your results and your questions."
        image="/images/contact-support.png"
        imageAlt=""
      />

      <section className="bg-mist py-20 md:py-28">
        <div className="container-luxe grid gap-12 lg:grid-cols-[1.5fr_1fr]">
          {/* Form */}
          <Reveal direction="left">
            <div className="rounded-4xl border border-navy/5 bg-white p-8 shadow-soft md:p-12">
              <span className="eyebrow text-gold">Free Consultation</span>
              <h2 className="section-title mt-4 font-bold text-navy">
                Tell us where you want to study.
              </h2>
              <p className="mt-4 text-sm leading-7 text-graphite">
                Fields marked <span className="text-red-600">*</span> are
                required.
              </p>
              <div className="mt-8">
                <ContactForm />
              </div>
            </div>
          </Reveal>

          {/* Contact rail */}
          <Reveal direction="right" className="space-y-6">
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="card-lift flex items-center gap-5 rounded-2xl bg-success p-7 text-white shadow-soft"
            >
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/15">
                <MessageCircle className="h-6 w-6" aria-hidden="true" />
              </span>
              <span>
                <span className="block font-display text-xl font-bold">
                  Chat with us on Whatsapp
                </span>
                <span className="mt-1 block text-sm text-white/85">
                  {site.whatsapp} · Fastest response, usually within minutes.
                </span>
              </span>
            </a>

            <div className="rounded-2xl border border-navy/5 bg-white p-7 shadow-soft">
              <h3 className="font-display text-lg font-bold text-navy">
                Office Addresses
              </h3>
              <div className="mt-4 space-y-4 text-sm leading-7 text-graphite">
                <p className="flex gap-3">
                  <MapPin className="mt-1 h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
                  <span>
                    <span className="block font-semibold text-navy">Nigeria</span>
                    {site.address.street}, {site.address.city},{" "}
                    {site.address.region}, {site.address.country}
                  </span>
                </p>
                <p className="flex gap-3">
                  <MapPin className="mt-1 h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
                  <span>
                    <span className="block font-semibold text-navy">UK</span>
                    {site.addressUk.street}, {site.addressUk.city}{" "}
                    {site.addressUk.postalCode}, {site.addressUk.country}
                  </span>
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-navy/5 bg-white p-7 shadow-soft">
              <h3 className="font-display text-lg font-bold text-navy">
                Call or Email
              </h3>
              <ul className="mt-3 space-y-3 text-sm text-graphite">
                <li>
                  <a
                    href={site.phoneHref}
                    className="flex items-center gap-3 transition-colors hover:text-navy"
                  >
                    <Phone className="h-4 w-4 text-gold" aria-hidden="true" />
                    <span>
                      <span className="block font-semibold text-navy">Nigeria</span>
                      {site.phone}
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href={site.phoneUkHref}
                    className="flex items-center gap-3 transition-colors hover:text-navy"
                  >
                    <Phone className="h-4 w-4 text-gold" aria-hidden="true" />
                    <span>
                      <span className="block font-semibold text-navy">UK</span>
                      {site.phoneUk}
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${site.email}`}
                    className="flex items-center gap-3 transition-colors hover:text-navy"
                  >
                    <Mail className="h-4 w-4 text-gold" aria-hidden="true" />
                    {site.email}
                  </a>
                </li>
              </ul>
            </div>

            <div className="rounded-2xl border border-navy/5 bg-white p-7 shadow-soft">
              <h3 className="flex items-center gap-3 font-display text-lg font-bold text-navy">
                <Clock className="h-4 w-4 text-gold" aria-hidden="true" />
                Business Hours
              </h3>
              <dl className="mt-4 space-y-2 text-sm">
                {site.hours.map((slot) => (
                  <div key={slot.days} className="flex justify-between gap-4">
                    <dt className="text-graphite">{slot.days}</dt>
                    <dd className="font-semibold text-navy">{slot.time}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Maps */}
      <section className="bg-white py-16 md:py-20">
        <div className="container-luxe">
          <Reveal>
            <h2 className="font-display text-2xl font-bold text-navy md:text-3xl">
              Find our offices
            </h2>
          </Reveal>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <Reveal delay={0.05}>
              <div className="overflow-hidden rounded-2xl border border-navy/10 shadow-soft">
                <div className="border-b border-navy/10 bg-mist px-5 py-4">
                  <p className="text-sm font-semibold text-navy">Nigeria Office</p>
                  <p className="mt-1 text-sm text-graphite">
                    {site.address.street}, {site.address.city}, {site.address.region},{" "}
                    {site.address.country}
                  </p>
                </div>
                <div className="h-[320px] w-full md:h-[360px]">
                  <iframe
                    title="Akintom Global Resources Nigeria office, Benin, Edo State"
                    src="https://www.google.com/maps?q=25+Sapele+Road,+Benin,+Edo+State,+Nigeria&output=embed"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    loading="lazy"
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="overflow-hidden rounded-2xl border border-navy/10 shadow-soft">
                <div className="border-b border-navy/10 bg-mist px-5 py-4">
                  <p className="text-sm font-semibold text-navy">UK Office</p>
                  <p className="mt-1 text-sm text-graphite">
                    {site.addressUk.street}, {site.addressUk.city}{" "}
                    {site.addressUk.postalCode}, {site.addressUk.country}
                  </p>
                </div>
                <div className="h-[320px] w-full md:h-[360px]">
                  <iframe
                    title="Akintom Global Resources UK office, Newport"
                    src="https://www.google.com/maps?q=21+Clearance+Street,+Newport+NP20+2DA,+United+Kingdom&output=embed"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    loading="lazy"
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
