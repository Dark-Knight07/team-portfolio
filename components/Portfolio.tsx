"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { projects, projectFilters } from "@/lib/content";
import { ServiceArt } from "./ServiceArt";
import { ArrowRight, ArrowUpRight, SectionHeader, Tag, btnGhost } from "./ui";

const sceneFor: Record<string, number> = { Cloud: 0, AI: 3, Web: 4, DevOps: 5 };
const spans = ["col-span-12", "col-span-12 md:col-span-7", "col-span-12 md:col-span-5", "col-span-12 md:col-span-5", "col-span-12 md:col-span-7", "col-span-12 md:col-span-6", "col-span-12 md:col-span-6", "col-span-12"];

export function Portfolio() {
  const [filter, setFilter] = useState<string>("All");
  const list = useMemo(() => projects.filter((p) => filter === "All" || p.category === filter), [filter]);
  const count = (f: string) => (f === "All" ? projects.length : projects.filter((p) => p.category === f).length);

  return (
    <section id="portfolio" className="relative py-[var(--pad-section)]">
      <div className="container">
        <SectionHeader
          index="04"
          label="Selected work"
          kicker="Projects and case studies"
          title="Engineered output, end-to-end."
          text="Genuine projects built by our engineers, each with a case study covering the problem, the solution and the architecture. Demonstration projects are clearly labelled; none are client engagements."
        />
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-1.5" role="group" aria-label="Filter projects by category">
            {projectFilters.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                aria-pressed={filter === f}
                className="rounded-full border px-3.5 py-1.5 text-[13px] transition-all duration-150 hover:border-line-3"
                style={filter === f ? { borderColor: "var(--accent)", color: "#0a0a0a", background: "var(--accent)" } : { borderColor: "var(--line)", color: "var(--ink-2)", background: "transparent" }}
              >
                {f} <span className="opacity-60">{count(f)}</span>
              </button>
            ))}
          </div>
          <span className="mono text-[11px] uppercase tracking-[0.06em] text-ink-3" aria-live="polite">
            {list.length} {list.length === 1 ? "case study" : "case studies"}
          </span>
        </div>

        <div className="grid grid-cols-12 gap-4 md:gap-6">
          {list.map((p, i) => {
            const span = spans[i % spans.length];
            const big = span === "col-span-12";
            const shot = p.screenshots[0];
            return (
              <div key={p.slug} className={span}>
                <Link className="group block h-full" href={`/work/${p.slug}`}>
                  <div className="h-full overflow-hidden rounded-[var(--radius)] border border-line bg-bg-2 p-4 transition-colors duration-200 group-hover:border-line-3 md:p-6">
                    <div className="relative mb-5 overflow-hidden rounded-[10px] border border-line" style={{ aspectRatio: big ? "21/9" : "16/9" }}>
                      {shot ? (
                        <Image src={shot.src} alt={shot.alt} fill sizes={big ? "(min-width:1320px) 1240px, 100vw" : "(min-width:768px) 50vw, 100vw"} className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]" />
                      ) : (
                        <ServiceArt scene={sceneFor[p.category]} className="absolute inset-0 h-full w-full" />
                      )}
                      <div className="absolute left-3 right-14 top-3 flex flex-wrap gap-1.5">
                        {p.featured && <Tag accent>Featured</Tag>}
                        <Tag>{p.category}</Tag>
                        <Tag>{p.kind === "Demonstration project" ? "Demo" : "Personal"}</Tag>
                      </div>
                      <div className="absolute right-3 top-3">
                        <span className="mono rounded-[6px] bg-black/50 px-2 py-1 text-[10px] tracking-[0.06em] text-ink-3">{p.year}</span>
                      </div>
                    </div>
                    <div className="mb-4 flex items-start justify-between gap-6">
                      <div>
                        <h3 className="mb-2 font-medium leading-[1.1] tracking-[-0.025em]" style={{ fontSize: big ? 32 : 22 }}>{p.title}</h3>
                        <p className="max-w-[560px] leading-[1.5] text-ink-2" style={{ fontSize: big ? 16 : 14 }}>{p.summary}</p>
                      </div>
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[8px] border border-line-2 text-ink-2 transition-all duration-200 group-hover:border-accent group-hover:bg-accent group-hover:text-black">
                        <ArrowUpRight size={14} />
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-x-6 gap-y-3 border-t border-line pt-3.5">
                      <div>
                        <div className="mono mb-1 text-[10px] tracking-[0.06em] text-ink-3">STATUS</div>
                        <div className="text-[14px] font-medium text-accent">{p.status}</div>
                      </div>
                      <div className="min-w-0">
                        <div className="mono mb-1 text-[10px] tracking-[0.06em] text-ink-3">STACK</div>
                        <div className="text-[13px] text-ink-2">{p.technologies.slice(0, 4).join(" · ")}</div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>

        <div className="mt-10 text-center">
          <p className="mx-auto mb-5 max-w-[520px] text-[13px] leading-[1.55] text-ink-3">Every project above is a demonstration or personal build. We list them so you can judge how we design, architect and ship.</p>
          <Link className={`${btnGhost} h-11 px-6 text-sm`} href="/#start">
            Discuss your project <ArrowRight />
          </Link>
        </div>
      </div>
    </section>
  );
}
