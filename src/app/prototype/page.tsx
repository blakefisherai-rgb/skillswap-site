import type { Metadata } from "next";
import { FlaskConical, Target } from "lucide-react";
import { WaitlistBand } from "@/components/home/HomeSections";
import { PrototypeDemo } from "@/components/prototype/PrototypeDemo";
import { Icon } from "@/components/ui/Icon";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { Card, NumberBadge, Section, SectionHeading } from "@/components/ui/Section";
import { hypotheses } from "@/data/prototype";

export const metadata: Metadata = {
  title: "Prototype",
  description:
    "Click through the SkillSwap app prototype: browse gigs, open a verified student profile, book with payment held until delivery, and watch the portfolio update.",
};

export default function PrototypePage() {
  return (
    <>
      <PageHero
        eyebrow="Clickable prototype"
        title="Try SkillSwap in your browser."
        intro="This is our AI-assisted design prototype of the SkillSwap app. Browse gigs, open a student's verified profile, book a job, and mark it complete to see the portfolio update. Every person and listing here is sample data."
      />

      <Section tone="white" labelledBy="demo-title" className="pt-10 sm:pt-14">
        <h2 id="demo-title" className="sr-only">
          Interactive app demo
        </h2>
        <PrototypeDemo />
      </Section>

      <Section id="mvp" labelledBy="mvp-title">
        <SectionHeading
          eyebrow="MVP & assumptions"
          title="What we're testing"
          intro="SkillSwap is a concept, not a live product. Before building the full app, we plan to test our riskiest assumptions with lightweight experiments at CU Boulder."
          id="mvp-title"
        />
        <ol className="mt-12 grid gap-5 md:grid-cols-2">
          {hypotheses.map((h, i) => (
            <Reveal as="li" key={h.assumption} delay={(i % 2) * 90}>
              <Card className="h-full">
                <div className="flex items-center gap-3">
                  <NumberBadge n={i + 1} />
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-navy text-white">
                    <Icon name={h.icon} className="h-5 w-5" />
                  </span>
                </div>
                <p className="mt-5 text-xs font-semibold tracking-wide text-navy/70 uppercase">Assumption</p>
                <h3 className="mt-1 text-xl text-navy">{h.assumption}</h3>
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-xl bg-page p-4">
                    <p className="flex items-center gap-1.5 text-xs font-semibold text-navy">
                      <FlaskConical className="h-4 w-4" aria-hidden="true" /> How we&apos;ll test it
                    </p>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted">{h.test}</p>
                  </div>
                  <div className="rounded-xl bg-mint/40 p-4">
                    <p className="flex items-center gap-1.5 text-xs font-semibold text-navy">
                      <Target className="h-4 w-4" aria-hidden="true" /> What we&apos;ll measure
                    </p>
                    <p className="mt-1.5 text-sm leading-relaxed text-navy">{h.metric}</p>
                  </div>
                </div>
              </Card>
            </Reveal>
          ))}
        </ol>
      </Section>

      <WaitlistBand title="Like what you clicked?" body="Join the waitlist and help us test these assumptions at CU Boulder." />
    </>
  );
}
