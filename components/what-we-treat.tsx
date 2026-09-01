"use client";

import { useState, useEffect, useMemo } from "react";
import { site, Service } from "@/lib/site-config";
import { motion, AnimatePresence } from "framer-motion";
import { DiseaseModal } from "./disease-modal";
import { ArrowUpRight, Sparkles } from "lucide-react";

const CATEGORIES = [
  { id: "all", label: "All Treatments (12)" },
  { id: "cancer-care", label: "Supportive Cancer Care", match: ["supportive-oncology-care"] },
  { id: "diabetes-metabolism", label: "Diabetes & Metabolism", match: ["diabetes-blood-sugar", "thyroid-metabolic", "liver-cholesterol-health"] },
  { id: "women-child", label: "Women & Child Health", match: ["pcos-womens-health", "child-health-immunity"] },
  { id: "skin-allergies", label: "Skin & Allergies", match: ["skin-hair", "cough-sinus-asthma"] },
  { id: "chronic-pain", label: "Chronic Pain & Digestion", match: ["joint-pain-arthritis", "gas-acidity-stomach", "migraine-stress-sleep", "kidney-stones-urinary"] },
];

export function WhatWeTreat() {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [activeCategory, setActiveCategory] = useState("all");
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    function handleOpenModal(e: Event) {
      const customEvent = e as CustomEvent<string>;
      const serviceId = customEvent.detail;
      const found = site.services.find(
        (s) => s.id === serviceId || s.title.toLowerCase() === serviceId?.toLowerCase()
      );
      if (found) {
        setSelectedService(found);
      }
    }

    window.addEventListener("open-disease-modal", handleOpenModal);
    return () => {
      window.removeEventListener("open-disease-modal", handleOpenModal);
    };
  }, []);

  const displayedServices = useMemo(() => {
    if (activeCategory === "all") {
      return showAll ? site.services : site.services.slice(0, 6);
    }
    const cat = CATEGORIES.find((c) => c.id === activeCategory);
    if (!cat?.match) return site.services;
    return site.services.filter((s) => cat.match?.includes(s.id));
  }, [activeCategory, showAll]);

  return (
    <section id="services" className="relative py-10 md:py-16 bg-transparent overflow-hidden">
      {/* Soft Ambient Radial Light (Day Mode Only) */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden dark:hidden" aria-hidden="true">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[700px] w-[1000px] rounded-full bg-radial from-[#F4EFE6]/70 via-[#F8F5EE]/30 to-transparent blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1536px] px-3 sm:px-6 lg:px-10">
        
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-[#C5A059]/30 bg-[#C5A059]/10 px-3.5 py-1 text-xs font-sans font-semibold tracking-widest text-[#967531] dark:text-[#E5C583] uppercase">
            <Sparkles className="h-3 w-3 text-[#C5A059]" />
            <span>Curated Specializations</span>
          </div>

          <h2 className="mt-3 font-serif text-[clamp(2rem,3.5vw+0.5rem,3.5rem)] font-normal text-[#14221B] dark:text-[#FAF8F5] leading-tight">
            Conditions We Heal Permanently
          </h2>
          <p className="mt-4 text-base sm:text-lg font-light leading-relaxed tracking-wide text-[#4A5D52] dark:text-[#9EB3A8]">
            Comprehensive, individualized homoeopathic remedies designed to restore your body&apos;s natural vitality without side effects.
          </p>
        </motion.div>

        {/* Interactive Category Filter Pills (Horizontal Swipeable on Mobile) */}
        <div className="mt-8 flex items-center gap-2 sm:gap-3 overflow-x-auto no-scrollbar scroll-smooth snap-x py-2 px-1 sm:px-0 sm:justify-center sm:flex-wrap">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => {
                  setActiveCategory(cat.id);
                  if (cat.id !== "all") setShowAll(true);
                }}
                className={`shrink-0 snap-start relative rounded-full px-4 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-medium tracking-wide transition-all duration-300 active:scale-95 cursor-pointer touch-target ${
                  isActive
                    ? "bg-[#14221B] dark:bg-[#0E7C7B] text-[#FAF8F5] shadow-md"
                    : "bg-white/85 dark:bg-[#14261D]/80 text-[#4A5D52] dark:text-[#9EB3A8] hover:bg-white dark:hover:bg-[#1A3326] hover:text-[#14221B] dark:hover:text-[#FAF8F5] border border-[#E8E1D5] dark:border-white/10"
                }`}
              >
                <span>{cat.label}</span>
                {isActive && (
                  <motion.span
                    layoutId="activeCategoryPill"
                    className="absolute inset-0 rounded-full border-2 border-[#C5A059]/50 dark:border-[#E5C583]/70 pointer-events-none"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Clean Glassmorphism Cards Grid */}
        <motion.div
          layout
          className="mt-10 grid gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {displayedServices.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.id}
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.35, delay: index * 0.04 }}
                  className="gpu-layer"
                >
                  <div
                    onClick={() => setSelectedService(service)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") setSelectedService(service);
                    }}
                    aria-label={`View medical details for ${service.title}`}
                    className="group relative flex h-full cursor-pointer flex-col justify-between rounded-[2.25rem] border border-white/90 dark:border-white/10 bg-white/75 dark:bg-[#0F1E16]/85 p-6 sm:p-7 backdrop-blur-xl shadow-[0_12px_40px_-12px_rgba(20,34,27,0.06),0_1px_2px_rgba(255,255,255,0.9)_inset] dark:shadow-[0_12px_40px_-12px_rgba(0,0,0,0.5)] transition-all duration-300 active:scale-[0.98] hover:border-[#C5A059]/60 dark:hover:border-[#E5C583]/50 hover:bg-white/95 dark:hover:bg-[#14261D]/95 hover:shadow-[0_20px_50px_-10px_rgba(14,124,123,0.14)] hover:-translate-y-1"
                  >
                    <div className="flex flex-col justify-between h-full">
                      <div>
                        {/* Icon */}
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/35 bg-gradient-to-br from-[#1A3828] to-[#0D1E16] text-[#E5C583] shadow-[inset_0_1px_2px_rgba(255,255,255,0.4)] backdrop-blur-md group-hover:scale-105 transition-all duration-300">
                          <Icon className="h-5 w-5" />
                        </div>

                        <h3 className="mt-5 font-serif text-xl sm:text-2xl font-normal text-[#0E7C7B] dark:text-[#14B8A6] group-hover:text-[#14221B] dark:group-hover:text-[#FAF8F5] transition-colors duration-300">
                          {service.title}
                        </h3>

                        <p className="mt-2.5 text-sm font-light leading-relaxed text-[#4A5D52] dark:text-[#9EB3A8]">
                          {service.shortDesc || service.description}
                        </p>
                      </div>

                      {/* Bottom Link with Clean Divider */}
                      <div className="mt-6 flex items-center justify-between border-t border-[#EAE3DA] dark:border-white/10 pt-4">
                        <span className="text-xs font-medium tracking-wide text-[#14221B] dark:text-[#FAF8F5] group-hover:text-[#0E7C7B] dark:group-hover:text-[#14B8A6] transition-colors">
                          View Medical Details
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Expand / Collapse All 12 Treatments Button (Only visible on All tab) */}
        {activeCategory === "all" && (
          <div className="mt-10 flex justify-center">
            <button
              type="button"
              onClick={() => setShowAll((prev) => !prev)}
              className="inline-flex items-center gap-2.5 rounded-full border border-[#C5A059]/40 dark:border-white/15 bg-white/90 dark:bg-[#14261D] px-7 py-3 text-sm font-medium tracking-wide text-[#14221B] dark:text-[#FAF8F5] shadow-sm backdrop-blur-md transition-all duration-300 hover:border-[#0E7C7B] dark:hover:border-[#14B8A6] hover:bg-[#14221B] dark:hover:bg-[#0E7C7B] hover:text-white hover:shadow-md cursor-pointer"
            >
              <span>{showAll ? "Show Less Specializations" : "Explore All 12 Conditions & Treatments"}</span>
              <span className="font-serif text-base">{showAll ? "↑" : "↓"}</span>
            </button>
          </div>
        )}

      </div>

      {/* Disease Detail Popup Modal */}
      <DiseaseModal
        service={selectedService}
        open={!!selectedService}
        onOpenChange={(open) => {
          if (!open) setSelectedService(null);
        }}
      />
    </section>
  );
}
