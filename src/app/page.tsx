import { Hero } from "@/components/home/Hero";
import { Features, Pillars, Problem, PrototypeTeaser, Solution, WaitlistBand } from "@/components/home/HomeSections";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Pillars />
      <Problem />
      <Solution />
      <Features />
      <PrototypeTeaser />
      <WaitlistBand />
    </>
  );
}
