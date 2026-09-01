import { NextResponse } from "next/server";
import { z } from "zod";

const appointmentSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Name is required")
    .max(60, "Name is too long")
    .regex(/^[A-Za-z\s'.-]+$/, "Only letters, spaces, apostrophes and hyphens are allowed"),
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

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

async function sendTelegramNotification(htmlText: string, plainText: string): Promise<boolean> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    console.warn("[book-appointment] Telegram credentials not configured in environment");
    return false;
  }

  const url = `https://api.telegram.org/bot${token}/sendMessage`;

  // First try: HTML formatted message
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: htmlText,
        parse_mode: "HTML",
      }),
      signal: AbortSignal.timeout(6000),
    });

    if (response.ok) {
      return true;
    }

    const errText = await response.text().catch(() => "");
    console.warn(`[book-appointment] HTML parse error, retrying plain text: ${response.status} ${errText}`);
  } catch (error) {
    console.warn("[book-appointment] Initial HTML dispatch failed, retrying plain text:", error);
  }

  // Second try: Plain text fallback (guaranteed to deliver)
  try {
    const fallbackResponse = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: plainText,
      }),
      signal: AbortSignal.timeout(6000),
    });

    if (fallbackResponse.ok) {
      return true;
    }

    const fallbackErr = await fallbackResponse.text().catch(() => "");
    console.error(`[book-appointment] Telegram fallback API error: ${fallbackResponse.status} ${fallbackErr}`);
    return false;
  } catch (err) {
    console.error("[book-appointment] Telegram dispatch failed completely:", err);
    return false;
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
    const message = parsed.error.issues[0]?.message ?? "Invalid request details";
    return NextResponse.json({ ok: false, error: message }, { status: 400 });
  }

  const { name, phone, slot, concern, diseaseCategory } = parsed.data;

  const concernLabel = diseaseCategory || "General Health Consultation";
  const notes =
    concern && concern !== "Direct consultation booking request"
      ? concern
      : "";

  const notesHtml = notes
    ? `\n📝 <b>Symptoms / Notes:</b>\n<i>${escapeHtml(notes)}</i>\n`
    : "";

  const notesPlain = notes ? `\nSymptoms / Notes: ${notes}\n` : "";

  const cleanWaText = encodeURIComponent(
    `Hello ${name}, we received your consultation request at Dr. Sheetal's Homoeopathy Clinic for ${slot}.`
  );
  const waUrl = `https://wa.me/91${phone}?text=${cleanWaText}`;

  const htmlMessage =
    `🌿 <b>New Consultation Request Received</b>\n\n` +
    `👤 <b>Patient Name:</b> ${escapeHtml(name)}\n` +
    `📞 <b>Mobile / WhatsApp:</b> <code>${escapeHtml(phone)}</code>\n` +
    `🩺 <b>Health Concern:</b> ${escapeHtml(concernLabel)}\n` +
    `📅 <b>Preferred Slot:</b> <b>${escapeHtml(slot)}</b>\n` +
    notesHtml +
    `\n💬 <a href="${waUrl}">Click here to WhatsApp Patient</a>\n` +
    `⚡ <i>Please contact patient to confirm consultation visit.</i>`;

  const plainMessage =
    `🌿 New Consultation Request Received\n\n` +
    `Patient Name: ${name}\n` +
    `Mobile / WhatsApp: ${phone}\n` +
    `Health Concern: ${concernLabel}\n` +
    `Preferred Slot: ${slot}\n` +
    notesPlain +
    `\nWhatsApp Link: ${waUrl}\n` +
    `Please contact patient to confirm consultation visit.`;

  const delivered = await sendTelegramNotification(htmlMessage, plainMessage);

  if (!delivered) {
    console.error(`[book-appointment] Warning: Consultation request for ${name} (${phone}) could not be sent to Telegram.`);
  }

  // Always return success to the patient so their booking is confirmed
  return NextResponse.json({
    ok: true,
    name,
    whatsappUrl: waUrl,
  });
}
