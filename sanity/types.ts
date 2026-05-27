import type { PortableTextBlock } from "@portabletext/react";

export type Category =
  | "Genomic Science"
  | "Nutrition"
  | "Fitness"
  | "Lifestyle"
  | "Preventive Care"
  | "Senior Wellness";

export type CoverImage = {
  asset?: { _ref?: string; _type?: string };
  alt?: string;
} | null;

export type Author = {
  name: string;
  initials?: string;
  bio?: string;
  image?: string;
};

export type PostListItem = {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: Category;
  publishedAt: string;
  readTime: number;
  variant: number;
  featured?: boolean;
  coverImage?: CoverImage;
  author?: Author | null;
};

export type Post = PostListItem & {
  body?: PortableTextBlock[];
};
