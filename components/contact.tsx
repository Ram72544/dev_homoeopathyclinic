import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { site } from "@/lib/site-config";
import { AppointmentForm } from "@/components/appointment-form";

export function Contact() {
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
              <div className="flex flex-col">
                <span>{site.name}</span>
                <span>{site.address}</span>
              </div>
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
          <AppointmentForm />
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
