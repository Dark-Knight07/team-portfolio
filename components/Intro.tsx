"use client";

import { useEffect, useRef, useState } from "react";
import { team } from "@/lib/team";
import { services, stack } from "@/lib/content";
import { ServiceArt } from "./ServiceArt";
import { ArrowRight, Tag } from "./ui";

/* Featured strip (the reference shows a featured case here) — ours spotlights the team model. */
export function Featured() {
  return (
    <section className="pb-(--pad-section) pt-4 relative">
      <div className="container relative">
        <div className="reveal">
          <div className="grid grid-cols-1 overflow-hidden border border-line rounded-[var(--radius)] bg-bg-2 md:[grid-template-columns:1.4fr_1fr]">
            <div className="relative overflow-hidden border-b border-line md:border-b-0 md:border-r" style={{ aspectRatio: "16/10" }}>
              <ServiceArt scene={3} className="absolute inset-0 h-full w-full" />
              <div aria-hidden="true" className="absolute inset-0" style={{ background: "linear-gradient(135deg, #7c9bff33 0%, transparent 65%)" }} />
              <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-bg/70 via-transparent to-transparent" />
              <span className="absolute bottom-5 left-6 mono text-[11px] tracking-[0.08em] text-ink-2">remote-first / {team.length} engineers</span>
            </div>
            <div className="p-8 flex flex-col justify-between gap-6">
              <div>
                <div className="flex gap-2 mb-4 flex-wrap">
                  <Tag accent>Our model</Tag>
                  <Tag>Remote-first</Tag>
                </div>
                <h2 className="text-[28px] tracking-[-0.025em] font-medium mb-2.5">One team, four specialisms.</h2>
                <p className="text-ink-2 text-[15px] leading-[1.5] mb-5">
                  Build, automate, secure and run the cloud. Our engineers cover full-stack and AI development, infrastructure automation, identity security, and Microsoft 365 and AWS administration, so one team can take a project from design to day-two operations.
                </p>
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-line">
                  <div>
                    <div className="mono text-[10px] text-ink-3 tracking-[0.06em] mb-1.5">SPECIALISMS</div>
                    <div className="text-[13px] text-ink-2">{team.map((m) => m.tagline).join(" · ")}</div>
                  </div>
                  <div>
                    <div className="mono text-[10px] text-ink-3 tracking-[0.06em] mb-1.5">WORKING MODEL</div>
                    <div className="text-[22px] tracking-[-0.02em] font-medium text-accent">Fully remote</div>
                  </div>
                </div>
              </div>
              <a className="inline-flex items-center gap-2 text-sm text-ink-2 hover:text-ink transition-colors self-start" href="#team">
                Meet the team <ArrowRight />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CountUp({ to }: { to: number }) {
  const [v, setV] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const step = (t: number) => {
          const p = Math.min((t - start) / 1200, 1);
          setV(Math.round((1 - Math.pow(1 - p, 3)) * to));
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [to]);
  return <span ref={ref}>{v}</span>;
}

export function Stats() {
  const items = [
    { n: team.length, l: "Engineers" },
    { n: services.length, l: "Service areas" },
    { n: 4, l: "Process steps" },
    { n: 100, l: "Remote working", suffix: "%" },
  ];
  return (
    <section aria-label="At a glance" className="border-b border-line">
      <div className="container grid grid-cols-2 md:grid-cols-4">
        {items.map((it, i) => (
          <div
            key={it.l}
            className={`reveal py-10 md:py-14 ${i % 2 === 1 ? "border-l border-line pl-6 md:pl-8" : ""} ${i >= 2 ? "border-t border-line md:border-t-0" : ""} ${i > 0 ? "md:border-l md:border-line md:pl-8" : ""}`}
          >
            <div className="text-[clamp(44px,6vw,84px)] font-medium tracking-[-0.04em] leading-none text-ink">
              <CountUp to={it.n} />
              {it.suffix ?? ""}
            </div>
            <div className="mono text-[11px] text-ink-3 tracking-[0.08em] uppercase mt-3">{it.l}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function Marquee() {
  const list = [...stack, ...stack];
  return (
    <div className="overflow-hidden border-y border-line py-[18px] relative" style={{ maskImage: "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)", WebkitMaskImage: "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)" }}>
      <div className="flex gap-12 w-max" style={{ animation: "marquee 35s linear infinite" }}>
        {list.map((s, i) => (
          <div key={i} className="flex items-center gap-4 whitespace-nowrap">
            <span className="mono text-[11px] text-ink-3 tracking-[0.06em] uppercase">{s}</span>
            <span className="text-ink-4">✦</span>
          </div>
        ))}
      </div>
    </div>
  );
}
