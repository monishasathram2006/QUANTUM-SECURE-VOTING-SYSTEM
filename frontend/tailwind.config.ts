import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        night: {
          950: "#05070f",
          900: "#0a1124",
          850: "#0d1630",
          800: "#101b3d",
        },
        neon: {
          blue: "#2ea8ff",
          cyan: "#4df3ff",
          purple: "#7b5cff",
          magenta: "#ff4fd8",
        },
        glass: "rgba(12, 19, 36, 0.65)",
        border: "rgba(255, 255, 255, 0.08)",
      },
      boxShadow: {
        glow: "0 0 35px rgba(46, 168, 255, 0.35)",
        neon: "0 0 18px rgba(77, 243, 255, 0.45)",
        violet: "0 0 22px rgba(123, 92, 255, 0.4)",
      },
      backgroundImage: {
        "quantum-radial":
          "radial-gradient(circle at 20% 20%, rgba(46, 168, 255, 0.25), transparent 55%), radial-gradient(circle at 80% 30%, rgba(123, 92, 255, 0.22), transparent 50%), radial-gradient(circle at 50% 80%, rgba(77, 243, 255, 0.18), transparent 55%)",
        "grid-lines":
          "linear-gradient(transparent 96%, rgba(255, 255, 255, 0.04) 98%), linear-gradient(90deg, transparent 96%, rgba(255, 255, 255, 0.04) 98%)",
      },
      keyframes: {
        "pulse-glow": {
          "0%, 100%": { opacity: "0.55", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.04)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        scan: {
          "0%": { transform: "translateY(-20%)", opacity: "0" },
          "50%": { opacity: "1" },
          "100%": { transform: "translateY(120%)", opacity: "0" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        orbit: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
      animation: {
        "pulse-glow": "pulse-glow 3.5s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
        scan: "scan 2.8s ease-in-out infinite",
        shimmer: "shimmer 2.2s linear infinite",
        orbit: "orbit 12s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
