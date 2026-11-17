/** Copy for the For Students and For Clubs & Businesses pages. */

export const studentPage = {
  benefits: [
    {
      icon: "Wallet",
      title: "Earn on your schedule",
      body: "Take a $40 headshot gig between classes or a $400 project over a few weeks. You choose what to accept.",
    },
    {
      icon: "PiggyBank",
      title: "Keep up to 90%",
      body: "Our fee on peer gigs is 10%, half of Fiverr's 20%. Club and business jobs are 12% and 15%.",
    },
    {
      icon: "Briefcase",
      title: "Real clients, real projects",
      body: "Work for campus organizations and Boulder businesses, the kind of experience employers ask about in interviews.",
    },
    {
      icon: "LayoutGrid",
      title: "A portfolio that builds itself",
      body: "Every completed job adds a verified entry with the client's review. No extra work required.",
    },
    {
      icon: "GraduationCap",
      title: "Built for freshmen and sophomores",
      body: "No prior internship needed. If you have a skill and a .edu email, you can start building a track record.",
    },
    {
      icon: "MapPin",
      title: "Close to campus",
      body: "Clients are clubs you already know and shops you already walk past. No commuting and no cold-emailing strangers.",
    },
  ],
  portfolio: {
    title: "The SkillSwap Portfolio",
    intro:
      "A LinkedIn profile lists what you say you can do. A SkillSwap Portfolio shows what you've done, and it's confirmed by the people who paid for it.",
    points: [
      { title: "Completed work", body: "Each finished job appears with photos, files, or links you choose to share." },
      { title: "Client reviews", body: "Star ratings and written reviews come from verified clubs and businesses." },
      { title: "Demonstrated skills", body: "Skills are tagged from real jobs, not self-reported, so they carry more weight." },
      { title: "Shareable link", body: "Put one link on your résumé, LinkedIn, or internship application." },
    ],
  },
  verification: [
    { icon: "Mail", title: ".edu email check", body: "Every provider confirms a current university email before listing a service." },
    { icon: "UserCheck", title: "Profile review", body: "New profiles and sample work are reviewed before they go live." },
    { icon: "LockKeyhole", title: "Payment held until delivery", body: "The client pays up front, so you never chase an invoice." },
    { icon: "Star", title: "Two-way reviews", body: "You review clients too, which keeps the marketplace fair for students." },
  ],
} as const;

export const clientPage = {
  groups: [
    {
      icon: "Users",
      name: "Student organizations",
      who: "Clubs, Greek life, and student government (about 500 recognized student orgs at CU Boulder)",
      needs: ["Event photos and recap videos", "Flyers and recruitment graphics", "Social posts during rush and event weeks", "Extra hands on event nights"],
      fee: "12% fee, included in the price you see",
    },
    {
      icon: "Store",
      name: "Local small businesses",
      who: "Coffee shops, boutiques, and restaurants near campus",
      needs: ["Social media audits and content calendars", "Menu, product, and storefront photos", "Customer surveys and competitor research", "Grand-opening and seasonal campaigns"],
      fee: "15% fee, included in the price you see",
    },
  ],
  benefits: [
    { icon: "PiggyBank", title: "Affordable", body: "Student rates fit club budgets and small-business margins, with no agency retainer." },
    { icon: "Clock", title: "Flexible", body: "Book a single afternoon or a multi-week project. No hiring paperwork, no long contracts." },
    { icon: "Sparkles", title: "Fresh perspective", body: "Students are your customers. They know what makes other students stop scrolling." },
    { icon: "HeartHandshake", title: "Invest in campus", body: "Every booking pays a student and adds a real project to their portfolio." },
  ],
  trust: [
    { icon: "ShieldCheck", title: "Verified students", body: "Every provider has confirmed a current .edu email." },
    { icon: "LockKeyhole", title: "Payment held until delivery", body: "Your money is released only after you approve the work." },
    { icon: "Star", title: "Reviews and ratings", body: "See past clients' ratings and finished work before you book." },
    { icon: "ClipboardCheck", title: "Clear scope and price", body: "Deliverables, deadline, and the full price are agreed before work starts." },
    { icon: "MessageSquare", title: "In-app messaging", body: "Keep files, feedback, and approvals in one thread." },
    { icon: "LifeBuoy", title: "Support if something goes wrong", body: "If a job isn't delivered as agreed, the SkillSwap team steps in." },
  ],
  packages: [
    {
      name: "Social Media Starter Pack",
      for: "Local businesses",
      price: "$400",
      includes: ["Social media audit", "Two-week content calendar", "Six branded post graphics", "Short recommendations deck"],
    },
    {
      name: "Grand Opening Pack",
      for: "Local businesses",
      price: "$600",
      includes: ["Event and storefront photography", "Flyer and social graphics", "Launch-week post schedule", "Street-team promo on campus"],
    },
    {
      name: "Club Event Pack",
      for: "Student organizations",
      price: "$250",
      includes: ["Event flyer + Instagram story", "Event-night photography", "Same-week photo gallery", "Recap post for socials"],
    },
  ],
} as const;
