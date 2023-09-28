/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    backgroundImage: {
      rainbow:
        "linear-gradient(90deg, rgba(254,17,17,1) 0%, rgba(224,142,44,1) 12%, rgba(230,255,0,1) 22%, rgba(0,251,255,1) 34%, rgba(0,183,255,1) 46%, rgba(0,63,255,1) 58%, rgba(100,0,255,1) 70%, rgba(216,0,255,1) 82%, rgba(255,0,136,1) 94%);",
    },
    extend: {
      colors: {
        orange: "#FF5C00",
        lgrey: "#4B4B4B",
        dgrey: "#3D3D3D",
        required: "#EB0606",
      },
    },
  },
  plugins: [
    // require('tailwind-scrollbar-hide')
  ],
};
