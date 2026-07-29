"use client";

import { Award, CalendarClock, GraduationCap } from "lucide-react";
import { site } from "@/lib/site-config";
import { FadeUp, StaggerContainer, StaggerItem } from "@/components/ui/motion";

export function About() {
  const { about } = site;

  return (
    <section id="about" className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        <div className="grid items-start gap-12 lg:grid-cols-[1fr_1.2fr]">
          {/* Left: credentials cards */}
          <FadeUp>
            <StaggerContainer className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              <StaggerItem>
                <div className="card-luxury rounded-2xl border border-border bg-surface-warm p-6">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-mint-soft">
                    <GraduationCap className="h-5 w-5 text-teal-dark" />
                  </div>
                  <p className="mt-4 text-sm font-bold text-teal-dark">
                    {about.credentials}
                  </p>
                  <p className="mt-1 text-sm text-muted">
                    Classical homoeopathic physician
                  </p>
                </div>
              </StaggerItem>
              <StaggerItem>
                <div className="card-luxury rounded-2xl border border-border bg-surface-warm p-6">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gold/10">
                    <Award className="h-5 w-5 text-gold-dark" />
                  </div>
                  <p className="mt-4 text-sm font-bold text-teal-dark">
                    {about.experience} experience
                  </p>
                  <p className="mt-1 text-sm text-muted">
                    Chronic &amp; acute conditions
                  </p>
                </div>
              </StaggerItem>
              <StaggerItem>
                <div className="card-luxury rounded-2xl border border-border bg-surface-warm p-6">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-mint-soft">
                    <CalendarClock className="h-5 w-5 text-teal-dark" />
                  </div>
                  <p className="mt-4 text-sm font-bold text-teal-dark">
                    Personalised approach
                  </p>
                  <p className="mt-1 text-sm text-muted">
                    One remedy, one patient at a time
                  </p>
                </div>
              </StaggerItem>
            </StaggerContainer>
          </FadeUp>

          {/* Right: bio text */}
          <FadeUp delay={0.15}>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gold-dark">
              About the Doctor
            </span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-teal-dark sm:text-4xl">
              {about.doctorName}
            </h2>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-muted">
              {about.bio.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
