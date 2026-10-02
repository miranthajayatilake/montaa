import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function POST(req: Request) {
  let body: { email?: string; name?: string; useCase?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
  const email = (body.email ?? "").trim().toLowerCase();
  if (!EMAIL_RE.test(email) || email.length > 254) {
    return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
  }
  const name = (body.name ?? "").trim().slice(0, 120) || null;
  const useCase = (body.useCase ?? "").trim().slice(0, 500) || null;
  // INSERT OR IGNORE: re-signups succeed silently and never reveal who is already on the list.
  getDb()
    .prepare("INSERT OR IGNORE INTO leads (email, name, use_case) VALUES (?, ?, ?)")
    .run(email, name, useCase);
  return NextResponse.json({ ok: true });
}

export async function GET(req: Request) {
  const token = process.env.EXPORT_TOKEN;
  const given = new URL(req.url).searchParams.get("token");
  if (!token || token === "change-me" || given !== token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const rows = getDb()
    .prepare("SELECT email, name, use_case, created_at FROM leads ORDER BY id")
    .all() as Record<string, string | null>[];
  const esc = (v: string | null) => `"${(v ?? "").replace(/"/g, '""')}"`;
  const csv = [
    "email,name,use_case,created_at",
    ...rows.map((r) => [r.email, r.name, r.use_case, r.created_at].map(esc).join(",")),
  ].join("\n");
  return new NextResponse(csv, { headers: { "content-type": "text/csv" } });
}
