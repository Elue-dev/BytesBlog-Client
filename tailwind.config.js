/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primaryColor: "#169639",
        primaryColorLight: "#F2FFF5",
        primaryColorHover: "#3BB85D",
        primaryColorLighter: "#F1FFE4",
        grayNeutral: "#767D8D",
        brightGreen: "#b6e4c2",
        lightTextColor: "#8E8E93",
        blackNeutral: "#07080A",
        blackNeutralSec: "#495057",
        lightGray: "#B6B6B6",
        lighterGray: "#767D8D",
        lightGraySec: "#E9ECEF",
        lightText: "#555",
        grayLight: "#8791A7",
        gray500: "#48484A",
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
        ".checker-style": {
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          gap: ".5rem",
          padding: ".5rem",
          borderRadius: "0.125rem",
          backgroundColor: "#F1FFE4",
          color: "#169639",
        },
      });
    },
  ],
};
