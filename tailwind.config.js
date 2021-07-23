module.exports = {
  // purge: [],
  purge: ['./src/**/*.js'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    fontFamily: {
      mono: ['"Roboto Mono"', '"Courier"', 'Menlo'],
      sans: ['"Roboto"', '"Helvetica Neue"', 'Arial', 'sans-serif'],
      chords: ['"Courier"', '"Courier New"', 'Menlo', 'Monaco'],
    },
    extend: {
      keyframes: {
        pulsebpm: {
          '0%, 100%': { backgroundColor: '#21cc12' },
          '50%': { backgroundColor: '#111' },
        },
      },
      animation: {
        pulsebpm: 'pulsebpm linear infinite 1s',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
