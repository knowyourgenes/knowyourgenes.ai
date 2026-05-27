"use client";

import { useEffect, useState } from "react";

export default function ReadingProgress() {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const article = document.querySelector("article.post");
      if (!article) {
        setPct(0);
        return;
      }
      const rect = article.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      if (total <= 0) {
        setPct(100);
        return;
      }
      const scrolled = -rect.top;
      const value = Math.min(100, Math.max(0, (scrolled / total) * 100));
      setPct(value);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div className="reading-progress" aria-hidden="true">
      <div className="reading-progress__bar" style={{ transform: `scaleX(${pct / 100})` }} />
    </div>
  );
}
