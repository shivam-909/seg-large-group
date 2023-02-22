/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    colors: {
      'darker-grey': '#d8d4d4',
      'lighter-grey': '#f3f3f3',
      'dark-theme-grey': '#282c34',
      'green': '#16a34a',
      'white': '#ffffff',
      'dim-background': 'rgba(0, 0, 0, 0.5)',
    },
    extend: {},
  },
  plugins: [],
}
