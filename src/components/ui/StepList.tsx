import { NumberBadge } from "./Section";
import { Reveal } from "./Reveal";

export function StepList({ steps }: { steps: ReadonlyArray<{ title: string; body: string }> }) {
  return (
    <ol className="relative space-y-5">
      <span aria-hidden="true" className="absolute top-6 bottom-6 left-[21px] w-0.5 bg-navy/10" />
      {steps.map((s, i) => (
        <Reveal as="li" key={s.title} delay={i * 80} className="relative flex gap-4">
          <NumberBadge n={i + 1} className="relative ring-4 ring-white" />
          <div className="pt-1.5">
            <h3 className="text-lg text-navy">{s.title}</h3>
            <p className="mt-1 leading-relaxed text-muted">{s.body}</p>
          </div>
        </Reveal>
      ))}
    </ol>
  );
}
