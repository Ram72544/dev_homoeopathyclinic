"use client";

import Image from "next/image";
import { site } from "@/lib/site-config";
import { motion } from "framer-motion";
import { MessageSquare, Stethoscope, HeartPulse, Sparkles } from "lucide-react";

const HEALING_STEPS = [
  {
    step: "01",
    title: "1. Detailed Consultation",
    desc: "Doctor spends 30-45 mins listening carefully to your health history, symptoms, daily routine & stress factors.",
    icon: MessageSquare,
  },
  {
    step: "02",
    title: "2. Individualized Remedy",
    desc: "One single homeopathic medicine is customized specifically for your body type and constitutional makeup.",
    icon: Stethoscope,
  },
  {
    step: "03",
    title: "3. Root Cause Recovery",
    desc: "Natural sweet pills work gently inside your body to rebuild immunity and permanently heal the illness.",
    icon: HeartPulse,
  },
];

export function WhyHomeopathy() {
  return (
    <section id="why" className="relative py-8 md:py-12 bg-transparent overflow-hidden">
      <div className="relative z-10 mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
        
        {/* Main Floating Liquid Glass Container */}
        <div className="relative overflow-hidden rounded-[2.5rem] border border-white/20 bg-[#1A2E20]/80 p-8 sm:p-12 lg:p-16 text-white backdrop-blur-3xl [transform:translateZ(0)] [backface-visibility:hidden] bg-clip-padding">
          
          {/* Background Botanical Image Refracted Underneath Liquid Glass */}
          <div className="absolute inset-0 -z-10 opacity-35 mix-blend-overlay">
            <Image
              src="/images/homeopathy-remedies.png"
              alt="Botanical Texture Background"
              fill
              className="object-cover scale-125 filter blur-xs"
            />
          </div>

          {/* Liquid Top Edge Highlight */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/50 to-transparent pointer-events-none" />

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative z-10 mx-auto max-w-4xl text-center"
          >
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-white">
              Why Patients Choose Homeopathy
            </h2>
            <p className="mt-4 text-sm sm:text-base lg:text-lg font-light leading-relaxed tracking-wide text-white/80">
              Gentle, effective & 100% safe medicine recognized by the Ministry of AYUSH, Govt. of India.
            </p>
          </motion.div>

          {/* 4 Floating Liquid Glass Pills (Smoothed Anti-Aliased Corners) */}
          <div className="relative z-10 mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {site.benefits.map((benefit, idx) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="group relative overflow-hidden rounded-3xl border border-white/20 bg-[#25422C]/80 p-7 backdrop-blur-2xl transition-all duration-300 hover:border-white/40 hover:bg-[#2C4F35]/95 hover:-translate-y-1 [transform:translateZ(0)] [backface-visibility:hidden] bg-clip-padding"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/30 bg-white/20 text-white group-hover:scale-105 transition-transform [transform:translateZ(0)]">
                    <Icon className="h-6 w-6 text-[#E5C583]" />
                  </div>
                  <h3 className="mt-6 font-serif text-xl font-normal text-white">
                    {benefit.title}
                  </h3>
                  <p className="mt-2.5 text-sm font-light leading-relaxed text-white/75">
                    {benefit.description}
                  </p>
                </motion.div>
              );
            })}
          </div>

          {/* 3-Step Process Liquid Glass Capsule */}
          <div className="relative z-10 mt-14 overflow-hidden rounded-3xl border border-white/20 bg-[#223B27]/75 p-8 lg:p-12 backdrop-blur-2xl [transform:translateZ(0)] [backface-visibility:hidden] bg-clip-padding">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="text-xs font-light tracking-widest text-[#E5C583] uppercase">Simplicity & Care</span>
              <h3 className="font-serif text-2xl sm:text-3xl text-white mt-1.5 font-normal">3 Steps to Your Permanent Recovery</h3>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {HEALING_STEPS.map((s, idx) => {
                const Icon = s.icon;
                return (
                  <div key={idx} className="relative space-y-3.5 p-5 text-center sm:text-left rounded-3xl border border-white/20 bg-white/10 backdrop-blur-md [transform:translateZ(0)] bg-clip-padding">
                    <div className="flex items-center gap-3 justify-center sm:justify-start">
                      <span className="font-serif text-3xl font-normal text-[#E5C583]">{s.step}</span>
                      <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/25 bg-white/20 text-white">
                        <Icon className="h-5 w-5" />
                      </div>
                    </div>
                    <h4 className="font-serif text-lg text-white font-normal">{s.title}</h4>
                    <p className="text-sm font-light leading-relaxed text-white/75">{s.desc}</p>
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
