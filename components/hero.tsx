"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Calendar, Phone, Sparkles, ArrowUpRight, ShieldCheck } from "lucide-react";
import { site } from "@/lib/site-config";

export function Hero() {
  return (
    <section
      id="home"
      className="relative pt-12 pb-6 md:pt-16 md:pb-8 bg-transparent overflow-hidden"
    >
      {/* Spatial Environment Soft Radial Background Lighting */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 h-[700px] w-[1000px] rounded-full bg-radial from-[#F3ECE4]/80 via-[#F8F4EF]/40 to-transparent blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
        
        {/* Main Floating Spatial Glass Window Panel */}
        <div className="relative overflow-hidden rounded-[2.5rem] border border-white/80 bg-[#FAF8F5]/65 p-8 sm:p-12 lg:p-16 shadow-[0_25px_70px_rgba(0,0,0,0.06)] backdrop-blur-2xl [transform:translateZ(0)] [backface-visibility:hidden] bg-clip-padding">
          
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
            
            {/* Left Column: Spatial Hero Content */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-7 flex flex-col items-start"
            >
              {/* Main Heading in Google Playfair Serif */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
                className="mt-0 font-serif text-4xl sm:text-5xl lg:text-6xl font-normal leading-[1.12] tracking-wide text-[#1F2C25]"
              >
                Gentle, Natural & <br />
                <span className="italic font-normal text-[#0E7C7B] underline decoration-[#C5A059]/40 underline-offset-8">
                  Permanent Healing
                </span>{" "}
                for Your Whole Family
              </motion.h1>

              {/* Simple Clear English Copy */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45, duration: 0.8 }}
                className="mt-6 max-w-xl text-base sm:text-lg font-light leading-relaxed tracking-wide text-[#5C6B62]"
              >
                {site.intro}
              </motion.p>



              {/* Spatial Minimalist Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.65, duration: 0.7 }}
                className="mt-10 flex flex-wrap items-center gap-4"
              >
                <a
                  href={site.bookingUrl}
                  className="group relative inline-flex items-center gap-2.5 rounded-full bg-[#1F2C25] px-8 py-4 text-xs font-light tracking-widest text-[#FAF8F5] uppercase shadow-lg transition-all duration-500 hover:bg-[#0E7C7B] hover:shadow-xl hover:-translate-y-0.5"
                >
                  <Calendar className="h-4 w-4 text-[#C5A059]" />
                  <span>Schedule Visit</span>
                  <ArrowUpRight className="h-3.5 w-3.5 opacity-70 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>

                <a
                  href={`tel:${site.phone}`}
                  className="inline-flex items-center gap-2.5 rounded-full border border-white/90 bg-white/70 px-8 py-4 text-xs font-light tracking-widest text-[#1F2C25] uppercase backdrop-blur-md shadow-xs transition-all duration-500 hover:border-[#1F2C25] hover:bg-white hover:-translate-y-0.5"
                >
                  <Phone className="h-3.5 w-3.5 text-[#0E7C7B]" />
                  <span>Call Doctor</span>
                </a>
              </motion.div>

              {/* Trust Indicators */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.7 }}
                className="mt-10 grid grid-cols-3 gap-6 border-t border-[#EAE3DA]/80 pt-6 w-full max-w-lg"
              >
                <div>
                  <p className="font-serif text-2xl font-normal text-[#1F2C25]">4+ Yrs</p>
                  <p className="text-[11px] font-light tracking-wider text-[#7A8A80] uppercase mt-0.5">Clinical Practice</p>
                </div>
                <div>
                  <p className="font-serif text-2xl font-normal text-[#1F2C25]">500+</p>
                  <p className="text-[11px] font-light tracking-wider text-[#7A8A80] uppercase mt-0.5">Happy Families</p>
                </div>
                <div>
                  <p className="font-serif text-2xl font-normal text-[#1F2C25]">100%</p>
                  <p className="text-[11px] font-light tracking-wider text-[#7A8A80] uppercase mt-0.5">Safe Sweet Pills</p>
                </div>
              </motion.div>

            </motion.div>

            {/* Right Column: Clean Doctor Consultation Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-5 relative"
            >
              <div className="relative overflow-hidden rounded-[2.5rem] border border-white/90 bg-white/70 p-5 shadow-2xl backdrop-blur-2xl">
                
                {/* Expanded High-Quality Image Container */}
                <div className="relative h-[450px] sm:h-[540px] lg:h-[580px] w-full overflow-hidden rounded-[2rem]">
                  <Image
                    src="/images/homeopathy-remedies.png"
                    alt="Homeopathy Sweet Pills and Medicine Vial"
                    fill
                    priority
                    className="object-cover transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1F2C25]/90 via-[#1F2C25]/30 to-transparent" />

                  {/* Direct Info Text Overlay at Bottom of Image */}
                  <div className="absolute bottom-6 left-6 right-6 text-white pointer-events-none">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="h-4 w-4 text-[#E5C583]" />
                      <span className="text-xs font-medium tracking-widest uppercase text-[#E5C583]">Natural Science</span>
                    </div>
                    <h3 className="font-serif text-2xl font-normal mt-1.5 text-white drop-shadow-sm">Single Remedy Selection</h3>
                    <p className="text-sm font-light text-white/90 mt-1 leading-relaxed drop-shadow-xs">Gentle, safe sweet pills kids & adults love.</p>
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
