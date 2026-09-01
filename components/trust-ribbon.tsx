"use client";

import { Award, Users, ShieldCheck, BadgeCheck } from "lucide-react";
import { motion } from "framer-motion";

const TRUST_PILLARS = [
  {
    icon: Award,
    metric: "4+ Years",
    label: "Clinical Experience",
  },
  {
    icon: Users,
    metric: "500+",
    label: "Healed Families",
  },
  {
    icon: ShieldCheck,
    metric: "100%",
    label: "Safe Sweet Pills",
  },
  {
    icon: BadgeCheck,
    metric: "BHMS, MD",
    label: "Govt. Registered Doctor",
  },
];

export function TrustRibbon() {
  return (
    <section className="relative z-20 -mt-1 sm:-mt-2 mb-6 sm:mb-8 mx-auto max-w-[1536px] px-3 sm:px-6 lg:px-10">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="rounded-full border border-white/90 dark:border-[#C5A059]/35 bg-white/80 dark:bg-[#0E1310]/85 px-6 sm:px-10 py-3.5 sm:py-4 backdrop-blur-2xl shadow-[0_12px_35px_-10px_rgba(20,34,27,0.05),0_1px_2px_rgba(255,255,255,0.9)_inset] dark:shadow-[0_15px_40px_rgba(0,0,0,0.5)]"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 items-center justify-between divide-y md:divide-y-0 md:divide-x divide-[#14221B]/8 dark:divide-white/10">
          {TRUST_PILLARS.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.label}
                className={`flex items-center gap-3 justify-center md:justify-start ${
                  idx > 0 ? "pt-3 md:pt-0 md:pl-6" : ""
                }`}
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#0E7C7B]/10 dark:bg-[#C5A059]/15 text-[#0E7C7B] dark:text-[#E5C583]">
                  <Icon className="h-4 w-4" />
                </div>
                <div className="flex items-baseline gap-1.5 text-xs sm:text-sm font-medium text-[#14221B] dark:text-[#FAF8F5]">
                  <span className="font-bold text-[#0E7C7B] dark:text-[#E5C583]">
                    {pillar.metric}
                  </span>
                  <span className="text-[#3D4F44] dark:text-[#CBD5E1] font-normal">
                    {pillar.label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
