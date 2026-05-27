/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        body:  "#F0F0F0",
        con:   "#7D7F7D",
        ora:   "#FF3D00",
        teal:  "#00BFAE",
        ink:   "#1C1C1E",
      },
      fontFamily: {
        mono:    ['"Space Mono"', 'monospace'],
        grotesk: ['"Space Grotesk"', 'sans-serif'],
        syne:    ['Syne', 'sans-serif'],
        bio:     ['BioRhyme', 'serif'],
        lexend:  ['Lexend', 'sans-serif'],
      },
      boxShadow: {
        brutal:    '5px 5px 0px #1C1C1E',
        'brutal-sm': '3px 3px 0px #1C1C1E',
        'brutal-xs': '2px 2px 0px #1C1C1E',
        'brutal-0':  '0px 0px 0px #1C1C1E',
      },
      borderWidth: { 3: '3px' },
    },
  },
  plugins: [],
};
