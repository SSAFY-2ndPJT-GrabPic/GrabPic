/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "main-green": "#81D42E",
        "light-green": "#B2EB78",
        "dark-green": "#50940C",
        "main-black": "#363636",
        "light-yellow": "#FAEF9B",
        "point-yellow": "#FFCE21",
        "point-orange": "#FF9F1C",
        "point-gray": "#5C5C5C",
        "disabled-gray": "#BDBDBD",
        "main-white": "#FFFFFF",
        "inputbox-gray": "#F3F3F3",
        "warn-red": "#E90000",
        "btn-gray": "#E1E1E1",
      },
    },
  },
  plugins: [],
};
