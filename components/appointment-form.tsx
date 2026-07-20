"use client";

import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle2, Loader2, Send, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
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
    .min(1, "Please enter the patient's full name")
    .max(50, "Name is too long")
    .regex(/^[A-Za-z\s'-]+$/, "Only letters, spaces, apostrophes and hyphens are allowed"),
  phone: z
    .string()
    .trim()
    .regex(/^\d{10}$/, "Enter a valid 10-digit phone number"),
  date: z.string().trim().min(1, "Please select a preferred date"),
  time: z.string().trim().min(1, "Please select a preferred time slot"),
  concern: z
    .string()
    .trim()
    .min(1, "Please briefly describe your concern")
    .max(500, "Please keep this under 500 characters"),
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

/** Sunday is by-appointment-only, morning slots only. Mon–Sat get both. */
function getSlotsForDate(dateStr: string): string[] {
  if (!dateStr) return [];
  const day = new Date(`${dateStr}T00:00:00`).getDay(); // 0 = Sunday
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
    trigger,
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
        throw new Error(data.error || "Failed to send your request");
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
        className="scroll-mt-24 rounded-2xl border border-beige bg-white p-7 shadow-sm"
      >
        <div className="space-y-5">
          {(() => {
            const nameField = register("name");
            return (
              <Field label="Patient's full name" error={errors.name?.message}>
                <input
                  type="text"
                  {...nameField}
                  onChange={(e) => {
                    nameField.onChange(e);
                    void trigger("name");
                  }}
                  className="w-full rounded-lg border border-beige bg-beige-soft px-4 py-3 outline-none focus:border-teal focus:ring-2 focus:ring-teal/20"
                  placeholder="Enter patient's full name"
                />
              </Field>
            );
          })()}

          <Field label="Phone number" error={errors.phone?.message}>
            <input
              type="tel"
              inputMode="numeric"
              maxLength={10}
              {...register("phone")}
              className="w-full rounded-lg border border-beige bg-beige-soft px-4 py-3 outline-none focus:border-teal focus:ring-2 focus:ring-teal/20"
              placeholder="Enter 10-digit mobile number"
            />
          </Field>

          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Preferred date" error={errors.date?.message}>
              <input
                type="date"
                min={minDate}
                {...dateField}
                className="w-full rounded-lg border border-beige bg-beige-soft px-4 py-3 outline-none focus:border-teal focus:ring-2 focus:ring-teal/20"
              />
            </Field>

            <Field label="Preferred time slot" error={errors.time?.message}>
              <select
                {...register("time")}
                disabled={!selectedDate}
                className="w-full rounded-lg border border-beige bg-beige-soft px-4 py-3 outline-none focus:border-teal focus:ring-2 focus:ring-teal/20 disabled:cursor-not-allowed disabled:opacity-60"
                defaultValue=""
              >
                <option value="" disabled>
                  {selectedDate ? "Select a slot" : "Pick a date first"}
                </option>
                {availableSlots.map((slot) => (
                  <option key={slot} value={slot}>
                    {slot}
                  </option>
                ))}
              </select>
            </Field>
          </div>
          {selectedDate && new Date(`${selectedDate}T00:00:00`).getDay() === 0 && (
            <p className="text-xs text-teal-dark/60">
              Sundays are by appointment only (morning slots).
            </p>
          )}

          <Field label="Brief concern" error={errors.concern?.message}>
            <textarea
              rows={4}
              {...register("concern")}
              className="w-full resize-none rounded-lg border border-beige bg-beige-soft px-4 py-3 outline-none focus:border-teal focus:ring-2 focus:ring-teal/20"
              placeholder="Briefly describe your concern..."
            />
          </Field>

          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <Send className="h-5 w-5" />
            )}
            {isSubmitting ? "Sending..." : "Book Appointment"}
          </Button>

          {submitError && (
            <p className="text-center text-sm text-red-600">{submitError}</p>
          )}

          <p className="flex items-start justify-center gap-1.5 text-center text-xs font-medium text-teal-dark/70">
            <ShieldCheck className="mt-0.5 h-4 w-4 flex-shrink-0 text-teal" />
            Your request goes straight to Dr. Sheetal&apos;s team — safe, private
            &amp; confirmed within hours.
          </p>
        </div>
      </form>

      <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <DialogContent>
          <DialogHeader className="items-center text-center">
            <CheckCircle2 className="h-12 w-12 text-teal" />
            <DialogTitle>Appointment request sent!</DialogTitle>
            <DialogDescription>
              Thank you, {confirmedName}! Your appointment request has been sent
              to Dr. Sheetal. Our team will review your requested time slot and
              call/message you shortly to confirm.
            </DialogDescription>
          </DialogHeader>
          <Button className="mt-4 w-full" onClick={() => setShowConfirmation(false)}>
            Got it
          </Button>
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
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-teal-dark">
        {label}
      </span>
      {children}
      {error && <span className="mt-1 block text-xs text-red-600">{error}</span>}
    </label>
  );
}
