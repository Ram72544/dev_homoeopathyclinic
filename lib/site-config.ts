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
  Flame,
  Droplets,
  Activity,
  Heart,
} from "lucide-react";

export type Service = {
  id: string;
  title: string;
  description?: string;
  shortDesc: string;
  icon: LucideIcon;
  subConditions: string[];
  medicalOverview: string;
  rootCause: string;
  homeopathyAdvantage: string;
  symptoms: string[];
  keyRemedies: string[];
  recoveryDuration: string;
  caseQuestions?: string;
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
    "Get personalized homeopathic treatment that treats the root cause of your illness, not just temporary symptoms. 100% safe, natural sweet pills with zero side effects for kids, adults, and seniors.",

  // --- Contact -------------------------------------------------
  phoneDisplay: "+91 79053 71551",
  phone: "+917905371551",
  whatsapp: "917905371551",
  whatsappUrl: "https://wa.me/917905371551?text=Hello%20Dr.%20Sheetal,%20I%20would%20like%20to%20consult%20regarding%20homeopathy%20treatment.",
  email: "care@drsheetalclinic.com",
  address:
    "D-160/1, Saurabh Vihar, Near Kali Badi Mandir, Hari Nagar Extn., Jaitpur, Badarpur, New Delhi - 110044",

  mapsEmbedUrl:
    "https://maps.google.com/maps?q=Dr.+Sheetal's+Homoeopathy+Clinic,+Saurabh+Vihar,+Hari+Nagar+Extn,+Jaitpur,+Delhi&t=&z=16&ie=UTF8&iwloc=&output=embed",

  bookingUrl: "#contact",

  social: {
    instagram: "#",
    facebook: "#",
  },

  googleUrl:
    "https://www.google.com/maps/place/Dr.+Sheetal's+Homoeopathy+Clinic/@28.506497,77.321668,16z/data=!4m6!3m5!1s0x390ce7724f1e3f15:0x8431485b70a4a30e!8m2!3d28.506497!4d77.3216683!16s%2Fg%2F11zgz3w3hv?hl=en-US&entry=ttu&g_ep=EgoyMDI2MDcxNS4wIKXMDSoASAFQAw%3D%3D",

  // --- Timings --------------------------------------------------
  timings: [
    { days: "Monday – Saturday (Morning)", hours: "10:00 AM – 1:00 PM (Except Tuesday)" },
    { days: "Monday – Saturday (Evening)", hours: "6:00 PM – 9:00 PM (Except Tuesday)" },
    { days: "Sunday (Morning)", hours: "10:00 AM – 1:00 PM" },
    { days: "Sunday (Evening)", hours: "6:00 PM – 9:00 PM (Prior Appointment Only)" },
    { days: "Tuesday", hours: "Closed (Weekly Off)" },
  ] as { days: string; hours: string }[],

  // --- About Doctor ---------------------------------------------
  about: {
    doctorName: "Dr. Sheetal Tiwari",
    credentials: "BHMS, MD (Homoeopathy)",
    experience: "4+ Years Clinical Practice",
    photo: "",
    bio: [
      "Dr. Sheetal Tiwari is a qualified, registered Homoeopathic Doctor holding BHMS and MD in Homoeopathy. She practices classical homeopathy, which means finding the exact single medicine that matches your unique body type, personality, and full health history.",
      "With over 4 years of clinical experience, Dr. Sheetal Tiwari has successfully treated hundreds of patients across Delhi NCR and India for long-standing chronic health issues, skin allergies, digestive problems, and childhood illnesses — without heavy chemicals or side effects.",
    ],
  },

  // --- Services & Disease Details (Short, Crisp, Validated Data) ---
  services: [
    {
      id: "supportive-oncology-care",
      title: "Supportive Cancer & Palliative Care",
      shortDesc:
        "Integrative relief for chemotherapy side effects, radiation fatigue, nausea, pain & immune vitality to improve quality of life.",
      icon: ShieldCheck,
      subConditions: [
        "Chemotherapy Nausea, Vomiting & Weakness",
        "Radiation Burns & Painful Mouth Sores (Mucositis)",
        "Cancer-Related Extreme Fatigue & Low Appetite",
        "Neuropathic Pain & Post-Surgery Recovery",
        "Immune Resilience & Emotional Vitality",
      ],
      medicalOverview:
        "While conventional oncology treatments target cancer cells, they often cause a heavy physical toll, severe fatigue, nausea, and immune suppression.",
      rootCause:
        "Cellular oxidative stress, chemotherapy toxicity, and weakened immune vitality.",
      homeopathyAdvantage:
        "Homeopathy acts as a gentle, non-interfering adjuvant support. It alleviates nausea, heals painful mouth sores, eases nerve pain, restores natural appetite, and strengthens vitality alongside your primary medical care.",
      symptoms: [
        "Severe nausea, vomiting, or altered taste following chemo cycles",
        "Debilitating chronic exhaustion and muscle weakness",
        "Painful mouth ulcers (mucositis) or radiation skin redness",
        "Anxiety, sleep disruption, and loss of physical strength",
      ],
      keyRemedies: ["Arnica Montana", "Cadmium Sulphuricum", "Ipecacuanha", "Arsenicum Album", "Carbo Vegetabilis"],
      recoveryDuration: "Ongoing supportive care aligned with your treatment cycles.",
      caseQuestions:
        "Please share what cancer treatment you are currently undergoing (chemo, radiation, or post-surgery). What side effects trouble you most (nausea, fatigue, mouth sores, or pain)? We work in gentle harmony with your oncologist.",
    },
    {
      id: "diabetes-blood-sugar",
      title: "Diabetes & Metabolic Care",
      shortDesc:
        "Type 2 diabetes, insulin resistance, HbA1c control & diabetic neuropathy prevented naturally with safe botanical potencies.",
      icon: Activity,
      subConditions: [
        "High Fasting & Post-Meal Blood Sugar",
        "Elevated HbA1c & Insulin Resistance",
        "Diabetic Nerve Tingling (Neuropathy)",
        "Extreme Fatigue, Thirst & Frequent Urination",
        "Slow Healing Wounds & Sluggish Metabolism",
      ],
      medicalOverview:
        "Type 2 diabetes and fluctuating blood sugar happen when your body's cells develop insulin resistance, causing excess glucose to circulate in the bloodstream.",
      rootCause:
        "Insulin receptor fatigue, chronic stress, pancreatic strain, or sedentary lifestyle.",
      homeopathyAdvantage:
        "Classical homeopathy combined with proven mother tinctures (like Syzygium & Gymnema) stimulates natural insulin sensitivity, reduces sugar spikes, and protects kidneys and nerves from diabetic damage.",
      symptoms: [
        "Elevated fasting blood sugar (>126 mg/dL) or HbA1c (>6.5%)",
        "Tingling, numbness, or burning sensation in feet and soles",
        "Excessive thirst, dry tongue, and frequent urination at night",
        "Post-meal lethargy, brain fog, and slow wound healing",
      ],
      keyRemedies: ["Syzygium Jambolanum", "Gymnema Sylvestre", "Cephalandra Indica", "Phosphoric Acid", "Uranium Nitricum"],
      recoveryDuration: "3 to 6 months for metabolic stabilization & HbA1c reduction.",
      caseQuestions:
        "Please share your latest Fasting, PP blood sugar, and HbA1c levels. Do you experience tingling in your feet, excessive thirst, or fatigue? Let us know if you take oral medications or insulin.",
    },
    {
      id: "skin-hair",
      title: "Skin & Hair Allergies",
      shortDesc:
        "Eczema, urticaria, psoriasis, alopecia & stubborn hair fall — cured permanently from within without steroids.",
      icon: Sparkles,
      subConditions: [
        "Itchy Skin Rashes & Eczema",
        "Sudden Hives & Skin Allergy",
        "Thick Scaly Skin Patches (Psoriasis)",
        "Patchy Hair Loss & Thinning",
        "Fungal Rash, Pimples & Acne",
      ],
      medicalOverview:
        "Skin & hair issues like eczema, hives, or hair fall are your body's way of signaling an internal immune imbalance. When you apply strong chemical creams, they temporarily suppress the rash on the surface, but the underlying inflammation remains inside.",
      rootCause:
        "Over-sensitive immune response, daily stress, blood toxicity, or digestion issues.",
      homeopathyAdvantage:
        "Homeopathy cleanses your system from within and calms your immune response naturally. It restores your skin's healthy cell renewal without steroid side effects or skin thinning.",
      symptoms: [
        "Intense itching, burning sensation, or red inflamed skin patches",
        "Dry, scaling, or oozing skin eruptions triggered by weather changes",
        "Sudden circular hair loss patches or excessive scalp hair thinning",
        "Recurrent hives or rash outbreaks following specific foods or stress",
      ],
      keyRemedies: ["Sulphur", "Arsenicum Album", "Graphites", "Rhus Tox", "Thuja Occidentalis"],
      recoveryDuration: "3 to 6 months for permanent long-term resolution.",
      caseQuestions:
        "Please share what skin or hair issue you are facing. Where do you get rashes or hair fall, and when does itching get worse (like in cold air, night, or after stress)? Have you used steroid creams or allopathy before?",
    },
    {
      id: "pcos-womens-health",
      title: "PCOS, PCOD & Women's Health",
      shortDesc:
        "PCOS/PCOD, irregular periods, hormonal acne, thyroid & menopausal distress treated without synthetic hormones.",
      icon: Baby,
      subConditions: [
        "PCOD / PCOS (Cysts on Ovaries)",
        "Late, Irregular or Heavy Periods",
        "Acne, Unwanted Facial Hair & Thyroid",
        "Unexplained Weight Gain & Fatigue",
        "Painful Period Cramps",
      ],
      medicalOverview:
        "PCOS, delayed periods, or hormonal acne occur when your body's natural hormone cycle gets interrupted, preventing normal monthly ovulation.",
      rootCause:
        "Hormonal axis imbalance, insulin resistance, thyroid fluctuations, or emotional stress.",
      homeopathyAdvantage:
        "Homeopathy gently restores your natural monthly period cycle and helps dissolve ovarian cysts naturally without synthetic hormone pills or birth control.",
      symptoms: [
        "Delayed menstrual cycles (35 to 90+ days interval)",
        "Stubborn jawline acne, thinning hair, or unwanted facial hair growth",
        "Unexplained weight gain around waist and difficulty losing weight",
        "Severe mood swings, pelvic cramps, and chronic fatigue",
      ],
      keyRemedies: ["Pulsatilla", "Sepia", "Calcarea Carbonica", "Thuja", "Folliculinum"],
      recoveryDuration: "3 to 6 months to regulate natural menstrual cycles.",
      caseQuestions:
        "Please share your period and health concerns. Are your cycles delayed (by 35 to 60+ days)? Are you experiencing facial hair, stubborn acne, or weight gain? Do mention if you have an ultrasound (USG) report.",
    },
    {
      id: "child-health-immunity",
      title: "Child Health & Immunity",
      shortDesc:
        "Recurrent colds, enlarged tonsils, poor appetite & low immunity in children — 100% safe, tasty sweet pills.",
      icon: HeartPulse,
      subConditions: [
        "Frequent Cold, Cough & Fever",
        "Swollen Tonsils & Throat Infections",
        "Poor Eating & Slow Growth in Kids",
        "Teething Pain & Crankiness",
        "Low Immunity & Repeated Illness",
      ],
      medicalOverview:
        "When children catch frequent colds, fever, or swollen throat tonsils every few weeks, it means their natural immune system is struggling to fight everyday germs.",
      rootCause:
        "Underdeveloped childhood immunity or gut imbalance from frequent antibiotic use.",
      homeopathyAdvantage:
        "Homeopathy offers 100% safe, sweet pills that kids love taking. It builds strong natural immunity and naturally shrinks enlarged tonsils so children avoid painful throat surgery.",
      symptoms: [
        "Catching cold and throat infection every 2-3 weeks",
        "Difficulty swallowing, snoring, or mouth breathing due to enlarged adenoids",
        "Refusal to eat solid food and sluggish physical growth",
        "Irritability, night terrors, or painful dentition during teething",
      ],
      keyRemedies: ["Calcarea Phosphorica", "Baryta Carbonica", "Chamomilla", "Belladonna", "Silicea"],
      recoveryDuration: "2 to 4 months for robust immune defense.",
      caseQuestions:
        "Please share your child's health details. How often does your child catch cold or fever? Do they snore, have enlarged tonsils, or refuse solid food? Let us know their age and if they've taken frequent antibiotics.",
    },
    {
      id: "gas-acidity-stomach",
      title: "Gas, Acidity & Stomach",
      shortDesc:
        "Chronic GERD, bloating, IBS, constipation & gastritis healed gently without lifetime antacid dependence.",
      icon: Soup,
      subConditions: [
        "Stomach Pain, Loose Stools & IBS",
        "Chest Burning & Acid After Meals",
        "Gas, Bloating & Stomach Heaviness",
        "Constipation & Piles (Haemorrhoids)",
        "Weak Digestion & Food Sensitivity",
      ],
      medicalOverview:
        "Acidity, stomach bloating, gas, or IBS happen when your stomach's natural digestion and gut movement get out of rhythm.",
      rootCause:
        "Irregular meal times, daily stress, weak digestive enzymes, or frequent antacid pills.",
      homeopathyAdvantage:
        "Homeopathy balances your stomach acid levels naturally and heals your gut lining, ending painful bloating and digestive discomfort without lifetime antacid dependency.",
      symptoms: [
        "Burning sensation in chest or throat after meals (Heartburn)",
        "Excessive abdominal gas, fullness, and severe bloating",
        "Alternating diarrhea and constipation triggered by stress (IBS)",
        "Heavy sluggish feeling and loss of natural appetite",
      ],
      keyRemedies: ["Nux Vomica", "Lycopodium Clavatum", "Carbo Vegetabilis", "Pulsatilla", "Robinia"],
      recoveryDuration: "2 to 3 months for complete digestive harmony.",
      caseQuestions:
        "Please share your stomach discomfort details. Are you troubled by chest burning after meals, severe bloating, or irregular morning bowels? Feel free to mention how long you've been taking antacids and if stress affects your stomach.",
    },
    {
      id: "cough-sinus-asthma",
      title: "Cough, Sinus & Asthma",
      shortDesc:
        "Allergic rhinitis, chronic sinusitis, bronchial asthma & chest congestion — strengthening natural respiratory immunity.",
      icon: Wind,
      subConditions: [
        "Continuous Sneezing & Runny Nose",
        "Sinus Headache & Face Pain",
        "Asthma, Chest Tightness & Wheezing",
        "Dry or Wet Cough That Won't Go",
        "Dust & Cold Weather Allergies",
      ],
      medicalOverview:
        "Frequent sneezing, sinus pain, or chest wheezing happen when your airways become overly sensitive to cold air, dust, pollution, or pollen.",
      rootCause:
        "Weak lung immunity, sensitive nasal lining, or inherited allergy tendencies.",
      homeopathyAdvantage:
        "Homeopathy strengthens your lung immunity and naturally thins stubborn nasal mucus, helping you breathe freely without depending on lifelong inhalers or anti-allergic pills.",
      symptoms: [
        "10-20 continuous morning sneezing fits upon waking",
        "Nasal blockage, post-nasal drip, and heavy sinus headache",
        "Shortness of breath, chest tightness, or nocturnal wheezing",
        "Persistent tickling throat cough that worsens at night or in cold air",
      ],
      keyRemedies: ["Natrum Muriaticum", "Sabadilla", "Hepar Sulphur", "Blatta Orientalis", "Arsenicum Album"],
      recoveryDuration: "2 to 4 months for significant reduction in allergy attacks.",
      caseQuestions:
        "Please share your chest or sinus concerns. Do you get continuous morning sneezing, nasal blockage, or cough at night? Let us know if weather changes, dust, or cold food trigger your symptoms, and if you use inhalers.",
    },
    {
      id: "joint-pain-arthritis",
      title: "Joint Pain, Arthritis & Sciatica",
      shortDesc:
        "Osteoarthritis, rheumatoid pain, sciatica, cervical spondylosis & uric acid gout treated gently without NSAID stomach damage.",
      icon: Activity,
      subConditions: [
        "Knee Pain & Morning Stiffness",
        "Swollen, Hot & Painful Joints",
        "Shooting Back Pain Down the Leg",
        "Neck & Lower Back Bone Pain",
        "Uric Acid & Gout (Big Toe Pain)",
      ],
      medicalOverview:
        "Joint stiffness, knee pain, or shooting sciatica pain occur when joint lubrication reduces, cartilage wears down, or spinal nerves get compressed.",
      rootCause:
        "Joint fluid depletion, cartilage wear, uric acid buildup, or spinal nerve pressure.",
      homeopathyAdvantage:
        "Homeopathy reduces joint swelling and stiffness, promotes natural joint lubrication, and dissolves uric acid crystals safely without damaging your stomach or kidneys with painkillers.",
      symptoms: [
        "Morning joint stiffness lasting over 30 minutes upon waking",
        "Sharp shooting pain from lower back down the leg (Sciatica)",
        "Crepitus (grinding noise), swelling, and pain while climbing stairs",
        "Throbbing pain in big toe or small finger joints due to uric acid",
      ],
      keyRemedies: ["Rhus Toxicodendron", "Bryonia Alba", "Colocynthis", "Ruta Graveolens", "Lithium Carb"],
      recoveryDuration: "3 to 6 months for permanent mobility improvement.",
      caseQuestions:
        "Please share your joint or back pain details. Which joints hurt (knees, lower back, neck, or fingers)? Is stiffness worse in the morning? Does warm water or cold weather affect the pain? Mention any X-ray or uric acid reports.",
    },
    {
      id: "migraine-stress-sleep",
      title: "Migraine, Stress & Sleep",
      shortDesc:
        "Chronic migraine, tension headaches, severe anxiety, insomnia & brain fog eased with calming constitutional care.",
      icon: Brain,
      subConditions: [
        "One-Sided Throbbing Headache (Migraine)",
        "Tight Head & Stiff Neck Pain",
        "Can't Sleep or Waking Up at Night",
        "Anxiety, Worry & Panic Attacks",
        "Mental Fog & Constant Overthinking",
      ],
      medicalOverview:
        "Throbbing migraines, tension headaches, or sleepless nights happen when your nervous system becomes over-excited from continuous mental stress or fatigue.",
      rootCause:
        "Nerve sensitivity, stress hormones, irregular sleep patterns, or eye/neck strain.",
      homeopathyAdvantage:
        "Homeopathy gently calms your nervous system, reduces the frequency of painful migraine attacks, and restores deep, relaxing sleep without sleeping pills or habit-forming medicines.",
      symptoms: [
        "One-sided throbbing headache with nausea, vomiting, or light sensitivity",
        "Difficulty falling asleep or waking up exhausted at 2 AM",
        "Tight band-like pressure around forehead and neck tension",
        "Constant anxiety, restlessness, and inability to relax mind",
      ],
      keyRemedies: ["Belladonna", "Spigelia", "Natrum Muriaticum", "Coffea Cruda", "Kali Phosphoricum"],
      recoveryDuration: "2 to 4 months for long-lasting freedom from attacks.",
      caseQuestions:
        "Please share your headache or sleep concerns. Where do you feel the pain (one side, forehead, or neck)? Do sunlight, skipped meals, or stress trigger it? Tell us about your sleep quality and daily stress levels.",
    },
    {
      id: "thyroid-metabolic",
      title: "Thyroid & Endocrine Care",
      shortDesc:
        "Hypothyroidism, elevated TSH, weight gain, sluggish metabolism & fatigue treated naturally by restoring gland health.",
      icon: Flame,
      subConditions: [
        "High TSH (Underactive Thyroid)",
        "Thyroid Caused by Immune Attack",
        "Slow Metabolism & Hard to Lose Weight",
        "Always Tired & Sensitive to Cold",
        "Hair Thinning & Dry Skin from Thyroid",
      ],
      medicalOverview:
        "Hypothyroidism (high TSH), constant tiredness, and stubborn weight gain happen when your thyroid gland slows down its natural metabolic signals.",
      rootCause:
        "Thyroid gland weakness, immune imbalance (anti-TPO), or slow metabolic rate.",
      homeopathyAdvantage:
        "Homeopathy gently stimulates your thyroid gland to produce its own natural hormones, helping boost your metabolism and energy level safely under medical guidance.",
      symptoms: [
        "Unexplained weight gain despite normal or low diet",
        "Constant sluggishness, brain fog, and low energy levels",
        "Extreme sensitivity to cold weather and dry rough skin",
        "Irregular menstrual cycles and swelling in throat/face",
      ],
      keyRemedies: ["Thyroidinum", "Calcarea Carbonica", "Sepia", "Iodium", "Natrum Muriaticum"],
      recoveryDuration: "4 to 8 months for thyroid hormone stabilization.",
      caseQuestions:
        "Please share your thyroid health concerns. Are you experiencing low energy, unexpected weight gain, hair fall, or cold sensitivity? Please share your latest TSH level if known, and if you currently take thyroxine tablets.",
    },
    {
      id: "kidney-stones-urinary",
      title: "Kidney Stones & Urinary Care",
      shortDesc:
        "Renal calculi (stones), recurrent UTIs, burning urination & urinary frequency treated gently to flush stones naturally.",
      icon: Droplets,
      subConditions: [
        "Kidney Stones (Any Size)",
        "Repeated Urine Infections (UTI)",
        "Burning or Painful Urination",
        "Bladder Cramps & Urge to Urinate",
        "Leaking Urine or Going Too Frequently",
      ],
      medicalOverview:
        "Kidney stones and burning urine occur when mineral salts crystallize in the kidneys or bacteria irritate your urinary tract.",
      rootCause:
        "Dehydration, mineral salt crystallization, or low urinary tract immunity.",
      homeopathyAdvantage:
        "Homeopathy eases severe kidney pain spasms, smooths stone sharp edges, and helps flush out small to medium kidney stones naturally through urine without surgery.",
      symptoms: [
        "Sharp agonizing flank pain radiating from lower back to groin",
        "Burning, stinging pain during or after urination",
        "Frequent urge to urinate with cloudy or reddish urine",
        "Nausea, chills, and fever associated with renal pain",
      ],
      keyRemedies: ["Berberis Vulgaris", "Cantharis", "Sarsaparilla", "Lycopodium", "Hydrangea"],
      recoveryDuration: "2 to 6 weeks for stone clearance and infection control.",
      caseQuestions:
        "Please share your kidney or urinary concerns. Where is your pain located (lower back or side)? Is there burning or frequent urination? Mention your kidney stone size in mm if you have an ultrasound report.",
    },
    {
      id: "liver-cholesterol-health",
      title: "Fatty Liver & Cholesterol Care",
      shortDesc:
        "Grade 1 & 2 fatty liver, elevated triglycerides, high LDL cholesterol & sluggish hepatic metabolism treated safely without statin side effects.",
      icon: Flame,
      subConditions: [
        "Fatty Liver (Grade 1 & Grade 2)",
        "High Triglycerides & Bad LDL Cholesterol",
        "Sluggish Liver, Heavy Right Abdomen Ache",
        "Poor Fat Digestion & Nausea Tendency",
        "Elevated Liver Enzymes (SGOT/SGPT)",
      ],
      medicalOverview:
        "Fatty liver and high cholesterol occur when the liver becomes overloaded with excess lipids, slowing down its natural detoxification and bile flow.",
      rootCause:
        "Metabolic syndrome, refined carbohydrates, high triglycerides, or sluggish hepatic circulation.",
      homeopathyAdvantage:
        "Homeopathy naturally stimulates healthy bile flow, reverses liver cell fat accumulation, and normalizes cholesterol levels safely without causing muscle cramps or enzyme spikes.",
      symptoms: [
        "Ultrasound finding of Grade 1 or Grade 2 Fatty Liver",
        "High serum triglycerides or LDL cholesterol on lipid profile",
        "Dull dragging heaviness under the right rib cage after meals",
        "Bitter taste in mouth, morning nausea, and sluggish digestion",
      ],
      keyRemedies: ["Chelidonium Majus", "Carduus Marianus", "Lycopodium", "Cholesterinum", "Hydrastis"],
      recoveryDuration: "3 to 5 months to normalize lipid profile and liver enzymes.",
      caseQuestions:
        "Please share your latest lipid profile (Cholesterol, Triglycerides) and ultrasound report if available. Do you feel heaviness under your right ribs or sluggish digestion after oily food?",
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
      title: "Clinically Proven & Safe",
      description:
        "A time-tested medical science backed by over 200 years of global research and safe, predictable clinical outcomes.",
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
  { label: "HOME", href: "#home" },
  { label: "ABOUT", href: "#about" },
  { label: "TREATMENTS", href: "#services" },
  { label: "WHY US", href: "#why" },
  { label: "REVIEWS", href: "#testimonials" },
  { label: "CONTACT", href: "#contact" },
];

export const whatsappHref = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(
  "Hello Dr. Sheetal, I want to book an appointment for consultation."
)}`;
