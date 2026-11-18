"use client";

import { useEffect, useRef, useState } from "react";
import { process } from "@/lib/content";
import { ServiceArt } from "./ServiceArt";

const scenes = [6, 4, 5, 0];
import { SectionHeader } from "./ui";

export function Process() {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.i));
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section id="process" className="py-[var(--pad-section)] relative">
      <div className="container">
        <SectionHeader index="02" label="Process" kicker="How we work" title="Four steps, no surprises." />
        <div className="grid grid-cols-1 gap-10 md:[grid-template-columns:minmax(0,1fr)_minmax(0,1fr)] md:gap-16">
          <div className="hidden md:block">
            <div className="sticky top-28 aspect-[4/3] overflow-hidden rounded-[var(--radius)] border border-line bg-bg-2">
              {process.map((p, i) => (
                <div key={p.n} className="absolute inset-0 transition-opacity duration-700" style={{ opacity: active === i ? 1 : 0 }}>
                  <ServiceArt scene={scenes[i]} className="h-full w-full" />
                </div>
              ))}
              <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-bg/60 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-6 mono text-[12px] tracking-[0.08em] text-accent">STEP {String(active + 1).padStart(2, "0")} / 04</div>
            </div>
          </div>
          <ol className="flex flex-col">
            {process.map((p, i) => (
              <li
                key={p.n}
                data-i={i}
                ref={(el) => { refs.current[i] = el; }}
                className="flex flex-col justify-center gap-4 border-b border-line py-10 last:border-b-0 md:min-h-[58vh] md:py-0"
              >
                <div className="md:hidden relative aspect-[16/9] overflow-hidden rounded-[var(--radius)] border border-line">
                  <ServiceArt scene={scenes[i]} className="h-full w-full" />
                </div>
                <span className="mono text-[12px] tracking-[0.08em] text-accent">STEP {p.n.padStart(2, "0")}</span>
                <h3 className={`text-[clamp(34px,4.4vw,60px)] font-medium tracking-[-0.035em] leading-none transition-colors duration-500 ${active === i ? "text-ink" : "md:text-ink-3"}`}>
                  {p.label}
                </h3>
                <p className="max-w-[420px] text-[17px] leading-[1.5] text-ink-2">{p.short}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
