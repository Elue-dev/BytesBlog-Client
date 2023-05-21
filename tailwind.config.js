/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primaryColor: "#169639",
        primaryColorLight: "#F2FFF5",
        lightTextColor: "#8E8E93",
        blackNeutral: "#07080A",
        lightGray: "#B6B6B6",
      },
    },
  },
  plugins: [],
};
