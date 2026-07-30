"use client";

import { useState } from "react";
import Image from "next/image";
import { Menu, X, Calendar } from "lucide-react";
import { navLinks, site } from "@/lib/site-config";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="sticky top-2 sm:top-4 z-40 mx-auto w-full max-w-[1440px] px-3 sm:px-6 lg:px-10"
    >
      {/* Floating Spatial Glass Navigation Bar (Fluid Responsive Under High Browser Zoom) */}
      <nav className="w-full flex items-center justify-between rounded-[2.5rem] border border-white/80 bg-[#FAF8F5]/65 px-3.5 sm:px-6 lg:px-8 xl:px-12 py-2.5 sm:py-3.5 backdrop-blur-2xl shadow-[0_25px_70px_rgba(0,0,0,0.06)] [transform:translateZ(0)] [backface-visibility:hidden] bg-clip-padding">
        
        {/* Brand with 3D Medicine Vial & Leaf Logo */}
        <a
          href="#home"
          className="flex items-center gap-2 sm:gap-4 shrink-0 group mr-2 sm:mr-4 lg:mr-6 min-w-0"
          aria-label={site.name}
        >
          <div className="relative h-10 w-10 sm:h-12 sm:w-12 lg:h-14 lg:w-14 shrink-0 overflow-hidden rounded-full border border-[#0E7C7B]/30 bg-white p-0.5 sm:p-1 shadow-xs transition-transform duration-300 group-hover:scale-105">
            <Image
              src="/logo-mark-3d.svg"
              alt="Dr. Sheetal's Homoeopathy Clinic Medicine Vial Logo"
              width={56}
              height={56}
              priority
              className="h-full w-full object-contain"
            />
          </div>
          <span className="leading-tight shrink-0">
            <span className="block font-serif text-[11px] sm:text-sm lg:text-base font-normal tracking-wide text-[#1F2C25] whitespace-nowrap">
              Dr. Sheetal&apos;s
            </span>
            <span className="block font-serif text-[11px] sm:text-sm lg:text-base font-normal tracking-wide text-[#1F2C25] whitespace-nowrap">
              Homoeopathy Clinic
            </span>
          </span>
        </a>

        {/* Desktop Links (lg:flex for 1024px & Up) */}
        <ul className="hidden items-center gap-3 lg:gap-5 xl:gap-8 lg:flex shrink-0">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-[11px] lg:text-xs xl:text-sm font-medium tracking-wider text-[#3D4D44] uppercase transition-colors duration-300 hover:text-[#1F2C25] whitespace-nowrap"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Right CTA Button */}
        <div className="hidden lg:flex items-center shrink-0">
          <a
            href={site.bookingUrl}
            className="inline-flex items-center gap-2 rounded-full bg-[#1F2C25] px-4 lg:px-5 xl:px-7 py-2.5 lg:py-3 text-[11px] lg:text-xs xl:text-sm font-medium tracking-wider text-[#FAF8F5] uppercase shadow-lg transition-all duration-300 hover:bg-[#0E7C7B] hover:shadow-xl whitespace-nowrap shrink-0 hover:-translate-y-0.5"
          >
            <Calendar className="h-3.5 w-3.5 lg:h-4 lg:w-4 text-[#C5A059]" />
            <span>Book Consultation</span>
          </a>
        </div>

        {/* Mobile & Tablet Toggle */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex items-center justify-center rounded-full p-2 text-[#1F2C25] transition-colors hover:bg-white/80 lg:hidden shrink-0"
          aria-label="Toggle menu"
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {/* Spatial Mobile & Tablet Menu Panel (Zoom Safe) */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.25 }}
            className="mt-2.5 max-h-[75vh] overflow-y-auto rounded-3xl border border-white/80 bg-white/95 p-5 shadow-2xl backdrop-blur-2xl lg:hidden z-50"
          >
            <ul className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-2xl px-4 py-3 text-xs font-light tracking-wider text-[#1F2C25] uppercase transition-colors hover:bg-[#FAF8F5]"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li className="pt-2">
                <a
                  href={site.bookingUrl}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center gap-2 rounded-full bg-[#1F2C25] px-6 py-3 text-xs font-light tracking-wider text-[#FAF8F5] uppercase"
                >
                  <Calendar className="h-4 w-4 text-[#C5A059]" />
                  <span>Book Consultation</span>
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
