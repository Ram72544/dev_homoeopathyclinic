"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Service } from "@/lib/site-config";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldCheck,
  Clock,
  Sparkles,
  Calendar,
  Stethoscope,
  Activity,
  CheckCircle2,
} from "lucide-react";

interface DiseaseModalProps {
  service: Service | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DiseaseModal({
  service,
  open,
  onOpenChange,
}: DiseaseModalProps) {
  if (!service) return null;

  const Icon = service.icon;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto no-scrollbar [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden rounded-[2.25rem] border border-[#E0D8CC] dark:border-[#C5A059]/35 bg-[#FAF8F5] dark:bg-[#0E1310] p-6 sm:p-8 lg:p-9 shadow-[0_25px_70px_-15px_rgba(20,34,27,0.22)] dark:shadow-[0_25px_70px_-15px_rgba(0,0,0,0.85)] text-[#14221B] dark:text-[#FAF8F5]">

        <AnimatePresence mode="wait">
          <motion.div
            key={service.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Modal Header */}
            <div className="pb-5 border-b border-[#E8E1D5] dark:border-[#C5A059]/20">
              <div className="flex items-center gap-3.5 pr-8">
                <div className="flex h-12 w-12 sm:h-13 sm:w-13 items-center justify-center rounded-2xl border border-white/40 dark:border-[#C5A059]/40 bg-gradient-to-br from-[#1A3828] to-[#0D1E16] text-[#E5C583] shadow-md shrink-0">
                  <Icon className="h-6 w-6" />
                </div>
                <div>
                  <span className="font-sans text-[11px] font-bold tracking-widest text-[#967531] dark:text-[#E5C583] uppercase block">
                    Treatment &amp; Root Cause Overview
                  </span>
                  <DialogTitle className="font-serif text-2xl sm:text-3xl font-normal text-[#14221B] dark:text-[#FAF8F5] mt-0.5">
                    {service.title}
                  </DialogTitle>
                </div>
              </div>
              <DialogDescription className="text-sm font-light leading-relaxed text-[#4A5D52] dark:text-[#A3ACA7] mt-3">
                {service.shortDesc || service.description}
              </DialogDescription>
            </div>

            {/* Modal Body Content (Full Space) */}
            <div className="space-y-6 pt-6">
              {/* Treated Sub-Conditions Tags */}
              <div>
                <h4 className="font-sans text-xs sm:text-[12.5px] font-bold tracking-wider text-[#14221B] dark:text-[#FAF8F5] uppercase mb-3 flex items-center gap-2">
                  <Activity className="h-4 w-4 text-[#0E7C7B] dark:text-[#E5C583]" />
                  <span>Key Conditions Cured</span>
                </h4>
                <div className="flex flex-wrap gap-2">
                  {service.subConditions.map((condition) => (
                    <span
                      key={condition}
                      className="rounded-full border border-[#DCD3C7] dark:border-[#C5A059]/30 bg-white dark:bg-[#141A16] px-3.5 py-1.5 text-xs font-medium text-[#14221B] dark:text-[#FAF8F5] shadow-2xs transition-transform hover:scale-105 dark:hover:border-[#E5C583]"
                    >
                      {condition}
                    </span>
                  ))}
                </div>
              </div>

              {/* Medical Overview & Root Cause Grid */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-[#E2DAD0] dark:border-[#C5A059]/30 bg-white dark:bg-[#141A16] p-5 shadow-xs">
                  <h5 className="font-sans text-xs sm:text-[12px] font-bold text-[#14221B] dark:text-[#FAF8F5] uppercase tracking-wider flex items-center gap-1.5">
                    <Stethoscope className="h-3.5 w-3.5 text-[#C5A059]" />
                    <span>Understanding The Cause</span>
                  </h5>
                  <p className="mt-2 text-xs sm:text-[13px] font-light leading-relaxed text-[#4A5D52] dark:text-[#A3ACA7]">
                    {service.medicalOverview}
                  </p>
                </div>

                <div className="rounded-2xl border border-[#E2DAD0] dark:border-[#C5A059]/30 bg-white dark:bg-[#141A16] p-5 shadow-xs">
                  <h5 className="font-sans text-xs sm:text-[12px] font-bold text-[#14221B] dark:text-[#FAF8F5] uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="h-3.5 w-3.5 text-[#0E7C7B] dark:text-[#E5C583]" />
                    <span>Internal Root Cause</span>
                  </h5>
                  <p className="mt-2 text-xs sm:text-[13px] font-light leading-relaxed text-[#4A5D52] dark:text-[#A3ACA7]">
                    {service.rootCause}
                  </p>
                </div>
              </div>

              {/* Common Symptoms Checklist */}
              <div className="rounded-2xl border border-[#E2DAD0] dark:border-[#C5A059]/30 bg-[#F5EFE6] dark:bg-[#141A16] p-5 sm:p-6 shadow-xs">
                <h4 className="font-sans text-xs sm:text-[12.5px] font-bold tracking-wider text-[#14221B] dark:text-[#FAF8F5] uppercase mb-3 flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#0E7C7B] dark:text-[#E5C583]" />
                  <span>Common Symptoms Experienced</span>
                </h4>
                <ul className="space-y-2.5">
                  {service.symptoms.map((symptom, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2.5 text-sm font-light text-[#3D4D44] dark:text-[#A3ACA7] leading-relaxed"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-[#C5A059] mt-2 shrink-0" />
                      <span>{symptom}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Homeopathy Advantage & Recovery Duration */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-[#0E7C7B]/25 dark:border-[#14B8A6]/30 bg-[#0E7C7B]/6 dark:bg-[#14B8A6]/10 p-5 shadow-xs">
                  <h5 className="font-sans text-xs sm:text-[12px] font-bold text-[#0E7C7B] dark:text-[#14B8A6] uppercase tracking-wider flex items-center gap-1.5">
                    <ShieldCheck className="h-4 w-4 text-[#0E7C7B] dark:text-[#14B8A6]" />
                    <span>Why Homeopathy Cures Permanently</span>
                  </h5>
                  <p className="mt-2 text-xs sm:text-[13px] font-light leading-relaxed text-[#14221B] dark:text-[#FAF8F5]">
                    {service.homeopathyAdvantage}
                  </p>
                </div>

                <div className="rounded-2xl border border-[#C5A059]/35 dark:border-[#E5C583]/30 bg-[#C5A059]/10 dark:bg-[#E5C583]/10 p-5 shadow-xs">
                  <h5 className="font-sans text-xs sm:text-[12px] font-bold text-[#14221B] dark:text-[#FAF8F5] uppercase tracking-wider flex items-center gap-1.5">
                    <Clock className="h-4 w-4 text-[#C5A059]" />
                    <span>Expected Recovery Time</span>
                  </h5>
                  <p className="mt-2 text-xs sm:text-[13px] font-medium text-[#14221B] dark:text-[#FAF8F5]">
                    {service.recoveryDuration}
                  </p>
                  <p className="mt-1 text-[11px] font-light text-[#7A8A80] dark:text-[#9EB3A8]">
                    Constitutional remedies tailored to your individual body type.
                  </p>
                </div>
              </div>

              {/* Natural Flow Action CTA with Ample Clearance */}
              <div className="pt-4 pb-2 border-t border-[#E8E1D5] dark:border-white/10">
                <button
                  type="button"
                  onClick={() => {
                    onOpenChange(false);
                    window.dispatchEvent(
                      new CustomEvent("prefill-booking-form", {
                        detail: {
                          diseaseId: service.id,
                          diseaseTitle: service.title,
                          initialNotes: "",
                        },
                      })
                    );
                    setTimeout(() => {
                      const formEl = document.getElementById("contact-form") || document.getElementById("contact");
                      if (formEl) {
                        formEl.scrollIntoView({ behavior: "smooth" });
                      }
                    }, 120);
                  }}
                  className="w-full flex items-center justify-center gap-2.5 rounded-full bg-[#14221B] dark:bg-[#18201C] border border-[#14221B] dark:border-[#C5A059]/45 px-7 py-4 text-xs sm:text-sm font-medium tracking-[0.14em] text-[#FAF8F5] uppercase shadow-md transition-all duration-300 hover:bg-[#0E7C7B] dark:hover:bg-[#222C27] dark:hover:border-[#E5C583] hover:scale-[1.01] active:scale-[0.99] cursor-pointer min-h-[50px]"
                >
                  <Calendar className="h-4 w-4 text-[#E5C583]" />
                  <span>Book Consultation for {service.title}</span>
                </button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}
