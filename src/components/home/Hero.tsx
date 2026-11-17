import { GraduationCap, LockKeyhole, Store } from "lucide-react";
import { CompletedCard } from "@/components/app/AppBits";
import { ButtonLink } from "@/components/ui/Button";
import { Container, Eyebrow } from "@/components/ui/Section";
import { site } from "@/config/site";
import { HeroPhonePreview } from "./HeroPhonePreview";

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="bg-brand-gradient relative overflow-hidden">
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-40 -left-32 h-96 w-96 rounded-full bg-white/30 blur-3xl" />
      <Container className="relative grid items-center gap-12 py-14 sm:py-20 lg:grid-cols-[1.15fr_1fr] lg:gap-8 lg:py-24">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-1 text-xs font-semibold text-navy ring-1 ring-navy/10">
            <span className="h-2 w-2 rounded-full bg-success" aria-hidden="true" />
            Launching at CU Boulder
          </p>
          <Eyebrow className="mt-6">{site.secondaryLine}</Eyebrow>
          <h1 id="hero-title" className="mt-3 text-[2.6rem] leading-[1.05] text-navy sm:text-6xl lg:text-[4.1rem]">
            Earn money.
            <br />
            Build skills.
            <br />
            <span className="relative whitespace-nowrap">
              Gain experience.
              <svg
                aria-hidden="true"
                viewBox="0 0 300 12"
                preserveAspectRatio="none"
                className="absolute -bottom-2 left-0 h-3 w-full text-coral-hover"
              >
                <path d="M2 9 C 80 2, 200 2, 298 7" stroke="currentColor" strokeWidth="5" fill="none" strokeLinecap="round" />
              </svg>
            </span>
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-relaxed text-navy/85">{site.oneLiner}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/students" size="lg">
              <GraduationCap className="h-5 w-5" aria-hidden="true" />
              I&apos;m a student
            </ButtonLink>
            <ButtonLink href="/clubs-businesses" size="lg" variant="outline">
              <Store className="h-5 w-5" aria-hidden="true" />
              I need help with a project
            </ButtonLink>
          </div>
          <p className="mt-5 text-sm text-navy/75">Free to join · Students keep 90% · Payment held until delivery</p>
        </div>

        <div className="relative mx-auto w-full max-w-[420px] xl:mr-0 xl:max-w-none">
          <HeroPhonePreview className="xl:mr-0" />
          {/* Floating badges sit beside the phone (not over it) on wide screens only. */}
          <div className="absolute top-28 left-0 hidden w-52 xl:block">
            <div className="flex items-center gap-3 rounded-2xl bg-white p-3 shadow-lift ring-1 ring-navy/5">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-cream text-navy">
                <LockKeyhole className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <p className="text-sm font-semibold text-navy">Payment held</p>
                <p className="text-xs text-muted">until delivery</p>
              </div>
            </div>
          </div>
          <div className="absolute bottom-28 left-0 hidden w-52 xl:block">
            <CompletedCard title="Photography Gig Completed" subtitle="Added to portfolio" className="shadow-lift" />
          </div>
        </div>
      </Container>
    </section>
  );
}
