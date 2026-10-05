import {
  GraduationCap,
  Award,
  Stamp,
  Compass,
  Home,
  FileCheck2,
  type LucideIcon,
} from "lucide-react";

export interface Service {
  slug: string;
  title: string;
  short: string;
  description: string;
  included: string[];
  icon: LucideIcon;
}

export const services: Service[] = [
  {
    slug: "university-placement",
    title: "University Admission",
    short: "We help you get into the right UK university for you, not just any university.",
    description:
      "We start with your grades, your budget and what you want to do after graduation, then build a short list of UK universities where you have a real chance of an offer. Your expert helps you present your personal statement, references and transcripts the way admission officers actually read them.",
    included: [
      "One-to-one profile assessment (WAEC, HND, BSc, or professional route)",
      "Focused shortlist of 3 to 5 best-fit universities",
      "Personal statement strategy and review",
      "Direct submission to partner universities",
      "Offer negotiation and deadline management",
    ],
    icon: GraduationCap,
  },
  {
    slug: "scholarship-support",
    title: "Scholarship Guidance",
    short: "We find the scholarships you can actually win and help you apply properly.",
    description:
      "Most applicants chase every scholarship and win none. We look at your profile and pick out the awards you have a realistic shot at, like university bursaries, country-specific awards and merit scholarships. Then we help you prepare applications that can actually compete.",
    included: [
      "Scholarship eligibility audit",
      "Vice-Chancellor and international merit award applications",
      "Scholarship essay coaching",
      "Funding plan combining awards, bursaries and family sponsorship",
    ],
    icon: Award,
  },
  {
    slug: "visa-assistance",
    title: "Visa Assistance",
    short: "End-to-end UK Student visa support with a 99% success record.",
    description:
      "From CAS to biometric appointment, every document is reviewed for clarity, consistency, and UKVI compliance. We prepare your proof of funds correctly the first time and rehearse you for any credibility interview.",
    included: [
      "CAS and document checklist management",
      "Proof-of-funds structuring and review",
      "Visa application form completion",
      "Credibility interview preparation",
      "TB test and biometrics scheduling guidance",
    ],
    icon: Stamp,
  },
  {
    slug: "career-counselling",
    title: "Career Counselling",
    short: "Expert education planning that connects your degree to a career outcome.",
    description:
      "A UK degree is a big investment. We look at your course choices alongside post-study work options, professional accreditation, and the job market in Nigeria and abroad, so the degree you choose still makes sense five years from now.",
    included: [
      "Career-path mapping session",
      "Course-to-career fit analysis",
      "Graduate Route (post-study work) planning",
      "Professional accreditation guidance (ACCA, GMC, BPS and more)",
    ],
    icon: Compass,
  },
  {
    slug: "accommodation-support",
    title: "Accommodation Support",
    short: "Safe, budget-appropriate housing secured before you fly.",
    description:
      "We help you compare university halls, private student residences and shared housing, then secure a room before you fly. Your family will know exactly where you are sleeping on your first night.",
    included: [
      "Halls vs private accommodation comparison",
      "Booking support and contract review",
      "Budget planning for deposits and rent",
      "Arrival-week check-in support",
    ],
    icon: Home,
  },
  {
    slug: "application-processing",
    title: "Application Processing",
    short: "Fast, accurate submissions. No missed deadlines, no avoidable rejections.",
    description:
      "Documents are verified, certified, and submitted correctly the first time. You and your sponsor receive progress updates at every stage, so nobody is left guessing what is happening with the application.",
    included: [
      "Document verification and certification",
      "UCAS and direct application submission",
      "Status tracking with parent/sponsor updates",
      "Deferral and reapplication handling",
    ],
    icon: FileCheck2,
  },
];

export const processSteps = [
  {
    step: 1,
    title: "Free Consultation",
    text: "We look at your grades, goals, budget and timeline, and answer every question honestly.",
  },
  {
    step: 2,
    title: "Course Selection",
    text: "You receive a focused shortlist of courses and universities matched to your profile.",
  },
  {
    step: 3,
    title: "Application Submission",
    text: "Your documents are checked and submitted properly the first time, well before any deadline.",
  },
  {
    step: 4,
    title: "Admission Offer",
    text: "We manage offers, negotiate conditions, and help you accept the right one.",
  },
  {
    step: 5,
    title: "Visa Processing",
    text: "CAS, proof of funds and the visa application itself, handled by a team with a 99% success record.",
  },
  {
    step: 6,
    title: "Travel Preparation",
    text: "Accommodation, flights and a proper pre-departure briefing, so you land prepared.",
  },
] as const;

export const whyChoose = [
  {
    title: "99% Visa Success Rate",
    text: "Our visa team reviews every document for UKVI compliance and prepares you for credibility interviews, so your application is ready the first time.",
  },
  {
    title: "Experienced UK Experts",
    text: "Work with consultants who have spent 10+ years placing Nigerian students into UK universities and know how admission teams read applications.",
  },
  {
    title: "Complete End-to-End Support",
    text: "From your first consultation to your first lecture, one named expert handles university selection, applications, visas, and accommodation.",
  },
  {
    title: "80+ UK University Partners",
    text: "Direct relationships with universities across England and Wales for faster offers, honest feedback, and access to international scholarships.",
  },
] as const;
