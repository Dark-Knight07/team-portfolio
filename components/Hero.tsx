import { site, contactHref } from "@/lib/site";
import { team } from "@/lib/team";
import { services, process } from "@/lib/content";
import { ServiceArt } from "./ServiceArt";
import { HeroCanvas } from "./HeroCanvas";
import { ArrowRight, btnGhost, btnPrimary } from "./ui";

const frameHues = [75, 90, 160, 200, 230, 265, 330, 25];

export function Hero() {
  return (
    <section id="top" className="hs-track hero-track relative h-[260svh] md:h-[340svh]">
      <div className="hero-sticky sticky top-0 h-svh overflow-hidden">
        <div className="absolute inset-[-1.5%] bg-bg will-change-transform" aria-hidden="true">
          {frameHues.map((_, i) => (
            <div
              key={i}
              className={`hs-f${i} absolute inset-y-0 left-0 right-0 will-change-[transform,opacity] md:left-[3%] md:-right-[3%]`}
              style={i === 0 ? { opacity: 1 } : { opacity: 0.004, transform: "scale(.94)" }}
            >
              <ServiceArt scene={i} className="h-full w-full" />
            </div>
          ))}
        </div>
        <div aria-hidden="true" className="hs-breathe pointer-events-none absolute inset-0" />
        <HeroCanvas />
        <div aria-hidden="true" className="hs-shade pointer-events-none absolute inset-0" style={{ background: "linear-gradient(to right, rgba(10,10,10,0.94) 0%, rgba(10,10,10,0.7) 36%, rgba(10,10,10,0.12) 76%, transparent 100%)" }} />
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-bg to-transparent" />
        <div aria-hidden="true" className="pointer-events-none absolute inset-0" style={{ boxShadow: "inset 0 0 160px 10px rgba(0,0,0,0.42)" }} />

        <div className="hs-copy container relative flex h-full flex-col justify-center pb-10 pt-24 will-change-transform">
          <div>
            <div className="hero-in flex items-center justify-between mb-12 flex-wrap gap-4" style={{ ["--i" as string]: 0 }}>
              <div className="eyebrow flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-accent inline-block" />
                {site.name} · {site.tagline}{site.established ? ` · est. ${site.established}` : ""}
              </div>
              <div className="mono text-[11px] text-ink-3 tracking-[0.06em] uppercase">
                ◌ {services.length} service areas · {team.length} engineers · ⌖ {site.location} ⇄ {site.workingModel}
              </div>
            </div>
            <h1 className="hero-slide font-medium leading-[0.92] tracking-[-0.045em] mb-12" style={{ fontSize: "clamp(48px, 7.6vw, 128px)", ["--i" as string]: 1 }}>
              We build <span className="serif text-accent">secure</span> cloud
              <br />
              and AI for{" "}
              <span className="relative inline-block">
                ambitious
                <span className="absolute left-0 right-0 bottom-[0.06em] opacity-60" style={{ height: "0.06em", background: "var(--accent)" }} />
              </span>{" "}
              teams.
            </h1>
            <div className="hero-slide grid grid-cols-1 gap-8 items-end md:gap-12 md:[grid-template-columns:minmax(0,1fr)_minmax(280px,420px)]" style={{ ["--i" as string]: 2 }}>
              <p className="text-ink-2 leading-[1.4] tracking-[-0.01em] max-w-[680px]" style={{ fontSize: "clamp(18px, 1.8vw, 24px)" }}>
                {site.name} is a modern, remote-first engineering team. We deliver Microsoft 365 and Entra ID administration, cloud and AWS engineering, DevOps and automation, AI integrations and web applications for teams that need technology to be secure, reliable and ready for real work.
              </p>
              <div className="flex gap-2.5 flex-wrap md:justify-end">
                <a className={`${btnPrimary} h-12 px-6 text-[15px]`} href="#services">
                  Our services <ArrowRight />
                </a>
                <a className={`${btnGhost} h-12 px-6 text-[15px]`} href={contactHref}>
                  Book intro call
                </a>
              </div>
            </div>
          </div>
        </div>

        <div aria-hidden="true" className="hs-cue pointer-events-none absolute bottom-7 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex">
          <span className="mono text-[10px] tracking-[0.2em] text-ink-3">SCROLL</span>
          <span className="h-9 w-px bg-gradient-to-b from-accent to-transparent" />
        </div>

        {process.map((p, i) => (
          <div key={p.n} aria-hidden="true" className={`hs-cap${i} pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 opacity-0 will-change-[transform,opacity]`}>
            <div className="container">
              <div className="mono mb-4 text-[12px] tracking-[0.18em] text-accent uppercase">
                {p.n} / {p.label}
              </div>
              <p className="max-w-[460px] text-[clamp(28px,3.6vw,52px)] font-medium leading-[1.02] tracking-[-0.035em]">{p.caption}</p>
            </div>
          </div>
        ))}

        <div aria-hidden="true" className="hs-rail pointer-events-none absolute bottom-8 left-0 right-0 opacity-0">
          <div className="container flex items-end justify-between gap-4">
            <div className="flex gap-2">
              {process.map((p, i) => (
                <div key={p.n} className="flex flex-col gap-2 sm:min-w-[132px]">
                  <span className={`hs-bar${i} h-[3px] w-10 rounded-full transition-colors duration-300 sm:w-full ${i === 0 ? "bg-accent" : "bg-white/15"}`} />
                  <span className={`hs-lab${i} mono hidden whitespace-nowrap text-[10px] tracking-[0.12em] sm:block uppercase ${i === 0 ? "text-ink" : "text-ink-3"}`}>
                    {p.n} · {p.label}
                  </span>
                </div>
              ))}
            </div>
            <span className="relative h-3 w-24 sm:hidden">
              {process.map((p, i) => (
                <span key={p.n} className={`hs-ml${i} mono absolute right-0 top-0 text-[10px] tracking-[0.12em] text-ink-2 uppercase`} style={{ opacity: i === 0 ? 1 : 0 }}>
                  {p.label}
                </span>
              ))}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
