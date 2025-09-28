
/**
 * === FILE: tailwind.config.ts ===
 *
 * Short File Summary:
 * - TailwindCSS configuration extending the default theme for an eco-friendly palette and UI primitives.
 * - Enables class-based dark mode and scans project folders for class usage.
 * - Adds custom keyframes/animations and hooks in `tailwindcss-animate`.
 *
 * Main exports:
 * - default Config: Tailwind configuration object (satisfies Config).
 *
 * External deps & important imports:
 * - tailwindcss: type Config for type-safe configuration.
 * - tailwindcss-animate: plugin for animation utilities.
 *
 * Assumptions:
 * - CSS variables (e.g., --primary) are defined in src/index.css to be consumed via HSL.
 * - Content globs match Vite + React project structure.
 */

import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"], // Dark mode toggled by adding `.dark` to <html> or <body>
  content: [
    // Directories to scan for class names
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem", // Magic number: aligns with design spacing scale
      screens: {
        "2xl": "1400px" // Max container width on very large screens
      }
    },
    extend: {
      // Color tokens map to CSS variables declared in index.css
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))"
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))"
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))"
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))"
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))"
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))"
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))"
        },
      },
      fontFamily: {
        'body': ['Poppins', 'sans-serif'],
        'display': ['Sora', 'sans-serif'],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)"
      },
      keyframes: {
        // For accordion transitions compatible with Radix UI primitives
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      }
    }
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
