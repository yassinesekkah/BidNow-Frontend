/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "#4F46E5",
          secondary: "#06B6D4",
          background: "#F9FAFB",
          text: "#111827",
        },
      },
      fontFamily: {
        sans: ["'Plus Jakarta Sans'", "'Segoe UI'", "sans-serif"],
        display: ["'Outfit'", "'Plus Jakarta Sans'", "sans-serif"],
      },
      boxShadow: {
        soft: "0 10px 30px -14px rgba(17, 24, 39, 0.18)",
      },
      keyframes: {
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-in-up": "fade-in-up 0.5s ease-out",
      },
    },
  },
  plugins: [],
};
