"use client";

import Image from "next/image";
import { site, navLinks } from "@/lib/site-config";
import { Phone, MessageCircle, ArrowUp } from "lucide-react";

export function Footer() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    name: site.name,
    description: site.intro,
    url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
    image: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/logo-concept-1-transparent.png`,
    telephone: site.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: "D-160/1, Saurabh Vihar, Hari Nagar Extn., Jaitpur",
      addressLocality: "New Delhi",
      addressRegion: "Delhi",
      postalCode: "110044",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "28.506497",
      longitude: "77.3216683",
    },
    medicalSpecialty: ["Homeopathy", "HolisticHealth"],
  };

  const year = new Date().getFullYear();

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <footer className="relative bg-transparent text-[#14221B] dark:text-[#FAF8F5] pt-6 pb-28 md:pb-8 overflow-hidden transition-colors duration-300">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div className="relative z-10 mx-auto max-w-[1536px] px-3 sm:px-6 lg:px-10">

        {/* Floating Minimalist Luxury Glass Footer Card */}
        <div className="rounded-[2.5rem] border border-white/90 dark:border-[#C5A059]/35 bg-white/85 dark:bg-[#0E1310]/90 p-6 sm:p-8 lg:p-10 backdrop-blur-2xl shadow-[0_20px_60px_-15px_rgba(20,34,27,0.06),0_1px_2px_rgba(255,255,255,0.9)_inset] dark:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.6)]">
          
          {/* Top Brand & Action Row */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-[#14221B]/10 dark:border-white/10">
            
            {/* Brand Logo & Title */}
            <a href="#home" className="group flex items-center gap-3.5 text-center md:text-left cursor-pointer">
              <div className="relative h-11 w-11 sm:h-12 sm:w-12 shrink-0 filter drop-shadow-[0_2px_12px_rgba(14,124,123,0.3)] transition-transform duration-300 group-hover:scale-105">
                <Image
                  src="/logo-concept-1-transparent.png"
                  alt="Dr. Sheetal's Homoeopathy Clinic Logo"
                  width={256}
                  height={256}
                  sizes="48px"
                  unoptimized
                  className="h-full w-full object-contain"
                />
              </div>
              <div className="leading-tight shrink-0 flex flex-col justify-center text-left">
                <span className="font-serif text-base sm:text-xl lg:text-2xl font-normal leading-tight text-[#14221B] dark:text-[#FAF8F5] whitespace-nowrap group-hover:text-[#0E7C7B] dark:group-hover:text-[#E5C583] transition-colors duration-300">
                  Dr. Sheetal&apos;s
                </span>
                <span className="font-accent text-[8.5px] sm:text-[10.5px] lg:text-[11.5px] font-bold tracking-[0.22em] sm:tracking-[0.24em] text-[#0E7C7B] dark:text-[#E5C583] uppercase whitespace-nowrap mt-0.5 sm:mt-1">
                  HOMOEOPATHY CLINIC
                </span>
              </div>
            </a>

            {/* Quick Action Contact Pills */}
            <div className="flex flex-wrap items-center justify-center gap-3">
              <a
                href={site.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-[#14221B]/15 dark:border-[#C5A059]/35 bg-white/80 dark:bg-[#141A16] px-4 py-2 text-xs font-medium text-[#14221B] dark:text-[#FAF8F5] shadow-xs transition-all hover:bg-[#14221B] hover:text-[#FAF8F5] dark:hover:bg-[#E5C583] dark:hover:text-[#14221B] cursor-pointer"
              >
                <MessageCircle className="h-3.5 w-3.5 text-[#25D366]" />
                <span>WhatsApp Doctor</span>
              </a>

              <a
                href={`tel:${site.phone}`}
                className="inline-flex items-center gap-2 rounded-full border border-[#14221B]/15 dark:border-[#C5A059]/35 bg-white/80 dark:bg-[#141A16] px-4 py-2 text-xs font-medium text-[#14221B] dark:text-[#FAF8F5] shadow-xs transition-all hover:bg-[#14221B] hover:text-[#FAF8F5] dark:hover:bg-[#E5C583] dark:hover:text-[#14221B] cursor-pointer"
              >
                <Phone className="h-3.5 w-3.5 text-[#C5A059] dark:text-[#E5C583]" />
                <span>{site.phoneDisplay}</span>
              </a>

              <button
                type="button"
                onClick={scrollToTop}
                aria-label="Scroll to top of page"
                className="inline-flex items-center justify-center h-9 w-9 rounded-full border border-[#14221B]/15 dark:border-white/15 bg-white/80 dark:bg-[#141A16] text-[#14221B] dark:text-[#FAF8F5] hover:bg-[#14221B] hover:text-[#FAF8F5] dark:hover:bg-[#E5C583] dark:hover:text-[#14221B] transition-all cursor-pointer shadow-xs"
                title="Back to top"
              >
                <ArrowUp className="h-3.5 w-3.5" />
              </button>
            </div>

          </div>

          {/* Navigation Links Bar (Exact same typography as Navbar) */}
          <ul className="py-5 flex flex-wrap items-center justify-center gap-x-6 sm:gap-x-8 gap-y-2.5 font-sans text-xs tracking-wider uppercase">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="group relative py-1 text-[#3D4E44] dark:text-[#A3ACA7] font-medium transition-colors duration-200 hover:text-[#0E7C7B] dark:hover:text-[#FAF8F5]"
                >
                  <span>{link.label}</span>
                  <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-[#0E7C7B] dark:bg-[#E5C583] transition-all duration-300 group-hover:w-full group-hover:left-0 rounded-full" />
                </a>
              </li>
            ))}
            <li>
              <a
                href="#contact"
                className="group relative py-1 font-semibold text-[#0E7C7B] dark:text-[#E5C583] transition-colors duration-200"
              >
                <span>CONSULTATION FORM</span>
                <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-[#0E7C7B] dark:bg-[#E5C583] transition-all duration-300 group-hover:w-full group-hover:left-0 rounded-full" />
              </a>
            </li>
          </ul>

          {/* Bottom Copyright & Legal Line */}
          <div className="pt-4 border-t border-[#14221B]/10 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] font-light text-[#7A8A80] text-center sm:text-left">
            <p>&copy; {year} {site.name}. All rights reserved.</p>
            <p>Registered Homoeopathic Medical Practice • 100% Patient Confidentiality</p>
          </div>

        </div>

      </div>
    </footer>
  );
}
