import type { Metadata } from "next";
import { posts } from "@/lib/content";
import { PostCard } from "@/components/Blog";
import { SectionHeader } from "@/components/ui";

export const metadata: Metadata = {
  title: "Blog",
  description: "Notes on cloud, identity, Microsoft 365, AI, automation and DevOps.",
};

export default function BlogIndex() {
  return (
    <section className="pt-16 pb-[var(--pad-section)]">
      <div className="container">
        <SectionHeader index="05" label="Blog" kicker="From the blog" title="All articles." text="Notes on cloud, identity, Microsoft 365, AI, automation and DevOps." />
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {posts.map((p) => (
            <PostCard key={p.slug} p={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
