"use client";

import { useMemo, useState } from "react";
import { projects, projectFilters } from "@/lib/content";
import { contactHref } from "@/lib/site";
import { ServiceArt } from "./ServiceArt";
import { ArrowRight, ArrowUpRight, SectionHeader, Tag, btnGhost } from "./ui";

const spans = ["col-span-12", "col-span-12 md:col-span-7", "col-span-12 md:col-span-5", "col-span-12 md:col-span-5", "col-span-12 md:col-span-7"];

export function Portfolio() {
  const [filter, setFilter] = useState("All");
  const list = useMemo(() => projects.filter((p) => filter === "All" || p.category === filter), [filter]);
  const years = projects.map((p) => p.year).sort();

  return (
    <section id="portfolio" className="py-[var(--pad-section)] relative">
      <div className="container">
        <SectionHeader
          index="03"
          label="Selected work"
          kicker="Recent builds"
          title="Engineered output, end-to-end."
          text="Our portfolio of real internal projects and engineering work, filterable by practice area."
        />
        <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
          <div className="flex gap-1.5 flex-wrap">
            {projectFilters.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                aria-pressed={filter === f}
                className="px-3.5 py-1.5 rounded-full text-[13px] border transition-all duration-150 hover:border-line-3"
                style={filter === f ? { borderColor: "var(--accent)", color: "#0a0a0a", background: "var(--accent)" } : { borderColor: "var(--line)", color: "var(--ink-2)", background: "transparent" }}
              >
                {f}
              </button>
            ))}
          </div>
          <span className="mono text-[11px] text-ink-3 tracking-[0.06em] uppercase">
            {list.length} {list.length === 1 ? "case" : "cases"}
            {years.length ? ` · ${years[0] === years[years.length - 1] ? years[0] : `${years[0]}–${years[years.length - 1]}`}` : ""}
          </span>
        </div>

        {list.length === 0 ? (
          <div className="rounded-[var(--radius)] border border-line bg-bg-2 p-8 md:p-12 grid gap-6 md:[grid-template-columns:1fr_auto] items-center">
            <div>
              <div className="mono text-[11px] text-accent tracking-[0.08em] mb-3 uppercase">Case studies in preparation</div>
              <h3 className="text-[clamp(24px,2.6vw,34px)] font-medium tracking-[-0.025em] leading-[1.1] mb-3">Our project portfolio is being assembled.</h3>
              <p className="text-ink-2 text-[15px] leading-[1.55] max-w-[560px]">
                We publish only genuine work we can stand behind. In the meantime, talk to the team about what you need and we will share relevant experience directly.
              </p>
            </div>
            <a className={`${btnGhost} h-11 px-5 text-[14px] justify-self-start`} href={contactHref}>
              Talk to the team <ArrowRight />
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-12 gap-6">
            {list.map((p, i) => {
              const big = i === 0;
              return (
                <div key={p.slug} className={spans[i % spans.length]}>
                  <a className="block group" href={p.href ?? contactHref} {...(p.href?.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
                    <div className="border border-line rounded-[var(--radius)] overflow-hidden bg-bg-2 group-hover:border-line-3 transition-colors duration-200" style={{ padding: 24 }}>
                      <div className="relative rounded-[10px] overflow-hidden mb-5 border border-line" style={{ aspectRatio: "16/9" }}>
                        {p.image ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={p.image} alt={`${p.title} project`} className="absolute inset-0 h-full w-full object-cover" />
                        ) : (
                          <ServiceArt scene={i} className="absolute inset-0 h-full w-full" />
                        )}
                        <div className="absolute top-3 left-3 right-14 flex flex-wrap gap-1.5">
                          {p.featured && <Tag accent>Featured</Tag>}
                          <Tag>{p.category}</Tag>
                        </div>
                        <div className="absolute top-3 right-3">
                          <span className="mono text-[10px] text-ink-3 bg-black/50 px-2 py-1 rounded-[6px] tracking-[0.06em]">{p.year}</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-start gap-6 mb-3.5">
                        <div>
                          <h3 className="tracking-[-0.025em] font-medium mb-2 leading-[1.1]" style={{ fontSize: big ? 32 : 22 }}>{p.title}</h3>
                          <p className="text-ink-2 leading-[1.5] max-w-[540px]" style={{ fontSize: big ? 16 : 14 }}>{p.description}</p>
                        </div>
                        <span className="shrink-0 w-9 h-9 rounded-[8px] border border-line-2 flex items-center justify-center text-ink-2 group-hover:bg-accent group-hover:text-black group-hover:border-accent transition-all duration-200">
                          <ArrowUpRight size={14} />
                        </span>
                      </div>
                      <div className="flex gap-6 pt-3.5 border-t border-line flex-wrap">
                        <div>
                          <div className="mono text-[10px] text-ink-3 tracking-[0.06em] mb-1 uppercase">{p.metricLabel}</div>
                          <div className="text-[15px] text-accent font-medium">{p.metric}</div>
                        </div>
                        <div>
                          <div className="mono text-[10px] text-ink-3 tracking-[0.06em] mb-1">ROLE</div>
                          <div className="text-[13px] text-ink-2">{p.role}</div>
                        </div>
                        <div className="ml-auto">
                          <div className="mono text-[10px] text-ink-3 tracking-[0.06em] mb-1">STACK</div>
                          <div className="text-[13px] text-ink-2">{p.stack}</div>
                        </div>
                      </div>
                    </div>
                  </a>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
