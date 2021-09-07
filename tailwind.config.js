module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: theme => ({
        'apple-pattern': "url('/ingredients/apple-light.svg')",
        'carrot-pattern': "url('/ingredients/carrot-light.svg')",
        'wave': "url('/wave.svg')",
      }),
      colors: {
        'better-pink': {
          DEFAULT: '#ff6392',
        },
        'better-green': {
          DEFAULT: '#33d399',
        },
        'better-blue': {
          DEFAULT: '#5aa9e6',
        },
        'better-black': {
          DEFAULT: '#14080e'
        }
      }
    },
    backgroundSize: {
      'auto': 'auto',
      'cover': 'cover',
      'contain': 'contain',
      '16': '4rem',
      '8': '2rem'
    }
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('tailwind-scrollbar-hide')
  ],
}
