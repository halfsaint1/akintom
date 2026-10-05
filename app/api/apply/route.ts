import { NextResponse } from "next/server";
import { applySchema } from "@/lib/apply-schema";
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

  const parsed = applySchema.safeParse(body);
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
  const phone = `${data.phoneCountryCode}${data.phoneNumber.replace(/\s/g, "")}`;
  const fullName = `${data.firstName} ${data.lastName}`;

  const text = [
    "New UK study application",
    "",
    "Personal details",
    formatField("Name", fullName),
    formatField("Email", data.email),
    formatField("Phone", phone),
    formatField("Date of birth", data.dateOfBirth),
    formatField("Gender", data.gender),
    formatField("Country of residence", data.countryOfResidence),
    formatField("Nationality", data.nationality),
    formatField("Current address", data.currentAddress),
    "",
    "Academic history",
    formatField("Highest qualification", data.highestQualification),
    formatField("Institution", data.institutionName),
    formatField("Graduation year", data.graduationYear),
    formatField("Field of study", data.fieldOfStudy),
    formatField("Grade or result", data.gradeResult),
    "",
    "Study preferences",
    formatField("Study level", data.studyLevel),
    formatField("Preferred course", data.preferredCourse),
    formatField("Desired university", data.desiredUniversity),
    formatField("Preferred intake", data.preferredIntake),
    "",
    "Documents and confirmation",
    formatField("Valid passport ready", data.hasPassport),
    formatField("Transcripts ready", data.hasTranscript),
    formatField("Additional notes", data.additionalNotes),
    "",
    `Submitted via ${site.url}/apply`,
  ].join("\n");

  try {
    await sendFormEmail({
      subject: `New application — ${fullName}`,
      text,
      replyTo: data.email,
    });
  } catch (error) {
    console.error("[application] Failed to send notification email:", error);
    if (isMailConfigured()) {
      return NextResponse.json(
        { ok: false, error: "Unable to send your application right now. Please try again." },
        { status: 500 },
      );
    }
  }

  console.info("[application] New UK study application:", {
    name: fullName,
    email: data.email,
    phone,
    course: data.preferredCourse,
    university: data.desiredUniversity,
    intake: data.preferredIntake,
  });

  return NextResponse.json({ ok: true });
}
