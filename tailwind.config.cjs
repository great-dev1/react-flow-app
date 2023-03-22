/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        orange: "#eb8e50",
        lightGrey: " #a0a0a0",
        middleGrey: "#606060",
        darkGrey: "#333333",
        white: "#ffffff"
      }
    },
  },
  plugins: [],
};
