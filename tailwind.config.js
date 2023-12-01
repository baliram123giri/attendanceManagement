/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        "main-app-primary": "#583D72",
        "main-app-secondary": "#FF8F72",
        "main-app-error": "#71AF86"
      },
      fontSize: {
        "main-xl": "15px"
      },
      fontWeight: {
        "semibold": "500"
      }
    },

  },
  plugins: [],
}
