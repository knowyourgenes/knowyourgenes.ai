export default function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-(--ink-line) py-5.5 sm:py-6.5">
      <div className="mx-auto w-full max-w-7xl px-4">
        <div className="flex flex-col items-center justify-between gap-3.5 text-center text-[12.5px] text-(--ink-3) sm:flex-row sm:gap-4 sm:text-left">
          <div>© {year} KnowYourGenes. All rights reserved.</div>
          <div className="flex flex-wrap justify-center gap-x-4.5 gap-y-2 sm:gap-x-5.5">
            <a
              href="https://www.instagram.com/knowyourgenes"
              className="text-[13px] font-medium text-(--ink-2) transition-colors hover:text-(--c-teal)"
            >
              Instagram
            </a>
            <a
              href="https://linkedin.com/company/knowyourgenes"
              className="text-[13px] font-medium text-(--ink-2) transition-colors hover:text-(--c-teal)"
            >
              LinkedIn
            </a>
            <a
              href="https://www.youtube.com/@knowyourgenes_official"
              className="text-[13px] font-medium text-(--ink-2) transition-colors hover:text-(--c-teal)"
            >
              YouTube
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
