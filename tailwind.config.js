/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        openSans: ['Open Sans', 'sans-serif'],
      },
      colors: {
        GPlight: '#F7F7E8',
        GPmid1: '#C7CFB7',
        GPmid2: '#9DAD7F',
        GPdark: '#557174',
        GPdark2: '#2a383a',
      },
      backgroundImage: {
        'mountain-green': "url('/public/green-bg-img.png')",
      },
    },
  },
  plugins: [require('daisyui'), require('@tailwindcss/line-clamp')],
};
