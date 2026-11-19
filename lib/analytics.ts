/**
 * Google Analytics 4 helpers.
 * Analytics is OFF unless NEXT_PUBLIC_GA_ID (a "G-XXXXXXXXXX" measurement ID) is set,
 * and even then it only loads after the visitor accepts it. The measurement ID is
 * public by design (it appears in every site's page source), so NEXT_PUBLIC_ is correct.
 */
export const GA_ID = (process.env.NEXT_PUBLIC_GA_ID ?? "").trim();
export const analyticsEnabled = /^G-[A-Z0-9]{6,}$/i.test(GA_ID);

export const CONSENT_KEY = "tn-analytics-consent";
export type Consent = "granted" | "denied" | "unknown";

type GtagWindow = Window & { gtag?: (...args: unknown[]) => void };

/** Send a custom event. Safe to call anywhere: does nothing unless analytics is loaded and accepted. */
export function track(name: string, params: Record<string, string | number | boolean> = {}) {
  if (typeof window === "undefined") return;
  const w = window as GtagWindow;
  if (typeof w.gtag === "function") w.gtag("event", name, params);
}

/* A tiny external store so the consent choice is hydration-safe. */
const listeners = new Set<() => void>();
export const consentStore = {
  subscribe(cb: () => void) {
    listeners.add(cb);
    window.addEventListener("storage", cb);
    return () => {
      listeners.delete(cb);
      window.removeEventListener("storage", cb);
    };
  },
  get(): Consent {
    try {
      const v = localStorage.getItem(CONSENT_KEY);
      return v === "granted" || v === "denied" ? v : "unknown";
    } catch {
      return "unknown";
    }
  },
  set(v: Consent) {
    try {
      if (v === "unknown") localStorage.removeItem(CONSENT_KEY);
      else localStorage.setItem(CONSENT_KEY, v);
    } catch {}
    listeners.forEach((l) => l());
  },
};
