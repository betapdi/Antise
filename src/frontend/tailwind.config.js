/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {},
    colors: {
      'blue': '#0A65CC',
      'black': '#18191C',
      'gray': '#5E6670',
      'white': '#FFFFFF',
      'gray/100': '#E4E5E8'
    },
    fontFamily: {
      inter: ['Inter', 'sans-serif'], 
    },
  },
  plugins: [],
}

