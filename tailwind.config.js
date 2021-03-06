module.exports = {
  darkMode: false,
  purge: {
    preserveHtmlElements: false,
    content: ['./src/components/**/*.{js,ts,jsx,tsx}', './src/pages/**/*.{js,ts,jsx,tsx}']
  },
  theme: {
    fontFamily: {
      inter: ['Inter', 'sans-serif'],
      recursive: ['Recursive', 'sans-serif'],
      crimson: ['"Crimson Pro"', 'serif']
    },
    extend: {}
  },
  plugins: []
}
