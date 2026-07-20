import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { WhatWeTreat } from "@/components/what-we-treat";
import { WhyHomeopathy } from "@/components/why-homeopathy";
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
        <Hero />
        <About />
        <WhatWeTreat />
        <WhyHomeopathy />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFloat />
      <MobileBookCta />
    </>
  );
}
