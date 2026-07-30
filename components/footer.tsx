"use client";

import Image from "next/image";
import { Phone, Mail, MapPin, ExternalLink, Sparkles } from "lucide-react";
import { navLinks, site } from "@/lib/site-config";

const structuredData = {
  "@context": "https://schema.org",
  "@type": "MedicalClinic",
  name: site.name,
  image: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/logo-mark-3d.svg`,
  telephone: site.phone,
  email: site.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address,
    addressCountry: "IN",
  },
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  openingHoursSpecification: [
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], opens: "10:00", closes: "13:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], opens: "18:00", closes: "21:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Sunday", opens: "10:00", closes: "13:00" },
  ],
  medicalSpecialty: "Homeopathic",
};

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-transparent text-[#2C4036] pt-16 pb-24 md:pb-12 overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div className="relative z-10 mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
        
        {/* Floating Spatial Footer Container */}
        <div className="rounded-[2.5rem] border border-white/80 bg-white/60 p-8 sm:p-12 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.05)]">
          <div className="grid gap-6 lg:gap-8 sm:grid-cols-2 lg:grid-cols-12 pb-12 border-b border-[#EAE3DA]/80">
            
            {/* Column 1: Brand & Vial Logo */}
            <div className="lg:col-span-4 space-y-4">
              <div className="flex items-center gap-3.5">
                <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full border border-[#0E7C7B]/30 bg-white/90 p-1 shadow-xs">
                  <Image
                    src="/logo-mark-3d.svg"
                    alt="Dr. Sheetal's Homoeopathy Clinic Medicine Vial Logo"
                    width={48}
                    height={48}
                    className="h-full w-full object-contain"
                  />
                </div>
                <span className="leading-tight">
                  <span className="block font-serif text-lg font-normal text-[#1F2C25]">
                    Dr. Sheetal&apos;s
                  </span>
                  <span className="block font-serif text-lg font-normal text-[#1F2C25]">
                    Homoeopathy Clinic
                  </span>
                  <span className="block font-sans text-xs font-medium uppercase tracking-wider text-[#0E7C7B] mt-1">
                    Natural Family Healing
                  </span>
                </span>
              </div>

              <p className="text-sm font-light leading-relaxed text-[#5C6B62] max-w-sm">
                Personalized homeopathic care treating the root cause of health issues with 100% natural, safe sweet pills for your whole family.
              </p>

              <div className="inline-flex items-center gap-2 rounded-full border border-white/90 bg-white/80 px-3.5 py-1.5 text-[11px] tracking-wider text-[#0E7C7B] uppercase font-light shadow-2xs">
                <Sparkles className="h-3 w-3 text-[#C5A059]" />
                <span>Ministry of AYUSH Recognized</span>
              </div>
            </div>

            {/* Column 2: Quick Links */}
            <div className="lg:col-span-2 space-y-3">
              <h4 className="font-sans text-xs font-medium uppercase tracking-wider text-[#0E7C7B]">
                Navigation
              </h4>
              <ul className="space-y-2.5 text-sm font-light leading-relaxed text-[#5C6B62]">
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
              <h4 className="font-sans text-xs font-medium uppercase tracking-wider text-[#0E7C7B]">
                Specialized Care
              </h4>
              <ul className="space-y-2.5 text-sm font-light leading-relaxed text-[#5C6B62]">
                <li>Skin & Hair Allergies</li>
                <li>Cough, Sinus & Asthma</li>
                <li>Gas, Acidity & Stomach</li>
                <li>PCOS & Women's Health</li>
                <li>Child Health & Immunity</li>
              </ul>
            </div>

            {/* Column 4: Contact Info */}
            <div className="lg:col-span-3 space-y-3">
              <h4 className="font-sans text-xs font-medium uppercase tracking-wider text-[#0E7C7B]">
                Clinic Contact
              </h4>
              <ul className="space-y-3 text-sm font-light leading-relaxed text-[#5C6B62]">
                <li className="flex items-start gap-2.5">
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-[#0E7C7B]" />
                  <a href={`tel:${site.phone}`} className="hover:text-[#0E7C7B] transition-colors font-light">
                    {site.phoneDisplay}
                  </a>
                </li>
                <li className="flex items-start gap-2.5">
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-[#0E7C7B]" />
                  <a href={`mailto:${site.email}`} className="hover:text-[#0E7C7B] transition-colors font-light">
                    {site.email}
                  </a>
                </li>
                <li className="flex items-start gap-2.5 font-light leading-relaxed text-[#5C6B62]">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#0E7C7B]" />
                  <span>{site.address}</span>
                </li>
              </ul>

              <a
                href={site.googleUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-light text-[#0E7C7B] hover:underline pt-1"
              >
                <ExternalLink className="h-3.5 w-3.5" />
                <span>Google Maps Location & Reviews</span>
              </a>
            </div>

          </div>

          {/* Bottom Copyright */}
          <div className="pt-8 text-center text-xs font-light text-[#7A8A80]">
            <p>&copy; {year} {site.name}. All rights reserved. Registered Homoeopathic Medical Practice.</p>
          </div>
        </div>

      </div>
    </footer>
  );
}
