export type NewsCategory =
  | "study-abroad-tips"
  | "scholarships"
  | "uk-universities"
  | "visa-updates"
  | "events";

export interface NewsPost {
  slug: string;
  title: string;
  excerpt: string;
  category: NewsCategory;
  date: string; // ISO
  readMinutes: number;
  image: string;
  featured?: boolean;
  content: {
    heading: string;
    paragraphs: string[];
  }[];
}

export const newsCategories: { value: NewsCategory | "all"; label: string }[] = [
  { value: "all", label: "All" },
  { value: "study-abroad-tips", label: "Study Abroad Tips" },
  { value: "scholarships", label: "Scholarships" },
  { value: "uk-universities", label: "UK Universities" },
  { value: "visa-updates", label: "Visa Updates" },
  { value: "events", label: "Events" },
];

export const categoryLabel = (value: NewsCategory): string =>
  newsCategories.find((c) => c.value === value)?.label ?? value;

export const newsPosts: NewsPost[] = [
  {
    slug: "uk-education-fair-lagos-2026",
    title: "UK Education Fair Lagos 2026: Meet 25+ Universities in One Day",
    excerpt:
      "Our flagship fair returns to Victoria Island. Speak directly with admission officers from South Wales, Derby, Hertfordshire, Hull and more, and get your profile assessed on the spot.",
    category: "events",
    date: "2026-06-02",
    readMinutes: 3,
    image: "/images/news-education-fair.png",
    featured: true,
    content: [
      {
        heading: "What to expect on the day",
        paragraphs: [
          "Our Lagos education fair is designed for students and parents who want straight answers before committing money to an application. You will be able to speak with university representatives, compare entry routes, and ask practical questions about deposits, scholarships, accommodation and visa timelines.",
          "Bring your WAEC, NECO, HND, degree transcript or any result you currently have. Even if your documents are incomplete, our counsellors can still review your profile and explain the next sensible step.",
        ],
      },
      {
        heading: "Who should attend",
        paragraphs: [
          "The fair is useful if you are targeting foundation, undergraduate, top-up, pre-master's or postgraduate study in the UK. It is also a good fit for parents who want to understand the full cost before their child applies.",
          "Students interested in South Wales, Derby, Hertfordshire, Hull, Sunderland, York St John and similar practical UK universities will get the most value from the event.",
        ],
      },
      {
        heading: "How Akintom can help",
        paragraphs: [
          "After your profile check, we will tell you which universities are realistic, which documents need work, and what timeline gives you the strongest chance for your preferred intake.",
        ],
      },
    ],
  },
  {
    slug: "scholarships-nigerian-students-actually-win",
    title: "The UK Scholarships Nigerian Students Actually Win in 2026",
    excerpt:
      "Stop applying for everything. These are the Vice-Chancellor awards, GREAT scholarships and country bursaries with realistic odds, and how to apply for them properly.",
    category: "scholarships",
    date: "2026-05-21",
    readMinutes: 7,
    image: "/images/news-scholarships.png",
    content: [
      {
        heading: "Start with scholarships you can realistically win",
        paragraphs: [
          "Many students waste time applying for awards that do not match their grades, course level or nationality. A better approach is to shortlist scholarships where Nigerian students have a genuine chance and where your academic record, work experience or personal story fits the criteria.",
          "Common opportunities include Vice-Chancellor awards, international merit discounts, GREAT Scholarships, course-specific bursaries and early deposit discounts. The names change by university, but the strongest applications usually have one thing in common: they are specific.",
        ],
      },
      {
        heading: "What makes a strong application",
        paragraphs: [
          "A scholarship statement should not read like a copied motivation letter. It should explain what you have done, why the course matters now, and how the award changes your ability to study. Concrete details are more convincing than big claims.",
          "Before applying, check whether the scholarship is automatic or requires a separate essay. Also confirm the deadline, deposit rules and whether the award can be combined with other discounts.",
        ],
      },
      {
        heading: "Our advice",
        paragraphs: [
          "Apply early, keep your documents consistent, and do not wait for one dream scholarship before submitting university applications. A balanced plan can include a main choice, one scholarship-focused choice and one safer admission option.",
        ],
      },
    ],
  },
  {
    slug: "september-2026-admission-deadlines",
    title: "September 2026 Intake: Admission Deadlines You Cannot Miss",
    excerpt:
      "A university-by-university deadline tracker for the September intake, including when partner universities stop accepting international applications.",
    category: "uk-universities",
    date: "2026-05-12",
    readMinutes: 5,
    image: "/images/news-deadlines.png",
    content: [
      {
        heading: "Why September deadlines feel closer than they look",
        paragraphs: [
          "September is the busiest UK intake, and popular courses can close before the public deadline. International teams also need time to issue offers, confirm deposits, check CAS documents and answer visa-related questions.",
          "If you are applying from Nigeria, you should work backwards from the visa stage, not just the course deadline. Proof of funds, TB testing, CAS checks and accommodation decisions all take time.",
        ],
      },
      {
        heading: "A practical timeline",
        paragraphs: [
          "By March or April, you should have a shortlist and know the documents each university needs. By May or June, serious applicants should be submitting or already holding offers. By July, deposits and CAS documents become urgent.",
          "Late applications can still work, but they leave less room to fix mistakes. If your transcript, reference or proof of funds needs attention, start earlier than you think.",
        ],
      },
      {
        heading: "What to prepare now",
        paragraphs: [
          "Gather academic records, passport details, references, English language evidence where required, and a clear funding plan. Once those are in place, your expert can move faster when the right university confirms availability.",
        ],
      },
    ],
  },
  {
    slug: "uk-student-visa-proof-of-funds-2026",
    title: "UK Student Visa 2026: Proof of Funds Requirements Explained",
    excerpt:
      "The 28-day rule, acceptable accounts, and the documentation mistakes that cause refusals, explained by our visa team in plain language.",
    category: "visa-updates",
    date: "2026-04-28",
    readMinutes: 6,
    image: "/images/news-visa.png",
    content: [
      {
        heading: "The 28-day rule in plain English",
        paragraphs: [
          "For most Student visa applications, your required funds must stay in an acceptable account for at least 28 consecutive days. The closing balance date must also be close enough to your visa application date, so timing matters.",
          "The amount you need depends on unpaid tuition and living costs. London and outside-London living cost requirements are different, so do not copy someone else's calculation without checking your own CAS and study location.",
        ],
      },
      {
        heading: "Common mistakes we see",
        paragraphs: [
          "Students often submit bank statements with unexplained large deposits, missing account holder names, unclear dates or balances that drop below the required amount during the 28 days. These issues can lead to refusal even when the money is genuinely available.",
          "If a parent or guardian is sponsoring you, the relationship documents and consent letter must be clear. If a company, uncle or family friend is funding you, get advice before assuming it will be accepted.",
        ],
      },
      {
        heading: "Before you apply",
        paragraphs: [
          "Check the statement dates, account type, account holder name, currency conversion and CAS tuition balance before paying the visa fee. A careful review before submission is much easier than trying to recover after a refusal.",
        ],
      },
    ],
  },
  {
    slug: "january-vs-september-intake",
    title: "January vs September Intake: Which Is Right for You?",
    excerpt:
      "Course availability, scholarship timing, and visa processing windows differ between intakes. Here is how to choose strategically.",
    category: "study-abroad-tips",
    date: "2026-04-10",
    readMinutes: 5,
    image: "/images/news-intakes.png",
    content: [
      {
        heading: "The difference is not only the month",
        paragraphs: [
          "September usually has the widest course choice and the largest scholarship pool. January can be better for students who need more time to prepare documents, improve funding readiness or recover from a missed September deadline.",
          "Some universities offer the same course in both intakes, while others only open selected programmes in January. This is why your intake decision should start with course availability, not convenience alone.",
        ],
      },
      {
        heading: "When January makes sense",
        paragraphs: [
          "January can work well if your transcript is delayed, your proof of funds needs more time, or you want a calmer application process. It can also help applicants who need to strengthen their statement or compare routes carefully.",
          "The trade-off is that fewer courses may be available and some scholarships may have smaller budgets. You should check this before delaying an application.",
        ],
      },
      {
        heading: "How to choose",
        paragraphs: [
          "Choose the intake that gives you the strongest complete application. A rushed September application is not always better than a well-prepared January one, but waiting without a plan can cost you both options.",
        ],
      },
    ],
  },
  {
    slug: "hnd-to-uk-masters-route",
    title: "From HND to UK Master's: The Conversion Route Explained",
    excerpt:
      "Thousands of HND holders assume a UK Master's is out of reach. The top-up and APL routes say otherwise. Here is the step-by-step pathway.",
    category: "study-abroad-tips",
    date: "2026-03-22",
    readMinutes: 6,
    image: "/images/news-hnd.png",
    content: [
      {
        heading: "Yes, HND holders can have UK options",
        paragraphs: [
          "An HND does not automatically block you from UK study. The right route depends on your grade, course area, work experience and the university's recognition policy. For some students, a top-up year is the cleanest pathway. For others, relevant professional experience can strengthen a postgraduate application.",
          "The mistake is assuming every university will treat your HND the same way. They will not. Entry decisions vary, and the course match matters.",
        ],
      },
      {
        heading: "Top-up, pre-master's or direct master's",
        paragraphs: [
          "A top-up year can convert your HND into a bachelor's degree before master's study. A pre-master's can help bridge academic gaps for some postgraduate applicants. Direct master's entry may be possible where your work experience and academic background are strong enough.",
          "Your expert should compare these routes honestly, including cost, duration and visa implications. The best route is not always the fastest one.",
        ],
      },
      {
        heading: "Documents that help",
        paragraphs: [
          "Prepare your HND transcript, certificate, course outlines if available, CV, references and evidence of relevant work. A clear CV can make a real difference when experience is part of the case.",
        ],
      },
    ],
  },
];
