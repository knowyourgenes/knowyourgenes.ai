import { defineArrayMember, defineField, defineType } from "sanity";

export const CATEGORY_OPTIONS = [
  "Genomic Science",
  "Nutrition",
  "Fitness",
  "Lifestyle",
  "Preventive Care",
  "Senior Wellness",
] as const;

export const post = defineType({
  name: "post",
  title: "Post",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required().min(8).max(140),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.max(280),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: CATEGORY_OPTIONS.map((title) => ({ title, value: title })),
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "reference",
      to: [{ type: "author" }],
    }),
    defineField({
      name: "publishedAt",
      title: "Published at",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: "readTime",
      title: "Read time (minutes)",
      type: "number",
      validation: (Rule) => Rule.min(1).max(60),
    }),
    defineField({
      name: "variant",
      title: "Card illustration variant",
      description:
        "Selects which built-in illustration + gradient backdrop is used on the card (1–9). Ignored if a cover image is uploaded.",
      type: "number",
      validation: (Rule) => Rule.min(1).max(9),
      initialValue: 1,
    }),
    defineField({
      name: "coverImage",
      title: "Cover image (optional)",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "featured",
      title: "Featured editor's pick",
      description: "Promoted to the large hero card at the top of the homepage.",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "array",
      of: [
        defineArrayMember({
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "H2", value: "h2" },
            { title: "H3", value: "h3" },
            { title: "Quote", value: "blockquote" },
          ],
          lists: [
            { title: "Bullet", value: "bullet" },
            { title: "Numbered", value: "number" },
          ],
          marks: {
            decorators: [
              { title: "Strong", value: "strong" },
              { title: "Emphasis", value: "em" },
            ],
            annotations: [
              {
                name: "link",
                type: "object",
                title: "Link",
                fields: [
                  {
                    name: "href",
                    type: "url",
                    title: "URL",
                  },
                ],
              },
            ],
          },
        }),
        defineArrayMember({
          type: "image",
          options: { hotspot: true },
          fields: [{ name: "alt", type: "string", title: "Alt text" }],
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
      author: "author.name",
      category: "category",
      media: "coverImage",
    },
    prepare({ title, author, category, media }) {
      return {
        title,
        subtitle: [category, author].filter(Boolean).join(" · "),
        media,
      };
    },
  },
});
