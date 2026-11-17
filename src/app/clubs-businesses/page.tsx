import type { Metadata } from "next";
import { Check } from "lucide-react";
import { WaitlistBand } from "@/components/home/HomeSections";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";
import { clientPage } from "@/data/audiences";
import { cn } from "@/lib/cn";

export const metadata: Metadata = {
  title: "For Clubs & Businesses",
  description:
    "Book verified CU Boulder students for event photos, flyers, social media, and research. Payment is held until delivery.",
};

export default function ClubsBusinessesPage() {
  return (
    <>
      <PageHero
        eyebrow="For clubs & local businesses"
        title="Affordable, trusted student talent on demand."
        intro="Need event photos by Friday, a flyer for rush week, or a fresh look at your shop's Instagram? Book a verified CU Boulder student, pay safely, and release payment when the work is delivered."
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/contact?role=club#waitlist">Join the waitlist as a club or business</ButtonLink>
          <ButtonLink href="#packages" variant="outline">
            See project packages
          </ButtonLink>
        </div>
      </PageHero>

      <Section tone="white" labelledBy="who-title">
        <SectionHeading eyebrow="Who we serve" title="Built for the people who need student talent most" id="who-title" />
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {clientPage.groups.map((g, i) => (
            <Reveal key={g.name} delay={i * 100}>
              <div className={cn("h-full rounded-3xl p-7 sm:p-8", i === 0 ? "bg-mint/50" : "bg-peach/60")}>
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-navy text-white">
                  <Icon name={g.icon} className="h-6 w-6" />
                </span>
                <h3 className="mt-5 text-2xl text-navy">{g.name}</h3>
                <p className="mt-1 text-navy/80">{g.who}</p>
                <ul className="mt-5 space-y-2.5">
                  {g.needs.map((n) => (
                    <li key={n} className="flex gap-2.5 text-navy">
                      <Check className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
                      {n}
                    </li>
                  ))}
                </ul>
                <p className="mt-6 inline-block rounded-full bg-white/80 px-3 py-1.5 text-sm font-semibold text-navy">{g.fee}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section labelledBy="cb-title">
        <SectionHeading eyebrow="Benefits" title="Why book through SkillSwap" id="cb-title" />
        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {clientPage.benefits.map((b, i) => (
            <Reveal as="li" key={b.title} delay={i * 70}>
              <div className="h-full rounded-2xl bg-white p-6 shadow-card ring-1 ring-navy/5">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-coral-soft text-navy">
                  <Icon name={b.icon} className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-lg text-navy">{b.title}</h3>
                <p className="mt-2 leading-relaxed text-muted">{b.body}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </Section>

      <Section tone="navy" id="trust" labelledBy="trust-title">
        <SectionHeading
          eyebrow="Trust & safety"
          title="Hiring a student shouldn't feel like a gamble"
          intro="Today, clubs find help through group chats and Instagram DMs, with no reviews, no protection, and no recourse. SkillSwap adds the safeguards."
          id="trust-title"
          invert
        />
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {clientPage.trust.map((t, i) => (
            <Reveal as="li" key={t.title} delay={(i % 3) * 70}>
              <div className="flex h-full gap-4 rounded-2xl bg-white/[0.07] p-5 ring-1 ring-white/10">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-mint text-navy">
                  <Icon name={t.icon} className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="text-base text-white">{t.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-white/80">{t.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </ul>
      </Section>

      <Section tone="gradient-soft" id="packages" labelledBy="pk-title">
        <SectionHeading
          eyebrow="Project packages"
          title="Bundles for the moments that matter"
          intro="Packages bundle the services clubs and shops most often need into one booking with a fixed price. These are planned packages with example pricing."
          id="pk-title"
        />
        <ul className="mt-12 grid gap-6 md:grid-cols-3">
          {clientPage.packages.map((p, i) => (
            <Reveal as="li" key={p.name} delay={i * 90}>
              <div className="flex h-full flex-col rounded-3xl bg-white p-7 shadow-card ring-1 ring-navy/5">
                <p className={cn("self-start rounded-full px-2.5 py-1 text-xs font-semibold text-navy", p.for === "Local businesses" ? "bg-coral-soft" : "bg-mint")}>
                  For {p.for.toLowerCase()}
                </p>
                <h3 className="mt-4 text-xl text-navy">{p.name}</h3>
                <p className="mt-2 text-sm text-muted">
                  Example price <span className="text-3xl font-bold text-navy">{p.price}</span>
                </p>
                <ul className="mt-5 flex-1 space-y-2.5 border-t border-navy/10 pt-5">
                  {p.includes.map((x) => (
                    <li key={x} className="flex gap-2.5 text-navy">
                      <Check className="mt-0.5 h-5 w-5 shrink-0 text-success" aria-hidden="true" />
                      {x}
                    </li>
                  ))}
                </ul>
                <ButtonLink href={p.for === "Local businesses" ? "/contact?role=business#waitlist" : "/contact?role=club#waitlist"} variant="outline" size="sm" className="mt-6 self-start">
                  I&apos;m interested
                </ButtonLink>
              </div>
            </Reveal>
          ))}
        </ul>
      </Section>

      <WaitlistBand
        title="Bring SkillSwap to your club or shop"
        body="Our pilot plan includes 5 student clubs and 3 Boulder businesses. Join the waitlist to be considered."
      />
    </>
  );
}
