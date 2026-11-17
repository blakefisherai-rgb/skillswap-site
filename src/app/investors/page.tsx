import type { Metadata } from "next";
import { Fragment } from "react";
import { ArrowRight, Check, ChevronRight, Minus, Quote } from "lucide-react";
import { UseOfFundsChart } from "@/components/investors/UseOfFundsChart";
import { ButtonLink } from "@/components/ui/Button";
import { CountUp } from "@/components/ui/CountUp";
import { Icon } from "@/components/ui/Icon";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { Card, NumberBadge, Section, SectionHeading } from "@/components/ui/Section";
import { site } from "@/config/site";
import {
  ask,
  businessModel,
  competitionColumns,
  competitors,
  cuNumbers,
  customerGroups,
  growthPath,
  howWeWin,
  marketModel,
  pullQuote,
  strategy,
  trends,
} from "@/data/investors";
import { feeTiers, usd } from "@/data/pricing";
import { cn } from "@/lib/cn";

export const metadata: Metadata = {
  title: "Investors",
  description:
    "SkillSwap's opportunity, market, competition, business model, and strategy. We're seeking $50,000 for 10% equity to launch at CU Boulder.",
};

const jump = [
  ["#opportunity", "Opportunity"],
  ["#market", "Market"],
  ["#competition", "Competition"],
  ["#model", "Business model"],
  ["#strategy", "Strategy"],
  ["#ask", "The ask"],
] as const;

const ops = ["×", "=", "→", "→"];

function Mark({ on, us }: { on: boolean; us?: boolean }) {
  return on ? (
    <span className={cn("inline-flex h-7 w-7 items-center justify-center rounded-full", us ? "bg-navy text-white" : "bg-mint text-navy")}>
      <Check className="h-4 w-4" aria-hidden="true" />
      <span className="sr-only">Yes</span>
    </span>
  ) : (
    <span className="inline-flex h-7 w-7 items-center justify-center text-navy/40">
      <Minus className="h-4 w-4" aria-hidden="true" />
      <span className="sr-only">No</span>
    </span>
  );
}

export default function InvestorsPage() {
  return (
    <>
      <PageHero
        eyebrow="Investors & about"
        title="Campus trust is the moat."
        intro={`${site.oneLiner} We're seeking ${usd(ask.amount)} for ${ask.equity}% equity to launch at CU Boulder.`}
      >
        <nav aria-label="On this page">
          <ul className="flex flex-wrap gap-2">
            {jump.map(([href, label]) => (
              <li key={href}>
                <a
                  href={href}
                  className="inline-flex items-center gap-1 rounded-full bg-white/75 px-3.5 py-2 text-sm font-semibold text-navy ring-1 ring-navy/10 hover:bg-white"
                >
                  {label} <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </PageHero>

      {/* Opportunity */}
      <Section tone="white" id="opportunity" labelledBy="opp-title">
        <SectionHeading eyebrow="Opportunity" title="Three trends are moving our way" id="opp-title" />
        <ul className="mt-10 grid gap-5 lg:grid-cols-3">
          {trends.map((t, i) => (
            <Reveal as="li" key={t.title} delay={i * 80}>
              <div className="flex h-full gap-4 rounded-2xl bg-page p-6 ring-1 ring-navy/5">
                <NumberBadge n={i + 1} />
                <div className="min-w-0">
                  <h3 className="flex items-center gap-2 text-lg text-navy">
                    <Icon name={t.icon} className="h-5 w-5 text-navy/70" />
                    {t.title}
                  </h3>
                  <p className="mt-1.5 leading-relaxed text-muted">{t.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </ul>

        <Reveal className="mt-14">
          <div className="bg-brand-gradient rounded-3xl p-6 sm:p-10">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h3 className="text-2xl text-navy">Market-sizing model</h3>
              <span className="rounded-full border border-dashed border-navy/50 bg-white/70 px-3 py-1 text-xs font-semibold tracking-wide text-navy uppercase">
                Illustrative estimate
              </span>
            </div>
            <ol className="mt-8 flex flex-col items-stretch gap-3 lg:flex-row lg:items-center">
              {marketModel.steps.map((s, i) => (
                <Fragment key={s.label}>
                  <li className={cn("flex-1 rounded-2xl p-5 text-center", i >= 3 ? "bg-navy text-white" : "bg-white/85 text-navy")}>
                    <p className="text-3xl font-bold sm:text-4xl">
                      <CountUp value={s.value} format={s.format} />
                    </p>
                    <p className={cn("mt-1 text-sm", i >= 3 ? "text-white/80" : "text-navy/80")}>{s.label}</p>
                  </li>
                  {i < ops.length && (
                    <li aria-hidden="true" className="self-center text-2xl font-bold text-navy/70">
                      {ops[i]}
                    </li>
                  )}
                </Fragment>
              ))}
            </ol>
            <p className="mt-6 text-sm text-navy/85">{marketModel.note}</p>
          </div>
        </Reveal>
      </Section>

      {/* Market */}
      <Section tone="gradient-soft" id="market" labelledBy="mkt-title">
        <SectionHeading
          eyebrow="Market"
          title="Three customer groups, one campus ecosystem"
          intro="SkillSwap starts at CU Boulder, where all three sides of the marketplace already meet every day."
          id="mkt-title"
        />
        <ul className="mt-10 grid gap-5 md:grid-cols-3">
          {customerGroups.map((g, i) => (
            <Reveal as="li" key={g.name} delay={i * 80}>
              <Card className="h-full">
                <NumberBadge n={g.n} />
                <h3 className="mt-4 text-xl text-navy">{g.name}</h3>
                <p className="mt-1 text-muted">{g.who}</p>
                <p className="mt-4 rounded-xl bg-page p-3 text-sm text-navy">
                  <span className="font-semibold">Cares about: </span>
                  {g.cares}
                </p>
              </Card>
            </Reveal>
          ))}
        </ul>
        <ul className="mt-8 grid gap-4 sm:grid-cols-3">
          {cuNumbers.map((n) => (
            <li key={n.label} className="rounded-2xl bg-white/85 p-6 text-center">
              <p className="text-4xl font-bold text-navy">
                <CountUp value={n.value} format={n.format} />
              </p>
              <p className="mt-1 text-sm text-muted">{n.label}</p>
            </li>
          ))}
        </ul>
        <ol className="mt-8 flex flex-col items-center justify-center gap-2 sm:flex-row sm:gap-3" aria-label="Growth path">
          {growthPath.map((g, i) => (
            <Fragment key={g}>
              <li className={cn("rounded-full px-4 py-2 text-sm font-semibold", i === 0 ? "bg-navy text-white" : "bg-white text-navy ring-1 ring-navy/10")}>{g}</li>
              {i < growthPath.length - 1 && (
                <li aria-hidden="true">
                  <ArrowRight className="h-5 w-5 rotate-90 text-navy/60 sm:rotate-0" />
                </li>
              )}
            </Fragment>
          ))}
        </ol>
      </Section>

      {/* Competition */}
      <Section tone="white" id="competition" labelledBy="comp-title">
        <SectionHeading
          eyebrow="Competition"
          title="Nobody combines campus gigs, real projects, and a portfolio"
          intro="Students sell services today through freelance marketplaces, career networks, and their own Instagram. Each covers part of the need."
          id="comp-title"
        />

        {/* Table on desktop */}
        <Reveal className="mt-10 hidden overflow-hidden rounded-2xl ring-1 ring-navy/10 lg:block">
          <table className="w-full text-left">
            <caption className="sr-only">Feature comparison of SkillSwap and alternatives</caption>
            <thead className="bg-navy text-white">
              <tr>
                <th scope="col" className="p-4 text-sm font-semibold">
                  <span className="sr-only">Platform</span>
                </th>
                {competitionColumns.map((c) => (
                  <th key={c} scope="col" className="p-4 text-center text-sm font-semibold">
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {competitors.map((c) => {
                const us = "us" in c && c.us;
                return (
                  <tr key={c.name} className={cn("border-t border-navy/10", us ? "bg-mint/40" : "bg-white")}>
                    <th scope="row" className="p-4">
                      <span className={cn("block text-navy", us ? "text-lg font-bold" : "font-semibold")}>{c.name}</span>
                      <span className="block text-sm font-normal text-muted">{c.desc}</span>
                    </th>
                    {c.marks.map((m, i) => (
                      <td key={i} className="p-4 text-center">
                        <Mark on={m} us={us} />
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Reveal>

        {/* Cards on phones and tablets */}
        <ul className="mt-8 grid gap-3 md:grid-cols-2 lg:hidden">
          {competitors.map((c) => {
            const us = "us" in c && c.us;
            return (
              <li key={c.name} className={cn("rounded-2xl p-4 ring-1", us ? "bg-mint/40 ring-navy/20" : "bg-white ring-navy/10")}>
                <p className={cn("text-navy", us ? "text-lg font-bold" : "font-semibold")}>{c.name}</p>
                <p className="text-sm text-muted">{c.desc}</p>
                <dl className="mt-3 grid grid-cols-1 gap-1.5">
                  {competitionColumns.map((col, i) => (
                    <div key={col} className="flex items-center justify-between gap-3 text-sm">
                      <dt className="text-navy">{col}</dt>
                      <dd>
                        <Mark on={c.marks[i]} us={us} />
                      </dd>
                    </div>
                  ))}
                </dl>
              </li>
            );
          })}
        </ul>

        <div className="mt-14 grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:items-center">
          <div>
            <h3 className="text-2xl text-navy">How we win</h3>
            <ol className="mt-6 space-y-4">
              {howWeWin.map((h, i) => (
                <Reveal as="li" key={h.title} delay={i * 80} className="flex gap-4">
                  <NumberBadge n={i + 1} />
                  <div>
                    <p className="text-lg font-semibold text-navy">{h.title}</p>
                    <p className="mt-0.5 leading-relaxed text-muted">{h.body}</p>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>
          <Reveal delay={150}>
            <figure className="relative rounded-3xl bg-navy p-8 text-white sm:p-10">
              <Quote className="h-10 w-10 text-coral" aria-hidden="true" />
              <blockquote className="mt-4 text-3xl leading-tight font-bold italic sm:text-4xl">&ldquo;{pullQuote}&rdquo;</blockquote>
            </figure>
          </Reveal>
        </div>
      </Section>

      {/* Business model */}
      <Section id="model" labelledBy="model-title">
        <SectionHeading eyebrow="Business model" title="Free to join. We earn when students earn." id="model-title" />
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <Card className="p-7">
            <h3 className="text-lg text-navy">Commission per completed job</h3>
            <ul className="mt-5 space-y-3">
              {feeTiers.map((t) => (
                <li key={t.id} className="flex items-center justify-between gap-4 rounded-xl bg-page p-4">
                  <div>
                    <p className="font-semibold text-navy">{t.label}</p>
                    <p className="text-sm text-muted">
                      e.g. {usd(t.example.price)} {t.example.job.toLowerCase()} → {usd(t.example.price * t.rate)} fee
                    </p>
                  </div>
                  <span className="text-2xl font-bold text-navy">{Math.round(t.rate * 100)}%</span>
                </li>
              ))}
            </ul>
            <ButtonLink href="/how-it-works#calculator" variant="ghost" size="sm" className="mt-4 -ml-2">
              Try the fee calculator <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </ButtonLink>
          </Card>
          <Card className="p-7">
            <h3 className="text-lg text-navy">How the model works</h3>
            <ul className="mt-5 space-y-3">
              {businessModel.points.map((p) => (
                <li key={p} className="flex gap-3 text-navy">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-success" aria-hidden="true" />
                  {p}
                </li>
              ))}
            </ul>
            <h4 className="mt-6 text-sm font-semibold tracking-wide text-navy/70 uppercase">Later revenue</h4>
            <ul className="mt-3 space-y-2">
              {businessModel.later.map((p) => (
                <li key={p} className="rounded-xl bg-cream px-4 py-2.5 text-sm text-navy">
                  {p}
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </Section>

      {/* Strategy */}
      <Section tone="navy" id="strategy" labelledBy="strat-title">
        <SectionHeading eyebrow="Strategy" title={strategy.name} intro={strategy.body} id="strat-title" invert />
        <ol className="relative mt-12 grid gap-6 md:grid-cols-4">
          <span aria-hidden="true" className="absolute top-8 right-[12%] left-[12%] hidden h-0.5 bg-white/20 md:block" />
          {strategy.roadmap.map((r, i) => (
            <Reveal as="li" key={r.label} delay={i * 100} className="relative flex gap-4 md:flex-col md:items-center md:text-center">
              <span className="relative flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white text-3xl shadow-lift" aria-hidden="true">
                {r.emoji}
              </span>
              <div>
                <p className="text-xs font-semibold tracking-wide text-mint uppercase">Phase {i + 1}</p>
                <p className="mt-1 text-xl font-bold text-white">{r.label}</p>
                <p className="mt-1 text-sm text-white/80">{r.body}</p>
              </div>
            </Reveal>
          ))}
        </ol>
        <p className="mt-10 text-center text-white/85">Then replicate, campus by campus.</p>
      </Section>

      {/* The ask */}
      <Section tone="gradient" id="ask" labelledBy="ask-title">
        <div className="text-center">
          <p className="text-xs font-semibold tracking-[0.18em] text-navy/75 uppercase">The ask</p>
          <h2 id="ask-title" className="mt-3 text-4xl text-navy sm:text-5xl">
            Seeking {usd(ask.amount)} for {ask.equity}% equity
          </h2>
          <p className="mt-3 text-lg text-navy/85">{ask.headline}</p>
        </div>
        <div className="mt-12 grid gap-6 lg:grid-cols-[1.3fr_1fr]">
          <Card className="p-6 sm:p-8">
            <h3 className="mb-6 text-lg text-navy">Use of funds</h3>
            <UseOfFundsChart total={ask.amount} funds={ask.funds} />
          </Card>
          <Card className="p-6 sm:p-8">
            <h3 className="text-lg text-navy">Pilot milestones</h3>
            <ol className="relative mt-6 space-y-6">
              <span aria-hidden="true" className="absolute top-2 bottom-2 left-[7px] w-0.5 bg-navy/15" />
              {ask.milestones.map((m, i) => (
                <li key={m.when} className="relative flex gap-4">
                  <span className={cn("relative mt-1 h-4 w-4 shrink-0 rounded-full ring-4 ring-white", ["bg-mint-strong", "bg-coral-hover", "bg-navy"][i])} aria-hidden="true" />
                  <div>
                    <p className="text-sm font-semibold text-navy/75">{m.when}</p>
                    <p className="font-semibold text-navy">{m.what}</p>
                  </div>
                </li>
              ))}
            </ol>
            <div className="mt-8 rounded-xl bg-page p-4 text-sm text-navy">
              <span className="font-semibold">Investors we plan to approach: </span>
              {ask.investors}.
            </div>
          </Card>
        </div>
      </Section>
    </>
  );
}
