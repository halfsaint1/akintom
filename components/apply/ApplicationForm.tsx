"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  FileText,
  Globe,
  Loader2,
  User,
} from "lucide-react";
import {
  applySchema,
  applyStepFields,
  applyStepSchemas,
  type ApplyFormData,
} from "@/lib/apply-schema";
import {
  otherUkUniversityNames,
  partnerUniversityNames,
} from "@/lib/data/uk-university-options";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const inputClasses =
  "w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-ink placeholder:text-slate-400 transition-colors focus:border-navy focus:outline-none focus:ring-2 focus:ring-navy/15";

const steps = [
  { id: 1, label: "Personal Details", icon: User },
  { id: 2, label: "Academic History", icon: BookOpen },
  { id: 3, label: "Study Preferences", icon: Globe },
  { id: 4, label: "Documents", icon: FileText },
] as const;

const countryCodes = [
  { code: "+234", label: "NG +234" },
  { code: "+233", label: "GH +233" },
  { code: "+44", label: "UK +44" },
  { code: "+1", label: "US +1" },
];

const countries = [
  "Nigeria",
  "Ghana",
  "United Kingdom",
  "United States",
  "Canada",
  "Other",
];

const defaultValues: ApplyFormData = {
  firstName: "",
  lastName: "",
  phoneCountryCode: "+234",
  phoneNumber: "",
  email: "",
  dateOfBirth: "",
  gender: "",
  countryOfResidence: "Nigeria",
  nationality: "Nigerian",
  currentAddress: "",
  highestQualification: "",
  institutionName: "",
  graduationYear: "",
  fieldOfStudy: "",
  gradeResult: "",
  studyLevel: "",
  preferredCourse: "",
  desiredUniversity: "",
  preferredIntake: "",
  hasPassport: false,
  hasTranscript: false,
  additionalNotes: "",
  agreedToTerms: false,
  company: "",
};

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p role="alert" className="mt-1.5 text-xs font-medium text-red-600">
      {message}
    </p>
  );
}

function Label({
  htmlFor,
  children,
  required,
}: {
  htmlFor: string;
  children: React.ReactNode;
  required?: boolean;
}) {
  return (
    <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-medium text-slate-700">
      {children}
      {required ? <span className="text-red-500"> *</span> : null}
    </label>
  );
}

export function ApplicationForm() {
  const [step, setStep] = useState(1);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const {
    register,
    getValues,
    reset,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<ApplyFormData>({
    defaultValues,
    shouldUnregister: false,
  });

  const validateStep = (stepIndex: number) => {
    const schema = applyStepSchemas[stepIndex - 1];
    const result = schema.safeParse(getValues());

    if (result.success) {
      clearErrors(applyStepFields[stepIndex]);
      return true;
    }

    applyStepFields[stepIndex].forEach((field) => clearErrors(field));

    result.error.issues.forEach((issue) => {
      const field = issue.path[0];
      if (typeof field === "string") {
        setError(field as keyof ApplyFormData, { message: issue.message });
      }
    });

    return false;
  };

  const goNext = () => {
    if (validateStep(step)) {
      setStep((s) => Math.min(s + 1, 4));
    }
  };

  const goBack = () => setStep((s) => Math.max(s - 1, 1));

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("idle");

    if (!validateStep(4)) return;

    const result = applySchema.safeParse(getValues());
    if (!result.success) {
      result.error.issues.forEach((issue) => {
        const field = issue.path[0];
        if (typeof field === "string") {
          setError(field as keyof ApplyFormData, { message: issue.message });
        }
      });
      return;
    }

    try {
      const res = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result.data),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      reset(defaultValues);
      setStep(1);
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div
        role="status"
        className="rounded-3xl border border-success/20 bg-white p-12 text-center shadow-soft"
      >
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-success/10">
          <CheckCircle2 className="h-8 w-8 text-success" aria-hidden="true" />
        </span>
        <h2 className="mt-6 font-display text-2xl font-bold text-navy">
          Application received
        </h2>
        <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-graphite">
          Thank you for applying. An expert will review your details and contact
          you shortly.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 text-sm font-semibold text-navy underline decoration-gold underline-offset-4"
        >
          Submit another application
        </button>
      </div>
    );
  }

  const currentStep = steps[step - 1];
  const StepIcon = currentStep.icon;

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-soft">
      <div className="border-b border-slate-100 bg-slate-50/80 px-6 py-8 md:px-10">
        <div className="mx-auto flex max-w-3xl items-start justify-between">
          {steps.map((s, index) => {
            const Icon = s.icon;
            const isActive = step === s.id;
            const isComplete = step > s.id;
            return (
              <div key={s.id} className="flex flex-1 flex-col items-center">
                <div className="flex w-full items-center">
                  {index > 0 ? (
                    <div
                      className={cn(
                        "h-0.5 flex-1",
                        isComplete ? "bg-navy" : "bg-slate-200",
                      )}
                      aria-hidden="true"
                    />
                  ) : (
                    <div className="flex-1" aria-hidden="true" />
                  )}
                  <span
                    className={cn(
                      "flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 transition-colors",
                      isActive || isComplete
                        ? "border-navy bg-navy text-white"
                        : "border-slate-200 bg-white text-slate-400",
                    )}
                  >
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  {index < steps.length - 1 ? (
                    <div
                      className={cn(
                        "h-0.5 flex-1",
                        step > s.id ? "bg-navy" : "bg-slate-200",
                      )}
                      aria-hidden="true"
                    />
                  ) : (
                    <div className="flex-1" aria-hidden="true" />
                  )}
                </div>
                <p
                  className={cn(
                    "mt-3 hidden text-center text-xs font-semibold sm:block",
                    isActive ? "text-navy" : "text-slate-400",
                  )}
                >
                  {s.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex items-center justify-between border-b border-slate-100 bg-sky-50/60 px-6 py-5 md:px-10">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-navy/10 text-navy">
            <StepIcon className="h-4 w-4" aria-hidden="true" />
          </span>
          <h2 className="font-display text-lg font-bold text-navy md:text-xl">
            {currentStep.label}
          </h2>
        </div>
        <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-navy shadow-sm">
          {step} / 4
        </span>
      </div>

      <form onSubmit={onSubmit} noValidate className="px-6 py-8 md:px-10 md:py-10">
        {step === 1 ? (
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <Label htmlFor="firstName" required>
                First Name
              </Label>
              <input
                id="firstName"
                type="text"
                placeholder="Enter first name"
                className={cn(inputClasses, errors.firstName && "border-red-400")}
                {...register("firstName")}
              />
              <FieldError message={errors.firstName?.message} />
            </div>
            <div>
              <Label htmlFor="lastName" required>
                Last Name
              </Label>
              <input
                id="lastName"
                type="text"
                placeholder="Enter last name"
                className={cn(inputClasses, errors.lastName && "border-red-400")}
                {...register("lastName")}
              />
              <FieldError message={errors.lastName?.message} />
            </div>
            <div>
              <Label htmlFor="phoneNumber" required>
                Phone Number
              </Label>
              <div className="flex gap-2">
                <select
                  className={cn(inputClasses, "w-28 shrink-0")}
                  {...register("phoneCountryCode")}
                >
                  {countryCodes.map((c) => (
                    <option key={c.code} value={c.code}>
                      {c.label}
                    </option>
                  ))}
                </select>
                <input
                  id="phoneNumber"
                  type="tel"
                  placeholder="800 000 0000"
                  className={cn(inputClasses, errors.phoneNumber && "border-red-400")}
                  {...register("phoneNumber")}
                />
              </div>
              <FieldError message={errors.phoneNumber?.message} />
            </div>
            <div>
              <Label htmlFor="email" required>
                Email Address
              </Label>
              <input
                id="email"
                type="email"
                placeholder="Enter email"
                className={cn(inputClasses, errors.email && "border-red-400")}
                {...register("email")}
              />
              <FieldError message={errors.email?.message} />
            </div>
            <div>
              <Label htmlFor="dateOfBirth" required>
                Date of Birth
              </Label>
              <input
                id="dateOfBirth"
                type="date"
                className={cn(inputClasses, errors.dateOfBirth && "border-red-400")}
                {...register("dateOfBirth")}
              />
              <FieldError message={errors.dateOfBirth?.message} />
            </div>
            <div>
              <Label htmlFor="gender" required>
                Gender
              </Label>
              <select
                id="gender"
                className={cn(inputClasses, errors.gender && "border-red-400")}
                {...register("gender")}
              >
                <option value="">Select gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Prefer not to say">Prefer not to say</option>
              </select>
              <FieldError message={errors.gender?.message} />
            </div>
            <div>
              <Label htmlFor="countryOfResidence" required>
                Country of Residence
              </Label>
              <select
                id="countryOfResidence"
                className={cn(inputClasses, errors.countryOfResidence && "border-red-400")}
                {...register("countryOfResidence")}
              >
                {countries.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
              <FieldError message={errors.countryOfResidence?.message} />
            </div>
            <div>
              <Label htmlFor="nationality" required>
                Nationality
              </Label>
              <input
                id="nationality"
                type="text"
                placeholder="Your nationality"
                className={cn(inputClasses, errors.nationality && "border-red-400")}
                {...register("nationality")}
              />
              <FieldError message={errors.nationality?.message} />
            </div>
            <div className="sm:col-span-2">
              <Label htmlFor="currentAddress" required>
                Current Address
              </Label>
              <input
                id="currentAddress"
                type="text"
                placeholder="Street, City, Country"
                className={cn(inputClasses, errors.currentAddress && "border-red-400")}
                {...register("currentAddress")}
              />
              <FieldError message={errors.currentAddress?.message} />
            </div>
          </div>
        ) : null}

        {step === 2 ? (
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <Label htmlFor="highestQualification" required>
                Highest Qualification
              </Label>
              <select
                id="highestQualification"
                className={cn(inputClasses, errors.highestQualification && "border-red-400")}
                {...register("highestQualification")}
              >
                <option value="">Select qualification</option>
                <option value="WAEC/NECO">WAEC / NECO</option>
                <option value="ND">National Diploma (ND)</option>
                <option value="HND">Higher National Diploma (HND)</option>
                <option value="BSc/BA">Bachelor&apos;s Degree</option>
                <option value="MSc/MA">Master&apos;s Degree</option>
                <option value="Other">Other</option>
              </select>
              <FieldError message={errors.highestQualification?.message} />
            </div>
            <div>
              <Label htmlFor="graduationYear" required>
                Year of Graduation
              </Label>
              <input
                id="graduationYear"
                type="text"
                inputMode="numeric"
                placeholder="e.g. 2024"
                className={cn(inputClasses, errors.graduationYear && "border-red-400")}
                {...register("graduationYear")}
              />
              <FieldError message={errors.graduationYear?.message} />
            </div>
            <div className="sm:col-span-2">
              <Label htmlFor="institutionName" required>
                School / Institution Name
              </Label>
              <input
                id="institutionName"
                type="text"
                placeholder="Enter institution name"
                className={cn(inputClasses, errors.institutionName && "border-red-400")}
                {...register("institutionName")}
              />
              <FieldError message={errors.institutionName?.message} />
            </div>
            <div>
              <Label htmlFor="fieldOfStudy" required>
                Field of Study
              </Label>
              <input
                id="fieldOfStudy"
                type="text"
                placeholder="e.g. Business Administration"
                className={cn(inputClasses, errors.fieldOfStudy && "border-red-400")}
                {...register("fieldOfStudy")}
              />
              <FieldError message={errors.fieldOfStudy?.message} />
            </div>
            <div>
              <Label htmlFor="gradeResult" required>
                Grade / Result
              </Label>
              <input
                id="gradeResult"
                type="text"
                placeholder="e.g. 2:1, Distinction, 6 credits"
                className={cn(inputClasses, errors.gradeResult && "border-red-400")}
                {...register("gradeResult")}
              />
              <FieldError message={errors.gradeResult?.message} />
            </div>
          </div>
        ) : null}

        {step === 3 ? (
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <Label htmlFor="studyLevel" required>
                Study Level
              </Label>
              <select
                id="studyLevel"
                className={cn(inputClasses, errors.studyLevel && "border-red-400")}
                {...register("studyLevel")}
              >
                <option value="">Select level</option>
                <option value="Foundation">Foundation</option>
                <option value="Undergraduate">Undergraduate</option>
                <option value="Postgraduate">Postgraduate</option>
              </select>
              <FieldError message={errors.studyLevel?.message} />
            </div>
            <div>
              <Label htmlFor="preferredIntake" required>
                Preferred Intake
              </Label>
              <select
                id="preferredIntake"
                className={cn(inputClasses, errors.preferredIntake && "border-red-400")}
                {...register("preferredIntake")}
              >
                <option value="">Select intake</option>
                <option value="September 2026">September 2026</option>
                <option value="January 2027">January 2027</option>
                <option value="September 2027">September 2027</option>
              </select>
              <FieldError message={errors.preferredIntake?.message} />
            </div>
            <div className="sm:col-span-2">
              <Label htmlFor="preferredCourse" required>
                Preferred Course
              </Label>
              <input
                id="preferredCourse"
                type="text"
                placeholder="e.g. MSc Data Science"
                className={cn(inputClasses, errors.preferredCourse && "border-red-400")}
                {...register("preferredCourse")}
              />
              <FieldError message={errors.preferredCourse?.message} />
            </div>
            <div className="sm:col-span-2">
              <Label htmlFor="desiredUniversity" required>
                Desired University
              </Label>
              <select
                id="desiredUniversity"
                className={cn(inputClasses, errors.desiredUniversity && "border-red-400")}
                {...register("desiredUniversity")}
              >
                <option value="">Select university</option>
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
              <FieldError message={errors.desiredUniversity?.message} />
            </div>
          </div>
        ) : null}

        {step === 4 ? (
          <div className="space-y-6">
            <p className="text-sm leading-7 text-graphite">
              Confirm you have the documents below ready. Your expert will
              request copies after reviewing your application.
            </p>
            <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-slate-200 p-4">
              <input
                type="checkbox"
                className="mt-1 h-4 w-4 rounded border-slate-300 text-navy focus:ring-navy/20"
                {...register("hasPassport")}
              />
              <span>
                <span className="block text-sm font-semibold text-navy">
                  Valid international passport
                </span>
                <span className="mt-1 block text-xs text-graphite">
                  Must be valid for at least 6 months beyond your planned travel date.
                </span>
              </span>
            </label>
            <FieldError message={errors.hasPassport?.message} />

            <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-slate-200 p-4">
              <input
                type="checkbox"
                className="mt-1 h-4 w-4 rounded border-slate-300 text-navy focus:ring-navy/20"
                {...register("hasTranscript")}
              />
              <span>
                <span className="block text-sm font-semibold text-navy">
                  Academic transcripts and certificates
                </span>
                <span className="mt-1 block text-xs text-graphite">
                  WAEC/NECO, degree certificate, or HND result as applicable.
                </span>
              </span>
            </label>
            <FieldError message={errors.hasTranscript?.message} />

            <div>
              <Label htmlFor="additionalNotes">Additional Notes</Label>
              <textarea
                id="additionalNotes"
                rows={4}
                placeholder="Anything else you want us to know"
                className={cn(inputClasses, "resize-y")}
                {...register("additionalNotes")}
              />
            </div>

            <label className="flex cursor-pointer items-start gap-3">
              <input
                type="checkbox"
                className="mt-1 h-4 w-4 rounded border-slate-300 text-navy focus:ring-navy/20"
                {...register("agreedToTerms")}
              />
              <span className="text-sm text-graphite">
                I confirm the information provided is correct and I agree to be
                contacted by Akintom about my application.
              </span>
            </label>
            <FieldError message={errors.agreedToTerms?.message} />
          </div>
        ) : null}

        <div className="hidden" aria-hidden="true">
          <input type="text" tabIndex={-1} autoComplete="off" {...register("company")} />
        </div>

        {status === "error" ? (
          <p
            role="alert"
            className="mt-6 rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700"
          >
            Something went wrong. Please try again or contact us on WhatsApp.
          </p>
        ) : null}

        <div className="mt-10 flex items-center justify-between gap-4">
          {step > 1 ? (
            <Button type="button" variant="ghost" onClick={goBack}>
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Back
            </Button>
          ) : (
            <div />
          )}

          {step < 4 ? (
            <Button type="button" variant="navy" onClick={goNext} className="ml-auto">
              Continue
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
          ) : (
            <Button type="submit" variant="navy" disabled={isSubmitting} className="ml-auto">
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                  Submitting…
                </>
              ) : (
                <>
                  Submit Application
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </>
              )}
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}
