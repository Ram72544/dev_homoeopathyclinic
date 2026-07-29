"use client";

import { useState, type MouseEvent } from "react";
import { ChevronDown } from "lucide-react";
import { site } from "@/lib/site-config";
import { FadeUp, StaggerContainer, StaggerItem } from "@/components/ui/motion";

function handleTiltMove(e: MouseEvent<HTMLButtonElement>) {
  const el = e.currentTarget;
  const rect = el.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  const rotateX = ((y - rect.height / 2) / (rect.height / 2)) * -2;
  const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * 2;
  el.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-2px)`;
}

function handleTiltLeave(e: MouseEvent<HTMLButtonElement>) {
  e.currentTarget.style.transform = "";
}

export function WhatWeTreat() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="services" className="bg-surface py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        <FadeUp className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-gold-dark">
            Our Services
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-teal-dark sm:text-4xl">
            Conditions we care for
          </h2>
          <p className="mt-4 text-base text-muted">
            Holistic homoeopathic treatment across a wide range of acute and
            chronic conditions.
          </p>
        </FadeUp>

        <StaggerContainer className="mt-12 grid items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {site.services.map((service, index) => {
            const Icon = service.icon;
            const isOpen = openIndex === index;
            return (
              <StaggerItem key={service.title} className="flex">
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  onMouseMove={handleTiltMove}
                  onMouseLeave={handleTiltLeave}
                  aria-expanded={isOpen}
                  className={`card-luxury group flex h-full w-full flex-col rounded-xl border p-6 text-left transition-colors ${
                    isOpen
                      ? "border-gold/40 bg-white shadow-md"
                      : "border-border bg-white shadow-sm hover:border-gold/25"
                  }`}
                  style={{ willChange: "transform" }}
                >
                  <div className="flex items-center justify-between">
                    <div
                      className={`flex h-11 w-11 items-center justify-center rounded-lg transition-colors duration-300 ${
                        isOpen
                          ? "bg-teal-dark text-white"
                          : "bg-mint-soft text-teal-dark group-hover:bg-mint/30"
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <ChevronDown
                      className={`h-4 w-4 text-muted transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                  <h3 className="mt-4 text-base font-bold text-teal-dark">
                    {service.title}
                  </h3>
                  <p
                    className={`mt-2 text-sm leading-relaxed text-muted transition-all duration-300 ${
                      isOpen ? "block" : "line-clamp-2"
                    }`}
                  >
                    {service.description}
                  </p>
                </button>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
