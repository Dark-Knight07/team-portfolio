"use client";

import Script from "next/script";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useSyncExternalStore } from "react";
import { GA_ID, analyticsEnabled, consentStore, track } from "@/lib/analytics";
import { btnGhost, btnPrimary } from "./ui";

// Server render and hydration both start as "pending", so nothing flashes or mismatches.
const useConsent = () => useSyncExternalStore(consentStore.subscribe, consentStore.get, () => "pending" as const);

/** GA4 + consent banner. Renders nothing at all when no measurement ID is configured. */
export function Analytics() {
  const consent = useConsent();
  const pathname = usePathname();

  // Single-page navigations do not reload the page, so report each route change.
  useEffect(() => {
    if (analyticsEnabled && consent === "granted") track("page_view", { page_path: pathname, page_location: window.location.href });
  }, [pathname, consent]);

  // Clicks on elements marked data-track="event_name" (optional data-track-label).
  useEffect(() => {
    if (!analyticsEnabled || consent !== "granted") return;
    const on = (e: MouseEvent) => {
      const el = (e.target as Element | null)?.closest<HTMLElement>("[data-track]");
      if (el?.dataset.track) track(el.dataset.track, { label: el.dataset.trackLabel ?? el.textContent?.trim().slice(0, 60) ?? "" });
    };
    document.addEventListener("click", on);
    return () => document.removeEventListener("click", on);
  }, [consent]);

  // Footer "Cookie settings" reopens the choice.
  useEffect(() => {
    const reopen = () => consentStore.set("unknown");
    window.addEventListener("tn-open-cookie-settings", reopen);
    return () => window.removeEventListener("tn-open-cookie-settings", reopen);
  }, []);

  if (!analyticsEnabled) return null;

  return (
    <>
      {consent === "granted" && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
          <Script id="ga4-init" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}window.gtag=gtag;gtag('js',new Date());gtag('config','${GA_ID}',{anonymize_ip:true,send_page_view:false});`}
          </Script>
        </>
      )}
      {consent === "unknown" && (
        <div role="dialog" aria-label="Analytics cookies" className="fixed bottom-4 left-4 right-4 z-[70] sm:left-auto max-w-[440px] rounded-[var(--radius)] border border-line-2 bg-bg-2/95 p-5 shadow-2xl backdrop-blur-xl">
          <p className="text-[13.5px] leading-[1.55] text-ink-2">
            We use Google Analytics to understand how visitors use this site. It sets cookies only if you accept. Declining changes nothing about how the site works.{" "}
            <Link href="/privacy" className="text-ink underline underline-offset-2 hover:text-accent">
              Privacy notice
            </Link>
          </p>
          <div className="mt-4 flex gap-2.5">
            <button type="button" onClick={() => consentStore.set("granted")} className={`${btnPrimary} h-10 px-4 text-[13px]`}>
              Accept
            </button>
            <button type="button" onClick={() => consentStore.set("denied")} className={`${btnGhost} h-10 px-4 text-[13px]`}>
              Decline
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export function CookieSettingsLink({ className }: { className?: string }) {
  if (!analyticsEnabled) return null;
  return (
    <button type="button" className={className} onClick={() => window.dispatchEvent(new Event("tn-open-cookie-settings"))}>
      Cookie settings
    </button>
  );
}
