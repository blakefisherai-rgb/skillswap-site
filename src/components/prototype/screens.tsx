"use client";

import type { Dispatch, ReactNode } from "react";
import { ArrowLeft, Check, ChevronRight, Clock, LockKeyhole, Search, Star, X } from "lucide-react";
import { Avatar, SampleTag } from "@/components/app/AppBits";
import { LogoMark } from "@/components/brand/Logo";
import { Icon } from "@/components/ui/Icon";
import { splitPrice, usd } from "@/data/pricing";
import { bookerTypes, meStudentId, protoCategories, services, type Service } from "@/data/prototype";
import { cn } from "@/lib/cn";
import { payoutFor, serviceById, studentById, tierById, type Action, type State } from "./state";

type P = { state: State; dispatch: Dispatch<Action> };

/* ---------- shared bits ---------- */

export function ScreenTitle({ children, sub }: { children: ReactNode; sub?: ReactNode }) {
  return (
    <div>
      <h2 data-screen-title tabIndex={-1} className="text-lg leading-tight font-bold text-navy outline-none">
        {children}
      </h2>
      {sub && <p className="mt-0.5 text-xs text-muted">{sub}</p>}
    </div>
  );
}

export function TopBar({ state, dispatch, title }: P & { title?: string }) {
  const canBack = state.history.length > 0;
  return (
    <div className="flex h-12 shrink-0 items-center gap-2 border-b border-navy/5 bg-white px-3">
      {canBack ? (
        <button
          type="button"
          onClick={() => dispatch({ type: "back" })}
          className="flex h-9 w-9 items-center justify-center rounded-full text-navy hover:bg-navy/5"
          aria-label="Back"
        >
          <ArrowLeft className="h-5 w-5" aria-hidden="true" />
        </button>
      ) : (
        <LogoMark className="ml-1 h-6 w-6" />
      )}
      <p className="flex-1 truncate text-sm font-bold text-navy">{title ?? "SkillSwap"}</p>
      <SampleTag className="mr-1" />
    </div>
  );
}

function Stars({ value, className }: { value: number; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-0.5 font-semibold text-navy", className)}>
      <Star className="h-3.5 w-3.5 fill-coral-hover text-coral-hover" aria-hidden="true" />
      {value.toFixed(1)}
    </span>
  );
}

function VerifiedBadge() {
  return (
    <span className="inline-flex items-center gap-0.5 rounded-full bg-mint px-1.5 py-0.5 text-[10px] font-semibold text-navy">
      <Check className="h-3 w-3" aria-hidden="true" /> Verified
    </span>
  );
}

function PrimaryButton({
  children,
  onClick,
  disabled,
  className,
  tone = "navy",
}: {
  children: ReactNode;
  onClick: () => void;
  disabled?: boolean;
  className?: string;
  tone?: "navy" | "coral";
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-disabled={disabled || undefined}
      className={cn(
        "flex h-12 w-full items-center justify-center gap-2 rounded-xl text-sm font-semibold transition-colors",
        tone === "navy" ? "bg-navy text-white hover:bg-navy-700" : "bg-coral text-navy hover:bg-coral-hover",
        disabled && "opacity-50",
        className,
      )}
    >
      {children}
    </button>
  );
}

function Price({ s }: { s: Service }) {
  return (
    <span className="font-bold text-navy tabular-nums">
      {usd(s.price)}
      {s.unit && <span className="text-[11px] font-medium text-muted">{s.unit}</span>}
    </span>
  );
}

/* ---------- 1. Explore ---------- */

export function ExploreScreen({ state, dispatch }: P) {
  const q = state.query.trim().toLowerCase();
  const list = services.filter((s) => {
    const st = studentById(s.studentId);
    const inCat = state.category === "all" || s.category === state.category;
    const inQuery = !q || [s.title, st.name, st.major, ...st.skills].some((t) => t.toLowerCase().includes(q));
    return inCat && inQuery;
  });

  return (
    <div className="px-4 pt-4 pb-6">
      <ScreenTitle sub="Find a verified CU Boulder student for your next gig or project">Explore gigs</ScreenTitle>

      <label className="mt-3 flex items-center gap-2 rounded-xl bg-white px-3 ring-1 ring-navy/15 focus-within:ring-2 focus-within:ring-navy">
        <Search className="h-4 w-4 text-muted" aria-hidden="true" />
        <span className="sr-only">Search gigs</span>
        <input
          type="search"
          value={state.query}
          onChange={(e) => dispatch({ type: "query", query: e.target.value })}
          placeholder="Search any skill…"
          className="h-10 w-full bg-transparent text-sm text-navy outline-none placeholder:text-muted"
        />
      </label>

      <div className="-mx-4 mt-3 flex gap-1.5 overflow-x-auto px-4 pb-1 [scrollbar-width:none]" role="group" aria-label="Filter by category">
        {protoCategories.map((c) => {
          const on = state.category === c.id;
          return (
            <button
              key={c.id}
              type="button"
              aria-pressed={on}
              onClick={() => dispatch({ type: "category", category: c.id })}
              className={cn(
                "shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold transition-colors",
                on ? "bg-navy text-white" : "bg-white text-navy ring-1 ring-navy/10 hover:ring-navy/30",
              )}
            >
              {c.label}
            </button>
          );
        })}
      </div>

      <p className="mt-4 mb-2 text-xs font-semibold text-navy/70" aria-live="polite">
        {list.length} {list.length === 1 ? "listing" : "listings"}
      </p>

      {list.length === 0 ? (
        <div className="rounded-2xl bg-white p-5 text-center ring-1 ring-navy/5">
          <p className="text-sm font-semibold text-navy">No gigs match that search.</p>
          <button
            type="button"
            className="mt-2 text-sm font-semibold text-navy underline underline-offset-4"
            onClick={() => {
              dispatch({ type: "query", query: "" });
              dispatch({ type: "category", category: "all" });
            }}
          >
            Clear filters
          </button>
        </div>
      ) : (
        <ul className="space-y-2.5">
          {list.map((s) => {
            const st = studentById(s.studentId);
            return (
              <li key={s.id}>
                <button
                  type="button"
                  onClick={() => dispatch({ type: "go", screen: { name: "profile", studentId: st.id } })}
                  className="flex w-full items-center gap-3 rounded-2xl bg-white p-3 text-left shadow-card ring-1 ring-navy/5 transition-shadow hover:shadow-lift"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-mint/70 text-navy">
                    <Icon name={s.icon} className="h-5 w-5" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[13px] leading-tight font-semibold text-navy">{s.title}</span>
                    <span className="mt-1 flex items-center gap-1.5 text-[11px] text-muted">
                      {st.short} <Stars value={st.rating} className="text-[11px]" />
                    </span>
                    <span className="mt-1 inline-block rounded-full bg-cream px-1.5 py-0.5 text-[10px] font-semibold text-navy">{s.kind}</span>
                  </span>
                  <span className="flex flex-col items-end gap-1">
                    <Price s={s} />
                    <ChevronRight className="h-4 w-4 text-navy/40" aria-hidden="true" />
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

/* ---------- 2. Student profile ---------- */

export function ProfileScreen({ dispatch, studentId }: Pick<P, "dispatch"> & { studentId: string }) {
  const st = studentById(studentId);
  const mine = services.filter((s) => s.studentId === st.id);
  const tileTones = ["from-peach to-mint", "from-mint to-cream", "from-cream to-peach", "from-coral-soft to-mint"];

  return (
    <div className="pb-6">
      <div className="bg-brand-gradient px-4 pt-5 pb-5">
        <div className="flex items-center gap-3">
          <Avatar name={st.name} size="lg" />
          <div className="min-w-0">
            <ScreenTitle>
              <span className="flex flex-wrap items-center gap-1.5">
                {st.short} <VerifiedBadge />
              </span>
            </ScreenTitle>
            <p className="text-xs text-navy/80">
              {st.major} · {st.year}
            </p>
            <p className="mt-1 flex items-center gap-2 text-xs text-navy">
              <Stars value={st.rating} /> · {st.jobs} jobs ·
              <span className="inline-flex items-center gap-0.5">
                <Clock className="h-3 w-3" aria-hidden="true" /> {st.responseTime}
              </span>
            </p>
          </div>
        </div>
        <p className="mt-3 text-sm text-navy">{st.headline}</p>
        <p className="mt-2 text-[11px] text-navy/75">.edu email verified · CU Boulder</p>
      </div>

      <section className="px-4 pt-4" aria-label="Rates">
        <h3 className="text-sm font-bold text-navy">Rates</h3>
        <ul className="mt-2 space-y-2">
          {mine.map((s) => (
            <li key={s.id} className="flex items-center gap-3 rounded-xl bg-white p-3 ring-1 ring-navy/5">
              <span className="min-w-0 flex-1">
                <span className="block text-[13px] font-semibold text-navy">{s.title}</span>
                <span className="block text-[11px] text-muted">{s.delivery}</span>
              </span>
              <Price s={s} />
              <button
                type="button"
                onClick={() => dispatch({ type: "startBooking", serviceId: s.id })}
                className="rounded-lg bg-coral px-2.5 py-1.5 text-xs font-semibold text-navy hover:bg-coral-hover"
                aria-label={`Book ${s.title}`}
              >
                Book
              </button>
            </li>
          ))}
        </ul>
      </section>

      <section className="px-4 pt-5" aria-label="Portfolio">
        <h3 className="text-sm font-bold text-navy">Verified portfolio</h3>
        <ul className="mt-2 grid grid-cols-2 gap-2">
          {st.portfolio.map((p, i) => (
            <li key={p.title} className={cn("flex aspect-square flex-col justify-between rounded-xl bg-gradient-to-br p-2.5", tileTones[i % tileTones.length])}>
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/80 text-navy">
                <Icon name={p.icon} className="h-4 w-4" />
              </span>
              <span>
                <span className="block text-xs leading-tight font-semibold text-navy">{p.title}</span>
                <span className="flex items-center gap-1 text-[10px] text-navy/80">
                  <Check className="h-3 w-3" aria-hidden="true" /> {p.client}
                </span>
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section className="px-4 pt-5" aria-label="Reviews">
        <h3 className="text-sm font-bold text-navy">Reviews</h3>
        <ul className="mt-2 space-y-2">
          {st.reviews.map((r) => (
            <li key={r.author} className="rounded-xl bg-white p-3 ring-1 ring-navy/5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-navy">
                  {r.author} <span className="font-normal text-muted">· {r.role}</span>
                </span>
                <span className="flex" aria-label={`${r.stars} out of 5 stars`}>
                  {Array.from({ length: r.stars }).map((_, i) => (
                    <Star key={i} className="h-3 w-3 fill-coral-hover text-coral-hover" aria-hidden="true" />
                  ))}
                </span>
              </div>
              <p className="mt-1 text-xs leading-relaxed text-navy">&ldquo;{r.text}&rdquo;</p>
            </li>
          ))}
        </ul>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {st.skills.map((s) => (
            <span key={s} className="rounded-full bg-mint/60 px-2 py-1 text-[11px] font-semibold text-navy">
              {s}
            </span>
          ))}
        </div>
      </section>

    </div>
  );
}

export function ProfileFooter({ dispatch, studentId }: { dispatch: Dispatch<Action>; studentId: string }) {
  const st = studentById(studentId);
  const mine = services.filter((s) => s.studentId === st.id);
  return (
    <div className="shrink-0 border-t border-navy/10 bg-white p-3">
      <PrimaryButton onClick={() => dispatch({ type: "startBooking", serviceId: mine[0].id })}>
        Book {st.short.split(" ")[0]} · from {usd(Math.min(...mine.map((s) => s.price)))}
      </PrimaryButton>
    </div>
  );
}

/* ---------- 3. Booking flow ---------- */

function Stepper({ step }: { step: 1 | 2 | 3 }) {
  const labels = ["Service", "Details", "Review"];
  return (
    <ol className="flex items-center gap-1.5 px-4 pt-4" aria-label={`Step ${step} of 3`}>
      {labels.map((l, i) => {
        const n = i + 1;
        const state = n < step ? "done" : n === step ? "current" : "todo";
        return (
          <li key={l} className="flex flex-1 flex-col gap-1" aria-current={state === "current" ? "step" : undefined}>
            <span className={cn("h-1.5 rounded-full", state === "todo" ? "bg-navy/10" : "bg-navy")} />
            <span className={cn("text-[10px] font-semibold", state === "todo" ? "text-navy/50" : "text-navy")}>
              {n}. {l}
            </span>
          </li>
        );
      })}
    </ol>
  );
}

export function BookScreen({ state, dispatch, step }: P & { step: 1 | 2 | 3 }) {
  const d = state.draft!;
  const svc = serviceById(d.serviceId);
  const st = studentById(svc.studentId);
  const options = services.filter((s) => s.studentId === st.id);
  const tier = tierById(d.tier);
  const { fee, payout } = splitPrice(svc.price, tier.rate);
  const whenOptions = ["Tomorrow", "This weekend", "Next week", "Flexible"];
  const missingWhen = step === 2 && !d.when;
  const next = (s: 1 | 2 | 3) => dispatch({ type: "go", screen: { name: "book", step: s } });

  return (
    <div className="flex min-h-full flex-col pb-4">
      <Stepper step={step} />
      <div className="flex-1 px-4 pt-4">
        {step === 1 && (
          <>
            <ScreenTitle sub={`with ${st.short}`}>Choose a service</ScreenTitle>
            <fieldset className="mt-3 space-y-2">
              <legend className="sr-only">Service</legend>
              {options.map((s) => {
                const on = s.id === d.serviceId;
                return (
                  <label
                    key={s.id}
                    className={cn(
                      "flex cursor-pointer items-center gap-3 rounded-xl border-2 bg-white p-3 has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-navy",
                      on ? "border-navy" : "border-transparent ring-1 ring-navy/10",
                    )}
                  >
                    <input type="radio" name="svc" className="sr-only" checked={on} onChange={() => dispatch({ type: "draft", patch: { serviceId: s.id } })} />
                    <span className={cn("flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2", on ? "border-navy bg-navy" : "border-navy/30")}>
                      {on && <Check className="h-3 w-3 text-white" aria-hidden="true" />}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-[13px] font-semibold text-navy">{s.title}</span>
                      <span className="block text-[11px] text-muted">{s.delivery}</span>
                    </span>
                    <Price s={s} />
                  </label>
                );
              })}
            </fieldset>
          </>
        )}

        {step === 2 && (
          <>
            <ScreenTitle sub={svc.title}>Add details</ScreenTitle>
            <fieldset className="mt-4">
              <legend className="text-xs font-bold text-navy">Who&apos;s booking?</legend>
              <div className="mt-2 grid grid-cols-3 gap-1.5">
                {bookerTypes.map((b) => {
                  const on = d.tier === b.tier;
                  return (
                    <label
                      key={b.tier}
                      className={cn(
                        "cursor-pointer rounded-xl border-2 bg-white px-2 py-2 text-center has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-navy",
                        on ? "border-navy" : "border-transparent ring-1 ring-navy/10",
                      )}
                    >
                      <input type="radio" name="tier" className="sr-only" checked={on} onChange={() => dispatch({ type: "draft", patch: { tier: b.tier } })} />
                      <span className="block text-xs font-semibold text-navy">{b.label}</span>
                      <span className="block text-[10px] text-muted">{b.hint}</span>
                    </label>
                  );
                })}
              </div>
            </fieldset>
            <fieldset className="mt-4">
              <legend className="text-xs font-bold text-navy">
                When? <span className="font-normal text-muted">(required)</span>
              </legend>
              <div className="mt-2 grid grid-cols-2 gap-1.5">
                {whenOptions.map((w) => {
                  const on = d.when === w;
                  return (
                    <label
                      key={w}
                      className={cn(
                        "cursor-pointer rounded-xl border-2 bg-white px-2 py-2 text-center text-xs font-semibold text-navy has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-navy",
                        on ? "border-navy bg-mint/30" : "border-transparent ring-1 ring-navy/10",
                      )}
                    >
                      <input type="radio" name="when" className="sr-only" checked={on} onChange={() => dispatch({ type: "draft", patch: { when: w } })} />
                      {w}
                    </label>
                  );
                })}
              </div>
            </fieldset>
            <label className="mt-4 block">
              <span className="text-xs font-bold text-navy">Project details</span>
              <textarea
                value={d.notes}
                onChange={(e) => dispatch({ type: "draft", patch: { notes: e.target.value } })}
                rows={3}
                maxLength={280}
                placeholder="e.g. Winter formal at the UMC, 7–10pm, about 80 people"
                className="mt-2 w-full resize-none rounded-xl bg-white p-3 text-xs text-navy ring-1 ring-navy/15 outline-none placeholder:text-muted focus:ring-2 focus:ring-navy"
              />
            </label>
          </>
        )}

        {step === 3 && (
          <>
            <ScreenTitle sub="Check everything before you pay">Review & pay</ScreenTitle>
            <div className="mt-3 flex items-center gap-3 rounded-xl bg-white p-3 ring-1 ring-navy/5">
              <Avatar name={st.name} size="sm" />
              <div className="min-w-0 flex-1">
                <p className="text-[13px] font-semibold text-navy">{svc.title}</p>
                <p className="text-[11px] text-muted">
                  {st.short} · {d.when}
                </p>
              </div>
            </div>
            <dl className="mt-3 space-y-2 rounded-xl bg-white p-3 text-xs text-navy ring-1 ring-navy/5">
              <div className="flex justify-between">
                <dt>Service price</dt>
                <dd className="font-semibold tabular-nums">{usd(svc.price)}</dd>
              </div>
              <div className="flex justify-between text-muted">
                <dt>Includes SkillSwap fee ({Math.round(tier.rate * 100)}%, {tier.short.toLowerCase()})</dt>
                <dd className="tabular-nums">{usd(fee)}</dd>
              </div>
              <div className="flex justify-between text-muted">
                <dt>{st.short.split(" ")[0]} receives</dt>
                <dd className="tabular-nums">{usd(payout)}</dd>
              </div>
              <div className="flex justify-between border-t border-navy/10 pt-2 text-sm font-bold">
                <dt>You pay</dt>
                <dd className="tabular-nums">{usd(svc.price)}</dd>
              </div>
            </dl>
            <div className="mt-3 flex gap-2.5 rounded-xl bg-cream p-3">
              <LockKeyhole className="mt-0.5 h-4 w-4 shrink-0 text-navy" aria-hidden="true" />
              <p className="text-[11px] leading-relaxed text-navy">
                <strong>Payment held until delivery.</strong> SkillSwap holds your money and releases it to {st.short.split(" ")[0]} only after you approve the work.
              </p>
            </div>
          </>
        )}
      </div>

      <div className="px-4 pt-4">
        {missingWhen && <p className="mb-2 text-center text-[11px] font-medium text-navy/70">Pick a time to continue.</p>}
        {step === 1 && <PrimaryButton onClick={() => next(2)}>Continue</PrimaryButton>}
        {step === 2 && (
          <PrimaryButton disabled={!d.when} onClick={() => d.when && next(3)}>
            Review price
          </PrimaryButton>
        )}
        {step === 3 && (
          <PrimaryButton onClick={() => dispatch({ type: "confirmBooking" })} tone="coral">
            <LockKeyhole className="h-4 w-4" aria-hidden="true" /> Pay {usd(svc.price)} · held until delivery
          </PrimaryButton>
        )}
        {step === 3 && <p className="mt-2 text-center text-[10px] text-muted">Demo only. No real payment is made.</p>}
      </div>
    </div>
  );
}

/* ---------- 3b. Confirmation ---------- */

export function ConfirmedScreen({ state, dispatch, bookingId }: P & { bookingId: string }) {
  const b = state.bookings.find((x) => x.id === bookingId)!;
  const svc = serviceById(b.serviceId);
  const st = studentById(svc.studentId);
  const first = st.short.split(" ")[0];
  const steps = [
    { label: "Payment held by SkillSwap", done: true },
    { label: `${first} delivers the work`, done: false },
    { label: "You approve the delivery", done: false },
    { label: `Payment released to ${first}`, done: false },
  ];
  return (
    <div className="px-4 pt-6 pb-6">
      <div className="text-center">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-mint text-navy">
          <LockKeyhole className="h-8 w-8" aria-hidden="true" />
        </span>
        <div className="mt-4">
          <ScreenTitle>Booked! Payment held until delivery</ScreenTitle>
        </div>
        <p className="mt-2 text-xs text-muted">
          {svc.title} with {st.short} · {b.when} · {usd(b.price)}
        </p>
      </div>
      <ol className="mt-6 space-y-3 rounded-2xl bg-white p-4 ring-1 ring-navy/5">
        {steps.map((s, i) => (
          <li key={s.label} className="flex items-center gap-3 text-xs">
            <span
              className={cn(
                "flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] font-bold",
                s.done ? "bg-success text-white" : "bg-page text-navy ring-1 ring-navy/15",
              )}
            >
              {s.done ? <Check className="h-3.5 w-3.5" aria-hidden="true" /> : i + 1}
            </span>
            <span className={cn(s.done ? "font-semibold text-navy" : "text-muted")}>{s.label}</span>
          </li>
        ))}
      </ol>
      <div className="mt-6 space-y-2">
        {st.id === meStudentId ? (
          <PrimaryButton onClick={() => dispatch({ type: "go", screen: { name: "dashboard" }, reset: true })}>
            See it on {first}&apos;s dashboard
          </PrimaryButton>
        ) : (
          <PrimaryButton onClick={() => dispatch({ type: "go", screen: { name: "bookings" }, reset: true })}>View my bookings</PrimaryButton>
        )}
        <button
          type="button"
          onClick={() => dispatch({ type: "go", screen: { name: "explore" }, reset: true })}
          className="h-11 w-full rounded-xl text-sm font-semibold text-navy hover:bg-navy/5"
        >
          Back to explore
        </button>
      </div>
    </div>
  );
}

/* ---------- Bookings (client view) ---------- */

export function BookingsScreen({ state, dispatch }: P) {
  return (
    <div className="px-4 pt-4 pb-6">
      <ScreenTitle sub="Jobs you've booked as a client">My bookings</ScreenTitle>
      {state.bookings.length === 0 ? (
        <div className="mt-4 rounded-2xl bg-white p-5 text-center ring-1 ring-navy/5">
          <p className="text-sm font-semibold text-navy">No bookings yet.</p>
          <p className="mt-1 text-xs text-muted">Open a student&apos;s profile and tap Book.</p>
          <button
            type="button"
            onClick={() => dispatch({ type: "go", screen: { name: "explore" }, reset: true })}
            className="mt-3 rounded-lg bg-coral px-3 py-2 text-xs font-semibold text-navy hover:bg-coral-hover"
          >
            Explore gigs
          </button>
        </div>
      ) : (
        <ul className="mt-3 space-y-2">
          {state.bookings.map((b) => {
            const svc = serviceById(b.serviceId);
            const st = studentById(svc.studentId);
            return (
              <li key={b.id} className="flex items-center gap-3 rounded-xl bg-white p-3 ring-1 ring-navy/5">
                <Avatar name={st.name} size="sm" />
                <div className="min-w-0 flex-1">
                  <p className="text-[13px] font-semibold text-navy">{svc.title}</p>
                  <p className="text-[11px] text-muted">
                    {st.short} · {b.when}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold text-navy">{usd(b.price)}</p>
                  <p className="inline-flex items-center gap-1 rounded-full bg-cream px-1.5 py-0.5 text-[10px] font-semibold text-navy">
                    <LockKeyhole className="h-2.5 w-2.5" aria-hidden="true" /> Held
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

/* ---------- 4. Student dashboard / My Portfolio ---------- */

export function DashboardScreen({ state, dispatch }: P) {
  const me = studentById(meStudentId);
  const earned = state.completed.reduce((a, j) => a + payoutFor(j), 0);
  const pending = state.active.reduce((a, j) => a + payoutFor(j), 0);

  return (
    <div className="px-4 pt-4 pb-6">
      <div className="flex items-center gap-3">
        <Avatar name={me.name} />
        <ScreenTitle sub={`Student view · ${me.short}`}>My Portfolio</ScreenTitle>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2">
        <div className="rounded-2xl bg-navy p-3 text-white">
          <p className="text-[11px] text-white/75">Earned</p>
          <p className="text-xl font-bold tabular-nums" aria-live="polite">
            {usd(earned)}
          </p>
        </div>
        <div className="rounded-2xl bg-white p-3 ring-1 ring-navy/5">
          <p className="text-[11px] text-muted">Held until delivery</p>
          <p className="text-xl font-bold text-navy tabular-nums">{usd(pending)}</p>
        </div>
      </div>

      <h3 className="mt-5 text-sm font-bold text-navy">Active jobs ({state.active.length})</h3>
      {state.active.length === 0 ? (
        <p className="mt-2 rounded-xl bg-white p-3 text-xs text-muted ring-1 ring-navy/5">All caught up. New bookings will show up here.</p>
      ) : (
        <ul className="mt-2 space-y-2">
          {state.active.map((j) => (
            <li key={j.id} className="rounded-xl bg-white p-3 ring-1 ring-navy/5">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-mint/70 text-navy">
                  <Icon name={j.icon} className="h-4 w-4" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-[13px] font-semibold text-navy">{j.title}</p>
                  <p className="text-[11px] text-muted">
                    {j.client}
                    {j.due ? ` · ${j.due}` : ""}
                  </p>
                </div>
                <p className="text-xs font-bold text-navy tabular-nums">{usd(payoutFor(j))}</p>
              </div>
              <button
                type="button"
                onClick={() => dispatch({ type: "complete", jobId: j.id })}
                className="mt-2.5 flex h-9 w-full items-center justify-center gap-1.5 rounded-lg bg-coral text-xs font-semibold text-navy hover:bg-coral-hover"
              >
                <Check className="h-4 w-4" aria-hidden="true" /> Mark complete
              </button>
            </li>
          ))}
        </ul>
      )}

      <h3 className="mt-5 text-sm font-bold text-navy">Completed · in your portfolio ({state.completed.length})</h3>
      <ul className="mt-2 space-y-2">
        {state.completed.map((j, i) => (
          <li
            key={j.id}
            className={cn(
              "flex items-center gap-3 rounded-xl bg-white p-3 ring-1 ring-navy/5",
              i === 0 && state.toast && "animate-[pop_0.5s_ease] ring-2 ring-success",
            )}
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-success/10 text-success">
              <Check className="h-5 w-5" aria-hidden="true" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-[13px] font-semibold text-navy">
                {j.title} Completed <span className="text-success">✓</span>
              </p>
              <p className="text-[11px] text-muted">{j.client}</p>
            </div>
            <p className="text-xs font-semibold text-success tabular-nums">+{usd(payoutFor(j))}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Toast({ state, dispatch }: P) {
  if (!state.toast) return null;
  return (
    <div role="status" className="absolute inset-x-3 top-14 z-20 flex animate-[slidein_0.35s_ease] items-center gap-2 rounded-xl bg-success px-3 py-2.5 text-white shadow-lift">
      <Check className="h-4 w-4 shrink-0" aria-hidden="true" />
      <p className="flex-1 text-xs font-semibold">
        {state.toast} <span className="font-normal text-white/90">Added to your portfolio</span>
      </p>
      <button type="button" onClick={() => dispatch({ type: "dismissToast" })} aria-label="Dismiss" className="rounded p-0.5 hover:bg-white/15">
        <X className="h-4 w-4" aria-hidden="true" />
      </button>
    </div>
  );
}
