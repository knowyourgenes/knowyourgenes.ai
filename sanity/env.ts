export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-12-01";

export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";

export const readToken = process.env.SANITY_API_READ_TOKEN || "";

export const isSanityConfigured = projectId.length > 0;
