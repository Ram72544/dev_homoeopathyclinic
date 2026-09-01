import type { Metadata } from "next";
import { DM_Sans, Playfair_Display, Cormorant_Garamond, Cinzel } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { site } from "@/lib/site-config";
import { ThemeProvider } from "@/components/theme-provider";
import { SmoothScrollProvider } from "@/components/smooth-scroll-provider";

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
    process.env.NEXT_PUBLIC_SITE_URL || "https://www.drsheetalclinic.com"
  ),
  title: {
    default: `${site.name} — Best Homoeopathy Doctor in Badarpur, Delhi NCR`,
    template: `%s | ${site.name}`,
  },
  description: site.intro,
  keywords: [
    "Dr. Sheetal Homoeopathy Clinic",
    "Best Homeopathy Doctor in Badarpur",
    "Homeopathic Clinic Delhi NCR",
    "Classical Homoeopathy Treatment",
    "Permanent Cure for Eczema Homeopathy",
    "PCOS Treatment without Hormones",
    "Safe Sweet Pills for Infants",
    "Migraine and Thyroid Homeopathy",
    "AYUSH Registered Homoeopathy Clinic",
  ],
  authors: [{ name: "Dr. Sheetal Tiwari, MD (Hom.)" }],
  creator: "Dr. Sheetal Tiwari",
  publisher: "Dr. Sheetal's Homoeopathy Clinic",
  alternates: {
    canonical: "https://www.drsheetalclinic.com",
  },
  icons: {
    icon: [
      { url: "/logo-concept-1-transparent.png", sizes: "any" },
      { url: "/icon.png", type: "image/png" },
      { url: "/favicon.ico" },
    ],
    shortcut: "/logo-concept-1-transparent.png",
    apple: "/logo-concept-1-transparent.png",
  },
  openGraph: {
    title: `${site.name} — Classical Homoeopathic Healing`,
    description: site.intro,
    url: "https://www.drsheetalclinic.com",
    siteName: site.name,
    type: "website",
    locale: "en_IN",
  },
  verification: {
    google: "googlec7741f5817f41596",
  },
  other: {
    "geo.region": "IN-DL",
    "geo.placename": "New Delhi, Badarpur",
    "geo.position": "28.506497;77.321668",
    "ICBM": "28.506497, 77.321668",
  },
};

const medicalClinicSchema = {
  "@context": "https://schema.org",
  "@type": ["MedicalBusiness", "Physician"],
  "@id": "https://www.drsheetalclinic.com/#clinic",
  name: site.name,
  alternateName: "Dr Sheetal Homeopathy Clinic",
  url: "https://www.drsheetalclinic.com",
  logo: "https://www.drsheetalclinic.com/logo-concept-1-transparent.png",
  image: "https://www.drsheetalclinic.com/images/clinic-sanctuary-v2.png",
  description: site.intro,
  medicalSpecialty: "Homeopathic",
  telephone: "+919999999999",
  priceRange: "₹₹",
  currenciesAccepted: "INR",
  paymentAccepted: "Cash, UPI, Google Pay, PhonePe, Paytm, Card",
  physician: {
    "@type": "Physician",
    name: "Dr. Sheetal Tiwari",
    jobTitle: "Classical Homoeopathic Physician",
    medicalSpecialty: "Homeopathic",
    hasCredential: {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "degree",
      name: "BHMS, MD (Homoeopathy)",
      recognizedBy: {
        "@type": "Organization",
        name: "Central Council of Homoeopathy (CCH) / Ministry of AYUSH, Govt. of India",
      },
    },
  },
  address: {
    "@type": "PostalAddress",
    streetAddress: "Badarpur, Near Mathura Road",
    addressLocality: "New Delhi",
    addressRegion: "Delhi",
    postalCode: "110044",
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 28.506497,
    longitude: 77.3216683,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "10:00",
      closes: "13:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "18:00",
      closes: "21:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Sunday"],
      opens: "10:00",
      closes: "13:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Sunday"],
      opens: "18:00",
      closes: "21:00",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${bodyFont.variable} ${headingFont.variable} ${luxuryFont.variable} ${accentFont.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(medicalClinicSchema) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-surface text-foreground transition-colors duration-300">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange={false}
        >
          <SmoothScrollProvider>
            {children}
          </SmoothScrollProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
