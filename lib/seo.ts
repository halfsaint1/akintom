import type { Metadata } from "next";
import { site } from "@/lib/site";
import { faqs } from "@/lib/data/faqs";

interface PageSeo {
  title: string;
  description: string;
  path: string;
}

export function buildMetadata({ title, description, path }: PageSeo): Metadata {
  const url = `${site.url}${path}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: site.name,
      locale: "en_NG",
      type: "website",
      images: [
        {
          url: "/images/og-image.png",
          width: 1200,
          height: 630,
          alt: `${site.name}: Study in the UK with Confidence`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/images/og-image.png"],
    },
  };
}

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: site.name,
  url: site.url,
  logo: `${site.url}/brand/akintom-logo-mark.svg`,
  description:
    "UK universities recruitment and admissions agency in Nigeria. University placement, scholarship guidance, and student visa support for Nigerian students.",
  email: site.email,
  telephone: site.phone,
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.street,
    addressLocality: site.address.city,
    addressRegion: site.address.region,
    addressCountry: "NG",
  },
  sameAs: Object.values(site.social),
};

export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: site.name,
  image: `${site.url}/images/og-image.png`,
  url: site.url,
  telephone: site.phone,
  email: site.email,
  priceRange: "Free consultation",
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.street,
    addressLocality: site.address.city,
    addressRegion: site.address.region,
    addressCountry: "NG",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 6.335,
    longitude: 5.6037,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Saturday",
      opens: "10:00",
      closes: "15:00",
    },
  ],
  areaServed: { "@type": "Country", name: "Nigeria" },
};

export const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: { "@type": "Answer", text: faq.answer },
  })),
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: site.name,
  url: site.url,
};

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${site.url}${item.path}`,
    })),
  };
}
