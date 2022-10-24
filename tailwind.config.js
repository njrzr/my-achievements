/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors');

module.exports = {
  mode: 'jit',
  content: [
    'src/*.js',
    'src/components/*.js'
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
        'platinum': {
          50: '#E5E4E266',
          DEFAULT: '#E5E4E2'
        }
      },
      'fontFamily': {
        'press': 'Press\\ Start\\ 2P',
        'poppins': 'Poppins'
      },
      'dropShadow': {
        'text': '2px 2px 2px #9E2950'
      }
    },
  },
  plugins: [],
}
