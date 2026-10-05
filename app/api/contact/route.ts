import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/contact-schema";
import { formatField, isMailConfigured, sendFormEmail } from "@/lib/mail";
import { site } from "@/lib/site";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request body." },
      { status: 400 },
    );
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Validation failed.", issues: parsed.error.flatten() },
      { status: 422 },
    );
  }

  if (parsed.data.company) {
    return NextResponse.json({ ok: true });
  }

  const data = parsed.data;

  const text = [
    "New consultation enquiry",
    "",
    formatField("Name", data.name),
    formatField("Email", data.email),
    formatField("Phone", data.phone),
    formatField("Preferred course", data.preferredCourse),
    formatField("Desired university", data.desiredUniversity),
    "",
    "Message",
    data.message,
    "",
    `Submitted via ${site.url}/contact`,
  ].join("\n");

  try {
    await sendFormEmail({
      subject: `New enquiry — ${data.name}`,
      text,
      replyTo: data.email,
    });
  } catch (error) {
    console.error("[lead] Failed to send notification email:", error);
    if (isMailConfigured()) {
      return NextResponse.json(
        { ok: false, error: "Unable to send your message right now. Please try again." },
        { status: 500 },
      );
    }
  }

  console.info("[lead] New consultation enquiry:", {
    name: data.name,
    email: data.email,
    preferredCourse: data.preferredCourse,
    desiredUniversity: data.desiredUniversity,
  });

  return NextResponse.json({ ok: true });
}
