/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        cute: ['Pacifico', 'cursive'],
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
};
