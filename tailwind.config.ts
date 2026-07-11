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
        ivory: {
          DEFAULT: "#FAF7F1",
          soft: "#F4EFE6",
          deep: "#EDE5D6",
        },
        beige: {
          50: "#FAF6EF",
          100: "#F2E9DA",
          200: "#E6D6BC",
          300: "#D8C39F",
          400: "#C9AD81",
          500: "#B99966",
          600: "#9E7F51",
        },
        champagne: {
          DEFAULT: "#D9BE8F",
          light: "#E7D4AC",
          dark: "#B7935C",
        },
        gold: {
          DEFAULT: "#B08D57",
          light: "#CBA872",
          dark: "#8A6A3E",
        },
        ink: {
          DEFAULT: "#1A1712",
          soft: "#2A2620",
          faint: "#4A443B",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        sans: ["var(--font-sans)", "sans-serif"],
      },
      letterSpacing: {
        widest2: "0.28em",
      },
      backgroundImage: {
        "gold-sheen":
          "linear-gradient(120deg, #B99966 0%, #E7D4AC 35%, #F4EFE6 50%, #E7D4AC 65%, #B99966 100%)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-14px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "200% 50%" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        shimmer: "shimmer 3s linear infinite",
        marquee: "marquee 30s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
