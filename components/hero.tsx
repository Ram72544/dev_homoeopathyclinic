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
              {/* Main Heading in Fluid Editorial Typography */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
                className="font-serif text-[clamp(2.5rem,5.2vw+0.5rem,4.75rem)] font-normal leading-[1.08] tracking-tight text-[#14221B] dark:text-[#FAF8F5]"
              >
                Gentle, Natural &amp; <br />
                <span className="italic font-normal text-[#0E7C7B] dark:text-[#E5C583] text-glow-emerald dark:text-glow-gold underline decoration-[#C5A059]/40 underline-offset-8">
                  Permanent Healing for
                </span>{" "}
                Your Whole Family
              </motion.h1>

              {/* High-Contrast Clear English Copy */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="mt-6 max-w-xl text-base sm:text-lg lg:text-xl font-light leading-relaxed tracking-wide text-[#2C3B32] dark:text-[#CBD5E1]"
              >
                {site.intro}
              </motion.p>

              {/* Hero Action Buttons (Streamlined single primary button + clean link) */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45, duration: 0.7 }}
                className="mt-8 sm:mt-10 flex flex-wrap items-center gap-4 w-full sm:w-auto"
              >
                {/* Primary Action Button */}
                <a
                  href={site.bookingUrl}
                  className="group relative inline-flex items-center justify-center gap-2.5 rounded-full bg-[#14221B] dark:bg-[#18201C] border border-[#14221B] dark:border-[#C5A059]/45 px-8 py-4 text-sm font-medium tracking-wide text-[#FAF8F5] shadow-md transition-all duration-300 hover:bg-[#1C2C23] dark:hover:bg-[#222C27] dark:hover:border-[#E5C583] hover:scale-[1.02] active:scale-95 cursor-pointer"
                >
                  <Calendar className="h-4 w-4 text-[#E5C583] shrink-0" />
                  <span>Book Consultation</span>
                  <ArrowUpRight className="h-4 w-4 text-[#E5C583]/80 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0" />
                </a>

                {/* Clean Link to Specializations */}
                <a
                  href="#services"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-[#14221B] dark:text-[#E5C583] hover:underline px-3 py-3.5 transition-colors group cursor-pointer"
                >
                  <span>Explore 12 Specializations</span>
                  <span className="text-[#C5A059] group-hover:translate-x-1 transition-transform duration-200">→</span>
                </a>
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
