"use client";

import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { site } from "@/lib/site-config";
import { AppointmentForm } from "@/components/appointment-form";
import { FadeUp, SlideLeft, SlideRight } from "@/components/ui/motion";

export function Contact() {
  return (
    <section id="contact" className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        <FadeUp className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-gold-dark">
            Get In Touch
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-teal-dark sm:text-4xl">
            Book your consultation
          </h2>
          <p className="mt-4 text-base text-muted">
            Send us your details and we&apos;ll get back to you to confirm your
            appointment.
          </p>
        </FadeUp>

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          <SlideLeft delay={0.1}>
            <div className="space-y-3">
              <InfoRow icon={<Phone className="h-4 w-4" />} label="Call us">
                <a href={`tel:${site.phone}`} className="transition-colors hover:text-teal-dark">
                  {site.phoneDisplay}
                </a>
              </InfoRow>
              <InfoRow icon={<Mail className="h-4 w-4" />} label="Email">
                <a href={`mailto:${site.email}`} className="transition-colors hover:text-teal-dark">
                  {site.email}
                </a>
              </InfoRow>
              <InfoRow icon={<MapPin className="h-4 w-4" />} label="Visit us">
                <div className="flex flex-col">
                  <span>{site.name}</span>
                  <span>{site.address}</span>
                </div>
              </InfoRow>
              <InfoRow icon={<Clock className="h-4 w-4" />} label="Timings">
                <ul>
                  {site.timings.map((t, i) => (
                    <li key={i}>
                      <span className="font-medium">{t.days}:</span> {t.hours}
                    </li>
                  ))}
                </ul>
              </InfoRow>

              <div className="overflow-hidden rounded-xl border border-border shadow-sm">
                <iframe
                  src={site.mapsEmbedUrl}
                  title="Clinic location"
                  width="100%"
                  height="200"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="block"
                />
              </div>
            </div>
          </SlideLeft>

          <SlideRight delay={0.2}>
            <AppointmentForm />
          </SlideRight>
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
    <div className="card-luxury flex gap-3.5 rounded-xl border border-border bg-surface-warm p-4 shadow-sm">
      <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-mint-soft text-teal-dark">
        {icon}
      </div>
      <div>
        <p className="text-sm font-bold text-teal-dark">{label}</p>
        <div className="mt-0.5 text-sm text-muted">{children}</div>
      </div>
    </div>
  );
}
