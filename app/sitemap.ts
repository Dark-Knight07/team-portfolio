import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { posts } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: site.url, changeFrequency: "monthly", priority: 1 },
    { url: `${site.url}/blog`, changeFrequency: "weekly", priority: 0.7 },
    ...posts.map((p) => ({ url: `${site.url}/blog/${p.slug}`, changeFrequency: "monthly" as const, priority: 0.5 })),
  ];
}
