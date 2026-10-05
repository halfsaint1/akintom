export interface University {
  slug: string;
  name: string;
  city: string;
  ranking: string;
  badge?: string;
  programs: string[];
  image: string;
}

/*
 * Campus photos sourced from Wikimedia Commons (CC licensed):
 * - uni-south-wales.jpg  "Treforest Campus Students' Union.JPG"
 * - uni-derby.jpg        "University of Derby, Campus.jpg"
 * - uni-sunderland.jpg   "St Peter's Campus, University of Sunderland.jpg"
 * - uni-hertfordshire.jpg "University of Hertfordshire de Havilland Campus, Hatfield 01.jpg"
 * - uni-hull.jpg         "UoH Sep23 Venn Building.jpg"
 * - uni-york-st-john.jpg "York St John University.jpg"
 */
export const universities: University[] = [
  {
    slug: "university-of-south-wales",
    name: "University of South Wales",
    city: "Cardiff & Pontypridd, Wales",
    ranking: "One of Wales' Largest Universities",
    badge: "BSc · Top-Up · MSc",
    programs: ["Nursing & Health", "Aerospace Engineering", "Business", "Cyber Security"],
    image: "/images/uni-south-wales.jpg",
  },
  {
    slug: "university-of-derby",
    name: "University of Derby",
    city: "Derby, England",
    ranking: "Gold Rated for Teaching",
    badge: "BSc · MSc · PhD",
    programs: ["Nursing & Health", "Business Management", "Engineering", "Education"],
    image: "/images/uni-derby.jpg",
  },
  {
    slug: "university-of-sunderland",
    name: "University of Sunderland",
    city: "Sunderland, England",
    ranking: "Top UK University for Support",
    badge: "BSc · Top-Up · MSc",
    programs: ["Pharmacy", "Nursing", "Tourism & Business", "Computer Science"],
    image: "/images/uni-sunderland.jpg",
  },
  {
    slug: "university-of-hertfordshire",
    name: "University of Hertfordshire",
    city: "Hatfield, England",
    ranking: "High Graduate Employability",
    badge: "BSc · MSc · PhD",
    programs: ["Computer Science", "Pharmacy", "Business Analytics", "Engineering"],
    image: "/images/uni-hertfordshire.jpg",
  },
  {
    slug: "university-of-hull",
    name: "University of Hull",
    city: "Hull, England",
    ranking: "Established 1927",
    badge: "BSc · Top-Up · MSc",
    programs: ["Business & Logistics", "Biomedical Science", "Law", "Engineering"],
    image: "/images/uni-hull.jpg",
  },
  {
    slug: "york-st-john-university",
    name: "York St John University",
    city: "York, England",
    ranking: "Top-Rated Student Experience",
    badge: "BSc · MSc · PhD",
    programs: ["Psychology", "Business Management", "Education", "Computer Science"],
    image: "/images/uni-york-st-john.jpg",
  },
];
