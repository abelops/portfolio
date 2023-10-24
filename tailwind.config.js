/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        absolutHeadline: ['absolutHeadline', 'sans-serif'],
        gloucester: ['gloucester', 'sans-serif'],
        quantrh: ['quantrh', 'sans-serif'],
        AMERTO: ['AMERTO', 'sans-serif'],
        fontMifz: ['fontMifz', 'sans-serif'],
        devicon: ['devicon', 'sans-serif'],
        playFair: ['playFair', 'sans-serif']
      },
    },
  },
  plugins: [],
}

