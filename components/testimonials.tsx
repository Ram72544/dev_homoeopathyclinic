"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { BadgeCheck, Quote, Star } from "lucide-react";
import { site } from "@/lib/site-config";

function initials(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

export function Testimonials() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "center" },
    [Autoplay({ delay: 5000, stopOnInteraction: false })]
  );
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollTo = useCallback(
    (index: number) => emblaApi?.scrollTo(index),
    [emblaApi]
  );

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect();
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  return (
    <section className="bg-gradient-to-b from-white via-white to-beige-soft py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-teal-mid">
            Patient Stories
          </span>
          <h2 className="mt-2 text-3xl font-bold text-teal-dark sm:text-4xl">
            Loved by our patients
          </h2>
        </div>

        <div className="mt-12">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {site.testimonials.map((t, i) => {
                const isActive = selectedIndex === i;
                return (
                  <div
                    key={`${t.name}-${i}`}
                    className="flex-[0_0_88%] px-2.5 sm:flex-[0_0_68%] lg:flex-[0_0_44%]"
                  >
                    <figure
                      className={`relative flex h-full flex-col overflow-hidden rounded-[28px] border bg-white p-8 transition-all duration-300 ${
                        isActive
                          ? "border-teal/20 shadow-2xl shadow-teal-dark/15 opacity-100"
                          : "border-beige shadow-md opacity-50"
                      }`}
                    >
                      <Quote
                        className="pointer-events-none absolute -right-4 -top-4 h-28 w-28 text-teal/5"
                        strokeWidth={1}
                      />
                      <div className="flex items-center gap-0.5 text-cork">
                        {Array.from({ length: 5 }).map((_, star) => (
                          <Star key={star} className="h-3.5 w-3.5 fill-current" />
                        ))}
                      </div>
                      <blockquote className="relative mt-4 flex-1 text-lg leading-relaxed text-teal-dark/85">
                        &ldquo;{t.quote}&rdquo;
                      </blockquote>
                      <figcaption className="relative mt-6 flex items-center gap-3">
                        <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-teal/10 text-sm font-semibold text-teal-dark">
                          {initials(t.name)}
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <p className="font-semibold text-teal-dark">
                              {t.name}
                            </p>
                            <BadgeCheck
                              className="h-4 w-4 text-teal"
                              aria-label="Verified patient"
                            />
                          </div>
                          <p className="text-xs text-teal-dark/60">
                            {t.location}
                          </p>
                        </div>
                      </figcaption>
                    </figure>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-8 flex items-center justify-center gap-1.5">
            {site.testimonials.map((t, i) => (
              <button
                key={`${t.name}-dot-${i}`}
                type="button"
                onClick={() => scrollTo(i)}
                aria-label={`Go to testimonial ${i + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  selectedIndex === i
                    ? "w-7 bg-teal"
                    : "w-2 bg-beige hover:bg-teal/40"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
