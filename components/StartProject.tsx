"use client";

import { useCallback, useEffect, useId, useMemo, useRef, useState, useSyncExternalStore, type ReactNode } from "react";
import { team } from "@/lib/team";
import { addOns, complexity, estimate, formatMoney, pricing, projectTypes, timelines, type EstimateInput } from "@/lib/pricing";
import { budgets, modes, services, timelineOptions, validateConsultation, validateInquiry, windows, type Errors } from "@/lib/validation";
import { ArrowRight, SectionHeader, btnGhost, btnPrimary } from "./ui";
import { useTabKeys } from "./useTabKeys";
import { track } from "@/lib/analytics";

/** A value that only exists in the browser (time zone, today's date) without hydration mismatches. */
const useClientValue = (read: () => string) => useSyncExternalStore(() => () => {}, read, () => "");
const tomorrow = () => {
  const t = new Date();
  t.setDate(t.getDate() + 1);
  return `${t.getFullYear()}-${String(t.getMonth() + 1).padStart(2, "0")}-${String(t.getDate()).padStart(2, "0")}`;
};
const zone = () => {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone || "";
  } catch {
    return "";
  }
};

type Status = "idle" | "sending" | "sent" | "error";
const tabs = [
  { id: "inquiry", label: "Project inquiry", hash: "#start" },
  { id: "estimator", label: "Cost estimator", hash: "#estimator" },
  { id: "consultation", label: "Book a consultation", hash: "#consultation" },
] as const;

const input = "w-full rounded-[8px] border border-line-2 bg-bg px-3.5 py-2.5 text-[15px] text-ink placeholder:text-ink-4 transition-colors focus:border-accent focus:outline-none aria-[invalid=true]:border-accent-2";

function Field({ label, error, hint, children, id }: { label: string; error?: string; hint?: string; children: (p: { id: string; "aria-invalid": boolean; "aria-describedby"?: string }) => ReactNode; id: string }) {
  const msg = error ? `${id}-err` : hint ? `${id}-hint` : undefined;
  return (
    <div className="min-w-0">
      <label htmlFor={id} className="mb-1.5 block text-[13px] font-medium text-ink-2">{label}</label>
      {children({ id, "aria-invalid": !!error, "aria-describedby": msg })}
      {error ? (
        <p id={`${id}-err`} className="mt-1.5 text-[12.5px] text-[#ff8a70]">{error}</p>
      ) : hint ? (
        <p id={`${id}-hint`} className="mt-1.5 text-[12px] text-ink-3">{hint}</p>
      ) : null}
    </div>
  );
}

async function post(body: unknown): Promise<{ ok: boolean; message?: string; errors?: Errors }> {
  try {
    const r = await fetch("/api/inquiry", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
    const j = await r.json().catch(() => ({}));
    return r.ok && j.ok ? { ok: true } : { ok: false, message: j.message ?? "Something went wrong. Please try again.", errors: j.errors };
  } catch {
    return { ok: false, message: "Network error. Please check your connection and try again." };
  }
}

function Result({ status, message, onReset, sentText }: { status: Status; message: string; onReset: () => void; sentText: string }) {
  if (status === "sent") {
    return (
      <div role="status" className="rounded-[var(--radius)] border border-accent/40 bg-accent/5 p-6 md:p-8">
        <div className="mono mb-2 text-[11px] uppercase tracking-[0.08em] text-accent">Received</div>
        <p className="mb-5 max-w-[520px] text-[16px] leading-[1.55] text-ink">{sentText}</p>
        <button type="button" onClick={onReset} className={`${btnGhost} h-10 px-4 text-[13px]`}>Send another</button>
      </div>
    );
  }
  if (status === "error") {
    return (
      <div role="alert" className="rounded-[8px] border border-accent-2/50 bg-accent-2/10 px-4 py-3 text-[14px] leading-[1.5] text-ink">
        {message}
      </div>
    );
  }
  return null;
}

const Consent = ({ id, checked, onChange, error }: { id: string; checked: boolean; onChange: (v: boolean) => void; error?: string }) => (
  <div>
    <label htmlFor={id} className="flex cursor-pointer items-start gap-3 text-[13px] leading-[1.5] text-ink-2">
      <input id={id} type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} aria-invalid={!!error} className="mt-[3px] h-4 w-4 shrink-0 accent-[#d4ff3a]" />
      <span>I agree to be contacted about this request. I have not included passwords, API keys or other secrets.</span>
    </label>
    {error && <p className="mt-1.5 text-[12.5px] text-[#ff8a70]">{error}</p>}
  </div>
);

/* ---------------------------------- Inquiry ---------------------------------- */
function InquiryForm({ prefill }: { prefill: { message: string; service: string } }) {
  const uid = useId();
  const [v, setV] = useState({ name: "", email: "", phone: "", company: "", service: prefill.service, budget: "", timeline: "", message: prefill.message, consent: false, website: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [msg, setMsg] = useState("");
  const set = (k: keyof typeof v, val: string | boolean) => {
    setV((s) => ({ ...s, [k]: val }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: "" }));
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validateInquiry({ ...v });
    setErrors(errs);
    if (Object.keys(errs).length) {
      document.getElementById(`${uid}-${Object.keys(errs)[0]}`)?.focus();
      return;
    }
    setStatus("sending");
    const r = await post({ type: "inquiry", ...v });
    if (r.ok) {
      setStatus("sent");
      track("generate_lead", { form: "inquiry", service: v.service });
    }
    else {
      setStatus("error");
      setMsg(r.message ?? "");
      if (r.errors) setErrors(r.errors);
    }
  };
  const reset = () => {
    setV({ name: "", email: "", phone: "", company: "", service: "", budget: "", timeline: "", message: "", consent: false, website: "" });
    setErrors({});
    setStatus("idle");
  };

  if (status === "sent") return <Result status="sent" message="" onReset={reset} sentText="Thank you. Your inquiry has been sent and a team member will get back to you." />;
  const f = (k: string) => `${uid}-${k}`;

  return (
    <form onSubmit={submit} noValidate className="grid gap-5" aria-label="Project inquiry">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id={f("name")} label="Your name" error={errors.name}>{(p) => <input {...p} className={input} autoComplete="name" value={v.name} onChange={(e) => set("name", e.target.value)} maxLength={100} />}</Field>
        <Field id={f("email")} label="Email" error={errors.email}>{(p) => <input {...p} className={input} type="email" autoComplete="email" inputMode="email" value={v.email} onChange={(e) => set("email", e.target.value)} maxLength={200} />}</Field>
        <Field id={f("phone")} label="Phone (optional)" error={errors.phone}>{(p) => <input {...p} className={input} type="tel" autoComplete="tel" inputMode="tel" value={v.phone} onChange={(e) => set("phone", e.target.value)} maxLength={30} />}</Field>
        <Field id={f("company")} label="Company (optional)">{(p) => <input {...p} className={input} autoComplete="organization" value={v.company} onChange={(e) => set("company", e.target.value)} maxLength={120} />}</Field>
        <Field id={f("service")} label="What do you need?" error={errors.service}>
          {(p) => (
            <select {...p} className={input} value={v.service} onChange={(e) => set("service", e.target.value)}>
              <option value="">Choose a service</option>
              {services.map((s) => <option key={s}>{s}</option>)}
            </select>
          )}
        </Field>
        <Field id={f("budget")} label="Budget range" error={errors.budget}>
          {(p) => (
            <select {...p} className={input} value={v.budget} onChange={(e) => set("budget", e.target.value)}>
              <option value="">Choose a range</option>
              {budgets.map((s) => <option key={s}>{s}</option>)}
            </select>
          )}
        </Field>
      </div>
      <Field id={f("timeline")} label="Timeline" error={errors.timeline}>
        {(p) => (
          <select {...p} className={input} value={v.timeline} onChange={(e) => set("timeline", e.target.value)}>
            <option value="">Choose a timeline</option>
            {timelineOptions.map((s) => <option key={s}>{s}</option>)}
          </select>
        )}
      </Field>
      <Field id={f("message")} label="Tell us about your project" error={errors.message} hint={`${v.message.length}/3000. What are you trying to build or fix?`}>
        {(p) => <textarea {...p} className={`${input} min-h-[140px] resize-y`} value={v.message} onChange={(e) => set("message", e.target.value)} maxLength={3000} />}
      </Field>
      {/* Honeypot: hidden from people, tempting to bots */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>Website<input tabIndex={-1} autoComplete="off" value={v.website} onChange={(e) => set("website", e.target.value)} /></label>
      </div>
      <Consent id={f("consent")} checked={v.consent} onChange={(c) => set("consent", c)} error={errors.consent} />
      <Result status={status} message={msg} onReset={reset} sentText="" />
      <div>
        <button type="submit" disabled={status === "sending"} className={`${btnPrimary} h-12 px-7 text-[15px] disabled:opacity-60`}>
          {status === "sending" ? "Sending…" : "Send inquiry"} <ArrowRight />
        </button>
      </div>
    </form>
  );
}

const Group = ({ legend, children }: { legend: string; children: ReactNode }) => (
  <fieldset className="min-w-0">
    <legend className="mono mb-3 text-[10px] uppercase tracking-[0.08em] text-ink-3">{legend}</legend>
    {children}
  </fieldset>
);
const choice = (on: boolean) => `flex cursor-pointer flex-col gap-0.5 rounded-[10px] border p-3.5 transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-accent ${on ? "border-accent bg-accent/10" : "border-line-2 hover:border-line-3"}`;

/* --------------------------------- Estimator --------------------------------- */
function Estimator({ onUse }: { onUse: (message: string, service: string) => void }) {
  const [s, setS] = useState<EstimateInput>({ type: "web", complexity: "standard", addOns: [], timeline: "standard" });
  const est = useMemo(() => estimate(s), [s]);
  const type = projectTypes.find((t) => t.id === s.type)!;
  const toggle = (id: string) => setS((x) => ({ ...x, addOns: x.addOns.includes(id) ? x.addOns.filter((a) => a !== id) : [...x.addOns, id] }));


  const message = est
    ? `Estimator selection:\n- Project type: ${type.label}\n- Complexity: ${complexity.find((c) => c.id === s.complexity)?.label}\n- Add-ons: ${s.addOns.length ? addOns.filter((a) => s.addOns.includes(a.id)).map((a) => a.label).join(", ") : "none"}\n- Timeline: ${timelines.find((t) => t.id === s.timeline)?.label}\n- Indicative range shown: ${formatMoney(est.low)} to ${formatMoney(est.high)} over about ${est.weeksLow} to ${est.weeksHigh} weeks\n\nAdditional details: `
    : "";
  const serviceFor: Record<string, string> = { web: "Web Development", ai: "AI & Automation", cloud: "Cloud Engineering", iam: "Identity & Access Management", m365: "Microsoft 365 Solutions", devops: "DevOps & Infrastructure" };

  return (
    <div className="grid gap-8 lg:[grid-template-columns:minmax(0,1fr)_340px] lg:gap-10">
      <div className="grid min-w-0 gap-7">
        <Group legend="1 · Project type">
          <div className="grid gap-2.5 sm:grid-cols-2">
            {projectTypes.map((t) => (
              <label key={t.id} className={choice(s.type === t.id)}>
                <input type="radio" name="est-type" className="sr-only" checked={s.type === t.id} onChange={() => setS((x) => ({ ...x, type: t.id }))} />
                <span className="text-[14px] font-medium">{t.label}</span>
                <span className="text-[12px] text-ink-3">{t.hint}</span>
              </label>
            ))}
          </div>
        </Group>
        <Group legend="2 · Complexity">
          <div className="grid gap-2.5 sm:grid-cols-3">
            {complexity.map((c) => (
              <label key={c.id} className={choice(s.complexity === c.id)}>
                <input type="radio" name="est-cx" className="sr-only" checked={s.complexity === c.id} onChange={() => setS((x) => ({ ...x, complexity: c.id }))} />
                <span className="text-[14px] font-medium">{c.label}</span>
                <span className="text-[12px] text-ink-3">{c.hint}</span>
              </label>
            ))}
          </div>
        </Group>
        <Group legend="3 · Add-ons (optional)">
          <div className="grid gap-2.5 sm:grid-cols-2">
            {addOns.map((a) => (
              <label key={a.id} className={choice(s.addOns.includes(a.id))}>
                <input type="checkbox" className="sr-only" checked={s.addOns.includes(a.id)} onChange={() => toggle(a.id)} />
                <span className="text-[14px] font-medium">{a.label}</span>
                <span className="text-[12px] text-ink-3">{a.hint}</span>
              </label>
            ))}
          </div>
        </Group>
        <Group legend="4 · Timeline">
          <div className="grid gap-2.5 sm:grid-cols-3">
            {timelines.map((t) => (
              <label key={t.id} className={choice(s.timeline === t.id)}>
                <input type="radio" name="est-tl" className="sr-only" checked={s.timeline === t.id} onChange={() => setS((x) => ({ ...x, timeline: t.id }))} />
                <span className="text-[14px] font-medium">{t.label}</span>
                <span className="text-[12px] text-ink-3">{t.hint}</span>
              </label>
            ))}
          </div>
        </Group>
      </div>

      <aside className="h-fit rounded-[var(--radius)] border border-line-2 bg-bg-2 p-6 lg:sticky lg:top-24" aria-live="polite" aria-label="Estimate result">
        <div className="mono mb-3 text-[10px] uppercase tracking-[0.08em] text-ink-3">Indicative estimate</div>
        {est && (
          <>
            <div className="text-[clamp(26px,2.4vw,34px)] font-medium leading-[1.1] tracking-[-0.03em] text-accent">
              {formatMoney(est.low)} <span className="text-ink-3">to</span> {formatMoney(est.high)}
            </div>
            <div className="mt-2 text-[14px] text-ink-2">About {est.weeksLow} to {est.weeksHigh} weeks · {pricing.currency}</div>
          </>
        )}
        <p className="mt-4 text-[12.5px] leading-[1.55] text-ink-3">An indicative range only, not a quote. The final scope and price are agreed after a short discovery conversation.</p>
        <button type="button" onClick={() => onUse(message, serviceFor[s.type])} className={`${btnPrimary} mt-5 h-11 w-full justify-center px-5 text-[14px]`}>
          Send this as an inquiry <ArrowRight />
        </button>
      </aside>
    </div>
  );
}

/* -------------------------------- Consultation ------------------------------- */
function ConsultationForm() {
  const uid = useId();
  const [v, setV] = useState({ name: "", email: "", phone: "", topic: "", date: "", window: "", timezone: "", mode: "Video call", notes: "", consent: false, website: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [msg, setMsg] = useState("");
  const minDate = useClientValue(tomorrow);
  const detectedZone = useClientValue(zone);
  const set = (k: keyof typeof v, val: string | boolean) => {
    setV((s) => ({ ...s, [k]: val }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: "" }));
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validateConsultation({ ...v, timezone: v.timezone || detectedZone });
    setErrors(errs);
    if (Object.keys(errs).length) {
      document.getElementById(`${uid}-${Object.keys(errs)[0]}`)?.focus();
      return;
    }
    setStatus("sending");
    const r = await post({ type: "consultation", ...v, timezone: v.timezone || detectedZone });
    if (r.ok) {
      setStatus("sent");
      track("generate_lead", { form: "consultation", topic: v.topic });
    }
    else {
      setStatus("error");
      setMsg(r.message ?? "");
      if (r.errors) setErrors(r.errors);
    }
  };
  const reset = () => {
    setV((s) => ({ ...s, name: "", email: "", phone: "", topic: "", date: "", window: "", notes: "", consent: false }));
    setErrors({});
    setStatus("idle");
  };
  if (status === "sent") return <Result status="sent" message="" onReset={reset} sentText="Thank you. Your consultation request has been sent. A team member will confirm a time with you." />;
  const f = (k: string) => `${uid}-${k}`;

  return (
    <form onSubmit={submit} noValidate className="grid gap-5" aria-label="Book a consultation">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id={f("name")} label="Your name" error={errors.name}>{(p) => <input {...p} className={input} autoComplete="name" value={v.name} onChange={(e) => set("name", e.target.value)} maxLength={100} />}</Field>
        <Field id={f("email")} label="Email" error={errors.email}>{(p) => <input {...p} className={input} type="email" autoComplete="email" inputMode="email" value={v.email} onChange={(e) => set("email", e.target.value)} maxLength={200} />}</Field>
        <Field id={f("phone")} label="Phone (optional)" error={errors.phone}>{(p) => <input {...p} className={input} type="tel" autoComplete="tel" inputMode="tel" value={v.phone} onChange={(e) => set("phone", e.target.value)} maxLength={30} />}</Field>
        <Field id={f("topic")} label="Topic" error={errors.topic}>
          {(p) => (
            <select {...p} className={input} value={v.topic} onChange={(e) => set("topic", e.target.value)}>
              <option value="">Choose a topic</option>
              {services.map((s) => <option key={s}>{s}</option>)}
            </select>
          )}
        </Field>
        <Field id={f("date")} label="Preferred date" error={errors.date}>{(p) => <input {...p} className={input} type="date" min={minDate} value={v.date} onChange={(e) => set("date", e.target.value)} />}</Field>
        <Field id={f("window")} label="Preferred time" error={errors.window}>
          {(p) => (
            <select {...p} className={input} value={v.window} onChange={(e) => set("window", e.target.value)}>
              <option value="">Choose a window</option>
              {windows.map((s) => <option key={s}>{s}</option>)}
            </select>
          )}
        </Field>
        <Field id={f("timezone")} label="Your time zone" error={errors.timezone} hint="Detected from your device. Change it if needed.">{(p) => <input {...p} className={input} value={v.timezone || detectedZone} onChange={(e) => set("timezone", e.target.value)} maxLength={60} />}</Field>
        <Field id={f("mode")} label="How should we meet?" error={errors.mode}>
          {(p) => (
            <select {...p} className={input} value={v.mode} onChange={(e) => set("mode", e.target.value)}>
              {modes.map((s) => <option key={s}>{s}</option>)}
            </select>
          )}
        </Field>
      </div>
      <Field id={f("notes")} label="Anything we should prepare? (optional)">{(p) => <textarea {...p} className={`${input} min-h-[100px] resize-y`} value={v.notes} onChange={(e) => set("notes", e.target.value)} maxLength={2000} />}</Field>
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>Website<input tabIndex={-1} autoComplete="off" value={v.website} onChange={(e) => set("website", e.target.value)} /></label>
      </div>
      <Consent id={f("consent")} checked={v.consent} onChange={(c) => set("consent", c)} error={errors.consent} />
      <Result status={status} message={msg} onReset={reset} sentText="" />
      <div>
        <button type="submit" disabled={status === "sending"} className={`${btnPrimary} h-12 px-7 text-[15px] disabled:opacity-60`}>
          {status === "sending" ? "Sending…" : "Request consultation"} <ArrowRight />
        </button>
      </div>
    </form>
  );
}

/* ----------------------------------- Section ---------------------------------- */
export function StartProject() {
  const [tab, setTab] = useState(0);
  const [prefill, setPrefill] = useState({ message: "", service: "", n: 0 });
  const panel = useRef<HTMLDivElement>(null);

  const select = useCallback((i: number, updateHash = true) => {
    setTab(i);
    track("start_tab", { tab: tabs[i].id });
    if (updateHash) history.replaceState(null, "", tabs[i].hash);
  }, []);

  useEffect(() => {
    const sync = () => {
      const i = tabs.findIndex((t) => t.hash === window.location.hash);
      if (i >= 0) setTab(i);
    };
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  const onKeys = useTabKeys(tabs.length, tab, (i) => select(i), "horizontal");

  return (
    <section id="start" className="relative py-[var(--pad-section)]">
      <div className="container">
        <SectionHeader
          index="07"
          label="Start a project"
          kicker="Work with us"
          title="Tell us what you need."
          text="Send an inquiry, get an indicative estimate, or book a consultation. Every form is checked before it is sent, and we never ask for passwords or keys."
        />
        <span id="estimator" aria-hidden="true" className="block h-0 scroll-mt-24" />
        <span id="consultation" aria-hidden="true" className="block h-0 scroll-mt-24" />
        <div className="overflow-hidden rounded-[var(--radius)] border border-line bg-bg-2">
          <div role="tablist" aria-label="Ways to get started" onKeyDown={onKeys} className="flex overflow-x-auto border-b border-line">
            {tabs.map((t, i) => (
              <button
                key={t.id}
                role="tab"
                id={`start-tab-${t.id}`}
                aria-selected={tab === i}
                aria-controls="start-panel"
                tabIndex={tab === i ? 0 : -1}
                onClick={() => select(i)}
                className={`relative shrink-0 px-5 py-4 text-[14px] font-medium transition-colors md:px-7 ${tab === i ? "text-ink" : "text-ink-3 hover:text-ink-2"}`}
              >
                {t.label}
                {tab === i && <span className="absolute inset-x-0 bottom-0 h-[2px] bg-accent" />}
              </button>
            ))}
          </div>
          <div ref={panel} id="start-panel" role="tabpanel" aria-labelledby={`start-tab-${tabs[tab].id}`} className="p-5 md:p-8">
            {tab === 0 && <InquiryForm key={prefill.n} prefill={prefill} />}
            {tab === 1 && (
              <Estimator
                onUse={(message, service) => {
                  track("estimate_to_inquiry", { service });
                  setPrefill((p) => ({ message, service, n: p.n + 1 }));
                  select(0);
                  setTimeout(() => panel.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
                }}
              />
            )}
            {tab === 2 && <ConsultationForm />}
          </div>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {team.filter((m) => m.phone).map((m) => (
            <a key={m.slug} href={`tel:${m.phone}`} data-track="click_phone" data-track-label={m.name} className="rounded-[10px] border border-line px-4 py-3.5 transition-colors hover:border-line-3 hover:bg-bg-2">
              <div className="text-[13px] font-medium">{m.name}</div>
              <div className="mb-1.5 text-[12px] text-ink-3">{m.title}</div>
              <div className="mono text-[12px] tracking-[0.04em] text-accent">{m.phone}</div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
