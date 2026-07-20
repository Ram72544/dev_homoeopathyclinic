"use client";

import { useState } from "react";
import Image from "next/image";
import { Menu, X, CalendarCheck } from "lucide-react";
import { navLinks, site } from "@/lib/site-config";

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-beige bg-white/90 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <a
          href="#home"
          className="flex items-center gap-3"
          aria-label={site.name}
        >
          <Image
            src="/logo-mark-3d.svg"
            alt=""
            width={48}
            height={48}
            loading="eager"
            className="h-10 w-10 flex-shrink-0 sm:h-12 sm:w-12"
          />
          <span className="leading-tight">
            <span className="block font-serif text-2xl font-bold text-teal-dark sm:text-3xl">
              {site.shortName}
            </span>
            <span className="block text-[10px] font-semibold uppercase tracking-[0.3em] text-teal-mid sm:text-xs">
              Homoeopathy Clinic
            </span>
          </span>
        </a>

        {/* Desktop links */}
        <ul className="hidden items-center gap-7 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm font-medium text-teal-dark/80 transition-colors hover:text-teal"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href={site.bookingUrl}
              className="inline-flex items-center gap-2 rounded-full bg-teal px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-teal-dark"
            >
              <CalendarCheck className="h-4 w-4" />
              Book Appointment
            </a>
          </li>
        </ul>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex items-center justify-center rounded-md p-2 text-teal-dark md:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div id="mobile-menu" className="border-t border-beige bg-white md:hidden">
          <ul className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-3">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-md px-3 py-2 text-base font-medium text-teal-dark/90 hover:bg-beige-soft"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className="pt-2">
              <a
                href={site.bookingUrl}
                onClick={() => setOpen(false)}
                className="flex items-center justify-center gap-2 rounded-full bg-teal px-5 py-3 text-sm font-semibold text-white"
              >
                <CalendarCheck className="h-4 w-4" />
                Book Appointment
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
