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

  const { name, phone, slot, concern, diseaseCategory } = parsed.data;

  const notesText =
    concern && concern !== "Direct consultation booking request"
      ? `\n📝 <b>Symptoms / Notes:</b>\n<i>${escapeHtml(concern)}</i>\n`
      : "";

  const message =
    `🌿 <b>New Consultation Request Received</b>\n\n` +
    `👤 <b>Patient Name:</b> ${escapeHtml(name)}\n` +
    `📞 <b>Mobile / WhatsApp:</b> <code>${escapeHtml(phone)}</code>\n` +
    `🩺 <b>Health Concern:</b> ${escapeHtml(diseaseCategory || "General Health Consultation")}\n` +
    `📅 <b>Preferred Slot:</b> <b>${escapeHtml(slot)}</b>\n` +
    notesText +
    `\n💬 <a href="https://wa.me/91${escapeHtml(phone)}?text=Hello%20${encodeURIComponent(name)},%20we%20received%20your%20consultation%20request%20at%20Dr.%20Sheetal's%20Homoeopathy%20Clinic%20for%20${encodeURIComponent(slot)}.">Click here to WhatsApp Patient</a>\n` +
    `⚡ <i>Please contact patient to confirm consultation visit.</i>`;

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
