import Link from "next/link";

import { deriveInitials, formatPublishedDate } from "./brand-assets";
import PostIllustration from "./PostIllustration";
import { urlFor } from "../sanity/image";
import type { PostListItem } from "../sanity/types";

type Props = {
  post: PostListItem;
  delaySec?: number;
};

export default function PostCard({ post, delaySec = 0 }: Props) {
  const variant = ((post.variant ?? 1) - 1) % 9 || 9;
  const initials = post.author?.initials || deriveInitials(post.author?.name);
  const hasUploadedImage = !!post.coverImage?.asset?._ref;

  return (
    <Link
      href={`/blog/${post.slug}`}
      className={`pcard pcard--var-${variant} reveal`}
      style={{ ["--rd" as never]: `${delaySec}s` } as React.CSSProperties}
    >
      <div className="pcard__media">
        <div className="pcard__tag">{post.category}</div>
        <div className="pcard__readtime">{post.readTime} min</div>
        <div className="pcard__media-art">
          {hasUploadedImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={urlFor(post.coverImage!).width(640).height(440).fit("crop").url()}
              alt={post.coverImage?.alt || post.title}
              className="pcard__media-img"
            />
          ) : (
            <PostIllustration variant={variant} />
          )}
        </div>
      </div>
      <div className="pcard__body">
        <h3 className="pcard__h">{post.title}</h3>
        <p className="pcard__excerpt">{post.excerpt}</p>
        <div className="pcard__meta">
          <div className="pcard__avatar">{initials}</div>
          <span className="pcard__meta-author">{post.author?.name || "Editorial"}</span>
          <span className="pcard__meta-dot"></span>
          <span>{formatPublishedDate(post.publishedAt)}</span>
        </div>
      </div>
    </Link>
  );
}
