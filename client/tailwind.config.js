/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  important: true,
  theme: {
    fontFamily: {
      body: {
        sans: ['"DIN Next Rounded LT Pro"', "sans-serif"],
        serif: ['"DIN Next Rounded LT Pro"', "serif"],
        mono: ['"DIN Next Rounded LT Pro"', "monospace"],
      },
    },
    extend: {},
  },
  plugins: [],
};
