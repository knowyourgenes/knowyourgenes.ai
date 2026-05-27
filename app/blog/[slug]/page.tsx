import type { Metadata } from "next";
import { notFound } from "next/navigation";

import BlogPostView from "../../../components/BlogPostView";
import SiteFooter from "../../../components/SiteFooter";
import SiteNav from "../../../components/SiteNav";
import { getAllPostSlugs, getPostBySlug, getRelatedPosts } from "../../../sanity/fetch";

export const revalidate = 60;

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Article not found · knowyourgenes.ai" };
  return {
    title: `${post.title} · knowyourgenes.ai`,
    description: post.excerpt,
  };
}

export default async function BlogPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();
  const related = await getRelatedPosts(post.category, post.slug);

  return (
    <>
      <SiteNav />
      <BlogPostView post={post} related={related} />
      <SiteFooter />
    </>
  );
}
