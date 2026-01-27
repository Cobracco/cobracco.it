import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const MIN_RECAPTCHA_SCORE = 0.5;

type RateLimitEntry = {
  count: number;
  start: number;
};

const rateLimitStore = new Map<string, RateLimitEntry>();

function getClientIp(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  return "unknown";
}

function isRateLimited(ip: string, windowSec: number, max: number) {
  const now = Date.now();
  const entry = rateLimitStore.get(ip);

  if (!entry) {
    rateLimitStore.set(ip, { count: 1, start: now });
    return false;
  }

  if (now - entry.start > windowSec * 1000) {
    rateLimitStore.set(ip, { count: 1, start: now });
    return false;
  }

  entry.count += 1;
  rateLimitStore.set(ip, entry);
  return entry.count > max;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = String(body.name || "").trim();
    const email = String(body.email || "").trim();
    const message = String(body.message || "").trim();
    const token = String(body.token || "").trim();
    const website = String(body.website || "").trim();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Compila tutti i campi obbligatori." },
        { status: 400 }
      );
    }

    if (website) {
      return NextResponse.json({ ok: true });
    }

    const windowSec = Number(process.env.CONTACT_RATE_LIMIT_WINDOW_SEC || 60);
    const max = Number(process.env.CONTACT_RATE_LIMIT_MAX || 10);
    const ip = getClientIp(request);

    if (isRateLimited(ip, windowSec, max)) {
      return NextResponse.json(
        { error: "Troppe richieste. Riprova tra poco." },
        { status: 429 }
      );
    }

    const secret = process.env.RECAPTCHA_SECRET || "";
    if (!secret || !token) {
      return NextResponse.json(
        { error: "Verifica anti-spam fallita." },
        { status: 400 }
      );
    }

    const verifyResponse = await fetch(
      "https://www.google.com/recaptcha/api/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `secret=${encodeURIComponent(secret)}&response=${encodeURIComponent(
          token
        )}`,
      }
    );
    const verifyData = await verifyResponse.json();

    const score = typeof verifyData.score === "number" ? verifyData.score : 0;
    if (!verifyData.success || score < MIN_RECAPTCHA_SCORE) {
      return NextResponse.json(
        { error: "Verifica anti-spam fallita." },
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: Number(process.env.SMTP_PORT || 587) === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const to = process.env.SMTP_TO || "";
    const from = process.env.SMTP_FROM || "";

    if (!to || !from) {
      return NextResponse.json(
        { error: "Configurazione email mancante." },
        { status: 500 }
      );
    }

    const userAgent = request.headers.get("user-agent") || "";
    const timestamp = new Date().toISOString();

    await transporter.sendMail({
      from,
      to,
      replyTo: email,
      subject: `[Cobracco] Nuova richiesta contatto - ${name}`,
      text:
        `Nome: ${name}\nEmail: ${email}\n\nMessaggio:\n${message}\n\nIP: ${ip}\nUser-Agent: ${userAgent}\nTimestamp: ${timestamp}`,
    });

    await transporter.sendMail({
      from,
      to: email,
      subject: "Grazie per il contatto",
      text:
        "Grazie per averci contattato. Abbiamo ricevuto la tua richiesta e ti risponderemo entro 1-2 giorni lavorativi. A presto, Cobracco.",
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Errore sconosciuto";
    console.error("/api/contact error:", error);
    return NextResponse.json(
      {
        error: "Errore durante l'invio. Riprova piu tardi.",
        details: process.env.NODE_ENV !== "production" ? message : undefined,
      },
      { status: 500 }
    );
  }
}
