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
      width: {
        '140': '140px',
      },
      height: {
        '140': '140px',
      },
      minHeight: {
        'calc-nav': 'calc(100vh - 50px)', // 48px
      },
      minWidth: {
        '80': '80px',
      },
      listStyleType: {
        'lower-alpha': 'lower-alpha',
      },
      zIndex: {
        '1': '1',
        '2': '2',
        '3': '3',
      },
      margin: {
        'n1': '-0.25rem',
        'n2': '-0.5rem',
        'n3': '-0.75rem',
        'n4': '-1rem',
        'n5': '-1.25rem',
        'n6': '-1.5rem',
      },
      backgroundColor: {
        'w-blue-1': '#cfd9ff',
      },
    },
  },
  plugins: [],
}
