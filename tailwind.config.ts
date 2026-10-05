import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#0B1F4D",
          deep: "#081738",
          soft: "#13295E",
        },
        gold: {
          DEFAULT: "#D4AF37",
          soft: "#E6C75C",
          faint: "#F7EFD8",
        },
        mist: "#F5F7FA",
        ink: "#111827",
        graphite: "#4B5563",
        success: "#16A34A",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 2px 16px -4px rgba(11, 31, 77, 0.08)",
        lift: "0 18px 40px -16px rgba(11, 31, 77, 0.22)",
        glow: "0 0 0 1px rgba(212, 175, 55, 0.35), 0 14px 36px -12px rgba(212, 175, 55, 0.35)",
      },
      borderRadius: {
        "4xl": "2rem",
      },
      letterSpacing: {
        eyebrow: "0.18em",
      },
      maxWidth: {
        container: "80rem",
      },
    },
  },
  plugins: [],
};

export default config;
