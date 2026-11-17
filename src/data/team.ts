/**
 * Team (Group 11). Edit names, titles, and bios here.
 * Photos live in public/team/<photo>.jpg. Order matches the pitch deck.
 */
export type TeamMember = {
  name: string;
  title: string;
  photo: string;
  background: string[];
  focus: string;
};

export const team: TeamMember[] = [
  {
    name: "Jessica Yu",
    title: "Co-Founder & CMO",
    photo: "/team/jessica.jpg",
    background: [
      "VP of Marketing, Leeds Student Government",
      "Chancellor, Delta Sigma Pi",
      "Incoming Strategy & Marketing Intern, Plante Moran",
      "Risk management experience",
    ],
    focus: "Leads branding, campus partnerships, and student acquisition",
  },
  {
    name: "Blake Fisher",
    title: "Co-Founder & CEO",
    photo: "/team/blake.jpg",
    background: [
      "BSBA, Management & Real Estate, Leeds",
      "Board Member, Boulder Mountain Bike Club",
      "Commercial Real Estate, Peak10 Group",
    ],
    focus: "Leads business model, pricing, partnerships, and campus expansion",
  },
  {
    name: "Laine Caiaccio",
    title: "Co-Founder & COO",
    photo: "/team/laine.jpg",
    background: ["Management & Entrepreneurship, Leeds", "Experience in sales and customer service"],
    focus: "Leadership, organization, and customer experience",
  },
  {
    name: "Brooklyne Ellis",
    title: "Co-Founder & CSO",
    photo: "/team/brooklyne.jpg",
    background: ["Marketing & Entrepreneurship, Leeds", "Experience in luxury sales and international business"],
    focus: "Brand strategy, client experience, and organizational leadership",
  },
  {
    name: "Logan Easterly",
    title: "Co-Founder & CCO",
    photo: "/team/logan.jpg",
    background: ["Marketing, Leeds", "Experience in film production, marketing, and social media"],
    focus: "Leads brand communications, public relations, and engagement",
  },
];

export const teamMission = "Give every student a way to turn skills into real experience and income.";

export const teamVision = "A campus where every student graduates with paid experience and a verified portfolio to prove it.";

export const teamValues = [
  { title: "Students first", body: "Fair pay, a low fee, and work that builds a career." },
  { title: "Trust is earned", body: "Verification, reviews, and payment held until delivery on every job." },
  { title: "Start local", body: "Win one campus completely before chasing the next." },
  { title: "Show, don't tell", body: "Real projects and real reviews beat self-reported skills." },
];
