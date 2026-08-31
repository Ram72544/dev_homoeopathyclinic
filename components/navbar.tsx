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
      className="sticky top-2.5 sm:top-4 z-50 mx-auto w-full max-w-[1536px] px-3 sm:px-6 lg:px-10"
    >
      {/* Floating Spatial Luxury Glass Navigation Bar */}
      <nav className="w-full flex items-center justify-between rounded-full border border-white/90 bg-[#FAF8F5]/90 px-4 sm:px-7 lg:px-10 py-3 sm:py-3.5 lg:py-4 backdrop-blur-2xl shadow-[0_16px_48px_-12px_rgba(20,34,27,0.07),0_1px_2px_rgba(255,255,255,0.95)_inset] [transform:translate3d(0,0,0)] [backface-visibility:hidden] bg-clip-padding">

        {/* Brand with Prominent Logo & Typography */}
        <a
          href="#home"
          className="flex items-center gap-3 sm:gap-3.5 shrink-0 group mr-3 sm:mr-6 lg:mr-8 min-w-0"
          aria-label={site.name}
        >
          <div className="relative h-13 w-13 sm:h-14 sm:w-14 lg:h-15 lg:w-15 shrink-0 transition-transform duration-300 group-hover:scale-105 filter drop-shadow-[0_3px_14px_rgba(14,124,123,0.30)]">
            <Image
              src="/logo-concept-1-transparent.png"
              alt="Dr. Sheetal's Homoeopathy Clinic Logo"
              width={256}
              height={256}
              sizes="(max-width: 640px) 52px, (max-width: 1024px) 56px, 60px"
              unoptimized
              priority
              loading="eager"
              className="h-full w-full object-contain"
            />
          </div>
          <span className="leading-tight shrink-0 flex flex-col justify-center">
            <span className="font-serif text-lg sm:text-xl lg:text-2xl font-normal leading-tight text-[#14221B] whitespace-nowrap group-hover:text-[#0E7C7B] transition-colors duration-300">
              Dr. Sheetal&apos;s
            </span>
            <span className="font-accent text-[9.5px] sm:text-[10.5px] lg:text-[11.5px] font-bold tracking-[0.24em] text-[#0E7C7B] uppercase whitespace-nowrap mt-1">
              HOMOEOPATHY CLINIC
            </span>
          </span>
        </a>

        {/* Center Desktop Links */}
        <ul className="hidden items-center gap-5 lg:gap-7 xl:gap-9 lg:flex shrink-0">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="relative font-sans text-xs lg:text-[13px] font-medium tracking-[0.08em] text-[#4A5D52] uppercase transition-colors duration-300 hover:text-[#0E7C7B] whitespace-nowrap py-1 px-1 group"
              >
                <span>{link.label}</span>
                <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-[#0E7C7B] transition-all duration-300 group-hover:w-full group-hover:left-0 rounded-full" />
              </a>
            </li>
          ))}
        </ul>

        {/* Right Action: Book Consultation Button */}
        <div className="hidden lg:flex items-center gap-3 shrink-0">
          <a
            href={site.bookingUrl}
            className="group relative inline-flex items-center gap-2 rounded-full bg-[#14221B] px-6 sm:px-7 py-3 sm:py-3.5 font-sans text-xs font-semibold tracking-wider text-[#FAF8F5] uppercase shadow-md transition-all duration-300 hover:bg-[#0E7C7B] hover:shadow-[0_10px_25px_rgba(14,124,123,0.35)] whitespace-nowrap shrink-0 hover:-translate-y-0.5 active:translate-y-0"
          >
            <Calendar className="h-3.5 w-3.5 text-[#E5C583]" />
            <span>BOOK CONSULTATION</span>
          </a>
        </div>

        {/* Mobile & Tablet Toggle */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex items-center justify-center rounded-full p-2.5 text-[#14221B] transition-colors hover:bg-white/80 lg:hidden shrink-0 touch-target"
          aria-label="Toggle menu"
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {/* Spatial Mobile & Tablet Menu Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="mt-2.5 max-h-[80vh] overflow-y-auto rounded-3xl border border-white/90 bg-[#FAF8F5]/95 p-5 shadow-2xl backdrop-blur-2xl lg:hidden z-50 [transform:translate3d(0,0,0)]"
          >
            <ul className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-2xl px-4 py-3 text-xs font-medium tracking-wider text-[#14221B] uppercase transition-colors hover:bg-white hover:text-[#0E7C7B]"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li className="pt-2">
                <a
                  href={site.bookingUrl}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center gap-2 rounded-full bg-[#14221B] px-6 py-3.5 text-xs font-medium tracking-wider text-[#FAF8F5] uppercase shadow-md transition-colors hover:bg-[#0E7C7B]"
                >
                  <Calendar className="h-4 w-4 text-[#E5C583]" />
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
