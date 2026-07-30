import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { WhatWeTreat } from "@/components/what-we-treat";
import { WhyHomeopathy } from "@/components/why-homeopathy";
import { About } from "@/components/about";
import { Testimonials } from "@/components/testimonials";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";
import { WhatsAppFloat } from "@/components/whatsapp-float";
import { MobileBookCta } from "@/components/mobile-book-cta";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        {/* 1. Hero Section */}
        <Hero />

        {/* 2. Meet Dr. Sheetal (Doctor Practitioner Profile) */}
        <About />

        {/* 3. Conditions & Specializations */}
        <WhatWeTreat />

        {/* 4. Why Homeopathy & 3-Step Recovery Process */}
        <WhyHomeopathy />

        {/* 5. Patient Reviews & Real Stories */}
        <Testimonials />

        {/* 6. Contact, OPD Timings & Appointment Booking Form */}
        <Contact />
      </main>
      <Footer />
      <WhatsAppFloat />
      <MobileBookCta />
    </>
  );
}
