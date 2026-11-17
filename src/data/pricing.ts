/**
 * Commission tiers from the pitch deck. The fee comes out of the job price;
 * the student receives the rest. Used by the pricing table and the calculator.
 */
export const feeTiers = [
  {
    id: "peer",
    label: "Student → student gig",
    short: "Peer gig",
    rate: 0.1,
    example: { job: "Headshots", price: 60 },
    icon: "GraduationCap",
  },
  {
    id: "club",
    label: "Club booking",
    short: "Club booking",
    rate: 0.12,
    example: { job: "Event photos", price: 250 },
    icon: "Users",
  },
  {
    id: "business",
    label: "Local business project",
    short: "Business project",
    rate: 0.15,
    example: { job: "Social media audit", price: 400 },
    icon: "Store",
  },
] as const;

export type FeeTierId = (typeof feeTiers)[number]["id"];

/** Typical take rate on a large freelance marketplace (Fiverr keeps 20%). */
export const competitorRate = 0.2;
export const competitorName = "Fiverr";

export function splitPrice(price: number, rate: number) {
  const fee = Math.round(price * rate * 100) / 100;
  return { fee, payout: Math.round((price - fee) * 100) / 100 };
}

export const usd = (n: number) =>
  n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: Number.isInteger(n) ? 0 : 2,
    maximumFractionDigits: 2,
  });
