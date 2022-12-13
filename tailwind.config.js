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
      // minWidth: {
      //   '50': '50%', //  !important
      // },
      listStyleType: {
        'lower-alpha': 'lower-alpha',
      },
    },
  },
  plugins: [],
}