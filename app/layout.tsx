import type { Metadata, Viewport } from "next";
import { Kumbh_Sans, Rubik } from "next/font/google";
import { site } from "@/lib/site";
import { organizationSchema, websiteSchema } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FloatingCtas } from "@/components/layout/FloatingCtas";
import "./globals.css";

const rubik = Rubik({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const kumbhSans = Kumbh_Sans({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Study in the UK from Nigeria | Akintom Global Resources",
    template: `%s | ${site.name}`,
  },
  description:
    "UK admission consultants in Nigeria. Free consultation for university placement, scholarships and student visa support. Book yours today.",
  keywords: [
    "study in UK from Nigeria",
    "UK admission consultants Nigeria",
    "UK university agents Nigeria",
    "UK student visa support",
    "study abroad consultants Nigeria",
  ],
  openGraph: {
    type: "website",
    locale: "en_NG",
    url: site.url,
    siteName: site.name,
    images: [{ url: "/images/og-image.png", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    shortcut: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: "#0B1F4D",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${rubik.variable} ${kumbhSans.variable}`}
    >
      <body>
        <JsonLd data={[organizationSchema, websiteSchema]} />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-navy focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-white"
        >
          Skip to main content
        </a>
        <Navbar />
        <main id="main-content">{children}</main>
        <Footer />
        <FloatingCtas />
      </body>
    </html>
  );
}
