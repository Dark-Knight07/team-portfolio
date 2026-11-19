import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { sanitise, validate } from "@/lib/validation";

/**
 * Receives project inquiries and consultation requests.
 *
 * Validation is server-side (never trust the browser), with a honeypot field,
 * an origin check and a small in-memory rate limit. Delivery is configured with
 * server-only environment variables (see .env.example), none of which are ever
 * sent to the browser:
 *   INQUIRY_WEBHOOK_URL                          -> POST JSON (Slack/Discord/Make/Zapier compatible)
 *   RESEND_API_KEY + INQUIRY_TO_EMAIL + INQUIRY_FROM_EMAIL -> email via Resend
 * In local development, with nothing configured, submissions are written to
 * .data/inquiries.jsonl (git-ignored). In production with nothing configured
 * the route returns 503 so a lead is never silently lost.
 */

const hits = new Map<string, number[]>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_HITS = 5;

function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 500) for (const [k, v] of hits) if (!v.some((t) => now - t < WINDOW_MS)) hits.delete(k);
  return recent.length > MAX_HITS;
}

const json = (body: unknown, status = 200) => Response.json(body, { status, headers: { "Cache-Control": "no-store" } });

function summary(d: ReturnType<typeof sanitise>) {
  const lines =
    d.type === "consultation"
      ? [
          "New consultation request",
          `Name: ${d.name}`, `Email: ${d.email}`, d.phone && `Phone: ${d.phone}`,
          `Topic: ${d.topic}`, `Preferred: ${d.date}, ${d.window} (${d.timezone})`, `Mode: ${d.mode}`,
          d.notes && `Notes: ${d.notes}`,
        ]
      : [
          "New project inquiry",
          `Name: ${d.name}`, `Email: ${d.email}`, d.phone && `Phone: ${d.phone}`, d.company && `Company: ${d.company}`,
          `Service: ${d.service}`, `Budget: ${d.budget}`, `Timeline: ${d.timeline}`, `Message: ${d.message}`,
        ];
  return lines.filter(Boolean).join("\n");
}

async function deliver(d: ReturnType<typeof sanitise>): Promise<"sent" | "stored" | "unconfigured"> {
  const text = summary(d);
  const hook = process.env.INQUIRY_WEBHOOK_URL;
  const resend = process.env.RESEND_API_KEY;
  const to = process.env.INQUIRY_TO_EMAIL;
  const from = process.env.INQUIRY_FROM_EMAIL;
  let sent = false;

  if (hook) {
    const r = await fetch(hook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, content: text, ...d }),
      signal: AbortSignal.timeout(8000),
    });
    if (!r.ok) throw new Error("webhook failed");
    sent = true;
  }
  if (resend && to && from) {
    const r = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${resend}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from, to: [to], reply_to: d.email, subject: d.type === "consultation" ? "New consultation request" : "New project inquiry", text }),
      signal: AbortSignal.timeout(8000),
    });
    if (!r.ok) throw new Error("email failed");
    sent = true;
  }
  if (sent) return "sent";

  if (process.env.NODE_ENV !== "production") {
    const dir = path.join(process.cwd(), ".data");
    await mkdir(dir, { recursive: true });
    await appendFile(path.join(dir, "inquiries.jsonl"), JSON.stringify({ at: new Date().toISOString(), ...d }) + "\n");
    return "stored";
  }
  return "unconfigured";
}

export async function POST(request: Request) {
  // Same-origin only.
  const origin = request.headers.get("origin");
  const host = request.headers.get("host");
  if (origin && host && new URL(origin).host !== host) return json({ ok: false, message: "Request not allowed." }, 403);

  const len = Number(request.headers.get("content-length") ?? 0);
  if (len > 20_000) return json({ ok: false, message: "Request too large." }, 413);

  const ip = (request.headers.get("x-forwarded-for") ?? "unknown").split(",")[0].trim();
  if (limited(ip)) return json({ ok: false, message: "Too many requests. Please wait a few minutes and try again." }, 429);

  let body: Record<string, unknown>;
  try {
    const parsed = await request.json();
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) throw new Error();
    body = parsed as Record<string, unknown>;
  } catch {
    return json({ ok: false, message: "Invalid request." }, 400);
  }

  // Honeypot: bots fill the hidden field. Pretend success, deliver nothing.
  if (typeof body.website === "string" && body.website.trim() !== "") return json({ ok: true });

  const errors = validate(body);
  if (Object.keys(errors).length) return json({ ok: false, errors, message: "Please correct the highlighted fields." }, 422);

  try {
    const result = await deliver(sanitise(body));
    if (result === "unconfigured") {
      return json({ ok: false, message: "Online submissions are not available right now. Please call a team member directly using the numbers below." }, 503);
    }
    return json({ ok: true });
  } catch {
    return json({ ok: false, message: "We could not send your message. Please try again or call a team member directly." }, 502);
  }
}
