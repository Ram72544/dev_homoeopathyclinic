"use client";

import { site } from "@/lib/site-config";
import { FadeUp, StaggerContainer, StaggerItem } from "@/components/ui/motion";
import { SparklesCore } from "@/components/ui/sparkles";

export function WhyHomeopathy() {
  return (
    <section id="why" className="relative overflow-hidden bg-teal-dark py-16 text-white md:py-24">
      {/* Sparkle particles background */}
      <div className="pointer-events-none absolute inset-0">
        <SparklesCore
          className="h-full w-full"
          background="transparent"
          particleColor="#c9a96e"
          particleDensity={40}
          minSize={0.6}
          maxSize={1.8}
          speed={2}
        />
      </div>

      <div className="pointer-events-none absolute inset-0 opacity-[0.04]">
        <div className="absolute left-10 top-10 h-40 w-40 rounded-full border border-gold" />
        <div className="absolute bottom-20 right-20 h-56 w-56 rounded-full border border-mint/30" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-6 sm:px-8">
        <FadeUp className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-gold">
            Why Choose Us
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            The homoeopathy difference
          </h2>
          <p className="mt-4 text-base text-white/60">
            Trusted by millions of families across India, homoeopathy offers
            gentle, individualised care focused on lasting wellbeing.
          </p>
        </FadeUp>

        <StaggerContainer className="mt-12 grid grid-rows-[auto] items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {site.benefits.map((benefit) => {
            const Icon = benefit.icon;
            return (
              <StaggerItem key={benefit.title} className="flex">
                <div className="group flex h-full flex-col rounded-xl border border-white/10 bg-white/[0.05] p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-gold/30 hover:bg-white/[0.08]">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gold/15 text-gold transition-colors duration-300 group-hover:bg-gold group-hover:text-teal-dark">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-4 text-base font-bold text-white">
                    {benefit.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-white/55">
                    {benefit.description}
                  </p>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
