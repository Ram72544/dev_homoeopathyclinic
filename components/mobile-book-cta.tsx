"use client";

import { CalendarCheck } from "lucide-react";
import { site } from "@/lib/site-config";
import { motion } from "framer-motion";

export function MobileBookCta() {
  return (
    <motion.div
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.8, duration: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
      className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-white/95 p-3 backdrop-blur md:hidden"
    >
      <a
        href={site.bookingUrl}
        className="flex w-full items-center justify-center gap-2 rounded-full bg-teal px-5 py-3 text-sm font-semibold text-white shadow-md transition-colors hover:bg-teal-dark"
      >
        <CalendarCheck className="h-4 w-4" />
        Book Appointment
      </a>
    </motion.div>
  );
}
