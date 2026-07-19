"use client";

import { useState, type FormEvent } from "react";
import { Phone, Mail, MapPin, Clock, Send } from "lucide-react";
import { site } from "@/lib/site-config";

export function Contact() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const text = `New enquiry for ${site.name}%0A%0AName: ${encodeURIComponent(
      name
    )}%0APhone: ${encodeURIComponent(phone)}%0AMessage: ${encodeURIComponent(
      message
    )}`;
    // Sends the enquiry straight to the clinic's WhatsApp.
    window.open(`https://wa.me/${site.whatsapp}?text=${text}`, "_blank");
  }

  return (
    <section id="contact" className="bg-beige-soft py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-teal-mid">
            Get In Touch
          </span>
          <h2 className="mt-2 text-3xl font-bold text-teal-dark sm:text-4xl">
            Book your consultation
          </h2>
          <p className="mt-4 text-lg text-teal-dark/75">
            Send us your details and we&apos;ll get back to you to confirm your
            appointment.
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          {/* Contact details */}
          <div className="space-y-4">
            <InfoRow icon={<Phone className="h-5 w-5" />} label="Call us">
              <a href={`tel:${site.phone}`} className="hover:text-teal">
                {site.phoneDisplay}
              </a>
            </InfoRow>
            <InfoRow icon={<Mail className="h-5 w-5" />} label="Email">
              <a href={`mailto:${site.email}`} className="hover:text-teal">
                {site.email}
              </a>
            </InfoRow>
            <InfoRow icon={<MapPin className="h-5 w-5" />} label="Visit us">
              {site.address}
            </InfoRow>
            <InfoRow icon={<Clock className="h-5 w-5" />} label="Timings">
              <ul>
                {site.timings.map((t) => (
                  <li key={t.days}>
                    <span className="font-medium">{t.days}:</span> {t.hours}
                  </li>
                ))}
              </ul>
            </InfoRow>

            <div className="overflow-hidden rounded-2xl border border-beige shadow-sm">
              <iframe
                src={site.mapsEmbedUrl}
                title="Clinic location"
                width="100%"
                height="240"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="block"
              />
            </div>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="rounded-2xl border border-beige bg-white p-7 shadow-sm"
          >
            <div className="space-y-5">
              <Field label="Your name">
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-lg border border-beige bg-beige-soft px-4 py-3 outline-none focus:border-teal focus:ring-2 focus:ring-teal/20"
                  placeholder="e.g. Priya Sharma"
                />
              </Field>
              <Field label="Phone number">
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full rounded-lg border border-beige bg-beige-soft px-4 py-3 outline-none focus:border-teal focus:ring-2 focus:ring-teal/20"
                  placeholder="e.g. 98765 43210"
                />
              </Field>
              <Field label="How can we help?">
                <textarea
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                  className="w-full resize-none rounded-lg border border-beige bg-beige-soft px-4 py-3 outline-none focus:border-teal focus:ring-2 focus:ring-teal/20"
                  placeholder="Briefly describe your concern..."
                />
              </Field>
              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-full bg-teal px-6 py-3.5 text-base font-semibold text-white shadow-md transition-colors hover:bg-teal-dark"
              >
                <Send className="h-5 w-5" />
                Send via WhatsApp
              </button>
              <p className="text-center text-xs text-teal-dark/50">
                Opens WhatsApp with your details pre-filled.
              </p>
            </div>
          </form>
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
    <div className="flex gap-4 rounded-2xl border border-beige bg-white p-5 shadow-sm">
      <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-teal/10 text-teal">
        {icon}
      </div>
      <div>
        <p className="text-sm font-semibold text-teal-dark">{label}</p>
        <div className="mt-0.5 text-teal-dark/75">{children}</div>
      </div>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-teal-dark">
        {label}
      </span>
      {children}
    </label>
  );
}
