"use client";

import Image from "next/image";
import { Phone, Mail, MapPin, ExternalLink } from "lucide-react";
import { navLinks, site } from "@/lib/site-config";
import { FadeUp, StaggerContainer, StaggerItem } from "@/components/ui/motion";

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
    <footer className="bg-teal-dark text-white/65 pb-20 md:pb-0">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div className="h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

      <StaggerContainer className="mx-auto grid max-w-6xl gap-10 px-6 py-12 sm:px-8 md:grid-cols-3">
        <StaggerItem>
          <div className="flex items-center gap-3">
            <Image
              src="/logo-mark-3d.svg"
              alt=""
              width={40}
              height={40}
              className="h-10 w-10 flex-shrink-0"
            />
            <span className="leading-tight">
              <span className="block font-serif text-lg font-bold text-white">
                {site.shortName}
              </span>
              <span className="block text-[9px] font-medium uppercase tracking-[0.2em] text-gold-light">
                Homoeopathy Clinic
              </span>
            </span>
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/45">
            {site.intro.slice(0, 120)}...
          </p>
        </StaggerItem>

        <StaggerItem>
          <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-gold">
            Quick Links
          </h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="transition-colors duration-200 hover:text-white">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </StaggerItem>

        <StaggerItem>
          <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-gold">
            Contact
          </h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li className="flex items-start gap-2.5">
              <Phone className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-gold/60" />
              <a href={`tel:${site.phone}`} className="transition-colors hover:text-white">
                {site.phoneDisplay}
              </a>
            </li>
            <li className="flex items-start gap-2.5">
              <Mail className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-gold/60" />
              <a href={`mailto:${site.email}`} className="transition-colors hover:text-white">
                {site.email}
              </a>
            </li>
            <li className="flex items-start gap-2.5">
              <MapPin className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-gold/60" />
              <span>{site.address}</span>
            </li>
          </ul>

          <a
            href={site.googleUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-1.5 text-sm text-gold/80 transition-colors hover:text-gold"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            Find us on Google
          </a>
        </StaggerItem>
      </StaggerContainer>

      <FadeUp>
        <div className="border-t border-white/8">
          <div className="mx-auto max-w-6xl px-6 py-5 text-center text-xs text-white/35 sm:px-8">
            &copy; {year} {site.name}. All rights reserved.
          </div>
        </div>
      </FadeUp>
    </footer>
  );
}
