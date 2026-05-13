import type { VercelRequest, VercelResponse } from "@vercel/node";
import { google } from "googleapis";
import nodemailer from "nodemailer";
import { z } from "zod";

const ContactSchema = z.object({
  name: z.string().min(2),
  phone: z.string().min(10),
  email: z.string().email(),
  reason: z.string().optional(),
  message: z.string().min(10),
});

type ContactData = z.infer<typeof ContactSchema>;

function getServiceAccountCredentials() {
  let raw = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
  if (!raw) throw new Error("GOOGLE_SERVICE_ACCOUNT_JSON is not set");
  raw = raw.trim();

  if (raw.startsWith("{")) return JSON.parse(raw);

  if (raw.charCodeAt(0) === 34 && !raw.startsWith('"{')) {
    return JSON.parse("{" + raw);
  }

  const inner = JSON.parse(raw);
  return typeof inner === "string" ? JSON.parse(inner) : inner;
}

function getSheetId(): string {
  const raw = process.env.GOOGLE_SHEET_ID;
  if (!raw) throw new Error("GOOGLE_SHEET_ID is not set");
  const match = raw.match(/\/spreadsheets\/d\/([a-zA-Z0-9_-]+)/);
  return match ? match[1] : raw.trim();
}

async function appendToSheet(data: ContactData) {
  const auth = new google.auth.GoogleAuth({
    credentials: getServiceAccountCredentials(),
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const sheets = google.sheets({ version: "v4", auth });
  const timestamp = new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" });
  const reasonLabel = data.reason || "Não informado";

  await sheets.spreadsheets.values.append({
    spreadsheetId: getSheetId(),
    range: "A:F",
    valueInputOption: "USER_ENTERED",
    insertDataOption: "INSERT_ROWS",
    requestBody: {
      values: [[timestamp, data.name, data.email, data.phone, reasonLabel, data.message]],
    },
  });
}

async function sendNotificationEmail(data: ContactData) {
  const notificationEmail = process.env.NOTIFICATION_EMAIL;
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;

  if (!notificationEmail || !smtpUser || !smtpPass) return;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user: smtpUser, pass: smtpPass },
  });

  const timestamp = new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" });
  const reasonLabel = data.reason || "Não informado";

  await transporter.sendMail({
    from: `"Site Letícia Miranda" <${smtpUser}>`,
    to: notificationEmail,
    subject: `Novo contato pelo site — ${data.name}`,
    text: [
      `Novo contato recebido pelo site em ${timestamp}`,
      "",
      `Nome: ${data.name}`,
      `E-mail: ${data.email}`,
      `Telefone: ${data.phone}`,
      `Motivo: ${reasonLabel}`,
      "",
      "Mensagem:",
      data.message,
    ].join("\n"),
  });
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Método não permitido." });
  }

  const parsed = ContactSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: "Dados inválidos. Revise o formulário." });
  }

  try {
    await appendToSheet(parsed.data);
  } catch (error) {
    console.error("Failed to append to Google Sheets", error);
    return res.status(500).json({ error: "Erro ao salvar os dados. Tente novamente." });
  }

  try {
    await sendNotificationEmail(parsed.data);
  } catch (error) {
    console.warn("Failed to send notification email. Contact was saved to sheet.", error);
  }

  return res.status(200).json({ success: true, message: "Contato recebido com sucesso." });
}
