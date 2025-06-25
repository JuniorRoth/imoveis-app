/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1a1a1a",
        secondary: "#4a4a4a",
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
