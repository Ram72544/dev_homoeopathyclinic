"use client";

import { useMemo, useState, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle2, Loader2, ShieldCheck, HeartPulse, ClipboardList, Stethoscope } from "lucide-react";
import { site } from "@/lib/site-config";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const appointmentSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Please enter your name")
    .max(50, "Name is too long")
    .regex(/^[A-Za-z\s'-]+$/, "Only letters and spaces allowed"),
  phone: z
    .string()
    .trim()
    .regex(/^\d{10}$/, "Enter a valid 10-digit mobile number"),
  date: z.string().trim().min(1, "Please select a date"),
  time: z.string().trim().min(1, "Please select a time slot"),
  diseaseCategory: z.string().trim().optional(),
  age: z.string().trim().optional(),
  gender: z.string().trim().optional(),
  duration: z.string().trim().optional(),
  lifestyle: z.string().trim().optional(),
  concern: z.string().trim().optional(),
});

type AppointmentFormValues = z.infer<typeof appointmentSchema>;

const MORNING_SLOTS = [
  "10:00 AM – 11:00 AM",
  "11:00 AM – 12:00 PM",
  "12:00 PM – 1:00 PM",
];

const EVENING_SLOTS = [
  "6:00 PM – 7:00 PM",
  "7:00 PM – 8:00 PM",
  "8:00 PM – 9:00 PM",
];

function getSlotsForDate(dateStr: string): string[] {
  if (!dateStr) return [];
  const day = new Date(`${dateStr}T00:00:00`).getDay();
  return day === 0 ? MORNING_SLOTS : [...MORNING_SLOTS, ...EVENING_SLOTS];
}

function todayISO(): string {
  const now = new Date();
  const offsetMs = now.getTimezoneOffset() * 60000;
  return new Date(now.getTime() - offsetMs).toISOString().slice(0, 10);
}

function formatDateLabel(dateStr: string): string {
  return new Date(`${dateStr}T00:00:00`).toLocaleDateString("en-IN", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export function AppointmentForm() {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmedName, setConfirmedName] = useState("");
  const [submitError, setSubmitError] = useState("");
  const minDate = useMemo(() => todayISO(), []);

  const [selectedDate, setSelectedDate] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<AppointmentFormValues>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: {
      name: "",
      phone: "",
      date: "",
      time: "",
      diseaseCategory: "",
      age: "",
      gender: "",
      duration: "",
      lifestyle: "",
      concern: "",
    },
  });

  const selectedCategory = watch("diseaseCategory");

  const currentService = useMemo(() => {
    return site.services.find((s) => s.title === selectedCategory);
  }, [selectedCategory]);

  const dynamicFieldLabel = currentService
    ? `Health Concern & Symptoms (${currentService.title}) *`
    : "Tell Us About Your Health Concern *";

  const dynamicPlaceholder = useMemo(() => {
    if (currentService?.caseQuestions) {
      return currentService.caseQuestions;
    }
    return "Please describe your primary health concerns, main symptoms, how long you've experienced them, and any past or current medications taken...";
  }, [currentService]);

  // Listen for prefill event from DiseaseModal
  useEffect(() => {
    function handlePrefill(e: Event) {
      const detail = (
        e as CustomEvent<{
          diseaseTitle: string;
          initialNotes?: string;
          placeholderHint?: string;
        }>
      ).detail;
      if (detail) {
        if (detail.diseaseTitle) {
          setValue("diseaseCategory", detail.diseaseTitle, { shouldValidate: true });
        }
        if (detail.initialNotes !== undefined) {
          setValue("concern", detail.initialNotes, { shouldValidate: true });
        }
      }
    }

    window.addEventListener("prefill-booking-form", handlePrefill);
    return () => {
      window.removeEventListener("prefill-booking-form", handlePrefill);
    };
  }, [setValue]);

  const availableSlots = getSlotsForDate(selectedDate);
  const dateField = register("date", {
    onChange: (e) => setSelectedDate(e.target.value),
  });

  async function onSubmit(values: AppointmentFormValues) {
    setSubmitError("");
    try {
      const slot = `${formatDateLabel(values.date)} · ${values.time}`;
      const response = await fetch("/api/book-appointment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: values.name,
          phone: values.phone,
          slot,
          concern: values.concern,
          age: values.age,
          gender: values.gender,
          diseaseCategory: values.diseaseCategory,
          duration: values.duration,
          lifestyle: values.lifestyle,
        }),
      });
      const data = (await response.json()) as { ok?: boolean; error?: string };

      if (!response.ok || !data.ok) {
        throw new Error(data.error || "Failed to send consultation request");
      }

      setConfirmedName(values.name);
      setShowConfirmation(true);
      reset();
    } catch (err) {
      setSubmitError(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      );
    }
  }

  return (
    <>
      <form
        id="contact-form"
        onSubmit={handleSubmit(onSubmit)}
        className="scroll-mt-36 rounded-[2.5rem] border border-white/90 bg-white/70 p-6 sm:p-8 shadow-2xl backdrop-blur-md [transform:translateZ(0)] [backface-visibility:hidden] bg-clip-padding"
      >
        {/* Warm Caring Form Header */}
        <div className="flex items-center gap-3.5 border-b border-[#F0EADF]/80 pb-5 mb-5">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/35 bg-gradient-to-br from-[#2A4034] to-[#1F2C25] text-[#E5C583] shadow-[inset_0_1px_2px_rgba(255,255,255,0.4)] backdrop-blur-md shrink-0">
            <HeartPulse className="h-5 w-5" />
          </div>
          <div>
            <span className="text-[10px] font-light tracking-[0.22em] text-[#C5A059] uppercase block">Online & OPD Booking</span>
            <h3 className="font-serif text-2xl font-normal text-[#1F2C25] mt-0.5">Request a Consultation</h3>
            <p className="text-xs font-light text-[#7A8A80] mt-0.5">Classical Homeopathic Intake Form — All details kept confidential</p>
          </div>
        </div>

        <div className="space-y-4">
          {/* Targeted Disease Specialization */}
          <Field label="Target Specialization / Health Issue" error={errors.diseaseCategory?.message}>
            <select
              {...register("diseaseCategory")}
              className="w-full rounded-2xl border border-[#E8E1D5] bg-[#FAF8F5] px-4.5 py-3.5 text-sm font-light text-[#1F2C25] outline-none transition-all duration-300 focus:border-[#C5A059] focus:bg-white focus:ring-2 focus:ring-[#C5A059]/20"
            >
              <option value="">-- Select Disease / Specialization --</option>
              {site.services.map((s) => (
                <option key={s.id} value={s.title}>
                  {s.title}
                </option>
              ))}
              <option value="General Consultation">General / Other Health Concern</option>
            </select>
          </Field>

          {/* Personal Info: Name & Phone */}
          <div className="grid gap-3.5 sm:grid-cols-2">
            <Controller
              name="name"
              control={control}
              render={({ field, fieldState }) => (
                <Field label="Your Full Name *" error={fieldState.error?.message}>
                  <input
                    type="text"
                    {...field}
                    onChange={(e) => {
                      const cleaned = e.target.value
                        .replace(/[^a-zA-Z\s'-]/g, "")
                        .toLowerCase()
                        .replace(/\b\w/g, (char) => char.toUpperCase())
                        .slice(0, 50);
                      field.onChange(cleaned);
                    }}
                    className="w-full rounded-2xl border border-[#E8E1D5] bg-[#FAF8F5] px-4.5 py-3.5 text-sm font-light text-[#1F2C25] outline-none transition-all duration-300 focus:border-[#C5A059] focus:bg-white focus:ring-2 focus:ring-[#C5A059]/20"
                    placeholder="Enter full name"
                  />
                </Field>
              )}
            />

            <Controller
              name="phone"
              control={control}
              render={({ field, fieldState }) => (
                <Field label="Mobile / WhatsApp Number *" error={fieldState.error?.message}>
                  <input
                    type="tel"
                    inputMode="numeric"
                    maxLength={10}
                    {...field}
                    onChange={(e) => {
                      const digits = e.target.value.replace(/\D/g, "").slice(0, 10);
                      field.onChange(digits);
                    }}
                    className="w-full rounded-2xl border border-[#E8E1D5] bg-[#FAF8F5] px-4.5 py-3.5 text-sm font-light text-[#1F2C25] outline-none transition-all duration-300 focus:border-[#C5A059] focus:bg-white focus:ring-2 focus:ring-[#C5A059]/20"
                    placeholder="10-digit mobile number"
                  />
                </Field>
              )}
            />
          </div>

          {/* Patient Details: Age, Gender & Duration */}
          <div className="grid gap-3.5 grid-cols-1 sm:grid-cols-3">
            <Field label="Patient Age" error={errors.age?.message}>
              <input
                type="number"
                min={1}
                max={110}
                {...register("age")}
                className="w-full rounded-2xl border border-[#E8E1D5] bg-[#FAF8F5] px-4.5 py-3.5 text-sm font-light text-[#1F2C25] outline-none transition-all duration-300 focus:border-[#C5A059] focus:bg-white focus:ring-2 focus:ring-[#C5A059]/20"
                placeholder="Age (e.g. 28)"
              />
            </Field>

            <Field label="Gender" error={errors.gender?.message}>
              <select
                {...register("gender")}
                className="w-full rounded-2xl border border-[#E8E1D5] bg-[#FAF8F5] px-4.5 py-3.5 text-sm font-light text-[#1F2C25] outline-none transition-all duration-300 focus:border-[#C5A059] focus:bg-white focus:ring-2 focus:ring-[#C5A059]/20"
              >
                <option value="">Select Gender</option>
                <option value="Female">Female</option>
                <option value="Male">Male</option>
                <option value="Child / Minor">Child / Minor</option>
                <option value="Other">Other</option>
              </select>
            </Field>

            <Field label="Duration of Issue" error={errors.duration?.message}>
              <select
                {...register("duration")}
                className="w-full rounded-2xl border border-[#E8E1D5] bg-[#FAF8F5] px-4.5 py-3.5 text-sm font-light text-[#1F2C25] outline-none transition-all duration-300 focus:border-[#C5A059] focus:bg-white focus:ring-2 focus:ring-[#C5A059]/20"
              >
                <option value="">How long?</option>
                <option value="Recent (< 3 Months)">Recent (&lt; 3 Months)</option>
                <option value="3 Months to 1 Year">3 Months – 1 Year</option>
                <option value="1 Year to 3 Years">1 Year – 3 Years</option>
                <option value="Chronic (3+ Years)">Chronic (3+ Years)</option>
              </select>
            </Field>
          </div>

          {/* Daily Life & Thermal/Stress Factors */}
          <Field label="Daily Life / Lifestyle Factors" error={errors.lifestyle?.message}>
            <select
              {...register("lifestyle")}
              className="w-full rounded-2xl border border-[#E8E1D5] bg-[#FAF8F5] px-4.5 py-3.5 text-sm font-light text-[#1F2C25] outline-none transition-all duration-300 focus:border-[#C5A059] focus:bg-white focus:ring-2 focus:ring-[#C5A059]/20"
            >
              <option value="">Primary Lifestyle Sensitivity (Optional)</option>
              <option value="High Work/Mental Stress">High Mental/Work Stress</option>
              <option value="Disrupted Sleep / Insomnia">Disrupted Sleep / Insomnia</option>
              <option value="Chilly / Sensitive to Cold Weather">Sensitive to Cold Air / Weather</option>
              <option value="Warm / Sensitive to Heat">Sensitive to Heat / Sun</option>
              <option value="Irregular Diet / Sedentary Routine">Irregular Diet / Sedentary Work</option>
            </select>
          </Field>

          {/* Preferred Date & Slot */}
          <div className="grid gap-3.5 sm:grid-cols-2">
            <Field label="Preferred Date *" error={errors.date?.message}>
              <input
                type="date"
                min={minDate}
                {...dateField}
                className="w-full rounded-2xl border border-[#E8E1D5] bg-[#FAF8F5] px-4.5 py-3.5 text-sm font-light text-[#1F2C25] outline-none transition-all duration-300 focus:border-[#C5A059] focus:bg-white focus:ring-2 focus:ring-[#C5A059]/20"
              />
            </Field>

            <Field label="Preferred Time *" error={errors.time?.message}>
              <select
                {...register("time")}
                disabled={!selectedDate}
                className="w-full rounded-2xl border border-[#E8E1D5] bg-[#FAF8F5] px-4.5 py-3.5 text-sm font-light text-[#1F2C25] outline-none transition-all duration-300 focus:border-[#C5A059] focus:bg-white focus:ring-2 focus:ring-[#C5A059]/20 disabled:opacity-60"
                defaultValue=""
              >
                <option value="" disabled>
                  {selectedDate ? "Select time slot" : "Pick date first"}
                </option>
                {availableSlots.map((slot) => (
                  <option key={slot} value={slot}>
                    {slot}
                  </option>
                ))}
              </select>
            </Field>
          </div>

          {/* Health Concern Field */}
          <Controller
            name="concern"
            control={control}
            render={({ field, fieldState }) => (
              <Field label={dynamicFieldLabel} error={fieldState.error?.message}>
                <textarea
                  rows={4}
                  {...field}
                  onChange={(e) => {
                    const val = e.target.value.slice(0, 1000);
                    field.onChange(val);
                  }}
                  className="w-full resize-none rounded-2xl border border-[#E8E1D5] bg-[#FAF8F5] px-4.5 py-3.5 text-sm font-light text-[#1F2C25] outline-none transition-all duration-300 focus:border-[#C5A059] focus:bg-white focus:ring-2 focus:ring-[#C5A059]/20 font-sans leading-relaxed"
                  placeholder={dynamicPlaceholder}
                />
              </Field>
            )}
          />

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex items-center justify-center gap-2.5 rounded-full bg-[#2C4036] px-8 py-4 text-xs font-light tracking-widest text-[#FAF8F5] uppercase shadow-md transition-all duration-500 hover:bg-[#1F2C25] hover:shadow-xl disabled:opacity-50 cursor-pointer"
          >
            {isSubmitting ? (
              <Loader2 className="h-4 w-4 animate-spin text-[#C5A059]" />
            ) : (
              <ClipboardList className="h-4 w-4 text-[#C5A059]" />
            )}
            <span>{isSubmitting ? "Submitting..." : "Submit Consultation Request"}</span>
          </button>

          {submitError && (
            <p className="text-center text-xs text-red-600 font-light">{submitError}</p>
          )}

          <p className="flex items-center justify-center gap-1.5 text-center text-[11px] font-light text-[#7A8A80] pt-1">
            <ShieldCheck className="h-4 w-4 text-[#C5A059] shrink-0" />
            100% Private & Confidential. Dr. Sheetal's team will contact you to confirm timing.
          </p>
        </div>
      </form>

      <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <DialogContent className="sm:max-w-md bg-[#FAF8F5] rounded-3xl p-6 border border-[#E8E1D5]">
          <DialogHeader className="items-center text-center">
            <CheckCircle2 className="h-12 w-12 text-[#2C4036]" />
            <DialogTitle className="font-serif text-2xl font-normal text-[#1F2C25]">Consultation Request Sent!</DialogTitle>
            <DialogDescription className="text-sm font-light leading-relaxed text-[#5C6B62] mt-2">
              Thank you, <strong className="text-[#1F2C25] font-normal">{confirmedName}</strong>! Your consultation request has been received with your case profile. We will call/message you shortly to confirm your consultation timing.
            </DialogDescription>
          </DialogHeader>
          <button
            className="mt-4 w-full rounded-full bg-[#2C4036] py-3 text-xs font-light tracking-widest text-[#FAF8F5] uppercase transition-colors hover:bg-[#1F2C25]"
            onClick={() => setShowConfirmation(false)}
          >
            Done
          </button>
        </DialogContent>
      </Dialog>
    </>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block space-y-1.5">
      <span className="block text-xs font-medium tracking-wide text-[#1F2C25]">
        {label}
      </span>
      {children}
      {error && <span className="block text-xs text-red-600 font-light">{error}</span>}
    </label>
  );
}
