"use client";

import { useState, useEffect } from "react";
import { site, Service } from "@/lib/site-config";
import { motion } from "framer-motion";
import { DiseaseModal } from "./disease-modal";

export function WhatWeTreat() {
  const [selectedService, setSelectedService] = useState<Service | null>(null);

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

  return (
    <section id="services" className="relative py-8 md:py-12 bg-transparent overflow-hidden">
      {/* Soft Faded Luxury Ambient Light */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[900px] rounded-full bg-radial from-[#F0EADF]/60 via-[#F7F3EC]/30 to-transparent blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="text-xs font-light tracking-[0.25em] text-[#C5A059] uppercase">
            Curated Specializations
          </span>
          <h2 className="mt-3 font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#1F2C25]">
            Conditions We Heal
          </h2>
          <p className="mt-4 text-base sm:text-lg font-light leading-relaxed tracking-wide text-[#5C6B62]">
            Comprehensive, individualized homoeopathic remedies designed to restore your body's natural harmony.
          </p>
        </motion.div>

        {/* Clean Glassmorphism Cards Grid */}
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {site.services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
              >
                <div
                  onClick={() => setSelectedService(service)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") setSelectedService(service);
                  }}
                  aria-label={`View medical details for ${service.title}`}
                  className="group relative flex h-full cursor-pointer flex-col justify-between rounded-3xl border border-white/80 bg-white/60 p-7 backdrop-blur-md shadow-lg shadow-[#2C4036]/5 transition-all duration-500 hover:border-[#C5A059]/40 hover:bg-white/85 hover:shadow-xl hover:-translate-y-1"
                >
                  <div>
                    <div className="flex items-center justify-start">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/35 bg-gradient-to-br from-[#2A4034] to-[#1F2C25] text-[#E5C583] shadow-[inset_0_1px_2px_rgba(255,255,255,0.4)] backdrop-blur-md group-hover:scale-105 transition-all duration-300">
                        <Icon className="h-5 w-5" />
                      </div>
                    </div>

                    <h3 className="mt-6 font-serif text-xl sm:text-2xl font-normal text-[#1F2C25] group-hover:text-[#0E7C7B] transition-colors duration-300">
                      {service.title}
                    </h3>

                    <p className="mt-2.5 text-sm font-light leading-relaxed text-[#5C6B62] line-clamp-3">
                      {service.shortDesc || service.description}
                    </p>
                  </div>

                  <div className="mt-6 flex items-center justify-between border-t border-[#F0EADF]/80 pt-4">
                    <span className="text-xs font-light tracking-wide text-[#0E7C7B] group-hover:text-[#1F2C25] transition-colors">
                      View Medical Details & Remedies
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
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
