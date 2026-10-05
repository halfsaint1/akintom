import { z } from "zod";

export const personalDetailsSchema = z.object({
  firstName: z.string().min(2, "Enter your first name").max(80),
  lastName: z.string().min(2, "Enter your last name").max(80),
  phoneCountryCode: z.string().min(1, "Select country code"),
  phoneNumber: z
    .string()
    .min(7, "Enter a valid phone number")
    .max(15, "Phone number is too long")
    .regex(/^[\d\s]+$/, "Enter digits only"),
  email: z.string().email("Enter a valid email address"),
  dateOfBirth: z.string().min(1, "Enter your date of birth"),
  gender: z.string().min(1, "Select your gender"),
  countryOfResidence: z.string().min(1, "Select your country of residence"),
  nationality: z.string().min(2, "Enter your nationality").max(80),
  currentAddress: z.string().min(5, "Enter your current address").max(300),
});

export const academicHistorySchema = z.object({
  highestQualification: z.string().min(1, "Select your highest qualification"),
  institutionName: z.string().min(2, "Enter your school or university").max(160),
  graduationYear: z.string().min(4, "Enter graduation year").max(4),
  fieldOfStudy: z.string().min(2, "Enter your field of study").max(160),
  gradeResult: z.string().min(1, "Enter your grade or result").max(80),
});

export const studyPreferencesSchema = z.object({
  studyLevel: z.string().min(1, "Select study level"),
  preferredCourse: z.string().min(2, "Enter your preferred course").max(160),
  desiredUniversity: z.string().min(1, "Select a university"),
  preferredIntake: z.string().min(1, "Select preferred intake"),
});

export const documentsSchema = z.object({
  hasPassport: z.boolean().refine((value) => value === true, {
    message: "You need a valid passport to apply",
  }),
  hasTranscript: z.boolean().refine((value) => value === true, {
    message: "Please confirm you have your transcripts ready",
  }),
  additionalNotes: z.string().max(1000).optional().or(z.literal("")),
  agreedToTerms: z.boolean().refine((value) => value === true, {
    message: "Please confirm the information is correct",
  }),
});

export const applySchema = personalDetailsSchema
  .merge(academicHistorySchema)
  .merge(studyPreferencesSchema)
  .merge(documentsSchema)
  .extend({
    company: z.string().max(0).optional().or(z.literal("")),
  });

export type ApplyFormData = z.infer<typeof applySchema>;

export const applyStepSchemas = [
  personalDetailsSchema,
  academicHistorySchema,
  studyPreferencesSchema,
  documentsSchema,
] as const;

export const applyStepFields: Record<number, (keyof ApplyFormData)[]> = {
  1: [
    "firstName",
    "lastName",
    "phoneCountryCode",
    "phoneNumber",
    "email",
    "dateOfBirth",
    "gender",
    "countryOfResidence",
    "nationality",
    "currentAddress",
  ],
  2: [
    "highestQualification",
    "institutionName",
    "graduationYear",
    "fieldOfStudy",
    "gradeResult",
  ],
  3: ["studyLevel", "preferredCourse", "desiredUniversity", "preferredIntake"],
  4: ["hasPassport", "hasTranscript", "additionalNotes", "agreedToTerms"],
};
