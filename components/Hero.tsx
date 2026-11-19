import { site, startHref, consultHref } from "@/lib/site";
import { team } from "@/lib/team";
import { services, process } from "@/lib/content";
import { ServiceArt } from "./ServiceArt";
import { HeroCanvas } from "./HeroCanvas";
import { TechOrbit } from "./TechOrbit";
import { ArrowRight, btnGhost, btnPrimary } from "./ui";

const frames = [0, 1, 2, 3, 4, 5, 6, 7];

type Word = { t: string; accent?: boolean; underline?: boolean };
const line1: Word[] = [{ t: "Engineering" }, { t: "Tomorrow.", accent: true }];
const line2: Word[] = [{ t: "Building" }, { t: "What's" }, { t: "Next.", underline: true }];

function Words({ words, start }: { words: Word[]; start: number }) {
  return (
    <>
      {words.map((w, i) => (
        <span key={w.t} aria-hidden="true" className="hero-word mr-[0.22em] inline-block last:mr-0" style={{ ["--w" as string]: start + i }}>
          {w.accent ? (
            <span className="serif text-accent">{w.t}</span>
          ) : w.underline ? (
            <span className="relative inline-block">
              {w.t}
              <span className="hero-underline absolute left-0 right-0 bottom-[0.04em] h-[0.06em] origin-left bg-accent opacity-70" />
            </span>
          ) : (
            w.t
          )}
        </span>
      ))}
    </>
  );
}

export function Hero() {
  return (
    <section id="top" className="hs-track hero-track relative h-[260svh] md:h-[340svh]">
      <div className="hero-sticky sticky top-0 h-svh overflow-hidden">
        <div className="absolute inset-[-1.5%] bg-bg will-change-transform" aria-hidden="true">
          {frames.map((i) => (
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

        <div className="hs-copy container relative flex h-full flex-col justify-center pb-10 pt-20 will-change-transform sm:pt-24">
          <div className="hero-in mb-6 flex flex-wrap items-center justify-between gap-x-4 gap-y-2 sm:mb-10" style={{ ["--i" as string]: 0 }}>
            <div className="eyebrow flex items-center gap-1.5">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" />
              {site.name} · {site.tagline}
            </div>
            <div className="mono hidden text-[11px] uppercase tracking-[0.06em] text-ink-3 sm:block">
              ◌ {services.length} service areas · {team.length} engineers · ⌖ {site.location} ⇄ {site.workingModel}
            </div>
          </div>

          <div className="grid items-center gap-8 lg:gap-6 lg:[grid-template-columns:minmax(0,1.25fr)_minmax(0,0.75fr)]">
            <div>
              <h1 aria-label="Engineering Tomorrow. Building What's Next." className="mb-6 text-[clamp(34px,9vw,64px)] [@media(max-height:700px)_and_(max-width:1023px)]:text-[clamp(30px,8vw,48px)] font-medium leading-[0.96] tracking-[-0.04em] sm:mb-9 lg:text-[clamp(40px,4.7vw,84px)]">
                <span className="block">
                  <Words words={line1} start={1} />
                </span>
                <span className="block">
                  <Words words={line2} start={3} />
                </span>
              </h1>
              <p className="hero-slide [@media(max-height:700px)_and_(max-width:1023px)]:hidden mb-6 max-w-[620px] text-[15px] leading-[1.45] tracking-[-0.01em] text-ink-2 sm:mb-8 sm:text-[clamp(16px,1.4vw,20px)]" style={{ ["--i" as string]: 5 }}>
                {site.legalName} is a remote-first engineering studio. We design, build and secure software, cloud infrastructure, AI automation and identity systems for teams that need technology to work in the real world.
              </p>
              <div className="hero-slide flex flex-wrap items-center gap-2.5" style={{ ["--i" as string]: 6 }}>
                <a className={`${btnPrimary} h-11 px-5 text-[14px] sm:h-12 sm:px-6 sm:text-[15px]`} href={startHref} data-track="cta_start_project" data-track-label="hero">
                  Start a project <ArrowRight />
                </a>
                <a className={`${btnGhost} h-11 px-5 text-[14px] sm:h-12 sm:px-6 sm:text-[15px]`} href={consultHref} data-track="cta_book_consultation" data-track-label="hero">
                  Book a consultation
                </a>
                <a className="px-2 py-2 text-[14px] text-ink-2 transition-colors hover:text-ink" href="#portfolio">
                  View our work ↓
                </a>
              </div>
            </div>
            <div className="hero-in hidden lg:block" style={{ ["--i" as string]: 4 }}>
              <TechOrbit />
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
              <div className="mono mb-4 text-[12px] uppercase tracking-[0.18em] text-accent">
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
                  <span className={`hs-lab${i} mono hidden whitespace-nowrap text-[10px] uppercase tracking-[0.12em] sm:block ${i === 0 ? "text-ink" : "text-ink-3"}`}>
                    {p.n} · {p.label}
                  </span>
                </div>
              ))}
            </div>
            <span className="relative h-3 w-24 sm:hidden">
              {process.map((p, i) => (
                <span key={p.n} className={`hs-ml${i} mono absolute right-0 top-0 text-[10px] uppercase tracking-[0.12em] text-ink-2`} style={{ opacity: i === 0 ? 1 : 0 }}>
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
