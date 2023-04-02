/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        openSans: ['Open Sans', 'sans-serif'],
      },
      spacing: {
        120: '30rem',
      },
      colors: {
        bgBaseDark: '#121212',
        GPlight: '#F7F7E8',
        GPmid: '#C7CFB7',
        GPmid1: '#49A378',
        GPmid2: '#2C6248',
        GPdark: '#649E88',
        GPdark2: '#2a383a',
        GPlightGreen: '#606c38',
        GPdarkGreen: '#283618',
        GPlightBrown: '#fefae0',
        GPmidBrown: '#dda15e',
        GPdarkBrown: '#bc6c25',
        GPmodalBgDark: '#2A303C',
        GPmodalTextDark: '#A6ADBB',
      },
      backgroundImage: {
        'mountain-green': "url('/public/green-mountains.png')",
        'valley-purple': "url('/public/purple-valley.jpg')",
      },
    },
  },
  plugins: [require('daisyui'), require('@tailwindcss/line-clamp')],
};
