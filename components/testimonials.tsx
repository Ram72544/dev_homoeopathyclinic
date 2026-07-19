import { Quote, Star } from "lucide-react";
import { site } from "@/lib/site-config";

export function Testimonials() {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-teal-mid">
            Patient Stories
          </span>
          <h2 className="mt-2 text-3xl font-bold text-teal-dark sm:text-4xl">
            Loved by our patients
          </h2>
        </div>

        <div className="mt-12 flex flex-wrap justify-center gap-4">
          {site.testimonials.map((t) => (
            <figure
              key={t.name}
              className="flex flex-col basis-full rounded-2xl border border-beige bg-beige-soft p-4 shadow-sm sm:basis-[calc(50%-0.5rem)] md:basis-[calc(33.333%-0.667rem)] lg:basis-[calc(20%-0.8rem)] lg:p-5"
            >
              <Quote className="h-6 w-6 text-teal/40" />
              <blockquote className="mt-3 flex-1 text-base leading-relaxed text-teal-dark/85 lg:text-[0.95rem]">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <div className="mt-4 flex items-center gap-0.5 text-cork">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-3 w-3 fill-current" />
                ))}
              </div>
              <figcaption className="mt-2">
                <p className="font-semibold text-teal-dark">{t.name}</p>
                <p className="text-xs text-teal-dark/60">{t.location}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
