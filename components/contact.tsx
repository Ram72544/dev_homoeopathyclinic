"use client";

import { Phone, Mail, MapPin, Clock, Sparkles, Navigation, Train, Car, Compass } from "lucide-react";
import { site } from "@/lib/site-config";
import { AppointmentForm } from "@/components/appointment-form";
import { motion } from "framer-motion";

const NEARBY_HUBS = [
  {
    name: "Badarpur Metro (Violet Line)",
    time: "8–10 mins",
    dist: "2.5 km",
    icon: Train,
    url: `https://www.google.com/maps/dir/?api=1&origin=Badarpur+Metro+Station+Delhi&destination=${encodeURIComponent(site.name + " " + site.address)}`,
  },
  {
    name: "Sarita Vihar / Mohan Estate",
    time: "12–15 mins",
    dist: "4.5 km",
    icon: Car,
    url: `https://www.google.com/maps/dir/?api=1&origin=Mohan+Estate+Metro+Station+Delhi&destination=${encodeURIComponent(site.name + " " + site.address)}`,
  },
  {
    name: "Hari Nagar & Jaitpur Rd",
    time: "3–5 mins",
    dist: "1.0 km",
    icon: Navigation,
    url: `https://www.google.com/maps/dir/?api=1&origin=Hari+Nagar+Extn+Jaitpur+Delhi&destination=${encodeURIComponent(site.name + " " + site.address)}`,
  },
  {
    name: "Kalindi Kunj & Noida Border",
    time: "15–18 mins",
    dist: "6.5 km",
    icon: Compass,
    url: `https://www.google.com/maps/dir/?api=1&origin=Kalindi+Kunj+Delhi&destination=${encodeURIComponent(site.name + " " + site.address)}`,
  },
];

export function Contact() {
  return (
    <section id="contact" className="relative py-4 sm:py-6 md:py-8 bg-transparent overflow-hidden scroll-mt-24">
      {/* Soft Ambient Light (Day Mode Only) */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden dark:hidden" aria-hidden="true">
        <div className="absolute top-1/4 right-10 h-[600px] w-[600px] rounded-full bg-radial from-[#F4EFE6]/60 via-[#F8F5EE]/25 to-transparent blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1536px] px-3 sm:px-6 lg:px-10">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto max-w-3xl text-center"
        >
          <h2 className="font-serif text-[clamp(2.25rem,4vw+0.5rem,3.75rem)] font-normal text-[#14221B] dark:text-[#FAF8F5] leading-tight tracking-tight">
            Book Doctor Consultation
          </h2>
          <p className="mt-4 text-base sm:text-lg font-light leading-relaxed tracking-wide text-[#2C3B32] dark:text-[#CBD5E1]">
            Fill in your details below or call us directly. OPD Clinic Visits &amp; Online Consultations available.
          </p>
        </motion.div>

        <div className="mt-10 sm:mt-12 grid gap-8 lg:grid-cols-12 items-start">

          {/* Left Column: Unified Info Card + Map */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 space-y-5 order-2 lg:order-1"
          >
            {/* Unified Clinical Info Panel */}
            <div className="rounded-[2.5rem] border border-white/90 dark:border-[#C5A059]/35 bg-white/85 dark:bg-[#0E1310]/90 backdrop-blur-xl shadow-[0_20px_60px_-15px_rgba(20,34,27,0.06),0_1px_2px_rgba(255,255,255,0.9)_inset] dark:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.6)] overflow-hidden divide-y divide-[#EAE3DA]/80 dark:divide-[#C5A059]/20">

              {/* Phone */}
              <div className="flex items-center gap-4 px-6 py-4.5 hover:bg-white/95 dark:hover:bg-[#141A16] transition-colors duration-200 group">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-[#14221B] dark:bg-[#18201C] border border-transparent dark:border-[#C5A059]/30 text-[#E5C583] shadow-xs">
                  <Phone className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-[10px] font-medium tracking-[0.2em] text-[#7A8A80] dark:text-[#E5C583] uppercase">Call Doctor Directly</p>
                  <a href={`tel:${site.phone}`} className="text-sm font-light text-[#14221B] dark:text-[#FAF8F5] hover:text-[#0E7C7B] dark:hover:text-[#E5C583] transition-colors">
                    {site.phoneDisplay}
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-center gap-4 px-6 py-4.5 hover:bg-white/95 dark:hover:bg-[#141A16] transition-colors duration-200 group">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-[#14221B] dark:bg-[#18201C] border border-transparent dark:border-[#C5A059]/30 text-[#E5C583] shadow-xs">
                  <Mail className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-[10px] font-medium tracking-[0.2em] text-[#7A8A80] dark:text-[#E5C583] uppercase">Direct Email</p>
                  <a href={`mailto:${site.email}`} className="text-sm font-light text-[#14221B] dark:text-[#FAF8F5] hover:text-[#0E7C7B] dark:hover:text-[#E5C583] transition-colors">
                    {site.email}
                  </a>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start gap-4 px-6 py-4.5 hover:bg-white/95 dark:hover:bg-[#141A16] transition-colors duration-200 group">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-[#14221B] dark:bg-[#18201C] border border-transparent dark:border-[#C5A059]/30 text-[#E5C583] shadow-xs mt-0.5">
                  <MapPin className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-[10px] font-medium tracking-[0.2em] text-[#7A8A80] dark:text-[#E5C583] uppercase">Clinic Location</p>
                  <p className="text-xs font-light text-[#4A5D52] dark:text-[#A3ACA7] leading-relaxed mt-0.5">
                    {site.address}
                  </p>
                </div>
              </div>

              {/* Timings */}
              <div className="flex items-start gap-4 px-6 py-4.5 hover:bg-white/95 dark:hover:bg-[#141A16] transition-colors duration-200 group">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-[#14221B] dark:bg-[#18201C] border border-transparent dark:border-[#C5A059]/30 text-[#E5C583] shadow-xs mt-0.5">
                  <Clock className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-[10px] font-medium tracking-[0.2em] text-[#7A8A80] dark:text-[#E5C583] uppercase">Consultation Timings</p>
                  
                  <div className="mt-1 space-y-1.5 text-xs text-[#4A5D52] dark:text-[#A3ACA7]">
                    <div>
                      <p className="font-medium text-[#14221B] dark:text-[#FAF8F5]">Monday &amp; Wednesday – Saturday:</p>
                      <p className="font-light pl-2 mt-0.5">• Morning: 10:00 AM – 1:00 PM</p>
                      <p className="font-light pl-2 mt-0.5">• Evening: 6:00 PM – 9:00 PM</p>
                    </div>

                    <div>
                      <p className="font-medium text-[#14221B] dark:text-[#FAF8F5]">Sunday:</p>
                      <p className="font-light pl-2 mt-0.5">• Morning: 10:00 AM – 1:00 PM</p>
                      <p className="font-light pl-2 mt-0.5">• Evening: 6:00 PM – 9:00 PM (Prior Appointment Only)</p>
                    </div>

                    <div>
                      <p className="font-medium text-[#14221B] dark:text-[#FAF8F5]">Tuesday: <span className="font-light text-[#7A8A80] dark:text-[#A3ACA7]">Closed (Weekly Off)</span></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Spatial Glass Map Card with Commute Landmarks */}
            <div className="relative overflow-hidden rounded-[2.5rem] border border-white/90 dark:border-[#C5A059]/35 bg-white/85 dark:bg-[#0E1310]/90 p-3.5 shadow-[0_20px_60px_-15px_rgba(20,34,27,0.06),0_1px_2px_rgba(255,255,255,0.9)_inset] dark:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.6)] backdrop-blur-2xl group transition-all duration-500 hover:shadow-2xl dark:hover:border-[#E5C583]">
              <div className="relative h-[220px] sm:h-[240px] w-full overflow-hidden rounded-[2rem] bg-[#0E7C7B]/10">
                <iframe
                  src={site.mapsEmbedUrl}
                  title="Dr. Sheetal's Homoeopathy Clinic location map"
                  width="100%"
                  height="100%"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full rounded-[2rem] border-0 filter contrast-[1.03] saturate-[0.9] dark:invert-[0.92] dark:hue-rotate-180 dark:contrast-[1.15] dark:brightness-[0.88] dark:saturate-[0.75] transition-all duration-700 group-hover:scale-[1.01]"
                />
                {/* Floating Directions Button */}
                <div className="absolute top-3.5 right-3.5 z-10">
                  <a
                    href={site.googleUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full bg-[#14221B]/90 dark:bg-[#18201C] border border-transparent dark:border-[#C5A059]/40 px-4 py-2 text-[10px] font-medium uppercase tracking-wider text-[#FAF8F5] shadow-lg backdrop-blur-md transition-all hover:bg-[#0E7C7B] shrink-0"
                  >
                    <span>Get Directions</span>
                    <span className="text-[#E5C583]">↗</span>
                  </a>
                </div>
              </div>

              {/* Quick Commute & Landmarks Guide */}
              <div className="mt-3.5 pt-3.5 border-t border-[#EAE3DA]/80 dark:border-[#C5A059]/20">
                <div className="flex items-center justify-between mb-2.5 px-1">
                  <p className="text-[10px] font-semibold tracking-[0.16em] text-[#0E7C7B] dark:text-[#E5C583] uppercase flex items-center gap-1.5 font-sans">
                    <Navigation className="h-3 w-3" />
                    <span>Travel Time from Nearby Hubs</span>
                  </p>
                  <span className="text-[10px] text-[#7A8A80] dark:text-[#A3ACA7] font-light">Tap to navigate ↗</span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {NEARBY_HUBS.map((hub) => {
                    const Icon = hub.icon;
                    return (
                      <a
                        key={hub.name}
                        href={hub.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/hub flex items-start gap-2 rounded-2xl border border-[#EAE3DA]/70 dark:border-[#C5A059]/30 bg-white/70 dark:bg-[#141A16]/80 p-2.5 transition-all hover:bg-white dark:hover:bg-[#1C2420] hover:border-[#0E7C7B]/40 dark:hover:border-[#E5C583]/60 hover:shadow-xs"
                      >
                        <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-[#0E7C7B]/10 dark:bg-[#C5A059]/15 text-[#0E7C7B] dark:text-[#E5C583] group-hover/hub:bg-[#0E7C7B] dark:group-hover/hub:bg-[#C5A059] group-hover/hub:text-white dark:group-hover/hub:text-[#14221B] transition-colors duration-200 mt-0.5">
                          <Icon className="h-3.5 w-3.5" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-[11px] font-medium text-[#14221B] dark:text-[#FAF8F5] truncate group-hover/hub:text-[#0E7C7B] dark:group-hover/hub:text-[#E5C583] transition-colors">{hub.name}</p>
                          <p className="text-[10px] font-light text-[#7A8A80] dark:text-[#A3ACA7] mt-0.5">{hub.time} • {hub.dist}</p>
                        </div>
                      </a>
                    );
                  })}
                </div>
                
                <p className="mt-2.5 text-[11px] font-light text-[#4A5D52] dark:text-[#A3ACA7] flex items-center gap-1.5 bg-[#FAF8F5] dark:bg-[#141A16]/80 rounded-xl px-3 py-1.5 border border-[#EAE3DA]/60 dark:border-[#C5A059]/30">
                  <MapPin className="h-3 w-3 text-[#C5A059] shrink-0" />
                  <span>Landmark: 2 mins from <strong>Kali Badi Mandir</strong> &amp; <strong>Love Kush Sweets</strong>, Saurabh Vihar</span>
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Booking Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col h-full order-1 lg:order-2"
          >
            <AppointmentForm />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
