/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        purple: "#5F00D9",
        gray: "#F3F3F7",
        grey: "#797E82",
        darkgray: "#535D66",
        green: "#059669",
      },
    },
  },
  plugins: [],
};
