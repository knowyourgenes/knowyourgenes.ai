"use client";

import type { PortableTextBlock } from "@portabletext/react";
import { useEffect, useMemo, useState, type MouseEvent } from "react";

import { slugifyHeading } from "./brand-assets";

type Heading = { id: string; text: string; level: 2 | 3 };

function extractHeadings(blocks?: PortableTextBlock[]): Heading[] {
  if (!blocks?.length) return [];
  const out: Heading[] = [];
  for (const block of blocks) {
    const b = block as { _type?: string; style?: string; children?: Array<{ text?: string }> };
    if (b._type !== "block") continue;
    if (b.style !== "h2" && b.style !== "h3") continue;
    const text = (b.children ?? [])
      .map((c) => c.text ?? "")
      .join("")
      .trim();
    if (!text) continue;
    out.push({ id: slugifyHeading(text), text, level: b.style === "h2" ? 2 : 3 });
  }
  return out;
}

export default function Toc({ value }: { value?: PortableTextBlock[] }) {
  const headings = useMemo(() => extractHeadings(value), [value]);
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    if (headings.length === 0) return;
    setActive(headings[0]?.id ?? null);

    const elements = headings
      .map((h) => document.getElementById(h.id))
      .filter((el): el is HTMLElement => !!el);
    if (elements.length === 0) return;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0 && visible[0]?.target.id) {
          setActive(visible[0].target.id);
        }
      },
      // Heading is "active" when its top crosses ~120px below viewport top.
      // The lower bound (-60%) means only the upper portion counts.
      { rootMargin: "-120px 0px -60% 0px", threshold: 0 },
    );
    elements.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  const onClick = (e: MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 100;
    window.scrollTo({ top, behavior: "smooth" });
    history.replaceState(null, "", `#${id}`);
    setActive(id);
  };

  return (
    <aside className="toc" aria-label="Quick navigation">
      <div className="toc__h">On this page</div>
      <nav className="toc__nav">
        {headings.map((h) => (
          <a
            key={h.id}
            href={`#${h.id}`}
            onClick={(e) => onClick(e, h.id)}
            className={`toc__link toc__link--lv${h.level}${active === h.id ? " is-active" : ""}`}
          >
            {h.text}
          </a>
        ))}
      </nav>
    </aside>
  );
}
