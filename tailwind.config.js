module.exports = {
  purge: [],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    fontFamily: {
      mono: [
        '"Courier"',
        '"Courier New"',
        'monospace',
        'ui-monospace',
        'Menlo',
        'Monaco',
      ],
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
