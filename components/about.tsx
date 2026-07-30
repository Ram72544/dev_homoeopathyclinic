"use client";

import Image from "next/image";
import { Award, GraduationCap, Sparkles } from "lucide-react";
import { site } from "@/lib/site-config";
import { motion } from "framer-motion";

export function About() {
  const { about } = site;

  return (
    <section id="about" className="relative py-8 md:py-12 bg-transparent overflow-hidden">
      {/* Soft Faded Luxury Ambient Light */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 -right-20 h-[500px] w-[500px] rounded-full bg-radial from-[#F0EADF]/50 via-[#F7F3EC]/20 to-transparent blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1440px] px-6 lg:px-10">
        <div className="grid items-center gap-16 lg:grid-cols-12">
          
          {/* Left: Bio & Qualifications */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 space-y-6"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/70 px-4 py-1.5 text-xs tracking-widest text-[#4A6B5D] uppercase backdrop-blur-md shadow-2xs">
              <Sparkles className="h-3.5 w-3.5 text-[#C5A059]" />
              <span>Practitioner Profile</span>
            </div>

            <h2 className="font-serif text-4xl sm:text-5xl font-normal text-[#1F2C25] leading-tight">
              Meet {about.doctorName}
            </h2>

            <div className="space-y-5 text-base sm:text-lg font-light leading-relaxed text-[#5C6B62]">
              {about.bio.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>

            <div className="pt-4 flex flex-wrap items-center gap-4 text-xs tracking-widest text-[#7A8A80] uppercase font-light border-t border-[#EAE3DA]/60">
              <span>Classical Practitioner</span>
              <span>•</span>
              <span>Individualized Healing</span>
              <span>•</span>
              <span>AYUSH Registered</span>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 pt-2">
              <div className="rounded-2xl border border-white/80 bg-white/60 p-5 shadow-lg shadow-[#2C4036]/5 backdrop-blur-md">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/35 bg-gradient-to-br from-[#2A4034] to-[#1F2C25] text-[#E5C583] shadow-[inset_0_1px_2px_rgba(255,255,255,0.4)] backdrop-blur-md">
                  <GraduationCap className="h-5 w-5" />
                </div>
                <p className="mt-3 font-serif text-base font-normal text-[#1F2C25]">{about.credentials}</p>
                <p className="text-xs font-light text-[#7A8A80] mt-0.5">Qualified Homoeopathic Physician</p>
              </div>

              <div className="rounded-2xl border border-white/80 bg-white/60 p-5 shadow-lg shadow-[#2C4036]/5 backdrop-blur-md">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/35 bg-gradient-to-br from-[#2A4034] to-[#1F2C25] text-[#E5C583] shadow-[inset_0_1px_2px_rgba(255,255,255,0.4)] backdrop-blur-md">
                  <Award className="h-5 w-5" />
                </div>
                <p className="mt-3 font-serif text-base font-normal text-[#1F2C25]">{about.experience}</p>
                <p className="text-xs font-light text-[#7A8A80] mt-0.5">Clinical Practice in Delhi NCR</p>
              </div>
            </div>
          </motion.div>

          {/* Right: Clinic Sanctuary Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 relative"
          >
            <div className="relative overflow-hidden rounded-[2.5rem] border border-white/90 bg-white/70 p-4 shadow-2xl backdrop-blur-md [transform:translateZ(0)] [backface-visibility:hidden] bg-clip-padding">
              <div className="relative h-[420px] sm:h-[500px] w-full overflow-hidden rounded-2xl">
                <Image
                  src="/images/clinic-sanctuary.png"
                  alt="Dr Sheetal Homoeopathy Clinic Consultation Sanctuary Interior"
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1F2C25]/70 via-transparent to-transparent" />

                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <span className="text-xs font-light tracking-widest text-[#C5A059] uppercase">Serene Clinical Ambience</span>
                  <h3 className="font-serif text-xl font-normal mt-1">Holistic Doctor Consultation</h3>
                  <p className="text-xs font-light text-white/80 mt-1">Warm, listening-oriented care for every patient.</p>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
