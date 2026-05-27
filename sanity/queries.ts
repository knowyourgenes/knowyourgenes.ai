import { groq } from "next-sanity";

const POST_FIELDS = `
  _id,
  title,
  "slug": slug.current,
  excerpt,
  category,
  publishedAt,
  readTime,
  variant,
  featured,
  coverImage,
  "author": author->{ name, initials, "image": image.asset->url }
`;

export const FEATURED_POST_QUERY = groq`*[_type == "post" && featured == true] | order(publishedAt desc) [0] {
  ${POST_FIELDS}
}`;

export const POSTS_QUERY = groq`*[_type == "post" && (featured != true)] | order(publishedAt desc) [0...30] {
  ${POST_FIELDS}
}`;

export const POST_BY_SLUG_QUERY = groq`*[_type == "post" && slug.current == $slug][0] {
  ${POST_FIELDS},
  body,
  "author": author->{ name, initials, bio, "image": image.asset->url }
}`;

export const RELATED_POSTS_QUERY = groq`*[_type == "post" && category == $category && slug.current != $slug] | order(publishedAt desc) [0...3] {
  ${POST_FIELDS}
}`;

export const ALL_SLUGS_QUERY = groq`*[_type == "post" && defined(slug.current)][].slug.current`;
