// tailwind.config.js
const defaultTheme = require('tailwindcss/defaultTheme'); // Import defaultTheme

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', ...defaultTheme.fontFamily.sans], // Set Poppins as default sans-serif
      },
      colors: { // Custom colors for a softer, more playful look
        'cat-gradient-start': '#FFD1DC', // Light Pink
        'cat-gradient-end': '#ADD8E6',   // Light Blue
        'cat-primary': '#6D28D9',       // Deep Purple (for buttons/accents)
        'cat-secondary': '#8B5CF6',     // Medium Purple
        'cat-text': '#374151',          // Dark Gray for text
        'cat-light-text': '#4B5563',    // Slightly lighter dark gray
        'cat-bg-light': '#FDFCFE',      // Off-white background
      },
    },
  },
  plugins: [],
};