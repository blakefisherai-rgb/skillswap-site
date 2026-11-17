import { BadgeCheck } from "lucide-react";
import { Icon, type IconName } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";

const avatarTones = ["bg-peach text-navy", "bg-mint text-navy", "bg-cream text-navy", "bg-coral-soft text-navy", "bg-navy-50 text-navy"];

/** Initials avatar for sample people. We never use photos of real people for sample data. */
export function Avatar({ name, size = "md", className }: { name: string; size?: "sm" | "md" | "lg"; className?: string }) {
  const initials = name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  const tone = avatarTones[[...name].reduce((a, c) => a + c.charCodeAt(0), 0) % avatarTones.length];
  const sizes = { sm: "h-8 w-8 text-[11px]", md: "h-10 w-10 text-sm", lg: "h-16 w-16 text-xl" };
  return (
    <span
      className={cn("inline-flex shrink-0 items-center justify-center rounded-full font-bold ring-2 ring-white", tone, sizes[size], className)}
      aria-hidden="true"
    >
      {initials}
    </span>
  );
}

export function SampleTag({ className, children = "Sample data" }: { className?: string; children?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-dashed border-navy/40 bg-white/80 px-2 py-0.5 text-[10px] font-semibold tracking-wide text-navy/80 uppercase",
        className,
      )}
    >
      {children}
    </span>
  );
}

/** The deck-style mini gig card: icon, title, price, and gig type. */
export function MiniGigCard({
  icon,
  title,
  price,
  type,
  provider,
  className,
}: {
  icon: IconName;
  title: string;
  price?: string;
  type: string;
  provider?: string;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center gap-3 rounded-2xl bg-white p-3 shadow-card ring-1 ring-navy/5", className)}>
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-mint/70 text-navy">
        <Icon name={icon} className="h-5 w-5" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-[13px] leading-tight font-semibold text-navy">{title}</p>
        <p className="mt-0.5 text-[11px] leading-tight text-muted">{provider ? `${provider} · ${type}` : type}</p>
      </div>
      {price && (
        <span className="shrink-0 rounded-full bg-coral-soft px-2 py-1 text-[11px] font-bold whitespace-nowrap text-navy">
          Earn {price}
        </span>
      )}
    </div>
  );
}

export function CompletedCard({ title, subtitle, className }: { title: string; subtitle: string; className?: string }) {
  return (
    <div className={cn("flex items-center gap-3 rounded-2xl bg-white p-3 shadow-card ring-1 ring-navy/5", className)}>
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-success/10 text-success">
        <BadgeCheck className="h-6 w-6" aria-hidden="true" />
      </span>
      <div className="min-w-0">
        <p className="text-sm font-semibold text-navy">
          {title} <span className="text-success">✓</span>
        </p>
        <p className="text-xs text-muted">{subtitle}</p>
      </div>
    </div>
  );
}
