/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors');

module.exports = {
  mode: 'jit',
  content: [
    'src/*.jsx',
    'src/components/*.jsx'
  ],
  theme: {
    extend: {
      colors: {
        'primary': {
          50: '#ED558866',
          DEFAULT: '#ED5588'
        },
        'secondary': '#57172D',
        'terciary': '#9E2950',
        'gold': {
          50: '#FFD70066',
          DEFAULT: '#FFD700'
        }
      },
      'fontFamily': {
        'press': 'Press\\ Start\\ 2P',
        'poppins': 'Poppins',
        'pixelify': 'Pixelify\\ Sans',
        'montserrat': 'Montserrat',
        'noto': 'Noto\\ Sans',
      },
      'dropShadow': {
        'text': '2px 2px 2px #9E2950'
      }
    },
  },
  plugins: [],
}
