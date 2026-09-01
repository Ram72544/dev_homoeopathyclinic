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
import { ModernDatePicker } from "@/components/ui/modern-date-picker";

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

function parseDateSafely(dateStr: string): Date | null {
  if (!dateStr) return null;
  // Check if standard ISO YYYY-MM-DD
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
    const [y, m, d] = dateStr.split("-").map(Number);
    return new Date(y, m - 1, d);
  }
  // Check if DD/MM/YYYY or DD-MM-YYYY
  const parts = dateStr.split(/[-/]/);
  if (parts.length === 3) {
    if (parts[0].length === 4) {
      return new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
    }
    return new Date(Number(parts[2]), Number(parts[1]) - 1, Number(parts[0]));
  }
  const d = new Date(dateStr);
  return isNaN(d.getTime()) ? null : d;
}

function getSlotsForDate(dateStr: string): string[] {
  if (!dateStr) return [];
  const dateObj = parseDateSafely(dateStr);
  if (!dateObj) return [...MORNING_SLOTS, ...EVENING_SLOTS];

  const day = dateObj.getDay();
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
  if (!dateStr) return "";
  const dateObj = parseDateSafely(dateStr);
  if (!dateObj) return dateStr;
  return dateObj.toLocaleDateString("en-IN", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export function AppointmentForm() {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmedDetails, setConfirmedDetails] = useState<{
    name: string;
    phone: string;
    diseaseCategory: string;
    slot: string;
    concern?: string;
  } | null>(null);
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

  async function onSubmit(values: AppointmentFormValues) {
    setSubmitError("");
    try {
      const slot = `${formatDateLabel(values.date)} · ${values.time}`;
      const response = await fetch("/api/book-appointment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: values.name.trim(),
          phone: values.phone.trim(),
          slot,
          concern: values.concern?.trim() || `Consultation request for ${values.diseaseCategory || "General Health"}`,
          diseaseCategory: values.diseaseCategory || "General Health Consultation",
        }),
      });

      let data: { ok?: boolean; error?: string } = {};
      try {
        data = await response.json();
      } catch {
        // Fallback if non-JSON response
      }

      if (!response.ok || !data.ok) {
        throw new Error(data.error || "Unable to submit your request right now. Please try again or contact the clinic directly.");
      }

      setConfirmedDetails({
        name: values.name.trim(),
        phone: values.phone.trim(),
        diseaseCategory: values.diseaseCategory || "General Health Consultation",
        slot,
        concern: values.concern?.trim(),
      });
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
        className="scroll-mt-36 rounded-[2.5rem] border border-white/90 dark:border-[#C5A059]/35 bg-white/85 dark:bg-[#0E1310]/90 p-6 sm:p-8 lg:p-9 shadow-[0_20px_60px_-15px_rgba(20,34,27,0.06),0_1px_2px_rgba(255,255,255,0.9)_inset] dark:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.6)] backdrop-blur-2xl [transform:translate3d(0,0,0)] [backface-visibility:hidden] bg-clip-padding"
      >
        {/* Fast & Reassuring Header */}
        <div className="flex items-center justify-between border-b border-[#EAE3DA]/80 dark:border-[#C5A059]/20 pb-5 mb-6">
          <div className="flex items-center gap-3.5">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/40 dark:border-[#C5A059]/30 bg-gradient-to-br from-[#1A3828] to-[#0D1E16] text-[#E5C583] shadow-[inset_0_1px_2px_rgba(255,255,255,0.4)] backdrop-blur-md shrink-0">
              <HeartPulse className="h-5 w-5" />
            </div>
            <div>
              <span className="text-[10px] font-semibold tracking-[0.2em] text-[#967531] dark:text-[#E5C583] uppercase block">
                Quick 30-Second Booking
              </span>
              <h3 className="font-serif text-2xl sm:text-[1.75rem] font-normal text-[#14221B] dark:text-[#FAF8F5] mt-0.5 tracking-tight">
                Request a Consultation
              </h3>
            </div>
          </div>
          <div className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-[#0E7C7B]/20 dark:border-[#C5A059]/40 bg-[#0E7C7B]/8 dark:bg-[#C5A059]/10 px-3.5 py-1.5 text-[11px] font-medium text-[#0E7C7B] dark:text-[#E5C583] shadow-2xs">
            <Sparkles className="h-3 w-3 text-[#C5A059]" />
            <span>Direct Doctor Visit</span>
          </div>
        </div>

        <div className="space-y-4 sm:space-y-4.5">
          {/* Field 1: Health Issue / Specialization */}
          <Field label="Health Concern / Treatment Needed" icon={<Stethoscope className="h-3.5 w-3.5 text-[#0E7C7B] dark:text-[#E5C583]" />}>
            <div className="relative group">
              <select
                {...register("diseaseCategory")}
                className="w-full appearance-none rounded-2xl border border-[#E8E1D5] dark:border-[#C5A059]/30 bg-[#FAF8F5]/85 dark:bg-[#141A16] pl-4 pr-11 py-3.5 text-sm font-light text-[#14221B] dark:text-[#FAF8F5] outline-none transition-all duration-300 hover:border-[#D5CCBE] dark:hover:border-[#E5C583]/60 focus:border-[#0E7C7B] dark:focus:border-[#E5C583] focus:bg-white dark:focus:bg-[#1C2420] focus:ring-4 focus:ring-[#C5A059]/10 shadow-[inset_0_1px_2px_rgba(0,0,0,0.02)] min-h-[48px] cursor-pointer"
              >
                <option value="">Select Condition (e.g. Skin, Asthma, PCOS/PCOD, Joints)</option>
                {site.services.map((s) => (
                  <option key={s.id} value={s.title}>
                    {s.title}
                  </option>
                ))}
                <option value="General Consultation">General / Other Health Issue</option>
              </select>
              <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#7A8A80] dark:text-[#E5C583] transition-transform duration-200 group-hover:text-[#14221B] dark:group-hover:text-[#FAF8F5]">
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
                  icon={<User className="h-3.5 w-3.5 text-[#0E7C7B] dark:text-[#E5C583]" />}
                  error={fieldState.error?.message}
                >
                  <input
                    id="appointment-name-input"
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
                    className="w-full rounded-2xl border border-[#E8E1D5] dark:border-[#C5A059]/30 bg-[#FAF8F5]/85 dark:bg-[#141A16] px-4 py-3.5 text-sm font-light text-[#14221B] dark:text-[#FAF8F5] outline-none transition-all duration-300 hover:border-[#D5CCBE] dark:hover:border-[#E5C583]/60 focus:border-[#0E7C7B] dark:focus:border-[#E5C583] focus:bg-white dark:focus:bg-[#1C2420] focus:ring-4 focus:ring-[#C5A059]/10 shadow-[inset_0_1px_2px_rgba(0,0,0,0.02)] min-h-[48px]"
                    placeholder="Enter your full name"
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
                  icon={<Phone className="h-3.5 w-3.5 text-[#0E7C7B] dark:text-[#E5C583]" />}
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
                    className="w-full rounded-2xl border border-[#E8E1D5] dark:border-[#C5A059]/30 bg-[#FAF8F5]/85 dark:bg-[#141A16] px-4 py-3.5 text-sm font-light text-[#14221B] dark:text-[#FAF8F5] outline-none transition-all duration-300 hover:border-[#D5CCBE] dark:hover:border-[#E5C583]/60 focus:border-[#0E7C7B] dark:focus:border-[#E5C583] focus:bg-white dark:focus:bg-[#1C2420] focus:ring-4 focus:ring-[#C5A059]/10 shadow-[inset_0_1px_2px_rgba(0,0,0,0.02)] min-h-[48px]"
                    placeholder="10-digit mobile number"
                  />
                </Field>
              )}
            />
          </div>

          {/* Field 4: Preferred Date & Slot */}
          <div className="grid gap-3.5 sm:grid-cols-2">
            <Controller
              name="date"
              control={control}
              render={({ field, fieldState }) => (
                <Field
                  label="Preferred Date *"
                  icon={<Calendar className="h-3.5 w-3.5 text-[#0E7C7B] dark:text-[#E5C583]" />}
                  error={fieldState.error?.message}
                >
                  <ModernDatePicker
                    value={field.value}
                    onChange={(val) => {
                      field.onChange(val);
                      setSelectedDate(val);
                      setValue("time", "", { shouldValidate: false });
                    }}
                    minDate={minDate}
                    error={fieldState.error?.message}
                  />
                </Field>
              )}
            />

            <Field label="Preferred Time Slot *" error={errors.time?.message}>
              <div className="relative group">
                <select
                  {...register("time")}
                  disabled={!selectedDate}
                  className="w-full appearance-none rounded-2xl border border-[#E8E1D5] dark:border-[#C5A059]/30 bg-[#FAF8F5]/85 dark:bg-[#141A16] pl-4 pr-11 py-3.5 text-sm font-light text-[#14221B] dark:text-[#FAF8F5] outline-none transition-all duration-300 hover:border-[#D5CCBE] dark:hover:border-[#E5C583]/60 focus:border-[#0E7C7B] dark:focus:border-[#E5C583] focus:bg-white dark:focus:bg-[#1C2420] focus:ring-4 focus:ring-[#C5A059]/10 shadow-[inset_0_1px_2px_rgba(0,0,0,0.02)] disabled:opacity-50 min-h-[48px] cursor-pointer"
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
                <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#7A8A80] dark:text-[#E5C583] transition-transform duration-200 group-hover:text-[#14221B] dark:group-hover:text-[#FAF8F5]">
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
                className="inline-flex items-center gap-1.5 text-xs font-medium text-[#0E7C7B] dark:text-[#E5C583] hover:text-[#14221B] dark:hover:text-[#FAF8F5] transition-colors py-1 cursor-pointer group"
              >
                <span className="group-hover:underline underline-offset-2">+ Add symptoms or health note (optional)</span>
                <ChevronDown className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-y-0.5" />
              </button>
            ) : (
              <div className="space-y-2 pt-1 animate-in fade-in duration-200">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-[#14221B] dark:text-[#FAF8F5]">
                    Brief Symptoms / Notes (Optional)
                  </span>
                  <button
                    type="button"
                    onClick={() => setShowOptionalNotes(false)}
                    className="text-[11px] text-[#7A8A80] dark:text-[#A3ACA7] hover:text-[#14221B] dark:hover:text-[#FAF8F5] flex items-center gap-1 cursor-pointer"
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
                      className="w-full resize-none rounded-2xl border border-[#E8E1D5] dark:border-[#C5A059]/30 bg-[#FAF8F5]/90 dark:bg-[#141A16] px-4 py-3 text-sm font-light text-[#14221B] dark:text-[#FAF8F5] outline-none transition-all duration-300 hover:border-[#D5CCBE] dark:hover:border-[#E5C583]/60 focus:border-[#0E7C7B] dark:focus:border-[#E5C583] focus:bg-white dark:focus:bg-[#1C2420] focus:ring-4 focus:ring-[#C5A059]/10 shadow-[inset_0_1px_2px_rgba(0,0,0,0.02)] font-sans leading-relaxed"
                      placeholder={dynamicPlaceholder}
                    />
                  )}
                />
              </div>
            )}
          </div>

          {/* Harmonized Cohesive Action CTA Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full relative overflow-hidden flex items-center justify-center gap-2.5 rounded-full bg-[#14221B] dark:bg-[#18201C] border border-[#14221B] dark:border-[#C5A059]/45 px-8 py-4 text-xs sm:text-sm font-medium tracking-[0.14em] text-[#FAF8F5] uppercase shadow-md transition-all duration-300 hover:bg-[#0E7C7B] dark:hover:bg-[#222C27] dark:hover:border-[#E5C583] hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 cursor-pointer min-h-[52px] mt-3"
          >
            {isSubmitting ? (
              <Loader2 className="h-4 w-4 animate-spin text-[#E5C583]" />
            ) : (
              <CheckCircle2 className="h-4 w-4 text-[#E5C583]" />
            )}
            <span>{isSubmitting ? "Confirming..." : "Confirm Consultation Request"}</span>
          </button>

          {submitError && (
            <p className="text-center text-xs text-red-600 dark:text-red-400 font-light">{submitError}</p>
          )}

          <p className="flex items-center justify-center gap-1.5 text-center text-[11px] font-light text-[#7A8A80] dark:text-[#A3ACA7] pt-1">
            <ShieldCheck className="h-4 w-4 text-[#C5A059] shrink-0" />
            100% Confidential • Dr. Sheetal&apos;s clinic will call/message to confirm.
          </p>
        </div>
      </form>

      <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <DialogContent className="sm:max-w-lg bg-[#FAF8F5] dark:bg-[#0E1310] rounded-[2.25rem] p-6 sm:p-8 border border-[#E8E1D5] dark:border-[#C5A059]/35 shadow-2xl text-[#14221B] dark:text-[#FAF8F5]">
          <DialogHeader className="items-center text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#1A3828] to-[#0D1E16] text-[#E5C583] border border-[#C5A059]/30 mb-3 shadow-md">
              <CheckCircle2 className="h-7 w-7 text-[#E5C583]" />
            </div>
            <DialogTitle className="font-serif text-2xl sm:text-3xl font-normal text-[#14221B] dark:text-[#FAF8F5]">
              Consultation Request Received!
            </DialogTitle>
            <DialogDescription className="text-xs sm:text-sm font-light leading-relaxed text-[#4A5D52] dark:text-[#A3ACA7] mt-1.5 max-w-sm">
              Thank you, <strong className="text-[#14221B] dark:text-[#FAF8F5] font-medium">{confirmedDetails?.name}</strong>. Your consultation details have been sent to Dr. Sheetal&apos;s clinic.
            </DialogDescription>
          </DialogHeader>

          {/* Consultation Summary Breakdown */}
          {confirmedDetails && (
            <div className="mt-4 rounded-2xl border border-[#E8E1D5] dark:border-[#C5A059]/25 bg-white dark:bg-[#141A16] p-4.5 space-y-2.5 text-xs text-[#14221B] dark:text-[#FAF8F5] shadow-xs">
              <div className="flex items-center justify-between border-b border-[#EAE3DA]/80 dark:border-[#C5A059]/15 pb-2">
                <span className="text-[#7A8A80] dark:text-[#A3ACA7] font-light">Patient Name</span>
                <span className="font-medium">{confirmedDetails.name}</span>
              </div>
              <div className="flex items-center justify-between border-b border-[#EAE3DA]/80 dark:border-[#C5A059]/15 pb-2">
                <span className="text-[#7A8A80] dark:text-[#A3ACA7] font-light">Health Concern</span>
                <span className="font-medium text-[#0E7C7B] dark:text-[#E5C583]">{confirmedDetails.diseaseCategory}</span>
              </div>
              <div className="flex items-center justify-between border-b border-[#EAE3DA]/80 dark:border-[#C5A059]/15 pb-2">
                <span className="text-[#7A8A80] dark:text-[#A3ACA7] font-light">Selected Slot</span>
                <span className="font-medium">{confirmedDetails.slot}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#7A8A80] dark:text-[#A3ACA7] font-light">Mobile / WhatsApp</span>
                <span className="font-medium">{confirmedDetails.phone}</span>
              </div>
              {confirmedDetails.concern && (
                <div className="border-t border-[#EAE3DA]/80 dark:border-[#C5A059]/15 pt-2">
                  <span className="text-[#7A8A80] dark:text-[#A3ACA7] font-light block mb-0.5">Symptoms / Notes</span>
                  <p className="font-light text-[#4A5D52] dark:text-[#A3ACA7] italic line-clamp-2">
                    &ldquo;{confirmedDetails.concern}&rdquo;
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Action Button */}
          <div className="mt-5">
            <button
              type="button"
              className="w-full rounded-full bg-[#14221B] dark:bg-[#18201C] border border-[#14221B] dark:border-[#C5A059]/45 py-3.5 text-xs font-medium tracking-widest text-[#FAF8F5] uppercase shadow-md transition-all hover:bg-[#0E7C7B] dark:hover:bg-[#222C27] dark:hover:border-[#E5C583] hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
              onClick={() => setShowConfirmation(false)}
            >
              Done
            </button>
          </div>
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
      <span className="flex items-center gap-1.5 text-xs font-medium tracking-wide text-[#14221B] dark:text-[#FAF8F5]">
        {icon}
        {label}
      </span>
      {children}
      {error && <span className="block text-xs text-red-600 dark:text-red-400 font-light">{error}</span>}
    </label>
  );
}
