import { ArrowRight, Check, MousePointerClick } from "lucide-react";
import { CompletedCard, MiniGigCard } from "@/components/app/AppBits";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { Card, NumberBadge, Section, SectionHeading } from "@/components/ui/Section";
import { features, pillars, problem, prototypeTeaser, solution, waitlistBand } from "@/data/home";
import { waitlistHref } from "@/config/site";
import { cn } from "@/lib/cn";

const pillarTones = ["bg-mint", "bg-cream", "bg-coral-soft"];

export function Pillars() {
  return (
    <Section tone="white" labelledBy="pillars-title" className="py-14 sm:py-16">
      <h2 id="pillars-title" className="sr-only">
        What SkillSwap gives students
      </h2>
      <div className="grid gap-5 md:grid-cols-3">
        {pillars.map((p, i) => (
          <Reveal key={p.title} delay={i * 90}>
            <div className="flex h-full gap-4 rounded-2xl bg-page p-6 ring-1 ring-navy/5">
              <span className={cn("flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-navy", pillarTones[i])}>
                <Icon name={p.icon} className="h-6 w-6" />
              </span>
              <div>
                <h3 className="text-xl text-navy">{p.title}</h3>
                <p className="mt-1.5 leading-relaxed text-muted">{p.body}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

export function Problem() {
  return (
    <Section id="problem" labelledBy="problem-title">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
        <div>
          <SectionHeading eyebrow={problem.eyebrow} title={problem.title} id="problem-title" />
          <Reveal delay={80}>
            <blockquote className="mt-6 border-l-4 border-coral pl-5 text-2xl leading-snug font-semibold text-navy sm:text-[1.7rem]">
              {problem.lead}
            </blockquote>
          </Reveal>
          <Reveal delay={160}>
            <figure className="bg-brand-gradient mt-10 rounded-2xl p-6 sm:p-8">
              <p className="text-6xl font-bold tracking-tight text-navy sm:text-7xl">{problem.stat.value}</p>
              <figcaption>
                <p className="mt-2 text-lg font-medium text-navy">{problem.stat.label}</p>
                <p className="mt-3 text-sm text-navy/80">Source: {problem.stat.source}</p>
              </figcaption>
            </figure>
          </Reveal>
        </div>
        <ol className="flex flex-col gap-4">
          {problem.cards.map((c, i) => (
            <Reveal key={c.title} as="li" delay={i * 100}>
              <Card className="flex gap-5">
                <NumberBadge n={i + 1} />
                <div>
                  <h3 className="text-lg text-navy">{c.title}</h3>
                  <p className="mt-1 leading-relaxed text-muted">{c.body}</p>
                </div>
              </Card>
            </Reveal>
          ))}
        </ol>
      </div>
    </Section>
  );
}

export function Solution() {
  return (
    <Section tone="gradient" id="solution" labelledBy="solution-title">
      <SectionHeading eyebrow={solution.eyebrow} title={solution.title} intro={solution.intro} id="solution-title" align="center" />
      <ol className="relative mt-12 grid gap-6 md:grid-cols-3">
        {solution.steps.map((s, i) => (
          <Reveal key={s.title} as="li" delay={i * 110} className="relative">
            <div className="flex h-full flex-col rounded-2xl bg-white p-6 shadow-card">
              <div className="flex items-center gap-3">
                <NumberBadge n={i + 1} />
                <h3 className="text-xl text-navy">{s.title}</h3>
              </div>
              <p className="mt-3 text-muted">{s.body}</p>
              <ul className="mt-4 flex flex-wrap gap-2" aria-label={`${s.title} examples`}>
                {s.tags.map((t) => (
                  <li key={t} className="rounded-full bg-page px-3 py-1 text-xs font-semibold text-navy ring-1 ring-navy/10">
                    {t}
                  </li>
                ))}
              </ul>
              <div className="mt-auto pt-6">
                {s.card.kind === "gig" ? (
                  <MiniGigCard icon={s.card.icon} title={s.card.title} price={s.card.price} type={s.card.type} className="bg-page shadow-none" />
                ) : (
                  <CompletedCard title={s.card.title} subtitle={s.card.type} className="bg-page shadow-none" />
                )}
              </div>
            </div>
            {i < 2 && (
              <ArrowRight
                aria-hidden="true"
                className="absolute top-1/2 -right-5 z-10 hidden h-6 w-6 -translate-y-1/2 rounded-full bg-white p-1 text-navy shadow-card md:block"
              />
            )}
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}

const audienceTone: Record<string, string> = {
  Students: "bg-mint/70",
  "Clubs & businesses": "bg-coral-soft",
  Everyone: "bg-cream",
};

export function Features() {
  return (
    <Section tone="white" id="features" labelledBy="features-title">
      <SectionHeading
        eyebrow="Key features & benefits"
        title="Built for both sides of campus"
        intro="Students want flexible pay and proof of experience. Clubs and local businesses want affordable help they can trust. Every feature serves at least one of them."
        id="features-title"
      />
      <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((f, i) => (
          <Reveal key={f.title} as="li" delay={(i % 3) * 80}>
            <div className="group flex h-full flex-col rounded-2xl bg-page p-6 ring-1 ring-navy/5 transition-shadow hover:shadow-lift">
              <div className="flex items-start justify-between gap-3">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-navy text-white">
                  <Icon name={f.icon} className="h-6 w-6" />
                </span>
                <span className={cn("rounded-full px-2.5 py-1 text-[11px] font-semibold text-navy", audienceTone[f.audience])}>
                  For {f.audience.toLowerCase()}
                </span>
              </div>
              <h3 className="mt-5 text-lg text-navy">{f.title}</h3>
              <p className="mt-2 leading-relaxed text-muted">{f.body}</p>
            </div>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}

export function PrototypeTeaser() {
  return (
    <Section id="prototype-teaser" labelledBy="teaser-title">
      <Reveal>
        <div className="grid items-center gap-10 overflow-hidden rounded-3xl bg-navy p-8 text-white sm:p-12 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <p className="text-xs font-semibold tracking-[0.18em] text-mint uppercase">{prototypeTeaser.eyebrow}</p>
            <h2 id="teaser-title" className="mt-3 text-3xl text-white sm:text-4xl">
              {prototypeTeaser.title}
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-white/85">{prototypeTeaser.body}</p>
            <ButtonLink href="/prototype" size="lg" className="mt-8">
              <MousePointerClick className="h-5 w-5" aria-hidden="true" />
              Open the prototype
            </ButtonLink>
          </div>
          <ul className="grid gap-3">
            {prototypeTeaser.bullets.map((b, i) => (
              <li key={b} className="flex items-center gap-3 rounded-2xl bg-white/10 px-4 py-3.5 ring-1 ring-white/10">
                <span
                  className={cn(
                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-navy",
                    ["bg-mint", "bg-cream", "bg-coral-soft", "bg-peach"][i],
                  )}
                >
                  <Check className="h-4 w-4" aria-hidden="true" />
                </span>
                <span className="font-medium">{b}</span>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </Section>
  );
}

export function WaitlistBand({ title = waitlistBand.title, body = waitlistBand.body }: { title?: string; body?: string }) {
  return (
    <section aria-labelledby="waitlist-band-title" className="bg-brand-gradient">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-start gap-6 px-4 py-14 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
        <div className="max-w-2xl">
          <h2 id="waitlist-band-title" className="text-3xl text-navy">
            {title}
          </h2>
          <p className="mt-2 text-lg text-navy/85">{body}</p>
        </div>
        <ButtonLink href={waitlistHref} size="lg" variant="navy" className="shrink-0">
          Join the Waitlist
          <ArrowRight className="h-5 w-5" aria-hidden="true" />
        </ButtonLink>
      </div>
    </section>
  );
}
