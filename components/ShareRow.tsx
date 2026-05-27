"use client";

import { useCallback, useState } from "react";

type Props = {
  title: string;
  slug: string;
};

export default function ShareRow({ title, slug }: Props) {
  const [copied, setCopied] = useState(false);

  const getUrl = useCallback(() => {
    if (typeof window === "undefined") return `/blog/${slug}`;
    return new URL(`/blog/${slug}`, window.location.origin).toString();
  }, [slug]);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(getUrl());
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      // ignore
    }
  };

  const onNativeShare = async () => {
    if (typeof navigator === "undefined" || !navigator.share) {
      void onCopy();
      return;
    }
    try {
      await navigator.share({ title, url: getUrl() });
    } catch {
      // user cancelled
    }
  };

  const url = getUrl();
  const xHref = `https://x.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;
  const linkedinHref = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;

  return (
    <div className="share">
      <span className="share__label">Share</span>
      <div className="share__btns">
        <a
          className="share__btn"
          href={xHref}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on X"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M18.244 2H21l-6.49 7.41L22 22h-6.79l-4.7-6.13L4.8 22H2l6.97-7.96L2 2h6.95l4.23 5.59L18.244 2Zm-1.19 18.4h1.86L7.05 3.51H5.07l11.98 16.89Z" />
          </svg>
        </a>
        <a
          className="share__btn"
          href={linkedinHref}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on LinkedIn"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M4.98 3.5C4.98 4.88 3.86 6 2.49 6 1.12 6 0 4.88 0 3.5 0 2.12 1.12 1 2.49 1c1.37 0 2.49 1.12 2.49 2.5ZM.22 8h4.55v14H.22V8Zm7.5 0h4.37v1.92h.06c.61-1.12 2.1-2.3 4.32-2.3 4.62 0 5.47 3.04 5.47 7v7.38h-4.55v-6.54c0-1.56-.03-3.57-2.18-3.57-2.18 0-2.52 1.7-2.52 3.46V22H7.72V8Z" />
          </svg>
        </a>
        <button
          type="button"
          className={`share__btn${copied ? " is-copied" : ""}`}
          onClick={onCopy}
          aria-label={copied ? "Link copied" : "Copy link"}
        >
          {copied ? (
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M4 12.5l5 5 11-11" />
            </svg>
          ) : (
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M9 17H7a5 5 0 010-10h2M15 7h2a5 5 0 010 10h-2M8 12h8" />
            </svg>
          )}
        </button>
        <button
          type="button"
          className="share__btn share__btn--native"
          onClick={onNativeShare}
          aria-label="Share"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M4 12v7a2 2 0 002 2h12a2 2 0 002-2v-7M16 6l-4-4-4 4M12 2v14" />
          </svg>
        </button>
      </div>
      <span className={`share__toast${copied ? " is-on" : ""}`} aria-live="polite">
        Link copied
      </span>
    </div>
  );
}
