import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#070B14",
        card: "rgba(255,255,255,0.05)",
        line: "rgba(255,255,255,0.08)",
        primary: "#4F7CFF",
        success: "#22C55E",
        warning: "#F59E0B",
        danger: "#EF4444"
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(255,255,255,0.08), 0 20px 80px rgba(79,124,255,0.16)",
        ember: "0 0 30px rgba(245,158,11,0.36)"
      },
      backdropBlur: {
        glass: "20px"
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"]
      },
      screens: {
        xs: "320px",
        "3xl": "1920px"
      }
    }
  },
  plugins: []
} satisfies Config;
