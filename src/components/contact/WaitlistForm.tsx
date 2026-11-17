"use client";

import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { site } from "@/config/site";
import { cn } from "@/lib/cn";

const roles = [
  { value: "student", label: "Student", hint: "I want to offer my skills" },
  { value: "club", label: "Club / org", hint: "We need help for events" },
  { value: "business", label: "Business", hint: "We need a project done" },
] as const;
type Role = (typeof roles)[number]["value"];

type Fields = { name: string; email: string; role: Role | ""; message: string };
type Errors = Partial<Record<keyof Fields, string>>;

const STORAGE_KEY = "skillswap-waitlist";
const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(f: Fields): Errors {
  const e: Errors = {};
  if (f.name.trim().length < 2) e.name = "Please enter your name.";
  if (!emailRe.test(f.email.trim())) e.email = "Please enter a valid email address.";
  if (!f.role) e.role = "Please choose who you are.";
  if (f.message.length > 1000) e.message = "Please keep your message under 1,000 characters.";
  return e;
}

/** Reads ?role=student|club|business so buttons elsewhere can preselect "I am a…". Wrap in <Suspense>. */
export function WaitlistFormFromParams() {
  const r = useSearchParams().get("role");
  return <WaitlistForm presetRole={roles.find((x) => x.value === r)?.value ?? ""} />;
}

export function WaitlistForm({ presetRole = "" }: { presetRole?: Role | "" }) {
  const ids = useId();
  const [fields, setFields] = useState<Fields>({ name: "", email: "", role: "", message: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [submittedName, setSubmittedName] = useState("");
  const successRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const role: Role | "" = fields.role || presetRole;

  useEffect(() => {
    if (status === "done") successRef.current?.focus();
  }, [status]);

  const set = <K extends keyof Fields>(k: K, v: Fields[K]) => {
    setFields((f) => ({ ...f, [k]: v }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }));
  };

  async function onSubmit(ev: FormEvent) {
    ev.preventDefault();
    const current = { ...fields, role };
    const e = validate(current);
    setErrors(e);
    if (Object.keys(e).length) {
      const first = (["name", "email", "role", "message"] as const).find((k) => e[k]);
      formRef.current?.querySelector<HTMLElement>(`[data-field="${first}"]`)?.focus();
      return;
    }
    setStatus("sending");
    const payload = { ...current, name: fields.name.trim(), email: fields.email.trim(), submittedAt: new Date().toISOString() };
    try {
      if (site.formspreeId) {
        const res = await fetch(`https://formspree.io/f/${site.formspreeId}`, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error(`Formspree ${res.status}`);
      } else {
        try {
          const prev = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
          localStorage.setItem(STORAGE_KEY, JSON.stringify([...(Array.isArray(prev) ? prev : []), payload]));
        } catch {
          // Storage can be blocked (private mode). The success state still makes sense for a demo.
        }
        await new Promise((r) => setTimeout(r, 500));
      }
      setSubmittedName(payload.name.split(" ")[0]);
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div ref={successRef} tabIndex={-1} role="status" className="rounded-3xl bg-white p-8 text-center shadow-lift ring-1 ring-navy/5 outline-none sm:p-10">
        <CheckCircle2 className="mx-auto h-14 w-14 text-success" aria-hidden="true" />
        <h3 className="mt-4 text-2xl text-navy">You&apos;re on the list, {submittedName}!</h3>
        <p className="mx-auto mt-2 max-w-md text-muted">
          Thanks for your interest in SkillSwap. We&apos;ll email you when the CU Boulder pilot opens
          {role === "student" ? " for student providers." : role === "club" ? " to clubs." : " to local businesses."}
        </p>
        <Button
          variant="outline"
          className="mt-6"
          onClick={() => {
            setFields({ name: "", email: "", role: "", message: "" });
            setStatus("idle");
          }}
        >
          Add another person
        </Button>
      </div>
    );
  }

  const fieldClass = (bad?: string) =>
    cn(
      "mt-2 w-full rounded-xl border-2 bg-white px-4 text-navy outline-none transition-colors placeholder:text-navy/45 focus:border-navy",
      bad ? "border-red-700" : "border-navy/15",
    );

  return (
    <form ref={formRef} noValidate onSubmit={onSubmit} className="rounded-3xl bg-white p-6 shadow-lift ring-1 ring-navy/5 sm:p-8" aria-describedby={`${ids}-req`}>
      <p id={`${ids}-req`} className="text-sm text-muted">
        Fields marked <span aria-hidden="true">*</span>
        <span className="sr-only">required</span> are required.
      </p>

      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor={`${ids}-name`} className="text-sm font-semibold text-navy">
            Name <span aria-hidden="true">*</span>
          </label>
          <input
            id={`${ids}-name`}
            data-field="name"
            autoComplete="name"
            value={fields.name}
            onChange={(e) => set("name", e.target.value)}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? `${ids}-name-err` : undefined}
            aria-required="true"
            className={cn(fieldClass(errors.name), "h-12")}
            placeholder="Your name"
          />
          {errors.name && (
            <p id={`${ids}-name-err`} className="mt-1.5 text-sm font-medium text-red-700">
              {errors.name}
            </p>
          )}
        </div>
        <div>
          <label htmlFor={`${ids}-email`} className="text-sm font-semibold text-navy">
            Email <span aria-hidden="true">*</span>
          </label>
          <input
            id={`${ids}-email`}
            data-field="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            value={fields.email}
            onChange={(e) => set("email", e.target.value)}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? `${ids}-email-err` : undefined}
            aria-required="true"
            className={cn(fieldClass(errors.email), "h-12")}
            placeholder="you@colorado.edu"
          />
          {errors.email && (
            <p id={`${ids}-email-err`} className="mt-1.5 text-sm font-medium text-red-700">
              {errors.email}
            </p>
          )}
        </div>
      </div>

      <fieldset className="mt-5" aria-describedby={errors.role ? `${ids}-role-err` : undefined}>
        <legend className="text-sm font-semibold text-navy">
          I am a… <span aria-hidden="true">*</span>
        </legend>
        <div className="mt-2 grid gap-2.5 sm:grid-cols-3">
          {roles.map((r, i) => {
            const on = role === r.value;
            return (
              <label
                key={r.value}
                className={cn(
                  "cursor-pointer rounded-xl border-2 p-3.5 transition-colors has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-navy",
                  on ? "border-navy bg-mint/30" : errors.role ? "border-red-700/60" : "border-navy/15 hover:border-navy/40",
                )}
              >
                <input
                  type="radio"
                  name={`${ids}-role`}
                  value={r.value}
                  checked={on}
                  onChange={() => set("role", r.value)}
                  className="sr-only"
                  data-field={i === 0 ? "role" : undefined}
                />
                <span className="block font-semibold text-navy">{r.label}</span>
                <span className="block text-sm text-muted">{r.hint}</span>
              </label>
            );
          })}
        </div>
        {errors.role && (
          <p id={`${ids}-role-err`} className="mt-1.5 text-sm font-medium text-red-700">
            {errors.role}
          </p>
        )}
      </fieldset>

      <div className="mt-5">
        <label htmlFor={`${ids}-msg`} className="text-sm font-semibold text-navy">
          Message <span className="font-normal text-muted">(optional)</span>
        </label>
        <textarea
          id={`${ids}-msg`}
          data-field="message"
          rows={4}
          value={fields.message}
          onChange={(e) => set("message", e.target.value)}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? `${ids}-msg-err` : undefined}
          className={cn(fieldClass(errors.message), "resize-y py-3")}
          placeholder="What skills do you offer, or what do you need help with?"
        />
        {errors.message && (
          <p id={`${ids}-msg-err`} className="mt-1.5 text-sm font-medium text-red-700">
            {errors.message}
          </p>
        )}
      </div>

      {status === "error" && (
        <p role="alert" className="mt-5 rounded-xl bg-red-50 p-3 text-sm font-medium text-red-800">
          Something went wrong sending your message. Please try again in a moment.
        </p>
      )}

      <Button type="submit" size="lg" className="mt-6 w-full sm:w-auto" disabled={status === "sending"}>
        {status === "sending" && <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />}
        {status === "sending" ? "Joining…" : "Join the Waitlist"}
      </Button>
      <p className="mt-3 text-xs text-muted">We&apos;ll only use your email to contact you about SkillSwap.</p>
    </form>
  );
}
