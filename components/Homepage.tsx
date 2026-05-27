"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";

import { CATEGORY_FILTERS, formatPublishedDate, type FilterValue } from "./brand-assets";
import PostCard from "./PostCard";
import { FeaturedRibbon } from "./PostIllustration";
import { urlFor } from "../sanity/image";
import type { Post, PostListItem } from "../sanity/types";

type CssVars = CSSProperties & { [k: `--${string}`]: string | number };

type Props = {
  posts: PostListItem[];
  featuredPost: Post | null;
  initialCategory?: FilterValue;
};

const PAGE_SIZE = 9;
const PAGE_INCREMENT = 10;

export default function Homepage({ posts, featuredPost, initialCategory = "All" }: Props) {
  const [activeChip, setActiveChip] = useState<FilterValue>(initialCategory);
  const [query, setQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const headRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const trimmedQuery = query.trim();
  const isFiltered = activeChip !== "All" || trimmedQuery.length > 0;

  // When filtering/searching, the featured post joins the regular pool so it
  // can match search and category queries (otherwise it lives separately in the
  // Editor's Pick card above the grid).
  const searchPool = useMemo<PostListItem[]>(() => {
    if (isFiltered && featuredPost) return [featuredPost, ...posts];
    return posts;
  }, [isFiltered, featuredPost, posts]);

  const filteredPosts = useMemo(() => {
    const q = trimmedQuery.toLowerCase();
    return searchPool.filter((p) => {
      const catMatch = activeChip === "All" || p.category === activeChip;
      if (!catMatch) return false;
      if (!q) return true;
      const haystack = [p.title, p.excerpt, p.category, p.author?.name]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [searchPool, activeChip, trimmedQuery]);

  // Reset pagination whenever filter or search changes.
  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [activeChip, query]);

  // When filter or search becomes active, scroll the results into view so the
  // user immediately sees them below the now-pinned filter bar.
  useEffect(() => {
    if (!isFiltered) return;
    const id = requestAnimationFrame(() => scrollToHead());
    return () => cancelAnimationFrame(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFiltered]);

  const displayedPosts = filteredPosts.slice(0, visibleCount);
  const hasMore = visibleCount < filteredPosts.length;

  const headingText = trimmedQuery ? `Results for “${trimmedQuery}”` : "Latest from the journal";

  const scrollToHead = () => {
    const el = headRef.current;
    if (!el) return;
    // sticky nav (~70px) + filter pill (~75px including its top padding) + 25px breathing room
    const offset = 170;
    const top = el.getBoundingClientRect().top + window.scrollY - offset;
    if (Math.abs(top - window.scrollY) > 8) {
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  const onLoadMore = () => {
    setVisibleCount((c) => Math.min(c + PAGE_INCREMENT, filteredPosts.length));
  };

  const featuredHasImage = !!featuredPost?.coverImage?.asset?._ref;

  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="container container--narrow">
          <h1 className="hero__h reveal" style={{ "--rd": ".1s" } as CssVars}>
            Genomic wellness,{" "}
            <em>
              <span className="grad-text">decoded for real life.</span>
            </em>
          </h1>

          <p className="hero__sub reveal" style={{ "--rd": ".2s" } as CssVars}>
            Bite-sized reads on how your DNA shapes nutrition, fitness, sleep, recovery, and the
            long arc of preventive care. Written for South Asian biology, written for the everyday.
            No jargon, no fad science, no diet wars. Just what the research says, plainly, with what
            to do about it.
          </p>

          <div className="hero__scroll reveal" style={{ "--rd": ".35s" } as CssVars}>
            Read on
            <div className="hero__scroll-line"></div>
          </div>
        </div>
      </section>

      {/* FEATURED POST — hidden while user is actively filtering or searching,
          since the featured post then joins the regular results below. */}
      {featuredPost && !isFiltered ? (
        <section className="featured">
          <div className="container">
            <Link href={`/blog/${featuredPost.slug}`} className="featured__card reveal">
              <div className="featured__media">
                <div className="featured__pill">
                  <span className="featured__pill-dot"></span>
                  Editor&apos;s Pick
                </div>
                <div className="featured__media-art">
                  {featuredHasImage ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={urlFor(featuredPost.coverImage!)
                        .width(900)
                        .height(720)
                        .fit("crop")
                        .url()}
                      alt={featuredPost.coverImage?.alt || featuredPost.title}
                      className="featured__media-img"
                    />
                  ) : (
                    <FeaturedRibbon />
                  )}
                </div>
              </div>
              <div className="featured__body">
                <div className="featured__tag">
                  {featuredPost.category} · {featuredPost.readTime} min read
                </div>
                <h2 className="featured__h">{featuredPost.title}</h2>
                <p className="featured__excerpt">{featuredPost.excerpt}</p>
                <div className="featured__meta">
                  <span>By {featuredPost.author?.name || "Editorial"}</span>
                  <span className="featured__meta-dot"></span>
                  <span>{formatPublishedDate(featuredPost.publishedAt)}</span>
                  <span className="featured__meta-dot"></span>
                  <span>{featuredPost.category}</span>
                </div>
                <span className="featured__cta">
                  Read the full article
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14M13 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </Link>
          </div>
        </section>
      ) : null}

      {posts.length === 0 ? (
        /* JOURNAL IS EMPTY — point editors to Studio */
        <section className="posts">
          <div className="container">
            <div className="posts__head reveal">
              <h2 className="posts__title">Latest from the journal</h2>
            </div>
            <div className="posts__empty posts__empty--first reveal">
              <div className="posts__empty-h">The journal is empty.</div>
              <p>
                Once you publish your first article in Sanity Studio, it will appear here
                automatically with the same look you see on the cards.
              </p>
              <a href="/studio" className="btn btn--primary">
                Open Sanity Studio
                <svg
                  className="ico"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
          </div>
        </section>
      ) : (
        <>
          {/* FILTER BAR */}
          <div className="filters" id="filters">
            <div className="container">
              <div className="filters__wrap reveal">
                <div className="filters__chips" role="tablist" aria-label="Filter by category">
                  {CATEGORY_FILTERS.map((label) => (
                    <button
                      key={label}
                      type="button"
                      role="tab"
                      aria-selected={activeChip === label}
                      className={`chip${activeChip === label ? " is-active" : ""}`}
                      onClick={() => setActiveChip(label)}
                    >
                      {label}
                    </button>
                  ))}
                </div>
                <div className="filters__search">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.3-4.3" />
                  </svg>
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onFocus={scrollToHead}
                    placeholder="Search articles, topics, authors..."
                    aria-label="Search articles"
                  />
                  {query ? (
                    <button
                      type="button"
                      className="filters__clear"
                      aria-label="Clear search"
                      onClick={() => {
                        setQuery("");
                        searchInputRef.current?.focus();
                      }}
                    >
                      ×
                    </button>
                  ) : null}
                </div>
              </div>
            </div>
          </div>

          {/* POSTS GRID */}
          <section className="posts">
            <div className="container">
              <div ref={headRef} className="posts__head reveal">
                <h2 className="posts__title">{headingText}</h2>
                <div className="posts__count">
                  {trimmedQuery
                    ? `${filteredPosts.length} match${filteredPosts.length === 1 ? "" : "es"} in ${posts.length} articles`
                    : `Showing ${Math.min(displayedPosts.length, filteredPosts.length)} of ${filteredPosts.length} articles`}
                  {isFiltered ? (
                    <button
                      type="button"
                      className="posts__reset"
                      onClick={() => {
                        setActiveChip("All");
                        setQuery("");
                      }}
                    >
                      Reset
                    </button>
                  ) : null}
                </div>
              </div>

              {filteredPosts.length === 0 ? (
                <div className="posts__empty reveal">
                  <div className="posts__empty-h">
                    {trimmedQuery
                      ? `No articles match “${trimmedQuery}”.`
                      : "No articles match your filters."}
                  </div>
                  <p>Try a different category or clear your search.</p>
                  <button
                    type="button"
                    className="btn btn--ghost"
                    onClick={() => {
                      setActiveChip("All");
                      setQuery("");
                    }}
                  >
                    Clear filters
                  </button>
                </div>
              ) : (
                <div className="posts__grid">
                  {displayedPosts.map((post, i) => (
                    <PostCard key={post._id} post={post} delaySec={(i % 3) * 0.06} />
                  ))}
                </div>
              )}

              {hasMore ? (
                <div className="posts__more">
                  <button type="button" className="btn btn--ghost" onClick={onLoadMore}>
                    Load more articles
                    <svg
                      className="ico"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </div>
              ) : null}
            </div>
          </section>
        </>
      )}

      {/* NEWSLETTER */}
      <section className="newsletter" id="newsletter">
        <div className="container">
          <div className="newsletter__inner reveal">
            <div className="newsletter__copy">
              <h2>
                Stay <em>health-decoded.</em>
                <br />
                Every week, in your inbox.
              </h2>
              <p>
                One short, science-grounded read every Wednesday. Plus a single, useful test
                recommendation when the science makes the case. No fluff, no fads, no spam.
                Unsubscribe in one click.
              </p>
            </div>
            <form className="newsletter__form" onSubmit={(e) => e.preventDefault()}>
              <div className="newsletter__input">
                <input type="email" placeholder="your@email.com" aria-label="Email address" />
                <button type="submit">Subscribe</button>
              </div>
              <div className="newsletter__hint">Joined by 12,000+ readers across India.</div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
