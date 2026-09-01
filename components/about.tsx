"use client";

import Image from "next/image";
import { Award, GraduationCap, Sparkles, CheckCircle2, ShieldCheck } from "lucide-react";
import { site } from "@/lib/site-config";
import { motion } from "framer-motion";

export function About() {
  const { about } = site;

  return (
    <section id="about" className="relative py-4 sm:py-6 md:py-8 bg-transparent overflow-hidden">
      {/* Soft Ambient Light (Day Mode Only) */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden dark:hidden" aria-hidden="true">
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
            <h2 className="font-serif text-[clamp(2.25rem,4vw+0.5rem,3.75rem)] font-normal text-[#14221B] dark:text-[#FAF8F5] leading-tight tracking-tight">
              Meet {about.doctorName}
            </h2>

            <div className="space-y-4 text-base sm:text-lg font-light leading-relaxed text-[#2C3B32] dark:text-[#CBD5E1]">
              {about.bio.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>

            <div className="pt-3 flex flex-wrap items-center gap-3 sm:gap-4 text-xs tracking-wider text-[#7A8A80] dark:text-[#9EB3A8] uppercase font-medium border-t border-[#14221B]/10 dark:border-white/10">
              <span className="flex items-center gap-1.5 text-[#14221B] dark:text-[#FAF8F5]">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#0E7C7B] dark:text-[#E5C583]" /> Classical Practitioner
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5 text-[#14221B] dark:text-[#FAF8F5]">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#0E7C7B] dark:text-[#E5C583]" /> Individualized Healing
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5 text-[#14221B] dark:text-[#FAF8F5]">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#0E7C7B] dark:text-[#E5C583]" /> Root-Cause Recovery
              </span>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 pt-2">
              <div className="rounded-2xl border border-[#14221B]/10 dark:border-[#C5A059]/35 bg-white/80 dark:bg-[#0E1310]/90 p-5 shadow-sm backdrop-blur-md transition-all duration-300 hover:border-[#14221B]/25 dark:hover:border-[#E5C583]">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#14221B] dark:bg-[#18201C] text-[#E5C583] shadow-xs">
                  <GraduationCap className="h-5 w-5" />
                </div>
                <p className="mt-3 font-serif text-lg font-normal tracking-tight text-[#14221B] dark:text-[#FAF8F5]">MD Specialist (Homoeopathy)</p>
                <p className="text-xs font-light text-[#7A8A80] dark:text-[#A3ACA7] mt-0.5">Classical Constitutional Physician</p>
              </div>

              <div className="rounded-2xl border border-[#14221B]/10 dark:border-[#C5A059]/35 bg-white/80 dark:bg-[#0E1310]/90 p-5 shadow-sm backdrop-blur-md transition-all duration-300 hover:border-[#14221B]/25 dark:hover:border-[#E5C583]">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#14221B] dark:bg-[#18201C] text-[#E5C583] shadow-xs">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <p className="mt-3 font-serif text-lg font-normal tracking-tight text-[#14221B] dark:text-[#FAF8F5]">Safe for All Generations</p>
                <p className="text-xs font-light text-[#7A8A80] dark:text-[#A3ACA7] mt-0.5">Infants, Expecting Mothers &amp; Seniors</p>
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
            <div className="relative overflow-hidden rounded-[2.5rem] border border-white/90 dark:border-[#C5A059]/35 bg-white/80 dark:bg-[#0E1310]/90 p-3.5 sm:p-5 shadow-2xl backdrop-blur-2xl [transform:translate3d(0,0,0)] [backface-visibility:hidden] bg-clip-padding">
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
                <div className="absolute inset-0 bg-gradient-to-t from-[#14221B]/85 dark:from-[#08120D]/90 via-[#14221B]/20 to-transparent pointer-events-none" />

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
