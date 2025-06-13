/* eslint-disable @typescript-eslint/no-require-imports */
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'selector',
  content: [
    './src/App.{tsx,jsx,ts,js}',
    './index.{tsx,jsx,ts,js}',
    './src/**/*.{tsx,jsx,ts,js}',
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        text: {
          primary: '#2E2E2E',
          secondary: '#A5A5A5',
        },
        button: {
          default: '#1D1D1D',
          secondary: '#8D8D8D',
          disabled: '#D9D9D9)',
        },
      },
    },
  },
  plugins: [],
};
