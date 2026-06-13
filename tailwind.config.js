/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#fffaf8',
        sand: '#f8f6ef',
        ink: '#342421',
        inkSoft: '#3d302c',
        muted: '#6f5651',
        mutedSoft: '#9b726c',
        rose: '#ec4f86',
        roseDark: '#d94376',
        sun: '#ffcf67',
        mint: '#67c5bf',
        leaf: '#559c68',
        line: '#f4dfdc',
        line2: '#f0d7d2',
        deep: '#1f2426',
      },
      fontFamily: {
        sans: ['"Nunito"', '"Quicksand"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 18px 45px rgba(66,38,32,0.12)',
        chip: '0 4px 10px rgba(78,64,55,0.12)',
        cell: '0 1px 2px rgba(87,67,58,0.16)',
      },
    },
  },
  plugins: [],
}
