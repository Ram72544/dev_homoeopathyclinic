import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site-config";

const bodyFont = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const headingFont = Playfair_Display({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
  weight: ["500", "600", "700"],
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
    icon: "/logo-mark-3d.svg",
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
      className={`${bodyFont.variable} ${headingFont.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-teal-dark">
        {children}
      </body>
    </html>
  );
}
