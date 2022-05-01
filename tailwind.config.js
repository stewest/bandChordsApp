module.exports = {
  content: ['./src/**/*.js'],
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
          '50%': { backgroundColor: '#21cc12' },
          '0%': { backgroundColor: '#000' },
        },
      },
      animation: {
        pulsebpm: 'pulsebpm 300ms step-start infinite',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
