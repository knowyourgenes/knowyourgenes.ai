import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId } from "./env";

export const client = createClient({
  projectId: projectId || "placeholder",
  dataset,
  apiVersion,
  // CDN off: we already cache via Next's fetch cache (revalidate: 60).
  // useCdn:true added a second cache layer that delayed editorial updates by ~1 min.
  useCdn: false,
  perspective: "published",
});
