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
            Fill in your details below or call us directly. OPD Clinic Visits & Online Consultations available.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-12 lg:grid-cols-12">
          
          {/* Left Column: Info & Map */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 space-y-4"
          >
            <InfoRow icon={<Phone className="h-4 w-4" />} label="Call Doctor Directly">
              <a href={`tel:${site.phone}`} className="font-sans font-normal text-base sm:text-lg text-[#1F2C25] tracking-wide hover:text-[#0E7C7B] transition-colors">
                {site.phoneDisplay}
              </a>
            </InfoRow>

            <InfoRow icon={<Mail className="h-4 w-4" />} label="Email Us">
              <a href={`mailto:${site.email}`} className="text-sm font-light text-[#2C4036] hover:text-[#C5A059] transition-colors">
                {site.email}
              </a>
            </InfoRow>

            <InfoRow icon={<MapPin className="h-4 w-4" />} label="Clinic Location">
              <div className="text-sm font-light leading-relaxed text-[#5C6B62]">
                <p className="font-medium text-[#1F2C25]">{site.name}</p>
                <p>{site.address}</p>
              </div>
            </InfoRow>

            <InfoRow icon={<Clock className="h-4 w-4" />} label="OPD Timings">
              <ul className="space-y-1 text-sm font-light text-[#5C6B62]">
                {site.timings.map((t, i) => (
                  <li key={i}>
                    <span className="font-medium text-[#1F2C25]">{t.days}:</span> {t.hours}
                  </li>
                ))}
              </ul>
            </InfoRow>

            {/* Spatial Glass Map Card */}
            <div className="relative overflow-hidden rounded-[2.5rem] border border-white/90 bg-white/70 p-3.5 shadow-2xl backdrop-blur-2xl group transition-all duration-500 hover:shadow-[0_30px_70px_rgba(0,0,0,0.12)] mt-6">
              <div className="relative h-[260px] w-full overflow-hidden rounded-[2rem]">
                <iframe
                  src={site.mapsEmbedUrl}
                  title="Dr. Sheetal's Homoeopathy Clinic location"
                  width="100%"
                  height="320"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute -top-12 left-0 w-full h-[320px] rounded-[2rem] filter contrast-[1.06] saturate-[0.8] sepia-[0.12] brightness-[0.98] transition-all duration-700 group-hover:scale-[1.02] group-hover:saturate-100"
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
            className="lg:col-span-6"
          >
            <AppointmentForm />
          </motion.div>

        </div>
      </div>
    </section>
  );
}

function InfoRow({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-4 rounded-2xl border border-white/80 bg-white/60 p-5 shadow-lg shadow-[#2C4036]/5 backdrop-blur-md transition-all hover:border-[#C5A059]/40 hover:bg-white/85">
      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-[#2C4036] text-[#C5A059]">
        {icon}
      </div>
      <div>
        <p className="text-xs font-light tracking-widest text-[#7A8A80] uppercase">{label}</p>
        <div className="mt-1">{children}</div>
      </div>
    </div>
  );
}
