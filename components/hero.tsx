import Image from "next/image";
import { CalendarCheck, Phone } from "lucide-react";
import { site } from "@/lib/site-config";

export function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden bg-beige-soft"
    >
      {/* soft decorative blobs */}
      <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-teal/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-cork/10 blur-3xl" />

      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 md:grid-cols-2 md:py-24">
        <div>
          <span className="inline-block rounded-full bg-teal/10 px-4 py-1.5 text-sm font-medium text-teal">
            {site.about.credentials}
          </span>
          <h1 className="mt-5 text-4xl font-bold leading-tight text-teal-dark sm:text-5xl">
            {site.tagline}
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-teal-dark/80">
            {site.intro}
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href={site.bookingUrl}
              className="inline-flex items-center gap-2 rounded-full bg-teal px-7 py-3.5 text-base font-semibold text-white shadow-md transition-colors hover:bg-teal-dark"
            >
              <CalendarCheck className="h-5 w-5" />
              Book Appointment
            </a>
            <a
              href={`tel:${site.phone}`}
              className="inline-flex items-center gap-2 rounded-full border border-teal/30 bg-white px-7 py-3.5 text-base font-semibold text-teal transition-colors hover:bg-white/60"
            >
              <Phone className="h-5 w-5" />
              {site.phoneDisplay}
            </a>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="rounded-3xl border border-beige bg-white p-6 shadow-xl sm:p-10">
            <Image
              src="/logo-mark-3d.svg"
              alt={site.name}
              width={280}
              height={280}
              priority
              className="h-56 w-auto sm:h-72"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
