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
      <DialogContent className="max-h-[88vh] overflow-y-auto no-scrollbar [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden rounded-[2.5rem] border border-[#E5C583]/30 bg-[#FAF8F5]/98 p-7 sm:p-10 shadow-[0_25px_80px_rgba(0,0,0,0.18),0_0_0_1px_rgba(255,253,248,0.6),0_0_30px_rgba(255,253,248,0.25)] backdrop-blur-2xl">

          <AnimatePresence mode="wait">
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
            >
              <DialogHeader className="items-start text-left pb-5 border-b border-[#F0EADF]">
                <div className="flex items-center gap-3.5">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.1, duration: 0.4 }}
                    className="flex h-13 w-13 items-center justify-center rounded-2xl border border-white/35 bg-gradient-to-br from-[#2A4034] to-[#1F2C25] text-[#E5C583] shadow-md shrink-0"
                  >
                    <Icon className="h-6 w-6" />
                  </motion.div>
                  <div>
                    <span className="text-[10px] font-medium tracking-widest text-[#C5A059] uppercase block">
                      Treatment & Root Cause Overview
                    </span>
                    <DialogTitle className="font-serif text-2xl sm:text-3xl font-normal text-[#1F2C25] mt-0.5">
                      {service.title}
                    </DialogTitle>
                  </div>
                </div>
                <DialogDescription className="text-sm font-light leading-relaxed text-[#5C6B62] mt-3">
                  {service.shortDesc || service.description}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-7 pt-6">
                {/* Treated Sub-Conditions Tags */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15, duration: 0.4 }}
                >
                  <h4 className="text-xs font-semibold tracking-[0.18em] text-[#1F2C25] uppercase mb-3 flex items-center gap-2">
                    <Activity className="h-4 w-4 text-[#0E7C7B]" />
                    <span>Key Conditions Cured</span>
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {service.subConditions.map((condition) => (
                      <span
                        key={condition}
                        className="rounded-full border border-[#E8E1D5] bg-white px-3.5 py-1.5 text-xs font-medium text-[#2C4036] shadow-xs transition-transform hover:scale-105"
                      >
                        {condition}
                      </span>
                    ))}
                  </div>
                </motion.div>

                {/* Medical Overview & Root Cause Grid */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25, duration: 0.4 }}
                  className="grid gap-5 sm:grid-cols-2"
                >
                  <div className="rounded-2xl border border-white/80 bg-white/80 p-5 shadow-sm">
                    <h5 className="text-[11px] font-semibold text-[#1F2C25] uppercase tracking-[0.18em] flex items-center gap-1.5">
                      <Stethoscope className="h-3.5 w-3.5 text-[#C5A059]" />
                      <span>Understanding The Cause</span>
                    </h5>
                    <p className="mt-2 text-xs font-light leading-relaxed text-[#5C6B62]">
                      {service.medicalOverview}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white/80 bg-white/80 p-5 shadow-sm">
                    <h5 className="text-[11px] font-semibold text-[#1F2C25] uppercase tracking-[0.18em] flex items-center gap-1.5">
                      <Sparkles className="h-3.5 w-3.5 text-[#0E7C7B]" />
                      <span>Internal Root Cause</span>
                    </h5>
                    <p className="mt-2 text-xs font-light leading-relaxed text-[#5C6B62]">
                      {service.rootCause}
                    </p>
                  </div>
                </motion.div>

                {/* Common Symptoms Checklist */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35, duration: 0.4 }}
                  className="rounded-2xl border border-[#E8E1D5] bg-[#F4EFE6]/60 p-5 sm:p-6"
                >
                  <h4 className="text-[11px] font-semibold tracking-[0.18em] text-[#1F2C25] uppercase mb-3 flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[#2C4036]" />
                    <span>Common Symptoms Experienced</span>
                  </h4>
                  <ul className="space-y-2.5">
                    {service.symptoms.map((symptom, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-sm font-light text-[#3D4D44] leading-relaxed"
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-[#C5A059] mt-1.5 shrink-0" />
                        <span>{symptom}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>

                {/* Homeopathy Advantage & Recovery Duration */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.42, duration: 0.4 }}
                  className="grid gap-5 sm:grid-cols-2"
                >
                  <div className="rounded-2xl border border-[#0E7C7B]/20 bg-[#0E7C7B]/5 p-5">
                    <h5 className="text-[11px] font-semibold text-[#0E7C7B] uppercase tracking-[0.18em] flex items-center gap-1.5">
                      <ShieldCheck className="h-4 w-4 text-[#0E7C7B]" />
                      <span>Why Homeopathy Cures Permanently</span>
                    </h5>
                    <p className="mt-2 text-xs font-light leading-relaxed text-[#2C4036]">
                      {service.homeopathyAdvantage}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-[#C5A059]/30 bg-[#C5A059]/10 p-5">
                    <h5 className="text-[11px] font-semibold text-[#1F2C25] uppercase tracking-[0.18em] flex items-center gap-1.5">
                      <Clock className="h-4 w-4 text-[#C5A059]" />
                      <span>Expected Recovery Time</span>
                    </h5>
                    <p className="mt-2 text-xs font-medium text-[#1F2C25]">
                      {service.recoveryDuration}
                    </p>
                    <p className="mt-1 text-[11px] font-light text-[#7A8A80]">
                      Constitutional remedies tailored to your individual body type.
                    </p>
                  </div>
                </motion.div>

                {/* Key Constitutional Remedies */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.4 }}
                >
                  <h5 className="text-[10px] font-medium text-[#7A8A80] uppercase tracking-[0.22em] mb-2">
                    Proven Constitutional Remedies Considered:
                  </h5>
                  <div className="flex flex-wrap gap-1.5">
                    {service.keyRemedies.map((remedy) => (
                      <span
                        key={remedy}
                        className="text-[11px] font-mono text-[#2C4036] bg-white border border-[#E8E1D5] px-2.5 py-1 rounded-md shadow-xs"
                      >
                        {remedy}
                      </span>
                    ))}
                  </div>
                </motion.div>

                {/* Call to Action Button */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.55, duration: 0.4 }}
                  className="pt-4 border-t border-[#F0EADF]"
                >
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
                        const formEl = document.getElementById("contact-form") || document.getElementById("appointment");
                        if (formEl) {
                          formEl.scrollIntoView({ behavior: "smooth" });
                        }
                      }, 150);
                    }}
                    className="w-full flex items-center justify-center gap-2 rounded-full bg-[#1F2C25] px-6 py-3.5 text-xs font-light tracking-widest text-[#FAF8F5] uppercase shadow-lg transition-colors hover:bg-[#0E7C7B] cursor-pointer"
                  >
                    <Calendar className="h-4 w-4 text-[#C5A059]" />
                    <span>Book Consultation for {service.title}</span>
                  </button>
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}
