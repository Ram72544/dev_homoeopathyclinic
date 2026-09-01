"use client";

import { useState } from "react";
import Image from "next/image";
import { site, navLinks } from "@/lib/site-config";
import { Phone, Mail, MapPin, MessageCircle, ChevronDown, ChevronUp } from "lucide-react";

export function Footer() {
  const [showAllServices, setShowAllServices] = useState(false);

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
  const displayedServices = showAllServices ? site.services : site.services.slice(0, 6);

  return (
    <footer className="relative bg-transparent text-[#14221B] dark:text-[#FAF8F5] pt-6 pb-28 md:pb-8 overflow-hidden transition-colors duration-300">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div className="relative z-10 mx-auto max-w-[1536px] px-3 sm:px-6 lg:px-10">

        {/* Floating Compact Spatial Footer Container */}
        <div className="rounded-[2rem] border border-white/90 dark:border-[#C5A059]/35 bg-white/80 dark:bg-[#0E1310]/90 p-5 sm:p-7 lg:p-8 backdrop-blur-2xl shadow-[0_16px_40px_rgba(20,34,27,0.04)] dark:shadow-[0_16px_40px_rgba(0,0,0,0.6)]">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-12 pb-6 border-b border-[#EAE3DA] dark:border-[#C5A059]/20">

            {/* Column 1: Brand & Logo (4 Cols) */}
            <div className="lg:col-span-4 space-y-3">
              <div className="flex items-center gap-3.5">
                <div className="relative h-15 w-15 sm:h-16 sm:w-16 shrink-0 transition-transform duration-300 group-hover:scale-105 filter drop-shadow-[0_4px_16px_rgba(14,124,123,0.3)]">
                  <Image
                    src="/logo-concept-1-transparent.png"
                    alt="Dr. Sheetal's Homoeopathy Clinic Medicine Vial Logo"
                    width={256}
                    height={256}
                    sizes="(max-width: 640px) 60px, 64px"
                    unoptimized
                    className="h-full w-full object-contain"
                  />
                </div>
                <div className="flex flex-col justify-center min-w-0">
                  <span className="font-serif text-2xl sm:text-[26px] font-normal leading-none text-[#14221B] dark:text-[#FAF8F5] whitespace-nowrap">
                    Dr. Sheetal&apos;s
                  </span>
                  <span className="font-accent text-xs sm:text-[13px] font-bold tracking-[0.22em] text-[#0E7C7B] dark:text-[#14B8A6] uppercase whitespace-nowrap mt-1">
                    Homoeopathy Clinic
                  </span>
                  <span className="font-sans text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.2em] text-[#967531] dark:text-[#E5C583] mt-1 whitespace-nowrap">
                    Natural Family Healing
                  </span>
                </div>
              </div>

              <p className="text-xs font-light leading-relaxed text-[#4A5D52] dark:text-[#9EB3A8] max-w-sm">
                Personalized constitutional homeopathic care treating root causes with 100% natural, safe sweet pills for your family.
              </p>
            </div>

            {/* Column 2: Quick Links (2 Cols) */}
            <div className="lg:col-span-2 space-y-2.5">
              <h4 className="font-accent text-xs font-bold uppercase tracking-[0.20em] text-[#14221B] dark:text-[#FAF8F5]">
                Navigation
              </h4>
              <ul className="space-y-1.5 text-xs font-light text-[#4A5D52] dark:text-[#9EB3A8]">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="transition-colors hover:text-[#0E7C7B] dark:hover:text-[#14B8A6]"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Specialized Care with Expandable 12 Treatments (3.5 Cols) */}
            <div className="lg:col-span-3 space-y-2.5">
              <h4 className="font-accent text-xs font-bold uppercase tracking-[0.20em] text-[#14221B] dark:text-[#FAF8F5]">
                Specialized Care
              </h4>
              
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-3 gap-y-1.5 text-xs font-light text-[#4A5D52] dark:text-[#9EB3A8]">
                {displayedServices.map((service) => (
                  <li key={service.id}>
                    <button
                      type="button"
                      onClick={() => {
                        window.dispatchEvent(
                          new CustomEvent("open-disease-modal", { detail: service.id })
                        );
                      }}
                      className="text-left transition-colors hover:text-[#0E7C7B] dark:hover:text-[#14B8A6] cursor-pointer truncate w-full"
                    >
                      {service.title}
                    </button>
                  </li>
                ))}
              </ul>

              {/* Expander Button */}
              <button
                type="button"
                onClick={() => setShowAllServices(!showAllServices)}
                className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-[#0E7C7B]/25 dark:border-white/15 bg-white/90 dark:bg-[#14261D] px-3 py-1 text-[11px] font-medium text-[#0E7C7B] dark:text-[#FAF8F5] hover:bg-[#0E7C7B] hover:text-white dark:hover:bg-[#0E7C7B] dark:hover:text-white transition-all cursor-pointer shadow-2xs"
              >
                <span>
                  {showAllServices
                    ? "Show Less"
                    : "Explore All 12 Conditions & Treatments"}
                </span>
                {showAllServices ? (
                  <ChevronUp className="h-3 w-3" />
                ) : (
                  <ChevronDown className="h-3 w-3" />
                )}
              </button>
            </div>

            {/* Column 4: Contact Info (3 Cols) */}
            <div className="lg:col-span-3 space-y-2.5">
              <h4 className="font-accent text-xs font-bold uppercase tracking-[0.20em] text-[#14221B] dark:text-[#FAF8F5]">
                Clinic Contact
              </h4>
              <ul className="space-y-2 text-xs font-light text-[#4A5D52] dark:text-[#9EB3A8]">
                <li className="flex items-center gap-2">
                  <Phone className="h-3.5 w-3.5 shrink-0 text-[#0E7C7B] dark:text-[#14B8A6]" />
                  <a href={`tel:${site.phone}`} className="hover:text-[#0E7C7B] dark:hover:text-[#14B8A6] transition-colors">
                    {site.phoneDisplay}
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <MessageCircle className="h-3.5 w-3.5 shrink-0 text-[#0E7C7B] dark:text-[#14B8A6]" />
                  <a
                    href={site.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#0E7C7B] dark:hover:text-[#14B8A6] transition-colors"
                  >
                    WhatsApp Consultation
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="h-3.5 w-3.5 shrink-0 text-[#0E7C7B] dark:text-[#14B8A6]" />
                  <a href={`mailto:${site.email}`} className="hover:text-[#0E7C7B] dark:hover:text-[#14B8A6] transition-colors">
                    {site.email}
                  </a>
                </li>
                <li className="flex items-start gap-2">
                  <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#0E7C7B] dark:text-[#14B8A6]" />
                  <a
                    href={site.googleUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#0E7C7B] dark:hover:text-[#14B8A6] transition-colors line-clamp-2"
                  >
                    {site.address}
                  </a>
                </li>
              </ul>
            </div>

          </div>

          {/* Bottom Copyright */}
          <div className="pt-4 text-center text-[11px] font-light text-[#7A8A80]">
            <p>&copy; {year} {site.name}. All rights reserved. Registered Homoeopathic Medical Practice.</p>
          </div>
        </div>

      </div>
    </footer>
  );
}
