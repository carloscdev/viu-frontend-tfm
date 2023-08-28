/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx,vue}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#E65014',
        dark: '#15161A',
        'dark-gray': '#1B1C21',
        'dark-light': '#878787',
      }
    },
  },
  plugins: [],
}

