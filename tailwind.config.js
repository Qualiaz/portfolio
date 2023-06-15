/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        orange: "#FF5C00",
        lgrey: "#4B4B4B",
        required: "#EB0606",
      },
    },
  },
  plugins: [],
};
