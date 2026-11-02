import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Geist, Geist_Mono } from "next/font/google";
import { siteUrl } from "@/lib/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const display = Bricolage_Grotesque({
  variable: "--font-display",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Thisuka Warsavithana · Full-Stack Developer",
  description:
    "Full-stack developer (backend & systems) from Sri Lanka. CodeArena'26 champion. Builds route optimizers, ML-powered platforms, RAG systems and offline-first apps with React, Next.js, Node.js and Python.",
  openGraph: {
    title: "Thisuka Warsavithana · Full-Stack Developer",
    description:
      "Route optimizers, ML-powered platforms, RAG systems and offline-first apps. CodeArena'26 champion.",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#060609",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${display.variable} antialiased`}
    >
      <body className="grain">{children}</body>
    </html>
  );
}
