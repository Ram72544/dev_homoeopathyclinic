"use client";

import { useState } from "react";
import Image from "next/image";
import { Menu, X, CalendarCheck } from "lucide-react";
import { navLinks, site } from "@/lib/site-config";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
      className="sticky top-0 z-50 border-b border-border/50 bg-white/90 backdrop-blur-md"
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3.5 sm:px-8">
        <a
          href="#home"
          className="flex items-center gap-3"
          aria-label={site.name}
        >
          <Image
            src="/logo-mark-3d.svg"
            alt=""
            width={44}
            height={44}
            loading="eager"
            className="h-9 w-9 flex-shrink-0 sm:h-10 sm:w-10"
          />
          <span className="leading-tight">
            <span className="block font-serif text-lg font-bold tracking-tight text-teal-dark sm:text-xl">
              {site.shortName}
            </span>
            <span className="block text-[9px] font-medium uppercase tracking-[0.2em] text-gold-dark sm:text-[10px]">
              Homoeopathy Clinic
            </span>
          </span>
        </a>

        <ul className="hidden items-center gap-7 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm font-medium text-foreground/70 transition-colors duration-200 hover:text-teal-dark"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href={site.bookingUrl}
              className="inline-flex items-center gap-2 rounded-full bg-mint-dark px-5 py-2.5 text-sm font-semibold text-teal-dark transition-all duration-200 hover:bg-mint hover:shadow-md hover:-translate-y-0.5"
            >
              <CalendarCheck className="h-4 w-4" />
              Book Appointment
            </a>
          </li>
        </ul>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex items-center justify-center rounded-lg p-2 text-teal-dark transition-colors hover:bg-surface-warm md:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.25, 0.4, 0.25, 1] }}
            className="overflow-hidden border-t border-border/50 bg-white md:hidden"
          >
            <ul className="mx-auto flex max-w-6xl flex-col gap-1 px-6 py-4">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-lg px-4 py-3 text-base font-medium text-foreground/80 transition-colors hover:bg-surface-warm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li className="pt-2">
                <a
                  href={site.bookingUrl}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center gap-2 rounded-full bg-mint-dark px-6 py-3 text-sm font-semibold text-teal-dark"
                >
                  <CalendarCheck className="h-4 w-4" />
                  Book Appointment
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
