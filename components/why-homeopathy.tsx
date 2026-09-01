"use client";

import Image from "next/image";
import { site } from "@/lib/site-config";
import { motion } from "framer-motion";
import { MessageSquare, Stethoscope, HeartPulse, Sparkles } from "lucide-react";

const HEALING_STEPS = [
  {
    title: "Detailed Consultation",
    desc: "Doctor spends 30-45 mins listening carefully to your health history, symptoms, daily routine & stress factors.",
    icon: MessageSquare,
  },
  {
    title: "Individualized Remedy",
    desc: "You receive one single homoeopathic medicine selected specially for your unique body type, lifestyle, and health needs.",
    icon: Stethoscope,
  },
  {
    title: "Root Cause Recovery",
    desc: "Natural sweet pills work gently inside your body to rebuild immunity and permanently heal the illness.",
    icon: HeartPulse,
  },
];

export function WhyHomeopathy() {
  return (
    <section id="why" className="relative py-4 sm:py-6 md:py-8 bg-transparent overflow-hidden">
      <div className="relative z-10 mx-auto max-w-[1536px] px-3 sm:px-6 lg:px-10">

        {/* Main Floating Liquid Glass Container */}
        <div className="relative overflow-hidden rounded-[2.5rem] border border-white/20 dark:border-[#C5A059]/35 bg-[#0D2820]/90 dark:bg-[#0E1310]/90 p-6 sm:p-10 lg:p-14 xl:p-16 text-white backdrop-blur-3xl shadow-[0_30px_90px_rgba(0,0,0,0.3)] dark:shadow-[0_30px_90px_rgba(0,0,0,0.6)] [transform:translate3d(0,0,0)] [backface-visibility:hidden] bg-clip-padding transition-colors duration-300">

          {/* Background Botanical Image Refracted Underneath Liquid Glass */}
          <div className="absolute inset-0 -z-10 opacity-25 dark:opacity-10 mix-blend-overlay pointer-events-none">
            <Image
              src="/images/homeopathy-remedies-v2.png"
              alt="Natural Homeopathic Medicine"
              fill
              sizes="(max-width: 1536px) 100vw, 1536px"
              className="object-cover scale-110 filter blur-xs"
            />
          </div>

          {/* Liquid Top Edge Highlight */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/50 dark:via-[#E5C583]/40 to-transparent pointer-events-none" />

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 mx-auto max-w-4xl text-center"
          >
            <h2 className="font-serif text-[clamp(2.25rem,4vw+0.5rem,3.75rem)] font-normal text-white mt-1 leading-[1.12] tracking-tight">
              Why Patients Choose Classical Homoeopathy
            </h2>
            <p className="mt-4 text-sm sm:text-base lg:text-lg font-light leading-relaxed tracking-wide text-white/85 dark:text-[#CBD5E1]">
              Gentle, scientifically proven &amp; 100% natural medicine designed for lasting vitality.
            </p>
          </motion.div>

          {/* 4 Floating Liquid Glass Benefit Cards */}
          <div className="relative z-10 mt-10 sm:mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {site.benefits.map((benefit, idx) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  className="group relative overflow-hidden rounded-2xl border border-white/15 dark:border-[#C5A059]/25 bg-white/[0.04] dark:bg-[#141A16]/60 p-6 sm:p-7 backdrop-blur-md transition-all duration-300 hover:bg-white/[0.08] dark:hover:bg-[#1C2420] hover:dark:border-[#E5C583]/60 shadow-lg shadow-black/20 [transform:translate3d(0,0,0)]"
                >
                  {/* Icon prefixed with Heading */}
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/25 dark:border-[#C5A059]/30 bg-white/15 dark:bg-[#18201C] text-[#E5C583] shadow-xs group-hover:scale-105 transition-transform">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="font-serif text-lg sm:text-xl font-normal text-white tracking-tight leading-snug">
                      {benefit.title}
                    </h3>
                  </div>

                  <p className="mt-3 text-sm font-light leading-relaxed text-white/80 dark:text-[#CBD5E1]">
                    {benefit.description}
                  </p>
                </motion.div>
              );
            })}
          </div>

          {/* 3-Step Process Liquid Glass Capsule */}
          <div className="relative z-10 mt-10 sm:mt-12 overflow-hidden rounded-[2rem] border border-white/15 dark:border-[#C5A059]/30 bg-[#142A1E]/40 dark:bg-[#121714]/70 p-6 sm:p-10 lg:p-12 backdrop-blur-2xl [transform:translate3d(0,0,0)]">
            <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
              <h3 className="font-serif text-2xl sm:text-3xl text-white mt-1 font-normal tracking-tight">3 Steps to Your Permanent Recovery</h3>
            </div>

            <div className="grid gap-5 md:grid-cols-3">
              {HEALING_STEPS.map((s, idx) => {
                const Icon = s.icon;
                return (
                  <div key={idx} className="relative space-y-3 p-6 sm:p-7 text-left rounded-2xl border border-white/15 dark:border-[#C5A059]/25 bg-white/[0.04] dark:bg-[#141A16]/60 backdrop-blur-md transition-all duration-300 hover:bg-white/[0.08] dark:hover:bg-[#1C2420] hover:dark:border-[#E5C583]/60">
                    {/* Icon prefixed with Heading */}
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/25 dark:border-[#C5A059]/30 bg-white/15 dark:bg-[#18201C] text-[#E5C583] shadow-xs">
                        <Icon className="h-5 w-5" />
                      </div>
                      <h4 className="font-serif text-lg sm:text-xl font-normal text-white tracking-tight leading-snug">
                        {s.title}
                      </h4>
                    </div>

                    <p className="text-sm font-light leading-relaxed text-white/80 dark:text-[#CBD5E1]">
                      {s.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
