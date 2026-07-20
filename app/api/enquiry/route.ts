import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");
const ENQUIRIES_FILE = path.join(DATA_DIR, "enquiries.json");

let writeQueue: Promise<unknown> = Promise.resolve();

type EnquiryRecord = {
  name: string;
  phone: string;
  message: string;
  patientNo: string;
  date: string;
  createdAt: string;
};

const NAME_RE = /^[A-Za-z\s'-]+$/;
const PHONE_RE = /^\d{10}$/;
const MAX_MESSAGE_WORDS = 300;

function toIndiaDate(date = new Date()): string {
  return date.toLocaleDateString("en-IN", {
    timeZone: "Asia/Kolkata",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

async function readRecords(): Promise<EnquiryRecord[]> {
  try {
    const raw = await fs.readFile(ENQUIRIES_FILE, "utf8");
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) throw new Error("Malformed records file");
    return parsed as EnquiryRecord[];
  } catch (error) {
    if (isENOENT(error)) return [];
    throw error;
  }
}

function isENOENT(error: unknown): error is NodeJS.ErrnoException {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    (error as NodeJS.ErrnoException).code === "ENOENT"
  );
}

function withLock<T>(fn: () => Promise<T>): Promise<T> {
  const job = writeQueue.then(() => fn());
  writeQueue = job.catch(() => undefined);
  return job;
}

function validateBody(body: unknown): { name: string; phone: string; message: string } {
  if (typeof body !== "object" || body === null) {
    throw new Error("Invalid request body");
  }
  const { name, phone, message } = body as Record<string, unknown>;
  if (
    typeof name !== "string" ||
    typeof phone !== "string" ||
    typeof message !== "string"
  ) {
    throw new Error("Missing or invalid fields");
  }

  const trimmedName = name.trim();
  const trimmedPhone = phone.trim();
  const trimmedMessage = message.trim();

  if (!trimmedName || !NAME_RE.test(trimmedName) || trimmedName.length > 30) {
    throw new Error("Invalid name");
  }
  if (!PHONE_RE.test(trimmedPhone)) {
    throw new Error("Invalid phone");
  }
  const wordCount = trimmedMessage.split(/\s+/).filter(Boolean).length;
  if (!trimmedMessage || wordCount > MAX_MESSAGE_WORDS) {
    throw new Error("Invalid message");
  }

  return { name: trimmedName, phone: trimmedPhone, message: trimmedMessage };
}

function generatePatientNo(records: EnquiryRecord[], dateKey: string): string {
  const count = records.filter((r) => r.date === dateKey).length + 1;
  return `OPD${String(count).padStart(4, "0")}`;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, message } = validateBody(body);

    const now = new Date();
    const date = toIndiaDate(now);

    const record = await withLock(async () => {
      await fs.mkdir(DATA_DIR, { recursive: true });
      const records = await readRecords();
      const patientNo = generatePatientNo(records, date);
      const newRecord: EnquiryRecord = {
        name,
        phone,
        message,
        patientNo,
        date,
        createdAt: now.toISOString(),
      };
      records.push(newRecord);
      await fs.writeFile(ENQUIRIES_FILE, JSON.stringify(records, null, 2));
      return newRecord;
    });

    return NextResponse.json({ ok: true, record });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Server error";
    const status = message.startsWith("Invalid") ? 400 : 500;
    return NextResponse.json({ ok: false, error: message }, { status });
  }
}

export async function GET(request: Request) {
  try {
    const secret = process.env.ENQUIRY_SECRET;
    if (!secret) {
      return NextResponse.json(
        { ok: false, error: "ENQUIRY_SECRET not configured" },
        { status: 401 }
      );
    }

    const auth = request.headers.get("authorization");
    if (auth !== `Bearer ${secret}`) {
      return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
    }

    const records = await readRecords();
    const byDay: Record<string, number> = {};
    for (const record of records) {
      const key = record.createdAt?.slice(0, 10) ?? "unknown";
      byDay[key] = (byDay[key] || 0) + 1;
    }

    return NextResponse.json({ total: records.length, byDay });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Server error";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
