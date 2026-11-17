/**
 * SAMPLE DATA for the clickable prototype. These people, reviews, and jobs are
 * fictional and are labeled "Sample" in the UI. Edit freely.
 */
import type { IconName } from "@/components/ui/Icon";
import type { FeeTierId } from "./pricing";

export type CategoryId = "photo" | "design" | "tutoring" | "marketing" | "research" | "events";

export const protoCategories: { id: CategoryId | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "photo", label: "Photography" },
  { id: "design", label: "Design" },
  { id: "tutoring", label: "Tutoring" },
  { id: "marketing", label: "Marketing" },
  { id: "research", label: "Research" },
  { id: "events", label: "Events" },
];

export type Service = {
  id: string;
  studentId: string;
  title: string;
  price: number;
  unit?: string;
  category: CategoryId;
  kind: "Campus Gig" | "Club Gig" | "Business Project";
  icon: IconName;
  delivery: string;
};

export type Student = {
  id: string;
  name: string;
  short: string;
  major: string;
  year: string;
  headline: string;
  rating: number;
  jobs: number;
  responseTime: string;
  skills: string[];
  portfolio: { title: string; client: string; icon: IconName }[];
  reviews: { author: string; role: string; stars: number; text: string }[];
};

export const students: Student[] = [
  {
    id: "maya",
    name: "Maya Chen",
    short: "Maya C.",
    major: "Media Studies",
    year: "Sophomore",
    headline: "Event and portrait photographer. Fast edits, natural light.",
    rating: 4.9,
    jobs: 12,
    responseTime: "~1 hr",
    skills: ["Event photography", "Portraits", "Lightroom", "Canva"],
    portfolio: [
      { title: "Winter formal", client: "Ski Club", icon: "Camera" },
      { title: "Spring headshots", client: "Finance Club", icon: "Camera" },
      { title: "Menu photos", client: "Pearl St. café", icon: "Store" },
      { title: "Recruitment flyer", client: "Dance Co.", icon: "Palette" },
    ],
    reviews: [
      { author: "Ski Club", role: "Club", stars: 5, text: "Photos were ready two days early and our members loved them." },
      { author: "Alex R.", role: "Student", stars: 5, text: "Best LinkedIn headshot I've had. Super easy to work with." },
    ],
  },
  {
    id: "jordan",
    name: "Jordan Reyes",
    short: "Jordan R.",
    major: "Marketing",
    year: "Junior",
    headline: "I help small shops figure out what to post and why.",
    rating: 4.8,
    jobs: 7,
    responseTime: "~3 hrs",
    skills: ["Social media audits", "Content calendars", "Instagram", "TikTok"],
    portfolio: [
      { title: "Instagram audit", client: "Boutique on Pearl", icon: "BarChart3" },
      { title: "Rush-week campaign", client: "Delta chapter", icon: "Megaphone" },
      { title: "Content calendar", client: "Coffee shop", icon: "Calendar" },
    ],
    reviews: [
      { author: "Boutique owner", role: "Business", stars: 5, text: "Clear, specific recommendations we started using the next day." },
    ],
  },
  {
    id: "priya",
    name: "Priya Patel",
    short: "Priya P.",
    major: "Applied Math",
    year: "Sophomore",
    headline: "Calc 1 & 2 tutor. I took both with the same professors last year.",
    rating: 5.0,
    jobs: 18,
    responseTime: "~30 min",
    skills: ["Calculus", "Exam prep", "Statistics"],
    portfolio: [
      { title: "Calc 1 exam prep", client: "4 students", icon: "BookOpen" },
      { title: "Stats study group", client: "Study group", icon: "Users" },
    ],
    reviews: [{ author: "Chris T.", role: "Student", stars: 5, text: "Went from a C to a B+ on the second midterm." }],
  },
  {
    id: "sam",
    name: "Sam Okafor",
    short: "Sam O.",
    major: "Studio Art",
    year: "Freshman",
    headline: "Bold flyers and simple logos for clubs on a budget.",
    rating: 4.7,
    jobs: 5,
    responseTime: "~2 hrs",
    skills: ["Flyers", "Logos", "Illustrator", "Procreate"],
    portfolio: [
      { title: "Climbing club logo", client: "Climbing Club", icon: "Palette" },
      { title: "Open-mic flyer", client: "Music society", icon: "Palette" },
    ],
    reviews: [{ author: "Music society", role: "Club", stars: 5, text: "Turned our rough idea into a flyer people actually stopped to read." }],
  },
  {
    id: "ellie",
    name: "Ellie Brooks",
    short: "Ellie B.",
    major: "Business Analytics",
    year: "Junior",
    headline: "Surveys and competitor research with a one-page summary you'll actually read.",
    rating: 4.9,
    jobs: 4,
    responseTime: "~4 hrs",
    skills: ["Survey design", "Excel", "Competitor research"],
    portfolio: [{ title: "Customer survey", client: "Bagel shop", icon: "BarChart3" }],
    reviews: [{ author: "Bagel shop owner", role: "Business", stars: 5, text: "We changed our weekend hours based on her survey." }],
  },
  {
    id: "marcus",
    name: "Marcus Lee",
    short: "Marcus L.",
    major: "Film Studies",
    year: "Sophomore",
    headline: "Event recap videos cut for Instagram and TikTok.",
    rating: 4.8,
    jobs: 6,
    responseTime: "~2 hrs",
    skills: ["Video editing", "Premiere Pro", "Event coverage"],
    portfolio: [{ title: "Philanthropy gala recap", client: "Greek council", icon: "PartyPopper" }],
    reviews: [{ author: "Greek council", role: "Club", stars: 5, text: "The recap video got more views than anything we posted all year." }],
  },
];

export const services: Service[] = [
  { id: "s1", studentId: "maya", title: "Campus Photography", price: 75, category: "photo", kind: "Campus Gig", icon: "Camera", delivery: "Edited photos in 3 days" },
  { id: "s2", studentId: "maya", title: "LinkedIn Headshots", price: 60, category: "photo", kind: "Campus Gig", icon: "Camera", delivery: "5 edited photos in 2 days" },
  { id: "s3", studentId: "maya", title: "Event Photos (3 hrs)", price: 250, category: "photo", kind: "Club Gig", icon: "Camera", delivery: "Full gallery in 5 days" },
  { id: "s4", studentId: "jordan", title: "Social Media Audit", price: 250, category: "marketing", kind: "Business Project", icon: "BarChart3", delivery: "Report + call in 1 week" },
  { id: "s5", studentId: "jordan", title: "One-Month Content Calendar", price: 300, category: "marketing", kind: "Business Project", icon: "Calendar", delivery: "Calendar + captions in 10 days" },
  { id: "s6", studentId: "priya", title: "Calc 1 Tutoring", price: 30, unit: "/hr", category: "tutoring", kind: "Campus Gig", icon: "BookOpen", delivery: "In person or Zoom" },
  { id: "s7", studentId: "priya", title: "Exam-Prep Package (4 sessions)", price: 120, category: "tutoring", kind: "Campus Gig", icon: "BookOpen", delivery: "Scheduled before your exam" },
  { id: "s8", studentId: "sam", title: "Event Flyer + IG Story", price: 45, category: "design", kind: "Club Gig", icon: "Palette", delivery: "2 drafts in 3 days" },
  { id: "s9", studentId: "sam", title: "Club Logo Refresh", price: 150, category: "design", kind: "Club Gig", icon: "Palette", delivery: "3 concepts in 1 week" },
  { id: "s10", studentId: "ellie", title: "Customer Survey + Summary", price: 300, category: "research", kind: "Business Project", icon: "BarChart3", delivery: "Results in 2 weeks" },
  { id: "s11", studentId: "marcus", title: "Event Recap Video", price: 180, category: "events", kind: "Club Gig", icon: "PartyPopper", delivery: "60-sec cut in 4 days" },
];

/** The signed-in student in the dashboard demo. */
export const meStudentId = "maya";

export type Job = {
  id: string;
  title: string;
  client: string;
  price: number;
  tier: FeeTierId;
  icon: IconName;
  due?: string;
};

export const initialActiveJobs: Job[] = [
  { id: "j1", title: "Photography Gig", client: "Ski Club · Winter formal", price: 75, tier: "club", icon: "Camera", due: "Due Fri" },
  { id: "j2", title: "LinkedIn Headshots", client: "Alex R. · Student", price: 60, tier: "peer", icon: "Camera", due: "Due Mon" },
];

export const initialCompletedJobs: Job[] = [
  { id: "c1", title: "Menu Photos", client: "Pearl St. café", price: 200, tier: "business", icon: "Store" },
  { id: "c2", title: "Recruitment Flyer", client: "Dance Co.", price: 60, tier: "club", icon: "Palette" },
];

export const bookerTypes: { tier: FeeTierId; label: string; hint: string }[] = [
  { tier: "peer", label: "Student", hint: "10% fee" },
  { tier: "club", label: "Club", hint: "12% fee" },
  { tier: "business", label: "Business", hint: "15% fee" },
];

/** MVP & assumptions we're testing. */
export const hypotheses = [
  {
    assumption: "Students will sign up for short paid gigs.",
    test: "Waitlist plus a campus ambassador sign-up drive.",
    metric: "100 verified student providers",
    icon: "GraduationCap",
  },
  {
    assumption: "Clubs will pay a 12% fee for trusted talent.",
    test: "Concierge MVP: we hand-match 5 clubs with students and process payment manually.",
    metric: "Clubs that book and pay through us",
    icon: "Users",
  },
  {
    assumption: "A verified portfolio drives retention.",
    test: "Track whether students and clients come back after their first job.",
    metric: "Repeat booking rate",
    icon: "LayoutGrid",
  },
  {
    assumption: "Local businesses will book student work.",
    test: "Pilot with 3 Boulder shops near campus using a fixed-price package.",
    metric: "Completed projects and owner reviews",
    icon: "Store",
  },
] as const satisfies ReadonlyArray<{ assumption: string; test: string; metric: string; icon: IconName }>;
