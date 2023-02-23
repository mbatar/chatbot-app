/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'white':'#FFFFFF',
        'green': '#16C607',
        'halfblue' : '#F4F8FF',
        'blue' : '#00AAF3',
        'gray':'#EDEDED',
        'pink':'#FA8299',
        'indigo':'#A3B8E0',
        'black':'#000000'
      }
    },
  },
  plugins: [],
}