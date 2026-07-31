"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { BadgeCheck, Quote, Star } from "lucide-react";
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
    <section id="testimonials" className="relative py-8 md:py-12 bg-transparent overflow-hidden">
      {/* Soft Faded Luxury Ambient Light */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute bottom-10 left-10 h-[500px] w-[500px] rounded-full bg-radial from-[#F0EADF]/50 via-[#F7F3EC]/20 to-transparent blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="text-xs font-light tracking-[0.25em] text-[#C5A059] uppercase">
            Patient Stories & Reviews
          </span>
          <h2 className="mt-3 font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#1F2C25]">
            Real Healing Experiences
          </h2>
          <p className="mt-4 text-base sm:text-lg font-light leading-relaxed tracking-wide text-[#5C6B62]">
            Read how patients across Delhi NCR recovered their health with gentle homeopathic remedies.
          </p>
        </motion.div>

        <div className="mt-12">
          {/* Embla Viewport with vertical padding py-8 to prevent shadow/border clipping */}
          <div className="overflow-hidden py-8 -my-4" ref={emblaRef}>
            <div className="flex">
              {site.testimonials.map((t, i) => {
                const isActive = selectedIndex === i;
                return (
                  <div
                    key={`${t.name}-${i}`}
                    className="flex-[0_0_90%] px-3.5 sm:flex-[0_0_65%] lg:flex-[0_0_42%]"
                  >
                    <figure
                      className={`relative flex h-full flex-col justify-between rounded-3xl border p-8 backdrop-blur-md transition-all duration-500 ${
                        isActive
                          ? "border-[#C5A059] bg-[#FAF8F5] shadow-2xl shadow-[#2C4036]/10 opacity-100 scale-[1.02]"
                          : "border-white/80 bg-[#FAF8F5]/70 shadow-md shadow-[#2C4036]/5 opacity-55 scale-95"
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
                        <blockquote className="relative mt-5 text-base font-light leading-relaxed text-[#2C4036]">
                          &ldquo;{t.quote}&rdquo;
                        </blockquote>
                      </div>

                      <figcaption className="relative mt-8 flex items-center gap-3.5 border-t border-[#F0EADF]/70 pt-5">
                        <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl border border-white/35 bg-gradient-to-br from-[#2A4034] to-[#1F2C25] font-serif text-sm font-normal text-[#E5C583] shadow-[inset_0_1px_2px_rgba(255,255,255,0.4)] backdrop-blur-md">
                          {initials(t.name)}
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <p className="font-serif text-base font-normal text-[#1F2C25]">
                              {t.name}
                            </p>
                            <BadgeCheck
                              className="h-4 w-4 text-[#4A6B5D]"
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
          <div className="mt-6 flex items-center justify-center gap-2">
            {site.testimonials.map((t, i) => (
              <button
                key={`${t.name}-dot-${i}`}
                type="button"
                onClick={() => scrollTo(i)}
                aria-label={`Go to testimonial ${i + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  selectedIndex === i
                    ? "w-6 bg-[#1F2C25]"
                    : "w-1.5 bg-[#C8BFB2] hover:bg-[#0E7C7B]"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
