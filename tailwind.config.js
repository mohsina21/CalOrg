/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: "class", // <- enable class-based dark mode
  theme: {
    extend: {
      transitionProperty: {
        'bg': 'background-color',
        'colors': 'color, background-color',
      },
      colors: {
        primary: "#4f46e5", // Indigo-600
        secondary: "#6366f1", // Indigo-500
      },
    },
  },
  plugins: [],
};
