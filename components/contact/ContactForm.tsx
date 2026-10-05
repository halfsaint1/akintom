"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader2 } from "lucide-react";
import { contactSchema, type ContactFormData } from "@/lib/contact-schema";
import { Button } from "@/components/ui/Button";
import {
  otherUkUniversityNames,
  partnerUniversityNames,
} from "@/lib/data/uk-university-options";
import { cn } from "@/lib/utils";

const inputClasses =
  "w-full rounded-xl border border-navy/15 bg-white px-4 py-3 text-sm text-ink placeholder:text-graphite/60 transition-colors focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/30";

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p role="alert" className="mt-1.5 text-xs font-medium text-red-600">
      {message}
    </p>
  );
}

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setStatus("idle");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div
        role="status"
        className="flex h-full flex-col items-center justify-center rounded-2xl border border-success/20 bg-success/5 p-12 text-center"
      >
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-success/10">
          <CheckCircle2 className="h-8 w-8 text-success" aria-hidden="true" />
        </span>
        <h3 className="mt-6 font-display text-2xl font-bold text-navy">
          Thank you, we&apos;ve received your enquiry.
        </h3>
        <p className="mt-3 max-w-sm text-sm leading-7 text-graphite">
          An expert will contact you within one business day. For an instant
          response, message us on WhatsApp.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 text-sm font-semibold text-navy underline decoration-gold underline-offset-4"
        >
          Send another enquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="grid gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm font-semibold text-navy">
            Full Name <span className="text-red-600">*</span>
          </label>
          <input
            id="name"
            type="text"
            autoComplete="name"
            placeholder="e.g. Adaeze Okonkwo"
            aria-invalid={!!errors.name}
            className={cn(inputClasses, errors.name && "border-red-400")}
            {...register("name")}
          />
          <FieldError message={errors.name?.message} />
        </div>
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-semibold text-navy">
            Email Address <span className="text-red-600">*</span>
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            aria-invalid={!!errors.email}
            className={cn(inputClasses, errors.email && "border-red-400")}
            {...register("email")}
          />
          <FieldError message={errors.email?.message} />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="phone" className="mb-1.5 block text-sm font-semibold text-navy">
            Phone (WhatsApp preferred) <span className="text-red-600">*</span>
          </label>
          <input
            id="phone"
            type="tel"
            autoComplete="tel"
            placeholder="+234 800 000 0000"
            aria-invalid={!!errors.phone}
            className={cn(inputClasses, errors.phone && "border-red-400")}
            {...register("phone")}
          />
          <FieldError message={errors.phone?.message} />
        </div>
        <div>
          <label
            htmlFor="preferredCourse"
            className="mb-1.5 block text-sm font-semibold text-navy"
          >
            Preferred Course
          </label>
          <input
            id="preferredCourse"
            type="text"
            placeholder="e.g. MSc Data Science"
            className={inputClasses}
            {...register("preferredCourse")}
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="desiredUniversity"
          className="mb-1.5 block text-sm font-semibold text-navy"
        >
          Desired University
        </label>
        <select
          id="desiredUniversity"
          className={inputClasses}
          defaultValue=""
          {...register("desiredUniversity")}
        >
          <option value="">Not sure yet, advise me</option>
          <optgroup label="Partner universities">
            {partnerUniversityNames.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </optgroup>
          <optgroup label="Other UK universities">
            {otherUkUniversityNames.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </optgroup>
          <option value="Other">Another UK university</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-semibold text-navy">
          Your Message <span className="text-red-600">*</span>
        </label>
        <textarea
          id="message"
          rows={5}
          placeholder="Tell us about your academic background, target intake, and any questions."
          aria-invalid={!!errors.message}
          className={cn(inputClasses, "resize-y", errors.message && "border-red-400")}
          {...register("message")}
        />
        <FieldError message={errors.message?.message} />
      </div>

      {/* Honeypot field hidden from real users */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="company">Company</label>
        <input id="company" type="text" tabIndex={-1} autoComplete="off" {...register("company")} />
      </div>

      {status === "error" ? (
        <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          Something went wrong sending your enquiry. Please try again, or reach
          us directly on WhatsApp.
        </p>
      ) : null}

      <Button type="submit" size="lg" disabled={isSubmitting} className="justify-self-start">
        {isSubmitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            Sending…
          </>
        ) : (
          "Request Free Consultation"
        )}
      </Button>
      <p className="text-xs leading-6 text-graphite">
        We respond within one business day. Your details are only used to
        contact you about your enquiry. They are never sold or shared.
      </p>
    </form>
  );
}
