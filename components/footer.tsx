import Image from "next/image";
import { Phone, Mail, MapPin, ExternalLink } from "lucide-react";
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
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      opens: "10:00",
      closes: "13:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      opens: "18:00",
      closes: "21:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Sunday",
      opens: "10:00",
      closes: "13:00",
    },
  ],
  medicalSpecialty: "Homeopathic",
};

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-teal-dark text-white/80 pb-20 md:pb-0">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-3">
            <Image
              src="/logo-mark-3d.svg"
              alt=""
              width={44}
              height={44}
              className="h-11 w-11 flex-shrink-0"
            />
            <span className="leading-tight">
              <span className="block font-serif text-xl font-bold text-white sm:text-2xl">
                {site.shortName}
              </span>
              <span className="block text-[10px] font-semibold uppercase tracking-[0.3em] text-teal-mid">
                Homoeopathy Clinic
              </span>
            </span>
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/60">
            {site.intro}
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-widest text-teal-mid">
            Quick Links
          </h3>
          <ul className="mt-4 space-y-2 text-sm">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="hover:text-white">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-widest text-teal-mid">
            Contact
          </h3>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex items-start gap-3">
              <Phone className="mt-0.5 h-4 w-4 flex-shrink-0" />
              <a href={`tel:${site.phone}`} className="hover:text-white">
                {site.phoneDisplay}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <Mail className="mt-0.5 h-4 w-4 flex-shrink-0" />
              <a href={`mailto:${site.email}`} className="hover:text-white">
                {site.email}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0" />
              <div className="flex flex-col">
                <span>{site.name}</span>
                <span>{site.address}</span>
              </div>
            </li>
          </ul>

          {/* Social links hidden until accounts are ready */}

          <a
            href={site.googleUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 text-sm hover:text-white hover:underline"
          >
            <ExternalLink className="h-4 w-4" />
            Get us on Google
          </a>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-4 py-5 text-center text-xs text-white/50 sm:px-6">
          &copy; {year} {site.name}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
