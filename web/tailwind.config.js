/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable global-require */

module.exports = {
  future: {},
  purge: [
    './components/*.tsx',
    './pages/*.tsx',
    './pages/**/*.tsx',
    './lib/*.ts',
  ],
  theme: {
    extend: {
      borderRadius: {
        none: '0',
        sm: '0.125rem',
        default: '0.25rem',
        lg: '0.5rem',
        full: '9999px',
        circle: '50%',
      },
      colors: {
        blackish: '#333333',
      },
      fontFamily: {
        'apfel-grotezk': [
          'ApfelGrotezk',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          '"Noto Sans"',
          'sans-serif',
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
          '"Noto Color Emoji"',
        ],
      },
      fontSize: {
        xxs: '0.75rem',
        xs: '0.8125rem',
      },
    },
  },
  variants: {},
  plugins: [
    require('@tailwindcss/aspect-ratio'),
  ],
};
