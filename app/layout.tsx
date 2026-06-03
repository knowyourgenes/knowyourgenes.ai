import type { Metadata } from "next";
import { Figtree, Hind } from "next/font/google";

import RevealObserver from "../components/RevealObserver";
import "./globals.css";

const figtree = Figtree({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-figtree",
});

const hind = Hind({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  variable: "--font-hind",
});

export const metadata: Metadata = {
  title: "knowyourgenes.ai · Health Decoded · Genomic wellness journal",
  description:
    "The official genomic wellness journal of knowyourgenes.ai - bite-sized, science-grounded reads on how your DNA shapes nutrition, fitness, recovery, and preventive care. Written for Indian biology.",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${figtree.variable} ${hind.variable}`}>
      <body>
        {children}
        <RevealObserver />
      </body>
    </html>
  );
}
