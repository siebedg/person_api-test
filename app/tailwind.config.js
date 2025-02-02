const { withTV } = require('tailwind-variants/transformer');

/** @type {import('tailwindcss').Config} */
export default withTV({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
});
