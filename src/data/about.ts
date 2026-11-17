/** About page copy. Mission/vision come from data/team.ts; the stat comes from data/home.ts. */

export const aboutStory = {
  title: "Why we're building SkillSwap",
  paragraphs: [
    "We started SkillSwap as our venture for ESBM 3700 at CU Boulder's Leeds School of Business. We kept coming back to one pattern on campus: classmates who can shoot great photos, design a flyer in an hour, or explain calculus better than the textbook, and who still can't land their first internship because they don't have “experience” yet.",
    "Meanwhile, the clubs and small businesses around them need exactly those skills and can't afford an agency. Today the two sides find each other through Instagram DMs and word of mouth, with no reviews, no protection, and nothing to show for the work afterward.",
    "SkillSwap connects them in one trusted campus marketplace, and turns every finished job into a verified portfolio entry. Students earn money now and build the experience that opens doors later.",
  ],
};

export const aboutAudiences = [
  { icon: "GraduationCap", title: "Students", body: "Earn money with skills you already have and build a verified portfolio.", href: "/students", cta: "For students" },
  { icon: "Users", title: "Student organizations", body: "Book trusted, affordable help for events, photos, flyers, and socials.", href: "/clubs-businesses", cta: "For clubs" },
  { icon: "Store", title: "Local businesses", body: "Get marketing, design, and research help from vetted CU Boulder students.", href: "/clubs-businesses", cta: "For businesses" },
] as const;

export const aboutStatus = {
  title: "Where we are today",
  body: "SkillSwap is a concept in the validation stage. We have a clickable prototype and a pilot plan, but no live users, revenue, or partners yet. Our next step is to test our riskiest assumptions at CU Boulder.",
  links: [
    { href: "/prototype", label: "Try the prototype" },
    { href: "/prototype#mvp", label: "What we're testing" },
    { href: "/investors", label: "Investor overview" },
  ],
} as const;
