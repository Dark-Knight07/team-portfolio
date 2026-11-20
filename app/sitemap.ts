import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { posts, projects } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: site.url, changeFrequency: "monthly", priority: 1 },
    { url: `${site.url}/privacy`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${site.url}/terms`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${site.url}/blog`, changeFrequency: "weekly", priority: 0.7 },
    ...projects.map((p) => ({ url: `${site.url}/work/${p.slug}`, changeFrequency: "monthly" as const, priority: 0.6 })),
    ...posts.map((p) => ({ url: `${site.url}/blog/${p.slug}`, changeFrequency: "monthly" as const, priority: 0.5 })),
  ];
}
