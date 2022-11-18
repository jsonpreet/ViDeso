/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors');
module.exports = {
  mode: 'jit',
  darkMode: 'class',
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gray: colors.zinc,
        green: colors.emerald,
        purple: colors.violet,
        yellow: colors.yellow,
        brand: colors.violet,
        brand2: colors.pink,
      }
    }
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('@vidstack/player/tailwind.cjs'),
    require('@tailwindcss/line-clamp')
  ]
}
