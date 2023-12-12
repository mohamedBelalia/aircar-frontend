/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}", "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js"
  ],
  darkMode: "" ,
  theme: {
    extend: {},
  },
  plugins: [
    require('tailwindcss-no-scrollbar')
]
}
