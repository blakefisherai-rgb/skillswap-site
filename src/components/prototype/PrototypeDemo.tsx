"use client";

import { useEffect, useReducer, useRef } from "react";
import { Compass, LayoutGrid, Receipt, RotateCcw, UserRound } from "lucide-react";
import { PhoneFrame } from "@/components/app/PhoneFrame";
import { cn } from "@/lib/cn";
import {
  BookScreen,
  BookingsScreen,
  ConfirmedScreen,
  DashboardScreen,
  ExploreScreen,
  ProfileFooter,
  ProfileScreen,
  Toast,
  TopBar,
} from "./screens";
import { initialState, reducer, serviceById, studentById, type Screen, type State } from "./state";

const tour = [
  { title: "Browse & search gigs", body: "Search, or filter by category.", icon: Compass },
  { title: "Open a student profile", body: "Verified badge, portfolio, reviews, rates.", icon: UserRound },
  { title: "Book with payment held", body: "Pick a service, add details, see the fee breakdown.", icon: Receipt },
  { title: "Student dashboard", body: "Mark a job complete and watch the portfolio update.", icon: LayoutGrid },
] as const;

function tourIndex(s: Screen) {
  switch (s.name) {
    case "explore":
      return 0;
    case "profile":
      return 1;
    case "book":
    case "confirmed":
    case "bookings":
      return 2;
    case "dashboard":
      return 3;
  }
}

function screenKey(s: Screen) {
  return JSON.stringify(s);
}

function titleFor(state: State) {
  const s = state.screen;
  if (s.name === "profile") return studentById(s.studentId).short;
  if (s.name === "book") return `Book ${studentById(serviceById(state.draft!.serviceId).studentId).short}`;
  if (s.name === "confirmed") return "Confirmed";
  return undefined;
}

export function PrototypeDemo() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const scrollRef = useRef<HTMLDivElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);
  const firstRender = useRef(true);
  const key = screenKey(state.screen);

  // On each screen change: scroll the phone to the top and move focus to the new screen's title.
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTop = 0;
    el.querySelector<HTMLElement>("[data-screen-title]")?.focus({ preventScroll: true });
  }, [key]);

  useEffect(() => {
    if (!state.toast) return;
    const t = setTimeout(() => dispatch({ type: "dismissToast" }), 3500);
    return () => clearTimeout(t);
  }, [state.toast]);

  const s = state.screen;
  const current = tourIndex(s);
  const inFlow = s.name === "book" || s.name === "confirmed";

  const jump = (i: number) => {
    dispatch({ type: "go", screen: { name: "explore" }, reset: true });
    if (i === 1) dispatch({ type: "go", screen: { name: "profile", studentId: "maya" } });
    if (i === 2) {
      dispatch({ type: "go", screen: { name: "profile", studentId: "maya" } });
      dispatch({ type: "startBooking", serviceId: "s1" });
    }
    if (i === 3) dispatch({ type: "go", screen: { name: "dashboard" }, reset: true });
    // On stacked (mobile) layouts the phone sits above the tour; bring it back into view.
    const phone = phoneRef.current;
    if (phone && phone.getBoundingClientRect().bottom < 80) {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      phone.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    }
  };

  const tabs = [
    { label: "Explore", icon: Compass, screen: { name: "explore" } as Screen, on: s.name === "explore" || s.name === "profile" },
    { label: "Bookings", icon: Receipt, screen: { name: "bookings" } as Screen, on: s.name === "bookings", badge: state.bookings.length },
    { label: "Portfolio", icon: LayoutGrid, screen: { name: "dashboard" } as Screen, on: s.name === "dashboard" },
  ];

  return (
    <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,26rem)_auto] lg:justify-center lg:gap-16">
      {/* Guided tour */}
      <div className="lg:sticky lg:top-24 lg:order-none">
        <p className="text-sm font-semibold text-navy">Guided tour: tap a step, or explore freely in the phone.</p>
        <ol className="mt-4 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-1">
          {tour.map((t, i) => {
            const on = current === i;
            const IconCmp = t.icon;
            return (
              <li key={t.title}>
                <button
                  type="button"
                  onClick={() => jump(i)}
                  aria-current={on ? "step" : undefined}
                  className={cn(
                    "flex w-full items-start gap-3 rounded-2xl p-4 text-left ring-1 transition-all",
                    on ? "bg-navy text-white shadow-lift ring-navy" : "bg-white text-navy ring-navy/10 hover:ring-navy/30",
                  )}
                >
                  <span
                    className={cn(
                      "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-sm font-bold",
                      on ? "bg-coral text-navy" : ["bg-mint", "bg-cream", "bg-coral-soft", "bg-peach"][i],
                    )}
                  >
                    <IconCmp className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block text-xs font-semibold opacity-80">Step {i + 1}</span>
                    <span className="block font-semibold">{t.title}</span>
                    <span className={cn("mt-0.5 block text-sm", on ? "text-white/80" : "text-muted")}>{t.body}</span>
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
        <button
          type="button"
          onClick={() => dispatch({ type: "reset" })}
          className="mt-4 inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold text-navy hover:bg-navy/5"
        >
          <RotateCcw className="h-4 w-4" aria-hidden="true" /> Reset demo
        </button>
        <p className="mt-2 max-w-sm text-sm text-muted">
          All people, listings, reviews, and prices in this demo are sample data. No real payments are made.
        </p>
      </div>

      {/* Phone */}
      <div ref={phoneRef} className="order-first scroll-mt-20 lg:order-none">
        <PhoneFrame label="SkillSwap app prototype (interactive)">
          <div className="absolute inset-0 flex flex-col">
            <TopBar state={state} dispatch={dispatch} title={titleFor(state)} />
            <Toast state={state} dispatch={dispatch} />
            <div ref={scrollRef} className="relative min-h-0 flex-1 overflow-y-auto overscroll-contain">
              {s.name === "explore" && <ExploreScreen state={state} dispatch={dispatch} />}
              {s.name === "profile" && <ProfileScreen dispatch={dispatch} studentId={s.studentId} />}
              {s.name === "book" && state.draft && <BookScreen state={state} dispatch={dispatch} step={s.step} />}
              {s.name === "confirmed" && <ConfirmedScreen state={state} dispatch={dispatch} bookingId={s.bookingId} />}
              {s.name === "bookings" && <BookingsScreen state={state} dispatch={dispatch} />}
              {s.name === "dashboard" && <DashboardScreen state={state} dispatch={dispatch} />}
            </div>
            {s.name === "profile" && <ProfileFooter dispatch={dispatch} studentId={s.studentId} />}
            {!inFlow && s.name !== "profile" && (
              <nav aria-label="App tabs" className="flex shrink-0 justify-around border-t border-navy/10 bg-white pt-1.5 pb-2">
                {tabs.map((t) => {
                  const IconCmp = t.icon;
                  return (
                    <button
                      key={t.label}
                      type="button"
                      aria-current={t.on ? "page" : undefined}
                      onClick={() => dispatch({ type: "go", screen: t.screen, reset: true })}
                      className={cn(
                        "relative flex w-20 flex-col items-center gap-0.5 rounded-lg py-1 text-[10px] font-semibold",
                        t.on ? "text-navy" : "text-navy/50 hover:text-navy",
                      )}
                    >
                      <IconCmp className="h-5 w-5" aria-hidden="true" />
                      {t.label}
                      {!!t.badge && (
                        <span className="absolute top-0 right-4 flex h-4 min-w-4 items-center justify-center rounded-full bg-coral-hover px-1 text-[9px] text-navy">
                          {t.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </nav>
            )}
          </div>
        </PhoneFrame>
      </div>
    </div>
  );
}
