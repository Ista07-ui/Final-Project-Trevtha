import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#D4AF37", // Metallic Gold
        accent: "#D4AF37", // Metallic Gold
        charcoal: "#2F2F2F",
        "background-light": "#f8f7f6",
        "background-dark": "#201d12",
      },
      fontFamily: {
        display: ["Plus Jakarta Sans", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "8px",
        lg: "12px",
        xl: "16px",
        full: "9999px",
      },
    },
  },
  plugins: [],
};

export default config;
