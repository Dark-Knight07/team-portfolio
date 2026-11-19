/**
 * Cost estimator configuration.
 *
 * IMPORTANT: the figures below are PLACEHOLDER defaults chosen to make the
 * estimator work. They are not quotes. Replace `rates` and the weeks with
 * your real numbers before relying on the output. All results are shown to
 * visitors as an "indicative range", never as a fixed price.
 */
export const pricing = {
  currency: "USD",
  locale: "en-US",
  // Blended weekly team rate range (low, high) used with the effort weeks below.
  weeklyRate: { low: 2000, high: 2600 },
};

export type Option = { id: string; label: string; hint: string };

export const projectTypes: (Option & { weeks: [number, number] })[] = [
  { id: "web", label: "Website or web application", hint: "Marketing site, portal or custom web app", weeks: [3, 8] },
  { id: "ai", label: "AI integration or automation", hint: "AI features, agents, workflow automation", weeks: [3, 9] },
  { id: "cloud", label: "Cloud engineering or migration", hint: "AWS / Azure design, migration, hardening", weeks: [3, 10] },
  { id: "iam", label: "Identity and access management", hint: "Entra ID, MFA, SSO, privileged access", weeks: [2, 8] },
  { id: "m365", label: "Microsoft 365 setup or administration", hint: "Exchange, SharePoint, OneDrive, Teams", weeks: [1, 5] },
  { id: "devops", label: "DevOps and CI/CD", hint: "Pipelines, containers, deployment automation", weeks: [2, 6] },
];

export const complexity: (Option & { factor: number })[] = [
  { id: "essential", label: "Essential", hint: "Focused scope, standard requirements", factor: 0.7 },
  { id: "standard", label: "Standard", hint: "Typical scope with some custom work", factor: 1 },
  { id: "advanced", label: "Advanced", hint: "Large scope, many users or integrations", factor: 1.6 },
];

export const addOns: (Option & { weeks: number })[] = [
  { id: "iam", label: "Identity and access integration", hint: "SSO, MFA, role-based access", weeks: 1.5 },
  { id: "deploy", label: "Cloud deployment and CI/CD", hint: "Automated build and release pipeline", weeks: 1 },
  { id: "ai", label: "AI features", hint: "Assistants, agents, document or data workflows", weeks: 2 },
  { id: "integrations", label: "Third-party integrations", hint: "APIs, ServiceNow, payments, CRM", weeks: 1.5 },
  { id: "security", label: "Security review and hardening", hint: "Access review, configuration audit", weeks: 1 },
  { id: "support", label: "Post-launch support (first month)", hint: "Monitoring and fixes after delivery", weeks: 1 },
];

export const timelines: (Option & { factor: number })[] = [
  { id: "flexible", label: "Flexible", hint: "No fixed deadline", factor: 1 },
  { id: "standard", label: "Standard", hint: "A normal delivery schedule", factor: 1 },
  { id: "fast", label: "Fast-track", hint: "Tight deadline, more parallel work", factor: 1.25 },
];

export type EstimateInput = { type: string; complexity: string; addOns: string[]; timeline: string };
export type Estimate = { low: number; high: number; weeksLow: number; weeksHigh: number };

export function estimate(i: EstimateInput): Estimate | null {
  const t = projectTypes.find((x) => x.id === i.type);
  const c = complexity.find((x) => x.id === i.complexity);
  const tl = timelines.find((x) => x.id === i.timeline);
  if (!t || !c || !tl) return null;
  const extra = addOns.filter((a) => i.addOns.includes(a.id)).reduce((n, a) => n + a.weeks, 0);
  const wLow = (t.weeks[0] * c.factor + extra * 0.8);
  const wHigh = (t.weeks[1] * c.factor + extra * 1.2);
  const round = (n: number) => Math.round(n / 100) * 100;
  return {
    low: round(wLow * pricing.weeklyRate.low * tl.factor),
    high: round(wHigh * pricing.weeklyRate.high * tl.factor),
    weeksLow: Math.max(1, Math.round(wLow)),
    weeksHigh: Math.max(2, Math.round(wHigh)),
  };
}

export const formatMoney = (n: number) =>
  new Intl.NumberFormat(pricing.locale, { style: "currency", currency: pricing.currency, maximumFractionDigits: 0 }).format(n);
