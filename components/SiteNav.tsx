"use client";

import Link from "next/link";
import { useEffect, useState, type MouseEvent } from "react";

import { LOGO_SRC } from "./brand-assets";

export default function SiteNav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleAnchorClick = (e: MouseEvent<HTMLAnchorElement>) => {
    const href = e.currentTarget.getAttribute("href");
    if (!href || !href.startsWith("#") || href.length <= 1) return;
    const target = document.querySelector(href);
    if (!target) return;
    e.preventDefault();
    const top = target.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <nav
      id="nav"
      className={`fixed inset-x-0 top-0 z-[100] transition-[background,padding,box-shadow] duration-300 ease-(--e-out) ${
        scrolled
          ? "bg-(--c-cream) py-3 shadow-[0_1px_0_rgba(31,26,20,0.06),0_8px_24px_-20px_rgba(45,32,18,0.12)]"
          : "bg-transparent py-3.5 sm:py-4.5"
      }`}
    >
      <div className="mx-auto flex w-full max-w-[1350px] items-center justify-between px-4 sm:px-4.5 md:px-8">
        <Link href="/" aria-label="knowyourgenes.ai" className="flex items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={LOGO_SRC} alt="KnowYourGenes" className="h-5.5 w-auto sm:h-6.5 md:h-7.5" />
          <span className="relative top-px inline-flex items-center rounded-[7px] bg-(--c-teal) px-1.5 py-0.5 text-[9px] font-bold uppercase leading-none tracking-[0.04em] text-(--c-cream) sm:px-1.5 sm:text-[10px] md:px-2.5 md:pt-1 md:pb-0.5 md:text-[10.5px]">
            .AI
          </span>
        </Link>
        <div className="flex items-center gap-2 sm:gap-3 md:gap-5">
          <a
            href="https://knowyourgenes.in"
            aria-label="Visit the main KnowYourGenes website"
            className="inline-flex items-center gap-2 text-[13.5px] font-medium tracking-[0.005em] text-(--ink-2) transition-colors duration-300 ease-(--e-out) hover:text-(--c-teal)"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4.5 w-4.5 opacity-85 sm:h-3.5 sm:w-3.5 sm:opacity-70"
            >
              <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span className="hidden sm:inline">Visit knowyourgenes.in</span>
          </a>
          <Link href="/#newsletter" onClick={handleAnchorClick} className="btn btn--primary">
            Subscribe
            <svg
              className="ico"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </div>
    </nav>
  );
}
