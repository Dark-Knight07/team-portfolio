import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { posts } from "@/lib/content";
import { site } from "@/lib/site";
import { ServiceArt, sceneForCategory } from "@/components/ServiceArt";
import { ArrowRight, Tag, btnGhost } from "@/components/ui";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = posts.find((x) => x.slug === slug);
  return p ? { title: p.title, description: p.excerpt } : {};
}

export default async function Post({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = posts.find((x) => x.slug === slug);
  if (!p) notFound();
  const more = posts.filter((x) => x.slug !== p.slug).slice(0, 2);

  return (
    <article className="pt-12 pb-[var(--pad-section)]">
      <div className="container">
        <Link href="/blog" className="mono text-[11px] tracking-[0.06em] text-ink-3 hover:text-ink transition-colors uppercase">← All articles</Link>
        <div className="max-w-[780px] mt-8">
          <div className="flex items-center gap-2 mb-5">
            <Tag>{p.category}</Tag>
            <span className="mono text-[10px] tracking-[0.06em] text-ink-3">{p.read} · {p.date}</span>
          </div>
          <h1 className="font-medium leading-[1] tracking-[-0.035em] mb-6" style={{ fontSize: "clamp(34px,4.6vw,58px)" }}>{p.title}</h1>
          <p className="text-ink-2 leading-[1.5] mb-10" style={{ fontSize: "clamp(17px,1.5vw,21px)" }}>{p.excerpt}</p>
        </div>
        <div className="relative aspect-[21/9] overflow-hidden rounded-[var(--radius)] border border-line mb-12">
          <ServiceArt scene={sceneForCategory(p.category)} className="h-full w-full" />
        </div>
        <div className="max-w-[720px] flex flex-col gap-6">
          {p.body.map((para, i) => (
            <p key={i} className="text-[17px] leading-[1.7] text-ink-2">{para}</p>
          ))}
          <div className="border-t border-line pt-8 mt-4 flex items-center justify-between flex-wrap gap-4">
            <span className="text-ink-3 text-sm">Written by the {site.name} engineering team.</span>
            <Link href="/#contact" className={`${btnGhost} h-10 px-4 text-[13px]`}>Talk to the team <ArrowRight /></Link>
          </div>
        </div>
        {more.length > 0 && (
          <div className="mt-20">
            <div className="eyebrow mb-6">Keep reading</div>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
              {more.map((m) => (
                <Link key={m.slug} href={`/blog/${m.slug}`} className="group block rounded-[var(--radius)] border border-line bg-bg-2 p-6 hover:border-line-3 transition-colors">
                  <Tag>{m.category}</Tag>
                  <h3 className="text-[19px] font-medium leading-[1.25] tracking-[-0.015em] mt-3">{m.title}</h3>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
