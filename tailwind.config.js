/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primaryColor: "#169639",
        primaryColorLight: "#F2FFF5",
        primaryColorLighter: "#F1FFE4",
        lightTextColor: "#8E8E93",
        blackNeutral: "#07080A",
        lightGray: "#B6B6B6",
        lighterGray: "#767D8D",
        lightGraySec: "#E9ECEF",
        lightText: "#555",
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        ".form-text": {
          position: "absolute",
          bottom: "1.95rem",
          left: "1rem",
          backgroundColor: "white",
          padding: "0.25rem",
          color: "var(--blackNeutral)",
        },
      });
    },
  ],
};
