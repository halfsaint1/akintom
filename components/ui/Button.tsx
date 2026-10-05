import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "group inline-flex min-h-12 items-center justify-center gap-2.5 rounded-full px-7 text-[15px] font-semibold transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold disabled:pointer-events-none disabled:opacity-60",
  {
    variants: {
      variant: {
        primary:
          "bg-gold text-navy shadow-soft hover:bg-gold-soft hover:shadow-glow",
        navy: "bg-navy text-white hover:bg-navy-soft",
        "outline-dark":
          "border border-navy/25 bg-transparent text-navy hover:border-navy hover:bg-navy hover:text-white",
        "outline-light":
          "glass text-white hover:border-white/45 hover:bg-white/20",
        whatsapp: "bg-success text-white hover:brightness-110",
        ghost: "text-navy hover:bg-mist",
      },
      size: {
        default: "min-h-12 px-7",
        lg: "min-h-14 px-9 text-base",
        sm: "min-h-10 px-5 text-sm",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  },
);

type ButtonVariants = VariantProps<typeof buttonVariants>;

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    ButtonVariants {}

export function Button({ className, variant, size, ...props }: ButtonProps) {
  return (
    <button className={cn(buttonVariants({ variant, size }), className)} {...props} />
  );
}

interface ButtonLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement>,
    ButtonVariants {
  href: string;
  external?: boolean;
}

export function ButtonLink({
  className,
  variant,
  size,
  href,
  external,
  children,
  ...props
}: ButtonLinkProps) {
  const classes = cn(buttonVariants({ variant, size }), className);
  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
        {...props}
      >
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={classes} {...props}>
      {children}
    </Link>
  );
}
