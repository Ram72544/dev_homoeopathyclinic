"use client";

import Image from "next/image";
import { CalendarCheck, Phone, Star } from "lucide-react";
import { site } from "@/lib/site-config";
import { motion } from "framer-motion";
import { Spotlight } from "@/components/ui/spotlight";

export function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden bg-surface-warm"
    >
      <Spotlight
        className="-top-40 left-0 md:-top-20 md:left-60"
        fill="rgba(201, 169, 110, 0.06)"
      />

      {/* Soft organic accent */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.03]">
        <div className="absolute -right-20 top-10 h-[500px] w-[500px] rounded-full bg-gold" />
      </div>

      <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-10 px-6 py-14 sm:px-8 md:grid-cols-[1.1fr_0.9fr] md:py-20 lg:gap-16 lg:py-24">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
        >
          {/* Trust badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-4 py-2"
          >
            <div className="flex -space-x-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-3.5 w-3.5 fill-gold text-gold" />
              ))}
            </div>
            <span className="text-xs font-medium text-foreground">
              Trusted by 500+ families
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.7, ease: [0.25, 0.4, 0.25, 1] }}
            className="mt-5 text-4xl font-bold leading-[1.1] tracking-tight text-teal-dark sm:text-5xl lg:text-[3.5rem]"
          >
            {site.tagline}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="mt-5 max-w-lg text-base leading-relaxed text-muted sm:text-lg"
          >
            {site.intro}
          </motion.p>

          {/* Credentials */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="mt-4 text-sm font-semibold text-gold-dark"
          >
            {site.about.credentials}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <a
              href={site.bookingUrl}
              className="inline-flex items-center gap-2 rounded-full bg-mint-dark px-7 py-3.5 text-sm font-semibold text-teal-dark shadow-sm transition-all duration-300 hover:bg-mint hover:shadow-md hover:-translate-y-0.5"
            >
              <CalendarCheck className="h-4 w-4" />
              Book Appointment
            </a>
            <a
              href={`tel:${site.phone}`}
              className="inline-flex items-center gap-2 rounded-full border border-teal-dark px-7 py-3.5 text-sm font-semibold text-teal-dark transition-all duration-300 hover:bg-teal-dark hover:text-white hover:-translate-y-0.5"
            >
              <Phone className="h-4 w-4" />
              {site.phoneDisplay}
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
          className="flex justify-center"
        >
          <Image
            src="/logo-mark-3d.svg"
            alt={site.name}
            width={400}
            height={400}
            priority
            className="h-60 w-auto animate-float sm:h-72 lg:h-80"
          />
        </motion.div>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-gold-light/60 to-transparent" />
    </section>
  );
}
