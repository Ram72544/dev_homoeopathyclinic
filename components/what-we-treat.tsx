"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { site } from "@/lib/site-config";

export function WhatWeTreat() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="services" className="bg-beige-soft py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-teal-mid">
            What We Treat
          </span>
          <h2 className="mt-2 text-3xl font-bold text-teal-dark sm:text-4xl">
            Conditions we care for
          </h2>
          <p className="mt-4 text-lg text-teal-dark/75">
            Holistic homoeopathic treatment across a wide range of acute and
            chronic conditions. Tap a card to learn more.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {site.services.map((service, index) => {
            const Icon = service.icon;
            const isOpen = openIndex === index;
            return (
              <button
                key={service.title}
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : index)}
                aria-expanded={isOpen}
                className={`group flex flex-col rounded-2xl border p-7 text-left shadow-sm transition-all hover:-translate-y-1 hover:shadow-md ${
                  isOpen
                    ? "border-teal bg-white"
                    : "border-beige bg-white"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div
                    className={`flex h-14 w-14 items-center justify-center rounded-xl transition-colors ${
                      isOpen
                        ? "bg-teal text-white"
                        : "bg-teal/10 text-teal group-hover:bg-teal group-hover:text-white"
                    }`}
                  >
                    <Icon className="h-7 w-7" />
                  </div>
                  <ChevronDown
                    className={`h-5 w-5 text-teal-dark/40 transition-transform ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </div>
                <h3 className="mt-5 text-xl font-semibold text-teal-dark">
                  {service.title}
                </h3>
                <p
                  className={`mt-2 leading-relaxed text-teal-dark/75 transition-all ${
                    isOpen ? "block" : "line-clamp-2"
                  }`}
                >
                  {service.description}
                </p>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
