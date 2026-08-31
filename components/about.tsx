"use client";

import Image from "next/image";
import { Award, GraduationCap, Sparkles, CheckCircle2, ShieldCheck } from "lucide-react";
import { site } from "@/lib/site-config";
import { motion } from "framer-motion";

export function About() {
  const { about } = site;

  return (
    <section id="about" className="relative py-10 md:py-16 bg-transparent overflow-hidden">
      {/* Soft Ambient Light */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute top-1/3 -right-20 h-[550px] w-[550px] rounded-full bg-radial from-[#F4EFE6]/60 via-[#F8F5EE]/30 to-transparent blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1536px] px-3 sm:px-6 lg:px-10">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          
          {/* Left: Bio & Qualifications */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 space-y-6"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-[#C5A059]/30 bg-[#C5A059]/10 px-3.5 py-1 text-xs font-medium tracking-[0.2em] text-[#967531] uppercase">
              <Sparkles className="h-3 w-3 text-[#C5A059]" />
              <span>Practitioner Profile</span>
            </div>

            <h2 className="font-serif text-[clamp(2rem,3.5vw+0.5rem,3.5rem)] font-normal text-[#14221B] leading-tight">
              Meet {about.doctorName}
            </h2>

            <div className="space-y-4 text-base sm:text-lg font-light leading-relaxed text-[#4A5D52]">
              {about.bio.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>

            <div className="pt-3 flex flex-wrap items-center gap-3 sm:gap-4 text-xs tracking-wider text-[#7A8A80] uppercase font-medium border-t border-[#EAE3DA]">
              <span className="flex items-center gap-1.5 text-[#14221B]">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#0E7C7B]" /> Classical Practitioner
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5 text-[#14221B]">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#0E7C7B]" /> Individualized Healing
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5 text-[#14221B]">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#0E7C7B]" /> Root-Cause Recovery
              </span>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 pt-2">
              <div className="rounded-2xl border border-white/90 bg-white/75 p-5 shadow-lg shadow-[#14221B]/4 backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/35 bg-gradient-to-br from-[#1A3828] to-[#0D1E16] text-[#E5C583] shadow-[inset_0_1px_2px_rgba(255,255,255,0.4)] backdrop-blur-md">
                  <GraduationCap className="h-5 w-5" />
                </div>
                <p className="mt-3 font-serif text-lg font-normal text-[#14221B]">MD Specialist (Homoeopathy)</p>
                <p className="text-xs font-light text-[#7A8A80] mt-0.5">Classical Constitutional Physician</p>
              </div>

              <div className="rounded-2xl border border-white/90 bg-white/75 p-5 shadow-lg shadow-[#14221B]/4 backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/35 bg-gradient-to-br from-[#1A3828] to-[#0D1E16] text-[#E5C583] shadow-[inset_0_1px_2px_rgba(255,255,255,0.4)] backdrop-blur-md">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <p className="mt-3 font-serif text-lg font-normal text-[#14221B]">Safe for All Generations</p>
                <p className="text-xs font-light text-[#7A8A80] mt-0.5">Infants, Expecting Mothers &amp; Seniors</p>
              </div>
            </div>
          </motion.div>

          {/* Right: Clinic Sanctuary Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 relative w-full"
          >
            <div className="relative overflow-hidden rounded-[2.5rem] border border-white/90 bg-white/80 p-3.5 sm:p-5 shadow-2xl backdrop-blur-2xl [transform:translate3d(0,0,0)] [backface-visibility:hidden] bg-clip-padding">
              <div className="relative min-h-[360px] sm:min-h-[440px] md:min-h-[480px] lg:min-h-[520px] xl:min-h-[560px] w-full overflow-hidden rounded-[2rem] bg-[#0E7C7B]/10 [transform:translate3d(0,0,0)] [backface-visibility:hidden]">
                <Image
                  src="/images/clinic-sanctuary-v2.png"
                  alt="Dr Sheetal Homoeopathy Clinic Consultation Sanctuary Interior"
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 92vw, (max-width: 1536px) 48vw, 720px"
                  quality={95}
                  priority
                  className="object-cover object-center transition-transform duration-700 hover:scale-105 [transform:translate3d(0,0,0)]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#14221B]/85 via-[#14221B]/20 to-transparent pointer-events-none" />

                <div className="absolute bottom-5 left-5 right-5 sm:bottom-6 sm:left-6 sm:right-6 text-white pointer-events-none">
                  <span className="text-xs font-medium tracking-widest text-[#E5C583] uppercase flex items-center gap-1.5 drop-shadow-xs">
                    <ShieldCheck className="h-3.5 w-3.5 text-[#E5C583]" /> Serene Clinical Ambience
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl font-normal mt-1 text-white drop-shadow-sm">Holistic Doctor Consultation</h3>
                  <p className="text-xs sm:text-sm font-light text-white/90 mt-1 max-w-md">Warm, listening-oriented care for every patient in peaceful surroundings.</p>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
