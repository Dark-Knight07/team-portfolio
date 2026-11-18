import { services } from "@/lib/content";
import { contactHref } from "@/lib/site";
import { ServiceArt } from "./ServiceArt";
import { ArrowRight, ArrowUpRight, SectionHeader, btnGhost, btnPrimary } from "./ui";

export function Services() {
  return (
    <section id="services" className="py-[var(--pad-section)] relative">
      <div className="container">
        <SectionHeader
          index="01"
          label="Services"
          kicker="What we do"
          title="Cloud, identity and AI, under one roof."
          text="Eight practice areas covering the full stack of modern IT. Pick a starting point, or skip straight to a conversation."
        />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-12">
          {services.map((s, i) => (
            <article
              key={s.id}
              id={s.id}
              className={`reveal-zoom group relative overflow-hidden rounded-[var(--radius)] border border-line bg-bg-2 min-h-[300px] ${s.tall ? "md:min-h-[380px]" : ""} ${s.span}`}
            >
              <ServiceArt scene={i} className="absolute inset-0 h-full w-full transition-transform duration-700 group-hover:scale-105" />
              <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-bg via-bg/70 to-bg/10" />
              <div className="relative flex h-full min-h-[inherit] flex-col justify-between p-6 md:p-7">
                <span className="mono text-[11px] text-accent tracking-[0.08em]">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="text-[clamp(22px,2.2vw,30px)] font-medium tracking-[-0.025em] leading-[1.1] mb-3">
                    <a className="hover:text-accent transition-colors" href={contactHref}>{s.title}</a>
                  </h3>
                  <ul className="flex flex-wrap gap-x-4 gap-y-1.5 text-[13px] text-ink-2">
                    {s.items.map((it) => (
                      <li key={it}>
                        <a className="inline-flex items-center gap-1 hover:text-ink transition-colors" href={contactHref}>
                          {it}
                          <span className="text-ink-4 group-hover:text-accent transition-colors"><ArrowUpRight /></span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          ))}
        </div>
        <div className="flex gap-3 mt-8 flex-wrap">
          <a className={`${btnGhost} h-11 px-5 text-[14px]`} href="#process">
            How we work <ArrowRight />
          </a>
          <a className={`${btnPrimary} h-11 px-5 text-[14px]`} href={contactHref}>
            Get in touch <ArrowRight />
          </a>
        </div>
      </div>
    </section>
  );
}
