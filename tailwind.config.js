/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brandBlue: '#001A33',
        brandGold: '#D4AF37',
        brandGoldLight: '#F3E5AB',
      }
    },
  },
  plugins: [],
}