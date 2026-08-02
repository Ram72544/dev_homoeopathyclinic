"use client";

import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { site } from "@/lib/site-config";
import { AppointmentForm } from "@/components/appointment-form";
import { motion } from "framer-motion";

export function Contact() {
  return (
    <section id="contact" className="relative py-8 md:py-12 bg-transparent overflow-hidden scroll-mt-28">
      {/* Soft Faded Luxury Ambient Light */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 right-10 h-[600px] w-[600px] rounded-full bg-radial from-[#F0EADF]/60 via-[#F7F3EC]/20 to-transparent blur-3xl" />
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
            Easy Appointment Booking
          </span>
          <h2 className="mt-3 font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#1F2C25]">
            Book Doctor Consultation
          </h2>
          <p className="mt-4 text-base sm:text-lg font-light leading-relaxed tracking-wide text-[#5C6B62]">
            Fill in your details below or call us directly. OPD Clinic Visits &amp; Online Consultations available.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-8 lg:grid-cols-12 items-start">

          {/* Left Column: Unified Info Card + Map */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 space-y-5"
          >
            {/* Unified Contact Info Card */}
            <div className="rounded-[2rem] border border-white/80 bg-white/70 backdrop-blur-md shadow-lg shadow-[#2C4036]/5 overflow-hidden divide-y divide-[#F0EADF]/80">

              {/* Phone */}
              <div className="flex items-center gap-4 px-5 py-4 hover:bg-white/90 transition-colors duration-200 group">
                <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-[#2C4036] text-[#C5A059]">
                  <Phone className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-[10px] font-light tracking-[0.2em] text-[#7A8A80] uppercase">Call Doctor Directly</p>
                  <a href={`tel:${site.phone}`} className="text-base font-normal text-[#1F2C25] tracking-wide hover:text-[#0E7C7B] transition-colors">
                    {site.phoneDisplay}
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-center gap-4 px-5 py-4 hover:bg-white/90 transition-colors duration-200 group">
                <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-[#2C4036] text-[#C5A059]">
                  <Mail className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-[10px] font-light tracking-[0.2em] text-[#7A8A80] uppercase">Email Us</p>
                  <a href={`mailto:${site.email}`} className="text-sm font-light text-[#2C4036] hover:text-[#C5A059] transition-colors">
                    {site.email}
                  </a>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start gap-4 px-5 py-4 hover:bg-white/90 transition-colors duration-200 group">
                <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-[#2C4036] text-[#C5A059] mt-0.5">
                  <MapPin className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-[10px] font-light tracking-[0.2em] text-[#7A8A80] uppercase mb-0.5">Clinic Location</p>
                  <p className="text-sm font-medium text-[#1F2C25]">{site.name}</p>
                  <p className="text-xs font-light text-[#5C6B62] leading-relaxed mt-0.5">{site.address}</p>
                </div>
              </div>

              {/* Timings */}
              <div className="flex items-start gap-4 px-5 py-4 hover:bg-white/90 transition-colors duration-200 group">
                <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-[#2C4036] text-[#C5A059] mt-0.5">
                  <Clock className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-[10px] font-light tracking-[0.2em] text-[#7A8A80] uppercase mb-1">OPD Timings</p>
                  <ul className="space-y-0.5">
                    {site.timings.map((t, i) => (
                      <li key={i} className="text-xs font-light text-[#5C6B62]">
                        <span className="font-medium text-[#1F2C25]">{t.days}:</span> {t.hours}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Spatial Glass Map Card */}
            <div className="relative overflow-hidden rounded-[2rem] border border-white/90 bg-white/70 p-3 shadow-xl backdrop-blur-2xl group transition-all duration-500 hover:shadow-[0_30px_70px_rgba(0,0,0,0.12)]">
              <div className="relative h-[220px] w-full overflow-hidden rounded-[1.5rem]">
                <iframe
                  src={site.mapsEmbedUrl}
                  title="Dr. Sheetal's Homoeopathy Clinic location"
                  width="100%"
                  height="280"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute -top-10 left-0 w-full h-[280px] rounded-[1.5rem] filter contrast-[1.06] saturate-[0.8] sepia-[0.12] brightness-[0.98] transition-all duration-700 group-hover:scale-[1.02] group-hover:saturate-100"
                />
                {/* Floating Directions Button */}
                <div className="absolute top-3 right-3">
                  <a
                    href="https://maps.google.com/?q=Dr.+Sheetal%27s+Homoeopathy+Clinic+Badarpur+New+Delhi"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full bg-[#1F2C25]/90 px-4 py-2 text-[10px] font-medium uppercase tracking-wider text-[#FAF8F5] shadow-lg backdrop-blur-md transition-all hover:bg-[#0E7C7B] shrink-0"
                  >
                    <span>Get Directions</span>
                    <span className="text-[#C5A059]">↗</span>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Booking Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 flex flex-col h-full"
          >
            <AppointmentForm />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
