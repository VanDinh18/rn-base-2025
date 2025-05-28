/** @type {import('tailwindcss').Config} */
module.exports = {
    // NOTE: Update this to include the paths to all of your component files.
    content: [
      'App.{tsx,jsx,ts,js}',
      'index.{tsx,jsx,ts,js}',
      'src/**/*.{tsx,jsx,ts,js}',
      'components/**/*.{tsx,jsx,ts,js}',
    ],
    presets: [require('nativewind/preset')],
    theme: {
      extend: {
        colors: {},
      },
    },
    plugins: [],
  };
