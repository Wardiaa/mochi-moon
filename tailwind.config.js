/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        // These should match the font-family names in your @font-face declarations
        'pixel': ['Silkscreen', 'Courier New', 'Lucida Console', 'monospace'],
        'display': ['Press Start 2P', 'Courier New', 'Lucida Console', 'monospace'],
      },
      colors: {
        'cream': '#FFF8F0',
        'mint': '#B4FFE6',
        'strawberry': '#FFC4DD',
        'lavender': '#D7C4FF',
        'banana': '#FFF4B4',
        'chocolate': '#8B6F47',
        'charcoal': '#4A4A4A',
      },
    },
  },
  plugins: [],
}