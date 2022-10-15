/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: [
    'src/*.js',
    'src/components/*.js'
  ],
  theme: {
    extend: {
      'backgroundColor': {
        'primary': '#ED5588',
        'secondary': '#57172D',
        'terciary': '#9E2950'
      },
      'textColor' : {
        'primary': '#ED5588',
        'secondary': '#57172D',
        'terciary': '#9E2950'
      },
      'fontFamily': {
        'orbitron': 'Orbitron',
        'press': 'Press Start 2P'
      },
      'dropShadow': {
        'text': '2px 2px 2px #9E2950'
      }
    },
  },
  plugins: [],
}
