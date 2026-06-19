// Canonical site identity. Reused by sitemap, robots, and the llms.txt routes
// so the production URL/name live in exactly one place.
export const siteConfig = {
  siteUrl: "https://knowyourgenes.ai",
  siteName: "knowyourgenes.ai",
  description:
    "The official genomic wellness journal of knowyourgenes.ai - bite-sized, " +
    "science-grounded reads on how your DNA shapes nutrition, fitness, recovery, " +
    "and preventive care. Written for Indian biology.",
} as const;
