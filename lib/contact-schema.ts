import { z } from "zod";

export const contactSchema = z.object({
  name: z
    .string()
    .min(2, "Please enter your full name")
    .max(120, "Name is too long"),
  email: z.string().email("Please enter a valid email address"),
  phone: z
    .string()
    .min(7, "Please enter a valid phone number")
    .max(20, "Phone number is too long")
    .regex(/^[+\d][\d\s\-()]+$/, "Please enter a valid phone number"),
  preferredCourse: z.string().max(160).optional().or(z.literal("")),
  desiredUniversity: z.string().max(160).optional().or(z.literal("")),
  message: z
    .string()
    .min(10, "Tell us a little more (at least 10 characters)")
    .max(2000, "Message is too long"),
  /** Honeypot field, must stay empty. */
  company: z.string().max(0).optional().or(z.literal("")),
});

export type ContactFormData = z.infer<typeof contactSchema>;
