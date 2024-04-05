/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#088F8F",
        secondary: "#EEE",
        text: {
          primary: "#111",
        }
      },
    },
  },
  plugins: [],
}

