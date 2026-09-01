"use client";

import { useState, useEffect, useMemo } from "react";
import { site, Service } from "@/lib/site-config";
import { motion, AnimatePresence } from "framer-motion";
import { DiseaseModal } from "./disease-modal";
import { ArrowUpRight, ChevronDown, ChevronUp } from "lucide-react";

const CATEGORIES = [
  { id: "all", label: "All Treatments (12)" },
  { id: "cancer-care", label: "Supportive Cancer Care", match: ["supportive-oncology-care"] },
  { id: "diabetes-metabolism", label: "Diabetes & Thyroid", match: ["diabetes-blood-sugar", "thyroid-metabolic", "liver-cholesterol-health"] },
  { id: "women-child", label: "Women & Child", match: ["pcos-womens-health", "child-health-immunity"] },
  { id: "skin-allergies", label: "Skin & Allergies", match: ["skin-hair", "cough-sinus-asthma"] },
  { id: "chronic-pain", label: "Pain & Digestion", match: ["joint-pain-arthritis", "gas-acidity-stomach", "migraine-stress-sleep", "kidney-stones-urinary"] },
];

const SERVICE_TAGS: Record<string, string> = {
  "supportive-oncology-care": "Oncology Support",
  "diabetes-blood-sugar": "Metabolic Care",
  "skin-hair": "Dermatology",
  "pcos-womens-health": "Women's Health",
  "child-health-immunity": "Pediatrics",
  "gas-acidity-stomach": "Gastroenterology",
  "cough-sinus-asthma": "Respiratory Care",
  "joint-pain-arthritis": "Orthopedic Care",
  "migraine-stress-sleep": "Neurology & Sleep",
  "thyroid-metabolic": "Endocrine Care",
  "kidney-stones-urinary": "Renal Care",
  "liver-cholesterol-health": "Hepatic Care",
};

export function WhatWeTreat() {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [activeCategory, setActiveCategory] = useState("all");
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    function handleOpenModal(e: Event) {
      const customEvent = e as CustomEvent<string>;
      const found = site.services.find((s) => s.id === customEvent.detail);
      if (found) setSelectedService(found);
    }
    window.addEventListener("open-disease-modal", handleOpenModal);
    return () => window.removeEventListener("open-disease-modal", handleOpenModal);
  }, []);

  const filteredServices = useMemo(() => {
    if (activeCategory === "all") {
      return showAll ? site.services : site.services.slice(0, 6);
    }
    const catObj = CATEGORIES.find((c) => c.id === activeCategory);
    if (!catObj || !catObj.match) return site.services;
    return site.services.filter((s) => catObj.match.includes(s.id));
  }, [activeCategory, showAll]);

  return (
    <section id="services" className="relative py-8 sm:py-12 md:py-16 bg-transparent overflow-hidden">
      {/* Soft Ambient Radial Light (Day Mode Only) */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden dark:hidden" aria-hidden="true">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[700px] w-[1000px] rounded-full bg-radial from-[#F4EFE6]/70 via-[#F8F5EE]/30 to-transparent blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1536px] px-3 sm:px-6 lg:px-10">

        {/* Centered Editorial Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto max-w-3xl text-center"
        >
          <h2 className="font-serif text-[clamp(2.25rem,4vw+0.5rem,3.75rem)] font-normal text-[#14221B] dark:text-[#FAF8F5] leading-tight tracking-tight">
            Conditions We Treat
          </h2>

          <p className="mt-4 text-base sm:text-lg font-light leading-relaxed text-[#2C3B32] dark:text-[#CBD5E1]">
            Gentle homoeopathic remedies chosen specifically for your body and symptoms to heal health problems naturally without side effects.
          </p>
        </motion.div>

        {/* Centered Horizontal Filter Pill Bar */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          {CATEGORIES.map((cat) => {
            const isSelected = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => {
                  setActiveCategory(cat.id);
                  if (cat.id !== "all") setShowAll(true);
                }}
                className={`rounded-full px-5 py-2.5 text-xs sm:text-[13px] font-medium tracking-wide transition-all duration-300 backdrop-blur-md cursor-pointer ${isSelected
                    ? "border border-[#14221B] dark:border-[#C5A059]/45 bg-[#14221B] dark:bg-[#18201C] text-[#FAF8F5] shadow-md shadow-[#14221B]/10 scale-105"
                    : "border border-[#14221B]/10 dark:border-white/10 bg-white/70 dark:bg-[#0E1310]/70 text-[#2C3B32] dark:text-[#A3ACA7] hover:border-[#14221B]/30 dark:hover:border-[#E5C583]/50 hover:bg-white dark:hover:bg-[#141A16]"
                  }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Symmetric 3-Column Luxury Treatment Grid */}
        <motion.div
          layout
          className="mt-10 grid gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {filteredServices.map((service, index) => {
              const Icon = service.icon;
              const tagLabel = SERVICE_TAGS[service.id] || "Classical Care";
              return (
                <motion.div
                  key={service.id}
                  layout
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.3, delay: index * 0.03 }}
                >
                  <div
                    onClick={() => setSelectedService(service)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") setSelectedService(service);
                    }}
                    aria-label={`View medical details for ${service.title}`}
                    className="group relative flex h-full min-h-[250px] cursor-pointer flex-col justify-between rounded-[2rem] border border-[#14221B]/10 dark:border-[#C5A059]/30 bg-white/80 dark:bg-[#0E1310]/90 p-6 backdrop-blur-xl shadow-xs transition-all duration-300 active:scale-[0.98] hover:border-[#14221B]/30 dark:hover:border-[#E5C583] hover:bg-white dark:hover:bg-[#141A16] hover:shadow-lg hover:-translate-y-1"
                  >
                    <div>
                      {/* Header: Symmetrical Icon & Concise Medical Tag */}
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#14221B] dark:bg-[#18201C] text-[#E5C583] shadow-xs group-hover:scale-105 transition-transform duration-300">
                          <Icon className="h-5 w-5" />
                        </div>

                        <span className="text-[11px] font-semibold tracking-wide text-[#0E7C7B] dark:text-[#E5C583] bg-[#0E7C7B]/8 dark:bg-[#C5A059]/10 px-3 py-1 rounded-full border border-[#0E7C7B]/15 dark:border-[#C5A059]/20">
                          {tagLabel}
                        </span>
                      </div>

                      {/* Title with Consistent Alignment */}
                      <div className="mt-4 min-h-[3rem] flex items-center">
                        <h3 className="font-serif text-xl font-normal text-[#14221B] dark:text-[#FAF8F5] tracking-tight group-hover:text-[#0E7C7B] dark:group-hover:text-[#E5C583] transition-colors leading-snug">
                          {service.title}
                        </h3>
                      </div>

                      {/* Short Description */}
                      <p className="mt-2 text-xs sm:text-[13px] font-light text-[#2C3B32] dark:text-[#CBD5E1] line-clamp-2 leading-relaxed min-h-[2.5rem]">
                        {service.shortDesc}
                      </p>
                    </div>

                    {/* Action Link Locked at Bottom */}
                    <div className="mt-5 pt-3.5 border-t border-[#14221B]/8 dark:border-white/10 flex items-center justify-between text-xs font-medium text-[#14221B] dark:text-[#E5C583] group-hover:underline">
                      <span>Clinical Overview</span>
                      <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-[#C5A059]" />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Smart Expand/Collapse Action for All Treatments */}
        {activeCategory === "all" && (
          <div className="mt-10 flex justify-center">
            <button
              type="button"
              onClick={() => setShowAll(!showAll)}
              className="group inline-flex items-center gap-2.5 rounded-full border border-[#14221B]/15 dark:border-[#C5A059]/35 bg-white/80 dark:bg-[#0E1310]/85 px-7 py-3.5 text-xs sm:text-sm font-medium text-[#14221B] dark:text-[#FAF8F5] shadow-xs backdrop-blur-md transition-all duration-300 hover:border-[#14221B]/40 dark:hover:border-[#E5C583] hover:bg-[#14221B] hover:text-[#FAF8F5] dark:hover:bg-[#18201C] dark:hover:text-[#E5C583] cursor-pointer"
            >
              <span>{showAll ? "Show Less Treatments" : "Explore All 12 Treatments (6 more)"}</span>
              {showAll ? (
                <ChevronUp className="h-4 w-4 text-[#C5A059] transition-transform duration-300 group-hover:-translate-y-0.5" />
              ) : (
                <ChevronDown className="h-4 w-4 text-[#C5A059] transition-transform duration-300 group-hover:translate-y-0.5" />
              )}
            </button>
          </div>
        )}

      </div>

      {/* Interactive Medical Disease Modal */}
      <DiseaseModal
        service={selectedService}
        open={Boolean(selectedService)}
        onOpenChange={(isOpen) => {
          if (!isOpen) setSelectedService(null);
        }}
      />
    </section>
  );
}
