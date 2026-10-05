export const site = {
  name: "Akintom Global Resources",
  shortName: "Akintom",
  tagline: "UK Universities Recruitment & Admissions, Nigeria",
  url: "https://akintomglobalresources.com",
  email: "info@akintomglobalresources.com",
  phone: "+234 705 484 3717",
  phoneHref: "tel:+2347054843717",
  phoneUk: "+44 7760 984868",
  phoneUkHref: "tel:+447760984868",
  whatsapp: "+2347054843717",
  whatsappNumber: "2347054843717",
  address: {
    street: "25 Sapele Road",
    city: "Benin",
    region: "Edo State",
    country: "Nigeria",
  },
  addressUk: {
    street: "21 Clearance Street",
    city: "Newport",
    country: "United Kingdom",
    postalCode: "NP20 2DA",
  },
  hours: [
    { days: "Monday to Friday", time: "9:00 AM - 6:00 PM" },
    { days: "Saturday", time: "10:00 AM - 3:00 PM" },
    { days: "Sunday", time: "Closed" },
  ],
  social: {
    instagram: "https://instagram.com/akintomglobal",
    facebook: "https://facebook.com/akintomglobal",
    linkedin: "https://linkedin.com/company/akintom-global-resources",
    twitter: "https://x.com/akintomglobal",
  },
  stats: {
    studentsPlaced: 1750,
    partnerUniversities: 80,
    visaSuccessRate: 99,
    yearsExperience: 10,
  },
} as const;

export function whatsappLink(message?: string): string {
  const text = encodeURIComponent(
    message ??
      "Hello Akintom, I would like to speak with a UK admissions expert.",
  );
  return `https://wa.me/${site.whatsappNumber}?text=${text}`;
}

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Events & News", href: "/news" },
  { label: "Contact", href: "/contact" },
] as const;
