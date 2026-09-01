"use client";

import { Phone, Stethoscope } from "lucide-react";
import { site } from "@/lib/site-config";

export function MobileStickyBar() {
  const handleBookSlot = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const formElement =
      document.getElementById("contact-form") ||
      document.getElementById("contact");
    if (formElement) {
      formElement.scrollIntoView({ behavior: "smooth", block: "start" });
      setTimeout(() => {
        const input = document.getElementById("appointment-name-input");
        if (input) {
          input.focus({ preventScroll: true });
        }
      }, 500);
    }
  };

  const orbClasses =
    "flex h-13 w-13 items-center justify-center rounded-full bg-white dark:bg-[#141A16] text-[#0E7C7B] dark:text-[#E5C583] border border-[#E8E1D5] dark:border-[#C5A059]/35 shadow-xs transition-all duration-200 hover:border-[#0E7C7B] dark:hover:border-[#E5C583] hover:bg-[#FAF8F5] dark:hover:bg-[#1C2420] hover:shadow-sm active:scale-90 cursor-pointer";

  return (
    <aside
      aria-label="Quick Consultation Floating Dock"
      className="md:hidden fixed bottom-6 inset-x-0 z-40 flex justify-center pointer-events-none px-4"
    >
      {/* Floating Frosted Glass Island with Generous Spacing */}
      <div className="pointer-events-auto rounded-full border border-white/95 dark:border-[#C5A059]/35 bg-white/85 dark:bg-[#0E1310]/90 p-2.5 shadow-[0_20px_50px_-10px_rgba(20,34,27,0.16),0_1px_2px_rgba(255,255,255,0.95)_inset] dark:shadow-[0_20px_50px_-10px_rgba(0,0,0,0.7)] backdrop-blur-2xl flex items-center gap-4 sm:gap-5 transition-colors duration-300">
        
        {/* 1. WhatsApp Orb */}
        <a
          href={site.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with Dr. Sheetal on WhatsApp"
          title="WhatsApp Dr. Sheetal"
          className={orbClasses}
        >
          <svg
            className="h-5.5 w-5.5 fill-current"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
          </svg>
        </a>

        {/* 2. Direct Phone Call Orb */}
        <a
          href={`tel:${site.phone}`}
          aria-label="Call Dr. Sheetal directly"
          title="Call Doctor"
          className={orbClasses}
        >
          <Phone className="h-5.5 w-5.5 stroke-[1.8]" />
        </a>

        {/* 3. Lucide Official Medical Stethoscope Orb */}
        <a
          href="#contact-form"
          onClick={handleBookSlot}
          aria-label="Book Consultation Slot"
          title="Book Doctor Consultation"
          className={orbClasses}
        >
          <Stethoscope className="h-5.5 w-5.5 stroke-[1.8]" />
        </a>

      </div>
    </aside>
  );
}
