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
        cream: {
          DEFAULT: "#FBF6ED",
          soft: "#F5ECDC",
          deep: "#EBDCC0",
        },
        blush: {
          50: "#FCF0EC",
          100: "#F6DCD3",
          200: "#EFC4B6",
          300: "#E4A897",
          400: "#D68E7B",
          500: "#C17862",
          600: "#9E5E4C",
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
          DEFAULT: "#231C18",
          soft: "#332922",
          faint: "#5C4F45",
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
        "blush-sheen":
          "linear-gradient(120deg, #C17862 0%, #EFC4B6 35%, #FBF6ED 50%, #EFC4B6 65%, #C17862 100%)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-14px)" },
        },
        drift: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-18px) rotate(6deg)" },
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
        drift: "drift 8s ease-in-out infinite",
        shimmer: "shimmer 3s linear infinite",
        marquee: "marquee 30s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
