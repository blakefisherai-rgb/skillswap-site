import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Reveal } from "./Reveal";

export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8", className)}>{children}</div>;
}

type Tone = "page" | "white" | "gradient" | "gradient-soft" | "navy";
const tones: Record<Tone, string> = {
  page: "bg-page",
  white: "bg-white",
  gradient: "bg-brand-gradient",
  "gradient-soft": "bg-brand-gradient-soft",
  navy: "bg-navy text-white",
};

export function Section({
  children,
  tone = "page",
  id,
  className,
  containerClassName,
  labelledBy,
}: {
  children: ReactNode;
  tone?: Tone;
  id?: string;
  className?: string;
  containerClassName?: string;
  labelledBy?: string;
}) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={cn("scroll-mt-20 py-16 sm:py-24", tones[tone], className)}>
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}

/** Small uppercase label that sits above a section heading, like the deck's header tags. */
export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cn("text-xs font-semibold tracking-[0.18em] text-navy/75 uppercase", className)}>{children}</p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  id,
  align = "left",
  className,
  invert = false,
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  id?: string;
  align?: "left" | "center";
  className?: string;
  invert?: boolean;
}) {
  return (
    <Reveal className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && <Eyebrow className={cn("mb-3", invert && "text-white/80")}>{eyebrow}</Eyebrow>}
      <h2 id={id} className={cn("text-3xl leading-tight sm:text-4xl", invert ? "text-white" : "text-navy")}>
        {title}
      </h2>
      {intro && (
        <p className={cn("mt-4 text-lg leading-relaxed", invert ? "text-white/85" : "text-muted")}>{intro}</p>
      )}
    </Reveal>
  );
}

const badgeTones = {
  mint: "bg-mint text-navy",
  cream: "bg-cream text-navy",
  coral: "bg-coral-soft text-navy",
  navy: "bg-navy text-white",
} as const;

/** Numbered badge (01 / 02 / 03) in the deck's mint / cream / coral. */
export function NumberBadge({
  n,
  tone,
  className,
}: {
  n: number;
  tone?: keyof typeof badgeTones;
  className?: string;
}) {
  const auto = (["mint", "cream", "coral"] as const)[(n - 1) % 3];
  return (
    <span
      className={cn(
        "inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-sm font-bold tabular-nums",
        badgeTones[tone ?? auto],
        className,
      )}
      aria-hidden="true"
    >
      {String(n).padStart(2, "0")}
    </span>
  );
}

export function Card({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("rounded-2xl bg-white p-6 shadow-card ring-1 ring-navy/5", className)}>{children}</div>;
}
