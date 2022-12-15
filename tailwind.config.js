/** @type {import('tailwindcss').Config} */
module.exports = {
  corePlugins: {
    preflight: false,
  },
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      minHeight: {
        'calc-nav': 'calc(100vh - 50px)', // 48px
      },
      listStyleType: {
        'lower-alpha': 'lower-alpha',
      },
      zIndex: {
        '1': '1',
        '2': '2',
        '3': '3',
      },
    },
  },
  plugins: [],
}
