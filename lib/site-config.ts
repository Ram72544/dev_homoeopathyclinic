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
  shortName: "Dr. Sheetal's Clinic",
  tagline: "Gentle, Natural & Permanent Healing for Your Whole Family",
  intro:
    "Get personalized homeopathic treatment that treats the root cause of your illness, not just temporary symptoms. Recognized by the Ministry of AYUSH, India — 100% safe, natural sweet pills with zero side effects for kids, adults, and seniors.",

  // --- Contact -------------------------------------------------
  phoneDisplay: "+91 79053 71551",
  phone: "+917905371551",
  whatsapp: "917905371551",
  email: "care@drsheetalclinic.com",
  address:
    "D-160/1, Saurabh Vihar, Near Kali Badi Mandir, Hari Nagar Extn., Jaitpur, Badarpur, New Delhi - 110044",

  mapsEmbedUrl:
    "https://www.google.com/maps?q=Dr.+Sheetal%27s+Homoeopathy+Clinic&ll=28.506497,77.3216683&z=16&output=embed",

  bookingUrl: "#contact",

  social: {
    instagram: "#",
    facebook: "#",
  },

  googleUrl:
    "https://www.google.com/maps/place/Dr.+Sheetal's+Homoeopathy+Clinic/@28.506497,77.321668,16z/data=!4m6!3m5!1s0x390ce7724f1e3f15:0x8431485b70a4a30e!8m2!3d28.506497!4d77.3216683!16s%2Fg%2F11zgz3w3hv?hl=en-US&entry=ttu&g_ep=EgoyMDI2MDcxNS4wIKXMDSoASAFQAw%3D%3D",

  // --- Timings --------------------------------------------------
  timings: [
    { days: "Monday – Saturday (Morning)", hours: "10:00 AM – 1:00 PM" },
    { days: "Monday – Saturday (Evening)", hours: "6:00 PM – 9:00 PM" },
    { days: "Sunday", hours: "10:00 AM – 1:00 PM (Prior Appointment Only)" },
  ] as { days: string; hours: string }[],

  // --- About Doctor ---------------------------------------------
  about: {
    doctorName: "Dr. Sheetal",
    credentials: "BHMS, MD (Homoeopathy)",
    experience: "4+ Years Clinical Practice",
    photo: "",
    bio: [
      "Dr. Sheetal is a qualified, registered Homoeopathic Doctor holding BHMS and MD in Homoeopathy. She practices classical homeopathy, which means finding the exact single medicine that matches your unique body type, personality, and full health history.",
      "With over 4 years of clinical experience, Dr. Sheetal has successfully treated hundreds of patients across Delhi NCR and India for long-standing chronic health issues, skin allergies, digestive problems, and childhood illnesses — without heavy chemicals or side effects.",
    ],
  },

  // --- Services -------------------------------------------------
  services: [
    {
      title: "Skin & Hair Problems",
      description:
        "Eczema, psoriasis, acne, fungal allergy, hives (urticaria), hair fall & stubborn dandruff — cured from within.",
      icon: Sparkles,
    },
    {
      title: "Cough, Cold & Allergies",
      description:
        "Sinusitis, asthma, allergic sneezing, frequent colds & tonsils — strengthening natural chest immunity.",
      icon: Wind,
    },
    {
      title: "Gas, Acidity & Stomach",
      description:
        "Chronic acidity, gas, indigestion, constipation, IBS & piles treated gently without lifetime dependence.",
      icon: Soup,
    },
    {
      title: "Stress, Sleep & Migraine",
      description:
        "Severe headaches, migraine, anxiety, sleep issues & mental fatigue eased with soothing constitutional care.",
      icon: Brain,
    },
    {
      title: "Women's Care & PCOS",
      description:
        "PCOS/PCOD, irregular periods, hormonal imbalance, thyroid & menopause discomfort handled safely.",
      icon: Baby,
    },
    {
      title: "Child Health & Immunity",
      description:
        "Recurrent infections, slow growth, low appetite, teething troubles & poor immunity in children.",
      icon: HeartPulse,
    },
  ] as Service[],

  // --- Benefits -------------------------------------------------
  benefits: [
    {
      title: "Treats Root Cause",
      description:
        "Instead of suppressing symptoms temporarily, homeopathy works deep inside your body to cure the real root cause.",
      icon: Leaf,
    },
    {
      title: "100% Safe & Natural",
      description:
        "Sweet pills prepared from natural substances. Extremely safe for infants, pregnant mothers, and senior citizens.",
      icon: ShieldCheck,
    },
    {
      title: "No Side Effects",
      description:
        "Gentle remedies that do not cause acidity, drowsiness, organ damage, or habit-forming drug addiction.",
      icon: UserRound,
    },
    {
      title: "Recognized by Govt. of India",
      description:
        "Approved system of medicine under the Ministry of AYUSH, Govt. of India, backed by over 200 years of medical research.",
      icon: Clock,
    },
  ] as Benefit[],

  // --- Patient Reviews ------------------------------------------
  testimonials: [
    {
      name: "Priya Sharma",
      location: "New Delhi",
      quote:
        "I suffered from severe skin allergy and itching for 3 years. After taking Dr. Sheetal's medicine for 4 months, my skin is completely clear. Best homeopathy doctor in Badarpur!",
    },
    {
      name: "Rahul Verma",
      location: "Faridabad",
      quote:
        "My 5-year-old son used to get cough and fever every single month. Homeopathy sweet pills improved his immunity tremendously. He rarely gets sick now.",
    },
    {
      name: "Anita Gupta",
      location: "New Delhi",
      quote:
        "My chronic migraine and acidity are finally cured without heavy painkiller tablets. Dr. Sheetal gives ample time to listen to all details.",
    },
    {
      name: "Vikram Teotia",
      location: "Noida",
      quote:
        "Very honest and knowledgeable doctor. She explained the root cause of my digestive issues clearly. Highly recommended for family care.",
    },
  ] as Testimonial[],
};

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Treatments", href: "#services" },
  { label: "Why Us", href: "#why" },
  { label: "Reviews", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

export const whatsappHref = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(
  "Hello Dr. Sheetal, I want to book an appointment for consultation."
)}`;
