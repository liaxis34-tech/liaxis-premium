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
        blush: {
          50: "#FDF8F8",
          100: "#F4E8E9",
          200: "#EDD9DA",
          300: "#E4C7C9",
          400: "#D9B6B8",
          DEFAULT: "#D9B6B8",
          500: "#CBA0A2",
          600: "#B98487",
          700: "#9C666A",
        },
        gold: {
          DEFAULT: "#D4AF37",
          light: "#E6CB74",
          dark: "#AC8A26",
        },
        ink: {
          DEFAULT: "#4B4B4B",
          soft: "#6E6E6E",
          faint: "#9B9B9B",
          deep: "#2E2C2C",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        sans: ["var(--font-sans)", "sans-serif"],
      },
      letterSpacing: {
        widest2: "0.28em",
        widest3: "0.36em",
      },
      backgroundImage: {
        "gold-sheen":
          "linear-gradient(120deg, #AC8A26 0%, #E6CB74 35%, #F7E9BE 50%, #E6CB74 65%, #AC8A26 100%)",
        "blush-radial":
          "radial-gradient(120% 120% at 50% 0%, #FDF8F8 0%, #F4E8E9 55%, #EDD9DA 100%)",
      },
      boxShadow: {
        luxe: "0 40px 100px -40px rgba(217,182,184,0.55)",
        glass: "0 8px 32px -8px rgba(75,75,75,0.12)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-16px) rotate(2deg)" },
        },
        floatSlow: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-24px)" },
        },
        drift: {
          "0%": { transform: "translate(0, 0) rotate(0deg)" },
          "50%": { transform: "translate(12px, -18px) rotate(8deg)" },
          "100%": { transform: "translate(0, 0) rotate(0deg)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "200% 50%" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        sparkle: {
          "0%, 100%": { opacity: "0.3", transform: "scale(0.9)" },
          "50%": { opacity: "1", transform: "scale(1.1)" },
        },
      },
      animation: {
        float: "float 7s ease-in-out infinite",
        floatSlow: "floatSlow 9s ease-in-out infinite",
        drift: "drift 12s ease-in-out infinite",
        shimmer: "shimmer 3s linear infinite",
        marquee: "marquee 32s linear infinite",
        sparkle: "sparkle 4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
