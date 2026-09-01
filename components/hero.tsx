"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Calendar, Phone, Sparkles, ArrowUpRight, ShieldCheck } from "lucide-react";
import { site } from "@/lib/site-config";

export function Hero() {
  return (
    <section
      id="home"
      className="relative pt-6 pb-6 md:pt-10 md:pb-8 bg-transparent overflow-hidden"
    >
      {/* Spatial Environment Soft Multi-Layer Radial Background Lighting (Day Mode Only) */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden dark:hidden" aria-hidden="true">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 h-[700px] w-[1100px] rounded-full bg-radial from-[#F4EFE6]/90 via-[#F8F5EE]/50 to-transparent blur-3xl" />
        <div className="absolute -top-10 right-10 h-[400px] w-[400px] rounded-full bg-radial from-[#C5A059]/15 via-transparent to-transparent blur-2xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1536px] px-3 sm:px-6 lg:px-10">

        {/* Main Floating Spatial Luxury Glass Container */}
        <div className="relative overflow-hidden rounded-[2.5rem] border border-white/85 dark:border-[#C5A059]/35 bg-[#FAF8F5]/80 dark:bg-[#0E1310]/85 p-6 sm:p-10 lg:p-14 xl:p-16 shadow-[0_25px_70px_rgba(20,34,27,0.06),0_1px_2px_rgba(255,255,255,0.9)_inset] dark:shadow-[0_25px_70px_rgba(0,0,0,0.6)] backdrop-blur-2xl [transform:translate3d(0,0,0)] [backface-visibility:hidden] bg-clip-padding transition-colors duration-300">

          <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14 xl:gap-16">

            {/* Left Column: Spatial Hero Content */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-7 flex flex-col items-start"
            >
              {/* Trust Badge Pill */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1, duration: 0.6 }}
                className="inline-flex items-center gap-2 rounded-full border border-[#0E7C7B]/20 dark:border-[#C5A059]/40 bg-[#0E7C7B]/8 dark:bg-[#C5A059]/10 px-3.5 py-1.5 text-xs font-medium tracking-wide text-[#0E7C7B] dark:text-[#E5C583] shadow-2xs backdrop-blur-md mb-4"
              >
                <Sparkles className="h-3.5 w-3.5 text-[#C5A059]" />
                <span>Classical Constitutional Homoeopathy</span>
              </motion.div>

              {/* Main Heading in Fluid 8K Typography */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
                className="font-serif text-[clamp(2.25rem,4.5vw+0.75rem,4.25rem)] font-normal leading-[1.12] tracking-normal text-[#14221B] dark:text-[#FAF8F5]"
              >
                Gentle, Natural &amp; <br />
                <span className="italic font-normal text-[#0E7C7B] dark:text-[#E5C583] underline decoration-[#C5A059]/40 underline-offset-8">
                  Permanent Healing
                </span>{" "}
                for Your Whole Family
              </motion.h1>

              {/* Simple Clear English Copy */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="mt-5 max-w-xl text-base sm:text-lg font-light leading-relaxed tracking-wide text-[#4A5D52] dark:text-[#A3ACA7]"
              >
                {site.intro}
              </motion.p>

              {/* Harmonious Cohesive Luxury Action Buttons */}
              {/* Hero Action Buttons (Hidden on mobile where floating dock is active) */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55, duration: 0.7 }}
                className="mt-8 sm:mt-10 hidden sm:flex flex-wrap items-center gap-3.5 sm:gap-4 w-full sm:w-auto"
              >
                {/* Primary Action Button */}
                <a
                  href={site.bookingUrl}
                  className="group relative inline-flex items-center justify-center gap-2.5 rounded-full bg-[#14221B] dark:bg-[#18201C] border border-[#14221B] dark:border-[#C5A059]/45 px-7 py-3.5 sm:py-4 text-sm font-medium tracking-wide text-[#FAF8F5] shadow-md transition-all duration-300 hover:bg-[#0E7C7B] dark:hover:bg-[#222C27] dark:hover:border-[#E5C583] hover:scale-[1.01] active:scale-95 w-full sm:w-auto cursor-pointer"
                >
                  <Calendar className="h-4 w-4 text-[#E5C583] shrink-0" />
                  <span>Schedule Consultation</span>
                  <ArrowUpRight className="h-4 w-4 text-[#E5C583]/80 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0" />
                </a>

                {/* Secondary Action Button */}
                <a
                  href={`tel:${site.phone}`}
                  className="inline-flex items-center justify-center gap-2.5 rounded-full border border-[#14221B]/15 dark:border-[#C5A059]/35 bg-white/85 dark:bg-[#121714]/65 px-7 py-3.5 sm:py-4 text-sm font-medium tracking-wide text-[#14221B] dark:text-[#FAF8F5] backdrop-blur-md shadow-xs transition-all duration-300 hover:border-[#0E7C7B] dark:hover:border-[#E5C583] hover:text-[#0E7C7B] dark:hover:text-[#FAF8F5] hover:bg-white dark:hover:bg-[#1A221E] hover:scale-[1.01] active:scale-95 w-full sm:w-auto cursor-pointer"
                >
                  <Phone className="h-4 w-4 text-[#0E7C7B] dark:text-[#E5C583] shrink-0" />
                  <span>Call Doctor: {site.phoneDisplay}</span>
                </a>
              </motion.div>

              {/* Trust Indicators Bar */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.7 }}
                className="mt-6 sm:mt-10 grid grid-cols-3 gap-4 sm:gap-6 border-t border-[#EAE3DA] dark:border-[#C5A059]/20 pt-5 sm:pt-6 w-full max-w-lg"
              >
                <div>
                  <p className="font-serif text-2xl sm:text-3xl font-normal text-[#14221B] dark:text-[#FAF8F5]">4+ Yrs</p>
                  <p className="text-[11px] font-medium tracking-wider text-[#7A8A80] dark:text-[#A3ACA7] uppercase mt-0.5">Clinical Practice</p>
                </div>
                <div>
                  <p className="font-serif text-2xl sm:text-3xl font-normal text-[#14221B] dark:text-[#FAF8F5]">500+</p>
                  <p className="text-[11px] font-medium tracking-wider text-[#7A8A80] dark:text-[#A3ACA7] uppercase mt-0.5">Happy Families</p>
                </div>
                <div>
                  <p className="font-serif text-2xl sm:text-3xl font-normal text-[#14221B] dark:text-[#FAF8F5]">100%</p>
                  <p className="text-[11px] font-medium tracking-wider text-[#7A8A80] dark:text-[#A3ACA7] uppercase mt-0.5">Safe Sweet Pills</p>
                </div>
              </motion.div>

            </motion.div>

            {/* Right Column: High-DPI Visual Consultation Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-5 relative"
            >
              <div className="relative overflow-hidden rounded-[2.5rem] border border-white/90 dark:border-[#C5A059]/40 bg-white/70 dark:bg-[#0E1310]/85 p-4 sm:p-5 shadow-2xl backdrop-blur-2xl [transform:translate3d(0,0,0)] [backface-visibility:hidden]">

                {/* Expanded High-Quality Image Container */}
                <div className="relative h-[340px] sm:h-[480px] lg:h-[540px] xl:h-[580px] w-full overflow-hidden rounded-[2rem] bg-[#0E7C7B]/10">
                  <Image
                    src="/images/homeopathy-remedies-v2.png"
                    alt="Homeopathy Sweet Pills and Medicine Vial"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 45vw, 600px"
                    priority
                    loading="eager"
                    className="object-cover transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#14221B]/90 via-[#14221B]/25 to-transparent" />

                  {/* Direct Info Text Overlay at Bottom of Image */}
                  <div className="absolute bottom-5 left-5 right-5 sm:bottom-6 sm:left-6 sm:right-6 text-white pointer-events-none">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="h-4 w-4 text-[#E5C583]" />
                      <span className="text-xs font-medium tracking-widest uppercase text-[#E5C583]">Natural Science</span>
                    </div>
                    <h3 className="font-serif text-2xl font-normal mt-1 text-white drop-shadow-sm">Single Remedy Selection</h3>
                    <p className="text-sm font-light text-white/90 mt-1 leading-relaxed drop-shadow-xs">Gentle, safe sweet pills kids &amp; adults love.</p>
                  </div>
                </div>

              </div>
            </motion.div>

          </div>

        </div>
      </div>
    </section>
  );
}
