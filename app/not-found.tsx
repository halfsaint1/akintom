import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] items-center bg-navy pt-20">
      <div className="container-luxe py-24 text-center">
        <p className="eyebrow justify-center text-gold">404</p>
        <h1 className="display-title mt-6 font-bold text-white">
          This page took a gap year.
        </h1>
        <p className="mx-auto mt-5 max-w-md text-lg leading-8 text-white/70">
          The page you&apos;re looking for doesn&apos;t exist, but your UK
          plans are still on track.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <ButtonLink href="/" variant="primary" size="lg">
            Back to Home
          </ButtonLink>
          <ButtonLink href="/contact" variant="outline-light" size="lg">
            Book a Consultation
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
