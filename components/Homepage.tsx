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
  const [filterHidden, setFilterHidden] = useState(true);

  const headRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const trimmedQuery = query.trim();
  const isFiltered = activeChip !== "All" || trimmedQuery.length > 0;

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

  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [activeChip, query]);

  useEffect(() => {
    if (!isFiltered) return;
    const id = requestAnimationFrame(() => scrollToHead());
    return () => cancelAnimationFrame(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFiltered]);

  // Below 1024px: docked filter bar at the viewport bottom. Hidden at the very
  // top of the page (before scroll) and once the newsletter enters the viewport
  // so it never overlaps the form.
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1023.98px)");
    const newsletter = document.getElementById("newsletter");
    let newsletterInView = false;

    const update = () => {
      if (!mq.matches) {
        setFilterHidden(false);
        return;
      }
      const atTop = window.scrollY < 60;
      setFilterHidden(atTop || newsletterInView);
    };

    let io: IntersectionObserver | null = null;
    if (newsletter && "IntersectionObserver" in window) {
      io = new IntersectionObserver(
        (entries) => {
          newsletterInView = entries.some((entry) => entry.isIntersecting);
          update();
        },
        { rootMargin: "0px 0px -64px 0px" },
      );
      io.observe(newsletter);
    }

    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    mq.addEventListener("change", update);
    update();

    return () => {
      io?.disconnect();
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      mq.removeEventListener("change", update);
    };
  }, []);

  const displayedPosts = filteredPosts.slice(0, visibleCount);
  const hasMore = visibleCount < filteredPosts.length;

  const headingText = trimmedQuery ? `Results for “${trimmedQuery}”` : "Latest from the journal";

  const scrollToHead = () => {
    const el = headRef.current;
    if (!el) return;
    const isBelowDesktop =
      typeof window !== "undefined" && window.matchMedia("(max-width: 1023.98px)").matches;
    const offset = isBelowDesktop ? 90 : 170;
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
      <section className="relative flex min-h-svh flex-col items-center justify-center px-3 pt-[80px] pb-10 text-center sm:px-4 sm:pt-[90px] md:px-5 lg:px-8 lg:pt-[100px]">
        <div className="mx-auto flex w-full max-w-[1350px] flex-col items-center gap-10">
          <h1
            className="reveal mx-auto max-w-[1100px] text-[clamp(34px,10vw,56px)] font-medium leading-[1.02] tracking-[-0.032em] text-(--ink-1) [&_em]:not-italic [&_em]:font-semibold lg:text-[clamp(48px,7.2vw,104px)] lg:leading-[0.96]"
            style={{ "--rd": ".1s" } as CssVars}
          >
            Genomic wellness,
            <br />
            <em>
              <span className="grad-text">decoded for real life.</span>
            </em>
          </h1>

          <p
            className="reveal mx-auto mt-20 max-w-180 text-sm leading-[1.7] text-(--ink-2) sm:mt-27.5 sm:text-[15.5px] lg:mt-40 lg:text-[clamp(17px,1.5vw,21px)] lg:leading-[1.6]"
            style={{ "--rd": ".2s" } as CssVars}
          >
            Bite-sized reads on how your DNA shapes nutrition, fitness, sleep, recovery, and the
            long arc of preventive care. Written for South Asian biology, written for the everyday.
            No jargon, no fad science, no diet wars. Just what the research says, plainly, with what
            to do about it.
          </p>

          <div
            className="reveal mt-10 inline-flex flex-col items-center gap-2 text-[11px] uppercase tracking-[0.14em] text-(--ink-3) sm:mt-12 sm:text-xs lg:mt-16"
            style={{ "--rd": ".35s" } as CssVars}
          >
            Read on
            <div className="h-8 w-px animate-[scrollLine_2.2s_ease-in-out_infinite] bg-gradient-to-b from-(--ink-3) to-transparent sm:h-10" />
          </div>
        </div>
      </section>

      {/* FEATURED POST */}
      {featuredPost && !isFiltered ? (
        <section className="pb-14 sm:pb-16 lg:pb-[90px]">
          <div className="mx-auto w-full max-w-[1350px] px-3 sm:px-4 md:px-5 lg:px-8">
            <Link
              href={`/blog/${featuredPost.slug}`}
              className="reveal group relative grid grid-cols-1 overflow-hidden rounded-[var(--r-lg)] border border-(--ink-line) bg-white shadow-[var(--sh-2)] transition-all duration-500 ease-(--e-out) hover:-translate-y-1 hover:shadow-[var(--sh-3)] sm:rounded-[var(--r-xl)] lg:grid-cols-[1.05fr_1fr] lg:rounded-[var(--r-2xl)]"
            >
              <div className="relative min-h-[200px] overflow-hidden bg-[linear-gradient(140deg,var(--c-peach)_0%,var(--c-peach-2)_50%,#e8c9a0_100%)] sm:min-h-[240px] lg:min-h-[460px]">
                <div className="absolute left-4 top-4 z-[2] inline-flex items-center gap-2 rounded-full bg-(--ink-1) px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.04em] text-(--c-cream) sm:left-6 sm:top-6 sm:text-xs">
                  <span className="h-1.5 w-1.5 rounded-full bg-(--c-teal-light)" />
                  Editor&apos;s Pick
                </div>
                <div className="absolute inset-0 flex items-center justify-center [&_svg]:h-auto [&_svg]:max-h-[70%] [&_svg]:w-3/5 [&_svg]:drop-shadow-[0_14px_36px_rgba(199,104,66,0.16)]">
                  {featuredHasImage ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={urlFor(featuredPost.coverImage!)
                        .width(900)
                        .height(720)
                        .fit("crop")
                        .url()}
                      alt={featuredPost.coverImage?.alt || featuredPost.title}
                      className="absolute inset-0 block h-full w-full object-cover"
                    />
                  ) : (
                    <FeaturedRibbon />
                  )}
                </div>
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_60%_at_70%_30%,rgba(255,255,255,0.18),transparent_60%),linear-gradient(180deg,transparent_60%,rgba(31,26,20,0.1)_100%)]" />
              </div>
              <div className="flex flex-col justify-center gap-3.5 p-6 sm:gap-4 sm:p-7 lg:gap-5.5 lg:p-13">
                <div className="text-xs font-semibold uppercase tracking-[0.12em] text-(--c-teal)">
                  {featuredPost.category} · {featuredPost.readTime} min read
                </div>
                <h2 className="text-[22px] font-medium leading-[1.12] tracking-[-0.022em] text-(--ink-1) sm:text-[clamp(22px,6vw,30px)] lg:text-[clamp(28px,3.2vw,42px)] lg:leading-[1.08]">
                  {featuredPost.title}
                </h2>
                <p className="text-[14.5px] leading-[1.6] text-(--ink-2) sm:text-[15px] lg:text-[16.5px]">
                  {featuredPost.excerpt}
                </p>
                <div className="mt-2 flex flex-wrap items-center gap-x-2.5 gap-y-1.5 text-xs text-(--ink-3) sm:gap-x-3 lg:gap-x-4.5 lg:text-[13px]">
                  <span>By {featuredPost.author?.name || "Editorial"}</span>
                  <span className="h-[3px] w-[3px] rounded-full bg-(--ink-3)" />
                  <span>{formatPublishedDate(featuredPost.publishedAt)}</span>
                  <span className="h-[3px] w-[3px] rounded-full bg-(--ink-3)" />
                  <span>{featuredPost.category}</span>
                </div>
                <span className="mt-3 inline-flex items-center gap-2.5 text-sm font-semibold text-(--c-teal) transition-[gap] duration-300 ease-(--e-out) group-hover:gap-3.5 lg:text-[15px] [&_svg]:h-4 [&_svg]:w-4 [&_svg]:transition-transform [&_svg]:duration-300 group-hover:[&_svg]:translate-x-0.5">
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
        <section className="pb-15 lg:pb-25">
          <div className="mx-auto w-full max-w-[1350px] px-3 sm:px-4 md:px-5 lg:px-8">
            <div className="reveal mb-6 flex items-end justify-between gap-5">
              <h2 className="text-[clamp(28px,3.4vw,44px)] font-medium leading-[1.05] tracking-[-0.022em]">
                Latest from the journal
              </h2>
            </div>
            <div className="reveal mt-3 flex flex-col items-center gap-3.5 rounded-[var(--r-2xl)] border border-(--ink-line) bg-white/55 px-7 pb-16 pt-22 text-center text-(--ink-2) shadow-[var(--sh-1)] backdrop-blur-md [background:radial-gradient(60%_80%_at_50%_0%,rgba(248,228,204,0.55),transparent_70%),rgba(255,255,255,0.55)]">
              <div className="text-[clamp(24px,2.4vw,32px)] font-semibold tracking-[-0.018em] text-(--ink-1)">
                The journal is empty.
              </div>
              <p className="max-w-[460px] text-base leading-[1.6] text-(--ink-3)">
                Once you publish your first article in Sanity Studio, it will appear here
                automatically with the same look you see on the cards.
              </p>
              <a href="/studio" className="btn btn--primary mt-2">
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
          {/* FILTER BAR
              Below 1024px: fixed full-width edge-to-edge bar at the viewport bottom.
              ≥1024px: sticky top pill, single line with fluid text. */}
          <div
            id="filters"
            className={`pointer-events-none fixed inset-x-0 bottom-0 z-[100] w-full transition-[transform,opacity] duration-300 ease-(--e-out) lg:sticky lg:bottom-auto lg:top-[70px] lg:z-50 lg:translate-y-0 lg:pt-[5px] lg:pb-14 lg:opacity-100 ${
              filterHidden ? "translate-y-full opacity-0" : "translate-y-0 opacity-100"
            }`}
          >
            <div className="mx-auto w-full lg:max-w-[1350px] lg:px-8">
              <div className="pointer-events-auto flex w-full flex-row flex-nowrap items-center gap-2.5 border-t border-[rgba(31,26,20,0.08)] bg-[rgba(250,246,239,0.95)] px-3.5 pt-2.5 pb-[calc(10px+env(safe-area-inset-bottom,0))] shadow-[0_-8px_24px_-16px_rgba(31,26,20,0.2)] backdrop-blur-md backdrop-saturate-150 lg:flex-wrap lg:justify-between lg:gap-5 lg:rounded-full lg:border lg:border-(--ink-line) lg:bg-white lg:px-5.5 lg:py-4.5 lg:pb-4.5 lg:shadow-(--sh-1)">
                <div
                  role="tablist"
                  aria-label="Filter by category"
                  className="flex min-w-0 flex-1 flex-nowrap gap-1.5 overflow-x-auto overflow-y-hidden py-0.5 [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch] [overscroll-behavior-x:contain] [scrollbar-width:none] lg:flex-1 lg:flex-wrap lg:overflow-visible lg:gap-1.5 [&::-webkit-scrollbar]:hidden"
                >
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
                <div className="order-0 flex w-[150px] shrink-0 items-center gap-2.5 rounded-full border border-(--ink-line) bg-white/90 px-3 py-1.5 transition-[box-shadow] duration-200 ease-(--e-out) focus-within:shadow-[0_0_0_3px_rgba(14,77,75,0.14)] sm:w-[180px] lg:order-1 lg:w-auto lg:min-w-[clamp(200px,22vw,280px)] lg:bg-(--c-cream-2) lg:px-4 lg:py-2.5 lg:shrink">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-[15px] w-[15px] shrink-0 text-(--ink-3)"
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
                    className="min-w-0 flex-1 border-0 bg-transparent text-[13px] text-(--ink-1) outline-0 placeholder:text-(--ink-3) lg:text-sm"
                  />
                  {query ? (
                    <button
                      type="button"
                      aria-label="Clear search"
                      onClick={() => {
                        setQuery("");
                        searchInputRef.current?.focus();
                      }}
                      className="ml-1 inline-flex h-5.5 w-5.5 cursor-pointer items-center justify-center rounded-full bg-[rgba(31,26,20,0.08)] text-base leading-none text-(--ink-2) transition-colors duration-200 ease-(--e-out) hover:bg-[rgba(199,104,66,0.18)] hover:text-(--c-rust)"
                    >
                      ×
                    </button>
                  ) : null}
                </div>
              </div>
            </div>
          </div>

          {/* POSTS GRID */}
          <section className="pb-[110px] lg:pb-25">
            <div className="mx-auto w-full max-w-[1350px] px-3 sm:px-4 md:px-5 lg:px-8">
              <div
                ref={headRef}
                className="reveal mb-6.5 flex flex-col items-start gap-2 [scroll-margin-top:90px] sm:flex-row sm:items-end sm:justify-between sm:gap-5 lg:mb-10.5 lg:[scroll-margin-top:170px]"
              >
                <h2 className="text-[clamp(28px,3.4vw,44px)] font-medium leading-[1.05] tracking-[-0.022em]">
                  {headingText}
                </h2>
                <div className="text-[12.5px] tracking-[0.005em] text-(--ink-3) lg:text-[13.5px]">
                  {trimmedQuery
                    ? `${filteredPosts.length} match${filteredPosts.length === 1 ? "" : "es"} in ${posts.length} articles`
                    : `Showing ${Math.min(displayedPosts.length, filteredPosts.length)} of ${filteredPosts.length} articles`}
                  {isFiltered ? (
                    <button
                      type="button"
                      onClick={() => {
                        setActiveChip("All");
                        setQuery("");
                      }}
                      className="ml-2.5 cursor-pointer rounded-full border border-[rgba(14,77,75,0.25)] bg-transparent px-3 py-1 text-xs font-semibold uppercase tracking-[0.04em] text-(--c-teal) transition-all duration-300 ease-(--e-out) hover:border-(--c-teal) hover:bg-(--c-teal) hover:text-(--c-cream)"
                    >
                      Reset
                    </button>
                  ) : null}
                </div>
              </div>

              {filteredPosts.length === 0 ? (
                <div className="reveal flex flex-col items-center gap-3.5 px-4 pb-10 pt-20 text-center text-(--ink-2)">
                  <div className="text-[22px] font-semibold text-(--ink-1)">
                    {trimmedQuery
                      ? `No articles match “${trimmedQuery}”.`
                      : "No articles match your filters."}
                  </div>
                  <p className="max-w-[380px] text-[15px] text-(--ink-3)">
                    Try a different category or clear your search.
                  </p>
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
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-7 lg:grid-cols-3">
                  {displayedPosts.map((post, i) => (
                    <PostCard key={post._id} post={post} delaySec={(i % 3) * 0.06} />
                  ))}
                </div>
              )}

              {hasMore ? (
                <div className="mt-9 flex justify-center lg:mt-14">
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
      <section
        id="newsletter"
        className="relative my-6 mb-15 sm:my-8 sm:mb-15 lg:mb-[90px] lg:mt-10"
      >
        <div className="mx-auto w-full max-w-[1350px] px-3 sm:px-4 md:px-5 lg:px-8">
          <div className="reveal relative grid grid-cols-1 items-center gap-6.5 overflow-hidden rounded-[var(--r-xl)] bg-(--c-dark-1) px-5 py-8 text-(--c-cream) sm:gap-7 sm:px-6.5 sm:py-10 lg:grid-cols-[1.1fr_1fr] lg:gap-12 lg:rounded-[var(--r-2xl)] lg:px-[clamp(36px,6vw,80px)] lg:py-[clamp(48px,7vw,88px)]">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 [background:radial-gradient(60%_90%_at_8%_100%,rgba(37,181,171,0.3),transparent_60%),radial-gradient(50%_80%_at_95%_0%,rgba(248,228,204,0.1),transparent_60%)]"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 animate-[nlDrift_18s_ease-in-out_infinite_alternate] [background-image:radial-gradient(2px_2px_at_14%_22%,rgba(37,181,171,0.6),transparent_60%),radial-gradient(1.5px_1.5px_at_84%_30%,rgba(248,228,204,0.5),transparent_60%),radial-gradient(2px_2px_at_28%_78%,rgba(37,181,171,0.5),transparent_60%),radial-gradient(2.5px_2.5px_at_90%_80%,rgba(248,228,204,0.4),transparent_60%),radial-gradient(1.5px_1.5px_at_50%_50%,rgba(37,181,171,0.4),transparent_60%)]"
            />
            <div className="relative z-[1]">
              <h2 className="text-[clamp(24px,7vw,32px)] font-medium leading-[1.05] tracking-[-0.022em] text-(--c-cream) lg:text-[clamp(28px,3.2vw,44px)] [&_em]:not-italic [&_em]:font-semibold [&_em]:bg-[linear-gradient(92deg,var(--c-peach-2)_0%,var(--c-teal-light)_100%)] [&_em]:bg-clip-text [&_em]:text-transparent">
                Stay <em>health-decoded.</em>
                <br />
                Every week, in your inbox.
              </h2>
              <p className="mt-3.5 max-w-[420px] text-[14.5px] leading-[1.6] text-[rgba(250,246,239,0.74)] lg:text-base">
                One short, science-grounded read every Wednesday. Plus a single, useful test
                recommendation when the science makes the case. No fluff, no fads, no spam.
                Unsubscribe in one click.
              </p>
            </div>
            <form
              className="relative z-[1] flex flex-col gap-3"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="flex items-center rounded-full border border-[rgba(250,246,239,0.18)] bg-[rgba(250,246,239,0.08)] px-3.5 py-1 transition-all duration-300 ease-(--e-out) focus-within:border-[rgba(37,181,171,0.65)] focus-within:bg-[rgba(250,246,239,0.14)] lg:px-6 lg:py-1.5">
                <input
                  type="email"
                  placeholder="your@email.com"
                  aria-label="Email address"
                  className="min-w-0 flex-1 border-0 bg-transparent py-2.5 text-[13.5px] text-(--c-cream) outline-0 placeholder:text-[rgba(250,246,239,0.45)] lg:py-3 lg:text-[15px]"
                />
                <button
                  type="submit"
                  className="whitespace-nowrap rounded-full bg-(--c-teal-light) px-3.5 py-2.5 text-[12.5px] font-semibold text-(--ink-1) transition-all duration-300 ease-(--e-out) hover:translate-x-0.5 hover:bg-(--c-cream) lg:px-5.5 lg:py-2.5 lg:text-sm"
                >
                  Subscribe
                </button>
              </div>
              <div className="text-xs tracking-[0.005em] text-[rgba(250,246,239,0.55)] lg:text-[12.5px]">
                Joined by 12,000+ readers across India.
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
