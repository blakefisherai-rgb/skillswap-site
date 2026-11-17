import type { Metadata } from "next";
import { Suspense } from "react";
import { GraduationCap, Mail, MapPin, Store, Users } from "lucide-react";
import { WaitlistForm, WaitlistFormFromParams } from "@/components/contact/WaitlistForm";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "Contact & Waitlist",
  description: "Join the SkillSwap waitlist as a student, club, or local business, or send the team a message.",
};

const next = [
  { icon: GraduationCap, who: "Students", what: "We'll invite you to verify your .edu email and set up your first listing." },
  { icon: Users, who: "Clubs", what: "We'll reach out to match you with students for an upcoming event." },
  { icon: Store, who: "Businesses", what: "We'll set up a short call to scope a fixed-price pilot project." },
];

export default function ContactPage() {
  const emailIsSet = site.contactEmail.includes("@");
  return (
    <>
      <PageHero
        eyebrow="Contact & waitlist"
        title="Join the waitlist."
        intro="Whether you're a student, a club, or a local business, tell us who you are and we'll reach out when SkillSwap opens at CU Boulder."
      />
      <Section tone="gradient-soft" id="waitlist" labelledBy="form-title" className="pt-10 sm:pt-14">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <h2 id="form-title" className="mb-5 text-2xl text-navy">
              Get early access
            </h2>
            <Suspense fallback={<WaitlistForm />}>
              <WaitlistFormFromParams />
            </Suspense>
          </div>
          <aside className="space-y-6">
            <div className="rounded-3xl bg-white/85 p-6">
              <h2 className="text-lg text-navy">What happens next</h2>
              <ul className="mt-4 space-y-4">
                {next.map((n) => (
                  <li key={n.who} className="flex gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-mint text-navy">
                      <n.icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <p className="text-sm leading-relaxed text-muted">
                      <span className="font-semibold text-navy">{n.who}: </span>
                      {n.what}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-3xl bg-navy p-6 text-white">
              <h2 className="text-lg text-white">Contact the team</h2>
              <p className="mt-4 flex items-center gap-3">
                <Mail className="h-5 w-5 text-mint" aria-hidden="true" />
                {emailIsSet ? (
                  <a href={`mailto:${site.contactEmail}`} className="font-semibold underline underline-offset-4">
                    {site.contactEmail}
                  </a>
                ) : (
                  <span className="font-semibold">{site.contactEmail}</span>
                )}
              </p>
              <p className="mt-3 flex items-center gap-3 text-white/85">
                <MapPin className="h-5 w-5 text-mint" aria-hidden="true" />
                Leeds School of Business, CU Boulder
              </p>
              <p className="mt-5 text-sm text-white/75">{site.classNote}</p>
            </div>
          </aside>
        </div>
      </Section>
    </>
  );
}
