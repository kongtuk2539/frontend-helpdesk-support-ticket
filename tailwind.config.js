/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        orbitron: ['Orbitron', 'sans'],
        'roboto-mono': ['Roboto Mono', 'monospace'],
      },
      colors: {
        'deep-purple': '#6016FF',
        purple: '#905CFF',
        'gray-op90': 'rgba(28, 28, 30, 0.9)',
      },
    },
  },
  plugins: [],
}
