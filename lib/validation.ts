/**
 * Shared validation for the inquiry + consultation forms.
 * Used by the browser (instant feedback) AND the API route (the real gate).
 * No dependencies on purpose.
 */
export const services = [
  "Cloud Engineering",
  "Identity & Access Management",
  "Microsoft 365 Solutions",
  "AI & Automation",
  "Web Development",
  "DevOps & Infrastructure",
  "IT Consulting",
  "Technical Support",
  "Not sure yet",
] as const;

export const budgets = ["Under $2,000", "$2,000 – $5,000", "$5,000 – $15,000", "$15,000+", "Not sure yet"] as const;
export const timelineOptions = ["As soon as possible", "Within 1 month", "1 – 3 months", "3+ months", "Flexible"] as const;
export const windows = ["Morning (9am – 12pm)", "Afternoon (12pm – 4pm)", "Evening (4pm – 8pm)"] as const;
export const modes = ["Video call", "Phone call"] as const;

export type Errors = Record<string, string>;
export type InquiryData = {
  type: "inquiry";
  name: string; email: string; phone: string; company: string;
  service: string; budget: string; timeline: string; message: string;
  consent: boolean; website: string; // honeypot
};
export type ConsultationData = {
  type: "consultation";
  name: string; email: string; phone: string;
  topic: string; date: string; window: string; timezone: string; mode: string; notes: string;
  consent: boolean; website: string;
};
export type FormData = InquiryData | ConsultationData;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE = /^[+()\-.\s\d]{7,20}$/;
const CONTROL = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g;

export const clean = (v: unknown, max: number) =>
  (typeof v === "string" ? v : "").replace(CONTROL, "").trim().slice(0, max);

function common(d: Record<string, unknown>, e: Errors) {
  if (clean(d.name, 100).length < 2) e.name = "Please enter your name.";
  if (!EMAIL.test(clean(d.email, 200))) e.email = "Please enter a valid email address.";
  const phone = clean(d.phone, 30);
  if (phone && !PHONE.test(phone)) e.phone = "Please enter a valid phone number or leave it blank.";
  if (d.consent !== true) e.consent = "Please confirm so we can contact you.";
}

export function validateInquiry(d: Record<string, unknown>): Errors {
  const e: Errors = {};
  common(d, e);
  if (!services.includes(clean(d.service, 60) as never)) e.service = "Please choose a service.";
  if (!budgets.includes(clean(d.budget, 40) as never)) e.budget = "Please choose a budget range.";
  if (!timelineOptions.includes(clean(d.timeline, 40) as never)) e.timeline = "Please choose a timeline.";
  const m = clean(d.message, 3000);
  if (m.length < 20) e.message = "Please describe your project in at least 20 characters.";
  return e;
}

export function validateConsultation(d: Record<string, unknown>): Errors {
  const e: Errors = {};
  common(d, e);
  if (!services.includes(clean(d.topic, 60) as never)) e.topic = "Please choose a topic.";
  const date = clean(d.date, 10);
  const parsed = /^\d{4}-\d{2}-\d{2}$/.test(date) ? new Date(`${date}T00:00:00`) : null;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (!parsed || Number.isNaN(parsed.getTime())) e.date = "Please choose a date.";
  else if (parsed <= today) e.date = "Please choose a future date.";
  else if (parsed.getTime() - today.getTime() > 1000 * 60 * 60 * 24 * 120) e.date = "Please choose a date within the next 4 months.";
  if (!windows.includes(clean(d.window, 40) as never)) e.window = "Please choose a time window.";
  if (!modes.includes(clean(d.mode, 20) as never)) e.mode = "Please choose how you would like to meet.";
  if (clean(d.timezone, 60).length < 2) e.timezone = "Please enter your time zone.";
  return e;
}

export const validate = (d: Record<string, unknown>) =>
  d.type === "consultation" ? validateConsultation(d) : validateInquiry(d);

/** Returns a sanitised copy containing only known fields. */
export function sanitise(d: Record<string, unknown>) {
  if (d.type === "consultation") {
    return {
      type: "consultation" as const,
      name: clean(d.name, 100), email: clean(d.email, 200), phone: clean(d.phone, 30),
      topic: clean(d.topic, 60), date: clean(d.date, 10), window: clean(d.window, 40),
      timezone: clean(d.timezone, 60), mode: clean(d.mode, 20), notes: clean(d.notes, 2000),
    };
  }
  return {
    type: "inquiry" as const,
    name: clean(d.name, 100), email: clean(d.email, 200), phone: clean(d.phone, 30), company: clean(d.company, 120),
    service: clean(d.service, 60), budget: clean(d.budget, 40), timeline: clean(d.timeline, 40), message: clean(d.message, 3000),
  };
}
