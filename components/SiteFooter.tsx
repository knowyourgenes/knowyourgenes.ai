import Link from "next/link";

import { LOGO_SRC } from "./brand-assets";

export default function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="max-w-7xl mx-auto px-4 py-0">
        <div className="flex items-center justify-between">
          <div>© {year} KnowYourGenes. All rights reserved.</div>
          <div className="footer__socials">
            <a href="https://www.instagram.com/knowyourgenes">Instagram</a>
            <a href="https://linkedin.com/company/knowyourgenes">LinkedIn</a>
            <a href="https://www.youtube.com/@knowyourgenes_official">YouTube</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
