import Link from "next/link";

import { deriveInitials, formatPublishedDate } from "./brand-assets";
import PostIllustration from "./PostIllustration";
import { urlFor } from "../sanity/image";
import type { PostListItem } from "../sanity/types";

type Props = {
  post: PostListItem;
  delaySec?: number;
};

const MEDIA_GRADIENTS: Record<number, string> = {
  1: "linear-gradient(135deg,#faead2 0%,#f3d5b2 100%)",
  2: "linear-gradient(135deg,#e8f0ee 0%,#bad9d4 100%)",
  3: "linear-gradient(135deg,#faf6ef 0%,#f8e4cc 100%)",
  4: "linear-gradient(135deg,#f5eddf 0%,#d9c7aa 100%)",
  5: "linear-gradient(135deg,#eaeeec 0%,#c9dbd7 100%)",
  6: "linear-gradient(135deg,#f8e4cc 0%,#e8b998 100%)",
  7: "linear-gradient(135deg,#faf6ef 0%,#bad9d4 100%)",
  8: "linear-gradient(135deg,#f5eddf 0%,#f3d5b2 100%)",
  9: "linear-gradient(135deg,#eaeeec 0%,#f0d5b2 100%)",
};

export default function PostCard({ post, delaySec = 0 }: Props) {
  const variant = ((post.variant ?? 1) - 1) % 9 || 9;
  const initials = post.author?.initials || deriveInitials(post.author?.name);
  const hasUploadedImage = !!post.coverImage?.asset?._ref;

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="reveal group relative flex flex-col overflow-hidden rounded-[var(--r-md)] border border-(--ink-line) bg-white shadow-[var(--sh-1)] transition-all duration-500 ease-(--e-out) hover:-translate-y-1.5 hover:border-[rgba(37,181,171,0.3)] hover:shadow-[var(--sh-3)] lg:rounded-[var(--r-lg)]"
      style={{ ["--rd" as never]: `${delaySec}s` } as React.CSSProperties}
    >
      <div
        className="relative aspect-[16/11] overflow-hidden"
        style={{ background: MEDIA_GRADIENTS[variant] }}
      >
        <div className="absolute left-3 top-3 z-[2] rounded-full bg-white/92 px-2.5 py-1 text-[10.5px] font-semibold uppercase tracking-[0.08em] text-(--c-teal) backdrop-blur-[6px] sm:left-4 sm:top-4 sm:text-[11px]">
          {post.category}
        </div>
        <div className="absolute right-3 top-3 z-[2] rounded-full bg-[rgba(31,26,20,0.7)] px-2.5 py-1 text-[10.5px] font-medium tracking-[0.02em] text-(--c-cream) backdrop-blur-[6px] sm:right-4 sm:top-4 sm:text-[11px]">
          {post.readTime} min
        </div>
        <div className="absolute inset-0 flex items-center justify-center transition-transform duration-1000 ease-(--e-out) group-hover:scale-[1.06] group-hover:-rotate-[1.5deg] [&_svg]:h-auto [&_svg]:max-h-[65%] [&_svg]:w-[55%]">
          {hasUploadedImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={urlFor(post.coverImage!).width(640).height(440).fit("crop").url()}
              alt={post.coverImage?.alt || post.title}
              className="block h-full w-full object-cover"
            />
          ) : (
            <PostIllustration variant={variant} />
          )}
        </div>
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_50%,rgba(31,26,20,0.08)_100%)]" />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5 pb-5.5 sm:gap-3.5 sm:p-5.5 sm:pb-6 lg:p-6.5 lg:pb-7">
        <h3 className="text-[17px] font-semibold leading-[1.22] tracking-[-0.014em] text-(--ink-1) sm:text-lg lg:text-xl">
          {post.title}
        </h3>
        <p className="text-[13.5px] leading-[1.55] text-(--ink-2) sm:text-sm lg:text-[14.5px]">
          {post.excerpt}
        </p>
        <div className="mt-auto flex items-center gap-2.5 border-t border-(--ink-line) pt-3.5 text-xs text-(--ink-3) sm:gap-3 lg:text-[12.5px]">
          <div className="flex h-6.5 w-6.5 shrink-0 items-center justify-center rounded-full bg-[linear-gradient(135deg,var(--c-peach)_0%,var(--c-teal-light)_100%)] text-[11px] font-bold text-(--ink-1)">
            {initials}
          </div>
          <span className="font-medium text-(--ink-2)">{post.author?.name || "Editorial"}</span>
          <span className="h-[3px] w-[3px] rounded-full bg-(--ink-3)" />
          <span>{formatPublishedDate(post.publishedAt)}</span>
        </div>
      </div>
    </Link>
  );
}
