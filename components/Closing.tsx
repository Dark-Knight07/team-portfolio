import Link from "next/link";
import { faqs } from "@/lib/content";
import { team } from "@/lib/team";
import { site, contactHref } from "@/lib/site";
import { ServiceArt } from "./ServiceArt";
import { LogoMark } from "./Logo";
import { ArrowRight, SectionHeader, btnGhost, btnPrimary } from "./ui";

export function Faq() {
  return (
    <section id="faq" className="py-[var(--pad-section)] relative">
      <div className="container">
        <SectionHeader index="06" label="FAQ" kicker="Good questions" title="Questions, answered." />
        <div className="max-w-[820px] border-t border-line">
          {faqs.map((f) => (
            <details key={f.q} className="reveal group border-b border-line py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-[clamp(17px,1.6vw,21px)] font-medium tracking-[-0.015em] [&::-webkit-details-marker]:hidden">
                {f.q}
                <span aria-hidden="true" className="mono text-[18px] text-accent transition-transform duration-200 group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 max-w-[680px] text-[15px] leading-[1.65] text-ink-2">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Cta() {
  return (
    <section id="contact" className="relative overflow-hidden border-t border-line py-[clamp(96px,16vh,200px)]">
      <ServiceArt scene={0} className="absolute inset-0 h-full w-full opacity-60" />
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-bg via-bg/55 to-bg" />
      <div className="container relative text-center">
        <div className="reveal eyebrow inline-flex items-center gap-1.5 mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-accent inline-block" />
          Taking new work
        </div>
        <h2 className="reveal font-medium leading-[0.95] tracking-[-0.04em] mx-auto max-w-[1000px] mb-8" style={{ fontSize: "clamp(44px, 7.5vw, 112px)" }}>
          Have something <span className="serif text-accent">worth building?</span>
        </h2>
        <p className="reveal mx-auto max-w-[560px] text-ink-2 text-[clamp(17px,1.5vw,20px)] leading-[1.5] mb-10">
          Tell us what you&apos;re trying to make or fix. You&apos;ll hear back from the engineers who would actually do the work.
        </p>
        <div className="reveal flex flex-wrap justify-center gap-3">
          <a className={`${btnPrimary} h-13 px-7 text-[16px]`} href={contactHref}>
            Start a project <ArrowRight />
          </a>
          <a className={`${btnGhost} h-13 px-7 text-[16px] backdrop-blur-sm`} href={contactHref}>
            Book intro call
          </a>
        </div>
        {site.email && <p className="reveal mono text-[12px] text-ink-3 tracking-[0.06em] mt-8">{site.email}</p>}
        <div className="reveal mt-14 mx-auto max-w-[920px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-left">
          {team.filter((m) => m.phone).map((m) => (
            <a key={m.slug} href={`tel:${m.phone}`} className="group rounded-[var(--radius-sm)] border border-line-2 bg-bg-2/70 backdrop-blur-sm px-4 py-3.5 hover:border-line-3 hover:bg-bg-3 transition-colors">
              <div className="text-[14px] font-medium tracking-[-0.005em]">{m.name}</div>
              <div className="text-[12px] text-ink-3 mb-2">{m.title}</div>
              <div className="mono text-[12px] text-accent tracking-[0.04em]">{m.phone}</div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  const cols = [
    { h: "Team", links: [["Work", "/#portfolio"], ["Services", "/#services"], ["Process", "/#process"], ["Team", "/#team"], ["Blog", "/blog"]] },
    { h: "Expertise", links: [["Cloud & AWS", "/#services"], ["Identity & Access", "/#services"], ["Microsoft 365", "/#services"], ["AI & Automation", "/#services"]] },
    { h: "Company", links: [["Contact", contactHref], ["FAQ", "/#faq"], ...site.socials.map((s) => [s.label, s.href])] },
  ];
  return (
    <footer className="border-t border-line pt-20 pb-10 relative overflow-hidden">
      <div className="container">
        <div className="grid grid-cols-1 gap-10 mb-14 md:gap-12 md:mb-20 md:[grid-template-columns:2fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2.5 mb-[18px]">
              <LogoMark size={32} />
              <span className="font-semibold text-[17px] tracking-[-0.01em]">{site.name}</span>
            </div>
            <p className="text-sm text-ink-2 leading-[1.55] max-w-xs mb-2">{site.tagline}</p>
            <p className="mono text-[10px] text-ink-3 tracking-[0.06em] uppercase max-w-xs mb-6">{site.positioning.join(" · ")}</p>
            <div className="flex flex-col gap-1 text-[13px] text-ink-3 mb-4">
              {site.email && <a href={`mailto:${site.email}`} className="hover:text-ink transition-colors w-fit">{site.email}</a>}
              {site.phone && <a href={`tel:${site.phone}`} className="hover:text-ink transition-colors w-fit">{site.phone}</a>}
            </div>
            <div className="mono text-[11px] text-ink-3 tracking-[0.06em] leading-relaxed uppercase">⌖ {site.location} ⇄ {site.workingModel}</div>
          </div>
          <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:contents">
            {cols.map((c) => (
              <div key={c.h}>
                <div className="mono text-[10px] text-ink-3 tracking-[0.06em] mb-[18px] uppercase">{c.h}</div>
                <ul className="flex flex-col gap-2.5">
                  {c.links.map(([l, h]) => (
                    <li key={l}>
                      <a className="text-sm text-ink-2 hover:text-ink transition-colors duration-150" href={h}>{l}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="overflow-hidden my-10">
          <div className="leading-[0.85] font-medium select-none whitespace-nowrap overflow-hidden" style={{ fontSize: "clamp(52px, 17vw, 260px)", letterSpacing: "-0.05em", color: "transparent", WebkitTextStroke: "1px var(--line-2)" }}>
            {site.name}
            <span className="serif" style={{ color: "var(--accent)", WebkitTextStroke: 0 }}>·</span>
          </div>
        </div>
        <div className="flex justify-between items-center pt-8 border-t border-line flex-wrap gap-4">
          <span className="mono text-[11px] text-ink-3 tracking-[0.06em] uppercase">© {new Date().getFullYear()} {site.legalName}</span>
          <Link href="/#top" className="mono text-[11px] text-ink-3 tracking-[0.06em] hover:text-ink-2 transition-colors uppercase">Back to top ↑</Link>
        </div>
      </div>
    </footer>
  );
}
