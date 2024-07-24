/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html"],
  theme: {
    fontFamily: {
      display: ["Telegraf", "system-ui", "sans-serif"],
    },
    extend: {
      colors: {
        holdeman: {
          50: "#fff4f1",
          100: "#ffe6e1",
          200: "#ffd2c8",
          300: "#ffb2a1",
          400: "#fe7557",
          DEFAULT: "#fe7557",
          500: "#f75e3c",
          600: "#e4421e",
          700: "#c03415",
          800: "#9f2e15",
          900: "#832c19",
          950: "#481307",
        },
      },
    },
  },
  plugins: [],
};
