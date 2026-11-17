"use client";

import { useId, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { competitorName, competitorRate, feeTiers, splitPrice, usd, type FeeTierId } from "@/data/pricing";
import { cn } from "@/lib/cn";

const MAX = 10000;

export function FeeCalculator() {
  const [tierId, setTierId] = useState<FeeTierId>("club");
  const [raw, setRaw] = useState("250");
  const ids = useId();
  const tier = feeTiers.find((t) => t.id === tierId)!;

  const price = Number(raw);
  const error =
    raw.trim() === ""
      ? "Enter a job price."
      : !Number.isFinite(price) || price <= 0
        ? "Enter a price greater than $0."
        : price > MAX
          ? `Try a price up to ${usd(MAX)}.`
          : null;

  const { fee, payout } = error ? { fee: 0, payout: 0 } : splitPrice(price, tier.rate);
  const competitorPayout = error ? 0 : splitPrice(price, competitorRate).payout;
  const keepPct = Math.round((1 - tier.rate) * 100);

  return (
    <div className="grid overflow-hidden rounded-3xl bg-white shadow-lift ring-1 ring-navy/5 lg:grid-cols-[1.1fr_1fr]">
      <div className="p-6 sm:p-8">
        <fieldset>
          <legend className="text-sm font-semibold text-navy">1. Pick a job type</legend>
          <div className="mt-3 grid gap-2.5">
            {feeTiers.map((t) => {
              const checked = t.id === tierId;
              return (
                <label
                  key={t.id}
                  className={cn(
                    "flex cursor-pointer items-center gap-3 rounded-2xl border-2 p-3.5 transition-colors has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-navy",
                    checked ? "border-navy bg-mint/30" : "border-navy/10 hover:border-navy/30",
                  )}
                >
                  <input
                    type="radio"
                    name={`${ids}-tier`}
                    value={t.id}
                    checked={checked}
                    onChange={() => {
                      setTierId(t.id);
                      setRaw(String(t.example.price));
                    }}
                    className="sr-only"
                  />
                  <span className={cn("flex h-10 w-10 shrink-0 items-center justify-center rounded-xl", checked ? "bg-navy text-white" : "bg-page text-navy")}>
                    <Icon name={t.icon} className="h-5 w-5" />
                  </span>
                  <span className="flex-1">
                    <span className="block font-semibold text-navy">{t.label}</span>
                    <span className="block text-sm text-muted">
                      e.g. {t.example.job}, {usd(t.example.price)}
                    </span>
                  </span>
                  <span className="rounded-full bg-cream px-2.5 py-1 text-sm font-bold text-navy">{Math.round(t.rate * 100)}%</span>
                </label>
              );
            })}
          </div>
        </fieldset>

        <div className="mt-6">
          <label htmlFor={`${ids}-price`} className="text-sm font-semibold text-navy">
            2. Enter the job price
          </label>
          <div
            className={cn(
              "mt-3 flex items-center rounded-2xl border-2 bg-white px-4 focus-within:border-navy",
              error ? "border-red-700" : "border-navy/15",
            )}
          >
            <span className="text-xl font-semibold text-navy/60" aria-hidden="true">
              $
            </span>
            <input
              id={`${ids}-price`}
              inputMode="decimal"
              type="number"
              min={1}
              max={MAX}
              step="any"
              value={raw}
              onChange={(e) => setRaw(e.target.value)}
              aria-invalid={!!error}
              aria-describedby={error ? `${ids}-err` : undefined}
              className="h-14 w-full bg-transparent px-2 text-xl font-semibold text-navy outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
            />
          </div>
          {error && (
            <p id={`${ids}-err`} className="mt-2 text-sm font-medium text-red-700">
              {error}
            </p>
          )}
          <div className="mt-3 flex flex-wrap gap-2" aria-label="Quick prices">
            {[40, 75, 150, 250, 400].map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setRaw(String(p))}
                className={cn(
                  "rounded-full px-3 py-1.5 text-sm font-semibold ring-1 transition-colors",
                  price === p ? "bg-navy text-white ring-navy" : "bg-page text-navy ring-navy/10 hover:ring-navy/30",
                )}
              >
                {usd(p)}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-brand-gradient flex flex-col p-6 sm:p-8" aria-live="polite">
        <p className="text-sm font-semibold text-navy">The student receives</p>
        <p className="mt-1 text-5xl font-bold tracking-tight text-navy tabular-nums sm:text-6xl">{error ? "—" : usd(payout)}</p>
        <p className="mt-1 text-sm text-navy/80">
          {keepPct}% of the job price on a {tier.short.toLowerCase()}
        </p>

        <div className="mt-6 h-4 w-full overflow-hidden rounded-full bg-white/70" aria-hidden="true">
          <div className="flex h-full">
            <div className="h-full bg-navy transition-[width] duration-500" style={{ width: `${keepPct}%` }} />
            <div className="h-full flex-1 bg-coral-hover" />
          </div>
        </div>

        <dl className="mt-6 space-y-3 rounded-2xl bg-white/80 p-4 text-navy">
          <div className="flex justify-between gap-4">
            <dt>Client pays</dt>
            <dd className="font-semibold tabular-nums">{error ? "—" : usd(price)}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-coral-hover" aria-hidden="true" />
              SkillSwap fee ({Math.round(tier.rate * 100)}%)
            </dt>
            <dd className="font-semibold tabular-nums">{error ? "—" : `− ${usd(fee)}`}</dd>
          </div>
          <div className="flex justify-between gap-4 border-t border-navy/10 pt-3">
            <dt className="flex items-center gap-2 font-semibold">
              <span className="h-2.5 w-2.5 rounded-full bg-navy" aria-hidden="true" />
              Student payout
            </dt>
            <dd className="font-bold tabular-nums">{error ? "—" : usd(payout)}</dd>
          </div>
        </dl>

        {!error && (
          <p className="mt-4 text-sm text-navy/85">
            On a platform that keeps {Math.round(competitorRate * 100)}% (like {competitorName}), the same job pays{" "}
            <strong className="font-semibold">{usd(competitorPayout)}</strong>. SkillSwap puts{" "}
            <strong className="font-semibold">{usd(Math.round((payout - competitorPayout) * 100) / 100)}</strong> more in the student&apos;s pocket.
          </p>
        )}
      </div>
    </div>
  );
}
