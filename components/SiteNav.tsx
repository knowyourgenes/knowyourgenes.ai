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
    <nav className={`nav${scrolled ? " is-scrolled" : ""}`} id="nav">
      <div className="nav__inner">
        <Link href="/" className="nav__logo" aria-label="knowyourgenes.ai">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={LOGO_SRC} alt="KnowYourGenes" />
          <span className="nav__logo-tag">.AI</span>
        </Link>
        <div className="nav__right">
          <a
            href="https://knowyourgenes.in"
            className="nav__home-link"
            aria-label="Visit the main KnowYourGenes website"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span>Visit knowyourgenes.in</span>
          </a>
          <Link href="/#newsletter" className="btn btn--primary" onClick={handleAnchorClick}>
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
