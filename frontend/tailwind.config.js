// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Garante que o Tailwind observa os teus ficheiros React
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // Configura a fonte Inter
      },
      // ... outras extensões do tema
    },
  },
  plugins: [],
}