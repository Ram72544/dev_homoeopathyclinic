import { NextResponse } from "next/server";
import { z } from "zod";

// NOTE (DPDP compliance): this route does NOT persist any patient data.
// It only validates the payload and relays a notification to Telegram.
// No filesystem/database writes happen here.

const appointmentSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Name is required")
    .max(50, "Name is too long")
    .regex(/^[A-Za-z\s'-]+$/, "Only letters, spaces, apostrophes and hyphens are allowed"),
  phone: z
    .string()
    .trim()
    .regex(/^\d{10}$/, "Enter a valid 10-digit phone number"),
  slot: z
    .string()
    .trim()
    .min(1, "Please select a preferred date & time slot"),
  concern: z
    .string()
    .trim()
    .max(1000, "Concern is too long")
    .optional()
    .default("Direct consultation booking request"),
  age: z.string().trim().optional(),
  gender: z.string().trim().optional(),
  diseaseCategory: z.string().trim().optional(),
  duration: z.string().trim().optional(),
  lifestyle: z.string().trim().optional(),
});

async function sendTelegramMessage(text: string): Promise<void> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    throw new Error("Telegram is not configured on the server");
  }

  const url = `https://api.telegram.org/bot${token}/sendMessage`;
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      parse_mode: "HTML",
    }),
  });

  if (!response.ok) {
    const body = await response.text().catch(() => "");
    throw new Error(`Telegram API error: ${response.status} ${body}`);
  }
}

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON body" },
      { status: 400 }
    );
  }

  const parsed = appointmentSchema.safeParse(payload);
  if (!parsed.success) {
    const message = parsed.error.issues[0]?.message ?? "Invalid request";
    return NextResponse.json({ ok: false, error: message }, { status: 400 });
  }

  const { name, phone, slot, concern, age, gender, diseaseCategory, duration, lifestyle } = parsed.data;

  const ageGenderStr = age || gender ? ` (${[age ? `${age} yrs` : "", gender].filter(Boolean).join(", ")})` : "";

  const message =
    `🌿 <b>New Consultation Request</b>\n` +
    `A patient has submitted a detailed case profile.\n\n` +
    `👤 <b>Patient:</b> ${escapeHtml(name)}${escapeHtml(ageGenderStr)}\n` +
    `📞 <b>Phone:</b> ${escapeHtml(phone)}\n` +
    `📅 <b>Preferred Slot:</b> ${escapeHtml(slot)}\n` +
    `🩺 <b>Specialization:</b> ${escapeHtml(diseaseCategory || "General Consultation")}\n` +
    `⏳ <b>Duration of Illness:</b> ${escapeHtml(duration || "Not specified")}\n` +
    `🧬 <b>Daily Life / Factors:</b> ${escapeHtml(lifestyle || "Not specified")}\n` +
    `💬 <b>Clinical Notes:</b> ${escapeHtml(concern)}\n\n` +
    `Please reach out to review case & confirm visit. 💚`;

  try {
    await sendTelegramMessage(message);
  } catch (error) {
    console.error("[book-appointment] Telegram notification error:", error);
    return NextResponse.json(
      {
        ok: false,
        error:
          "Unable to submit your request right now. Please try again or contact the clinic directly.",
      },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true, name });
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
