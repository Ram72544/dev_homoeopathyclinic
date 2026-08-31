"use client";

import Image from "next/image";
import { Phone, Mail, MapPin, Sparkles, MessageCircle } from "lucide-react";
import { navLinks, site } from "@/lib/site-config";

const structuredData = {
  "@context": "https://schema.org",
  "@type": "MedicalClinic",
  name: site.name,
  image: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/logo-concept-1-transparent.png`,
  telephone: site.phone,
  email: site.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address,
    addressCountry: "IN",
  },
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  openingHoursSpecification: [
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Wednesday", "Thursday", "Friday", "Saturday"], opens: "10:00", closes: "13:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Wednesday", "Thursday", "Friday", "Saturday"], opens: "18:00", closes: "21:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Sunday", opens: "10:00", closes: "13:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Sunday", opens: "18:00", closes: "21:00" },
  ],
  medicalSpecialty: "Homeopathic",
};

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-transparent text-[#14221B] pt-12 pb-24 md:pb-12 overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div className="relative z-10 mx-auto max-w-[1536px] px-3 sm:px-6 lg:px-10">

        {/* Floating Spatial Footer Container */}
        <div className="rounded-[2.5rem] border border-white/90 bg-white/75 p-6 sm:p-10 lg:p-12 backdrop-blur-2xl shadow-[0_20px_60px_rgba(20,34,27,0.05)]">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-12 pb-10 border-b border-[#EAE3DA]">

            {/* Column 1: Brand & Vial Logo */}
            <div className="lg:col-span-4 space-y-4">
              <div className="flex items-center gap-4">
                <div className="relative h-16 w-16 sm:h-18 sm:w-18 shrink-0 transition-transform duration-300 group-hover:scale-105 filter drop-shadow-[0_4px_16px_rgba(14,124,123,0.3)]">
                  <Image
                    src="/logo-concept-1-transparent.png"
                    alt="Dr. Sheetal's Homoeopathy Clinic Medicine Vial Logo"
                    width={256}
                    height={256}
                    sizes="(max-width: 640px) 64px, 72px"
                    unoptimized
                    className="h-full w-full object-contain"
                  />
                </div>
                <span className="leading-tight flex flex-col justify-center">
                  <span className="font-luxury text-2xl sm:text-3xl font-semibold tracking-[0.02em] text-[#14221B]">
                    Dr. Sheetal&apos;s
                  </span>
                  <span className="font-accent text-xs sm:text-sm font-bold tracking-[0.24em] text-[#0E7C7B] uppercase mt-0.5">
                    Homoeopathy Clinic
                  </span>
                  <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-[#967531] mt-1">
                    Natural Family Healing
                  </span>
                </span>
              </div>

              <p className="text-sm font-light leading-relaxed text-[#4A5D52] max-w-sm">
                Personalized homeopathic care treating the root cause of health issues with 100% natural, safe sweet pills for your whole family.
              </p>

              <div className="inline-flex items-center gap-2 rounded-full border border-[#0E7C7B]/20 bg-[#0E7C7B]/8 px-3.5 py-1.5 text-[11px] tracking-wider text-[#0E7C7B] uppercase font-medium shadow-2xs">
                <Sparkles className="h-3 w-3 text-[#C5A059]" />
                <span>Registered Homoeopathic Clinic</span>
              </div>
            </div>

            {/* Column 2: Quick Links */}
            <div className="lg:col-span-2 space-y-3">
              <h4 className="font-sans text-xs font-semibold uppercase tracking-wider text-[#0E7C7B]">
                Navigation
              </h4>
              <ul className="space-y-2.5 text-sm font-light leading-relaxed text-[#4A5D52]">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="transition-colors hover:text-[#0E7C7B]"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Specializations */}
            <div className="lg:col-span-3 space-y-3">
              <h4 className="font-sans text-xs font-semibold uppercase tracking-wider text-[#0E7C7B]">
                Specialized Care
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm font-light leading-relaxed text-[#4A5D52]">
                <li>
                  <button
                    type="button"
                    onClick={() => {
                      window.dispatchEvent(
                        new CustomEvent("open-disease-modal", { detail: "skin-hair" })
                      );
                    }}
                    className="text-left transition-colors hover:text-[#0E7C7B] cursor-pointer"
                  >
                    Skin &amp; Hair Allergies
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => {
                      window.dispatchEvent(
                        new CustomEvent("open-disease-modal", { detail: "cough-sinus-asthma" })
                      );
                    }}
                    className="text-left transition-colors hover:text-[#0E7C7B] cursor-pointer"
                  >
                    Cough, Sinus &amp; Asthma
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => {
                      window.dispatchEvent(
                        new CustomEvent("open-disease-modal", { detail: "gas-acidity-stomach" })
                      );
                    }}
                    className="text-left transition-colors hover:text-[#0E7C7B] cursor-pointer"
                  >
                    Gas, Acidity &amp; Stomach
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => {
                      window.dispatchEvent(
                        new CustomEvent("open-disease-modal", { detail: "pcos-womens-health" })
                      );
                    }}
                    className="text-left transition-colors hover:text-[#0E7C7B] cursor-pointer"
                  >
                    PCOS, PCOD &amp; Women&apos;s Health
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => {
                      window.dispatchEvent(
                        new CustomEvent("open-disease-modal", { detail: "child-health-immunity" })
                      );
                    }}
                    className="text-left transition-colors hover:text-[#0E7C7B] cursor-pointer"
                  >
                    Child Health &amp; Immunity
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => {
                      window.dispatchEvent(
                        new CustomEvent("open-disease-modal", { detail: "migraine-stress-sleep" })
                      );
                    }}
                    className="text-left transition-colors hover:text-[#0E7C7B] cursor-pointer"
                  >
                    Migraine, Stress &amp; Sleep
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => {
                      window.dispatchEvent(
                        new CustomEvent("open-disease-modal", { detail: "joint-pain-arthritis" })
                      );
                    }}
                    className="text-left transition-colors hover:text-[#0E7C7B] cursor-pointer"
                  >
                    Joint Pain, Arthritis &amp; Sciatica
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => {
                      window.dispatchEvent(
                        new CustomEvent("open-disease-modal", { detail: "thyroid-metabolic" })
                      );
                    }}
                    className="text-left transition-colors hover:text-[#0E7C7B] cursor-pointer"
                  >
                    Thyroid &amp; Metabolic Care
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => {
                      window.dispatchEvent(
                        new CustomEvent("open-disease-modal", { detail: "kidney-stones-urinary" })
                      );
                    }}
                    className="text-left transition-colors hover:text-[#0E7C7B] cursor-pointer"
                  >
                    Kidney Stones &amp; Urinary Care
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 4: Contact Info */}
            <div className="lg:col-span-3 space-y-3">
              <h4 className="font-sans text-xs font-semibold uppercase tracking-wider text-[#0E7C7B]">
                Clinic Contact
              </h4>
              <ul className="space-y-3 text-sm font-light leading-relaxed text-[#4A5D52]">
                <li className="flex items-start gap-2.5">
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-[#0E7C7B]" />
                  <a href={`tel:${site.phone}`} className="hover:text-[#0E7C7B] transition-colors font-medium text-[#14221B]">
                    {site.phoneDisplay}
                  </a>
                </li>
                <li className="flex items-start gap-2.5">
                  <MessageCircle className="mt-0.5 h-4 w-4 shrink-0 text-[#0E7C7B]" />
                  <a
                    href={`https://wa.me/${site.whatsapp}?text=${encodeURIComponent("Hi Dr. Sheetal, I would like to consult about...")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#0E7C7B] transition-colors font-light"
                  >
                    WhatsApp: {site.phoneDisplay}
                  </a>
                </li>
                <li className="flex items-start gap-2.5">
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-[#0E7C7B]" />
                  <a href={`mailto:${site.email}`} className="hover:text-[#0E7C7B] transition-colors font-light">
                    {site.email}
                  </a>
                </li>
                <li className="flex items-start gap-2.5 font-light leading-relaxed text-[#4A5D52]">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#0E7C7B]" />
                  <span>{site.address}</span>
                </li>
              </ul>

              <a
                href={site.googleUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-light text-[#0E7C7B] hover:text-[#967531] transition-colors duration-200 pt-1 group"
              >
                {/* Google Maps pin icon */}
                <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#0E7C7B]/10 group-hover:bg-[#C5A059]/20 transition-colors duration-200 shrink-0">
                  <svg viewBox="0 0 24 24" className="w-3 h-3" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z" fill="currentColor"/>
                  </svg>
                </span>
                <span className="group-hover:underline underline-offset-2">Google Maps Location &amp; Reviews</span>
              </a>
            </div>

          </div>

          {/* Bottom Copyright */}
          <div className="pt-6 text-center text-xs font-light text-[#7A8A80]">
            <p>&copy; {year} {site.name}. All rights reserved. Registered Homoeopathic Medical Practice.</p>
          </div>
        </div>

      </div>
    </footer>
  );
}
