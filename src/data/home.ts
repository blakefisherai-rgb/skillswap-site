/**
 * Homepage copy. Source of truth: the SkillSwap pitch deck.
 * Icons are lucide-react names, resolved in the components.
 */

export const pillars = [
  {
    icon: "Wallet",
    title: "Earn Money",
    body: "Get paid for skills you already have, from headshots to tutoring to flyer design.",
  },
  {
    icon: "Briefcase",
    title: "Gain Experience",
    body: "Complete real-world projects for clubs and local businesses, not just class assignments.",
  },
  {
    icon: "BadgeCheck",
    title: "Build Your Future",
    body: "Every finished job lands in a verified professional portfolio you can show any employer.",
  },
] as const;

export const problem = {
  eyebrow: "The problem",
  title: "The experience paradox",
  lead: "Students need experience to get opportunities, but they need opportunities to gain experience.",
  cards: [
    {
      title: "Experience Barrier",
      body: "Entry-level opportunities often favor students who already have prior experience.",
    },
    {
      title: "Untapped Skills",
      body: "Students have valuable skills but lack access to paying clients and real chances to use them.",
    },
    {
      title: "Disconnected Demand",
      body: "Campus organizations and small businesses need affordable, flexible talent and don't know where to find it.",
    },
  ],
  stat: {
    value: "38%",
    label: "of surveyed students and graduates wanted an internship but hadn't completed one.",
    source: "California Competes, “Listening to Learners”",
  },
} as const;

export const solution = {
  eyebrow: "The solution",
  title: "Meet SkillSwap",
  intro: "One app that turns the skills students already have into paid work, real projects, and proof they can show.",
  steps: [
    {
      title: "Find a Gig",
      body: "Earn with skills you already have.",
      tags: ["Photography", "Design", "Tutoring"],
      card: { kind: "gig", title: "Campus Photography", price: "$75", type: "Campus Gig", icon: "Camera" },
    },
    {
      title: "Build Experience",
      body: "Complete real business projects.",
      tags: ["Marketing", "Research", "Analytics"],
      card: { kind: "gig", title: "Social Media Audit", price: "$250", type: "Business Project", icon: "BarChart3" },
    },
    {
      title: "Showcase Skills",
      body: "Build a verified professional portfolio.",
      tags: ["Completed Work", "Client Reviews", "Demonstrated Skills"],
      card: { kind: "portfolio", title: "Photography Gig Completed", type: "Verified portfolio item", icon: "BadgeCheck" },
    },
  ],
} as const;

export const features = [
  {
    icon: "ShieldCheck",
    title: "Verified students",
    body: "Every provider signs up with a .edu email, so clubs and businesses know they're hiring a real CU Boulder student.",
    audience: "Clubs & businesses",
  },
  {
    icon: "LayoutGrid",
    title: "A portfolio that builds itself",
    body: "Finished jobs, client reviews, and skills post to your profile automatically. No résumé formatting required.",
    audience: "Students",
  },
  {
    icon: "LockKeyhole",
    title: "Payment held until delivery",
    body: "Clients pay up front, and SkillSwap releases the money when the work is delivered. Students get paid; clients get what they booked.",
    audience: "Everyone",
  },
  {
    icon: "Star",
    title: "Reviews & ratings",
    body: "Two-way reviews after every job build trust on campus and help the best student talent stand out.",
    audience: "Everyone",
  },
  {
    icon: "PiggyBank",
    title: "Students keep 90%",
    body: "Our fee on peer gigs is 10%. Fiverr's is 20%. More of every job goes to the student who did the work.",
    audience: "Students",
  },
  {
    icon: "Sparkles",
    title: "Free to join",
    body: "No sign-up fee and no subscription. SkillSwap only earns a 10–15% commission when a job is completed.",
    audience: "Everyone",
  },
] as const;

export const prototypeTeaser = {
  eyebrow: "Try it",
  title: "Click through the SkillSwap app",
  body: "Our prototype runs right in your browser. Search gigs, open a student's verified profile, book a job with payment held until delivery, and watch a completed gig land in the portfolio.",
  bullets: ["Browse & filter gigs", "Verified student profiles", "Book with a clear fee breakdown", "Portfolio that updates live"],
} as const;

export const waitlistBand = {
  title: "Be first on SkillSwap at CU Boulder",
  body: "Join the waitlist as a student, a club, or a local business. We'll reach out when the pilot opens.",
} as const;
