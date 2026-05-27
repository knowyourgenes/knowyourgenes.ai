"use client";

import { useEffect } from "react";

export default function RevealObserver() {
  useEffect(() => {
    const reveals = document.querySelectorAll(".reveal, .reveal-r");
    if (!("IntersectionObserver" in window)) {
      reveals.forEach((el) => el.classList.add("is-in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -60px 0px", threshold: 0.05 },
    );
    reveals.forEach((el) => io.observe(el));

    const mo = new MutationObserver((mutations) => {
      for (const m of mutations) {
        m.addedNodes.forEach((node) => {
          if (!(node instanceof HTMLElement)) return;
          if (node.matches?.(".reveal, .reveal-r")) io.observe(node);
          node.querySelectorAll?.(".reveal, .reveal-r").forEach((el) => io.observe(el));
        });
      }
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);

  return null;
}
