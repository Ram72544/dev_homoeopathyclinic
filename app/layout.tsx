import type { Metadata } from "next";
import { DM_Sans, Playfair_Display, Cormorant_Garamond, Cinzel } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { site } from "@/lib/site-config";

const bodyFont = DM_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const headingFont = Playfair_Display({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const luxuryFont = Cormorant_Garamond({
  variable: "--font-luxury",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const accentFont = Cinzel({
  variable: "--font-accent",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  ),
  title: {
    default: `${site.name} — Homoeopathy in Your City`,
    template: `%s | ${site.name}`,
  },
  description: site.intro,
  keywords: [
    "homeopathy",
    "homoeopathy",
    "Dr. Sheetal",
    "homeopathic clinic",
    "natural treatment",
    "classical homoeopathy",
  ],
  icons: {
    icon: [
      { url: "/icon.png", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" },
      { url: "/logo-concept-1-transparent.png", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: "/icon.png",
  },
  openGraph: {
    title: `${site.name}`,
    description: site.intro,
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${bodyFont.variable} ${headingFont.variable} ${luxuryFont.variable} ${accentFont.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-surface text-foreground">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
