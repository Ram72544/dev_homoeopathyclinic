"use client";

import { useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle2, Loader2, Sparkles, ShieldCheck, HeartPulse, ClipboardList } from "lucide-react";
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
  concern: z
    .string()
    .trim()
    .min(1, "Please briefly mention your health issue")
    .refine(
      (val) => val.trim().split(/\s+/).length <= 300,
      "Please keep under 300 words"
    ),
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
    formState: { errors, isSubmitting },
  } = useForm<AppointmentFormValues>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: { name: "", phone: "", date: "", time: "", concern: "" },
  });

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
        <div className="flex items-center gap-3.5 border-b border-[#F0EADF]/80 pb-4 mb-4">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/35 bg-gradient-to-br from-[#2A4034] to-[#1F2C25] text-[#E5C583] shadow-[inset_0_1px_2px_rgba(255,255,255,0.4)] backdrop-blur-md">
            <HeartPulse className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-serif text-xl font-normal text-[#1F2C25]">Request a Consultation</h3>
            <p className="text-xs font-light text-[#7A8A80] mt-0.5">Our medical team will review your case & confirm timing</p>
          </div>
        </div>

        <div className="space-y-3.5">
          <Controller
            name="name"
            control={control}
            render={({ field, fieldState }) => (
              <Field label="Your Full Name" error={fieldState.error?.message}>
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
                  placeholder="Enter your full name"
                />
              </Field>
            )}
          />

          <Controller
            name="phone"
            control={control}
            render={({ field, fieldState }) => (
              <Field label="Mobile / WhatsApp Number" error={fieldState.error?.message}>
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
                  placeholder="10-digit phone number"
                />
              </Field>
            )}
          />

          <div className="grid gap-3.5 sm:grid-cols-2">
            <Field label="Preferred Date" error={errors.date?.message}>
              <input
                type="date"
                min={minDate}
                {...dateField}
                className="w-full rounded-2xl border border-[#E8E1D5] bg-[#FAF8F5] px-4.5 py-3.5 text-sm font-light text-[#1F2C25] outline-none transition-all duration-300 focus:border-[#C5A059] focus:bg-white focus:ring-2 focus:ring-[#C5A059]/20"
              />
            </Field>

            <Field label="Preferred Time" error={errors.time?.message}>
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

          <Controller
            name="concern"
            control={control}
            render={({ field, fieldState }) => (
              <Field label="Health Concern or Symptoms" error={fieldState.error?.message}>
                <textarea
                  rows={3}
                  {...field}
                  onChange={(e) => {
                    const match = e.target.value.match(/(\S+\s*){0,300}/);
                    field.onChange(match ? match[0] : "");
                  }}
                  className="w-full resize-none rounded-2xl border border-[#E8E1D5] bg-[#FAF8F5] px-4.5 py-3.5 text-sm font-light text-[#1F2C25] outline-none transition-all duration-300 focus:border-[#C5A059] focus:bg-white focus:ring-2 focus:ring-[#C5A059]/20"
                  placeholder="Describe your health problem (e.g. skin allergy, acidity, cough, fever...)"
                />
              </Field>
            )}
          />

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex items-center justify-center gap-2.5 rounded-full bg-[#2C4036] px-8 py-4 text-xs font-light tracking-widest text-[#FAF8F5] uppercase shadow-md transition-all duration-500 hover:bg-[#1F2C25] hover:shadow-xl disabled:opacity-50"
          >
            {isSubmitting ? (
              <Loader2 className="h-4 w-4 animate-spin text-[#C5A059]" />
            ) : (
              <ClipboardList className="h-4 w-4 text-[#C5A059]" />
            )}
            <span>{isSubmitting ? "Submitting..." : "Request Doctor Consultation"}</span>
          </button>

          {submitError && (
            <p className="text-center text-xs text-red-600 font-light">{submitError}</p>
          )}

          <p className="flex items-center justify-center gap-1.5 text-center text-[11px] font-light text-[#7A8A80] pt-1">
            <ShieldCheck className="h-4 w-4 text-[#C5A059] shrink-0" />
            100% Private & Confidential. Our team will contact you to confirm timing.
          </p>
        </div>
      </form>

      <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <DialogContent className="sm:max-w-md bg-[#FAF8F5] rounded-3xl p-6 border border-[#E8E1D5]">
          <DialogHeader className="items-center text-center">
            <CheckCircle2 className="h-12 w-12 text-[#2C4036]" />
            <DialogTitle className="font-serif text-2xl font-normal text-[#1F2C25]">Consultation Request Sent!</DialogTitle>
            <DialogDescription className="text-sm font-light leading-relaxed text-[#5C6B62] mt-2">
              Thank you, <strong className="text-[#1F2C25] font-normal">{confirmedName}</strong>! Your consultation request has been received. We will call/message you shortly to confirm your consultation timing.
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
