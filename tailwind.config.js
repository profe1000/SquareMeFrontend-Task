/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "blue-900": "rgba(57, 118, 232, 1)",
        "blue-500": " rgba(91, 148, 254, 1)",
      },
    },
  },
  plugins: [],
};
