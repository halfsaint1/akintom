import nodemailer from "nodemailer";
import { site } from "@/lib/site";

type SendFormEmailInput = {
  subject: string;
  text: string;
  replyTo?: string;
};

function getMailConfig() {
  return {
    to: process.env.MAIL_TO ?? site.email,
    from: process.env.MAIL_FROM ?? site.email,
    host: process.env.SMTP_HOST ?? "smtp.purelymail.com",
    port: Number(process.env.SMTP_PORT ?? 587),
    secure: process.env.SMTP_SECURE === "true",
    user: process.env.SMTP_USER ?? site.email,
    pass: process.env.SMTP_PASS,
  };
}

export function isMailConfigured(): boolean {
  const { pass } = getMailConfig();
  return Boolean(pass);
}

function createTransporter() {
  const config = getMailConfig();

  return nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.secure,
    requireTLS: !config.secure,
    auth: {
      user: config.user,
      pass: config.pass,
    },
  });
}

export async function verifyMailConnection(): Promise<void> {
  if (!isMailConfigured()) {
    throw new Error("SMTP_PASS is not set in .env.local");
  }

  const transporter = createTransporter();
  await transporter.verify();
}

export async function sendFormEmail({
  subject,
  text,
  replyTo,
}: SendFormEmailInput): Promise<void> {
  const config = getMailConfig();

  if (!isMailConfigured()) {
    console.info("[mail] SMTP not configured — logging submission only:", {
      to: config.to,
      subject,
      replyTo,
      text,
    });
    return;
  }

  const transporter = createTransporter();

  await transporter.sendMail({
    from: `"${site.name}" <${config.from}>`,
    to: config.to,
    replyTo,
    subject,
    text,
  });
}

export function formatField(label: string, value: string | boolean | undefined): string {
  if (value === undefined || value === "") return `${label}: —`;
  if (typeof value === "boolean") return `${label}: ${value ? "Yes" : "No"}`;
  return `${label}: ${value}`;
}
