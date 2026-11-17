/** Investors / About page copy. Source of truth: the SkillSwap pitch deck. */

export const trends = [
  { icon: "GraduationCap", title: "Career readiness", body: "Employers and students both want professional experience before graduation." },
  { icon: "Clock", title: "Flexible, project-based work", body: "Organizations want affordable talent for short-term projects, not full-time hires." },
  { icon: "Sparkles", title: "Campus entrepreneurship", body: "Students already monetize their skills through Instagram, Venmo, and word of mouth." },
] as const;

/** Illustrative market-sizing model from the deck. These are estimates, not results. */
export const marketModel = {
  steps: [
    { value: 30000, format: "number", label: "students in the example market" },
    { value: 10, format: "percent", label: "assumed to buy a service each year" },
    { value: 3000, format: "number", label: "potential annual buyers" },
    { value: 360000, format: "money-k", label: "annual transaction volume" },
    { value: 36000, format: "money-k", label: "potential annual platform revenue at a 10% fee" },
  ],
  note: "Illustrative model from our pitch deck, not actual results. Implies roughly $120 of spending per buyer per year. Launch at CU Boulder, then expand nationwide.",
} as const;

export const customerGroups = [
  { n: 1, name: "Students", who: "Freshmen and sophomores with photo, design, or tutoring skills", cares: "Earn money, build a résumé, flexible hours, keep 90%" },
  { n: 2, name: "Student organizations", who: "Clubs, Greek life, and student government", cares: "Cheap, reliable help for events, photos, flyers, and socials" },
  { n: 3, name: "Local small businesses", who: "Coffee shops, boutiques, and restaurants near campus", cares: "Affordable marketing, design, and research from vetted students" },
] as const;

export const cuNumbers = [
  { value: 32520, format: "number", label: "CU Boulder undergraduates" },
  { value: 500, format: "approx", label: "recognized student organizations" },
  { value: 19.4, format: "millions", label: "U.S. college students (long-term market)" },
] as const;

export const growthPath = ["CU Boulder", "Colorado campuses", "19.4M U.S. college students"] as const;

export const competitionColumns = ["Built for students", "Campus peer gigs", "Paid work with businesses", "Gigs + projects in one portfolio"] as const;

export const competitors = [
  { name: "Fiverr", desc: "Global freelance marketplace", marks: [false, false, true, false] },
  { name: "Handshake", desc: "Career network, 1,500+ universities", marks: [true, false, true, false] },
  { name: "Parker Dewey", desc: "Paid micro-internships, 10–40 hrs", marks: [true, false, true, false] },
  { name: "Instagram & word of mouth", desc: "How students sell services today", marks: [false, true, false, false] },
  { name: "SkillSwap", desc: "Campus gigs + projects + portfolio", marks: [true, true, true, true], us: true },
] as const;

export const howWeWin = [
  { title: "Go narrow", body: "Become the default on one campus before scaling to the next." },
  { title: "Network effects", body: "Each new club and business makes SkillSwap more useful for every student, and vice versa." },
  { title: "Portfolio lock-in", body: "Students' verified work history grows every year they stay, and it doesn't transfer to other platforms." },
] as const;

export const pullQuote = "Features can be copied. Campus trust can't.";

export const businessModel = {
  points: [
    "Multi-sided platform: free to join for students, clubs, and businesses.",
    "10–15% commission per completed job, included in the price.",
    "Students keep 90% on peer gigs (Fiverr sellers keep 80%).",
    "Trust built in: .edu verification, reviews, and payment held until delivery.",
  ],
  later: ["Featured listings for students", "Business project packages (“Social Media Starter Pack,” “Grand Opening Pack”)"],
} as const;

export const strategy = {
  name: "Architectural strategy",
  body: "We own the portfolio: the verified record of student work that sits between students, clubs, and businesses. Our moat is network effects plus lock-in.",
  roadmap: [
    { emoji: "🎓", label: "Students", body: "Recruit verified student providers first" },
    { emoji: "🏛", label: "Clubs", body: "Bring in clubs with event and design demand" },
    { emoji: "🏪", label: "Businesses", body: "Add local shops for higher-value projects" },
    { emoji: "📍", label: "Next campus", body: "Replicate the playbook campus by campus" },
  ],
} as const;

export const ask = {
  amount: 50000,
  equity: 10,
  headline: "Help us launch SkillSwap at CU Boulder.",
  funds: [
    { label: "App development", amount: 20000, pct: 40 },
    { label: "Marketing & student acquisition", amount: 10000, pct: 20 },
    { label: "Business development", amount: 7500, pct: 15 },
    { label: "Payment infrastructure", amount: 5000, pct: 10 },
    { label: "Safety & verification", amount: 7500, pct: 15 },
  ],
  milestones: [
    { when: "Months 1–4", what: "Build and test the app" },
    { when: "Months 5–6", what: "Launch at CU Boulder with 100 verified student providers" },
    { when: "Months 7–9", what: "Reach 150 paid bookings and measure repeat booking rates" },
  ],
  investors: "CU Boulder alumni and local angel investors",
} as const;
