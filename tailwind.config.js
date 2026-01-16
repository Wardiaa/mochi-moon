/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        'pixel': ['Silkscreen', 'Courier New', 'monospace'],
        'display': ['Press Start 2P', 'Courier New', 'monospace'],
      },
      colors: {
        cream: '#FFF8F0',
        mint: '#B4FFE6',
        strawberry: '#FFC4DD',
        lavender: '#D7C4FF',
        banana: '#FFF4B4',
        chocolate: '#8B6F47',
        charcoal: '#4A4A4A',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}