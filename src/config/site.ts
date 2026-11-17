/**
 * Site-wide settings. Edit these in one place.
 */
export const site = {
  name: "SkillSwap",
  tagline: "Earn money. Build skills. Gain experience.",
  secondaryLine: "Where Skills Become Experience",
  oneLiner:
    "A campus-based marketplace connecting students with paid gigs and professional projects from peers, campus organizations, and local businesses.",
  closingLine: "Connecting student skills with paid opportunities on campus.",

  /** Production URL, used for share previews. Update after deploying. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://skillswap-cu.vercel.app",

  /**
   * Placeholder company email (the domain skillswap-cu.com is not registered, so mail to it bounces).
   * Replace with a real inbox if you set one up. Shows in the footer and on the Contact page.
   */
  contactEmail: "hello@skillswap-cu.com",

  /**
   * Formspree form ID (e.g. "xyzabcd"). Leave empty to store waitlist
   * submissions in the visitor's browser (localStorage) instead.
   */
  formspreeId: "",

  classNote: "SkillSwap is a student venture concept created for ESBM 3700 at CU Boulder.",
} as const;

export const nav = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/students", label: "For Students" },
  { href: "/clubs-businesses", label: "For Clubs & Businesses" },
  { href: "/prototype", label: "Prototype" },
  { href: "/investors", label: "Investors" },
  { href: "/team", label: "Team" },
  { href: "/contact", label: "Contact" },
] as const;

export const waitlistHref = "/contact#waitlist";
