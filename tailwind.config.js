/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        /**
         * Brand Colors - Professional Dark Corporate
         * primary: Core Green
         * secondary: Mint Highlight
         * darkBg: Deep Slate
         * darkCard: Slightly lighter slate for cards
         */
        primary: "#184d47",
        secondary: "#1cd9c6",
        darkBg: "#060b13",
        darkCard: "#0f1724",
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        'theme': '1.5rem',
      },
      boxShadow: {
        'glow': '0 0 20px rgba(28, 217, 198, 0.15)',
        'glow-hover': '0 0 35px rgba(28, 217, 198, 0.3)',
      }
    },
  },
  plugins: [],
};
