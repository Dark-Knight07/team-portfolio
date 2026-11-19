import Link from "next/link";
import { posts } from "@/lib/content";
import { ServiceArt, sceneForCategory } from "./ServiceArt";
import { ArrowRight, SectionHeader, Tag, btnGhost } from "./ui";

export function PostCard({ p }: { p: (typeof posts)[number] }) {
  return (
    <Link className="reveal-zoom group block" href={`/blog/${p.slug}`}>
      <article className="h-full overflow-hidden rounded-[var(--radius)] border border-line bg-bg-2 transition-colors group-hover:border-line-3">
        <div className="relative aspect-video overflow-hidden bg-bg-3">
          <ServiceArt scene={sceneForCategory(p.category)} className="h-full w-full transition-transform duration-700 group-hover:scale-105" />
        </div>
        <div className="flex flex-col gap-3 p-6">
          <div className="flex items-center gap-2">
            <Tag>{p.category}</Tag>
            <span className="mono text-[10px] tracking-[0.06em] text-ink-3">{p.read} · {p.date}</span>
          </div>
          <h3 className="text-[19px] font-medium leading-[1.25] tracking-[-0.015em]">{p.title}</h3>
          <p className="line-clamp-2 text-[14px] leading-[1.55] text-ink-2">{p.excerpt}</p>
        </div>
      </article>
    </Link>
  );
}

export function Blog() {
  return (
    <section id="blog" className="py-[var(--pad-section)] relative">
      <div className="container">
        <SectionHeader index="05" label="Blog" kicker="From the blog" title="Latest from the blog." text="Notes on cloud, identity, Microsoft 365, AI and automation from the engineers doing the work." />
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {posts.slice(0, 3).map((p) => (
            <PostCard key={p.slug} p={p} />
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link className={`${btnGhost} h-11 px-6 text-sm`} href="/blog">
            Read the blog <ArrowRight />
          </Link>
        </div>
      </div>
    </section>
  );
}
