/* eslint-disable @typescript-eslint/no-require-imports */
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'selector',
  // NOTE: Update this to include the paths to all of your component files.
  content: [
    './src/App.{tsx,jsx,ts,js}',
    './index.{tsx,jsx,ts,js}',
    './src/**/*.{tsx,jsx,ts,js}',
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {},
    },
  },
  plugins: [],
};
