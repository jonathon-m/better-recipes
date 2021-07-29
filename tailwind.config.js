module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: theme => ({
       'apple-pattern': "url('/fruit/apple-light.svg')",
       'carrot-pattern': "url('/fruit/carrot-light.svg')",
      })
    },
    backgroundSize: {
      'auto': 'auto',
      'cover': 'cover',
      'contain': 'contain',
      '16': '4rem',
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
