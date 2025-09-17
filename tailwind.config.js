/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans'],
      },
    colors: {
      'blue-col': '#2C338B',
      'green-col': '#01A54D',
    },
    }
  },
  plugins: [
   require('@tailwindcss/forms'),
  ],
};