"use client";

import { useState } from "react";
import Image from "next/image";
import { Menu, X, Calendar } from "lucide-react";
import { navLinks, site } from "@/lib/site-config";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeToggle } from "./theme-toggle";

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
      <nav className="w-full flex items-center justify-between rounded-full border border-white/90 dark:border-[#C5A059]/35 bg-[#FAF8F5]/90 dark:bg-[#0E1310]/90 px-3.5 sm:px-7 lg:px-10 py-2.5 sm:py-3.5 lg:py-4 backdrop-blur-2xl shadow-[0_16px_48px_-12px_rgba(20,34,27,0.07),0_1px_2px_rgba(255,255,255,0.95)_inset] dark:shadow-[0_16px_48px_-12px_rgba(0,0,0,0.6)] [transform:translate3d(0,0,0)] [backface-visibility:hidden] bg-clip-padding transition-colors duration-300">

        {/* Brand with Prominent Logo & Typography */}
        <a
          href="#home"
          className="flex items-center gap-3 sm:gap-3.5 shrink-0 group mr-2 sm:mr-6 lg:mr-8 min-w-0"
          aria-label={site.name}
        >
          <div className="relative h-12 w-12 sm:h-14 sm:w-14 lg:h-15 lg:w-15 shrink-0 transition-transform duration-300 group-hover:scale-105 filter drop-shadow-[0_3px_14px_rgba(14,124,123,0.30)]">
            <Image
              src="/logo-concept-1-transparent.png"
              alt="Dr. Sheetal's Homoeopathy Clinic Logo"
              width={256}
              height={256}
              sizes="(max-width: 640px) 48px, (max-width: 1024px) 56px, 60px"
              unoptimized
              priority
              loading="eager"
              className="h-full w-full object-contain"
            />
          </div>
          <span className="leading-tight shrink-0 flex flex-col justify-center">
            <span className="font-serif text-base sm:text-xl lg:text-2xl font-normal leading-tight text-[#14221B] dark:text-[#FAF8F5] whitespace-nowrap group-hover:text-[#0E7C7B] dark:group-hover:text-[#E5C583] transition-colors duration-300">
              Dr. Sheetal&apos;s
            </span>
            <span className="font-accent text-[8.5px] sm:text-[10.5px] lg:text-[11.5px] font-bold tracking-[0.22em] sm:tracking-[0.24em] text-[#0E7C7B] dark:text-[#E5C583] uppercase whitespace-nowrap mt-0.5 sm:mt-1">
              HOMOEOPATHY CLINIC
            </span>
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <ul className="hidden lg:flex items-center gap-6 xl:gap-8 font-sans text-xs tracking-wider uppercase">
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
        </ul>

        {/* Right Action: Theme Toggle & Book Consultation Button */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Day / Night Theme Switcher */}
          <ThemeToggle />

          {/* Desktop Book Consultation Button */}
          <div className="hidden lg:flex items-center shrink-0">
            <a
              href={site.bookingUrl}
              className="group relative inline-flex items-center gap-2 rounded-full bg-[#14221B] dark:bg-[#18201C] border border-[#14221B] dark:border-[#C5A059]/45 px-6 sm:px-7 py-3 sm:py-3.5 font-sans text-xs font-semibold tracking-wider text-[#FAF8F5] uppercase shadow-md transition-all duration-300 hover:bg-[#1C2C23] dark:hover:bg-[#222C27] dark:hover:border-[#E5C583] whitespace-nowrap shrink-0 hover:-translate-y-0.5 active:scale-95 cursor-pointer"
            >
              <Calendar className="h-3.5 w-3.5 text-[#E5C583]" />
              <span>BOOK CONSULTATION</span>
            </a>
          </div>

          {/* Mobile & Tablet Drawer Button */}
          <button
            type="button"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close Navigation Menu" : "Open Navigation Menu"}
            className="flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-full border border-white/80 dark:border-[#C5A059]/30 bg-white/70 dark:bg-[#121714]/80 text-[#14221B] dark:text-[#FAF8F5] shadow-xs backdrop-blur-md transition-all hover:bg-white dark:hover:bg-[#1A221E] active:scale-95 lg:hidden cursor-pointer"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
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
            className="mt-2.5 max-h-[80vh] overflow-y-auto rounded-3xl border border-white/90 dark:border-[#C5A059]/35 bg-[#FAF8F5]/95 dark:bg-[#0E1310]/95 p-5 shadow-2xl backdrop-blur-2xl lg:hidden z-50 [transform:translate3d(0,0,0)]"
          >
            <ul className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-2xl px-4 py-3 text-xs font-medium tracking-wider text-[#14221B] dark:text-[#FAF8F5] uppercase transition-colors hover:bg-white dark:hover:bg-white/10 hover:text-[#0E7C7B] dark:hover:text-[#E5C583]"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li className="pt-2">
                <a
                  href={site.bookingUrl}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center gap-2 rounded-full bg-[#14221B] dark:bg-[#18201C] border border-[#14221B] dark:border-[#C5A059]/45 px-6 py-3.5 text-xs font-medium tracking-wider text-[#FAF8F5] uppercase shadow-md transition-colors hover:bg-[#0E7C7B] dark:hover:bg-[#222C27] dark:hover:border-[#E5C583]"
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
