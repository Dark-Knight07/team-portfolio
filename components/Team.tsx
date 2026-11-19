"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { team, teamIntro, initials, type TeamMember } from "@/lib/team";
import { contactHref } from "@/lib/site";
import { expertise, projects } from "@/lib/content";
import { useTabKeys } from "./useTabKeys";
import { ArrowRight, SectionHeader, Tag, btnPrimary } from "./ui";

function Avatar({ m, size }: { m: TeamMember; size: "sm" | "lg" }) {
  const cls = size === "sm" ? "w-10 h-10 text-[12px]" : "w-[72px] h-[72px] text-[22px]";
  return (
    <div
      className={`relative rounded-full overflow-hidden flex items-center justify-center font-mono font-semibold shrink-0 ${cls}`}
      style={{ background: "linear-gradient(135deg, #d4ff3a55, #d4ff3a22)", border: "1px solid #d4ff3a66", color: "#d4ff3a" }}
    >
      {m.photo ? (
        <Image src={m.photo} alt={m.name} fill sizes={size === "sm" ? "40px" : "72px"} className="object-cover object-[50%_20%]" />
      ) : (
        initials(m.name)
      )}
    </div>
  );
}

export function Team() {
  const [i, setI] = useState(0);
  const m = team[i];
  const skillCount = m.skills.reduce((n, g) => n + g.items.length, 0);
  const mine = projects.filter((p) => p.team.includes(m.slug));
  const onKeys = useTabKeys(team.length, i, setI, "both");

  return (
    <section id="team" className="py-[var(--pad-section)] relative">
      <div className="container">
        <SectionHeader index="06" label="Team" kicker="Remote-first engineers" title="Meet our team." text={teamIntro} />
        <div className="grid grid-cols-[minmax(0,1fr)] gap-6 md:gap-8 md:[grid-template-columns:minmax(280px,360px)_minmax(0,1fr)]">
          <div className="min-w-0 flex md:flex-col gap-1.5 overflow-x-auto md:overflow-visible pb-1 md:pb-0 -mx-1 px-1" role="tablist" aria-label="Team members" onKeyDown={onKeys}>
            {team.map((t, idx) => (
              <button
                key={t.slug}
                role="tab"
                id={`team-tab-${t.slug}`}
                aria-controls="team-panel"
                tabIndex={idx === i ? 0 : -1}
                aria-selected={idx === i}
                onClick={() => setI(idx)}
                className="grid gap-3.5 items-center px-4 py-3.5 rounded-[10px] text-left border transition-all duration-150 hover:bg-bg-2 shrink-0 min-w-[240px] md:min-w-0"
                style={{ gridTemplateColumns: "40px 1fr auto", background: idx === i ? "var(--bg-2)" : "transparent", borderColor: idx === i ? "var(--line-2)" : "transparent" }}
              >
                <Avatar m={t} size="sm" />
                <div>
                  <div className="text-[14px] font-medium tracking-[-0.005em] mb-0.5">{t.name}</div>
                  <div className="text-[12px] text-ink-3">{t.title}</div>
                </div>
                <span className="mono text-[10px] text-ink-3 tracking-[0.06em]">{String(idx + 1).padStart(2, "0")}</span>
              </button>
            ))}
          </div>

          <div id="team-panel" role="tabpanel" aria-labelledby={`team-tab-${m.slug}`} className="min-w-0 border border-line rounded-[var(--radius)] overflow-hidden bg-bg-2" key={m.slug}>
            <div className="p-6 md:p-8 pb-6 border-b border-line" style={{ background: "linear-gradient(135deg, #d4ff3a10, transparent)" }}>
              <div className="flex items-start gap-5 mb-6">
                <Avatar m={m} size="lg" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2.5 mb-1.5 flex-wrap">
                    <h3 className="text-[26px] font-medium tracking-[-0.025em]">{m.name}</h3>
                    <Tag accent>{m.tagline}</Tag>
                  </div>
                  <div className="text-sm text-ink-2 mb-1">{m.designation}</div>
                  <div className="mono text-[11px] text-ink-3 tracking-[0.04em] uppercase">⌖ {m.location} · Remote-first</div>
                  {(m.linkedin || m.github) && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {m.linkedin && <a className="inline-flex h-8 items-center rounded-[8px] border border-line-2 px-3 text-[12px] text-ink-2 transition-colors hover:border-accent hover:text-accent" href={m.linkedin} target="_blank" rel="noopener noreferrer" aria-label={`${m.name} on LinkedIn (opens in a new tab)`}>LinkedIn ↗</a>}
                      {m.github && <a className="inline-flex h-8 items-center rounded-[8px] border border-line-2 px-3 text-[12px] text-ink-2 transition-colors hover:border-accent hover:text-accent" href={m.github} target="_blank" rel="noopener noreferrer" aria-label={`${m.name} on GitHub (opens in a new tab)`}>GitHub ↗</a>}
                    </div>
                  )}
                </div>
              </div>
              <p className="text-ink-2 text-[15px] leading-[1.55] max-w-[640px]">{m.intro}</p>
            </div>

            <div className="grid grid-cols-3 border-b border-line">
              {[
                ["CONTRIBUTIONS", m.contributions.length],
                ["SKILL AREAS", m.skills.length],
                ["SKILLS", skillCount],
              ].map(([l, v], k) => (
                <div key={l as string} className={`px-4 md:px-7 py-4 ${k ? "border-l border-line" : ""}`}>
                  <div className="mono text-[10px] text-ink-3 tracking-[0.06em] mb-1.5">{l}</div>
                  <div className="text-[24px] tracking-[-0.02em] font-medium">{v}</div>
                </div>
              ))}
            </div>

            <div className="p-6 pb-8">
              <div className="mono text-[10px] text-ink-3 tracking-[0.06em] mb-3.5">EXPERTISE</div>
              <div className="flex flex-col gap-4 mb-7">
                {m.skills.map((g) => (
                  <div key={g.group}>
                    <div className="text-[12px] text-ink-3 mb-2">{g.group}</div>
                    <div className="flex flex-wrap gap-1.5">
                      {g.items.map((s) => (
                        <Tag key={s}>{s}</Tag>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mono text-[10px] text-ink-3 tracking-[0.06em] mb-3.5">PROJECT CONTRIBUTIONS</div>
              <ul className="flex flex-col gap-2.5 mb-7">
                {m.contributions.map((c) => (
                  <li key={c} className="flex gap-3 text-[14px] leading-[1.5] text-ink-2">
                    <span className="text-accent mono text-[11px] pt-[3px]">→</span>
                    {c}
                  </li>
                ))}
              </ul>

              {mine.length > 0 && (
                <>
                  <div className="mono text-[10px] text-ink-3 tracking-[0.06em] mb-3.5">PROJECTS ({mine.length})</div>
                  <ul className="mb-7 grid gap-2 sm:grid-cols-2">
                    {mine.map((p) => (
                      <li key={p.slug}>
                        <Link href={`/work/${p.slug}`} className="group flex items-center justify-between gap-3 rounded-[10px] border border-line px-3.5 py-2.5 transition-colors hover:border-line-3 hover:bg-bg-3">
                          <span className="min-w-0">
                            <span className="block truncate text-[13.5px] font-medium">{p.title}</span>
                            <span className="mono block text-[10px] uppercase tracking-[0.06em] text-ink-3">{p.category} · {p.kind === "Demonstration project" ? "Demo" : "Personal"}</span>
                          </span>
                          <span className="text-ink-3 transition-colors group-hover:text-accent" aria-hidden="true">→</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </>
              )}

              <div className="mono text-[10px] text-ink-3 tracking-[0.06em] mb-3.5">CONTACT</div>
              <div className="flex flex-wrap gap-x-5 gap-y-2 mb-7 text-[14px]">
                {m.phone && <a className="text-ink-2 hover:text-accent transition-colors" href={`tel:${m.phone}`}>{m.phone}</a>}
                {m.linkedin && <a className="text-ink-2 hover:text-accent transition-colors" href={m.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>}
                {m.github && <a className="text-ink-2 hover:text-accent transition-colors" href={m.github} target="_blank" rel="noopener noreferrer">GitHub ↗</a>}
              </div>

              <div className="flex gap-2.5">
                <a className={`${btnPrimary} h-10 px-5 text-sm rounded-[var(--radius-sm)]`} href={contactHref}>
                  Work with {m.name.split(" ")[0]} <ArrowRight />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 md:mt-20">
          <div className="mono text-[12px] text-ink-3 mb-3.5 tracking-[0.02em]">Team expertise</div>
          <h3 className="font-medium leading-[1] tracking-[-0.03em] mb-8" style={{ fontSize: "clamp(26px,3vw,40px)" }}>Skills our clients hire us for.</h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {expertise.map((g) => (
              <div key={g.group} className="rounded-[var(--radius)] border border-line bg-bg-2 p-6">
                <div className="mono text-[10px] text-accent tracking-[0.08em] mb-4 uppercase">{g.group}</div>
                <div className="flex flex-wrap gap-1.5">
                  {g.items.map((s) => (
                    <Tag key={s}>{s}</Tag>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
