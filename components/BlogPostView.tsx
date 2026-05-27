import Link from "next/link";

import BackToTop from "./BackToTop";
import InlineNewsletterForm from "./InlineNewsletterForm";
import PortableBody from "./PortableBody";
import PostCard from "./PostCard";
import { FeaturedRibbon } from "./PostIllustration";
import ReadingProgress from "./ReadingProgress";
import ShareRow from "./ShareRow";
import Toc from "./Toc";
import { deriveInitials, formatPublishedDate } from "./brand-assets";
import { urlFor } from "../sanity/image";
import type { Post, PostListItem } from "../sanity/types";

type Props = {
  post: Post;
  related: PostListItem[];
};

export default function BlogPostView({ post, related }: Props) {
  const initials = post.author?.initials || deriveInitials(post.author?.name);
  const hasCover = !!post.coverImage?.asset?._ref;
  const variant = ((post.variant ?? 1) - 1) % 9 || 9;

  return (
    <>
      <ReadingProgress />
      <article className="post">
        <header className="post__header">
          <div className="container container--narrow">
            <div className="post__back reveal">
              <Link href="/" className="post__back-link">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
                Back to the journal
              </Link>
            </div>

            <div className="post__eyebrow reveal">
              <Link
                className="post__category"
                href={`/?category=${encodeURIComponent(post.category)}`}
              >
                {post.category}
              </Link>
              <span className="post__dot" />
              <span>{post.readTime} min read</span>
              <span className="post__dot" />
              <time dateTime={post.publishedAt}>{formatPublishedDate(post.publishedAt)}</time>
            </div>

            <h1 className="post__title reveal">{post.title}</h1>

            {post.excerpt ? <p className="post__lede reveal">{post.excerpt}</p> : null}

            <div className="post__byline reveal">
              <div className="post__avatar-lg">{initials}</div>
              <div className="post__byline-text">
                <div className="post__byline-name">{post.author?.name || "Editorial"}</div>
                <div className="post__byline-meta">
                  Published {formatPublishedDate(post.publishedAt)} · {post.category}
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className={`post__cover post__cover--var-${variant} reveal`}>
          <div className="container">
            <div className="post__cover-frame">
              {hasCover ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={urlFor(post.coverImage!).width(1600).height(900).fit("crop").url()}
                  alt={post.coverImage?.alt || post.title}
                />
              ) : (
                <FeaturedRibbon />
              )}
            </div>
          </div>
        </div>

        <div className="container post__body-wrap reveal">
          <div className="post__body">
            <div className="post__share-top">
              <ShareRow title={post.title} slug={post.slug} />
            </div>

            <PortableBody value={post.body} />

            <div className="post__tags reveal">
              <span className="post__tag-label">Filed under</span>
              <Link className="post__tag" href={`/?category=${encodeURIComponent(post.category)}`}>
                # {post.category}
              </Link>
            </div>

            <div className="post__share-bottom">
              <ShareRow title={post.title} slug={post.slug} />
            </div>
          </div>

          <Toc value={post.body} />
        </div>

        {/* Inline newsletter CTA */}
        <aside className="post__cta container container--narrow reveal">
          <div className="post__cta-inner">
            <div>
              <div className="post__cta-eyebrow">The journal · weekly</div>
              <h3>Get one science-grounded read like this every week.</h3>
              <p>No fluff, no fads, no spam. Unsubscribe in one click.</p>
            </div>
            <InlineNewsletterForm />
          </div>
        </aside>

        {post.author?.bio ? (
          <aside className="post__author container container--narrow reveal">
            <div className="post__author-avatar">{initials}</div>
            <div>
              <div className="post__author-name">{post.author.name}</div>
              <p className="post__author-bio">{post.author.bio}</p>
            </div>
          </aside>
        ) : null}
      </article>

      {related.length ? (
        <section className="related">
          <div className="container">
            <div className="related__head reveal">
              <h2 className="related__title">Keep reading</h2>
              <Link href="/" className="related__all">
                Browse the journal →
              </Link>
            </div>
            <div className="related__grid">
              {related.map((r, i) => (
                <PostCard key={r._id} post={r} delaySec={i * 0.06} />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <BackToTop />
    </>
  );
}
