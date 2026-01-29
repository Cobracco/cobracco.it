import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

type RateLimitEntry = {
  count: number;
  start: number;
};

type Payload = {
  name: string;
  email: string;
  role: string;
  seniority: string;
  experience: string;
  salary: string;
  availability: string;
  linkedin: string;
  portfolio: string;
  message: string;
  website: string;
  attachment?: {
    filename: string;
    content: Buffer;
    contentType: string;
  } | null;
};

const rateLimitStore = new Map<string, RateLimitEntry>();

const MAX_ATTACHMENT_BYTES = 5 * 1024 * 1024;
const ALLOWED_MIME_TYPES = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);

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

function sanitizeFilename(filename: string) {
  return filename.replace(/[^a-zA-Z0-9._-]/g, "_").slice(0, 80) || "cv";
}

async function parsePayload(request: Request): Promise<Payload> {
  const contentType = request.headers.get("content-type") || "";

  if (contentType.includes("multipart/form-data")) {
    const formData = await request.formData();
    const attachment = formData.get("attachment");
    let parsedAttachment: Payload["attachment"] = null;

    if (attachment && attachment instanceof File && attachment.size > 0) {
      if (attachment.size > MAX_ATTACHMENT_BYTES) {
        throw new Error("Allegato troppo grande. Limite 5MB.");
      }
      if (!ALLOWED_MIME_TYPES.has(attachment.type)) {
        throw new Error("Formato allegato non supportato.");
      }

      const buffer = Buffer.from(await attachment.arrayBuffer());
      parsedAttachment = {
        filename: sanitizeFilename(attachment.name),
        content: buffer,
        contentType: attachment.type,
      };
    }

    return {
      name: String(formData.get("name") || "").trim(),
      email: String(formData.get("email") || "").trim(),
      role: String(formData.get("role") || "").trim(),
      seniority: String(formData.get("seniority") || "").trim(),
      experience: String(formData.get("experience") || "").trim(),
      salary: String(formData.get("salary") || "").trim(),
      availability: String(formData.get("availability") || "").trim(),
      linkedin: String(formData.get("linkedin") || "").trim(),
      portfolio: String(formData.get("portfolio") || "").trim(),
      message: String(formData.get("message") || "").trim(),
      website: String(formData.get("website") || "").trim(),
      attachment: parsedAttachment,
    };
  }

  const body = await request.json();
  return {
    name: String(body.name || "").trim(),
    email: String(body.email || "").trim(),
    role: String(body.role || "").trim(),
    seniority: String(body.seniority || "").trim(),
    experience: String(body.experience || "").trim(),
    salary: String(body.salary || "").trim(),
    availability: String(body.availability || "").trim(),
    linkedin: String(body.linkedin || "").trim(),
    portfolio: String(body.portfolio || "").trim(),
    message: String(body.message || "").trim(),
    website: String(body.website || "").trim(),
    attachment: null,
  };
}

export async function POST(request: Request) {
  try {
    const payload = await parsePayload(request);
    const {
      name,
      email,
      role,
      seniority,
      experience,
      salary,
      availability,
      linkedin,
      portfolio,
      message,
      website,
      attachment,
    } = payload;

    if (!name || !email || !role || !seniority || !message) {
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
      subject: `[Cobracco] Nuova candidatura - ${name}`,
      text:
        `Nuova candidatura dal sito Cobracco.\n\nNome: ${name}\nEmail: ${email}\nRuolo: ${role}\nSeniority: ${seniority}\n` +
        `Esperienza: ${experience || "-"}\nCompenso atteso: ${salary || "-"}\nDisponibilita: ${availability || "-"}\n` +
        `LinkedIn: ${linkedin || "-"}\nPortfolio/GitHub: ${portfolio || "-"}\n\n` +
        `Messaggio:\n${message}\n\n` +
        `Dati tecnici:\nIP: ${ip}\nUser-Agent: ${userAgent}\nTimestamp: ${timestamp}`,
      html: `
        <div style="font-family: Arial, Helvetica, sans-serif; color:#0f172a; line-height:1.5;">
          <div style="margin-bottom:16px;">
            <img src="https://www.cobracco.it/logos/logo-primary.png" alt="Cobracco" width="160" style="display:block; height:auto;" />
          </div>
          <h2 style="font-size:18px; margin:0 0 8px;">Nuova candidatura</h2>
          <p style="margin:0 0 16px;">È arrivata una nuova candidatura dal form Lavora con noi.</p>
          <table style="border-collapse:collapse; width:100%; max-width:640px;">
            <tr>
              <td style="padding:6px 0; width:160px; font-weight:600;">Nome</td>
              <td style="padding:6px 0;">${name}</td>
            </tr>
            <tr>
              <td style="padding:6px 0; font-weight:600;">Email</td>
              <td style="padding:6px 0;">${email}</td>
            </tr>
            <tr>
              <td style="padding:6px 0; font-weight:600;">Ruolo</td>
              <td style="padding:6px 0;">${role}</td>
            </tr>
            <tr>
              <td style="padding:6px 0; font-weight:600;">Seniority</td>
              <td style="padding:6px 0;">${seniority}</td>
            </tr>
            <tr>
              <td style="padding:6px 0; font-weight:600;">Esperienza</td>
              <td style="padding:6px 0;">${experience || "-"}</td>
            </tr>
            <tr>
              <td style="padding:6px 0; font-weight:600;">Compenso atteso</td>
              <td style="padding:6px 0;">${salary || "-"}</td>
            </tr>
            <tr>
              <td style="padding:6px 0; font-weight:600;">Disponibilita</td>
              <td style="padding:6px 0;">${availability || "-"}</td>
            </tr>
            <tr>
              <td style="padding:6px 0; font-weight:600;">LinkedIn</td>
              <td style="padding:6px 0;">${linkedin || "-"}</td>
            </tr>
            <tr>
              <td style="padding:6px 0; font-weight:600;">Portfolio</td>
              <td style="padding:6px 0;">${portfolio || "-"}</td>
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
      attachments: attachment
        ? [
            {
              filename: attachment.filename,
              content: attachment.content,
              contentType: attachment.contentType,
            },
          ]
        : undefined,
    });

    await transporter.sendMail({
      from,
      to: email,
      subject: "Abbiamo ricevuto la tua candidatura",
      text:
        `Ciao ${name},\n\n` +
        "grazie per la tua candidatura. Abbiamo ricevuto le informazioni e le stiamo valutando.\n" +
        "Se il profilo e in linea, ti contatteremo entro 1-2 giorni lavorativi.\n\n" +
        "Riepilogo:\n" +
        `Ruolo: ${role}\n` +
        `Seniority: ${seniority}\n` +
        `Esperienza: ${experience || "-"}\n` +
        `Compenso atteso: ${salary || "-"}\n` +
        `Disponibilita: ${availability || "-"}\n` +
        `LinkedIn: ${linkedin || "-"}\n` +
        `Portfolio/GitHub: ${portfolio || "-"}\n\n` +
        `Messaggio:\n${message}\n\n` +
        "Se vuoi aggiungere dettagli, rispondi pure a questa email.\n\n" +
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
            grazie per la tua candidatura. Abbiamo ricevuto le informazioni e le stiamo valutando.
          </p>
          <p style="margin:0 0 16px;">Se il profilo è in linea, ti contatteremo entro 1-2 giorni lavorativi.</p>
          <div style="margin:16px 0; padding:12px; background:#f8fafc; border:1px solid #e2e8f0; border-radius:8px;">
            <div style="font-weight:600; margin-bottom:6px;">Riepilogo</div>
            <div style="white-space:pre-wrap;">Ruolo: ${role}\nSeniority: ${seniority}\nEsperienza: ${experience || "-"}\nCompenso atteso: ${salary || "-"}\nDisponibilita: ${availability || "-"}\nLinkedIn: ${linkedin || "-"}\nPortfolio/GitHub: ${portfolio || "-"}\n\n${message}</div>
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
    console.error("/api/candidature error:", error);
    return NextResponse.json(
      {
        error: "Errore durante l'invio. Riprova piu tardi.",
        details: process.env.NODE_ENV !== "production" ? message : undefined,
      },
      { status: 500 }
    );
  }
}
