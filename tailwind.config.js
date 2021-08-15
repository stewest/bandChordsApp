module.exports = {
  // purge: [],
  purge: ['./src/**/*.js'],
  darkMode: 'class',
  theme: {
    fontFamily: {
      mono: ['"Roboto Mono"', '"Courier"', 'Menlo'],
      sans: ['"Roboto"', '"Helvetica Neue"', 'Arial', 'sans-serif'],
      chords: ['"Courier"', '"Courier New"', 'Menlo', 'Monaco'],
    },
    extend: {
      keyframes: {
        pulsebpm: {
          '0%': { backgroundColor: '#000' },
          '100%': { backgroundColor: '#21cc12' },
        },
      },
      animation: {
        pulsebpm: 'pulsebpm linear infinite 300ms',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
