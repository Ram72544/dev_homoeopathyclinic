"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { BadgeCheck, Quote, Star, Sparkles } from "lucide-react";
import { site } from "@/lib/site-config";
import { motion } from "framer-motion";

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
    <section id="testimonials" className="relative py-10 md:py-16 bg-transparent overflow-hidden">
      {/* Soft Ambient Light */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute bottom-10 left-10 h-[550px] w-[550px] rounded-full bg-radial from-[#F4EFE6]/60 via-[#F8F5EE]/25 to-transparent blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1536px] px-3 sm:px-6 lg:px-10">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-[#C5A059]/30 bg-[#C5A059]/10 px-3.5 py-1 text-xs font-sans font-semibold tracking-widest text-[#967531] uppercase">
            <Sparkles className="h-3 w-3 text-[#C5A059]" />
            <span>Patient Stories &amp; Reviews</span>
          </div>

          <h2 className="mt-3 font-serif text-[clamp(2rem,3.5vw+0.5rem,3.5rem)] font-normal text-[#14221B] leading-tight">
            Real Healing Experiences
          </h2>
          <p className="mt-4 text-base sm:text-lg font-light leading-relaxed tracking-wide text-[#4A5D52]">
            Read how patients across Delhi NCR recovered their health permanently with gentle homeopathic remedies.
          </p>
        </motion.div>

        <div className="mt-10 sm:mt-12">
          {/* Embla Viewport */}
          <div className="overflow-hidden py-8 -my-4" ref={emblaRef}>
            <div className="flex">
              {site.testimonials.map((t, i) => {
                const isActive = selectedIndex === i;
                return (
                  <div
                    key={`${t.name}-${i}`}
                    className="flex-[0_0_92%] px-3 sm:flex-[0_0_68%] lg:flex-[0_0_42%] xl:flex-[0_0_36%]"
                  >
                    <figure
                      className={`relative flex h-full flex-col justify-between rounded-[2rem] border p-7 sm:p-8 backdrop-blur-md transition-all duration-500 [transform:translate3d(0,0,0)] ${
                        isActive
                          ? "border-[#C5A059] bg-[#FAF8F5] shadow-2xl shadow-[#14221B]/10 opacity-100 scale-[1.02]"
                          : "border-white/80 bg-[#FAF8F5]/75 shadow-md shadow-[#14221B]/4 opacity-60 scale-95"
                      }`}
                    >
                      <Quote
                        className="pointer-events-none absolute -right-2 -top-2 h-24 w-24 text-[#C5A059]/10"
                        strokeWidth={1}
                      />
                      <div>
                        <div className="flex items-center gap-1 text-[#C5A059]">
                          {Array.from({ length: 5 }).map((_, star) => (
                            <Star key={star} className="h-4 w-4 fill-current" />
                          ))}
                        </div>
                        <blockquote className="relative mt-4 text-base font-light leading-relaxed text-[#14221B]">
                          &ldquo;{t.quote}&rdquo;
                        </blockquote>
                      </div>

                      <figcaption className="relative mt-7 flex items-center gap-3.5 border-t border-[#EAE3DA] pt-4">
                        <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl border border-white/35 bg-gradient-to-br from-[#1A3828] to-[#0D1E16] font-serif text-sm font-normal text-[#E5C583] shadow-[inset_0_1px_2px_rgba(255,255,255,0.4)] backdrop-blur-md">
                          {initials(t.name)}
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <p className="font-serif text-base font-normal text-[#14221B]">
                              {t.name}
                            </p>
                            <BadgeCheck
                              className="h-4 w-4 text-[#0E7C7B]"
                              aria-label="Verified patient"
                            />
                          </div>
                          <p className="text-xs font-light text-[#7A8A80]">
                            {t.location} • Verified Patient
                          </p>
                        </div>
                      </figcaption>
                    </figure>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Minimalist Sleek Pagination Indicator Dots */}
          <div className="mt-4 flex items-center justify-center gap-2">
            {site.testimonials.map((t, i) => (
              <button
                key={`${t.name}-dot-${i}`}
                type="button"
                onClick={() => scrollTo(i)}
                aria-label={`Go to testimonial ${i + 1}`}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer touch-target ${
                  selectedIndex === i
                    ? "w-8 bg-[#14221B]"
                    : "w-2 bg-[#C8BFB2] hover:bg-[#0E7C7B]"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
