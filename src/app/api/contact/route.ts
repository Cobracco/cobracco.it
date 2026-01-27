import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

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

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: Number(process.env.SMTP_PORT || 587) === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const to = process.env.SMTP_TO || process.env.CONTACT_TO || "";
    const from = process.env.SMTP_FROM || process.env.CONTACT_FROM || "";

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
        `Nuova richiesta dal sito Cobracco.\n\nNome: ${name}\nEmail: ${email}\n\nMessaggio:\n${message}\n\nDati tecnici:\nIP: ${ip}\nUser-Agent: ${userAgent}\nTimestamp: ${timestamp}`,
      html: `
        <div style="font-family: Arial, Helvetica, sans-serif; color:#0f172a; line-height:1.5;">
          <div style="margin-bottom:16px;">
            <img src="https://www.cobracco.it/logos/logo-primary.png" alt="Cobracco" width="160" style="display:block; height:auto;" />
          </div>
          <h2 style="font-size:18px; margin:0 0 8px;">Nuova richiesta dal sito</h2>
          <p style="margin:0 0 16px;">È arrivata una nuova richiesta di contatto dal form.</p>
          <table style="border-collapse:collapse; width:100%; max-width:640px;">
            <tr>
              <td style="padding:6px 0; width:120px; font-weight:600;">Nome</td>
              <td style="padding:6px 0;">${name}</td>
            </tr>
            <tr>
              <td style="padding:6px 0; font-weight:600;">Email</td>
              <td style="padding:6px 0;">${email}</td>
            </tr>
          </table>
          <div style="margin:12px 0 0; padding:12px; background:#f8fafc; border:1px solid #e2e8f0; border-radius:8px;">
            <div style="font-weight:600; margin-bottom:6px;">Messaggio</div>
            <div style="white-space:pre-wrap;">${message}</div>
          </div>
          <p style="margin:16px 0 0; color:#475569; font-size:12px;">
            IP: ${ip}<br/>
            User-Agent: ${userAgent}<br/>
            Timestamp: ${timestamp}
          </p>
        </div>
      `,
    });

    await transporter.sendMail({
      from,
      to: email,
      subject: "Abbiamo ricevuto la tua richiesta",
      text:
        `Ciao ${name},\n\n` +
        "grazie per averci contattato. Abbiamo ricevuto la tua richiesta e la stiamo prendendo in carico.\n" +
        "Ti risponderemo entro 1-2 giorni lavorativi.\n\n" +
        "Riepilogo del messaggio inviato:\n" +
        `${message}\n\n` +
        "Se hai bisogno di aggiungere dettagli, rispondi pure a questa email.\n\n" +
        "A presto,\n" +
        "Cobracco\n" +
        "https://www.cobracco.it",
      html: `
        <div style="font-family: Arial, Helvetica, sans-serif; color:#0f172a; line-height:1.6;">
          <div style="margin-bottom:16px;">
            <img src="https://www.cobracco.it/logos/logo-primary.png" alt="Cobracco" width="160" style="display:block; height:auto;" />
          </div>
          <p style="margin:0 0 12px;">Ciao ${name},</p>
          <p style="margin:0 0 12px;">
            grazie per averci contattato. Abbiamo ricevuto la tua richiesta e la stiamo prendendo in carico.
          </p>
          <p style="margin:0 0 16px;">Ti risponderemo entro 1-2 giorni lavorativi.</p>
          <div style="margin:16px 0; padding:12px; background:#f8fafc; border:1px solid #e2e8f0; border-radius:8px;">
            <div style="font-weight:600; margin-bottom:6px;">Riepilogo del messaggio</div>
            <div style="white-space:pre-wrap;">${message}</div>
          </div>
          <p style="margin:0 0 12px;">
            Se vuoi aggiungere dettagli, rispondi pure a questa email.
          </p>
          <p style="margin:0;">
            A presto,<br/>
            <strong>Cobracco</strong><br/>
            <a href="https://www.cobracco.it" style="color:#2563eb; text-decoration:none;">www.cobracco.it</a>
          </p>
        </div>
      `,
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
