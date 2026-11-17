import type { Metadata } from "next";
import { Star } from "lucide-react";
import { Avatar, CompletedCard, SampleTag } from "@/components/app/AppBits";
import { LogoMark } from "@/components/brand/Logo";
import { WaitlistBand } from "@/components/home/HomeSections";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { Card, NumberBadge, Section, SectionHeading } from "@/components/ui/Section";
import { studentPage } from "@/data/audiences";

export const metadata: Metadata = {
  title: "For Students",
  description:
    "Get paid for photography, design, tutoring, and marketing skills you already have, keep up to 90%, and build a verified portfolio on SkillSwap.",
};

function PortfolioPreview() {
  return (
    <div className="relative mx-auto w-full max-w-md">
      <div className="rounded-3xl bg-white p-6 shadow-lift ring-1 ring-navy/5">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Avatar name="Maya Chen" size="lg" />
            <div>
              <p className="flex items-center gap-1.5 text-lg font-bold text-navy">
                Maya C.
                <span className="inline-flex items-center gap-1 rounded-full bg-mint px-2 py-0.5 text-[11px] font-semibold">
                  <LogoMark className="h-3.5 w-3.5" /> Verified
                </span>
              </p>
              <p className="text-sm text-muted">Photography · Design</p>
            </div>
          </div>
          <SampleTag />
        </div>

        <div className="mt-5 grid grid-cols-3 gap-2 text-center">
          {[
            ["12", "Jobs done"],
            ["4.9", "Avg rating"],
            ["6", "Clients"],
          ].map(([n, l]) => (
            <div key={l} className="rounded-xl bg-page py-3">
              <p className="text-xl font-bold text-navy">{n}</p>
              <p className="text-[11px] text-muted">{l}</p>
            </div>
          ))}
        </div>

        <p className="mt-5 text-xs font-semibold tracking-wide text-navy/70 uppercase">Verified work</p>
        <div className="mt-2 space-y-2">
          <CompletedCard title="Photography Gig Completed" subtitle="Ski Club · Winter formal" className="bg-page shadow-none" />
          <CompletedCard title="Social Media Audit Completed" subtitle="Pearl St. café · 3-week project" className="bg-page shadow-none" />
        </div>

        <div className="mt-4 rounded-xl bg-cream p-4">
          <div className="flex gap-0.5 text-navy" aria-label="5 out of 5 stars">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-current" aria-hidden="true" />
            ))}
          </div>
          <p className="mt-2 text-sm text-navy">&ldquo;Photos were ready two days early and our members loved them.&rdquo;</p>
          <p className="mt-1 text-xs text-muted">Sample review</p>
        </div>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {["Event photography", "Lightroom", "Canva", "Instagram strategy"].map((s) => (
            <span key={s} className="rounded-full bg-mint/60 px-2.5 py-1 text-xs font-semibold text-navy">
              {s}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function StudentsPage() {
  return (
    <>
      <PageHero
        eyebrow="For students"
        title="Get paid for what you already do well."
        intro="You can already shoot, design, tutor, or post. SkillSwap connects you with the peers, clubs, and Boulder businesses who need those skills, pays you safely, and turns every job into proof you can show employers."
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/contact?role=student#waitlist">Join the waitlist as a student</ButtonLink>
          <ButtonLink href="/how-it-works#calculator" variant="outline">
            See what you&apos;d earn
          </ButtonLink>
        </div>
      </PageHero>

      <Section tone="white" labelledBy="sb-title">
        <SectionHeading
          eyebrow="Why students join"
          title="Money now. Experience that counts later."
          intro="Built for freshmen and sophomores who have real skills but no internship yet."
          id="sb-title"
        />
        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {studentPage.benefits.map((b, i) => (
            <Reveal as="li" key={b.title} delay={(i % 3) * 80}>
              <div className="h-full rounded-2xl bg-page p-6 ring-1 ring-navy/5">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-mint text-navy">
                  <Icon name={b.icon} className="h-6 w-6" />
                </span>
                <h3 className="mt-4 text-lg text-navy">{b.title}</h3>
                <p className="mt-2 leading-relaxed text-muted">{b.body}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </Section>

      <Section tone="gradient" id="portfolio" labelledBy="pf-title">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Your portfolio" title={studentPage.portfolio.title} intro={studentPage.portfolio.intro} id="pf-title" />
            <ul className="mt-8 grid gap-4 sm:grid-cols-2">
              {studentPage.portfolio.points.map((p, i) => (
                <Reveal as="li" key={p.title} delay={i * 70}>
                  <div className="h-full rounded-2xl bg-white/85 p-5">
                    <h3 className="text-base text-navy">{p.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted">{p.body}</p>
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>
          <Reveal delay={120}>
            <PortfolioPreview />
          </Reveal>
        </div>
      </Section>

      <Section tone="white" id="verification" labelledBy="ver-title">
        <SectionHeading
          eyebrow="Trust & verification"
          title="How verification works"
          intro="Clubs and businesses book with confidence because every provider is checked, and students get paid because every client pays up front."
          id="ver-title"
        />
        <ol className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {studentPage.verification.map((v, i) => (
            <Reveal as="li" key={v.title} delay={i * 80}>
              <Card className="h-full">
                <div className="flex items-center justify-between">
                  <NumberBadge n={i + 1} />
                  <Icon name={v.icon} className="h-6 w-6 text-navy/70" />
                </div>
                <h3 className="mt-4 text-lg text-navy">{v.title}</h3>
                <p className="mt-2 leading-relaxed text-muted">{v.body}</p>
              </Card>
            </Reveal>
          ))}
        </ol>
      </Section>

      <WaitlistBand title="Turn your skills into experience" body="Join the student waitlist. Our goal is 100 verified student providers for the CU Boulder pilot." />
    </>
  );
}
