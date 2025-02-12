/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '5%',
        sm: '1rem',
      },
    },
    extend: {
      display: {
        'inline-masonry': 'inline-masonry',
      },
      screens: {
        'xs': '490px',
      },
      fontFamily: {
        'manrope': ["Manrope", 'sans-serif'],
        'Cinzel': ["Cinzel", 'serif'],
        'Sancreek': ["Sancreek", 'serif'],
      },
      colors: {
        'custom-primary': '#d5ae6b',
        'custom-half-primary': 'rgba(213, 174, 107, 0.2)',
        // 'white':'#1e1e1e',
        // 'black':'#f0f0f0',

      },
    },
  },
  plugins: [require('daisyui'),require("@tailwindcss/typography")],

};


