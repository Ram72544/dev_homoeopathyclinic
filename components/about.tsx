import { Award, CalendarClock } from "lucide-react";
import { site } from "@/lib/site-config";

export function About() {
  const { about } = site;

  return (
    <section id="about" className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
        <span className="text-sm font-semibold uppercase tracking-widest text-teal-mid">
          About the Doctor
        </span>
        <h2 className="mt-2 text-3xl font-bold text-teal-dark sm:text-4xl">
          {about.doctorName}
        </h2>
        <p className="mt-1 text-teal/90">{about.credentials}</p>

        <div className="mt-6 space-y-4 text-left text-lg leading-relaxed text-teal-dark/80">
          {about.bio.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <div className="flex items-center gap-3 rounded-2xl border border-beige bg-beige-soft px-5 py-3">
            <Award className="h-6 w-6 text-teal" />
            <div className="text-left">
              <p className="text-sm text-teal-dark/70">Experience</p>
              <p className="font-semibold text-teal-dark">
                {about.experience}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-2xl border border-beige bg-beige-soft px-5 py-3">
            <CalendarClock className="h-6 w-6 text-teal" />
            <div className="text-left">
              <p className="text-sm text-teal-dark/70">Approach</p>
              <p className="font-semibold text-teal-dark">
                Classical & personalised
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
