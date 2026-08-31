"use client";

import { useMemo, useState, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle2, Loader2, ShieldCheck, HeartPulse, Sparkles, ChevronDown, ChevronUp, Calendar, Phone, User, Stethoscope } from "lucide-react";
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
    .min(1, "Please enter your full name")
    .max(50, "Name is too long")
    .regex(/^[A-Za-z\s'-]+$/, "Only letters and spaces allowed"),
  phone: z
    .string()
    .trim()
    .regex(/^\d{10}$/, "Enter a valid 10-digit mobile number"),
  date: z.string().trim().min(1, "Please select a date"),
  time: z.string().trim().min(1, "Please select a time slot"),
  diseaseCategory: z.string().trim().optional(),
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

const SUNDAY_EVENING_SLOTS = [
  "6:00 PM – 7:00 PM (Prior Appointment Only)",
  "7:00 PM – 8:00 PM (Prior Appointment Only)",
  "8:00 PM – 9:00 PM (Prior Appointment Only)",
];

function getSlotsForDate(dateStr: string): string[] {
  if (!dateStr) return [];
  const day = new Date(`${dateStr}T00:00:00`).getDay();
  // 0: Sunday, 1: Monday, 2: Tuesday, 3: Wednesday, 4: Thursday, 5: Friday, 6: Saturday
  if (day === 2) {
    // Tuesday is Clinic Off
    return [];
  }
  if (day === 0) {
    // Sunday: Morning OPD + Evening Prior Appt Only
    return [...MORNING_SLOTS, ...SUNDAY_EVENING_SLOTS];
  }
  return [...MORNING_SLOTS, ...EVENING_SLOTS];
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
  const [showOptionalNotes, setShowOptionalNotes] = useState(false);
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
      concern: "",
    },
  });

  const selectedCategory = watch("diseaseCategory");

  const currentService = useMemo(() => {
    return site.services.find((s) => s.title === selectedCategory);
  }, [selectedCategory]);

  const dynamicPlaceholder = useMemo(() => {
    if (currentService?.caseQuestions) {
      return currentService.caseQuestions;
    }
    return "Any specific symptoms, duration, or previous treatments you'd like Dr. Sheetal to know beforehand (optional)...";
  }, [currentService]);

  // Listen for prefill event from DiseaseModal
  useEffect(() => {
    function handlePrefill(e: Event) {
      const detail = (
        e as CustomEvent<{
          diseaseTitle: string;
          initialNotes?: string;
        }>
      ).detail;
      if (detail) {
        if (detail.diseaseTitle) {
          setValue("diseaseCategory", detail.diseaseTitle, { shouldValidate: true });
        }
        if (detail.initialNotes) {
          setValue("concern", detail.initialNotes, { shouldValidate: true });
          setShowOptionalNotes(true);
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
          concern: values.concern || `Consultation request for ${values.diseaseCategory || "General Health"}`,
          diseaseCategory: values.diseaseCategory,
        }),
      });
      const data = (await response.json()) as { ok?: boolean; error?: string };

      if (!response.ok || !data.ok) {
        throw new Error(data.error || "Failed to send consultation request");
      }

      setConfirmedName(values.name);
      setShowConfirmation(true);
      reset();
      setShowOptionalNotes(false);
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
        className="scroll-mt-36 rounded-[2.5rem] border border-white/90 bg-white/85 p-6 sm:p-8 lg:p-9 shadow-[0_20px_60px_-15px_rgba(20,34,27,0.06),0_1px_2px_rgba(255,255,255,0.9)_inset] backdrop-blur-2xl [transform:translate3d(0,0,0)] [backface-visibility:hidden] bg-clip-padding"
      >
        {/* Fast & Reassuring Header */}
        <div className="flex items-center justify-between border-b border-[#EAE3DA]/80 pb-5 mb-6">
          <div className="flex items-center gap-3.5">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/40 bg-gradient-to-br from-[#1A3828] to-[#0D1E16] text-[#E5C583] shadow-[inset_0_1px_2px_rgba(255,255,255,0.4)] backdrop-blur-md shrink-0">
              <HeartPulse className="h-5 w-5" />
            </div>
            <div>
              <span className="text-[10px] font-semibold tracking-[0.2em] text-[#967531] uppercase block">
                Quick 30-Second Booking
              </span>
              <h3 className="font-serif text-2xl sm:text-[1.75rem] font-normal text-[#14221B] mt-0.5 tracking-tight">
                Request a Consultation
              </h3>
            </div>
          </div>
          <div className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-[#0E7C7B]/20 bg-[#0E7C7B]/8 px-3.5 py-1.5 text-[11px] font-medium text-[#0E7C7B] shadow-2xs">
            <Sparkles className="h-3 w-3 text-[#C5A059]" />
            <span>Direct Doctor Visit</span>
          </div>
        </div>

        <div className="space-y-4 sm:space-y-4.5">
          {/* Field 1: Health Issue / Specialization */}
          <Field label="Health Concern / Treatment Needed" icon={<Stethoscope className="h-3.5 w-3.5 text-[#0E7C7B]" />}>
            <div className="relative group">
              <select
                {...register("diseaseCategory")}
                className="w-full appearance-none rounded-2xl border border-[#E8E1D5] bg-[#FAF8F5]/85 pl-4 pr-11 py-3.5 text-sm font-light text-[#14221B] outline-none transition-all duration-300 hover:border-[#D5CCBE] focus:border-[#0E7C7B] focus:bg-white focus:ring-4 focus:ring-[#0E7C7B]/10 shadow-[inset_0_1px_2px_rgba(0,0,0,0.02)] min-h-[48px] cursor-pointer"
              >
                <option value="">-- Select Condition (e.g. Skin, Asthma, PCOS/PCOD, Joints) --</option>
                {site.services.map((s) => (
                  <option key={s.id} value={s.title}>
                    {s.title}
                  </option>
                ))}
                <option value="General Consultation">General / Other Health Issue</option>
              </select>
              <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#7A8A80] transition-transform duration-200 group-hover:text-[#14221B]">
                <ChevronDown className="h-4 w-4" />
              </div>
            </div>
          </Field>

          {/* Fields 2 & 3: Name & Phone */}
          <div className="grid gap-3.5 sm:grid-cols-2">
            <Controller
              name="name"
              control={control}
              render={({ field, fieldState }) => (
                <Field
                  label="Your Full Name *"
                  icon={<User className="h-3.5 w-3.5 text-[#0E7C7B]" />}
                  error={fieldState.error?.message}
                >
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
                    className="w-full rounded-2xl border border-[#E8E1D5] bg-[#FAF8F5]/85 px-4 py-3.5 text-sm font-light text-[#14221B] outline-none transition-all duration-300 hover:border-[#D5CCBE] focus:border-[#0E7C7B] focus:bg-white focus:ring-4 focus:ring-[#0E7C7B]/10 shadow-[inset_0_1px_2px_rgba(0,0,0,0.02)] min-h-[48px]"
                    placeholder="e.g. Rahul Sharma"
                  />
                </Field>
              )}
            />

            <Controller
              name="phone"
              control={control}
              render={({ field, fieldState }) => (
                <Field
                  label="Mobile / WhatsApp Number *"
                  icon={<Phone className="h-3.5 w-3.5 text-[#0E7C7B]" />}
                  error={fieldState.error?.message}
                >
                  <input
                    type="tel"
                    inputMode="numeric"
                    maxLength={10}
                    {...field}
                    onChange={(e) => {
                      const digits = e.target.value.replace(/\D/g, "").slice(0, 10);
                      field.onChange(digits);
                    }}
                    className="w-full rounded-2xl border border-[#E8E1D5] bg-[#FAF8F5]/85 px-4 py-3.5 text-sm font-light text-[#14221B] outline-none transition-all duration-300 hover:border-[#D5CCBE] focus:border-[#0E7C7B] focus:bg-white focus:ring-4 focus:ring-[#0E7C7B]/10 shadow-[inset_0_1px_2px_rgba(0,0,0,0.02)] min-h-[48px]"
                    placeholder="10-digit mobile number"
                  />
                </Field>
              )}
            />
          </div>

          {/* Field 4: Preferred Date & Slot */}
          <div className="grid gap-3.5 sm:grid-cols-2">
            <Field
              label="Preferred Date *"
              icon={<Calendar className="h-3.5 w-3.5 text-[#0E7C7B]" />}
              error={errors.date?.message}
            >
              <input
                type="date"
                min={minDate}
                {...dateField}
                className="w-full rounded-2xl border border-[#E8E1D5] bg-[#FAF8F5]/85 px-4 py-3.5 text-sm font-light text-[#14221B] outline-none transition-all duration-300 hover:border-[#D5CCBE] focus:border-[#0E7C7B] focus:bg-white focus:ring-4 focus:ring-[#0E7C7B]/10 shadow-[inset_0_1px_2px_rgba(0,0,0,0.02)] min-h-[48px] cursor-pointer"
              />
            </Field>

            <Field label="Preferred Time Slot *" error={errors.time?.message}>
              <div className="relative group">
                <select
                  {...register("time")}
                  disabled={!selectedDate}
                  className="w-full appearance-none rounded-2xl border border-[#E8E1D5] bg-[#FAF8F5]/85 pl-4 pr-11 py-3.5 text-sm font-light text-[#14221B] outline-none transition-all duration-300 hover:border-[#D5CCBE] focus:border-[#0E7C7B] focus:bg-white focus:ring-4 focus:ring-[#0E7C7B]/10 shadow-[inset_0_1px_2px_rgba(0,0,0,0.02)] disabled:opacity-50 min-h-[48px] cursor-pointer"
                  defaultValue=""
                >
                  <option value="" disabled>
                    {!selectedDate
                      ? "Pick date first"
                      : availableSlots.length === 0
                      ? "Tuesday is Weekly Off (Clinic Closed)"
                      : "Select convenient slot"}
                  </option>
                  {availableSlots.map((slot) => (
                    <option key={slot} value={slot}>
                      {slot}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#7A8A80] transition-transform duration-200 group-hover:text-[#14221B]">
                  <ChevronDown className="h-4 w-4" />
                </div>
              </div>
            </Field>
          </div>

          {/* Optional Note Accordion / Toggle */}
          <div className="pt-1">
            {!showOptionalNotes ? (
              <button
                type="button"
                onClick={() => setShowOptionalNotes(true)}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-[#0E7C7B] hover:text-[#14221B] transition-colors py-1 cursor-pointer group"
              >
                <span className="group-hover:underline underline-offset-2">+ Add symptoms or health note (optional)</span>
                <ChevronDown className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-y-0.5" />
              </button>
            ) : (
              <div className="space-y-2 pt-1 animate-in fade-in duration-200">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-[#14221B]">
                    Brief Symptoms / Notes (Optional)
                  </span>
                  <button
                    type="button"
                    onClick={() => setShowOptionalNotes(false)}
                    className="text-[11px] text-[#7A8A80] hover:text-[#14221B] flex items-center gap-1 cursor-pointer"
                  >
                    <span>Hide note</span>
                    <ChevronUp className="h-3 w-3" />
                  </button>
                </div>
                <Controller
                  name="concern"
                  control={control}
                  render={({ field }) => (
                    <textarea
                      rows={3}
                      {...field}
                      onChange={(e) => {
                        const val = e.target.value.slice(0, 1000);
                        field.onChange(val);
                      }}
                      className="w-full resize-none rounded-2xl border border-[#E8E1D5] bg-[#FAF8F5]/90 px-4 py-3 text-sm font-light text-[#14221B] outline-none transition-all duration-300 hover:border-[#D5CCBE] focus:border-[#0E7C7B] focus:bg-white focus:ring-4 focus:ring-[#0E7C7B]/10 shadow-[inset_0_1px_2px_rgba(0,0,0,0.02)] font-sans leading-relaxed"
                      placeholder={dynamicPlaceholder}
                    />
                  )}
                />
              </div>
            )}
          </div>

          {/* 2026 Minimalist Luxury CTA */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full relative overflow-hidden flex items-center justify-center gap-2.5 rounded-full bg-gradient-to-b from-[#1A3828] to-[#0F2218] px-8 py-4 text-xs sm:text-sm font-medium tracking-[0.14em] text-[#FAF8F5] uppercase border-t border-white/20 shadow-[0_12px_32px_-8px_rgba(15,34,24,0.5)] transition-all duration-300 hover:scale-[1.01] hover:from-[#142C20] hover:to-[#0E7C7B] hover:shadow-[0_16px_36px_-6px_rgba(14,124,123,0.4)] active:scale-[0.99] disabled:opacity-50 cursor-pointer min-h-[52px] mt-3"
          >
            {isSubmitting ? (
              <Loader2 className="h-4 w-4 animate-spin text-[#E5C583]" />
            ) : (
              <CheckCircle2 className="h-4 w-4 text-[#E5C583]" />
            )}
            <span>{isSubmitting ? "Confirming..." : "Confirm Consultation Request"}</span>
          </button>

          {submitError && (
            <p className="text-center text-xs text-red-600 font-light">{submitError}</p>
          )}

          <p className="flex items-center justify-center gap-1.5 text-center text-[11px] font-light text-[#7A8A80] pt-1">
            <ShieldCheck className="h-4 w-4 text-[#C5A059] shrink-0" />
            100% Confidential • Dr. Sheetal&apos;s clinic will call/message to confirm.
          </p>
        </div>
      </form>

      <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <DialogContent className="sm:max-w-md bg-[#FAF8F5] rounded-3xl p-6 sm:p-8 border border-[#E8E1D5] shadow-2xl">
          <DialogHeader className="items-center text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#0E7C7B]/15 text-[#0E7C7B] mb-2">
              <CheckCircle2 className="h-8 w-8 text-[#0E7C7B]" />
            </div>
            <DialogTitle className="font-serif text-2xl font-normal text-[#14221B]">
              Consultation Request Received!
            </DialogTitle>
            <DialogDescription className="text-sm font-light leading-relaxed text-[#4A5D52] mt-2">
              Thank you, <strong className="text-[#14221B] font-medium">{confirmedName}</strong>! Your appointment request has been submitted. Our team will contact you shortly to confirm your consultation.
            </DialogDescription>
          </DialogHeader>
          <button
            className="mt-4 w-full rounded-full bg-[#14221B] py-3.5 text-xs font-medium tracking-widest text-[#FAF8F5] uppercase transition-colors hover:bg-[#0E7C7B] cursor-pointer"
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
  icon,
  error,
  children,
}: {
  label: string;
  icon?: React.ReactNode;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block space-y-1.5">
      <span className="flex items-center gap-1.5 text-xs font-medium tracking-wide text-[#14221B]">
        {icon}
        {label}
      </span>
      {children}
      {error && <span className="block text-xs text-red-600 font-light">{error}</span>}
    </label>
  );
}
