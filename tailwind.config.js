/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./projects/**/*.{html,ts}"],
  theme: {
    extend: {},
  },
  plugins: [require('tailwindcss-primeui')],
  corePlugins: { preflight: false }
}

