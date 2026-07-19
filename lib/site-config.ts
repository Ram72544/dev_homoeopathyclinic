/**
 * ============================================================
 *  EDIT EVERYTHING HERE.
 *  Replace the placeholder values below with your real clinic
 *  details. You do NOT need to touch any other file.
 * ============================================================
 */

import type { LucideIcon } from "lucide-react";
import {
  Sparkles,
  Wind,
  Soup,
  Brain,
  Baby,
  HeartPulse,
  ShieldCheck,
  Leaf,
  Clock,
  UserRound,
} from "lucide-react";

export type Service = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export type Testimonial = {
  name: string;
  location: string;
  quote: string;
};

export type Benefit = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export const site = {
  // --- Identity -------------------------------------------------
  name: "Dr. Sheetal's Homoeopathy Clinic",
  shortName: "Dr. Sheetal's",
  tagline: "Gentle, natural healing for the whole family",
  intro:
    "Personalised homoeopathic care that works on the root cause of illness, not just the symptoms. Homoeopathy is a recognised system of medicine in India under the Ministry of AYUSH, and it is safe for patients of every age — from newborns to the elderly.",

  // --- Contact (REPLACE THESE) ---------------------------------
  phoneDisplay: "+91 79053 71551",
  phone: "+917905371551", // used for tel: links, no spaces
  whatsapp: "917905371551", // country code + number, no + or spaces
  email: "care@drsheetalclinic.com",
  address: "Dr. Sheetal's Homoeopathy Clinic, D-160/1, Saurabh Vihar, Near Kali Badi Mandir, Hari Nagar Extn., Jaitpur, Badarpur, New Delhi - 110044",

  // Google Maps embed: search + center on the clinic
  mapsEmbedUrl:
    "https://www.google.com/maps?q=Dr.+Sheetal%27s+Homoeopathy+Clinic&ll=28.506497,77.3216683&z=16&output=embed",

  // Calendly / booking link (leave as # until you have one)
  bookingUrl: "#contact-form",

  // Social links (leave "#" to hide-in-place; replace when ready)
  social: {
    instagram: "#",
    facebook: "#",
  },

  // Google Business / Maps listing link
  googleUrl:
    "https://www.google.com/maps/place/Dr.+Sheetal's+Homoeopathy+Clinic/@28.506497,77.321668,16z/data=!4m6!3m5!1s0x390ce7724f1e3f15:0x8431485b70a4a30e!8m2!3d28.506497!4d77.3216683!16s%2Fg%2F11zgz3w3hv?hl=en-US&entry=ttu&g_ep=EgoyMDI2MDcxNS4wIKXMDSoASAFQAw%3D%3D",

  // --- Timings --------------------------------------------------
  timings: [
    { days: "Monday – Saturday", hours: "10:00 AM – 1:00 PM" },
    { days: "Monday – Saturday", hours: "6:00 PM – 9:00 PM" },
    { days: "Sunday", hours: "10:00 AM – 1:00 PM (By appointment only)" },
  ] as { days: string; hours: string }[],

  // --- About ----------------------------------------------------
  about: {
    doctorName: "Dr. Sheetal",
    credentials: "BHMS, MD — Homoeopathic Physician",
    experience: "4+ years",
    photo: "", // put an image in /public and set e.g. "/dr-sheetal.jpg"
    bio: [
      "Dr. Sheetal holds a BHMS (Bachelor of Homoeopathic Medicine and Surgery) and an MD in Homoeopathy. She is a registered homoeopathic physician who practises classical homoeopathy, where one remedy is carefully selected after a detailed study of the patient.",
      "With over 4 years of clinical experience, Dr. Sheetal has helped patients across India manage both chronic and acute conditions. She combines classical homoeopathic knowledge with modern diagnostic awareness to build treatment plans around each patient's constitution, lifestyle, and full medical history.",
    ],
  },

  // --- Services -------------------------------------------------
  services: [
    {
      title: "Skin & Hair Problems",
      description:
        "Eczema, psoriasis, acne, urticaria, hair fall, and dandruff — treated at the root for lasting relief.",
      icon: Sparkles,
    },
    {
      title: "Respiratory & Allergy Care",
      description:
        "Allergic rhinitis, asthma, sinusitis, tonsillitis, and recurrent colds managed with gentle remedies.",
      icon: Wind,
    },
    {
      title: "Digestive Health",
      description:
        "Acidity, gas, constipation, irritable bowel syndrome (IBS), and piles addressed with constitutional care.",
      icon: Soup,
    },
    {
      title: "Stress, Sleep & Migraine",
      description:
        "Anxiety, migraine, headaches, and disturbed sleep eased with calming, personalised treatment.",
      icon: Brain,
    },
    {
      title: "Women & Child Care",
      description:
        "Management of PMOS (previously called PCOS or PCOD) and menstrual irregularities, alongside gentle care for childhood concerns like recurrent infections, tonsillitis, and low immunity.",
      icon: Baby,
    },
    {
      title: "Chronic & Lifestyle Conditions",
      description:
        "Thyroid disorders, joint pain, arthritis, and other long-standing conditions managed holistically.",
      icon: HeartPulse,
    },
  ] as Service[],

  // --- Why homoeopathy -----------------------------------------
  benefits: [
    {
      title: "A time-tested science",
      description:
        "Homoeopathy was founded by Dr. Samuel Hahnemann in 1796 and has been practised for over 200 years. It is based on the principle of 'Similia Similibus Curentur' — like cures like.",
      icon: Leaf,
    },
    {
      title: "Recognised in India",
      description:
        "Homoeopathy is an official system of medicine in India under the Ministry of AYUSH. India has one of the largest networks of homoeopathic doctors, colleges, and hospitals in the world.",
      icon: ShieldCheck,
    },
    {
      title: "Gentle and safe",
      description:
        "Remedies are prepared from natural sources and given in highly diluted doses. When prescribed correctly, they are safe for infants, pregnant women, and the elderly.",
      icon: UserRound,
    },
    {
      title: "Treats the whole person",
      description:
        "A homoeopath studies your physical, mental, and emotional state before selecting a remedy. The goal is long-term health, not short-term relief.",
      icon: Clock,
    },
  ] as Benefit[],

  // --- Testimonials ---------------------------------------------
  testimonials: [
    {
      name: "Priya M.",
      location: "Patient since 2024",
      quote:
        "I struggled with skin allergies for years. Dr. Sheetal listened patiently, understood my full history, and her treatment gave me lasting relief.",
    },
    {
      name: "Rahul S.",
      location: "Patient since 2025",
      quote:
        "My son used to catch a cold every month. After a few months of treatment, his immunity has clearly improved. The sweet pills were easy for him to take.",
    },
    {
      name: "Anita K.",
      location: "Patient since 2025",
      quote:
        "My migraines are finally under control without any heavy medicines. Dr. Sheetal is professional, caring, and genuinely effective.",
    },
    {
      name: "Vikram T.",
      location: "Patient since 2024",
      quote:
        "My acid reflux has reduced a lot in just a few months. The treatment was easy to follow and the follow-ups were very thorough.",
    },
    {
      name: "Sunita R.",
      location: "Patient since 2026",
      quote:
        "I was very uncomfortable with my hair fall and dandruff. Dr. Sheetal explained the root cause and now my hair is much healthier.",
    },
  ] as Testimonial[],
};

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Why Us", href: "#why" },
  { label: "Contact", href: "#contact" },
];

export const whatsappHref = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(
  "Hi, I'd like to book an appointment at Dr. Sheetal's Homoeopathy Clinic."
)}`;
