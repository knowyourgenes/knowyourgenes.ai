import type { MetadataRoute } from "next";
import { siteConfig } from "../lib/siteConfig";
import { getAllPostsFull } from "../sanity/fetch";

const BASE = siteConfig.siteUrl;

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
  ];

  // CMS-driven routes. Wrapped so the static routes still emit if Sanity is down.
  let postRoutes: MetadataRoute.Sitemap = [];
  try {
    const posts = await getAllPostsFull();
    postRoutes = posts
      .filter((post) => Boolean(post.slug))
      .map((post) => {
        const published = post.publishedAt ? new Date(post.publishedAt) : now;
        const lastModified = Number.isNaN(published.getTime()) ? now : published;
        return {
          url: `${BASE}/blog/${post.slug}`,
          lastModified,
          changeFrequency: "monthly" as const,
          priority: 0.7,
        };
      });
  } catch (err) {
    console.warn("[sitemap] CMS fetch failed, emitting static routes only:", err);
  }

  // Dedupe by URL.
  const seen = new Set<string>();
  return [...staticRoutes, ...postRoutes].filter((entry) => {
    if (seen.has(entry.url)) return false;
    seen.add(entry.url);
    return true;
  });
}
