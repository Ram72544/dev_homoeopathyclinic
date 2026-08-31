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
    <section id="contact" className="relative py-10 md:py-16 bg-transparent overflow-hidden scroll-mt-24">
      {/* Soft Ambient Light */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
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
          <div className="inline-flex items-center gap-2 rounded-full border border-[#C5A059]/30 bg-[#C5A059]/10 px-3.5 py-1 text-xs font-accent font-bold tracking-[0.20em] text-[#967531] uppercase">
            <Sparkles className="h-3 w-3 text-[#C5A059]" />
            <span>Easy Appointment Booking</span>
          </div>

          <h2 className="mt-3 font-serif text-[clamp(2rem,3.5vw+0.5rem,3.5rem)] font-normal text-[#14221B] leading-tight">
            Book Doctor Consultation
          </h2>
          <p className="mt-4 text-base sm:text-lg font-light leading-relaxed tracking-wide text-[#4A5D52]">
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
            className="lg:col-span-5 space-y-5"
          >
            {/* Unified Clinical Info Panel */}
            <div className="rounded-[2.5rem] border border-white/90 bg-white/85 backdrop-blur-xl shadow-[0_20px_60px_-15px_rgba(20,34,27,0.06),0_1px_2px_rgba(255,255,255,0.9)_inset] overflow-hidden divide-y divide-[#EAE3DA]/80">

              {/* Phone */}
              <div className="flex items-center gap-4 px-6 py-4.5 hover:bg-white/95 transition-colors duration-200 group">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-[#14221B] text-[#E5C583] shadow-xs">
                  <Phone className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-[10px] font-medium tracking-[0.2em] text-[#7A8A80] uppercase">Call Doctor Directly</p>
                  <a href={`tel:${site.phone}`} className="text-sm font-light text-[#14221B] hover:text-[#0E7C7B] transition-colors">
                    {site.phoneDisplay}
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-center gap-4 px-6 py-4.5 hover:bg-white/95 transition-colors duration-200 group">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-[#14221B] text-[#E5C583] shadow-xs">
                  <Mail className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-[10px] font-medium tracking-[0.2em] text-[#7A8A80] uppercase">Email Us</p>
                  <a href={`mailto:${site.email}`} className="text-sm font-light text-[#14221B] hover:text-[#0E7C7B] transition-colors">
                    {site.email}
                  </a>
                </div>
              </div>

              {/* Address (Clickable to Google Maps) */}
              <a
                href={site.googleUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-4 px-6 py-4.5 hover:bg-white/95 transition-colors duration-200 group/loc cursor-pointer"
                aria-label={`View ${site.name} on Google Maps`}
              >
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-[#14221B] text-[#E5C583] mt-0.5 shadow-xs group-hover/loc:bg-[#0E7C7B] group-hover/loc:text-white transition-colors duration-300">
                  <MapPin className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-[10px] font-medium tracking-[0.2em] text-[#7A8A80] uppercase mb-0.5">Clinic Location</p>
                  <p className="text-sm font-medium text-[#14221B] group-hover/loc:text-[#0E7C7B] transition-colors flex items-center gap-1.5">
                    <span>{site.name}</span>
                    <span className="text-[#C5A059] text-xs transition-transform duration-200 group-hover/loc:translate-x-0.5 group-hover/loc:-translate-y-0.5">↗</span>
                  </p>
                  <p className="text-xs font-light text-[#4A5D52] leading-relaxed mt-0.5 group-hover/loc:text-[#14221B] transition-colors">{site.address}</p>
                </div>
              </a>

              {/* Timings */}
              <div className="flex items-start gap-4 px-6 py-4.5 hover:bg-white/95 transition-colors duration-200 group">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-[#14221B] text-[#E5C583] mt-0.5 shadow-xs">
                  <Clock className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-[10px] font-medium tracking-[0.2em] text-[#7A8A80] uppercase mb-1.5">OPD Timings</p>
                  <div className="space-y-2 text-xs text-[#4A5D52]">
                    <div>
                      <p className="font-medium text-[#14221B]">Monday – Saturday (Except Tuesday):</p>
                      <p className="font-light pl-2 mt-0.5">• Morning: 10:00 AM – 1:00 PM</p>
                      <p className="font-light pl-2 mt-0.5">• Evening: 6:00 PM – 9:00 PM</p>
                    </div>

                    <div>
                      <p className="font-medium text-[#14221B]">Sunday:</p>
                      <p className="font-light pl-2 mt-0.5">• Morning: 10:00 AM – 1:00 PM</p>
                      <p className="font-light pl-2 mt-0.5">• Evening: 6:00 PM – 9:00 PM (Prior Appointment Only)</p>
                    </div>

                    <div>
                      <p className="font-medium text-[#14221B]">Tuesday: <span className="font-light text-[#7A8A80]">Closed (Weekly Off)</span></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Spatial Glass Map Card with Commute Landmarks */}
            <div className="relative overflow-hidden rounded-[2.5rem] border border-white/90 bg-white/85 p-3.5 shadow-[0_20px_60px_-15px_rgba(20,34,27,0.06),0_1px_2px_rgba(255,255,255,0.9)_inset] backdrop-blur-2xl group transition-all duration-500 hover:shadow-2xl">
              <div className="relative h-[200px] w-full overflow-hidden rounded-[2rem] bg-[#0E7C7B]/10">
                <iframe
                  src={site.mapsEmbedUrl}
                  title="Dr. Sheetal's Homoeopathy Clinic location"
                  width="100%"
                  height="260"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute -top-8 left-0 w-full h-[260px] rounded-[2rem] filter contrast-[1.05] saturate-[0.85] sepia-[0.08] transition-all duration-700 group-hover:scale-[1.02] group-hover:saturate-100"
                />
                {/* Floating Directions Button */}
                <div className="absolute top-3.5 right-3.5">
                  <a
                    href={site.googleUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full bg-[#14221B]/90 px-4 py-2 text-[10px] font-medium uppercase tracking-wider text-[#FAF8F5] shadow-lg backdrop-blur-md transition-all hover:bg-[#0E7C7B] shrink-0"
                  >
                    <span>Get Directions</span>
                    <span className="text-[#E5C583]">↗</span>
                  </a>
                </div>
              </div>

              {/* Quick Commute & Landmarks Guide */}
              <div className="mt-3.5 pt-3.5 border-t border-[#EAE3DA]/80">
                <div className="flex items-center justify-between mb-2.5 px-1">
                  <p className="text-[10px] font-semibold tracking-[0.16em] text-[#0E7C7B] uppercase flex items-center gap-1.5 font-sans">
                    <Navigation className="h-3 w-3" />
                    <span>Travel Time from Nearby Hubs</span>
                  </p>
                  <span className="text-[10px] text-[#7A8A80] font-light">Tap to navigate ↗</span>
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
                        className="group/hub flex items-start gap-2 rounded-2xl border border-[#EAE3DA]/70 bg-white/70 p-2.5 transition-all hover:bg-white hover:border-[#0E7C7B]/40 hover:shadow-xs"
                      >
                        <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-[#0E7C7B]/10 text-[#0E7C7B] group-hover/hub:bg-[#0E7C7B] group-hover/hub:text-white transition-colors duration-200 mt-0.5">
                          <Icon className="h-3.5 w-3.5" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-[11px] font-medium text-[#14221B] truncate group-hover/hub:text-[#0E7C7B] transition-colors">{hub.name}</p>
                          <p className="text-[10px] font-light text-[#7A8A80] mt-0.5">{hub.time} • {hub.dist}</p>
                        </div>
                      </a>
                    );
                  })}
                </div>
                
                <p className="mt-2.5 text-[11px] font-light text-[#4A5D52] flex items-center gap-1.5 bg-[#FAF8F5] rounded-xl px-3 py-1.5 border border-[#EAE3DA]/60">
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
            className="lg:col-span-7 flex flex-col h-full"
          >
            <AppointmentForm />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
