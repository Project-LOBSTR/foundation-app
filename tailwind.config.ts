import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ['Raleway', 'sans-serif'],
        body: ['Tageline', 'sans-serif'],
      },
      colors: {
        primary: {
          25: '#F9F5FF',
          50: '#F1EBFF',
          100: '#E3D7FE',
          200: '#C7AFFD',
          300: '#AB87FC',
          400: '#8F5FFB',
          500: '#8A2BE2',
          600: '#6A22CB',
          700: '#5A1EB2',
          800: '#4A1A99',
          900: '#3A167F',
        },
        secondary: '#FF6B81',
        tertiary: '#1E90FF',
        accent: '#008080',
        neutral: '#D2B48C',
        highlight: '#FFC0CB',
        detail: '#AFEEEE',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
export default config
