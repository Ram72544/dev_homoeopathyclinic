"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { BadgeCheck, Quote, Star } from "lucide-react";
import { site } from "@/lib/site-config";
import { FadeUp } from "@/components/ui/motion";

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
    <section className="bg-surface-warm py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        <FadeUp className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-gold-dark">
            Patient Stories
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-teal-dark sm:text-4xl">
            Loved by our patients
          </h2>
        </FadeUp>

        <FadeUp delay={0.2} className="mt-12">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {site.testimonials.map((t, i) => {
                const isActive = selectedIndex === i;
                return (
                  <div
                    key={`${t.name}-${i}`}
                    className="flex-[0_0_88%] px-3 sm:flex-[0_0_65%] lg:flex-[0_0_42%]"
                  >
                    <figure
                      className={`relative flex h-full flex-col rounded-xl border bg-white p-6 transition-all duration-400 ${
                        isActive
                          ? "border-gold/30 shadow-lg opacity-100 scale-[1.01]"
                          : "border-border shadow-sm opacity-40 scale-100"
                      }`}
                    >
                      <Quote
                        className="pointer-events-none absolute -right-2 -top-2 h-20 w-20 text-gold/[0.08]"
                        strokeWidth={1}
                      />
                      <div className="flex items-center gap-0.5 text-gold">
                        {Array.from({ length: 5 }).map((_, star) => (
                          <Star key={star} className="h-3.5 w-3.5 fill-current" />
                        ))}
                      </div>
                      <blockquote className="relative mt-4 flex-1 text-base leading-relaxed text-foreground/80">
                        &ldquo;{t.quote}&rdquo;
                      </blockquote>
                      <figcaption className="relative mt-5 flex items-center gap-3 border-t border-border pt-4">
                        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-mint-soft text-sm font-bold text-teal-dark">
                          {initials(t.name)}
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <p className="text-sm font-bold text-teal-dark">
                              {t.name}
                            </p>
                            <BadgeCheck
                              className="h-3.5 w-3.5 text-mint-dark"
                              aria-label="Verified patient"
                            />
                          </div>
                          <p className="text-xs text-muted">
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

          <div className="mt-8 flex items-center justify-center gap-2">
            {site.testimonials.map((t, i) => (
              <button
                key={`${t.name}-dot-${i}`}
                type="button"
                onClick={() => scrollTo(i)}
                aria-label={`Go to testimonial ${i + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  selectedIndex === i
                    ? "w-7 bg-teal-dark"
                    : "w-2 bg-border hover:bg-gold/50"
                }`}
              />
            ))}
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
