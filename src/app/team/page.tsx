import type { Metadata } from "next";
import Image from "next/image";
import { Compass, Heart, Target } from "lucide-react";
import { WaitlistBand } from "@/components/home/HomeSections";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { NumberBadge, Section, SectionHeading } from "@/components/ui/Section";
import { team, teamMission, teamValues, teamVision } from "@/data/team";
import { cn } from "@/lib/cn";

export const metadata: Metadata = {
  title: "Team",
  description: "Meet Group 11, the five Leeds School of Business co-founders building SkillSwap at CU Boulder.",
};

const archTones = ["bg-mint", "bg-peach", "bg-cream", "bg-coral-soft", "bg-mint"];

export default function TeamPage() {
  return (
    <>
      <PageHero
        eyebrow="Group 11 · ESBM 3700"
        title="The team behind SkillSwap."
        intro="Five Leeds School of Business students who have lived the experience paradox, and who already run marketing, sales, and partnerships for campus organizations and Boulder businesses."
      />

      <Section tone="white" labelledBy="team-title">
        <h2 id="team-title" className="sr-only">
          Co-founders
        </h2>
        {/* Flex-wrap so the last row of two cards is centered under the first three. */}
        <ul className="flex flex-wrap justify-center gap-x-6 gap-y-14">
          {team.map((m, i) => (
            <Reveal
              as="li"
              key={m.name}
              delay={(i % 3) * 90}
              className="flex w-full max-w-sm sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
            >
              <article className="flex w-full flex-col">
                <div className={cn("relative mx-auto aspect-[22/30] w-full max-w-[260px] overflow-hidden rounded-t-full rounded-b-3xl", archTones[i])}>
                  <Image
                    src={m.photo}
                    alt={`Headshot of ${m.name}, ${m.title}`}
                    fill
                    sizes="260px"
                    className="object-cover"
                    priority={i < 3}
                  />
                </div>
                <div className="mt-5 text-center">
                  <h3 className="text-2xl text-navy">{m.name}</h3>
                  <p className="mt-1 inline-block rounded-full bg-navy px-3 py-1 text-sm font-semibold text-white">{m.title}</p>
                </div>
                <ul className="mt-4 flex-1 space-y-1.5 text-[15px] text-muted">
                  {m.background.map((b) => (
                    <li key={b} className="flex gap-2">
                      <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-coral-hover" />
                      {b}
                    </li>
                  ))}
                </ul>
                <p className="mt-4 border-t border-navy/10 pt-4 text-navy italic">{m.focus}</p>
              </article>
            </Reveal>
          ))}
        </ul>
      </Section>

      <Section tone="gradient" labelledBy="mission-title">
        <SectionHeading eyebrow="Why we're building this" title="Mission, vision & values" id="mission-title" />
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-3xl bg-navy p-8 text-white">
              <Target className="h-8 w-8 text-coral" aria-hidden="true" />
              <p className="mt-4 text-sm font-semibold tracking-wide text-mint uppercase">Mission</p>
              <p className="mt-2 text-2xl leading-snug font-bold">{teamMission}</p>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className="h-full rounded-3xl bg-white/90 p-8">
              <Compass className="h-8 w-8 text-navy" aria-hidden="true" />
              <p className="mt-4 text-sm font-semibold tracking-wide text-navy/75 uppercase">Vision</p>
              <p className="mt-2 text-2xl leading-snug font-bold text-navy">{teamVision}</p>
            </div>
          </Reveal>
        </div>
        <h3 className="mt-12 flex items-center gap-2 text-xl text-navy">
          <Heart className="h-5 w-5" aria-hidden="true" /> Values
        </h3>
        <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {teamValues.map((v, i) => (
            <Reveal as="li" key={v.title} delay={i * 70}>
              <div className="h-full rounded-2xl bg-white/85 p-5">
                <NumberBadge n={i + 1} />
                <p className="mt-3 font-semibold text-navy">{v.title}</p>
                <p className="mt-1 text-sm leading-relaxed text-muted">{v.body}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </Section>

      <WaitlistBand title="Want to help us build it?" body="Students, clubs, businesses, and mentors: join the waitlist or send us a note." />
    </>
  );
}
