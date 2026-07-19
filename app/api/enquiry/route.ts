import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");
const ENQUIRIES_FILE = path.join(DATA_DIR, "enquiries.json");

async function readRecords(): Promise<unknown[]> {
  try {
    const raw = await fs.readFile(ENQUIRIES_FILE, "utf8");
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const record = {
      ...body,
      createdAt: new Date().toISOString(),
    };

    await fs.mkdir(DATA_DIR, { recursive: true });
    const records = await readRecords();
    records.push(record);
    await fs.writeFile(ENQUIRIES_FILE, JSON.stringify(records, null, 2));

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}

export async function GET() {
  try {
    const records = (await readRecords()) as { createdAt?: string }[];
    const byDay: Record<string, number> = {};

    for (const record of records) {
      const date = record.createdAt?.slice(0, 10) ?? "unknown";
      byDay[date] = (byDay[date] || 0) + 1;
    }

    return NextResponse.json({
      total: records.length,
      byDay,
    });
  } catch {
    return NextResponse.json({ total: 0, byDay: {} });
  }
}
