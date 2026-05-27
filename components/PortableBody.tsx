import {
  PortableText,
  type PortableTextComponents,
  type PortableTextBlock,
} from "@portabletext/react";

import { slugifyHeading } from "./brand-assets";
import { urlFor } from "../sanity/image";

function extractText(value: unknown): string {
  const v = value as { children?: Array<{ text?: string }> } | undefined;
  if (!v?.children) return "";
  return v.children.map((c) => c.text ?? "").join("");
}

const components: PortableTextComponents = {
  block: {
    h2: ({ children, value }) => (
      <h2 id={slugifyHeading(extractText(value))} className="post__h2">
        {children}
      </h2>
    ),
    h3: ({ children, value }) => (
      <h3 id={slugifyHeading(extractText(value))} className="post__h3">
        {children}
      </h3>
    ),
    blockquote: ({ children }) => <blockquote className="post__quote">{children}</blockquote>,
    normal: ({ children }) => <p className="post__p">{children}</p>,
  },
  list: {
    bullet: ({ children }) => <ul className="post__ul">{children}</ul>,
    number: ({ children }) => <ol className="post__ol">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => <li>{children}</li>,
    number: ({ children }) => <li>{children}</li>,
  },
  marks: {
    strong: ({ children }) => <strong>{children}</strong>,
    em: ({ children }) => <em>{children}</em>,
    link: ({ value, children }) => (
      <a className="post__link" href={value?.href} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    ),
  },
  types: {
    image: ({ value }) => {
      if (!value?.asset?._ref) return null;
      const url = urlFor(value).width(1200).fit("max").url();
      return (
        <figure className="post__figure">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={url} alt={value.alt || ""} />
          {value.alt ? <figcaption>{value.alt}</figcaption> : null}
        </figure>
      );
    },
  },
};

export default function PortableBody({ value }: { value?: PortableTextBlock[] }) {
  if (!value?.length) {
    return (
      <p className="post__p">
        This article is still being written. Check back soon, or browse other reads in the journal.
      </p>
    );
  }
  return <PortableText value={value} components={components} />;
}
