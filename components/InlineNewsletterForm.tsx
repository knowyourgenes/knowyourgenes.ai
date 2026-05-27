"use client";

export default function InlineNewsletterForm() {
  return (
    <form
      action="/#newsletter"
      className="post__cta-form"
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <input type="email" placeholder="your@email.com" aria-label="Email address" required />
      <button type="submit">Subscribe</button>
    </form>
  );
}
