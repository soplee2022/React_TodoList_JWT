/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '32px',
        md: '24px',
      },
    },
    extend: {
      colors: {
        'primary': '#aca691',
        'primary-light': '#dddace',
        'brown': '#584d3d'
      },
    },
  },
  plugins: [],
}
