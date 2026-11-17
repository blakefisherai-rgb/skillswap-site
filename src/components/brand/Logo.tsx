import { cn } from "@/lib/cn";

type MarkProps = { className?: string; top?: string; bottom?: string; title?: string };

/** The SkillSwap swap-loop mark. Same geometry as public/brand/logo-mark.svg. */
export function LogoMark({ className, top = "#102F47", bottom = "#EE8F74", title }: MarkProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      <path d="M14.78 40.03 A19 19 0 0 1 43.70 17.03" fill="none" stroke={top} strokeWidth="7" strokeLinecap="round" />
      <path d="M50.00 21.95 L39.08 22.94 L48.32 11.12 Z" fill={top} stroke={top} strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M49.22 23.97 A19 19 0 0 1 20.30 46.97" fill="none" stroke={bottom} strokeWidth="7" strokeLinecap="round" />
      <path d="M14.00 42.05 L24.92 41.06 L15.68 52.88 Z" fill={bottom} stroke={bottom} strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

export function Logo({ className, inverted = false }: { className?: string; inverted?: boolean }) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <LogoMark className="h-[1.6em] w-[1.6em] shrink-0" top={inverted ? "#FFFFFF" : "#102F47"} />
      <span className={cn("font-bold tracking-[-0.02em]", inverted ? "text-white" : "text-navy")}>SkillSwap</span>
    </span>
  );
}
