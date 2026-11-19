import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects, getProject } from "@/lib/projects";
import { team } from "@/lib/team";
import { site } from "@/lib/site";
import { ServiceArt } from "@/components/ServiceArt";
import { ArrowRight, ArrowUpRight, Tag, btnGhost, btnPrimary } from "@/components/ui";

const sceneFor: Record<string, number> = { Cloud: 0, AI: 3, Web: 4, DevOps: 5 };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return {};
  return { title: `${p.title}: case study`, description: p.summary, openGraph: { title: `${p.title} | ${site.name}`, description: p.summary } };
}

function Block({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <section className="grid grid-cols-1 gap-3 border-t border-line py-8 md:[grid-template-columns:200px_minmax(0,1fr)] md:gap-10 md:py-10">
      <h2 className="mono text-[11px] uppercase tracking-[0.1em] text-accent">{label}</h2>
      <div className="min-w-0">{children}</div>
    </section>
  );
}

export default async function CaseStudy({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) notFound();
  const i = projects.findIndex((x) => x.slug === p.slug);
  const next = projects[(i + 1) % projects.length];
  const members = team.filter((m) => p.team.includes(m.slug));

  return (
    <article className="pb-[var(--pad-section)] pt-10 md:pt-14">
      <div className="container">
        <Link href="/#portfolio" className="mono text-[11px] uppercase tracking-[0.06em] text-ink-3 transition-colors hover:text-ink">
          ← All case studies
        </Link>

        <header className="mt-8 grid grid-cols-1 gap-8 lg:[grid-template-columns:minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-end">
          <div>
            <div className="mb-5 flex flex-wrap items-center gap-2">
              <Tag accent={p.kind === "Demonstration project"}>{p.kind}</Tag>
              <Tag>{p.category}</Tag>
              <Tag>{p.year}</Tag>
            </div>
            <h1 className="mb-5 font-medium leading-[0.98] tracking-[-0.035em]" style={{ fontSize: "clamp(34px,5vw,68px)" }}>{p.title}</h1>
            <p className="max-w-[640px] leading-[1.5] text-ink-2" style={{ fontSize: "clamp(16px,1.5vw,20px)" }}>{p.summary}</p>
          </div>
          <div className="flex flex-wrap gap-2.5 lg:justify-end">
            {p.demo && (
              <a className={`${btnPrimary} h-12 px-6 text-[15px]`} href={p.demo} data-track="project_demo_click" data-track-label={p.slug} target="_blank" rel="noopener noreferrer">
                View live demo <ArrowUpRight size={14} />
              </a>
            )}
            <a className={`${btnGhost} h-12 px-6 text-[15px]`} href={p.repo} data-track="project_source_click" data-track-label={p.slug} target="_blank" rel="noopener noreferrer">
              Source on GitHub <ArrowUpRight size={14} />
            </a>
          </div>
        </header>

        <div className={`mt-10 grid gap-4 ${p.screenshots.length > 1 ? "md:grid-cols-2" : ""}`}>
          {p.screenshots.length ? (
            p.screenshots.map((s, k) => (
              <figure key={s.src} className="overflow-hidden rounded-[var(--radius)] border border-line bg-bg-2">
                <div className="relative aspect-[16/10]">
                  <Image src={s.src} alt={s.alt} fill priority={k === 0} sizes={p.screenshots.length > 1 ? "(min-width:768px) 50vw, 100vw" : "(min-width:1320px) 1240px, 100vw"} className="object-cover object-top" />
                </div>
                <figcaption className="border-t border-line px-4 py-2.5 text-[12px] text-ink-3">{s.alt}</figcaption>
              </figure>
            ))
          ) : (
            <div className="relative aspect-[21/9] overflow-hidden rounded-[var(--radius)] border border-line">
              <ServiceArt scene={sceneFor[p.category] ?? 0} className="h-full w-full" />
              <div className="absolute bottom-3 left-4 rounded-[6px] bg-black/50 px-2 py-1 text-[11px] text-ink-3">No public screenshot: this project runs locally or on a schedule. See the source for details.</div>
            </div>
          )}
        </div>

        <div className="mt-10 md:mt-14">
          <Block label="Overview">
            <p className="max-w-[720px] text-[17px] leading-[1.7] text-ink-2">{p.overview}</p>
            <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
              {p.highlights.map((h) => (
                <li key={h} className="flex gap-3 text-[14px] leading-[1.5] text-ink-2">
                  <span className="mono pt-[3px] text-[11px] text-accent">→</span>
                  {h}
                </li>
              ))}
            </ul>
          </Block>
          <Block label="The problem">
            <p className="max-w-[720px] text-[17px] leading-[1.7] text-ink-2">{p.problem}</p>
          </Block>
          <Block label="The solution">
            <p className="max-w-[720px] text-[17px] leading-[1.7] text-ink-2">{p.solution}</p>
          </Block>
          <Block label="Architecture">
            <ol className="flex max-w-[820px] flex-col">
              {p.architecture.map((a, k) => (
                <li key={a.layer} className="relative grid gap-1 border-l border-line-2 pb-6 pl-6 last:pb-0 sm:[grid-template-columns:170px_minmax(0,1fr)] sm:gap-6">
                  <span className="absolute -left-[5px] top-[6px] h-[9px] w-[9px] rounded-full border border-accent bg-bg" aria-hidden="true" />
                  <div className="text-[14px] font-medium tracking-[-0.005em]">
                    <span className="mono mr-2 text-[10px] text-ink-3">{String(k + 1).padStart(2, "0")}</span>
                    {a.layer}
                  </div>
                  <p className="text-[14px] leading-[1.6] text-ink-2">{a.detail}</p>
                </li>
              ))}
            </ol>
          </Block>
          <Block label="Technologies">
            <div className="flex flex-wrap gap-1.5">
              {p.technologies.map((t) => (
                <Tag key={t}>{t}</Tag>
              ))}
            </div>
          </Block>
          <Block label="Team contributions">
            <ul className="mb-6 flex max-w-[720px] flex-col gap-2.5">
              {p.contributions.map((c) => (
                <li key={c} className="flex gap-3 text-[15px] leading-[1.55] text-ink-2">
                  <span className="mono pt-[3px] text-[11px] text-accent">→</span>
                  {c}
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-2">
              {members.map((m) => (
                <Link key={m.slug} href="/#team" className="inline-flex items-center gap-2 rounded-full border border-line-2 px-3 py-1.5 text-[13px] text-ink-2 transition-colors hover:border-line-3 hover:text-ink">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                  {m.name}
                </Link>
              ))}
            </div>
          </Block>
          <Block label="About this project">
            <p className="max-w-[720px] text-[14px] leading-[1.65] text-ink-3">
              {p.kind === "Demonstration project"
                ? "This is a demonstration project built to show how we design and engineer this kind of system. It is not a client engagement, and any data you see in it is simulated."
                : "This is a personal project built by a member of our team. It is not a client engagement."}{" "}
              Details on this page are taken from the project&apos;s public repository.
            </p>
          </Block>
        </div>

        <div className="mt-6 grid gap-4 rounded-[var(--radius)] border border-line bg-bg-2 p-6 md:grid-cols-[1fr_auto] md:items-center md:p-8">
          <div>
            <h2 className="text-[22px] font-medium tracking-[-0.02em]">Need something like this?</h2>
            <p className="mt-1 text-[14px] text-ink-2">Tell us what you want to build and we will scope it with you.</p>
          </div>
          <div className="flex flex-wrap gap-2.5">
            <Link className={`${btnPrimary} h-11 px-5 text-[14px]`} href="/#start">
              Start a project <ArrowRight />
            </Link>
            <Link className={`${btnGhost} h-11 px-5 text-[14px]`} href="/#consultation">
              Book a consultation
            </Link>
          </div>
        </div>

        <Link href={`/work/${next.slug}`} className="group mt-10 flex items-center justify-between gap-6 border-t border-line pt-8">
          <div>
            <div className="mono mb-1 text-[10px] uppercase tracking-[0.1em] text-ink-3">Next case study</div>
            <div className="text-[clamp(22px,2.6vw,34px)] font-medium tracking-[-0.025em] transition-colors group-hover:text-accent">{next.title}</div>
          </div>
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[8px] border border-line-2 text-ink-2 transition-all group-hover:border-accent group-hover:bg-accent group-hover:text-black">
            <ArrowRight />
          </span>
        </Link>
      </div>
    </article>
  );
}
