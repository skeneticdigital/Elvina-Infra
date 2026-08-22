import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: '#0E223D',
          dark: '#071220',
          deep: '#0B1B30',
          blue: '#1B4D89',
          accent: '#3B82F6',
          light: '#60A5FA',
          glow: 'rgba(59, 130, 246, 0.3)',
        },
        'steel-gray': {
          DEFAULT: '#94A3B8',
          light: '#CBD5E1',
          dark: '#334155',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', '-apple-system', 'sans-serif'],
        heading: ['var(--font-inter)', 'Inter', '-apple-system', 'sans-serif'],
        mono: ['var(--font-inter)', 'Inter', 'monospace'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'grid-pattern': "radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)",
      },
    },
  },
  plugins: [],
};

export default config;
