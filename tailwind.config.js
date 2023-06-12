/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primaryColor: "#169639",
        primaryColorLight: "#F2FFF5",
        primaryColorHover: "#3BB85D",
        borderPrimary: "#7ac88f",
        primaryColorLighter: "#F1FFE4",
        extraLightGreen: "#d0edd8",
        grayNeutral: "#767D8D",
        grayNeutralSec: "#ADB5BD",
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
        gray600: "#636366",
        dark: "#333",
        dark100: "#111",
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
        ".hoverShadow": {
          boxShadow: " inset 0 0 0 0.15rem #d0edd8 !important",
        },
        ".postBorderDark": {
          borderRight: "0.5px solid #232323",
        },
        ".postBorderLight": {
          borderRight: "0.5px solid #e5e7eb",
        },
        ".postBorderBDark": {
          borderBottom: "0.1px solid #232323",
        },
        ".postBorderBLight": {
          borderBottom: "0.1px solid #e5e7eb",
        },
        ".postBorderLDark": {
          color: "0.5px solid #232323",
        },
        ".postBorderLLight": {
          color: "0.5px solid #e5e7eb",
        },
        ".mWidth": {
          maxWidth: "200px",
        },
      });
    },
  ],
};
