import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Compass, Target } from "lucide-react";
import { WaitlistBand } from "@/components/home/HomeSections";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { Card, NumberBadge, Section, SectionHeading } from "@/components/ui/Section";
import { site } from "@/config/site";
import { aboutAudiences, aboutStatus, aboutStory } from "@/data/about";
import { problem } from "@/data/home";
import { team, teamMission, teamVision } from "@/data/team";

export const metadata: Metadata = {
  title: "About",
  description:
    "What SkillSwap is, why we're building it, and who it's for: a campus marketplace connecting CU Boulder students with paid gigs and real projects.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero eyebrow="About SkillSwap" title={`${site.secondaryLine}.`} intro={site.oneLiner}>
        <p className="inline-flex items-center gap-2 rounded-full bg-white/75 px-3.5 py-1.5 text-sm font-semibold text-navy ring-1 ring-navy/10">
          <span className="h-2 w-2 rounded-full bg-coral-hover" aria-hidden="true" />
          Concept stage · Launching at CU Boulder
        </p>
      </PageHero>

      {/* Story */}
      <Section tone="white" labelledBy="story-title">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:items-center lg:gap-16">
          <div>
            <SectionHeading eyebrow="Our story" title={aboutStory.title} id="story-title" />
            <div className="mt-6 space-y-4 text-lg leading-relaxed text-muted">
              {aboutStory.paragraphs.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </div>
          </div>
          <Reveal delay={120}>
            <div className="space-y-4">
              <blockquote className="rounded-2xl bg-navy p-6 text-xl leading-snug font-semibold text-white">{problem.lead}</blockquote>
              <figure className="bg-brand-gradient rounded-2xl p-6">
                <p className="text-6xl font-bold tracking-tight text-navy">{problem.stat.value}</p>
                <figcaption>
                  <p className="mt-2 font-medium text-navy">{problem.stat.label}</p>
                  <p className="mt-2 text-sm text-navy/80">Source: {problem.stat.source}</p>
                </figcaption>
              </figure>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Who it's for */}
      <Section tone="gradient-soft" labelledBy="who-title">
        <SectionHeading
          eyebrow="Who it's for"
          title="One campus marketplace, three groups"
          intro="SkillSwap works because each side has what the other needs."
          id="who-title"
        />
        <ul className="mt-10 grid gap-5 md:grid-cols-3">
          {aboutAudiences.map((a, i) => (
            <Reveal as="li" key={a.title} delay={i * 80}>
              <Card className="flex h-full flex-col">
                <div className="flex items-center gap-3">
                  <NumberBadge n={i + 1} />
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-navy text-white">
                    <Icon name={a.icon} className="h-5 w-5" />
                  </span>
                </div>
                <h3 className="mt-4 text-xl text-navy">{a.title}</h3>
                <p className="mt-2 flex-1 leading-relaxed text-muted">{a.body}</p>
                <Link href={a.href} className="mt-4 inline-flex items-center gap-1.5 font-semibold text-navy underline-offset-4 hover:underline">
                  {a.cta} <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </Card>
            </Reveal>
          ))}
        </ul>
      </Section>

      {/* Mission & vision */}
      <Section tone="navy" labelledBy="mv-title">
        <h2 id="mv-title" className="sr-only">
          Mission and vision
        </h2>
        <div className="grid gap-5 md:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-3xl bg-white/[0.07] p-8 ring-1 ring-white/10">
              <Target className="h-8 w-8 text-coral" aria-hidden="true" />
              <p className="mt-4 text-sm font-semibold tracking-wide text-mint uppercase">Mission</p>
              <p className="mt-2 text-2xl leading-snug font-bold text-white">{teamMission}</p>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className="h-full rounded-3xl bg-white/[0.07] p-8 ring-1 ring-white/10">
              <Compass className="h-8 w-8 text-mint" aria-hidden="true" />
              <p className="mt-4 text-sm font-semibold tracking-wide text-mint uppercase">Vision</p>
              <p className="mt-2 text-2xl leading-snug font-bold text-white">{teamVision}</p>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Team preview */}
      <Section tone="white" labelledBy="team-preview-title">
        <SectionHeading
          eyebrow="The team"
          title="Built by five Leeds students"
          intro="Group 11 brings experience in marketing, sales, real estate, film, and student leadership."
          id="team-preview-title"
          align="center"
        />
        <ul className="mt-10 flex flex-wrap justify-center gap-x-6 gap-y-8">
          {team.map((m) => (
            <li key={m.name} className="w-32 text-center sm:w-36">
              <div className="relative mx-auto h-24 w-24 overflow-hidden rounded-full bg-mint ring-4 ring-page sm:h-28 sm:w-28">
                <Image src={m.photo} alt={`Headshot of ${m.name}`} fill sizes="112px" className="object-cover object-top" />
              </div>
              <p className="mt-3 font-semibold text-navy">{m.name}</p>
              <p className="text-sm text-muted">{m.title}</p>
            </li>
          ))}
        </ul>
        <div className="mt-10 text-center">
          <ButtonLink href="/team" variant="outline">
            Meet the team <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </ButtonLink>
        </div>
      </Section>

      {/* Status */}
      <Section labelledBy="status-title">
        <Reveal>
          <div className="rounded-3xl bg-white p-7 shadow-card ring-1 ring-navy/5 sm:p-10 lg:flex lg:items-center lg:justify-between lg:gap-10">
            <div className="max-w-2xl">
              <h2 id="status-title" className="text-2xl text-navy">
                {aboutStatus.title}
              </h2>
              <p className="mt-3 text-lg leading-relaxed text-muted">{aboutStatus.body}</p>
            </div>
            <ul className="mt-6 flex flex-col gap-2.5 sm:flex-row lg:mt-0 lg:flex-col">
              {aboutStatus.links.map((l, i) => (
                <li key={l.href}>
                  <ButtonLink href={l.href} variant={i === 0 ? "primary" : "outline"} size="sm" className="w-full lg:w-56">
                    {l.label}
                  </ButtonLink>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </Section>

      <WaitlistBand />
    </>
  );
}
