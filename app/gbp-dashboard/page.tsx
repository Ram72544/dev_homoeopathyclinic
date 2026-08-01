"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Download,
  Copy,
  Check,
  Star,
  MapPin,
  Phone,
  Clock,
  Award,
  Sparkles,
  Share2,
  TrendingUp,
  ShieldCheck,
  UserCheck,
  ChevronRight,
  ExternalLink,
  Info,
  Calendar,
  Layers,
} from "lucide-react";
import { site } from "@/lib/site-config";

// Asset definition type
type GBPAsset = {
  id: string;
  title: string;
  category: "Cover Photo" | "Weekly Post" | "Doctor Bio" | "Specialties" | "Offer";
  recommendedSpecs: string;
  description: string;
  imageSrc: string;
  downloadFilename: string;
  captionText: string;
  hashtags: string[];
};

const gbpAssets: GBPAsset[] = [
  {
    id: "cover-banner",
    title: "Official GBP Profile Cover Banner",
    category: "Cover Photo",
    recommendedSpecs: "1200 x 900 px (4:3 Ratio) • Primary Profile Cover",
    description: "High-impact cover graphic featuring the luxury 3D logo, AYUSH recognition badge, 5.0 rating, key specialties, and contact number.",
    imageSrc: "/gbp-assets/1_GBP_Cover_Banner.png",
    downloadFilename: "1_GBP_Cover_Banner.png",
    captionText: "Welcome to Dr. Sheetal's Homoeopathy Clinic — Gentle, Natural & Permanent Healing for Your Whole Family. 100% safe homeopathic care treating the root cause of skin allergies, sinus, acidity, PCOS, and child immunity. Call +91 79053 71551 to book your consultation today!",
    hashtags: ["#HomeopathyDoctorBadarpur", "#DrSheetalHomoeopathy", "#NaturalHealingDelhi", "#AYUSHHomeopathy"],
  },
  {
    id: "doctor-credentials",
    title: "Dr. Sheetal (BHMS, MD) Profile & Credentials Card",
    category: "Doctor Bio",
    recommendedSpecs: "1080 x 1080 px (1:1 Square Post) • Updates & Bio Photo",
    description: "Establishes immediate medical trust and authority by highlighting Dr. Sheetal's BHMS & MD qualifications, 4+ years practice, and classical single-medicine philosophy.",
    imageSrc: "/gbp-assets/2_GBP_Doctor_Credentials.png",
    downloadFilename: "2_GBP_Doctor_Credentials.png",
    captionText: "Meet Dr. Sheetal, qualified Homoeopathic Physician holding BHMS & MD in Classical Homoeopathy. With over 4 years of clinical experience in Delhi NCR, Dr. Sheetal provides personalized constitutional treatment tailored to your unique body type with zero side effects. Visit us in Badarpur, New Delhi or call +91 79053 71551.",
    hashtags: ["#DrSheetalBHMSMD", "#BestHomeopathicDoctor", "#ClassicalHomeopathy", "#DelhiNCRDoctor"],
  },
  {
    id: "specialized-treatments",
    title: "Specialized Clinical Treatments & Conditions Graphic",
    category: "Specialties",
    recommendedSpecs: "1080 x 1080 px (1:1 Square Post) • Services Showcase",
    description: "Visual grid showcasing treatments for Skin Allergies (Eczema/Acne), Sinus/Asthma, Gas/Acidity/IBS, and PCOS/Women's Care.",
    imageSrc: "/gbp-assets/3_GBP_Specialized_Treatments.png",
    downloadFilename: "3_GBP_Specialized_Treatments.png",
    captionText: "Struggling with recurring skin allergies, sinusitis, chronic acidity, or hormonal PCOS? Homeopathy treats the root cause deep within your immune system without heavy chemical pills or lifetime dependency. Schedule your comprehensive case study with Dr. Sheetal today!",
    hashtags: ["#SkinAllergyTreatment", "#SinusitisHomeopathy", "#PCOSTreatmentDelhi", "#AcidityRootCause"],
  },
  {
    id: "patient-trust-reviews",
    title: "5.0 ★ Google Patient Reviews & Social Proof Banner",
    category: "Weekly Post",
    recommendedSpecs: "1080 x 1080 px (1:1 Square Post) • Patient Trust Post",
    description: "Highlights authentic 5-star patient testimonials for skin allergy recovery and child immunity enhancement to boost local conversion rate.",
    imageSrc: "/gbp-assets/4_GBP_Patient_Trust_Reviews.png",
    downloadFilename: "4_GBP_Patient_Trust_Reviews.png",
    captionText: "We are deeply grateful to our patients for rating Dr. Sheetal's Homoeopathy Clinic 5.0 Stars on Google Maps! Thank you for trusting us with your family's health and natural recovery. Read full reviews or share your experience on our Google Business Profile.",
    hashtags: ["#GoogleReviews5Star", "#PatientTestimonial", "#TrustedHomeopathy", "#BadarpurClinic"],
  },
  {
    id: "book-consultation",
    title: "1-on-1 Consultation Booking Call-To-Action Card",
    category: "Offer",
    recommendedSpecs: "1080 x 1080 px (1:1 Square Post) • Weekly Offer / Event",
    description: "High-converting dark emerald card detailing 30-min case analysis, clinic timings, address, and direct call/WhatsApp CTA.",
    imageSrc: "/gbp-assets/5_GBP_Book_Consultation.png",
    downloadFilename: "5_GBP_Book_Consultation.png",
    captionText: "Take the first step toward permanent, natural recovery! Book your 1-on-1 consultation with Dr. Sheetal (BHMS, MD). Clinic Timings: Mon-Sat 10am-1pm & 6pm-9pm. Location: Saurabh Vihar, Hari Nagar Extn, Badarpur, New Delhi. Call/WhatsApp +91 79053 71551.",
    hashtags: ["#BookConsultation", "#HomeopathyClinicDelhi", "#BadarpurDoctor", "#NaturalRecovery"],
  },
];

const businessDescription = `Dr. Sheetal's Homoeopathy Clinic is a premier, Ministry of AYUSH recognized homeopathy clinic located in Badarpur / Hari Nagar Extn, New Delhi. Led by Dr. Sheetal (BHMS, MD Homoeopathy) with over 4 years of dedicated clinical practice, we specialize in 100% natural, safe, and permanent root-cause healing using classical homeopathic remedies.

We provide personalized treatment for:
• Skin & Hair Allergies (Eczema, Psoriasis, Acne, Hives, Hair Loss)
• Respiratory & Sinus (Sinusitis, Asthma, Allergic Rhinitis, Tonsillitis)
• Gastrointestinal Issues (Chronic Acidity, Gas, IBS, Piles, Constipation)
• Women's Health & Hormones (PCOS / PCOD, Irregular Periods, Thyroid)
• Headaches & Mental Wellness (Migraine, Stress, Anxiety, Sleep Issues)
• Pediatric Immunity & Child Health (Recurrent Fever, Colds, Growth Care)

Our natural sweet pills are 100% safe with zero side effects for infants, pregnant mothers, and senior citizens. Visit us for an in-depth case study consultation or call +91 79053 71551 to book your appointment.`;

const reviewReplyTemplates = [
  {
    type: "5-Star Review Reply (General)",
    template: `Thank you so much for taking the time to share your feedback! We are delighted to hear about your positive recovery experience with Dr. Sheetal. At Dr. Sheetal's Homoeopathy Clinic, your family's health and permanent well-being are our top priorities. Wishing you continued vibrant health!`,
  },
  {
    type: "5-Star Review Reply (Skin & Chronic Care)",
    template: `Thank you for your wonderful review! We are so glad that Dr. Sheetal's homeopathic treatment brought you complete relief from your chronic health condition. Classical homeopathy works deep at the root cause, and seeing our patients regain healthy lives naturally is our greatest reward.`,
  },
  {
    type: "4-Star / Feedback Reply",
    template: `Thank you for choosing Dr. Sheetal's Homoeopathy Clinic and sharing your valuable experience with us! We appreciate your feedback and remain committed to giving you the highest quality natural medical care. Please feel free to reach out to us directly at +91 79053 71551 if you need any further guidance during your treatment.`,
  },
];

export default function GBPDashboardPage() {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handleDownload = (imageSrc: string, filename: string) => {
    const link = document.createElement("a");
    link.href = imageSrc;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1F2C25] pb-24">
      {/* Top Header */}
      <header className="sticky top-0 z-50 border-b border-[#EAE3D7] bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="relative h-11 w-11 shrink-0 filter drop-shadow-sm">
              <Image
                src="/logo-concept-1-transparent.png"
                alt="Dr. Sheetal Logo"
                width={200}
                height={200}
                unoptimized
                className="h-full w-full object-contain"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-luxury text-xl font-semibold text-[#1F2C25]">
                  Dr. Sheetal&apos;s
                </span>
                <span className="rounded-full bg-[#0E7C7B]/10 px-2.5 py-0.5 font-sans text-[10px] font-semibold tracking-wider text-[#0E7C7B] uppercase">
                  GBP Marketing Hub
                </span>
              </div>
              <p className="text-xs text-[#5C6B62]">
                Google Business Profile Visibility & Media Asset Creator
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 rounded-full border border-[#EAE3D7] bg-[#FAF8F5] px-4 py-2 text-xs font-medium text-[#1F2C25] transition-colors hover:bg-[#EAE3D7]"
            >
              <span>Back to Main Website</span>
              <ChevronRight className="h-3.5 w-3.5" />
            </Link>
            <a
              href={site.googleUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full bg-[#1F2C25] px-4 py-2 text-xs font-medium text-[#FAF8F5] shadow-sm transition-all hover:bg-[#0E7C7B]"
            >
              <ExternalLink className="h-3.5 w-3.5 text-[#C5A059]" />
              <span>Open Google Business Profile</span>
            </a>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8 space-y-12">
        {/* Banner Section */}
        <section className="rounded-3xl border border-white/80 bg-gradient-to-br from-[#1F2C25] via-[#2A3E34] to-[#0E7C7B] p-8 text-white shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 -mt-12 -mr-12 h-64 w-64 rounded-full bg-[#C5A059]/10 blur-3xl" />
          <div className="relative z-10 grid gap-8 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1 text-xs tracking-wider uppercase text-[#E5C583]">
                <Sparkles className="h-3.5 w-3.5 text-[#C5A059]" />
                <span>Google Local SEO & Visibility Blueprint</span>
              </div>
              <h1 className="font-serif text-3xl sm:text-4xl font-normal leading-tight text-white">
                Google Business Profile Promotion & Asset Dashboard
              </h1>
              <p className="text-sm sm:text-base font-light text-white/85 max-w-2xl leading-relaxed">
                Elevate <strong className="text-[#E5C583] font-normal">Dr. Sheetal&apos;s Homoeopathy Clinic</strong> to the top of Google Maps Local 3-Pack in Badarpur & New Delhi NCR. Download pre-formatted high-visibility PNG graphics, copy optimized business descriptions, and utilize high-converting review templates.
              </p>
            </div>

            <div className="lg:col-span-4 grid grid-cols-2 gap-3">
              <div className="rounded-2xl border border-white/15 bg-white/10 p-4 text-center backdrop-blur-md">
                <span className="block font-serif text-2xl font-bold text-[#E5C583]">100%</span>
                <span className="text-[11px] uppercase tracking-wider text-white/70">Profile Optimization</span>
              </div>
              <div className="rounded-2xl border border-white/15 bg-white/10 p-4 text-center backdrop-blur-md">
                <span className="block font-serif text-2xl font-bold text-[#E5C583]">5.0 ★</span>
                <span className="text-[11px] uppercase tracking-wider text-white/70">Google Maps Rating</span>
              </div>
              <div className="rounded-2xl border border-white/15 bg-white/10 p-4 text-center backdrop-blur-md">
                <span className="block font-serif text-2xl font-bold text-[#E5C583]">5 PNGs</span>
                <span className="text-[11px] uppercase tracking-wider text-white/70">Ready Media Assets</span>
              </div>
              <div className="rounded-2xl border border-white/15 bg-white/10 p-4 text-center backdrop-blur-md">
                <span className="block font-serif text-2xl font-bold text-[#E5C583]">AYUSH</span>
                <span className="text-[11px] uppercase tracking-wider text-white/70">Govt Recognized</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 1: High-Visibility PNG Media Kit Studio */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#EAE3D7] pb-4">
            <div>
              <div className="flex items-center gap-2">
                <Layers className="h-5 w-5 text-[#0E7C7B]" />
                <h2 className="font-serif text-2xl font-normal text-[#1F2C25]">
                  Google Business Profile PNG Graphic Studio
                </h2>
              </div>
              <p className="text-xs text-[#5C6B62] mt-1">
                Pre-formatted, high-resolution PNG banners ready to upload on your Google Business Profile & Google Maps
              </p>
            </div>

            <button
              onClick={() => {
                gbpAssets.forEach((asset) => handleDownload(asset.imageSrc, asset.downloadFilename));
              }}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#1F2C25] px-5 py-2.5 text-xs font-medium text-[#FAF8F5] uppercase tracking-wider shadow-md hover:bg-[#0E7C7B] transition-all"
            >
              <Download className="h-4 w-4 text-[#C5A059]" />
              <span>Download All 5 PNG Banners</span>
            </button>
          </div>

          {/* Grid of PNG Assets */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {gbpAssets.map((asset) => (
              <div
                key={asset.id}
                className="flex flex-col rounded-3xl border border-[#EAE3D7] bg-white p-5 shadow-sm transition-all duration-300 hover:shadow-xl hover:border-[#0E7C7B]/40 group"
              >
                {/* Image Preview Box */}
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-[#EAE3D7] bg-[#FAF8F5] p-2">
                  <Image
                    src={asset.imageSrc}
                    alt={asset.title}
                    fill
                    unoptimized
                    className="object-contain transition-transform duration-500 group-hover:scale-102"
                  />
                  <span className="absolute top-4 left-4 rounded-full bg-[#1F2C25]/90 px-3 py-1 text-[10px] font-semibold text-[#E5C583] uppercase tracking-wider backdrop-blur-md">
                    {asset.category}
                  </span>
                </div>

                {/* Info & Details */}
                <div className="mt-4 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="font-serif text-lg font-normal text-[#1F2C25] leading-snug">
                      {asset.title}
                    </h3>
                    <p className="text-[11px] font-medium text-[#0E7C7B] mt-1">
                      {asset.recommendedSpecs}
                    </p>
                    <p className="text-xs font-light text-[#5C6B62] leading-relaxed mt-2">
                      {asset.description}
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-2 pt-2 border-t border-[#EAE3D7]/80">
                    <button
                      onClick={() => handleDownload(asset.imageSrc, asset.downloadFilename)}
                      className="w-full flex items-center justify-center gap-2 rounded-2xl bg-[#0E7C7B] py-2.5 text-xs font-medium text-white shadow-sm transition-all hover:bg-[#1F2C25]"
                    >
                      <Download className="h-3.5 w-3.5 text-[#E5C583]" />
                      <span>Download {asset.downloadFilename}</span>
                    </button>

                    <button
                      onClick={() => handleCopy(asset.captionText + "\n\n" + asset.hashtags.join(" "), asset.id)}
                      className="w-full flex items-center justify-center gap-1.5 rounded-2xl border border-[#EAE3D7] bg-[#FAF8F5] py-2 text-[11px] font-medium text-[#1F2C25] hover:bg-[#EAE3D7] transition-colors"
                    >
                      {copiedId === asset.id ? (
                        <>
                          <Check className="h-3.5 w-3.5 text-emerald-600" />
                          <span className="text-emerald-700 font-semibold">Post Caption Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-3.5 w-3.5 text-[#5C6B62]" />
                          <span>Copy Recommended GBP Post Caption</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 2: Doctor & Clinic Business NAP & Information Hub */}
        <section className="space-y-6">
          <div className="border-b border-[#EAE3D7] pb-4">
            <h2 className="font-serif text-2xl font-normal text-[#1F2C25]">
              Doctor & Clinic Google Business Profile Details
            </h2>
            <p className="text-xs text-[#5C6B62] mt-1">
              Authoritative clinic NAP (Name, Address, Phone), credentials, and optimized descriptions for Google Local Search
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-12">
            {/* Left: Key Business Parameters */}
            <div className="lg:col-span-5 space-y-4">
              <div className="rounded-3xl border border-[#EAE3D7] bg-white p-6 shadow-sm space-y-4">
                <div className="flex items-center gap-3 pb-3 border-b border-[#EAE3D7]">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#0E7C7B]/10 text-[#0E7C7B]">
                    <Award className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-serif text-base font-normal text-[#1F2C25]">Doctor Profile</h3>
                    <p className="text-xs text-[#5C6B62]">Qualified Homoeopathic Practitioner</p>
                  </div>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between py-1 border-b border-[#FAF8F5]">
                    <span className="text-[#7A8A80]">Doctor Name:</span>
                    <span className="font-semibold text-[#1F2C25]">{site.about.doctorName}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[#FAF8F5]">
                    <span className="text-[#7A8A80]">Qualifications:</span>
                    <span className="font-semibold text-[#0E7C7B]">{site.about.credentials}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[#FAF8F5]">
                    <span className="text-[#7A8A80]">Clinical Practice:</span>
                    <span className="font-semibold text-[#1F2C25]">{site.about.experience}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[#FAF8F5]">
                    <span className="text-[#7A8A80]">System of Medicine:</span>
                    <span className="font-semibold text-[#1F2C25]">Classical Homoeopathy</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-[#7A8A80]">Govt. Recognition:</span>
                    <span className="font-semibold text-[#C5A059]">Ministry of AYUSH, India</span>
                  </div>
                </div>
              </div>

              <div className="rounded-3xl border border-[#EAE3D7] bg-white p-6 shadow-sm space-y-4">
                <div className="flex items-center gap-3 pb-3 border-b border-[#EAE3D7]">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#C5A059]/10 text-[#C5A059]">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-serif text-base font-normal text-[#1F2C25]">Clinic NAP Details</h3>
                    <p className="text-xs text-[#5C6B62]">Name, Address & Phone Consistency</p>
                  </div>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <span className="block text-[11px] text-[#7A8A80] uppercase tracking-wider">GBP Business Name:</span>
                    <span className="block font-semibold text-[#1F2C25] mt-0.5">{site.name}</span>
                  </div>

                  <div>
                    <span className="block text-[11px] text-[#7A8A80] uppercase tracking-wider">Primary Category:</span>
                    <span className="inline-block rounded-full bg-[#0E7C7B]/10 px-2.5 py-0.5 text-xs font-semibold text-[#0E7C7B] mt-0.5">
                      Homeopathic Doctor / Medical Clinic
                    </span>
                  </div>

                  <div>
                    <span className="block text-[11px] text-[#7A8A80] uppercase tracking-wider">Full Address:</span>
                    <span className="block text-[#5C6B62] mt-0.5 leading-relaxed">{site.address}</span>
                  </div>

                  <div>
                    <span className="block text-[11px] text-[#7A8A80] uppercase tracking-wider">Phone / WhatsApp:</span>
                    <span className="block font-semibold text-[#1F2C25] mt-0.5">{site.phoneDisplay}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: One-Click Copy Business Description */}
            <div className="lg:col-span-7 space-y-6">
              <div className="rounded-3xl border border-[#EAE3D7] bg-white p-6 shadow-sm space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#EAE3D7]">
                  <div>
                    <h3 className="font-serif text-lg font-normal text-[#1F2C25]">
                      Optimized GBP Business Description (750 Chars)
                    </h3>
                    <p className="text-xs text-[#5C6B62]">
                      Keyword-rich description optimized for Local Search indexing
                    </p>
                  </div>
                  <button
                    onClick={() => handleCopy(businessDescription, "desc")}
                    className="inline-flex items-center gap-1.5 rounded-full bg-[#1F2C25] px-4 py-1.5 text-xs font-medium text-white hover:bg-[#0E7C7B] transition-colors"
                  >
                    {copiedId === "desc" ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-emerald-400" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5 text-[#C5A059]" />
                        <span>Copy Description</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="rounded-2xl border border-[#EAE3D7] bg-[#FAF8F5] p-4 text-xs font-light leading-relaxed text-[#3D4D44] whitespace-pre-line max-h-64 overflow-y-auto">
                  {businessDescription}
                </div>
              </div>

              {/* Patient Review Response Templates */}
              <div className="rounded-3xl border border-[#EAE3D7] bg-white p-6 shadow-sm space-y-4">
                <div className="pb-3 border-b border-[#EAE3D7]">
                  <h3 className="font-serif text-lg font-normal text-[#1F2C25]">
                    Google Review Reply AI Templates
                  </h3>
                  <p className="text-xs text-[#5C6B62]">
                    Responding to Google reviews within 24 hours boosts local ranking signals
                  </p>
                </div>

                <div className="space-y-3">
                  {reviewReplyTemplates.map((item, idx) => (
                    <div
                      key={idx}
                      className="rounded-2xl border border-[#EAE3D7] bg-[#FAF8F5] p-4 space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-[#0E7C7B]">
                          {item.type}
                        </span>
                        <button
                          onClick={() => handleCopy(item.template, `reply-${idx}`)}
                          className="inline-flex items-center gap-1 text-[11px] font-medium text-[#1F2C25] hover:text-[#0E7C7B]"
                        >
                          {copiedId === `reply-${idx}` ? (
                            <span className="text-emerald-700 font-semibold">Copied!</span>
                          ) : (
                            <>
                              <Copy className="h-3 w-3" />
                              <span>Copy</span>
                            </>
                          )}
                        </button>
                      </div>
                      <p className="text-xs font-light text-[#5C6B62] leading-relaxed italic">
                        &quot;{item.template}&quot;
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: Google Business Profile Local SEO Action Plan */}
        <section className="rounded-3xl border border-[#EAE3D7] bg-white p-8 shadow-sm space-y-6">
          <div className="border-b border-[#EAE3D7] pb-4">
            <h2 className="font-serif text-2xl font-normal text-[#1F2C25]">
              Google Local Pack 3-Step Growth Action Plan
            </h2>
            <p className="text-xs text-[#5C6B62] mt-1">
              Follow these expert marketing recommendations to double your profile views and phone calls from Google Maps
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-[#EAE3D7] bg-[#FAF8F5] p-5 space-y-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#1F2C25] font-serif text-sm font-bold text-[#E5C583]">
                1
              </div>
              <h3 className="font-serif text-base font-normal text-[#1F2C25]">
                Upload High-Res PNG Banners
              </h3>
              <p className="text-xs font-light text-[#5C6B62] leading-relaxed">
                Upload the <strong className="text-[#1F2C25] font-medium">Cover Banner</strong> as your primary profile cover photo and add the remaining 4 graphics to your business photo gallery. Photos with readable text get 42% more click-throughs.
              </p>
            </div>

            <div className="rounded-2xl border border-[#EAE3D7] bg-[#FAF8F5] p-5 space-y-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#0E7C7B] font-serif text-sm font-bold text-white">
                2
              </div>
              <h3 className="font-serif text-base font-normal text-[#1F2C25]">
                Post 2 Weekly Updates
              </h3>
              <p className="text-xs font-light text-[#5C6B62] leading-relaxed">
                Use the pre-written captions above to publish 2 weekly Google Posts (Mondays & Thursdays). Google rewards active profiles with higher local search ranking positions.
              </p>
            </div>

            <div className="rounded-2xl border border-[#EAE3D7] bg-[#FAF8F5] p-5 space-y-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#C5A059] font-serif text-sm font-bold text-[#1F2C25]">
                3
              </div>
              <h3 className="font-serif text-base font-normal text-[#1F2C25]">
                Collect & Reply To Reviews
              </h3>
              <p className="text-xs font-light text-[#5C6B62] leading-relaxed">
                Send your Google Review link to every satisfied patient after their consultation. Use our pre-written AI review reply templates to maintain a 100% response rate.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
