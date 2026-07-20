import { CalendarCheck } from "lucide-react";
import { site } from "@/lib/site-config";

/** Persistent thumb-zone CTA, visible only on small screens (desktop already has the navbar CTA). */
export function MobileBookCta() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-beige bg-white/95 p-3 backdrop-blur md:hidden">
      <a
        href={site.bookingUrl}
        className="flex w-full items-center justify-center gap-2 rounded-full bg-teal px-5 py-3 text-sm font-semibold text-white shadow-md transition-colors hover:bg-teal-dark"
      >
        <CalendarCheck className="h-4 w-4" />
        Book Appointment
      </a>
    </div>
  );
}
