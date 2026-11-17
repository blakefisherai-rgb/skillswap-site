import type { Metadata } from "next";
import { GraduationCap, Store } from "lucide-react";
import { WaitlistBand } from "@/components/home/HomeSections";
import { FeeCalculator } from "@/components/pricing/FeeCalculator";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { Card, NumberBadge, Section, SectionHeading } from "@/components/ui/Section";
import { StepList } from "@/components/ui/StepList";
import { feeTiers, splitPrice, usd } from "@/data/pricing";
import { categories, howItWorks, otherSkills } from "@/data/services";
import { cn } from "@/lib/cn";

export const metadata: Metadata = {
  title: "How It Works",
  description:
    "SkillSwap gig categories, example prices, and a transparent 10–15% fee. Use the calculator to see exactly what a student keeps.",
};

const clientTone: Record<string, string> = {
  Students: "bg-mint/70",
  Clubs: "bg-cream",
  Businesses: "bg-coral-soft",
};

export default function HowItWorksPage() {
  return (
    <>
      <PageHero
        eyebrow="How it works · Products & services"
        title="Pick a skill. Get booked. Get paid."
        intro="SkillSwap is one marketplace with two sides: students who offer services, and the peers, clubs, and local businesses who book them. Here's how a job moves from request to payout, and what everyone pays."
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="#calculator">See the fee calculator</ButtonLink>
          <ButtonLink href="#categories" variant="outline">
            Browse categories
          </ButtonLink>
        </div>
      </PageHero>

      <Section tone="white" labelledBy="flow-title">
        <SectionHeading eyebrow="The flow" title="Two sides, one simple loop" id="flow-title" />
        <div className="mt-12 grid gap-10 md:grid-cols-2 md:gap-14">
          <div>
            <p className="mb-6 inline-flex items-center gap-2 rounded-full bg-mint/70 px-3 py-1.5 text-sm font-semibold text-navy">
              <GraduationCap className="h-4 w-4" aria-hidden="true" /> For students
            </p>
            <StepList steps={howItWorks.students} />
          </div>
          <div>
            <p className="mb-6 inline-flex items-center gap-2 rounded-full bg-coral-soft px-3 py-1.5 text-sm font-semibold text-navy">
              <Store className="h-4 w-4" aria-hidden="true" /> For clubs & businesses
            </p>
            <StepList steps={howItWorks.clients} />
          </div>
        </div>
      </Section>

      <Section id="categories" labelledBy="cat-title">
        <SectionHeading
          eyebrow="Services"
          title="List any skill. Here's where demand starts."
          intro="Students can offer any service they're good at. These popular categories are what students already sell on campus through Instagram and word of mouth, so we expect early demand there. Prices are example ranges; students set their own rates."
          id="cat-title"
        />
        <ul className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((c, i) => (
            <Reveal as="li" key={c.name} delay={(i % 3) * 80}>
              <Card className="flex h-full flex-col">
                <div className="flex items-center gap-3">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-navy text-white">
                    <Icon name={c.icon} className="h-6 w-6" />
                  </span>
                  <h3 className="text-xl text-navy">{c.name}</h3>
                </div>
                <p className="mt-3 leading-relaxed text-muted">{c.blurb}</p>
                <ul className="mt-5 divide-y divide-navy/10 border-t border-navy/10">
                  {c.jobs.map((j) => (
                    <li key={j.title} className="flex items-start justify-between gap-3 py-3">
                      <div>
                        <p className="font-medium text-navy">{j.title}</p>
                        <span className={cn("mt-1 inline-block rounded-full px-2 py-0.5 text-[11px] font-semibold text-navy", clientTone[j.client])}>
                          {j.client}
                        </span>
                      </div>
                      <span className="shrink-0 font-semibold text-navy tabular-nums">{j.range}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </Reveal>
          ))}
        </ul>

        <Reveal className="mt-6">
          <div className="bg-brand-gradient flex flex-col gap-6 rounded-2xl p-6 sm:p-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-xl">
              <div className="flex items-center gap-3">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-navy">
                  <Icon name="Sparkles" className="h-6 w-6" />
                </span>
                <h3 className="text-xl text-navy">{otherSkills.title}</h3>
              </div>
              <p className="mt-3 leading-relaxed text-navy/85">{otherSkills.body}</p>
            </div>
            <ul className="flex flex-wrap gap-2 lg:max-w-md lg:justify-end" aria-label="More examples of skills students can list">
              {otherSkills.examples.map((x) => (
                <li key={x} className="rounded-full bg-white/85 px-3 py-1.5 text-sm font-semibold text-navy">
                  {x}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </Section>

      <Section tone="white" id="pricing" labelledBy="pricing-title">
        <SectionHeading
          eyebrow="Pricing"
          title="Free to join. A small fee only when a job is done."
          intro="SkillSwap takes a 10–15% commission from each completed job, depending on who the client is. No sign-up fees, no subscriptions, no bidding credits."
          id="pricing-title"
        />
        <ul className="mt-12 grid gap-5 md:grid-cols-3">
          {feeTiers.map((t, i) => {
            const { fee, payout } = splitPrice(t.example.price, t.rate);
            return (
              <Reveal as="li" key={t.id} delay={i * 90}>
                <div className="flex h-full flex-col rounded-2xl bg-page p-6 ring-1 ring-navy/5">
                  <div className="flex items-center justify-between">
                    <NumberBadge n={i + 1} />
                    <span className="text-4xl font-bold text-navy">{Math.round(t.rate * 100)}%</span>
                  </div>
                  <h3 className="mt-4 text-lg text-navy">{t.label}</h3>
                  <p className="mt-1 text-muted">
                    Student keeps <strong className="font-semibold text-navy">{Math.round((1 - t.rate) * 100)}%</strong>
                  </p>
                  <div className="mt-5 rounded-xl bg-white p-4 text-sm ring-1 ring-navy/5">
                    <p className="font-semibold text-navy">
                      Example: {usd(t.example.price)} {t.example.job.toLowerCase()}
                    </p>
                    <p className="mt-1 text-muted">
                      SkillSwap fee {usd(fee)} · Student gets {usd(payout)}
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </ul>
        <p className="mt-6 text-sm text-muted">
          For comparison, Fiverr keeps 20% of each order, so its sellers keep 80%. The fee is included in the price the client sees; there is no surprise checkout charge.
        </p>
      </Section>

      <Section tone="gradient-soft" id="calculator" labelledBy="calc-title">
        <SectionHeading
          eyebrow="Fee calculator"
          title="What does the student actually take home?"
          intro="Pick a job type and enter a price. The numbers update as you type."
          id="calc-title"
        />
        <Reveal className="mt-10">
          <FeeCalculator />
        </Reveal>
      </Section>

      <WaitlistBand />
    </>
  );
}
