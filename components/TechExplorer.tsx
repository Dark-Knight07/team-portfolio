"use client";

import { useEffect, useMemo, useState } from "react";
import { techCategories, membersFor } from "@/lib/tech";
import { SectionHeader } from "./ui";
import { useTabKeys } from "./useTabKeys";

export function TechExplorer() {
  const [ci, setCi] = useState(0);
  const [ti, setTi] = useState(0);
  const cat = techCategories[ci];
  const tech = cat.techs[Math.min(ti, cat.techs.length - 1)];
  const who = useMemo(() => membersFor(tech.name), [tech.name]);

  const pick = (i: number) => {
    setCi(i);
    setTi(0);
  };

  // Hero orbit hands over a category via event (or a pending value if this loaded later).
  useEffect(() => {
    const apply = (id?: string) => {
      const i = techCategories.findIndex((c) => c.id === id);
      if (i >= 0) {
        setCi(i);
        setTi(0);
      }
    };
    try {
      apply(sessionStorage.getItem("tn-cat") ?? undefined);
    } catch {}
    const on = (e: Event) => apply((e as CustomEvent<string>).detail);
    window.addEventListener("tn-select", on);
    return () => window.removeEventListener("tn-select", on);
  }, []);

  const onKeys = useTabKeys(techCategories.length, ci, pick, "both");

  return (
    <section id="technology" className="relative py-[var(--pad-section)]">
      <div className="container">
        <SectionHeader
          index="03"
          label="Technology"
          kicker="Technology ecosystem"
          title="The stack behind the work."
          text="Six disciplines, one team. Choose a discipline, then a technology, to see what it is used for and which of our engineers lists it."
        />
        <div className="grid grid-cols-[minmax(0,1fr)] gap-6 lg:[grid-template-columns:minmax(260px,320px)_minmax(0,1fr)] lg:gap-8">
          <div role="tablist" aria-label="Technology categories" onKeyDown={onKeys} className="-mx-1 flex min-w-0 gap-1.5 overflow-x-auto px-1 pb-1 lg:flex-col lg:overflow-visible lg:pb-0">
            {techCategories.map((c, i) => {
              const on = i === ci;
              return (
                <button
                  key={c.id}
                  role="tab"
                  id={`tab-${c.id}`}
                  aria-selected={on}
                  aria-controls="tech-panel"
                  tabIndex={on ? 0 : -1}
                  onClick={() => pick(i)}
                  className={`flex shrink-0 items-center justify-between gap-4 rounded-[10px] border px-4 py-3 text-left transition-colors lg:shrink ${on ? "border-line-2 bg-bg-2" : "border-transparent hover:bg-bg-2/60"}`}
                >
                  <span className={`text-[14px] font-medium tracking-[-0.005em] ${on ? "text-ink" : "text-ink-2"}`}>{c.label}</span>
                  <span className={`mono text-[10px] tracking-[0.06em] ${on ? "text-accent" : "text-ink-3"}`}>{String(c.techs.length).padStart(2, "0")}</span>
                </button>
              );
            })}
          </div>

          <div id="tech-panel" role="tabpanel" aria-labelledby={`tab-${cat.id}`} tabIndex={0} className="min-w-0 overflow-hidden rounded-[var(--radius)] border border-line bg-bg-2">
            <div className="border-b border-line p-6 md:p-8" style={{ background: "linear-gradient(135deg, #d4ff3a10, transparent)" }}>
              <div className="mono mb-2 text-[11px] uppercase tracking-[0.08em] text-accent">{cat.label}</div>
              <p className="max-w-[560px] text-[15px] leading-[1.55] text-ink-2">{cat.blurb}</p>
            </div>
            <div className="grid min-w-0 md:[grid-template-columns:minmax(0,1.1fr)_minmax(0,0.9fr)]">
              <div className="p-6 md:p-8">
                <div className="mono mb-4 text-[10px] tracking-[0.06em] text-ink-3">TECHNOLOGIES</div>
                <div className="flex flex-wrap gap-2" role="group" aria-label={`${cat.label} technologies`}>
                  {cat.techs.map((t, i) => {
                    const on = i === ti;
                    return (
                      <button
                        key={t.name}
                        type="button"
                        aria-pressed={on}
                        onClick={() => setTi(i)}
                        onMouseEnter={() => setTi(i)}
                        className={`rounded-[8px] border px-3 py-2 text-[13px] transition-colors ${on ? "border-accent bg-accent text-black" : "border-line-2 text-ink-2 hover:border-line-3 hover:text-ink"}`}
                      >
                        {t.name}
                      </button>
                    );
                  })}
                </div>
              </div>
              <div className="border-t border-line p-6 md:border-l md:border-t-0 md:p-8" aria-live="polite">
                <div className="mono mb-3 text-[10px] tracking-[0.06em] text-ink-3">SELECTED</div>
                <div className="text-[24px] font-medium tracking-[-0.025em]">{tech.name}</div>
                <p className="mt-2 text-[14px] leading-[1.55] text-ink-2">{tech.note}</p>
                <div className="mono mb-2 mt-6 text-[10px] tracking-[0.06em] text-ink-3">LISTED BY</div>
                {who.length ? (
                  <div className="flex flex-wrap gap-1.5">
                    {who.map((n) => (
                      <span key={n} className="inline-flex items-center gap-1.5 rounded-[6px] border border-line bg-white/5 px-[9px] py-1 text-[12px] text-ink-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                        {n}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-[13px] text-ink-3">Part of our wider capability. Ask the team about it.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
