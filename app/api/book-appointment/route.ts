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
    .min(1, "Please briefly describe your concern")
    .max(500, "Concern is too long"),
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

  const { name, phone, slot, concern } = parsed.data;

  const message =
    `🌿 <b>New Appointment Request</b>\n` +
    `A patient would love to book a consultation with you.\n\n` +
    `👤 <b>Patient:</b> ${escapeHtml(name)}\n` +
    `📞 <b>Phone:</b> ${escapeHtml(phone)}\n` +
    `�️ <b>Preferred Slot:</b> ${escapeHtml(slot)}\n` +
    `💬 <b>Concern:</b> ${escapeHtml(concern)}\n\n` +
    `Please reach out to confirm their visit. 💚`;

  try {
    await sendTelegramMessage(message);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Failed to notify the clinic";
    return NextResponse.json({ ok: false, error: errorMessage }, { status: 502 });
  }

  return NextResponse.json({ ok: true, name });
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
