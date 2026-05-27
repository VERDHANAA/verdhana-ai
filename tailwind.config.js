/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        neo: {
          teal: "#00BFAE",
          orange: "#FF3D00",
          gray: "#7D7F7D",
          light: "#F0F0F0",
          dark: "#1C1C1E",
        },
      },
      boxShadow: {
        brutal: "4px 4px 0px #1C1C1E",
        "brutal-lg": "6px 6px 0px #1C1C1E",
        "brutal-sm": "2px 2px 0px #1C1C1E",
        "brutal-orange": "4px 4px 0px #FF3D00",
        "brutal-teal": "4px 4px 0px #00BFAE",
      },
    },
  },
  plugins: [],
};
