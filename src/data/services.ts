/**
 * How It Works / Products & Services copy.
 * Prices are example ranges. Students set their own rates.
 */

export const categories = [
  {
    icon: "Camera",
    name: "Photography",
    blurb: "Headshots, event coverage, and product shots from students who already own the gear.",
    jobs: [
      { title: "LinkedIn headshots", range: "$40–$80", client: "Students" },
      { title: "Club event coverage", range: "$150–$300", client: "Clubs" },
      { title: "Menu & product photos", range: "$150–$350", client: "Businesses" },
    ],
  },
  {
    icon: "Palette",
    name: "Graphic Design",
    blurb: "Flyers, logos, and social graphics that look professional on a student-org budget.",
    jobs: [
      { title: "Event flyer + Instagram story", range: "$40–$90", client: "Clubs" },
      { title: "Club logo refresh", range: "$100–$250", client: "Clubs" },
      { title: "Menu or sign redesign", range: "$150–$300", client: "Businesses" },
    ],
  },
  {
    icon: "BookOpen",
    name: "Tutoring",
    blurb: "Peer tutors who took the same class, often with the same professor, last semester.",
    jobs: [
      { title: "1-hour tutoring session", range: "$20–$40", client: "Students" },
      { title: "Exam-prep package (4 sessions)", range: "$90–$150", client: "Students" },
      { title: "Résumé & cover-letter review", range: "$25–$50", client: "Students" },
    ],
  },
  {
    icon: "Megaphone",
    name: "Social Media & Marketing",
    blurb: "Students who live on social platforms, helping clubs and shops show up there too.",
    jobs: [
      { title: "Social media audit", range: "$250–$400", client: "Businesses" },
      { title: "One-month content calendar", range: "$200–$350", client: "Businesses" },
      { title: "Recruitment-week campaign", range: "$100–$200", client: "Clubs" },
    ],
  },
  {
    icon: "BarChart3",
    name: "Research & Analytics",
    blurb: "Business students applying what they learn in class to real questions for real owners.",
    jobs: [
      { title: "Customer survey + summary", range: "$200–$400", client: "Businesses" },
      { title: "Competitor scan", range: "$150–$300", client: "Businesses" },
      { title: "Member feedback survey", range: "$75–$150", client: "Clubs" },
    ],
  },
  {
    icon: "PartyPopper",
    name: "Event Help",
    blurb: "Extra hands and creative help for the nights that matter most to a club.",
    jobs: [
      { title: "Setup & check-in crew (per person)", range: "$60–$120", client: "Clubs" },
      { title: "Event recap video", range: "$120–$250", client: "Clubs" },
      { title: "Grand-opening street team", range: "$150–$300", client: "Businesses" },
    ],
  },
] as const;

export const howItWorks = {
  students: [
    { title: "Verify with your .edu email", body: "Sign up free and confirm you're a current CU Boulder student." },
    { title: "List your skills and rates", body: "Add services, sample work, and the prices you choose." },
    { title: "Get booked and do the work", body: "Accept gigs from peers, clubs, and local businesses that fit your schedule." },
    { title: "Get paid and build your portfolio", body: "Payment releases on delivery, and the finished job joins your verified portfolio." },
  ],
  clients: [
    { title: "Browse or post a project", body: "Search by skill, or describe what you need and let students come to you." },
    { title: "Book a verified student", body: "Compare portfolios, reviews, and rates, then book in a few taps." },
    { title: "Pay safely up front", body: "SkillSwap holds your payment while the work is in progress." },
    { title: "Approve, release, and review", body: "Approve the delivery to release payment, then leave a review." },
  ],
} as const;
