export type TestimonialCategory =
  | "undergraduate"
  | "postgraduate"
  | "scholarship"
  | "visa";

export interface Testimonial {
  id: string;
  name: string;
  course: string;
  university: string;
  category: TestimonialCategory;
  rating: number;
  quote: string;
  story: string;
  photo: string;
  hasVideo?: boolean;
}

export const testimonialCategories: { value: TestimonialCategory | "all"; label: string }[] = [
  { value: "all", label: "All Stories" },
  { value: "undergraduate", label: "Undergraduate" },
  { value: "postgraduate", label: "Postgraduate" },
  { value: "scholarship", label: "Scholarship" },
  { value: "visa", label: "Visa Success" },
];

export const testimonials: Testimonial[] = [
  {
    id: "tomiwa-a",
    name: "Tomiwa Adebayo",
    course: "MSc Data Science",
    university: "University of Hertfordshire",
    category: "postgraduate",
    rating: 5,
    quote:
      "I came in confused and honestly a bit embarrassed because I had changed my mind so many times. My expert helped me choose a course that made sense with my background, and my personal statement still sounded like me.",
    story:
      "Tomiwa had a 2:2 in Statistics and was torn between three different course areas. We helped her narrow the options, connect her work experience to data science, and prepare the documents Hertfordshire needed. Her visa was approved after one submission.",
    photo: "/images/testimonial-tomiwa.png",
    hasVideo: true,
  },
  {
    id: "chinedu-o",
    name: "Chinedu Okafor",
    course: "BEng Civil Engineering",
    university: "University of South Wales",
    category: "undergraduate",
    rating: 5,
    quote:
      "My parents asked plenty of questions, and Akintom never made them feel like they were disturbing. That gave us confidence. I knew what was happening at every stage.",
    story:
      "Chinedu's family wanted a clear route before paying deposits. We explained the foundation-to-degree pathway, checked his WAEC documents, and kept his parents updated until his University of South Wales offer came through.",
    photo: "/images/testimonial-chinedu.png",
  },
  {
    id: "amaka-e",
    name: "Amaka Eze",
    course: "MSc Public Health",
    university: "University of Derby",
    category: "scholarship",
    rating: 5,
    quote:
      "I nearly skipped the scholarship section because I thought I would not qualify. They pushed me to try, helped me rewrite the essay, and I got a 40% tuition award.",
    story:
      "Amaka had a strong academic record but was underselling herself. Her expert matched her to a realistic Vice-Chancellor's award, reviewed her essay drafts, and helped her submit before the deadline.",
    photo: "/images/testimonial-amaka.png",
    hasVideo: true,
  },
  {
    id: "ibrahim-s",
    name: "Ibrahim Suleiman",
    course: "MBA",
    university: "University of Hull",
    category: "postgraduate",
    rating: 5,
    quote:
      "I was applying while working full time, so I needed someone organised. They gave me a checklist, reminded me before each deadline, and did not waste my time.",
    story:
      "Ibrahim was managing an Abuja banking role alongside his MBA application. We organised his documents around his schedule, prepared him for the credibility interview, and his visa was approved in three weeks.",
    photo: "/images/testimonial-ibrahim.png",
  },
  {
    id: "blessing-n",
    name: "Blessing Nwosu",
    course: "BSc Psychology",
    university: "York St John University",
    category: "visa",
    rating: 5,
    quote:
      "After my first refusal I was scared to apply again. Akintom explained exactly what went wrong, fixed the proof of funds issue, and stayed calm when I was panicking.",
    story:
      "Blessing came to us after a refusal with another agent. We reviewed the refusal letter, corrected the financial evidence, and rebuilt the application so the new submission answered the caseworker's concerns clearly.",
    photo: "/images/testimonial-blessing.png",
  },
  {
    id: "david-o",
    name: "David Oyelaran",
    course: "MSc Cyber Security",
    university: "University of Sunderland",
    category: "postgraduate",
    rating: 5,
    quote:
      "I kept hearing different things about HND routes, and it was confusing. Akintom explained what was realistic, what was not, and the exact documents I needed.",
    story:
      "David had an HND plus several years of IT experience. His expert compared top-up and APL options, positioned his experience properly, and helped him secure a Sunderland route with accommodation sorted before departure.",
    photo: "/images/testimonial-david.png",
    hasVideo: true,
  },
];
