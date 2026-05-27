import { client } from "./client";
import { isSanityConfigured } from "./env";
import {
  ALL_SLUGS_QUERY,
  FEATURED_POST_QUERY,
  POSTS_QUERY,
  POST_BY_SLUG_QUERY,
  RELATED_POSTS_QUERY,
} from "./queries";
import type { Post, PostListItem } from "./types";

async function safeFetch<T>(
  query: string,
  params: Record<string, unknown>,
  fallback: T,
): Promise<T> {
  if (!isSanityConfigured) return fallback;
  try {
    return await client.fetch<T>(query, params, { next: { revalidate: 60 } });
  } catch (err) {
    console.warn("[sanity] fetch failed:", err);
    return fallback;
  }
}

export async function getFeaturedPost(): Promise<Post | null> {
  const result = await safeFetch<Post | null>(FEATURED_POST_QUERY, {}, null);
  return result ?? null;
}

export async function getPosts(): Promise<PostListItem[]> {
  const result = await safeFetch<PostListItem[]>(POSTS_QUERY, {}, []);
  return result ?? [];
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const result = await safeFetch<Post | null>(POST_BY_SLUG_QUERY, { slug }, null);
  return result ?? null;
}

export async function getRelatedPosts(category: string, slug: string): Promise<PostListItem[]> {
  const result = await safeFetch<PostListItem[]>(RELATED_POSTS_QUERY, { category, slug }, []);
  return result ?? [];
}

export async function getAllPostSlugs(): Promise<string[]> {
  const result = await safeFetch<string[]>(ALL_SLUGS_QUERY, {}, []);
  return result ?? [];
}
