"use client";

import { useEffect, useRef, useState } from "react";
import { techCategories } from "@/lib/tech";

const short: Record<string, string> = {
  "full-stack": "Full Stack",
  "ai-automation": "AI & Automation",
  cloud: "Cloud",
  cybersecurity: "Security",
  iam: "Identity",
  devops: "DevOps",
};

/** Interactive technology map for the hero. Hover or focus a discipline to preview it; click to open it in the Technology section. */
export function TechOrbit() {
  const [active, setActive] = useState<string | null>(null);
  const wrap = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);
  const raf = useRef(0);

  useEffect(() => {
    const el = wrap.current;
    const box = inner.current;
    if (!el || !box) return;
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches || window.matchMedia("(pointer: coarse)").matches;
    if (calm) return;
    const move = (e: PointerEvent) => {
      cancelAnimationFrame(raf.current);
      raf.current = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        const x = ((e.clientX - r.left) / r.width - 0.5) * 2;
        const y = ((e.clientY - r.top) / r.height - 0.5) * 2;
        box.style.transform = `translate3d(${(x * 10).toFixed(1)}px, ${(y * 10).toFixed(1)}px, 0)`;
      });
    };
    const leave = () => {
      box.style.transform = "translate3d(0,0,0)";
    };
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => {
      cancelAnimationFrame(raf.current);
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
    };
  }, []);

  const open = (id: string) => {
    try {
      sessionStorage.setItem("tn-cat", id);
    } catch {}
    window.dispatchEvent(new CustomEvent("tn-select", { detail: id }));
    document.getElementById("technology")?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  };

  const cur = techCategories.find((c) => c.id === active);
  const pts = techCategories.map((c, i) => {
    const a = ((-90 + i * 60) * Math.PI) / 180;
    return { c, x: 50 + Math.cos(a) * 38, y: 50 + Math.sin(a) * 38 };
  });

  return (
    <div ref={wrap} className="relative mx-auto aspect-square w-full max-w-[520px] select-none" role="group" aria-label="Technology disciplines. Choose one to explore it.">
      <div ref={inner} className="absolute inset-0 transition-transform duration-300 ease-out will-change-transform">
        <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" aria-hidden="true">
          <circle cx="50" cy="50" r="38" fill="none" stroke="#d4ff3a" strokeOpacity="0.18" />
          <circle cx="50" cy="50" r="24" fill="none" stroke="#d4ff3a" strokeOpacity="0.12" />
          <circle className="a-spin" style={{ transformOrigin: "50px 50px", animationDuration: "80s" }} cx="50" cy="50" r="46" fill="none" stroke="#d4ff3a" strokeOpacity="0.3" strokeDasharray="0.6 3" />
          {pts.map(({ c, x, y }) => (
            <line key={c.id} x1="50" y1="50" x2={x.toFixed(2)} y2={y.toFixed(2)} stroke="#d4ff3a" strokeOpacity={active === c.id ? 0.7 : 0.16} strokeWidth="0.35" style={{ transition: "stroke-opacity .25s" }} />
          ))}
        </svg>

        <div className="absolute left-1/2 top-1/2 flex h-[34%] w-[34%] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border border-line-2 bg-bg/80 p-3 text-center backdrop-blur-sm" aria-live="polite">
          {cur ? (
            <>
              <span className="mono text-[9px] uppercase tracking-[0.12em] text-accent sm:text-[10px]">{short[cur.id]}</span>
              <span className="mt-1 text-[10px] leading-[1.35] text-ink-2 sm:text-[11.5px]">{cur.blurb}</span>
            </>
          ) : (
            <>
              <span className="serif text-[clamp(15px,1.6vw,22px)] leading-tight text-accent">Six disciplines.</span>
              <span className="mt-0.5 text-[clamp(11px,1.1vw,14px)] leading-tight text-ink-2">One team.</span>
            </>
          )}
        </div>

        {pts.map(({ c, x, y }) => (
          <button
            key={c.id}
            type="button"
            onMouseEnter={() => setActive(c.id)}
            onMouseLeave={() => setActive(null)}
            onFocus={() => setActive(c.id)}
            onBlur={() => setActive(null)}
            onClick={() => open(c.id)}
            aria-label={`${c.label}: ${c.techs.length} technologies. Open in the Technology section.`}
            className={`absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border px-3 py-1.5 text-[11px] font-medium transition-colors duration-200 sm:text-[12.5px] ${
              active === c.id ? "border-accent bg-accent text-black" : "border-line-2 bg-bg-2/90 text-ink-2 hover:text-ink"
            }`}
            style={{ left: `${x}%`, top: `${y}%` }}
          >
            <span className={`mr-1.5 inline-block h-1.5 w-1.5 rounded-full align-middle ${active === c.id ? "bg-black" : "bg-accent"}`} />
            {short[c.id]}
          </button>
        ))}
      </div>
    </div>
  );
}
