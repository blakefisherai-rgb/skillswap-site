import type { ReactNode } from "react";
import { Container, Eyebrow } from "./Section";

/** Gradient title band used at the top of every inner page. */
export function PageHero({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <header className="bg-brand-gradient relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-white/30 blur-2xl"
      />
      <Container className="relative py-14 sm:py-20">
        <Eyebrow className="mb-3">{eyebrow}</Eyebrow>
        <h1 className="max-w-3xl text-4xl leading-[1.1] text-navy sm:text-5xl">{title}</h1>
        {intro && <p className="mt-5 max-w-2xl text-lg leading-relaxed text-navy/85">{intro}</p>}
        {children && <div className="mt-8">{children}</div>}
      </Container>
    </header>
  );
}
